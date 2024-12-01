app.service('AuthService', function($http) {
    var baseUrl = 'http://localhost:8000/api/auth';
    
    // Create (Register)
    this.register = function(user) {
        return $http.post(baseUrl + '/register', user);
    };
    
    // Read (Get User Data)
    this.getUserProfile = function() {
        return $http.get(baseUrl + '/user/profile', {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        });
    };

    // Read (Get All Users - Admin)
    this.getAllUsers = function() {
        return $http.get(baseUrl + '/users', {
            headers: { 'Authorization': localStorage.getItem('token') }
        });
    };
    
    // Update
    this.updateProfile = function(userData) {
        return $http.put(baseUrl + '/profile', userData, {
             headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        });
    };
    
    // Delete
    this.deleteAccount = function() {
        return $http.delete(baseUrl + '/profile', {
            headers: { 'Authorization': localStorage.getItem('token') }
        });
    };
    
    // Login
    this.login = function(credentials) {
        return $http.post(baseUrl + '/login', credentials);
    };
    
    // Check auth status
    this.isAuthenticated = function() {
        return !!localStorage.getItem('token');
    };
});