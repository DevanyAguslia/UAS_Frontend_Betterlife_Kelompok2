angular.module('betterLife').controller('DiaryController', ['$scope', 'DiaryService', function($scope, DiaryService) {
    $scope.entries = [];
    $scope.search = '';
    $scope.filterTag = '';
    $scope.allTags = []; // Array untuk menyimpan semua tag unik

    // Fungsi untuk mengambil entri diary dari server
    $scope.fetchEntries = function() {
        DiaryService.getEntries({ search: $scope.search, tag: $scope.filterTag }).then(response => {
            $scope.entries = response.data;

            // Update daftar tag unik berdasarkan entri yang diambil
            $scope.updateAllTags();
        });
    };

    // Fungsi untuk menambahkan entri baru
    $scope.createEntry = function() {
        const newEntry = {
            title: $scope.newTitle,
            content: $scope.newContent,
            tags: $scope.newTags ? $scope.newTags.split(',').map(tag => tag.trim()) : [], // Trim tag
            mood: $scope.newMood
        };

        DiaryService.createEntry(newEntry).then(() => {
            $scope.fetchEntries(); // Ambil entri terbaru setelah menambah
            $scope.newTitle = '';
            $scope.newContent = '';
            $scope.newTags = '';
            $scope.newMood = '';
        });
    };

    // Fungsi untuk memperbarui entri diary
    $scope.updateEntry = function(entry) {
        DiaryService.updateEntry(entry._id, entry).then(() => $scope.fetchEntries());
    };

    // Fungsi untuk menghapus entri diary
    $scope.deleteEntry = function(id) {
        DiaryService.deleteEntry(id).then(() => $scope.fetchEntries());
    };

    // Fungsi untuk memperbarui daftar semua tag unik
    $scope.updateAllTags = function() {
        const tagsSet = new Set(); // Menggunakan Set untuk memastikan tidak ada duplikasi
        $scope.entries.forEach(entry => {
            entry.tags.forEach(tag => tagsSet.add(tag));
        });
        $scope.allTags = Array.from(tagsSet); // Konversi Set kembali ke array
    };

    // Inisialisasi fetch entri diary saat pertama kali controller di-load
    $scope.fetchEntries();
}]);
