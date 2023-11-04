from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
import yfinance as yf
from rest_framework.response import Response
from .serializer import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
import datetime as dt
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.views import APIView
from prophet import Prophet
import pandas as pd
from rest_framework import status
import numpy as np

@api_view(['GET'])
def get_urls(request):
    urls = [
        'api/v1/user',
        'api/v1/stocks',
        'api/v1/stocks/pk/fav',
        'api/v1/stocks/predict'
    ]
    return Response(urls)

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated])
def stocks(request):
    data = []
    if request.method == 'POST':
        stocks = request.data.get('stocks')
        if stocks:
            for stock in stocks:
                object = {}
                ticker = yf.Ticker(stock)
                df = ticker.history()
                object['stock'] = stock
                object['close'] = list(df.Close.values)
                object['date'] = list(df.index)
                object['open'] = list(df.Open.values)
                object['high'] = list(df.High.values)
                object['low'] = list(df.Low.values)
                data.append(object)
    return Response(data)


class InfoStocks(APIView):
    allowed_methods = ['POST']

    def post(self, form, *args, **kwargs):
        lista = []
        name_info = {'longName': 'Name', 'marketCap': 'Market Cap', 'totalDebt': 'Total Debt',
                    'enterpriseValue':'Enterprise Value',
                    'ebitda': 'EBITDA', 'enterpriseToEbitda':'EV EBITDA', 'trailingEps': 'Trailing Eps', 'floatShares': 'Float Shares',
                    'sharesOutstanding':'Shares Outstanding', 'previousClose':'Previous Close',
                    'governanceEpochDate': 'Governance Epoch Date'}
        infos = []
        try:
            for stock in form.data.get('stocks'):
                
                    if not str(stock).startswith('^'):
                        ticker = yf.Ticker(stock)
                        ticker.info['governanceEpochDate'] = dt.datetime.fromtimestamp(ticker.info.get('governanceEpochDate',1050)).strftime("%d/%m/%Y")
                        infos.append((stock, ticker.info))
                    
                
            for key, value in name_info.items():
                dic = {'Informations': value}
                for (stock, info) in infos:
                        dic[stock]= f'{info.get(key):,}'  if (isinstance(info.get(key), int)|isinstance(info.get(key), float)) else info.get(key)
                lista.append(dic)
            return Response(lista)

        except:
            for stock in form.data.get('stocks'):
                if not str(stock).startswith('^'):
                    info = self.return_items(stock)
                    infos.append((stock, info))
            
            for key, value in infos[0][1].items():
                dic = {'Informations': ' '.join(key.replace('por', '/').split('_')).title()}
                for (stock, info) in infos:
                        dic[stock]= f'{info.get(key):,}'  if (isinstance(info.get(key), int)|isinstance(info.get(key), float)) else info.get(key)
                lista.append(dic)
            return Response(lista)

    def return_items(self, stock: str='PETR4.SA')->dict:
        ticket = yf.Ticker(stock)
        if ticket:
            
            fast_info = ticket.fast_info
            cash_flow = ticket.cash_flow.reset_index(names=['info']).fillna('-')
            coluna = cash_flow.columns[1]
            income = ticket.quarterly_income_stmt.reset_index(names=['info']).fillna('-')
            balance = ticket.quarterly_balance_sheet.reset_index(names=['info']).fillna('-')
            financial = ticket.quarterly_financials.reset_index(names=['info']).fillna('-')
            total_assets = balance.loc[balance['info']=='Total Assets', coluna]
            preco = fast_info.get('marketCap')
            ebitda = income.loc[income['info']=='EBITDA', coluna]
            def tratar_valor(x, y=None):
                try:
                    if isinstance(x, pd.Series):
                        x = x.values[0] 
                    if isinstance(y, pd.Series):
                        y = y.values[0] 
                    if y:
                        return x/y
                    else:
                         return x
                except Exception as error:
                    return '-'
            return dict(
                curency=ticket.fast_info.get('currency'),
                last_balance=coluna,
                capex=tratar_valor(cash_flow.loc[cash_flow['info'] == 'Capital Expenditure', coluna]),
                market_cap=fast_info.get('marketCap'),       
                ebitda = tratar_valor(ebitda),
                stockholders_equity = tratar_valor(balance.loc[balance['info'] == 'Stockholders Equity', coluna]),
                capital_stock = tratar_valor(balance.loc[balance['info'] == 'Capital Stock', coluna]),
                net_income = tratar_valor(financial.loc[financial['info'] == 'Net Income', coluna]),
                price_por_free_cash_flow = tratar_valor(preco,cash_flow.loc[cash_flow['info'] == 'Free Cash Flow', coluna]),
                price_por_ebitda = tratar_valor(preco,ebitda),
                asset_turnover = tratar_valor(financial.loc[financial['info'] == 'Total Revenue', coluna],total_assets),
                price_por_value = tratar_valor(preco,total_assets),
                working_capital = tratar_valor(balance.loc[balance['info'] == 'Working Capital', coluna]),
                total_debt = tratar_valor(balance.loc[balance['info'] == 'Total Debt', coluna]),
                net_debt = tratar_valor(balance.loc[balance['info'] == 'Net Debt', coluna]),
                net_debt_por_ebitda =  tratar_valor(balance.loc[balance['info'] == 'Net Debt', coluna],ebitda ),
                total_assets = tratar_valor(total_assets),
                currents_assets = tratar_valor(balance.loc[balance['info'] == 'Current Assets', coluna]),
                total_non_current_assets = tratar_valor(balance.loc[balance['info'] == 'Total Non Current Assets', coluna]),
                free_cash_flow = tratar_valor(cash_flow.loc[cash_flow['info'] == 'Free Cash Flow', coluna])
                )



