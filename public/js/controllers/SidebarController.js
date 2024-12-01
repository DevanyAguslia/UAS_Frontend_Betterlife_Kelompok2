app.controller('SidebarController', function($scope, $location) {
    $scope.isActive = function(path) {
        var currentPath = $location.path().replace(/^\//, '');
        return currentPath === path;
    };

    // Initialize sidebar state
    $scope.sidebarOpen = false;

    // Toggle sidebar state
    $scope.toggleSidebar = function() {
        $scope.sidebarOpen = !$scope.sidebarOpen;
    };

    // Close sidebar when route changes
    $scope.$on('$routeChangeStart', function() {
        if ($scope.sidebarOpen) {
            $scope.sidebarOpen = false;
        }
    });
});