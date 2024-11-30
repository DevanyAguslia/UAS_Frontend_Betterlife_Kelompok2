angular.module('betterLife')
.controller('SidebarController', function($scope, $location) {
    $scope.isActive = function(path) {
        var currentPath = $location.path().replace(/^\//, '');
        return currentPath === path;
    };
});