class APIFavStock(ModelViewSet):
    serializer_class = FavStockSerializer
    queryset = FavStocksModel.objects.all()
    permission_classes =[IsAuthenticated]

    def get_queryset(self):
        qs = super().get_queryset()
        pk = self.kwargs.get('pk')
        return qs.filter(user__id=pk)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def APIFavStockUpdate(request, pk):
    data = {}
    if request.method == 'POST':
        user = User.objects.get(id = pk)
        stock = request.data.get('stock')
        method = request.data.get('method')
        if method == 'POST':
            FavStocksModel.objects.get_or_create(user=user, stock=stock)
            data['success'] = f'{stock} favoritado'
        else:
            FavStocksModel.objects.get(user=user, stock=stock).delete()
            data['success'] = f'{stock} desfavoritado'
    return Response(data)


class APIPredict(APIView):
    # permission_classes = [IsAuthenticated]
    allowed_methods = ['POST']

    def post(self, form, *args, **kwargs):
        stock = form.data.get('stock')
        if stock:
            self.dataset = yf.Ticker('PETR4.SA').history('5y')
            future = self.predict()
            data = []
            for i, value in future.iterrows():
                row = {'row': i,
                             'ds': value.ds,
                             'yhat': value.yhat,
                             'yhat_upper': value.yhat_upper,
                             'yhat_lower': value.yhat_lower,
                             'trend': value.trend,
                             'trend_upper': value.trend_upper,
                             'trend_lower': value.trend_lower,
                             'y':value.y}
                data.append(row)
            return Response(data)
        return Response({'error': 'No Ticket found'})
    
    def predict(self, days=90) -> pd.DataFrame:
        m = Prophet(interval_width=0.95)
        df_pred = pd.DataFrame()
        df_pred['ds'] = self.dataset.index
        df_pred.ds = df_pred.ds.apply(lambda x: x.date())
        df_pred['y'] = self.dataset.Close.values
        m.fit(df_pred.dropna())
        future = m.make_future_dataframe(days)
        forecast = m.predict(future)
        forecast['media'] = df_pred['y'].rolling(30).mean()
        forecast['y'] = df_pred['y']
        forecast = forecast[['ds', 'media', 'yhat', 'yhat_upper', 'yhat_lower', 'trend', 'trend_upper', 'trend_lower', 'y']]
        return forecast.fillna('fora do alcance')

class APIVerifierAccount(ModelViewSet):
    serializer_class = UserRegisterSerializer
    queryset = User.objects.all()
    

class APIRegister(APIView):

    def post(self, form, *args, **kwargs):
        data = form.data
        try:
            User.objects.create_user(username=data.get('username'),
                                email=data.get('email'),
                                password=data.get('password')
                                )
            return Response({'success':'Account Created!'})
        except:
            return Response({'error':'Account not created'})

class APIInformations(APIView):
    def post(self, form):
        self.stock = form.data.get('stock')
        data = self.get_informations()
        return Response(data)

    def apply_value(self, x):
        if isinstance(x, (float, int)):
            if x>1000:
                return f'{x:,.2f}'
            else:
                return f'{x:.3f}'
        return x
        
    def get_informations(self):
        ticket = yf.Ticker(self.stock)
        col = ticket.quarterly_balancesheet.columns[1]
        data = {'balance':{}, 'cash_flow':{}, 'financial':{}, 'incomestmt':{}}
        for key, value in ticket.quarterly_balance_sheet.fillna('-').iterrows():
            value = value.map(self.apply_value)
            data['balance'][key] = value[col]
        for key, value in ticket.quarterly_cash_flow.fillna('-').iterrows():
            value = value.map(self.apply_value)
            data['cash_flow'][key] = value[col]
        for key, value in ticket.quarterly_financials.fillna('-').iterrows():
            value = value.map(self.apply_value)
            data['financial'][key] = value[col]

        return data    