(function () {
    angular.module('swApp')
        .component('datacomponent', {
            template: `
            <h3>There's Some Lovely Data Here!</h3>
            <p ng-repeat="item in $ctrl.MyData">
                {{ item.title }}
            </p>              
            `,
            controllerAs: '$ctrl',
            controller: function(DataService) {
                
                let vm = this;
                vm.MyData = [];
              
                DataService.GetData()
                    .then(response => {                    
                        vm.MyData = response;
                    });
            }
        });
})();