from django.db import models
from django.contrib.auth.models import User

class FavStocksModel(models.Model):
    stock = models.CharField(max_length=30)
    user = models.ForeignKey(User, models.CASCADE)
