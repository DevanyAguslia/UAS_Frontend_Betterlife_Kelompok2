angular.module('betterLife').service('TaskService', ['$http', function ($http) {
    // Base API endpoint for task operations
    const API_URL = 'http://localhost:8000/api/task';

    // Retrieve all tasks from the server
    this.getAllTasks = function () {
        return $http.get(API_URL);
    };

    // Create a new task
    this.createTask = function (task) {
        return $http.post(API_URL, task);
    };

    // Update an existing task
    this.updateTask = function (id, task) {
        return $http.put(`${API_URL}/${id}`, task);
    };

    // Delete a task 
    this.deleteTask = function (id) {
        return $http.delete(`${API_URL}/${id}`);
    };
}]);