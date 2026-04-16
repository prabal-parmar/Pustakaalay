import random
import datetime

# Calculate score to send hot picks
def calculate_score(book):
    return (book.likes * 3 + 
            book.views * 1 + 
            book.saved * 5)

# Function to add randomness and freshness in books set (less randomness for buyer)
def refine_books_with_randomness(books, randomness_range=3):
    now = datetime.datetime.now(datetime.timezone.utc)

    for book in books:
        age_days = (now - book.created_at).days
        freshness = 1 / (1 + age_days)

        base_score = (
            book.likes * 3 +
            book.saved * 2 +
            book.views +
            float(book.rating) * 5
        )

        random_boost = random.uniform(0, randomness_range)

        book.final_score = base_score + (freshness * 10) + random_boost

    books.sort(key=lambda x: x.final_score, reverse=True)
    return books