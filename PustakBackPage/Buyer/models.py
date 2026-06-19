from django.db import models
from Users.models import BuyerModel, CustomUser
from Seller.models import BookDataModel
import uuid
from django.db.models import F, FloatField, ExpressionWrapper

class EbookQuerySet(models.QuerySet):
    def ranked(self):
        score = ExpressionWrapper(
            (F('likes') * 3) +
            (F('saved') * 2) +
            (F('views') * 1) +
            (F('rating') * 5),
            output_field=FloatField()
        )

        return self.annotate(score=score).order_by('-score')

    def by_category(self, category):
        return self.filter(category=category)

    def by_genre(self, genre):
        return self.filter(genre=genre)

    def popular(self):
        return self.filter(likes__gte=10).order_by('-likes')

    def for_user(self, buyer):
        return self.filter(buyer=buyer)

class EbookManager(models.Manager):

    def get_queryset(self):
        return EbookQuerySet(self.model, using=self._db)

    def ranked(self):
        return self.get_queryset().ranked()

    def popular(self):
        return self.get_queryset().popular()


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

BOOK_CONDITION = (
    ("new", "New"),
    ("good", "Good"),
    ("fair", "Fair"),
    ("old", "Old")
)

TRADE_CHOICES = (
    ("sell", "Sell"),
    ("exchange", "Exchange"),
    ("bought", "Bought")
)

class EbookModel(models.Model):
    ebook_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    buyer = models.ForeignKey(BuyerModel, on_delete=models.CASCADE, related_name="buyer_ebook")
    name = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    description = models.TextField(default="No Description")
    category = models.CharField(max_length=20, choices=CATEGORY_TYPE)
    genre = models.CharField(max_length=10, choices=NOVEL_GENRE_TYPE, null=True, blank=True)
    date=models.DateField(auto_now_add=True)
    created_at=models.DateTimeField(auto_now_add=True)
    views = models.IntegerField(default=0)
    likes = models.IntegerField(default=0)
    saved = models.IntegerField(default=0)
    rating = models.FloatField(default=0)
    objects = EbookManager()

    def __str__(self):
        return f"{self.name} - {self.buyer.user.username}"
    
class EbookHistory(models.Model):
    ebook_id = models.ForeignKey(EbookModel, on_delete=models.CASCADE, related_name='ebook')
    buyer_seen = models.ForeignKey(BuyerModel, on_delete=models.CASCADE, related_name='buyerebook_buyer')
    last_page_number = models.IntegerField(default=1)
    saved = models.BooleanField(default=False)
    liked = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.buyer_seen.user.username} - {self.ebook_id}"
    
class ExchangeBookModel(models.Model):
    book_id = models.UUIDField(primary_key=True, default=uuid.uuid4,editable=False)
    buyer = models.ForeignKey(BuyerModel, on_delete=models.CASCADE, related_name="exchange_book_buyer")
    name = models.CharField(max_length=100, null=False)
    author = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=CATEGORY_TYPE)
    genre = models.CharField(max_length=10, choices=NOVEL_GENRE_TYPE, null=True, blank=True)
    date = models.DateField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)
    condition = models.CharField(max_length=10, choices=BOOK_CONDITION, default="fair")
    desired_category = models.CharField(max_length=20, choices=CATEGORY_TYPE)
    desired_genre = models.CharField(max_length=10, choices=NOVEL_GENRE_TYPE)
    wanted_condition = models.CharField(max_length=10, choices=BOOK_CONDITION, default="fair")
    description = models.TextField()
    likes = models.IntegerField(default=0)
    saved = models.IntegerField(default=0)
    views = models.IntegerField(default=0)
    rating = models.FloatField(default=0)
    objects=EbookManager() # Same Manager and QuerySet can be used for both

    def __str__(self):
        return f"{self.name} - {self.buyer.user.username}"

class ExchangeBookHistory(models.Model):
    book=models.ForeignKey(ExchangeBookModel, on_delete=models.CASCADE, related_name="exchange_book_name")
    buyer=models.ForeignKey(BuyerModel, on_delete=models.CASCADE, related_name="exchange_history_user")
    liked=models.BooleanField(default=False)
    saved=models.BooleanField(default=False)
    viewed=models.BooleanField(default=True)

    def __str__(self):
        return f"{self.book} - {self.buyer.user.username}"

class TradeHistoryModel(models.Model):
    trade_id = models.UUIDField(primary_key=True, default=uuid.uuid4,editable=False)
    trade_buyer = models.ForeignKey(BuyerModel, on_delete=models.CASCADE, related_name="trade_buyer")
    trade_seller = models.ForeignKey(BuyerModel, on_delete=models.CASCADE, related_name="trade_seller")
    trade_exchange_book = models.ForeignKey(ExchangeBookModel, on_delete=models.CASCADE, related_name="trade_exchange_book", null=True, blank=True)
    trade_sell_book = models.ForeignKey(BookDataModel, on_delete=models.CASCADE, related_name="trade_sell_book", null=True, blank=True)
    date = models.DateField(auto_now_add=True)
    trade_type = models.CharField(max_length=10, choices=TRADE_CHOICES)

    def __str__(self):
        return f"""
                Type: {self.trade_exchange_book if "exchange" else "sell"} - 
                Book: {self.trade_exchange_book if self.trade_exchange_book.name else self.trade_sell_book.name} - 
                Buyer: {self.trade_buyer.user.username} - 
                Seller: {self.trade_seller.user.username}
                """
    
class BuyBookRequest(models.Model):
    request_id=models.UUIDField(primary_key=True, default=uuid.uuid4,editable=False)
    owner=models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="book_owner")
    book=models.ForeignKey(BookDataModel, on_delete=models.CASCADE, related_name="buy_request_book_buyer")
    requester=models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="buy_book_requester")
    date=models.DateField(auto_now_add=True)
    requested_amount=models.IntegerField()

    def __str__(self):
        return f"Book:{self.book.name} - Requested by:{self.requester.username}"