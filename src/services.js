(function (navigator) {
    angular.module('swApp')
    .service('DataService', function ($http, $q) {
        return {
            GetData : function () {
                if (!navigator.onLine) {
                    //  We are offline, so let's fetch the data from the localStorage cache.
                    return $q((resolve, reject) => {
                        if (localStorage.getItem('application-data') === null) {
                            console.error('No data found.');  
                            reject(null);
                        }
                        else {
                            console.info('Fetching data from the cache.');
                            resolve(JSON.parse(localStorage.getItem('application-data'))); 
                        }
                    });
                }
                else {
                    //  If we are online, let's get some data, then cache it in the localstorage for
                    //  when we are offline later.
                    return $http.get('https://jsonplaceholder.typicode.com/posts')
                        .then(response => {           
                            console.info('Fetching data from the service.');         
                            let data = response.data.slice(0,5);
                            localStorage.setItem('application-data', JSON.stringify(data));               
                            return data;
                        });
                }
            }
        }
    });
})(navigator);