from django.contrib import admin
from .models import BuyerProfile, BookForSellBuyer
# Register your models here.

@admin.register(BuyerProfile)
class SellerProfileAdmin(admin.ModelAdmin):
    list_display = [field.name for field in BuyerProfile._meta.fields]

@admin.register(BookForSellBuyer)
class SellerProfileAdmin(admin.ModelAdmin):
    list_display = [field.name for field in BookForSellBuyer._meta.fields]