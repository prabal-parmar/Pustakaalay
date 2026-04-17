from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from Users.models import BuyerModel, CustomUser
from Seller.models import BookDataModel, BookHistoryModel
from .models import (BuyerProfile, 
                     EbookModel, 
                     EbookHistory, 
                     ExchangeBookModel,
                     TradeHistoryModel,
                     ExchangeBookHistory)
from  Models.buyerModels import calculate_score, refine_books_with_randomness
from datetime import datetime
from django.db.models.functions import Random

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
    if not user:
        return Response({"message": "User not found", "data": None, "completed": True}, 
                        status=status.HTTP_404_NOT_FOUND)

    find_book = BookDataModel.objects.filter(name=name, author=author, user=user).first()

    if find_book is not None:
        return Response({"message": "Book already added.", "completed": False}, status=status.HTTP_200_OK)
    
    educational_content = request.data.get("educational_content")
    condition = request.data.get("condition")
    description = request.data.get("description")
    price = float(request.data.get("price"))
    category = str(request.data.get("category")).split(" ")[0]
    genre = request.data.get("genre")
    BookDataModel.objects.create(name=name, 
                                 author=author,
                                 description=description,
                                 price=price,
                                 category=category,
                                 genre=genre,
                                 user=user,
                                 educational_content=educational_content or False,
                                 condition=condition or "new")
    
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

# Add new book to exchange
@api_view(['POST'])
def add_exchange_book(request):
    username = request.data.get("username")

    user = CustomUser.objects.filter(username=username).first()
    buyer = BuyerModel.objects.filter(user=user).first()
    if not buyer:
        return Response({"message": "Unable to find buyer.", 
                         "data": None, 
                         "completed": False}, status=status.HTTP_404_NOT_FOUND)
    
    name = request.data.get("myBookName")
    author = request.data.get("myAuthor")
    already_added = ExchangeBookModel.objects.filter(buyer=buyer, name=name, author=author).first()
    if already_added:
        return Response({"message": "Book already added.", 
                         "data": already_added.book_id, 
                         "completed": True}, status=status.HTTP_200_OK)

    category = request.data.get("myCategory")
    genre = request.data.get("myGenre")
    condition = request.data.get("myCondition")
    desired_category = request.data.get("desiredCategory")
    desired_genre = request.data.get("desiredGenre")
    wanted_condition = request.data.get("desiredCondition")
    description = request.data.get("exchangeNotes")

    ExchangeBookModel.objects.create(buyer=buyer,
                                     name=name,
                                     author=author,
                                     category=category,
                                     genre=genre,
                                     condition=condition,
                                     desired_category=desired_category,
                                     desired_genre=desired_genre,
                                     wanted_condition=wanted_condition,
                                     description=description)
    
    return Response({"message": "New Book to Exchange added.", 
                     "data": None, 
                     "completed": True}, status=status.HTTP_201_CREATED)

# Fetch all E-book of buyer
@api_view(['GET'])
def fetch_buyer_ebook(request):
    username = request.query_params.get("username")
    user = CustomUser.objects.filter(username=username).first()
    buyer = BuyerModel.objects.filter(user=user).first()

    if buyer is None:
        return Response({"message": "User not found", "data": None, "completed": True}, 
                        status=status.HTTP_404_NOT_FOUND)
    
    all_ebooks = EbookModel.objects.filter(buyer=buyer).all()

    ebook_data = []

    for ebook in all_ebooks:
        created_date = ebook.date
        data = {
            "id": ebook.ebook_id,
            "title": ebook.name,
            "author": ebook.author,
            "status": "ACTIVE", # need to consider after
            "postedDate": created_date.strftime("%b %d, %Y"),
            "genre": ebook.genre,
            "reads": ebook.views
        }
        ebook_data.append(data)
    return Response({"message": "Buyer E-books sent", "data": ebook_data, "completed": True}, status=status.HTTP_200_OK)

