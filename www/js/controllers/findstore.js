angular.module('ShopChristmas')
    .controller('StoreController', ['$scope', 'StoresData', '$timeout', '$ionicLoading',
        function($scope, StoresData, $timeout) {
            StoresData.getStores();
            $timeout(function() {
                if (StoresData.getNearbyStores()) {
                    $scope.stores = StoresData.getNearbyStores().data.stores;
                }
            }, 8000);

            $scope.store = {
                city: ""
            };

            $scope.clearCityInput = function() {
                $scope.store.city = "";
            };
            $scope.getStoresData = function() {
                StoresData.getlocalStores($scope.store.city);
                $timeout(function() {
                    if (StoresData.getStores()) {
                        $scope.stores = StoresData.getStores().data.stores;
                    }
                }, 1000);
            };
        }
    ]);