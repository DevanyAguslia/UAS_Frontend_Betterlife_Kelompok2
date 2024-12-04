app.controller('MoodController', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
    const API_URL = 'http://localhost:8000/api/mood';

    // Initialize
    $scope.moods = ['excited', 'happy', 'neutral', 'sad', 'angry'];

    // Set mood default
    $scope.currentMood = {
        mood: 'neutral', // Nilai awal mood
        date: new Date(),
        answers: []
    };

    // Fungsi untuk memilih mood
    $scope.selectMood = function (mood) {
        $scope.currentMood.mood = mood; // Update mood yang dipilih
    };

    // Get all moods
    $scope.getMoods = function () {
        $http.get(API_URL)
            .then(function (response) {
                console.log('Moods retrieved:', response.data);
                $scope.moods = response.data.data || [];
            })
            .catch(function (error) {
                console.error('Error fetching moods:', error);
            });
    };

    // Start editing
    $scope.startEdit = function (mood) {
        // Make a deep copy of the answers
        mood.editAnswers = JSON.parse(JSON.stringify(mood.answers));
        mood.isEditing = true;
    };

    // Cancel editing
    $scope.cancelEdit = function (mood) {
        mood.isEditing = false;
        delete mood.editAnswers;
    };

    // Save edited answers
    $scope.saveEdit = function (mood) {
        console.log('Saving mood:', mood);
        const updatedData = {
            mood: mood.mood,
            answers: mood.editAnswers
        };

        $http.put(`${API_URL}/${mood._id}`, updatedData)
            .then(function (response) {
                console.log('Update response:', response);
                if (response.data.status === 'success') {
                    mood.answers = mood.editAnswers;
                    mood.isEditing = false;
                    delete mood.editAnswers;
                    alert('Changes saved successfully!');
                }
            })
            .catch(function (error) {
                console.error('Error updating mood:', error);
                alert('Error saving changes. Please try again.');
            });
    };

    // Create new mood
    $scope.logMood = function () {
        if (!$scope.currentMood.mood) {
            alert('Please select a mood first!');
            return;
        }

        const moodData = {
            mood: $scope.currentMood.mood,
            date: new Date(),
            answers: $scope.questions.map((q, index) => ({
                question: q.text,
                answer: $scope.currentMood.answers[index]?.answer || ''
            }))
        };

        $http.post(API_URL, moodData)
            .then(function (response) {
                if (response.data.status === 'success') {
                    $scope.moods.unshift(response.data.data);
                    // Reset form
                    $scope.currentMood = {
                        mood: 'neutral',
                        date: new Date(),
                        answers: []
                    };
                    alert('Mood logged successfully!');
                }
            })
            .catch(function (error) {
                console.error('Error logging mood:', error);
                alert('Error logging mood. Please try again.');
            });
    };

    // Delete mood
    $scope.deleteMood = function (moodId) {
        if (!confirm('Are you sure you want to delete this mood entry?')) {
            return;
        }

        $http.delete(`${API_URL}/${moodId}`)
            .then(function (response) {
                if (response.data.status === 'success') {
                    $scope.moods = $scope.moods.filter(m => m._id !== moodId);
                    alert('Mood deleted successfully!');
                }
            })
            .catch(function (error) {
                console.error('Error deleting mood:', error);
                alert('Error deleting mood. Please try again.');
            });
    };

    // Format date
    $scope.formatDate = function (date) {
        return new Date(date).toLocaleString();
    };

    // Questions
    $scope.questions = [
        { text: "What's the main reason for your mood today?" },
        { text: "Did you do anything today that made you feel better?" },
        { text: "Is there something specific that could improve your mood?" },
        { text: "Have you taken care of your basic needs today? (sleep, food, exercise)" },
        { text: "What's one positive thing you can focus on right now?" }
    ];

    // Initialize
    $scope.getMoods();
}]);