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

@api_view(['GET'])
def get_urls(request):
    urls = [
        'api/v1/user',
        'api/v1/stocks',
        'api/v1/stocks/pk/fav'
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
            dic = {'info': value}
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
            FavStocksModel.objects.create(user=user, stock=stock)
            data['success'] = f'{stock} favoritado'
        else:
            FavStocksModel.objects.get(user=user, stock=stock).delete()
            data['success'] = f'{stock} desfavoritado'
    return Response(data)



