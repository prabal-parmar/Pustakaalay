from django.db import models
from Users.models import BuyerModel
import uuid
from django.utils import timezone
# Create your models here.

class BuyerProfile(models.Model):
    buyer = models.OneToOneField(BuyerModel, on_delete=models.CASCADE, related_name="buyer")
    description = models.TextField(default="I love pustak 📙")
    followers = models.IntegerField(default=0)
    following = models.IntegerField(default=0)
    
    def __str__(self):
        return f"{self.buyer.user.username}"

CATEGORY_TYPE = (
        ("novel", "Novel"),
        ("historical", "Historical"),
        ("biography", "Biography"),
        ("scientific", "Scientific"),
        ("miscellaneous", "Miscellaneous"),
        ("other", "Other")
    )

NOVEL_GENRE_TYPE = (
    ("fiction", "Fiction"),
    ("fantasy", "Fantasy"),
    ("mystery", "Mystery"),
    ("romance", "Romance"),
    ("sci-fi", "Sci-fi"),
    ("thriller", "Thriller")
)


class EbookModel(models.Model):
    ebook_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    buyer = models.ForeignKey(BuyerModel, on_delete=models.CASCADE, related_name="buyer_ebook")
    name = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    description = models.TextField(default="No Description")
    category = models.CharField(max_length=20, choices=CATEGORY_TYPE)
    genre = models.CharField(max_length=10, choices=NOVEL_GENRE_TYPE, null=True, blank=True)
    date = models.DateField(auto_now_add=True)
    views = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.name} - {self.buyer.user.username}"
    

class BookForSellBuyer(models.Model):
    book_id = models.UUIDField(primary_key=True, default=uuid.uuid4,editable=False)
    buyer = models.ForeignKey(BuyerModel, on_delete=models.CASCADE, related_name="buyer_books_sell")
    name = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    description = models.TextField(default="No Description")
    price = models.DecimalField(max_digits=6,decimal_places=2)
    category = models.CharField(max_length=20, choices=CATEGORY_TYPE)
    genre = models.CharField(max_length=10, choices=NOVEL_GENRE_TYPE, null=True, blank=True)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.buyer.user.username}"
