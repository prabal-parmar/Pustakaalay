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
    path('<str:username>/ebook/<str:ebook_id>/', views.viewed_ebook, name="Open Ebook with id"),
    path('hot-picks/', views.get_hot_ebook_picks, name="Hot Ebook data for Buyer"),
    path('trade-history/', views.get_trade_history, name="Fetch Trade History of books."),
    path('rec-exchange/', views.get_local_exchange, name="Local Exchange for Buyer"),
    path('explore/', views.fetch_books_ebooks_for_explore, name="Books, Ebooks, Exchange Books for explore page"),
    path('books/<str:type>/<str:username>/<str:id>/', views.fetch_book_ebook_by_id, name="Books or Ebooks or ExchangeBooks by Id"),
    path('<str:type>/<str:username>/<str:id>/like/', views.like_book_ebook_by_id, name="Like Book or Ebook by Id"),
    path('mybooks/my/<str:type>/<str:id>/', views.fetch_my_book_ebook_by_id, name="Buyer book, ebook or exchange book"),
    path('books/all-liked-books/', views.fetch_favorite_books, name="Favorite Books of Buyer"),
    path('mybooks/delete/<str:type>/<str:id>/', views.delete_my_book_ebook, name="Delete my book or ebook")
]