// The purpose of this service is to serve and cache data, if the user is offline, we take the data from the cache.

(function (navigator) {
    angular.module('swApp')
    .service('DataService', function ($http, $q, $rootScope) {
        return {
            GetData : function () {
                if (!navigator.onLine) {
                  
                    return $q((resolve, reject) => {
                        if (localStorage.getItem('application-data') === null) {
                            reject(null);
                        }
                        else {
                            resolve(JSON.parse(localStorage.getItem('application-data'))); 
                        }
                    });
                }
                else {
                    //  If we are online, let's get some data, then cache it in the localstorage for
                    //  when we are offline later.
                    return $http.get('https://jsonplaceholder.typicode.com/posts')
                        .then(response => {                
                            let data = response.data.slice(0,5);
                            localStorage.setItem('application-data', JSON.stringify(data));               
                            localStorage.setItem('application-data-stamp', new Date().toLocaleTimeString());               
                            return data;
                        });
                }
            },
            GetCacheStamp : function () {
                if (localStorage.getItem('application-data-stamp') === null) {
                    return '';
                }
                else {
                    return localStorage.getItem('application-data-stamp'); 
                }
            }
        }
    });
})(navigator);