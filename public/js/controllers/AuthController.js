app.controller('AuthController', ['$scope', '$location', '$rootScope', 'AuthService', 'StatsService', '$interval',
    function($scope, $location, $rootScope, AuthService, StatsService, $interval) {
        $scope.user = {};
        $scope.profile = {};

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

        // Update Profile
        $scope.updateProfile = function() {
            if (!$scope.profileForm.$valid) return;
            
            AuthService.updateProfile($scope.profile)
                .then(function(response) {
                    // Update local storage with new user data
                    const currentUser = JSON.parse(localStorage.getItem('user'));
                    const updatedUser = {
                        ...currentUser,
                        username: $scope.profile.username
                    };
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                    
                    // Emit event for sidebar update
                    $rootScope.$emit('profileUpdated', updatedUser);
                    
                    $scope.successMessage = 'Profile updated successfully!';
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
                        localStorage.removeItem('user');
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
                    const userData = {
                        token: response.data.token,
                        user: response.data.user
                    };
                    localStorage.setItem('token', userData.token);
                    localStorage.setItem('user', JSON.stringify(userData.user)); 
                    $rootScope.$emit('loginSuccess', userData); 
                    $location.path('/home'); 
                })
                .catch(function(error) {
                    $scope.errorMessage = error.data.message || 'Login failed';
                });
        };

        // Logout
        $scope.logout = function() {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            $rootScope.$emit('logoutSuccess');
            $location.path('/login');
        };

        // Initialize statistics
        $scope.stats = {
            pomodoro: {
                totalSessions: 0,
                focusSessions: 0,
                breakSessions: 0,
                totalDuration: 0
            },
            tasks: {
                total: 0,
                completed: 0,
                inProgress: 0,
                open: 0
            },
            books: {
                total: 0,
                read: 0,
                unread: 0
            }
        };

        // Function to load statistics
        function loadStats() {
            StatsService.getAllStats()
                .then(function(stats) {
                    $scope.stats = stats;
                })
                .catch(function(error) {
                    console.error('Error loading statistics:', error);
                });
        }

        // Load initial statistics
        if ($location.path() === '/profile') {
            loadStats();
            
            // Set up auto-refresh every 30 seconds
            const statsInterval = $interval(loadStats, 30000);

            // Clean up interval when leaving profile page
            $scope.$on('$destroy', function() {
                if (statsInterval) {
                    $interval.cancel(statsInterval);
                }
            });
        }

        // Go back to home
        $scope.goHome = function() {
            $location.path('/home'); 
        };

        // Initialize profile data if on profile page
        if ($location.path() === '/profile') {
            $scope.getProfile();
        }
}]);