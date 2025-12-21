from django.contrib import admin
from .models import BuyerModel, SellerModel
# Register your models here.

@admin.register(BuyerModel)
class BuyerModelAdmin(admin.ModelAdmin):
    list_display = [field.name for field in BuyerModel._meta.fields]
    search_fields = ("username", "email")

@admin.register(SellerModel)
class SellerModelAdmin(admin.ModelAdmin):
    list_display = [field.name for field in SellerModel._meta.fields]
    search_fields = ("username", "email")