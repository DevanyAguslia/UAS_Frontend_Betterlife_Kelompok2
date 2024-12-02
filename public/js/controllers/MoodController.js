app.controller('MoodController', ['$scope', 'MoodService', function ($scope, MoodService) {
    // Initialize variables
    $scope.moods = [];
    $scope.currentMood = {
        mood: 'neutral',
        date: new Date()
    };

    // Get all moods
    $scope.getMoods = function () {
        console.log('Fetching moods...');
        MoodService.getMoods()
            .then(function (response) {
                console.log('Response:', response);
                if (response.data && response.data.status === 'success') {
                    $scope.moods = response.data.data;
                }
            })
            .catch(function (error) {
                console.error('Error fetching moods:', error);
                if (error.status === 401) {
                    // Redirect to login if unauthorized
                    window.location.href = '#!/login';
                }
            });
    };

    // Log new mood
    $scope.logMood = function () {
        console.log('Logging mood:', $scope.currentMood);
        if (!$scope.currentMood.mood) return;

        MoodService.createMood($scope.currentMood)
            .then(function (response) {
                console.log('Mood logged:', response);
                if (response.data && response.data.status === 'success') {
                    $scope.moods.unshift(response.data.data);
                    // Reset form
                    $scope.currentMood = {
                        mood: 'neutral',
                        date: new Date()
                    };
                    // Show success message
                    alert('Mood logged successfully!');
                }
            })
            .catch(function (error) {
                console.error('Error logging mood:', error);
                if (error.status === 401) {
                    window.location.href = '#!/login';
                } else {
                    alert('Error logging mood. Please try again.');
                }
            });
    };

    // Delete mood
    $scope.deleteMood = function (moodId) {
        console.log('Deleting mood:', moodId);
        if (!confirm('Are you sure you want to delete this mood?')) return;

        MoodService.deleteMood(moodId)
            .then(function (response) {
                console.log('Mood deleted:', response);
                if (response.data && response.data.status === 'success') {
                    $scope.moods = $scope.moods.filter(m => m._id !== moodId);
                    alert('Mood deleted successfully!');
                }
            })
            .catch(function (error) {
                console.error('Error deleting mood:', error);
                if (error.status === 401) {
                    window.location.href = '#!/login';
                } else {
                    alert('Error deleting mood. Please try again.');
                }
            });
    };

    // Delete all moods
    $scope.deleteAllLogs = function () {
        console.log('Deleting all moods...');
        if (!confirm('Are you sure you want to delete all mood logs? This cannot be undone.')) return;

        MoodService.deleteAllMoods()
            .then(function (response) {
                console.log('All moods deleted:', response);
                if (response.data && response.data.status === 'success') {
                    $scope.moods = [];
                    alert('All moods deleted successfully!');
                }
            })
            .catch(function (error) {
                console.error('Error deleting all moods:', error);
                if (error.status === 401) {
                    window.location.href = '#!/login';
                } else {
                    alert('Error deleting moods. Please try again.');
                }
            });
    };

    // Format date for display
    $scope.formatDate = function (date) {
        return new Date(date).toLocaleString();
    };

    // Initialize controller
    $scope.getMoods();

    // Debug info
    console.log('MoodController initialized');
}]);