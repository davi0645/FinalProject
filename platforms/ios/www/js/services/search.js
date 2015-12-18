angular.module('ShopChristmas')
    .factory('SearchData', ['$http', '$ionicLoading', '$ionicPopup',
        function($http, $ionicLoading, $ionicPopup) {
            var searchResults;
            return {
                getSearchResults: function(userInput) {
                    if (userInput) {
                        $ionicLoading.show({
                            template: '<ion-spinner icon = "ios" class= "spinner-calm"></ion-spinner>'
                        });
                        $http.get("http://api.bestbuy.com/v1/products((search=" + userInput + "))?show=name,sku,salePrice,image&format=json&apiKey=5w2n4mecqg8awc9sbba26gps")
                            .then(function(searchData) {
                                if (searchData.data.products.length === 0) {
                                    $ionicLoading.hide();
                                    $ionicPopup.alert({
                                        title: "No items found",
                                        content: ""
                                    });
                                } else {
                                    searchResults = searchData;
                                }

                            }, function(error) {
                                console.log(error);
                            });
                    } else {
                        $ionicPopup.alert({
                            title: "Enter a Product Name",
                            content: ""
                        });
                    }
                },
                fetchResults: function() {
                    $ionicLoading.hide();
                    return searchResults;
                }

            };
        }
    ]);