app.service('PomodoroService', ['$http', function($http) {
    const BASE_URL = 'http://localhost:8000/api/pomodoro';
    
    this.saveSession = function(session) {
        return $http.post(BASE_URL, session);
    };

    this.getSessions = function() {
        return $http.get(BASE_URL);
    };

    this.updateSession = function(id, session) {
        return $http.put(`${BASE_URL}/${id}`, session);
    };
    
    this.deleteSession = function(id) {
        return $http.delete(`${BASE_URL}/${id}`);
    };
}]);