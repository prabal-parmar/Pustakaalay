# Calculate score to send hot picks
def calculate_score(book):
    return (book.likes * 3 + 
            book.views * 1 + 
            book.saved * 5)

