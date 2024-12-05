app.service('PomodoroService', ['$http', function($http) {
    const BASE_URL = 'http://localhost:8000/api/pomodoro';
    
    // Save a new Pomodoro session
    this.saveSession = function(session) {
        return $http.post(BASE_URL, session);
    };

    // Retrieve all Pomodoro sessions
    this.getSessions = function() {
        return $http.get(BASE_URL);
    };

    // Update an existing Pomodoro session
    this.updateSession = function(id, session) {
        return $http.put(`${BASE_URL}/${id}`, session);
    };
    
    // Delete a Pomodoro session by its ID
    this.deleteSession = function(id) {
        return $http.delete(`${BASE_URL}/${id}`);
    };
}]);