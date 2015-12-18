angular.module('ShopChristmas')
    .controller('LogController', ['$scope', 'LocalStorageService',
        function($scope, LocalStorageService) {
            $scope.logs =
                LocalStorageService.getLogsFromLocalStorage('final-logs');
        }
    ]);