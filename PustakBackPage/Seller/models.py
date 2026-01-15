from django.db import models
from Users.models import SellerModel
import uuid
# Create your models here.

class SellerProfile(models.Model):
    seller = models.OneToOneField(SellerModel, on_delete=models.CASCADE, related_name="seller")
    description = models.TextField(default="I am using Pustakaalay 📚")
    followers = models.IntegerField(default=0)
    total_books = models.IntegerField(default=0)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0)

    def __str__(self):
        return f"{self.seller.user.username}"
    
class BookDataModel(models.Model):
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

    EDUCATIONAL_TYPE = (
        ("science", "Science"),
        ("history", "History"),
        ("technology", "Technology"),
        ("mathematics", "Mathematics"),
        ("medicine", "Medicine")
    )

    CONDITION_TYPE = (
        ("new", "New"),
        ("old", "Old")
    )

    book_id = models.UUIDField(primary_key=True, default=uuid.uuid4,editable=False)
    seller = models.ForeignKey(SellerModel, on_delete=models.CASCADE, related_name="seller_books_sell")
    name = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    description = models.TextField(default="None")
    price = models.DecimalField(max_digits=6,decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)
    educational_content = models.BooleanField(default=False)
    category = models.CharField(max_length=20, choices=CATEGORY_TYPE)
    condition = models.CharField(max_length=5, choices=CONDITION_TYPE)
    genre = models.CharField(max_length=10, choices=NOVEL_GENRE_TYPE, null=True, blank=True)
    educational_type = models.CharField(max_length=15, choices=EDUCATIONAL_TYPE, null=True, blank=True)

    def __str__(self):
        return f"{self.seller.user.username} - {self.name} - {self.condition}"
