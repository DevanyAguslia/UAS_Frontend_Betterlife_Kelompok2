angular.module('betterLife', ['ngRoute'])
.config(function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('!');
    
    $routeProvider
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        })
        .when('/calendar', {
            templateUrl: 'views/calendar.html',
            controller: 'CalendarController'
        })
        .when('/pomodoro', {
            templateUrl: 'views/pomodoro.html',
            controller: 'PomodoroController'
        })
        .when('/music', {
            templateUrl: 'views/music.html',
            controller: 'MusicController'
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
            controller: 'LoginController'
        })
        .otherwise({
            redirectTo: '/home'
        });
});