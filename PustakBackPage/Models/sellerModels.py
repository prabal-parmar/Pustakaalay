from django.utils import timezone

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