# Fetch all books of buyer
@api_view(['GET'])
def fetch_buyer_book(request):
    username = request.query_params.get("username")
    user = CustomUser.objects.filter(username=username).first()
    buyer = BuyerModel.objects.filter(user=user).first()

    if buyer is None:
        return Response({"message": "User not found", "data": None, "completed": True}, 
                        status=status.HTTP_404_NOT_FOUND)
    
    all_books = BookDataModel.objects.filter(user=user).all()

    book_data = []

    for book in all_books:
        data = {
            "id": book.book_id,
            "type": "selling",
            "title": book.name,
            "author": book.author,
            "price": book.price,
            "status": "ACTIVE", # need to consider after
            "reads": "0",      # need to consider after
            "postedDate": book.created_at.strftime("%b %d, %Y"),
            "genre": book.genre,
        }
        book_data.append(data)

    return Response({"message": "Buyer books sent", "data": book_data, "completed": True}, status=status.HTTP_200_OK)

# Fetch all exchange books of buyer
@api_view(['GET'])
def fetch_buyer_exchange_book(request):
    username = request.query_params.get("username")
    user = CustomUser.objects.filter(username=username).first()
    buyer = BuyerModel.objects.filter(user=user).first()

    if buyer is None:
        return Response({"message": "User not found", "data": None, "completed": True}, 
                        status=status.HTTP_404_NOT_FOUND)
    
    all_exchange_books = ExchangeBookModel.objects.filter(buyer=buyer).all()

    exchange_books = []
    for book in all_exchange_books:
        created_date = book.date
        data = {
            "id": book.book_id,
            "type": "exchange",
            "title": book.name.title(),
            "author": book.author.title(),
            "condition": book.condition.capitalize(),
            "preferredExchange": book.category.capitalize(),
            "postedDate": created_date.strftime("%b %d, %Y"),
            "genre": book.genre.capitalize(),
            "location": "Indore, M.P." # Dummy for now
        }
        exchange_books.append(data)
    
    return Response({"message": "Buyer Exchange books sent", "data": exchange_books, "completed": True}, status=status.HTTP_200_OK)

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

# Check if buyer had opened ebook or not
@api_view(['GET'])
def viewed_ebook(request, ebook_id, username):
    user = CustomUser.objects.filter(username=username).first()
    if not user:
        return Response({"message": "Can not find User", "data": None}, status=status.HTTP_404_NOT_FOUND)
    
    buyer = BuyerModel.objects.filter(user=user).first()
    if not buyer:
        return Response({"message": "Can not find buyer", "data": None}, status=status.HTTP_404_NOT_FOUND)
    
    ebook = EbookModel.objects.filter(ebook_id=ebook_id).first()
    if not ebook:
        return Response({"message": f"No E-book found with id: {ebook_id}", "data": None}, status=status.HTTP_404_NOT_FOUND)
    
    check_view = EbookHistory.objects.filter(ebook_id=ebook, buyer_seen=buyer)
    if check_view:
        return Response({"message": "Already Opened", "data": {"id": None}}, status=status.HTTP_200_OK)
    else:
        ebook.views += 1
        ebook.save()
        EbookHistory.objects.create(ebook_id=ebook, buyer_seen=buyer).save()
        return Response({"message": "Views Updated", "data": { "id": ebook_id }}, status=status.HTTP_200_OK)

# Fetch Hot Ebooks for home page
@api_view(['GET'])
def get_hot_ebook_picks(request):
    username = request.query_params.get("username")
    user = CustomUser.objects.filter(username=username).first()
    buyer = BuyerModel.objects.filter(user=user).first()

    if buyer is None:
        return Response({"message": "Unable to find buyer.", 
                         "data": None, 
                         "completed": False}, status=status.HTTP_404_NOT_FOUND)

    ebooks = list(EbookModel.objects.exclude(buyer=buyer).all())
    for ebook in ebooks:
        ebook.score = calculate_score(ebook)
        ebook.save()
    
    ebooks.sort(key=lambda e: e.score, reverse=True)

    hot_ebooks = ebooks[:3]

    data_to_send = []
    for ebook in hot_ebooks:
        data = {
            "id": ebook.ebook_id,
            "title": ebook.name,
            "author": ebook.author,
            "rating": float(ebook.rating),
            "reads": int(ebook.views)
        }
        data_to_send.append(data)

    
    return Response({"message": "Hot Ebooks data sent.", 
                     "data": data_to_send, 
                     "completed": True}, status=status.HTTP_200_OK)

