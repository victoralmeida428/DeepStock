from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
import yfinance as yf
from rest_framework.response import Response
from .serializer import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
import datetime as dt

@api_view(['GET'])
def get_urls(request):
    urls = [
        'api/v1/user',
        'api/v1/stocks'
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


# @permission_classes([IsAuthenticated])
@api_view(['GET', 'POST'])
def info_stocks(request):
    data = {}
    lista = []
    name_info = {'marketCap': 'Market Cap', 'totalDebt': 'Total Debt',
                     'enterpriseValue':'Enterprise Value',
                     'ebitda': 'EBITDA', 'EV EBITDA':'EV EBITDA', 'trailingEps': 'Trailing Eps', 'floatShares': 'Float Shares',
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
            dic = {'info': value}
            for (stock, info) in infos:
                if key != 'EV EBITDA':
                    dic[stock]= f'{info.get(key):,}'  if (isinstance(info.get(key), int)|isinstance(info.get(key), float)) else info.get(key)
                else:
                    dic[stock] = round(info.get('enterpriseValue')/info.get('ebitda'),2)
            lista.append(dic)
        data['data'] = lista
    return Response(data)



