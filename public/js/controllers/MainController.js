app.controller('MainController', function($scope, $location, $timeout) {
    // Initialize loading state
    $scope.loading = true;

    // Simulate initial loading
    $timeout(function() {
        $scope.loading = false;
    }, 1000);

    // Check if current page is the login page
    $scope.isLoginPage = function() {
        return $location.path() === '/login';
    };

    // Check if current page is the register page
    $scope.isRegisterPage = function() {
        return $location.path() === '/register';
    };
    
    // Check if current page is the home page
    $scope.isHomePage = function() {
        console.log('isHomePage called, path:', $location.path());
        return $location.path() === '/home';
    };

    // Error handling
    $scope.errorMessage = '';
    $scope.showError = function(message) {
        $scope.errorMessage = message;
        $timeout(function() {
            $scope.errorMessage = '';
        }, 3000);
    };
});