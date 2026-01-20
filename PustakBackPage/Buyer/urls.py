from django.urls import path, include
from Buyer import views

urlpatterns = [
    path('profile/', views.get_profile, name="Buyers urls"),
    path('sell-book/', views.sell_book_to_others, name="Add book to sell")
]