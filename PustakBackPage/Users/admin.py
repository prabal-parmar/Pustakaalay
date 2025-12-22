from django.contrib import admin
from .models import BuyerModel, SellerModel, CustomUser
# Register your models here.

@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = [field.name for field in CustomUser._meta.fields]
    search_fields = ("username", "email")
    list_filter = ("role", "is_staff", "is_active")

@admin.register(BuyerModel)
class BuyerModelAdmin(admin.ModelAdmin):
    list_display = [field.name for field in BuyerModel._meta.fields]

@admin.register(SellerModel)
class SellerModelAdmin(admin.ModelAdmin):
    list_display = [field.name for field in SellerModel._meta.fields]