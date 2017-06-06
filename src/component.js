(function () {
    angular.module('swApp')
        .component('datacomponent', {
            template: `
            <h3>There's Some Lovely Data Here!</h3>
            <h4 ng-if='$ctrl.Offline'>NOTE: You are currenly offline and reading from the cache saved @ {{ $ctrl.CacheTime }}</h4>
            <p ng-repeat="item in $ctrl.MyData">
                {{ item.title }}
            </p>                          
            `,
            controllerAs: '$ctrl',
            controller: function(DataService) {
                
                let vm = this;
                vm.MyData = [];
                vm.Offline = (!navigator.onLine) ? true: false;
                vm.CacheTime = DataService.GetCacheStamp();

                DataService.GetData()
                    .then(response => {                    
                        vm.MyData = response;
                    });                

            }
        });
})();