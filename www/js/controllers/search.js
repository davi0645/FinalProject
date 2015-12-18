angular.module('ShopChristmas')
    .controller('SearchController', ['$scope', '$state', 'SearchData', '$timeout',
        '$ionicSlideBoxDelegate',
        function($scope, $state, SearchData, $timeout, $ionicSlideBoxDelegate) {
            $scope.final = {
                userInput: ""
            };
            $scope.clear = function() {
                $scope.final.userInput = "";
            };
            $scope.searcher = function() {
                SearchData.getSearchResults($scope.final.userInput);
                $timeout(function() {
                    if (SearchData.fetchResults()) {
                        $scope.searches = SearchData.fetchResults().data.products;
                        $ionicSlideBoxDelegate.update();
                    }
                }, 1500);
            };
        }
    ]);