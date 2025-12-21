from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    USER_TYPE = (
        ('buyer', 'Buyer'),
        ('seller', 'Seller')
    )
    role = models.CharField(max_length=10, choices=USER_TYPE)

    def __str__(self):
        return f"{self.username} -> ({self.role})"
    
class BuyerModel(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='buyer_profile')
    contact_number = models.CharField(max_length=10)
    email = models.EmailField("email address", unique=True)

    def __str__(self):
        return self.user.username
    
class SellerModel(models.Model):

    SELLER_TYPE = (
        ('stationery', 'Stationery'),
        ('bookstore', 'Bookstore'),
        ('library', 'Library'),
        ('other', 'Other')
    )
    name = models.CharField(max_length=100, null=False, blank=False)
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='seller_profile')
    contact_number = models.CharField(max_length=10)
    email = models.EmailField("email address", unique=True)
    location = models.CharField(max_length=100)
    sellertype = models.CharField(max_length=15, choices=SELLER_TYPE)

    def __str__(self):
        return self.user.username

    