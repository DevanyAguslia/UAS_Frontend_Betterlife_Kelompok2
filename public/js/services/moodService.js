app.service('MoodService', ['$http', function ($http) {
    const API_URL = 'http://localhost:8000/api/mood';

    // Get authentication token
    function getAuthHeader() {
        const token = localStorage.getItem('token');
        console.log('Current token:', token);
        return token ? {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        } : {};
    }

    return {
        // Get all moods
        getMoods: function () {
            console.log('Getting moods with headers:', getAuthHeader());
            return $http.get(API_URL, getAuthHeader());
        },

        // Create new mood
        createMood: function (moodData) {
            console.log('Creating mood:', moodData, 'with headers:', getAuthHeader());
            return $http.post(API_URL, moodData, getAuthHeader());
        },

        // Update mood
        updateMood: function (id, moodData) {
            console.log('Updating mood:', id, moodData, 'with headers:', getAuthHeader());
            return $http.put(`${API_URL}/${id}`, moodData, getAuthHeader());
        },

        // Delete mood
        deleteMood: function (id) {
            console.log('Deleting mood:', id, 'with headers:', getAuthHeader());
            return $http.delete(`${API_URL}/${id}`, getAuthHeader());
        },

        // Delete all moods
        deleteAllMoods: function () {
            console.log('Deleting all moods with headers:', getAuthHeader());
            return $http.delete(API_URL, getAuthHeader());
        }
    };
}]);