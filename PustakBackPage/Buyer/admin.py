from django.contrib import admin
from .models import (BuyerProfile, 
                     EbookModel, 
                     EbookHistory, 
                     ExchangeBookModel,
                     TradeHistoryModel, BuyBookRequest)
# Register your models here.

@admin.register(BuyerProfile)
class SellerProfileAdmin(admin.ModelAdmin):
    list_display = [field.name for field in BuyerProfile._meta.fields]

@admin.register(EbookModel)
class SellerProfileAdmin(admin.ModelAdmin):
    list_display = [field.name for field in EbookModel._meta.fields]

@admin.register(EbookHistory)
class SellerProfileAdmin(admin.ModelAdmin):
    list_display = [field.name for field in EbookHistory._meta.fields]

@admin.register(ExchangeBookModel)
class SellerProfileAdmin(admin.ModelAdmin):
    list_display = [field.name for field in ExchangeBookModel._meta.fields]

@admin.register(TradeHistoryModel)
class SellerProfileAdmin(admin.ModelAdmin):
    list_display = [field.name for field in TradeHistoryModel._meta.fields]

@admin.register(BuyBookRequest)
class SellerProfileAdmin(admin.ModelAdmin):
    list_display = [field.name for field in BuyBookRequest._meta.fields]