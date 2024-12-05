angular.module('betterLife').controller('TaskController', ['$scope', 'TaskService', function ($scope, TaskService) {
    $scope.tasks = [];
    $scope.filter = 'ALL';
    $scope.currentTask = {};
    $scope.modalTitle = '';
    $scope.loading = false;

    // Search and sort properties
    $scope.searchQuery = '';
    $scope.sortOrder = 'asc';
    $scope.sortReverse = false;

    let taskModal, deleteModal;

    // Initialize modals
    angular.element(document).ready(function () {
        taskModal = new bootstrap.Modal(document.getElementById('taskModal'));
        deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    });

    // Load tasks
    function loadTasks() {
        $scope.loading = true;
        TaskService.getAllTasks()
            .then(function (response) {
                $scope.tasks = response.data;
                $scope.$apply();
            })
            .catch(function (error) {
                console.error('Error loading tasks:', error);
            })
            .finally(function () {
                $scope.loading = false;
            });
    }

    // Initialize
    loadTasks();

    // Search filter function
    $scope.searchFilter = function (task) {
        if (!$scope.searchQuery) return true;

        const query = $scope.searchQuery.toLowerCase();
        return task.title.toLowerCase().includes(query) ||
            task.description.toLowerCase().includes(query);
    };

    // Set sort order
    $scope.setSortOrder = function (order) {
        $scope.sortOrder = order;
        $scope.sortReverse = order === 'desc';
    };

    // Filter tasks
    $scope.setFilter = function (status) {
        $scope.filter = status;
    };

    $scope.filterByStatus = function (task) {
        if ($scope.filter === 'ALL') return true;
        return task.status === $scope.filter;
    };

    // Combined filter function for both status and search
    $scope.filterTasks = function (task) {
        return $scope.filterByStatus(task) && $scope.searchFilter(task);
    };

    // Edit task
    $scope.editTask = function (task) {
        $scope.modalTitle = 'Edit Task';
        $scope.currentTask = { ...task };
        taskModal.show();
    };

    // Open add modal
    $scope.openAddModal = function () {
        $scope.modalTitle = 'Add New Task';
        $scope.currentTask = {
            status: 'OPEN'
        };
        taskModal.show();
    };

    // Confirm delete
    $scope.confirmDelete = function (task) {
        $scope.currentTask = task;
        deleteModal.show();
    };

    // Delete task
    $scope.deleteTask = function () {
        TaskService.deleteTask($scope.currentTask._id)
            .then(function () {
                deleteModal.hide();
                loadTasks();
            })
            .catch(function (error) {
                console.error('Error deleting task:', error);
            });
    };

    // Save task
    $scope.saveTask = function () {
        if (!$scope.currentTask.title || !$scope.currentTask.description) {
            alert('Please fill in all required fields');
            return;
        }

        const savePromise = $scope.currentTask._id ?
            TaskService.updateTask($scope.currentTask._id, $scope.currentTask) :
            TaskService.createTask($scope.currentTask);

        savePromise
            .then(function () {
                taskModal.hide();
                loadTasks();
            })
            .catch(function (error) {
                console.error('Error saving task:', error);
            });
    };


    // Status badge class
    $scope.getStatusClass = function (status) {
        return status.toLowerCase();
    };
}]);