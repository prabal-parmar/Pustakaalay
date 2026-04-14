from django.utils import timezone
import random
import datetime
# Function to convert time into required format
def time_ago(dt):
    now = timezone.now()
    diff = now - dt

    seconds = diff.total_seconds()

    if seconds < 60:
        return f"{int(seconds)}s ago"
    elif seconds < 3600:
        return f"{int(seconds // 60)}m ago"
    elif seconds < 86400:
        return f"{int(seconds // 3600)}h ago"
    elif seconds < 604800:
        return f"{int(seconds // 86400)}d ago"
    elif seconds < 2592000:
        return f"{int(seconds // 604800)}w ago"
    elif seconds < 31536000:
        return f"{int(seconds // 2592000)}mo ago"
    else:
        return f"{int(seconds // 31536000)}y ago"

# Function to add randomness and freshness in books set
def refine_books_with_randomness(books, randomness=0.2):
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

        random_boost = random.uniform(0, 5)

        book.final_score = base_score + (freshness * 10) + random_boost

    books.sort(key=lambda x: x.final_score, reverse=True)
    return books