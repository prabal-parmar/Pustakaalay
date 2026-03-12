from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from Users.models import BuyerModel, CustomUser
from .models import BuyerProfile, BookForSellBuyer, EbookModel
from django.utils import timezone

# Buyer Profile
@api_view(['GET'])
def get_profile(request):
    username = request.query_params.get("username")
    user = CustomUser.objects.filter(username=username).first()
    buyer = BuyerModel.objects.filter(user=user).first()
    buyer_profile = BuyerProfile.objects.filter(buyer=buyer).first()

    if buyer_profile is not None:
        data = {
            "name" : f"{buyer_profile.buyer.user.first_name} {buyer_profile.buyer.user.last_name}",
            "username" : buyer_profile.buyer.user.username,
            "location" : buyer_profile.buyer.city,
            "following" : buyer_profile.following,
            "followers" : buyer_profile.followers,
            "description" : buyer_profile.description,
        }
        return Response(
            {"data": data,
            "message": "Buyer Profile data sent"}, 
            status=status.HTTP_200_OK)
    else:
        return Response(
            {"data": None,
            "message": "Unable to fetch buyer profile data"}, 
            status=status.HTTP_204_NO_CONTENT)

# Send Buy book request
@api_view(['GET'])
def send_buy_book_request(request):
    return Response({"data": "Buy Book Request"})

# Exchange book request
@api_view(['GET'])
def send_exchange_book_request(request):
    return Response({"data": "Exchange book request"})

# Accept request to exchange
@api_view(['POST'])
def accept_exchange_request_from_buyer(request):
    return Response({"data": "Accept exchange request"})

# Add new book to sell
@api_view(['POST'])
def add_new_book_to_sell(request):
    name = request.data.get("name")
    author = request.data.get("author")
    username = request.data.get("username")
    user = CustomUser.objects.filter(username=username).first()
    buyer = BuyerModel.objects.filter(user=user).first()

    find_book = BookForSellBuyer.objects.filter(name=name, author=author, buyer=buyer).first()

    if find_book is not None:
        return Response({"message": "Book already added.", "completed": False}, status=status.HTTP_200_OK)
    
    description = request.data.get("description")
    price = float(request.data.get("price"))
    category = str(request.data.get("category")).split(" ")[0]
    genre = request.data.get("genre")
    BookForSellBuyer.objects.create(name=name, 
                                 author=author,
                                 description=description,
                                 price=price,
                                 category=category,
                                 genre=genre,
                                 buyer=buyer)
    
    return Response({"message": f"{name} added successfully.", "completed": True}, status=status.HTTP_201_CREATED)

# Add new ebook
@api_view(['POST'])
def add_new_ebook(request):
    name = request.data.get("name")
    author = request.data.get("author")
    username = request.data.get("username")
    user = CustomUser.objects.filter(username=username).first()
    buyer = BuyerModel.objects.filter(user=user).first()

    find_ebook = EbookModel.objects.filter(name=name, author=author, buyer=buyer).first()

    if find_ebook is not None:
        return Response({"message": "Book already added.", "completed": False}, status=status.HTTP_200_OK)
    
    description = request.data.get("description")
    category = str(request.data.get("category")).split(" ")[0]
    genre = request.data.get("genre")

    EbookModel.objects.create(name=name, 
                                 author=author,
                                 description=description,
                                 category=category,
                                 genre=genre,
                                 buyer=buyer)
    
    return Response({"message": f"{name} uploaded successfully.", "completed": True}, status=status.HTTP_201_CREATED)

# Buyer books to sell
@api_view(['GET'])
def buyer_books_to_sell(request):
    username = request.query_params.get("username")
    user = CustomUser.objects.filter(username=username).first()
    buyer = BuyerModel.objects.filter(user=user).first()

    if buyer is None:
        return Response({"message": "User not found", "data": None, "completed": True}, 
                        status=status.HTTP_404_NOT_FOUND)
    
    all_books = BookForSellBuyer.objects.filter(buyer=buyer).all()

    book_data = []

    for book in all_books:
        created_date = book.date
        data = {
            "id": book.book_id,
            "type": "selling",
            "title": book.name,
            "author": book.author,
            "price": book.price,
            "status": "ACTIVE", # need to consider after
            "views": "0",      # need to consider after
            "postedDate": created_date.strftime("%b %d, %Y"),
            "genre": book.genre,
        }
        book_data.append(data)

    return Response({"message": "Buyer books sent", "data": book_data, "completed": True}, status=status.HTTP_200_OK)

# Accept request to sell
@api_view(['POST'])
def accept_sell_request_from_buyer(request):
    return Response({"data": "Accept sell request"})

# Buy request from other buyer
@api_view(['GET'])
def all_buy_book_requests(request):
    return Response({"data": "Buy book requests"})

# Exchange request from other buyer
@api_view(['GET'])
def all_exchange_book_requests(request):
    return Response({"data": "Exchange book requests"})
