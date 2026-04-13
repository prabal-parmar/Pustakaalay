from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from Users.models import SellerModel, CustomUser
from .models import SellerProfile, BookDataModel, BookHistoryModel, BookBuyRequest
from rest_framework import status
from Models.sellerModels import time_ago
# Seller profile
@api_view(['GET'])
def get_profile(request):
    username = request.query_params.get("username")
    user = CustomUser.objects.filter(username=username).first()
    seller = SellerModel.objects.filter(user=user).first()
    if seller is None:
        return Response({"message": "User not found", "data": None, "completed": True}, 
                        status=status.HTTP_404_NOT_FOUND)
    
    seller_profile = SellerProfile.objects.filter(seller=seller).first()

    if seller_profile is not None:
        data = {
            "name" : f"{seller_profile.seller.name}",
            "username" : seller_profile.seller.user.username,
            "location" : seller_profile.seller.location,
            "totalBooks" : seller_profile.total_books,
            "followers" : seller_profile.followers,
            "description" : seller_profile.description,
            "rating": seller_profile.rating
        }
        return Response(
            {"data": data,
            "message": "Seller Profile data sent"}, 
            status=status.HTTP_200_OK)
    else:
        return Response(
            {"data": None,
            "message": "Unable to fetch seller profile data"}, 
            status=status.HTTP_204_NO_CONTENT)

# Add book to sell with data
@api_view(['POST'])
def add_book_to_sell(request):
    name = request.data.get("name")
    author = request.data.get("author")
    username = request.data.get("username")
    user = CustomUser.objects.filter(username=username).first()
    seller = SellerModel.objects.filter(user=user).first()
    if seller is None:
        return Response({"message": "User not found", "data": None, "completed": True}, 
                        status=status.HTTP_404_NOT_FOUND)
    
    find_book = BookDataModel.objects.filter(name=name, author=author, user=user).first()

    if find_book is not None:
        return Response({"message": "Book already added.", "completed": False}, status=status.HTTP_200_OK)
    
    description = request.data.get("description")
    price = request.data.get("price")
    quantity = request.data.get("quantity")
    educational_content = request.data.get("educational_content")
    category = str(request.data.get("category")).split(" ")[0]
    condition = request.data.get("condition")
    genre = request.data.get("genre")
    BookDataModel.objects.create(name=name, 
                                 author=author,
                                 description=description,
                                 price=price,
                                 quantity=quantity,
                                 educational_content=educational_content,
                                 category=category,
                                 condition=condition,
                                 user=user,
                                 genre=genre)
    
    return Response({"message": f"{name} added successfully.", "completed": True}, status=status.HTTP_201_CREATED)

# Fetch Seller books data
@api_view(['GET'])
def fetch_seller_books_data(request):
    username = request.query_params.get("username")

    user = CustomUser.objects.filter(username=username).first()
    seller = SellerModel.objects.filter(user=user).first()
    if seller is None:
        return Response({"message": "User not found", "data": None, "completed": True}, 
                        status=status.HTTP_404_NOT_FOUND)
    
    all_books = list(BookDataModel.objects.filter(user=user).order_by('-created_at').all())

    books = []
    for book in all_books:
        genre = str(book.genre)
        genre = genre[0].upper() + genre[1:]
        data = { 
            "id": str(book.book_id),
            "title": str(book.name), 
            "author": str(book.author),
            "price": float(book.price),
            "type": "Educational" if book.educational_content else "Novel" if book.category == "novel" else "Other",
            "genre": str(genre)
        }
        
        books.append(data)

    return Response({"data": books,
                     "message": "All books by seller sent", 
                     "completed": True}, status=status.HTTP_200_OK)

# Update seller profile
def update_profile(request):
    return Response({"data": "Update Profile"})

# Buy book request
@api_view(['GET'])
def buy_book_request(request):
    return Response({"data": "book request sent"})

# Accept request to sell
@api_view(['POST'])
def accept_sell_request(request):
    return Response({"data": "Accept request"})

# Sell book
@api_view(['POST'])
def sell_book_seller(request):
    return Response({"data": "Books to sell."})

# Seller books 
@api_view(['GET'])
def seller_all_books(request):
    return Response({"data": "Seller All Books"})

# Recent Inventory for seller home page
@api_view(['GET'])
def fetch_recent_inventory(request):
    username = request.query_params.get('username')
    user = CustomUser.objects.filter(username=username).first()
    seller = SellerModel.objects.filter(user=user).first()
    if seller is None:
        return Response({"message": "User not found", 
                         "data": None, 
                         "completed": True}, status=status.HTTP_404_NOT_FOUND)
    
    recent_books = list(BookDataModel.objects.filter(user=user).order_by('-created_at')[:2])
    
    book_data = []
    for book in recent_books:
        temp = {
            "id": book.book_id,
            "title": book.name,
            "price": float(book.price),
            "views": book.views
        }

        book_data.append(temp)
    
    return Response({"message": "My Inventory data sent.", 
                     "data": book_data, 
                     "completed": True}, status=status.HTTP_200_OK)

