from django.contrib import admin
from .models import SellerProfile
# Register your models here.

@admin.register(SellerProfile)
class SellerProfileAdmin(admin.ModelAdmin):
    list_display = [field.name for field in SellerProfile._meta.fields]

