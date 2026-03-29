from django.urls import path, include
from Buyer import views

urlpatterns = [
    path('profile/', views.get_profile, name="Buyers urls"),
    path('sell-book/', views.add_new_book_to_sell, name="Add book to sell"),
    path('e-book/', views.add_new_ebook, name="Add new e-book"),
    path('exchange-book/', views.add_exchange_book, name="Add New Book to Exchange"),
    path('my-sell-books/', views.fetch_buyer_book, name="Buyer Book to sell"),
    path('my-ebooks/', views.fetch_buyer_ebook, name="Buyer All E-book"),
    path('exchange-books/', views.fetch_buyer_exchange_book, name="Send all exchange books of buyer"),
    path('<str:username>/ebook/<str:ebook_id>/', views.viewed_ebook, name="Open Ebook with id")
]