# Fetch recent 3 Buy Book Requests
@api_view(['GET'])
def fetch_buy_book_recent_requests(request, username):
    user=CustomUser.objects.filter(username=username).first()
    if not user:
        return Response({"message": "User not found", 
                         "data": None, 
                         "completed": True}, status=status.HTTP_404_NOT_FOUND)
    
    all_book_requests=list(BookBuyRequest.objects.filter(user=user).order_by('-time')[:3])

    books_data = []
    for book in all_book_requests:
        temp = {
            "id": book.buy_request_id,
            "title": book.book.name,
            "requester": book.user.username,
            "offer": book.negotiation_price,
            "time": time_ago(book.time)
        }
        books_data.append(temp)

    return Response({"message": "Books recent buy requests sent.", 
                         "data": books_data, 
                         "completed": True}, status=status.HTTP_200_OK)

# Fetch 2 books for you can buy (home page)
@api_view(['GET'])
def fetch_you_can_buy_books(request, username):
    user = CustomUser.objects.filter(username=username).first()
    if not user:
        return Response({"message": "User not found", 
                         "data": None, 
                         "completed": True}, status=status.HTTP_404_NOT_FOUND)
    
    books = list(BookDataModel.objects.exclude(user=user).order_by('price', 'book_id')[:2])

    book_data = []
    for book in books:
        data = {
            "id": book.book_id,
            "title": book.name,
            "seller": book.user.username,
            "price": book.price,
            "condition": book.condition
        }
        book_data.append(data)
    
    return Response({"message": "Books data sent.", 
                         "data": book_data, 
                         "completed": True}, status=status.HTTP_200_OK)

# Fetch a book full data using id
# Image to be added later
@api_view(['GET'])
def fetch_book_data_by_id(request, username, id):
    user=CustomUser.objects.filter(username=username).first()
    seller=SellerModel.objects.filter(user=user).first()
    if not seller:
        return Response({"message": "User not found", 
                         "data": None, 
                         "completed": True}, status=status.HTTP_404_NOT_FOUND)
    
    book=BookDataModel.objects.filter(book_id=id).first()
    if not book:
        return Response({"message": "Unable to find book.", 
                         "data": None, 
                         "completed": False}, status=status.HTTP_404_NOT_FOUND)
    book_data={
        "id": book.book_id,
        "name": book.name.title(),
        "author": book.author.title(),
        "image": "https://picsum.photos/200", # Temporarly added
        "description": book.description,
        "price": book.price,
        "category": book.category,
        "isEducational": book.educational_content,
        "totalLikes": book.likes,
        "totalViews": book.views,
        "savedByCount": book.saved,
        "rating": book.rating
    }

    return Response({"message": "Book data sent.", 
                     "data": book_data, 
                     "completed": True}, status=status.HTTP_200_OK)

# Fetch or Delete my book of seller by book id
# Book image to be added
@api_view(['GET', 'DELETE'])
def fetch_and_delete_mybook_by_id(request, username, book_id):
    user=CustomUser.objects.filter(username=username).first()
    seller=SellerModel.objects.filter(user=user).first()

    if not seller:
        return Response({"message": "User not found", 
                         "data": None, 
                         "completed": True}, status=status.HTTP_404_NOT_FOUND)
    
    book=BookDataModel.objects.filter(book_id=book_id).first()
    if not book:
        return Response({"message": "Book not found with this id",
                         "data": None,
                         "completed": False}, status=status.HTTP_404_NOT_FOUND)

    if request.method == "DELETE":
        book.delete()
        return Response({"message": f"Book deleted with id: {book_id}",
                         "data": None,
                         "completed": True}, status=status.HTTP_200_OK)

    book_data = {
        "book_id" : book.book_id,
        "name" : book.name.title(),
        "author" : book.author.title(),
        "description" : book.description,
        "price" : book.price,
        "quantity" : book.quantity,
        "educational_content" : book.educational_content,
        "category" : book.category.title(),
        "condition" : book.condition.title(),
        "genre" : book.genre.title(),
        "likes" : book.likes,
        "saved" : book.saved,
        "views" : book.views,
        "rating": book.rating
    }
    
    return Response({"message": "Seller Book sent.",
                     "data": book_data,
                     "completed": True}, status=status.HTTP_200_OK)