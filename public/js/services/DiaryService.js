angular.module('betterLife').service('DiaryService', ['$http', function($http) {
    const baseUrl = 'http://localhost:8000/api/diary';

    // Fetch diary entries with optional search and filter parameters
    this.getEntries = (params) => $http.get(baseUrl, { params });

    // Create a new diary entry
    this.createEntry = (data) => $http.post(baseUrl, data);

    // Update an existing diary entry
    this.updateEntry = (id, data) => $http.put(`${baseUrl}/${id}`, data);

    // Delete a diary entry by its ID
    this.deleteEntry = (id) => $http.delete(`${baseUrl}/${id}`);
}]);