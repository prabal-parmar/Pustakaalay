from django.contrib import admin
from .models import SellerProfile, BookDataModel
# Register your models here.

@admin.register(SellerProfile)
class SellerProfileAdmin(admin.ModelAdmin):
    list_display = [field.name for field in SellerProfile._meta.fields]

@admin.register(BookDataModel)
class SellerProfileAdmin(admin.ModelAdmin):
    list_display = [field.name for field in BookDataModel._meta.fields]

