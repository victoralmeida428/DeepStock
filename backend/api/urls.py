from django.urls import path, include
from .views import *
from rest_framework import routers

router = routers.DefaultRouter()
router.register('fav', APIFavStock, basename='favoritos')


urlpatterns = [
    path('api/v1/stocks', stocks, name='stocks'),
    path('api/v1/stocks/<pk>/fav/update', APIFavStockUpdate, name='updateFav'),
    path('api/v1/stocks/<pk>/', include(router.urls)),
    path('api/v1/stocksinfo', info_stocks, name='info_stocks'),
    path('', get_urls, name='index'),
    path('api/v1/user/login', MyTokenObtainPairView.as_view(), name='login')
]