angular.module('betterLife').controller('DiaryController', ['$scope', 'DiaryService', function($scope, DiaryService) {
    $scope.entries = [];
    $scope.search = '';
    $scope.filterTag = '';
    $scope.allTags = []; // Array untuk menyimpan semua tag unik

    // Fungsi untuk mengambil entri diary dari server
    $scope.fetchEntries = function() {
    const params = {
        search: $scope.search || '', // Mengirimkan pencarian
        tag: $scope.filterTag || '' // Mengirimkan filter tag
    };

    DiaryService.getEntries(params).then(response => {
        $scope.entries = response.data;

        // Update daftar tag
        $scope.updateAllTags();
    }).catch(err => {
        console.error("Failed to fetch entries:", err);
    });
};

    $scope.createEntry = function() {
    const newEntry = {
        title: $scope.newTitle,
        content: $scope.newContent,
        tags: $scope.newTags ? $scope.newTags.split(',').map(tag => tag.trim()) : [], // Trim tag
        mood: $scope.newMood
    };

    // Fungsi untuk menambahkan entri baru
    DiaryService.createEntry(newEntry).then(() => {
        // Reset form setelah berhasil
        $scope.newTitle = '';
        $scope.newContent = '';
        $scope.newTags = '';
        $scope.newMood = '';

        // Ambil entri terbaru setelah berhasil menambahkan
        $scope.fetchEntries();

        // Tampilkan modal sukses
        const successModal = new bootstrap.Modal(document.getElementById('successModal'));
        successModal.show();
    }).catch(err => {
        // Tangani error (opsional)
        console.error("Failed to create entry:", err);
        alert("Failed to create entry. Please make sure to fill in all fields.");
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
