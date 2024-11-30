angular.module('betterLife')
.controller('HomeController', function($scope) {
    // Basic initialization
    $scope.init = function() {
        console.log('Home controller initialized');
    };

    $scope.init();
});