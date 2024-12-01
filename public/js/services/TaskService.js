angular.module('betterLife').service('TaskService', ['$http', function ($http) {
    const API_URL = 'http://localhost:8000/api/task';

    this.getAllTasks = function () {
        return $http.get(API_URL);
    };

    this.createTask = function (task) {
        return $http.post(API_URL, task);
    };

    this.updateTask = function (id, task) {
        return $http.put(`${API_URL}/${id}`, task);
    };

    this.deleteTask = function (id) {
        return $http.delete(`${API_URL}/${id}`);
    };
}]);