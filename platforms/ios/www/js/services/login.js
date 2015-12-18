angular.module('ShopChristmas')
    .factory('ValidateSignIn', ['$ionicPopup', '$log', '$cordovaOauth', '$http',
        function($ionicPopup, $log, $cordovaOauth, $http) {
            return {
                validateUser: function(username) {
                    if (username) {
                        if (username.toLowerCase() === "guest") {
                            $ionicPopup.alert({
                                title: 'Invalid Username',
                                content: ''
                            });
                            $log.debug("Invalid Username");
                            return false;
                        } else {
                            return true;
                        }
                    } else {
                        $ionicPopup.alert({
                            title: "Empty Username",
                            content: ""
                        });
                        $log.debug("Empty Username");
                    }
                },
                validatePassword: function(password) {
                    if (password) {
                        if (password.length >= 5) {
                            return true;
                        } else {
                            $ionicPopup.alert({
                                title: 'Password must be longer than 5 characters',
                                content: ''
                            });
                            $log.debug("Password too short");
                            return false;
                        }
                    } else {
                        $ionicPopup.alert({
                            title: "Empty Password",
                            content: ""
                        });
                        $log.debug("Empty Password");
                    }
                },
                validateFacebook: function(callbackFn) {
                    $cordovaOauth.facebook("1764102662933892", ["email"])
                        .then(function(result) {
                            $http.get("https://graph.facebook.com/v2.5/me", {
                                    params: {
                                        access_token: result.access_token,
                                        fields: "id,name,gender,location,website,picture,relationship_status",
                                        format: "json"
                                    }
                                })
                                .then(callbackFn,
                                    function(error) {
                                        console.log(error);
                                    });

                        }, function(error) {
                            $ionicPopup.alert({
                                title: "Invalid Login Credentials",
                                content: ""

                            });
                            $log.debug("Invalid Facebook Login");
                            console.log(error);
                        });
                }
            };
        }
    ]);