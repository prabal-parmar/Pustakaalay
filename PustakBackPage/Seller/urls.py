from django.urls import path
from Seller import views

urlpatterns = [
    path('profile/', views.get_profile, name="Seller Profile Page"),
    path('add-book/', views.add_book_to_sell, name="Add New Book"),
    path('my-all-books/', views.fetch_seller_books_data, name="Seller all books data"),
    path('my-inventory/', views.fetch_recent_inventory, name="Seller Books Inventory"),
    path('books/buy-request/<str:username>/', views.fetch_buy_book_recent_requests, name="All Buy book requests"),
    path('books/recommend/<str:username>/', views.fetch_you_can_buy_books, name="Books seller can buy"),
    path('books/<str:username>/<str:id>/', views.fetch_book_data_by_id, name="Book data using id"),
    path('books/mybooks/<str:username>/<str:book_id>', views.fetch_mybook_by_id, name="Fetch My book of seller for book_id")
]