from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
# Create your views here.

# Seller profile
@api_view(['GET'])
def get_profile(request):
    return Response({"data": "Seller Data"})

# Buy book request
@api_view(['GET'])
def buy_book_request(request):
    return Response({"data": "book request sent"})

# Exchange book request
@api_view(['GET'])
def exchange_book_request(request):
    return Response({"data": "Exchange book request"})

# Accept request to exchange
@api_view(['POST'])
def accept_exchange_request(request):
    return Response({"data": "Accept request"})

# Accept request to sell
@api_view(['POST'])
def accept_sell_request(request):
    return Response({"data": "Accept request"})

# Sell book
@api_view(['POST'])
def sell_book_seller(request):
    return Response({"data": "Books to sell."})

# Buy a book
# Seller books 
@api_view(['GET'])
def seller_all_books(request):
    return Response({"data": "Seller All Books"})