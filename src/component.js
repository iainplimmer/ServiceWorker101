(function (navigator) {
    angular.module('swApp')
        .component('datacomponent', {
            template: `
            <h3>There's Some Lovely Data Here!</h3>
            <p ng-repeat="dataItem in $ctrl.MyData">
                {{dataItem.title}}
            </p>            
            <p ng-if='$ctrl.FromCache'>
                We can't connect to the internet, so there's no data!
            </p>
            `,
            controllerAs: '$ctrl',
            controller: function(DataService) {
                
                let vm = this;
                vm.MyData = [];
                vm.FromCache = true;

                if (!navigator.onLine) {
                    console.log('im offline!')
                    vm.FromCache = true;
                }

                DataService
                .then(response => {
                    vm.MyData = response.data.slice(0,5)
                    vm.FromCache = false;
                    console.log('helo?', vm.FromCache)
                })
                .catch(error => {
                    vm.FromCache = true;
                })
            }
        });
})(navigator);