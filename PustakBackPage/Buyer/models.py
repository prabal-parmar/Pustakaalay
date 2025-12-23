from django.db import models
from Users.models import BuyerModel
# Create your models here.

class BuyerProfile(models.Model):
    buyer = models.OneToOneField(BuyerModel, on_delete=models.CASCADE, related_name="buyer")
    description = models.TextField(default="I love pustak 📙")
    followers = models.IntegerField(default=0)
    following = models.IntegerField(default=0)
    
    def __str__(self):
        return f"{self.buyer.user.username}"