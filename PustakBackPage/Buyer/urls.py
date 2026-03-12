from django.urls import path, include
from Buyer import views

urlpatterns = [
    path('profile/', views.get_profile, name="Buyers urls"),
    path('sell-book/', views.add_new_book_to_sell, name="Add book to sell"),
    path('e-book/', views.add_new_ebook, name="Add new e-book"),
    path('my-sell-books/', views.buyer_books_to_sell, name="Buyer Book to sell")
]