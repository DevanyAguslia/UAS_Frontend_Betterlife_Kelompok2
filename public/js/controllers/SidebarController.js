app.controller('SidebarController', function($scope, $location, $rootScope, AuthService) {
    $scope.user = null;
    $scope.isLoggedIn = false;

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

    // Initialize user state
    function initializeUser() {
        const userStr = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        
        if (userStr && token) {
            try {
                $scope.user = JSON.parse(userStr);
                $scope.isLoggedIn = true;
            } catch (e) {
                console.error('Error parsing user data:', e);
                $scope.logout();
            }
        }
    }

    // Listen for login/logout events
    $rootScope.$on('loginSuccess', function(event, userData) {
        $scope.user = userData.user;
        $scope.isLoggedIn = true;
        $scope.$apply(); 
    });

    $rootScope.$on('logoutSuccess', function() {
        $scope.user = null;
        $scope.isLoggedIn = false;
        $scope.$apply(); 
    });

    $scope.logout = function() {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            $scope.user = null;
            $scope.isLoggedIn = false;
            $rootScope.$emit('logoutSuccess');
            $location.path('/login');
        }
    };

    // Initialize on controller load
    initializeUser();
});