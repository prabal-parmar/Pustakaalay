from django.db import models
from Users.models import SellerModel
# Create your models here.

class SellerProfile(models.Model):
    seller = models.OneToOneField(SellerModel, on_delete=models.CASCADE, related_name="seller")
    description = models.TextField(default="I am using Pustakaalay 📚")
    followers = models.IntegerField(default=0)
    total_books = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.seller.user.username}"
