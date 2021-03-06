(function(){

    function BookmarksService ($http, $q) {
        const URLS = {
            FETCH: 'json/bookmarks.json'
        };

        let service = {
            getBookmarks: getBookmarks,
            getBookmarkById: getBookmarkById,
            createMultipleBookmarks: createMultipleBookmarks,
            createBookmark: createBookmark,
            deleteBookmark: deleteBookmark,
            deleteBookmarksByCategory: deleteBookmarksByCategory,
            editBookmark: editBookmark
        }, bookmarks;

        return service;

        // get object with key data - array with bookmarks
        function cacheBookmarks ({data}) {
            bookmarks = data;
            return bookmarks;
        }

        function getBookmarks () {
            let deferred = $q.defer();

            if(bookmarks) {
                // console.log('get cached bookmarks data');
                deferred.resolve(bookmarks);
            }
            else {
                $http.get(URLS.FETCH).then(result => {
                    // console.log('get new bookmarks data');
                    deferred.resolve(cacheBookmarks(result))
                });
            }

            return deferred.promise;
        }

        function getBookmarkById (id) {
            id = parseInt(id);
            return _.find(bookmarks, {id: id});
        }

        function createMultipleBookmarks (data) {
            for (let bookmark of data) {
                bookmark.id = parseInt(_.uniqueId(10));
                bookmarks.push(bookmark);
            }
        }

        function createBookmark (bookmark) {
            bookmark.id = parseInt(_.uniqueId(10));
            bookmarks.push(bookmark);
        }

        function deleteBookmark (bookmark) {
            _.remove(bookmarks, {id: bookmark.id});
        }

        function deleteBookmarksByCategory (category) {
            _.remove(bookmarks, {category: category.name});
        }

        function editBookmark (bookmark) {
            let index = _.findIndex(bookmarks, {id: bookmark.id});
            bookmarks[index] = bookmark;
        }

    };


    angular.module('bookmark.services', [])
    .service('BookmarksService', BookmarksService)
    ;

}());
