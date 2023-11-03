from django.urls import path
from .views import *

urlpatterns = [
    path('api/v1/send_code', APISendCode.as_view(), name='sendCode')
]