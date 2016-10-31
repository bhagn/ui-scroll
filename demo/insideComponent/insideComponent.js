(function(angular) {
  angular
    .module('application', ['ui.scroll', 'ui.scroll.jqlite'])
    .component('myComponent', {
      template:
      '<div class="my-component viewport">' +
      '  <div class="item" ui-scroll="item in $ctrl" adapter="$ctrl.scrollAdapter">' +
      '    <div ng-bind="::item.name" ng-click="$ctrl.remove(item.id)">' +
      '    </div>' +
      '  </div>' +
      '</div>',
      controller: function($scope, $timeout) {
        var vm = this;
        vm.items = [];
        // hardcoded list of 100 items
        for (var i = 0; i < 100; i++) {
          vm.items.push({
            name: 'item #' + (i + 1),
            id: i
          });
        }
        vm.get = function(index, count, success) {
          $timeout(function() {
            if (index - 1 + count <= 0) {
              return success([]);
            }
            return success(vm.items.slice((index - 1), count));
          }, 100);
        };

        vm.remove = function(id) {
          for (var i = 0; i < vm.items.length; i++) {
            if (vm.items[i].id === id) {
              vm.items.splice(i, 1);
              vm.scrollAdapter.reload();
              // The below line works if adapter="scrollAdapter"
              // $scope.$parent.scrollAdapter.reload();

              break;
            }
          }
        };

      }
    });
})(angular);