# Fetch trade history of buyer
@api_view(['GET'])
def get_trade_history(request):
    username = request.query_params.get("username")
    user = CustomUser.objects.filter(username=username).first()
    buyer = BuyerModel.objects.filter(user=user).first()
    if not buyer:
        return Response({"message": "Unable to find buyer.", 
                         "data": None, 
                         "completed": False}, status=status.HTTP_404_NOT_FOUND)
    
    bought_books = list(TradeHistoryModel.objects.filter(trade_buyer=buyer).all())
    sold_books = list(TradeHistoryModel.objects.filter(trade_seller=buyer).all())

    books_data = []
    # For bought books
    for book in bought_books:
        temp = {
            "id": book.trade_id,
            "title": book.trade_exchange_book.name if book.trade_exchange_book else book.trade_sell_book.name,
            "to": book.trade_seller.user.username,
            "date": book.date.strftime("%b %d, %Y"),
            "type": book.trade_type
        }
        books_data.append(temp)

    # For sold books
    for book in sold_books:
        temp = {
            "id": book.trade_id,
            "title": book.trade_exchange_book.name if book.trade_exchange_book else book.trade_sell_book.name,
            "to": book.trade_buyer.user.username,
            "date": book.date.strftime("%b %d, %Y"),
            "type": book.trade_type
        }
        books_data.append(temp)
    
    sorted_data = sorted(
                        books_data, 
                        key=lambda x: datetime.strptime(x["date"], "%b %d, %Y")
                        )
    return Response({"message": "Trade history data of books sent.", 
                     "data": sorted_data,
                     "completed": True}, status=status.HTTP_200_OK)

# Fetch Local Exchange books (currently not local just random 2 - local need to change)
@api_view(['GET'])
def get_local_exchange(request):
    username = request.query_params.get("username")
    user = CustomUser.objects.filter(username=username).first()
    buyer = BuyerModel.objects.filter(user=user)
    if not buyer:
        return Response({"message": "Unable to find buyer.", 
                         "data": None, 
                         "completed": False}, status=status.HTTP_404_NOT_FOUND)
    
    random_exchanges = list(ExchangeBookModel.objects.order_by(Random())[:2])
    books_data = []

    for book in random_exchanges:
        temp = {
            "id": book.book_id,
            "title": book.name.capitalize(),
            "author": book.author.capitalize(),
            "type": "Echange",
            "price": book.category.capitalize(),
            "distance": "-",
            "condition": book.condition.capitalize()
        }
        books_data.append(temp)
    
    return Response({"message": "Recommended Books sent.", 
                     "data": books_data, 
                     "completed": True}, status=status.HTTP_200_OK)

# Fetch all books and ebooks for explore page with type
@api_view(['GET'])
def fetch_books_ebooks_for_explore(request):
    username=request.query_params.get("username")
    user=CustomUser.objects.filter(username=username).first()
    buyer=BuyerModel.objects.filter(user=user).first()
    if not user:
        return Response({"message": "User not found.", 
                         "data": None, 
                         "completed": False}, status=status.HTTP_404_NOT_FOUND)
    
    books = BookDataModel.objects.exclude(user=user).ranked()
    books = list(books)
    books_with_randomness=refine_books_with_randomness(books)

    final_books = [
                        {
                            "id": book.book_id,
                            "title": book.name,
                            "author": book.author,
                            "price": f"₹{book.price}",
                            "seller": book.user.username,
                            "condition": book.condition,
                            "genre": book.genre,
                            "category": "Buy",
                            "distance": "1 km", # To be added later if needed
                            "liked": (BookHistoryModel.objects.filter(user=user, book=book).first() 
                                      and 
                                      BookHistoryModel.objects.filter(user=user, book=book).first().liked)
                        }
                        for book in books_with_randomness
                  ]
    ebooks=EbookModel.objects.exclude(buyer=buyer).ranked()
    ebooks=list(ebooks)
    ebooks_with_randomness=refine_books_with_randomness(ebooks)
    final_ebooks = [
                        {
                            "id": book.ebook_id,
                            "title": book.name,
                            "author": book.author,
                            "price": "Free",
                            "seller": book.buyer.user.username,
                            "genre": book.genre,
                            "category": "Ebook",
                            "distance": "1 km", # To be added later if needed
                            "liked": (EbookHistory.objects.filter(ebook_id=book, buyer_seen=buyer).first() 
                                      and 
                                      EbookHistory.objects.filter(ebook_id=book, buyer_seen=buyer).first().liked)
                        }
                        for book in ebooks_with_randomness
                  ]
    
    exchange_books = ExchangeBookModel.objects.exclude(buyer=buyer).ranked()
    exchange_books = list(exchange_books)
    exc_books_with_randomness = refine_books_with_randomness(exchange_books)

    final_exc_books = [
                        {
                            "id": book.book_id,
                            "title": book.name,
                            "author": book.author,
                            "price": "Exchange",
                            "seller": book.buyer.user.username,
                            "condition": book.condition,
                            "genre": book.genre,
                            "category": "Exchange",
                            "distance": "1 km", # To be added later if needed
                            "liked": (ExchangeBookHistory.objects.filter(buyer=buyer, book=book).first() 
                                      and 
                                      ExchangeBookHistory.objects.filter(buyer=buyer, book=book).first().liked)
                        }
                        for book in exc_books_with_randomness
                  ]
    
    explore_books=final_books + final_ebooks + final_exc_books
    return Response({"message": "All Books and Ebooks data sent.", 
                     "data": explore_books, 
                     "completed": True}, status=status.HTTP_200_OK)

