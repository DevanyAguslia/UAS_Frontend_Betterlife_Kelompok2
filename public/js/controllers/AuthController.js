app.controller('AuthController', function($scope, $location, AuthService) {
    $scope.user = {};
    $scope.profile = {};
    $scope.users = [];
    
    // Create - Register
    $scope.register = function() {
        if (!$scope.registerForm.$valid) return;
        
        AuthService.register($scope.user)
            .then(function(response) {
                alert('Registration successful!');
                $location.path('/login');
            })
            .catch(function(error) {
                $scope.errorMessage = error.data.message || 'Registration failed';
            });
    };
    
    // Read - Get Profile
    $scope.getProfile = function() {
        AuthService.getUserProfile()
            .then(function(response) {
                $scope.profile = response.data;
            })
            .catch(function(error) {
                $scope.errorMessage = 'Failed to load profile';
            });
    };
    
    // Read - Get All Users (Admin)
    $scope.getAllUsers = function() {
        AuthService.getAllUsers()
            .then(function(response) {
                $scope.users = response.data;
            })
            .catch(function(error) {
                $scope.errorMessage = 'Failed to load users';
            });
    };
    
    // Update Profile
    $scope.updateProfile = function() {
        if (!$scope.profileForm.$valid) return;
        
        AuthService.updateProfile($scope.profile)
            .then(function(response) {
                alert('Profile updated successfully!');
            })
            .catch(function(error) {
                $scope.errorMessage = 'Failed to update profile';
            });
    };
    
    // Delete Account
    $scope.deleteAccount = function() {
        if (confirm('Are you sure you want to delete your account? This cannot be undone.')) {
            AuthService.deleteAccount()
                .then(function() {
                    localStorage.removeItem('token');
                    $location.path('/login');
                })
                .catch(function(error) {
                    $scope.errorMessage = 'Failed to delete account';
                });
        }
    };
    
    // Login
    $scope.login = function() {
        if (!$scope.loginForm.$valid) return;
        
        AuthService.login($scope.user)
            .then(function(response) {
                localStorage.setItem('token', response.data.token);
                $location.path('/profile');
            })
            .catch(function(error) {
                $scope.errorMessage = error.data.message || 'Login failed';
            });
    };
    
    // Initialize profile data if on profile page
    if ($location.path() === '/profile') {
        $scope.getProfile();
    }
});