import yfinance as yf
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
from torch import nn
import torch
import pandas as pd
from copy import deepcopy as dc
from torch.utils.data import Dataset, DataLoader
import datetime as dt
import numpy as np


class LSTM(nn.Module):
    def __init__(self, input_size, hidden_size, num_stacked_layers):
        super().__init__()
        self.hidden_size = hidden_size
        self.num_stacked_layers = num_stacked_layers
        self.lstm = nn.LSTM(input_size, hidden_size, num_stacked_layers, batch_first=True)
        self.fc = nn.Sequential(
            nn.Linear(hidden_size, hidden_size),
            nn.ReLU(),
            nn.Linear(hidden_size, 1)
        )

    def forward(self, x):
        batch_size = x.size(0)
        h0 = torch.zeros(self.num_stacked_layers, batch_size, self.hidden_size)
        c0 = torch.zeros(self.num_stacked_layers, batch_size, self.hidden_size)
        out, _ = self.lstm(x, (h0, c0))
        out = self.fc(out[:, -1, :])
        return out


class TimeSeriesDataset(Dataset):
    
    def __init__(self, X, y) -> None:
        self.X = X
        self.y = y

    def __len__(self):
        return len(self.X)
    
    def __getitem__(self, i):
        return self.X[i], self.y[i]


class PredictStocks:
    def __init__(self, ticket, n_step) -> None:
        self.ticket = ticket
        self.n_step = n_step
        self.history = yf.Ticker(ticket).history('5y')
        self.prepare_dataset()
        self.dates = self.history.index
        self.normalizer()
        self.x_train, self.y_train, self.x_test, self.y_test = self.get_train_test()
        self.train_series_dataset = TimeSeriesDataset(self.x_train, self.y_train)
        self.test_series_dataset = TimeSeriesDataset(self.x_test, self.y_test)
        self.train_loader = DataLoader(self.train_series_dataset, **self.getParams())
        self.test_loader = DataLoader(self.train_series_dataset, **self.getParams(False))
        self.model = LSTM(1, 32, 1)
        self.fit()
        

    def prepare_dataset(self):
        self.history['mean'] = self.history.Close.rolling(7, step=7).mean()
        for i in range(1, self.n_step+1):
            self.history[f'step_{i}'] = self.history['mean'].shift(i)

        self.history.dropna(inplace=True)
        cols = ['mean']
        cols.extend([col for col in self.history.columns if 'step_' in col])
        self.history = self.history[cols]
    
    def normalizer(self):
        self.scaler = MinMaxScaler(feature_range=(-1,1))
        self.dataset_numpy = self.scaler.fit_transform(self.history.to_numpy())

    def get_train_test(self):
        X = self.dataset_numpy[:, 1:]
        y = self.dataset_numpy[:, 0]
        self.split_i = int(len(self.dataset_numpy)*0.75)
        x_train = X[:self.split_i]
        x_test = X[self.split_i:]
        y_train = y[:self.split_i]
        y_test = y[self.split_i:]
        x_train = x_train.reshape(-1, self.n_step, 1)
        x_test = x_test.reshape(-1, self.n_step, 1)
        y_train = y_train.reshape(-1, 1)
        y_test = y_test.reshape(-1, 1)
        x_train = torch.tensor(x_train).float()
        x_test = torch.tensor(x_test).float()
        y_train = torch.tensor(y_train).float()
        y_test = torch.tensor(y_test).float()
        return x_train, y_train, x_test, y_test
    
    def getParams(self, shuffle=True):
        return {'batch_size': 16,
                'shuffle': shuffle}
    
    def train_one_epoch(self, epoch, loader, lf, optm):
        self.model.train(True)

        for batch in loader:
            x_batch, y_batch = batch[0], batch[1]
            out = self.model(x_batch)
            loss = lf(out, y_batch)

            optm.zero_grad()
            loss.backward()
            optm.step()

    def fit(self):
        lr = 0.001
        epochs = 10
        lf = nn.MSELoss()
        optm = torch.optim.Adam(self.model.parameters(), lr=lr)
        for epoch in range(epochs):
            self.train_one_epoch(epoch, self.train_loader, lf, optm)

    def get_predicts_norm(self):
        with torch.no_grad():
            with torch.inference_mode():
                train_predicted = self.model(self.x_train).numpy()
                test_predicted = self.model(self.x_test).numpy()
        return train_predicted, test_predicted
    
    def get_future(self):
        last_date = self.history.index[-1]
        days_pred = [last_date + dt.timedelta(days=i*7) for i in range(7)]
        
        pred = []
        x = dc(self.x_test[-1:])
        for day in days_pred:
            with torch.no_grad():
                with torch.inference_mode():  
                    print(x)               
                    y_pred = self.model(x).numpy().flatten()
                    tensor1 = list(y_pred.copy())
                    lista = list(x.numpy())[0][0:-1]
                    tensor1.extend(lista)
                    x = torch.tensor([tensor1]).float().reshape(-1,7,1)
                    
                    dummies = np.zeros((1, self.n_step+1))
                    dummies[:, 0] = y_pred
                    dummies = self.scaler.inverse_transform(dummies)
                    
                    y_pred = dc(dummies[:, 0])
                    pred.append({'date': day, 'close': y_pred[0], 'name':'Future'})

        return pred
    
    def get_predicts(self):
        pred_train, pred_test = self.get_predicts_norm()
        train_predictions = pred_train.flatten()
        test_predictions = pred_test.flatten()

        dummies = np.zeros((self.x_train.shape[0], self.n_step+1))
        dummies[:, 0] = train_predictions
        dummies = self.scaler.inverse_transform(dummies)

        train_predictions = dc(dummies[:, 0])

        dummies = np.zeros((self.x_test.shape[0], self.n_step+1))
        dummies[:, 0] = test_predictions.flatten()
        dummies = self.scaler.inverse_transform(dummies)
        test_predictions = dc(dummies[:, 0])

        predicts = [{'close': valor, 'date': date.date(), 'name':'train'} for date, valor in zip(list(self.dates)[:self.split_i], train_predictions)]
        predicts_test = [{'close': valor, 'date': date.date(), 'name':'test'} for date, valor in zip(list(self.dates)[self.split_i:], test_predictions)]
        real = [{'close': series['mean'], 'date': index.date(), 'name': 'real'} for index, series in self.history.iterrows()]
        predicts.extend(predicts_test)
        predicts.extend(real)
        predicts.extend(self.get_future())
        return predicts
    

