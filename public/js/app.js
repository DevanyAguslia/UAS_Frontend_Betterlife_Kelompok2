var app = angular.module('betterLife', ['ngRoute'])
    .run(function($rootScope) {
        $rootScope.isLoggedIn = !!localStorage.getItem('token');
    });

app.config(function ($routeProvider, $locationProvider) {
    // Configure the hash prefix for routing
    $locationProvider.hashPrefix('!');

    // Define routes for different views and associate controllers with them
    $routeProvider
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        })
        .when('/mood', {
            templateUrl: 'views/mood.html',
            controller: 'MoodController'
        })
        .when('/pomodoro', {
            templateUrl: 'views/pomodoro.html',
            controller: 'PomodoroController'
        })
        .when('/task', {
            templateUrl: 'views/task.html',
            controller: 'TaskController'
        })
        .when('/books', {
            templateUrl: 'views/books.html',
            controller: 'BooksController'
        })
        .when('/diary', {
            templateUrl: 'views/diary.html',
            controller: 'DiaryController'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'AuthController'
        })
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'AuthController'
        })
        .when('/profile', {
            templateUrl: 'views/profile.html',
            controller: 'AuthController'
        })
        .otherwise({
            redirectTo: '/home'
        });
});

// Custom filter to pad numbers to 2 digits
app.filter('padNumber', function () {
    return function (number) {
        return (number < 10) ? '0' + number : number;
    };
});