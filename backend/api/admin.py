from django.contrib import admin
from .models import *

@admin.register(FavStocksModel)
class FavStockView(admin.ModelAdmin):
    list_display = ('id', 'stock', 'user')
