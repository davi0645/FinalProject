angular.module('ShopChristmas')
    .controller('LoginController', ['$scope', '$state', 'ValidateSignIn', '$ionicPopup',
        function($scope, $state, ValidateSignIn, $ionicPopup) {
            $scope.signIn = function(username, password) {
                if (ValidateSignIn.validateUser(username) === true && ValidateSignIn.validatePassword(password) === true) {
                    $ionicPopup.alert({
                        title: 'Welcome ' + username,
                        content: ''
                    });
                    $state.go('tabs.search');
                    
                    username = "";
                    password = "";
                }
            };
            $scope.facebookSignin = function() {
                ValidateSignIn.validateFacebook(getResult);

            };
            var getResult = function(result) {
                $state.go('tabs.search');
                $ionicPopup.alert({
                    title: 'Success',
                    content: 'Welcome ' + JSON.stringify(result.data.name)
                });
            };
        }
    ]);