from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

# Buyer Profile
@api_view(['GET'])
def get_profile(request):
    return Response({"data": "Buyer's Profile"})

# Send Buy book request
@api_view(['GET'])
def buy_your_book_request(request):
    return Response({"data": "Buy Book Request"})

# Exchange book request
@api_view(['GET'])
def exchange_your_book_request(request):
    return Response({"data": "Exchange book request"})

# Accept request to exchange
@api_view(['POST'])
def accept_exchange_request_from_buyer(request):
    return Response({"data": "Accept exchange request"})

# Sell book
@api_view(['POST'])
def sell_book_to_others(request):
    return Response({"data": "Sell book request"})

# Buy request from other buyer
@api_view(['GET'])
def all_buy_book_requests(request):
    return Response({"data": "Buy book requests"})

# Exchange request from other buyer
@api_view(['GET'])
def all_exchange_book_requests(request):
    return Response({"data": "Exchange book requests"})