# Fetch book or ebook or exchange book by id
@api_view(['GET'])
def fetch_book_ebook_by_id(request, type, username, id):
    user=CustomUser.objects.filter(username=username).first()
    buyer=BuyerModel.objects.filter(user=user).first()
    if not user:
        return Response({"message": "User not found.", 
                         "data": None, 
                         "completed": False}, status=status.HTTP_404_NOT_FOUND)
    
    if type=="buy":
        book=BookDataModel.objects.filter(book_id=id).first()
        if not book:
            return Response({"message": f"Unable to find book with id: {id}", 
                         "data": None, 
                         "completed": False}, status=status.HTTP_404_NOT_FOUND)

        book_history=BookHistoryModel.objects.filter(user=user, book=book).first()
        book_data = {
            "id": book.book_id,
            "name": book.name.title(),
            "author": book.author.title(),
            "image": "https://picsum.photos/200", # To be added later
            "description": book.description,
            "price": book.price,
            "category": book.category.title(),
            "genre": book.genre.title(),
            "isEducational": book.educational_content,
            "totalLikes": book.likes,
            "totalViews": book.views,
            "savedByCount": book.saved,
            "rating": book.rating,
            "liked": book_history.liked if book_history else False,
            "saved": book_history.saved if book_history else False
        }

        return Response({"message": f"Book data for id: {id} sent.", 
                     "data": book_data, 
                     "completed": True}, status=status.HTTP_200_OK)

    elif type=="ebook":
        ebook=EbookModel.objects.filter(ebook_id=id).first()
        ebook_history=EbookHistory.objects.filter(buyer_seen=buyer, ebook_id=ebook).first()
        ebook_data = {
            "ebook_id": ebook.ebook_id,
            "name": ebook.name.title(),
            "author": ebook.author.title(),
            "image": "https://picsum.photos/200", # To be added later
            "description": ebook.description,
            "category": ebook.category.title(),
            "genre": ebook.genre.title(),
            "views": ebook.views,
            "likes": ebook.likes,
            "saved": ebook.saved,
            "rating": ebook.rating,
            "liked": ebook_history.liked if ebook_history else False,
            "saved_status": ebook_history.saved if ebook_history else False
        }

        return Response({"message": f"Ebook data for id: {id} sent.", 
                     "data": ebook_data, 
                     "completed": True}, status=status.HTTP_200_OK)
    
    elif type=="exchange":
        exchange_book=ExchangeBookModel.objects.filter(book_id=id).first()
        exchange_book_history=ExchangeBookHistory.objects.filter(buyer=buyer, book=exchange_book).first()
        exchange_book_data={
            "book_id": exchange_book.book_id,
            "name": exchange_book.name.title(),
            "author": exchange_book.author.title(),
            "image": "https://picsum.photos/200",
            "category": exchange_book.category.title(),
            "genre": exchange_book.genre.title(),
            "condition": exchange_book.condition.title(),
            "description": exchange_book.description,
            "desired_category": exchange_book.desired_category.title(),
            "desired_genre": exchange_book.desired_genre.title(),
            "wanted_condition": exchange_book.wanted_condition.title(),
            "likes": exchange_book.likes,
            "saved": exchange_book.saved,
            "views": exchange_book.views,
            "rating": exchange_book.rating,
            "liked": exchange_book_history.liked if exchange_book_history else False,
            "saved_status": exchange_book_history.saved if exchange_book_history else False
        }

        return Response({"message": f"Exchange book data for id: {id} sent.", 
                     "data": exchange_book_data,
                     "completed": True}, status=status.HTTP_200_OK)

