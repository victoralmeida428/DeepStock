from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
import yfinance as yf
from rest_framework.response import Response
from .serializer import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
import datetime as dt
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from prophet import Prophet
import pandas as pd
from rest_framework import status

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
@permission_classes([IsAuthenticated])
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


@permission_classes([IsAuthenticated])
@api_view(['GET', 'POST'])
def info_stocks(request):
    data = {}
    lista = []
    name_info = {'longName': 'Name', 'marketCap': 'Market Cap', 'totalDebt': 'Total Debt',
                     'enterpriseValue':'Enterprise Value',
                     'ebitda': 'EBITDA', 'enterpriseToEbitda':'EV EBITDA', 'trailingEps': 'Trailing Eps', 'floatShares': 'Float Shares',
                     'sharesOutstanding':'Shares Outstanding', 'previousClose':'Previous Close',
                     'governanceEpochDate': 'Governance Epoch Date'}
    infos = []
    if request.method == 'POST':
        for stock in request.data.get('stocks'):
            if not str(stock).startswith('^'):
                ticker = yf.Ticker(stock)
                ticker.info['governanceEpochDate'] = dt.datetime.fromtimestamp(ticker.info.get('governanceEpochDate',11111111111)).strftime("%d/%m/%Y") if ticker.info.get('governanceEpochDate',False) else None
                infos.append((stock, ticker.info))
            
            
        for key, value in name_info.items():
            dic = {'Informations': value}
            for (stock, info) in infos:
                    dic[stock]= f'{info.get(key):,}'  if (isinstance(info.get(key), int)|isinstance(info.get(key), float)) else info.get(key)
            lista.append(dic)
        data['data'] = lista
    return Response(data)

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
        # self.dataset = yf.Ticker('PETR4.SA').history('5y')
        # future = self.predict()
        # data = []
        # for i, value in future.iterrows():
        #     row = {'row': i,
        #                  'ds': value.ds,
        #                  'yhat': value.yhat,
        #                  'yhat_upper': value.yhat_upper,
        #                  'yhat_lower': value.yhat_lower,
        #                  'trend': value.trend,
        #                  'trend_upper': value.trend_upper,
        #                  'trend_lower': value.trend_lower,
        #                  'y':value.y}
        #     data.append(row)
        return Response(form)
    
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

#IDEIA
# FAZER A FRONTEIRA DE EFICENCIA COM AS 10 MAIS LUCRATIVAS!!!!!!!!!!!!!!!!!!