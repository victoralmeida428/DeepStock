from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
import yfinance as yf
from rest_framework.response import Response
from .serializer import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


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



