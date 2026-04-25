from django.db import models
from Users.models import SellerModel, CustomUser
import uuid
from django.core.validators import MinValueValidator
from django.db.models import F, FloatField, ExpressionWrapper
# Create your models here.

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
    ("old", "Old"),
    ("good", "Good")
)

# Queryset to make ranked a query
class BookQuerySet(models.QuerySet):
    def ranked(self):
        score = ExpressionWrapper(
            (F('likes') * 3) +
            (F('saved') * 2) +
            (F('views') * 1) +
            (F('rating') * 5),
            output_field=FloatField()
        )

        return self.annotate(score=score).order_by('-score')

# BookManager for BookDataModel with freshness
class BookManager(models.Manager):
    def get_queryset(self):
        return BookQuerySet(self.model, using=self._db)

    def ranked(self):
        return self.get_queryset().ranked()


class SellerProfile(models.Model):
    seller = models.OneToOneField(SellerModel, on_delete=models.CASCADE, related_name="seller")
    description = models.TextField(default="I am using Pustakaalay 📚")
    followers = models.IntegerField(default=0)
    total_books = models.IntegerField(default=0)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0)

    def __str__(self):
        return f"{self.seller.user.username}"

class BookDataModel(models.Model):
    book_id = models.UUIDField(primary_key=True, default=uuid.uuid4,editable=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="seller_books_sell")
    name = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    description = models.TextField(default="None")
    price = models.DecimalField(max_digits=6,decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)
    educational_content = models.BooleanField(default=False)
    category = models.CharField(max_length=20, choices=CATEGORY_TYPE)
    condition = models.CharField(max_length=5, choices=CONDITION_TYPE, default="Good")
    genre = models.CharField(max_length=10, choices=NOVEL_GENRE_TYPE, null=True, blank=True)
    educational_type = models.CharField(max_length=15, choices=EDUCATIONAL_TYPE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    likes = models.IntegerField(default=0)
    saved = models.IntegerField(default=0)
    views = models.IntegerField(default=0)
    rating=models.DecimalField(max_digits=1, decimal_places=1, default=0)

    objects=BookManager()

    def __str__(self):
        return f"{self.user.role} - {self.user.username} - {self.name}"
    
class BookHistoryModel(models.Model):
    book=models.ForeignKey(BookDataModel, on_delete=models.CASCADE, related_name="book_name")
    user=models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="history_user")
    liked=models.BooleanField(default=False)
    saved=models.BooleanField(default=False)
    viewed=models.BooleanField(default=True)

    def __str__(self):
        return f"History: {self.book.name} - {self.user.username}"

class BookBuyRequest(models.Model):
    buy_request_id=models.UUIDField(primary_key=True, default=uuid.uuid4,editable=False)
    book=models.ForeignKey(BookDataModel, on_delete=models.CASCADE, related_name="buy_request_book")
    user=models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="buy_request_user")
    negotiation_price=models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    description=models.TextField()
    time=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"Request: {self.book.name} - {self.user.username}"