# Like book or ebook or exchange book by id and type
@api_view(['PUT'])
def like_book_ebook_by_id(request, type, username, id):
    user=CustomUser.objects.filter(username=username).first()
    buyer=BuyerModel.objects.filter(user=user).first()
    if not user:
        return Response({"message": "User not found.",
                         "data": None,
                         "completed": False}, status=status.HTTP_404_NOT_FOUND)
    
    if type == "Buy":
        book=BookDataModel.objects.filter(book_id=id).first()
        if not book:
            return Response({"message": "Book not found.", 
                         "data": None, 
                         "completed": False}, status=status.HTTP_404_NOT_FOUND)
        
        book_history=BookHistoryModel.objects.filter(book=book, user=user).first()
        if not book_history:
            BookHistoryModel.objects.create(book=book,
                                            user=user,
                                            liked=True).save()
            book.views += 1
            book.likes += 1
            book.save()
            return Response({"message": f"Book liked for id: {id}.",
                            "data": id,
                            "completed": True}, status=status.HTTP_200_OK)
        else:
            book_history.liked = not book_history.liked
            book_history.save()

            return Response({"message": f"Book like toggled for id: {id}.",
                            "data": id,
                            "completed": True}, status=status.HTTP_200_OK)

    elif type == "Ebook":
        ebook=EbookModel.objects.filter(ebook_id=id).first()
        if not ebook:
            return Response({"message": "Ebook not found.", 
                            "data": None,
                            "completed": False}, status=status.HTTP_404_NOT_FOUND)
        
        ebook_history=EbookHistory.objects.filter(ebook_id=ebook, buyer_seen=buyer).first()
        if not ebook_history:
            EbookHistory.objects.create(ebook_id=ebook,
                                        buyer_seen=buyer,
                                        liked=True).save()
            ebook.views += 1
            ebook.likes += 1
            ebook.save()
            return Response({"message": f"Ebook liked for id: {id}.",
                            "data": id,
                            "completed": True}, status=status.HTTP_200_OK)
        else:
            ebook_history.liked = not ebook_history.liked
            ebook_history.save()

            return Response({"message": f"Ebook like toggled for id: {id}.",
                            "data": id,
                            "completed": True}, status=status.HTTP_200_OK)
    
    elif type == "Exchange":
        exchange_book=ExchangeBookModel.objects.filter(book_id=id).first()
        if not exchange_book:
            return Response({"message": "Exchange book not found.", 
                            "data": None, 
                            "completed": False}, status=status.HTTP_404_NOT_FOUND)
        
        exchange_book_history=ExchangeBookHistory.objects.filter(book=exchange_book, buyer=buyer).first()
        if not exchange_book_history:
            ExchangeBookHistory.objects.create(book=exchange_book,
                                               buyer=buyer).save()
            
            exchange_book.views += 1
            exchange_book.likes += 1
            exchange_book.save()
            return Response({"message": f"Exchange book liked for id: {id}.",
                            "data": id,
                            "completed": True}, status=status.HTTP_200_OK)
        else:
            exchange_book_history.liked = not exchange_book_history.liked
            exchange_book_history.save()

            return Response({"message": f"Exchange book toggle for id: {id}.",
                            "data": id,
                            "completed": True}, status=status.HTTP_200_OK)
    
    else:
        return Response({"message": "Invalid Book type.", 
                        "data": None,
                        "completed": False}, status=status.HTTP_404_NOT_FOUND)