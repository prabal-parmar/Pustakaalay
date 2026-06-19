from django.utils import timezone
import random
import datetime
# Function to convert time into required format
def time_ago(dt):
    now = timezone.now()
    diff = now - dt

    days = diff.days

    if days == 0:
        return "Today"
    elif days == 1:
        return "1 day ago"
    else:
        return f"{days} days ago"

# Function to add randomness and freshness in books set
def refine_books_with_randomness(books, randomness_range=5):
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