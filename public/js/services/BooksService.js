app.service('BooksService', function($http) {
    const apiUrl = 'http://localhost:8000/api/books';

    // Fetch all books from the API
    this.getBooks = function() {
        return $http.get(apiUrl)
            .then(response => {
                console.log('Raw API response:', response);
                return response.data;
            })
            .catch(error => {
                console.error('Error fetching books:', error);
                throw error;
            });
    };

    // Add a new book to the API
    this.addBook = function(newBook) {
        console.log('Sending new book data:', newBook);
        return $http.post(apiUrl, newBook)
            .then(response => {
                console.log('Server response for add:', response);
                return response.data;
            })
            .catch(error => {
                console.error('Error adding book:', error);
                throw error;
            });
    };

    // Delete a book
    this.deleteBook = function(bookId) {
        return $http.delete(`${apiUrl}/${bookId}`)
            .then(response => {
                console.log('Delete response:', response);
                return bookId;
            })
            .catch(error => {
                console.error('Error deleting book:', error);
                throw error;
            });
    };

    // Mark a book as read
    this.markAsRead = function(bookId) {
        return $http.put(`${apiUrl}/${bookId}`, { readStatus: true })
            .then(response => {
                console.log('Mark as read response:', response);
                return response.data;
            })
            .catch(error => {
                console.error('Error marking book as read:', error);
                throw error;
            });
    };
});