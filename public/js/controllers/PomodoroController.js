app.controller('PomodoroController', ['$scope', '$interval', 'PomodoroService', 
    function($scope, $interval, PomodoroService) {
        $scope.minutes = 25;
        $scope.seconds = 0;
        $scope.isRunning = false;
        $scope.currentSession = 'focus';
        $scope.workTime = 25;
        $scope.breakTime = 5;
        $scope.timer = null;
        $scope.sessions = [];
        $scope.feedbackMessage = ''; 
        $scope.feedbackType = '';

        $scope.availableDurations = [
            { value: 15, label: '15 minutes' },
            { value: 25, label: '25 minutes' },
            { value: 30, label: '30 minutes' },
            { value: 45, label: '45 minutes' },
            { value: 60, label: '60 minutes' }
        ];

        $scope.settings = {
            focusDuration: 25, 
            breakDuration: 5  
        };

        $scope.changeDuration = function(duration) {
            $scope.settings.focusDuration = duration;
            $scope.settings.breakDuration = Math.floor(duration / 5); 
            
            // Reset timer if not running
            if (!$scope.isRunning) {
                if ($scope.currentSession === 'focus') {
                    $scope.minutes = $scope.settings.focusDuration;
                } else {
                    $scope.minutes = $scope.settings.breakDuration;
                }
                $scope.seconds = 0;
            }
        };

        $scope.completeSession = function() {
            var session = {
                type: $scope.currentSession,
                duration: $scope.currentSession === 'focus' ? 
                    $scope.settings.focusDuration : 
                    $scope.settings.breakDuration,
                completedAt: new Date()
            };
            
            PomodoroService.saveSession(session).then(function(response) {
                $scope.loadSessions();
            });
            
            $scope.currentSession = $scope.currentSession === 'focus' ? 'break' : 'focus';
            $scope.minutes = $scope.currentSession === 'focus' ? 
                $scope.settings.focusDuration : 
                $scope.settings.breakDuration;
            $scope.seconds = 0;
        };

        $scope.setSession = function(sessionType) {
            if (!$scope.isRunning) {
                $scope.currentSession = sessionType;
                if (sessionType === 'focus') {
                    $scope.minutes = $scope.settings.focusDuration;
                } else {
                    $scope.minutes = $scope.settings.breakDuration;
                }
                $scope.seconds = 0;
            }
        };

        $scope.updateBreakDuration = function() {
            if ($scope.formData.focusDuration) {
                $scope.formData.breakDuration = Math.floor($scope.formData.focusDuration / 5);
            }
        };

        $scope.showAddForm = function() {
            $scope.showForm = true;
            $scope.editMode = false;
            $scope.formData = {
                type: 'focus',
                duration: $scope.availableDurations[1].value,
                completedAt: new Date()
            };
        };
    
        $scope.startTimer = function() {
            if (!$scope.isRunning) {
                $scope.isRunning = true;
                $scope.timer = $interval($scope.countdown, 1000);
            }
        };
    
        $scope.pauseTimer = function() {
            if ($scope.isRunning) {
                $interval.cancel($scope.timer);
                $scope.isRunning = false;
            }
        };
    
        $scope.resetTimer = function() {
            $interval.cancel($scope.timer);
            $scope.isRunning = false;
            $scope.currentSession = 'focus';
            $scope.minutes = $scope.workTime;
            $scope.seconds = 0;
        };
    
        $scope.setSession = function(sessionType) {
            if (!$scope.isRunning) {
                $scope.currentSession = sessionType;
                if (sessionType === 'focus') {
                    $scope.minutes = $scope.formData.focusDuration || 25;
                } else {
                    $scope.minutes = $scope.formData.breakDuration || 5;
                }
                $scope.seconds = 0;
            }
        };
    
        $scope.countdown = function() {
            if ($scope.seconds > 0) {
                $scope.seconds--;
            } else if ($scope.minutes > 0) {
                $scope.minutes--;
                $scope.seconds = 59;
            } else {
                $scope.completeSession();
            }
        };
    
        $scope.completeSession = function() {
            var session = {
                type: $scope.currentSession,
                duration: $scope.currentSession === 'focus' ? $scope.workTime : $scope.breakTime,
                completedAt: new Date()
            };
    
            PomodoroService.saveSession(session).then(function(response) {
                $scope.loadSessions();
            });
    
            $scope.currentSession = $scope.currentSession === 'focus' ? 'break' : 'focus';
            $scope.minutes = $scope.currentSession === 'focus' ? $scope.workTime : $scope.breakTime;
            $scope.seconds = 0;
        };
    
        $scope.loadSessions = function() {
            PomodoroService.getSessions().then(function(response) {
                $scope.sessions = response.data;
            });
        };

        $scope.showForm = false;
        $scope.editMode = false;
        $scope.formData = {};

        $scope.showAddForm = function() {
            $scope.showForm = true;
            $scope.editMode = false;
            $scope.formData = {
                type: 'focus',
                duration: 25,
                completedAt: new Date()
            };
        };

        $scope.editSession = function(session) {
            $scope.showForm = true;
            $scope.editMode = true;
            $scope.formData = {
                _id: session._id,
                type: session.type,
            };
        };

        $scope.cancelForm = function() {
            $scope.showForm = false;
            $scope.formData = {};
        };

        $scope.saveSession = function() {
            if ($scope.editMode) {
                PomodoroService.updateSession($scope.formData._id, $scope.formData)
                    .then(function(response) {
                        $scope.loadSessions();
                        $scope.cancelForm();
                        $scope.feedbackMessage = 'Session updated successfully!';
                        $scope.feedbackType = 'success';
                    })
                    .catch(function(error) {
                        $scope.feedbackMessage = 'Error updating session: ' + error.data.message;
                        $scope.feedbackType = 'error';
                    });
            } else {
                PomodoroService.saveSession($scope.formData)
                    .then(function(response) {
                        $scope.loadSessions();
                        $scope.cancelForm();
                        $scope.feedbackMessage = 'New session added successfully!';
                        $scope.feedbackType = 'success';
                    })
                    .catch(function(error) {
                        $scope.feedbackMessage = 'Error adding session: ' + error.data.message;
                        $scope.feedbackType = 'error';
                    });
            }
        };

        $scope.deleteSession = function(id) {
            if (confirm('Are you sure you want to delete this session?')) {
                PomodoroService.deleteSession(id)
                    .then(function(response) {
                        $scope.loadSessions();
                        $scope.feedbackMessage = 'Session deleted successfully!';
                        $scope.feedbackType = 'success';
                    })
                    .catch(function(error) {
                        $scope.feedbackMessage = 'Error deleting session: ' + error.data.message;
                        $scope.feedbackType = 'error';
                    });
            }
        };
    
        $scope.loadSessions();
    }]);