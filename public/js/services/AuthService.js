app.service('AuthService', function($http) {
    var baseUrl = 'http://localhost:8000/api';
    
    // Create (Register)
    this.register = function(user) {
        return $http.post(baseUrl + '/auth/register', user);
    };
    
    // Read (Get User Data)
    this.getUserProfile = function() {
        return $http.get(baseUrl + '/users/profile', {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        });
    };
    
    // Update
    this.updateProfile = function(userData) {
        return $http.put(`${baseUrl}/users/profile`, userData, {
            headers: { 
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
    };
    
    // Delete
    this.deleteAccount = function() {
        return $http.delete(`${baseUrl}/users/profile`, {
            headers: { 
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
    };
    
    // Login
     this.login = function(credentials) {
        return $http.post(baseUrl + '/auth/login', credentials)
            .then(function(response) {
                return {
                    data: {
                        token: response.data.token,
                        user: response.data.user
                    }
                };
            });
    };
    
    // Check auth status
    this.isAuthenticated = function() {
        return !!localStorage.getItem('token');
    };
});