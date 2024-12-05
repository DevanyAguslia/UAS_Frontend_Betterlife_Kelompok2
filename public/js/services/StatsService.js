app.service('StatsService', ['$http', function($http) {
    const baseUrl = 'http://localhost:8000/api';

    // Get statistics for all services
    this.getAllStats = function() {
        return Promise.all([
            this.getPomodoroStats(),
            this.getTaskStats(),
            this.getBookStats()
        ]).then(([pomodoroStats, taskStats, bookStats]) => {
            return {
                pomodoro: pomodoroStats.data,
                tasks: taskStats.data,
                books: bookStats.data
            };
        });
    };

    // Get Pomodoro session statistics
    this.getPomodoroStats = function() {
        return $http.get(`${baseUrl}/pomodoro/stats`);
    };

    // Get Task statistics
    this.getTaskStats = function() {
        return $http.get(`${baseUrl}/task`).then(response => {
            const tasks = response.data;
            return {
                data: {
                    total: tasks.length,
                    completed: tasks.filter(task => task.status === 'DONE').length,
                    inProgress: tasks.filter(task => task.status === 'PROGRESS').length,
                    open: tasks.filter(task => task.status === 'OPEN').length
                }
            };
        });
    };

    // Get Book statistics
    this.getBookStats = function() {
        return $http.get(`${baseUrl}/books`).then(response => {
            const books = response.data;
            return {
                data: {
                    total: books.length,
                    read: books.filter(book => book.readStatus).length,
                    unread: books.filter(book => !book.readStatus).length
                }
            };
        });
    };
}]);