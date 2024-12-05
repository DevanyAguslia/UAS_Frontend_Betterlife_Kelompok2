app.controller('BooksController', function($scope, $timeout, BooksService) {
    // Initialize scope variables
    $scope.books = [];
    // Tambahkan ini di BooksController.js setelah inisialisasi $scope.books
    $scope.presetBooks = [
        {
            title: "Deep Work",
            summary: "The ability to concentrate intensely is a skill that is becoming increasingly rare.",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1447957962i/25744928.jpg",
            link: "https://www.goodreads.com/book/show/25744928-deep-work?from_search=true&from_srp=true&qid=SvYiQKEl0F&rank=1"
        },
        {
            title: "Atomic Habits",
            summary: "You do not rise to the level of your goals. You fall to the level of your systems.",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1655988385i/40121378.jpg",
            link: "https://www.goodreads.com/book/show/40121378-atomic-habits?from_search=true&from_srp=true&qid=xcp8qY8gEo&rank=1"
        },
        {
            title: "The 4-Hour Workweek",
            summary: "Focus on being productive instead of busy.",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1442957271i/368593.jpg",
            link: "https://www.goodreads.com/book/show/368593.The_4_Hour_Workweek?ac=1&from_search=true&qid=ehHF46Wg6v&rank=1"
        },
        {
            title: "Eat That Frog!",
            summary: "If you have to eat two frogs, eat the ugliest one first.",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1517626409i/32471928.jpg",
            link: "https://www.goodreads.com/book/show/32471928-eat-that-frog-action-workbook?from_search=true&from_srp=true&qid=VUEyFyp8IX&rank=2"
        },
        {
            title: "Getting Things Done",
            summary: "Your mind is for having ideas, not holding them.",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1312474060i/1633.jpg",
            link: "https://www.goodreads.com/book/show/1633.Getting_Things_Done?from_search=true&from_srp=true&qid=wgB6huJccq&rank=1"
        },
        {
            title: "The One Thing",
            summary: "What's the ONE thing you can do such that by doing it everything else will be easier or unnecessary?",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1559563270i/16256798.jpg",
            link: "https://www.goodreads.com/book/show/16256798-the-one-thing?from_search=true&from_srp=true&qid=VfQPKawaec&rank=1"
        },
        {
            title: "The Power of Habit",
            summary: "Habits, scientists say, emerge because the brain is constantly looking for ways to save effort.",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1545854312i/12609433.jpg",
            link: "https://www.goodreads.com/book/show/12609433-the-power-of-habit?from_search=true&from_srp=true&qid=6Ll7AHuasT&rank=1"
        },
        {
            title: "The Miracle Morning",
            summary: "How you wake up each day and your morning routine dramatically affects your levels of success in every single area of your life.",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1459775078i/17166225.jpg",
            link: "https://www.goodreads.com/book/show/17166225-the-miracle-morning?from_search=true&from_srp=true&qid=u7tCMDF6nv&rank=1"
        },
        {
            title: "Essentialism",
            summary: "If you don't prioritize your life, someone else will.",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1403165375i/18077875.jpg",
            link: "https://www.goodreads.com/book/show/18077875-essentialism?ref=nav_sb_ss_1_12"
        },
        {
            title: "Indistractable",
            summary: "The antidote to impulsiveness is forethought.",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1559847987i/44595007.jpg",
            link: "https://www.goodreads.com/book/show/44595007-indistractable?ref=nav_sb_ss_1_8"
        },
        {
            title: "Start with Why",
            summary: "Life isn't about finding yourself. It's about creating yourself.",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1360936414i/7108725.jpg",
            link: "https://www.goodreads.com/book/show/7108725-start-with-why"
        },
        {
            title: "The 7 Habits of Highly Effective People",
            summary: "Success is not how high you have climbed, but how you make a positive difference to the world.",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1421842784i/36072.jpg",
            link: "https://www.goodreads.com/book/show/36072.The_7_Habits_of_Highly_Effective_People?from_search=true&from_srp=true&qid=D..."
        },
        {
            title: "Can't Hurt Me",
            summary: "Master your mind and defy the odds.",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1536184191i/41721428.jpg",
            link: "https://www.goodreads.com/book/show/41721428-can-t-hurt-me?from_search=true&from_srp=true&qid=HCdTfAANzX&rank=1"
        },
        {
            title: "Think and Grow Rich",
            summary: "The starting point of all achievement is desire.",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1463241782i/30186948.jpg",
            link: "https://www.goodreads.com/book/show/30186948-think-and-grow-rich"
        },
        {
            title: "Dare to Lead",
            summary: "Daring leadership is not about titles or power. It is about taking responsibility.",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1541026732i/40109367.jpg",
            link: "https://www.goodreads.com/book/show/40109367-dare-to-lead?from_search=true&from_srp=true&qid=7m90Dfm51U&rank=1"
        },
        {
            title: "The Subtle Art of Not Giving a F*ck",
            summary: "A counterintuitive approach to living a good life.",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1465761302i/28257707.jpg",
            link: "https://www.goodreads.com/book/show/28257707-the-subtle-art-of-not-giving-a-f-ck"
        },
        {
            title: "Make Your Bed",
            summary: "If you want to change the world, start off by making your bed.",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1495769497i/31423133.jpg",
            link: "https://www.goodreads.com/book/show/31423133-make-your-bed?from_search=true&from_srp=true&qid=18OGOofuTm&rank=1"
        },
        {
            title: "Good to Great",
            summary: "Why some companies make the leap... and others don't.",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1546097703i/76865.jpg",
            link: "https://www.goodreads.com/book/show/76865.Good_to_Great"
        },
        {
            title: "Grit",
            summary: "Passion and perseverance for long-term goals.",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1632024090i/27213329.jpg",
            link: "https://www.goodreads.com/book/show/27213329-grit"
        },
        {
            title: "Mindset",
            summary: "The new psychology of success.",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1436227012i/40745.jpg",
            link: "https://www.goodreads.com/book/show/40745.Mindset"
        }
    ];

    // Modifikasi fungsi loadBooks
    $scope.loadBooks = function() {
        BooksService.getBooks()
            .then(function(data) {
                console.log('Books data received:', data);
                // Gabungkan buku dari database dengan buku preset
                $scope.books = Array.isArray(data) ? [...data, ...$scope.presetBooks] : $scope.presetBooks;
            })
            .catch(function(error) {
                console.error('Error loading books:', error);
                $scope.errorMessage = 'Error loading books: ' + (error.message || 'Unknown error');
                // Jika gagal load dari database, tetap tampilkan buku preset
                $scope.books = $scope.presetBooks;
            });
    };

    $scope.searchQuery = "";
    $scope.errorMessage = "";
    
    // Initialize newBook object
    $scope.newBook = {
        title: '',
        summary: '',
        link: '',
        image: ''
    };

    // Load books from backend and combine with presets
    $scope.loadBooks = function() {
        BooksService.getBooks()
            .then(function(data) {
                console.log('Books data received:', data);
                // Combine database books with preset books
                const dbBooks = Array.isArray(data) ? data : [];
                $scope.books = [...dbBooks, ...$scope.presetBooks];
                console.log('Combined books:', $scope.books);
            })
            .catch(function(error) {
                console.error('Error loading books:', error);
                $scope.errorMessage = 'Error loading books: ' + (error.message || 'Unknown error');
                // If database load fails, show preset books
                $scope.books = $scope.presetBooks;
            });
    };

    // Add a new book
    $scope.addBook = function() {
        if (!$scope.newBook.title || !$scope.newBook.summary) {
            alert('Please fill in at least the title and summary');
            return;
        }

        console.log('Attempting to add book:', $scope.newBook);

        BooksService.addBook($scope.newBook)
            .then(function(newBook) {
                console.log('Book added successfully:', newBook);
                $scope.books.unshift(newBook); // Add to beginning of array
                
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
        if (!bookId) {
            console.log('Cannot delete preset book');
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
        if (!bookId) {
            console.log('Cannot mark preset book as read');
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