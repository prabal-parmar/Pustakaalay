from django.urls import path
from Seller import views

urlpatterns = [
    path('profile/', views.get_profile, name="Seller Profile Page"),
    path('add-book/', views.add_book, name="Add New Book"),
    path('my-all-books/', views.seller_books_data, name="Seller all books data")
]