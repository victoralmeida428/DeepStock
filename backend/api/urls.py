from django.urls import path
from .views import *
from rest_framework import routers


urlpatterns = [
    path('api/v1/stocks', stocks, name='stocks'),
    path('', get_urls, name='index'),
    path('api/v1/user/login', MyTokenObtainPairView.as_view(), name='login')
]