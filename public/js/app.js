var app = angular.module('betterLife', ['ngRoute'])
    .run(function($rootScope) {
        $rootScope.isLoggedIn = !!localStorage.getItem('token');
    });

app.config(function ($routeProvider, $locationProvider) {
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

app.filter('padNumber', function () {
    return function (number) {
        return (number < 10) ? '0' + number : number;
    };
});