angular.module('ShopChristmas')
    .factory('StoresData', ['$http', '$cordovaGeolocation', '$ionicLoading', '$ionicPopup',
        function($http, $cordovaGeolocation, $ionicLoading, $ionicPopup) {
            var nearbyStoresData;
            var localStores;
            return {
                getStores: function() {
                    $ionicLoading.show({
                        template: '<ion-spinner icon = "ios" class= "spinner-calm"></ion-spinner>'
                    });
                    var posOptions = {
                        timeout: 15000,
                        enableHighAccuracy: false
                    };
                    $cordovaGeolocation
                        .getCurrentPosition(posOptions)
                        .then(function(position) {
                            var lat = position.coords.latitude;
                            var long = position.coords.longitude;
                            $http.get("http://api.bestbuy.com/v1/stores(area(" + lat + "," + long +
                                    ",500))?format=json&apiKey=5w2n4mecqg8awc9sbba26gps")
                                .then(function(storesData) {
                                    if (storesData.data.stores.length === 0) {
                                        $ionicLoading.hide();
                                        $ionicPopup.alert({
                                            title: "No Stores Found",
                                            content: ""
                                        });
                                    } else {
                                        nearbyStoresData = storesData;
                                    }
                                }, function(error) {
                                    console.log(error);
                                });

                        }, function(err) {
                            console.log(err);
                        });
                },
				getlocalStores: function(city) {
                    if (city) {
                        $ionicLoading.show({
                            template: '<ion-spinner icon = "ios" class= "spinner-calm"></ion-spinner>'
                        });
                        $http.get("http://api.bestbuy.com/v1/stores(city=" +
                                city +
                                ")?format=json&apiKey=5w2n4mecqg8awc9sbba26gps")
                            .then(function(cityData) {
                                if (cityData.data.stores.length === 0) {
                                    $ionicLoading.hide();
                                    $ionicPopup.alert({
                                        title: "No Stores Found",
                                        content: ""
                                    });
                                } else {
                                    localStores = cityData;
                                }

                            }, function(error) {
                                console.log(error);
                            });
                    } else {
                        $ionicPopup.alert({
                            title: "Invalid City",
                            content: ""
                        });
                    }
                },
                getNearbyStores: function() {
                    $ionicLoading.hide();
                    return nearbyStoresData;
                },
                getStores: function() {
                    $ionicLoading.hide();
                    return localStores;
                }
            };
        }
    ]);