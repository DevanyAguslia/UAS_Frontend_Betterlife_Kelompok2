angular.module('betterLife').service('DiaryService', ['$http', function($http) {
    const baseUrl = 'http://localhost:8000/api/diary';

    this.getEntries = (params) => $http.get(baseUrl, { params });
    this.createEntry = (data) => $http.post(baseUrl, data);
    this.updateEntry = (id, data) => $http.put(`${baseUrl}/${id}`, data);
    this.deleteEntry = (id) => $http.delete(`${baseUrl}/${id}`);
}]);