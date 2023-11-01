from django.urls import path, include
from .views import *
from rest_framework import routers

router = routers.DefaultRouter()
router.register('fav', APIFavStock, basename='favoritos')


user = routers.DefaultRouter()
user.register('verifier', APIVerifierAccount, basename='verifier')

urlpatterns = [
    path('api/v1/stocks', stocks, name='stocks'),
    path('api/v1/stocks/<pk>/fav/update', APIFavStockUpdate, name='updateFav'),
    path('api/v1/stocks/<pk>/', include(router.urls)),
    path('api/v1/stocksinfo', InfoStocks.as_view(), name='info_stocks'),
    path('api/v1/stocks/predict', APIPredict.as_view(), name='pred_stocks'),
    path('api/v1/user/', include(user.urls)),
    path('api', get_urls, name='index'),
    path('api/v1/user/login', MyTokenObtainPairView.as_view(), name='login'),
    path('api/v1/user/register', APIRegister.as_view(), name='register'),
    
]