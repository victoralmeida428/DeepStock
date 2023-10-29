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
    path('api/v1/stocks/predict', APIPredict.as_view(), name='pred_stocks'),
    # path('api/v1/stocks/predict_torch', PredictionDL.as_view(), name='pred_stocks_torch'),
    path('api', get_urls, name='index'),
    path('api/v1/user/login', MyTokenObtainPairView.as_view(), name='login')
]