angular.module('betterLife').controller('DiaryController', ['$scope', 'DiaryService', function($scope, DiaryService) {
    // Inisialisasi variabel
    $scope.entries = [];
    $scope.search = '';
    $scope.filterTag = '';
    $scope.allTags = []; // Menyimpan semua tag unik
    $scope.entryIdToUpdate = null; // Menyimpan ID entri untuk update

    // Fungsi untuk mengambil entri diary dari server
    $scope.fetchEntries = function() {
        const params = {
            search: $scope.search || '',
            tag: $scope.filterTag || ''
        };

        DiaryService.getEntries(params).then(response => {
            $scope.entries = response.data.map(entry => {
                const createdAt = new Date(entry.createdAt);

                // Format tanggal
                const formattedDate = createdAt.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    timeZone: 'Asia/Jakarta'
                });

                return {
                    ...entry,
                    formattedDate
                };
            });

            // Perbarui daftar semua tag unik
            $scope.updateAllTags();
        }).catch(err => {
            console.error("Failed to fetch entries:", err);
        });
    };

    // Fungsi untuk membuat entri baru
    $scope.createEntry = function() {
        if (!$scope.newTitle || !$scope.newContent || !$scope.newMood) {
            alert("Please fill in all fields before submitting.");
            return;
        }

        const newEntry = {
            title: $scope.newTitle,
            content: $scope.newContent,
            tags: $scope.newTags ? $scope.newTags.split(',').map(tag => tag.trim()) : [],
            mood: $scope.newMood
        };

        DiaryService.createEntry(newEntry).then(() => {
            $scope.resetForm();
            $scope.fetchEntries();
            alert("Diary entry created successfully!");
        }).catch(err => {
            console.error("Failed to create entry:", err);
            alert("Failed to create entry. Please try again.");
        });
    };

    // Fungsi untuk mengedit entri diary
    $scope.editEntry = function(entry) {
        $scope.newTitle = entry.title;
        $scope.newContent = entry.content;
        $scope.newTags = entry.tags.join(', '); // Gabungkan tag menjadi string terpisah koma
        $scope.newMood = entry.mood;
        $scope.entryIdToUpdate = entry._id; // Simpan ID entri untuk update
    };

    // Fungsi untuk memperbarui entri diary
    $scope.updateEntry = function() {
        if (!$scope.entryIdToUpdate) {
            alert("No entry selected for update.");
            return;
        }

        const updatedEntry = {
            title: $scope.newTitle,
            content: $scope.newContent,
            tags: $scope.newTags ? $scope.newTags.split(',').map(tag => tag.trim()) : [],
            mood: $scope.newMood
        };

        DiaryService.updateEntry($scope.entryIdToUpdate, updatedEntry).then(() => {
            $scope.fetchEntries();
            $scope.resetForm();
            alert("Diary entry updated successfully!");
        }).catch(err => {
            console.error("Failed to update entry:", err);
            alert("Failed to update entry. Please try again.");
        });
    };

    // Fungsi untuk menghapus entri diary
    $scope.deleteEntry = function(id) {
        if (!confirm("Are you sure you want to delete this entry?")) return;

        DiaryService.deleteEntry(id).then(() => {
            $scope.fetchEntries();
            alert("Diary entry deleted successfully.");
        }).catch(err => {
            console.error("Failed to delete entry:", err);
            alert("Failed to delete entry. Please try again.");
        });
    };

    // Fungsi untuk memperbarui daftar semua tag unik
    $scope.updateAllTags = function() {
        const tagsSet = new Set();
        $scope.entries.forEach(entry => {
            entry.tags.forEach(tag => tagsSet.add(tag));
        });
        $scope.allTags = Array.from(tagsSet);
    };

    // Fungsi untuk mereset form setelah update atau create
    $scope.resetForm = function() {
        $scope.newTitle = '';
        $scope.newContent = '';
        $scope.newTags = '';
        $scope.newMood = '';
        $scope.entryIdToUpdate = null;
    };

    // Inisialisasi fetch entri diary saat pertama kali controller di-load
    $scope.fetchEntries();
}]);
