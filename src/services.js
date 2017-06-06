(function () {
    angular.module('swApp')
    .service('DataService', function ($http) {
        return $http.get('https://jsonplaceholder.typicode.com/posts');
    })
})();