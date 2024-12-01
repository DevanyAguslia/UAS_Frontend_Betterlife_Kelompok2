app.controller('BooksController', function($scope, $timeout, BooksService) {
    // Initialize scope variables
    $scope.books = [];
    $scope.searchQuery = "";
    $scope.errorMessage = "";
    
    // Initialize newBook object
    $scope.newBook = {
        title: '',
        summary: '',
        link: '',
        image: ''
    };

    // Safely apply changes
    function safeApply(fn) {
        var phase = $scope.$root.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && typeof fn === 'function') {
                fn();
            }
        } else {
            $scope.$apply(fn);
        }
    }

    // Load books from backend
    $scope.loadBooks = function() {
        BooksService.getBooks()
            .then(function(data) {
                console.log('Books data received:', data);
                // Ensure books is always an array
                $scope.books = Array.isArray(data) ? data : [];
            })
            .catch(function(error) {
                console.error('Error loading books:', error);
                $scope.errorMessage = 'Error loading books: ' + (error.message || 'Unknown error');
            });
    };

    // Add a new book
    $scope.addBook = function() {
        // Basic validation
        if (!$scope.newBook.title || !$scope.newBook.summary) {
            alert('Please fill in at least the title and summary');
            return;
        }

        console.log('Attempting to add book:', $scope.newBook);

        BooksService.addBook($scope.newBook)
            .then(function(newBook) {
                console.log('Book added successfully:', newBook);
                // Ensure books is initialized as an array if it's not
                if (!Array.isArray($scope.books)) {
                    $scope.books = [];
                }
                // Add the new book to the array
                $scope.books.push(newBook);
                
                // Reset form
                $scope.newBook = {
                    title: '',
                    summary: '',
                    link: '',
                    image: ''
                };
                
                $timeout(function() {
                    alert('Book added successfully!');
                });
            })
            .catch(function(error) {
                console.error('Error adding book:', error);
                $timeout(function() {
                    alert('Error adding book: ' + (error.message || 'Unknown error'));
                });
            });
    };

    // Delete a book
    $scope.deleteBook = function(bookId) {
        if (!Array.isArray($scope.books)) {
            console.error('Books is not an array:', $scope.books);
            return;
        }

        if (confirm('Are you sure you want to delete this book?')) {
            BooksService.deleteBook(bookId)
                .then(function() {
                    $scope.books = $scope.books.filter(function(book) {
                        return book._id !== bookId;
                    });
                    $timeout(function() {
                        alert('Book deleted successfully!');
                    });
                })
                .catch(function(error) {
                    console.error('Error deleting book:', error);
                    $timeout(function() {
                        alert('Error deleting book: ' + (error.message || 'Unknown error'));
                    });
                });
        }
    };

    // Mark a book as read
    $scope.markAsRead = function(bookId) {
        if (!Array.isArray($scope.books)) {
            console.error('Books is not an array:', $scope.books);
            return;
        }

        BooksService.markAsRead(bookId)
            .then(function(updatedBook) {
                const index = $scope.books.findIndex(book => book._id === updatedBook._id);
                if (index !== -1) {
                    $scope.books[index] = updatedBook;
                }
                $timeout(function() {
                    alert('Book marked as read!');
                });
            })
            .catch(function(error) {
                console.error('Error marking book as read:', error);
                $timeout(function() {
                    alert('Error marking book as read: ' + (error.message || 'Unknown error'));
                });
            });
    };

    // Initialize controller
    $scope.init = function() {
        console.log('Initializing BooksController');
        $scope.loadBooks();
    };

    // Call init function
    $scope.init();
});