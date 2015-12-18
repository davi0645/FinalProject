angular.module('ShopChristmas', ['ionic', 'ngCordova'])
    .decorator('$log', ['$delegate', 'LocalStorageService',
        function($delegate, LocalStorageService) {
            var debugFunction = $delegate.debug;
            $delegate.debug = function() {
                var values = [].slice.call(arguments), currentTime = new Date().toString();
                values[0] = [currentTime, ' Message: ', values[0]].join('');
                LocalStorageService.setLogsInLocalStorage('final-logs', values[0]);
                debugFunction.apply(null, args);
            };
            return $delegate;
        }
    ])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('signin', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'LoginController'
        })
        .state('tabs', {
            url: '/tab',
            abstract: true,
            templateUrl: 'templates/tabs.html'
        })
        .state('tabs.search', {
            url: '/search',
            views: {
                'search-tab': {
                    templateUrl: 'templates/search.html',
                    controller: 'SearchController'
                }
            }
        })
        .state('tabs.myStore', {
            url: '/myStore',
            views: {
                'myStore-tab': {
                    templateUrl: 'templates/findstore.html',
                    controller: 'StoreController'
                }
            }
        })
        .state('tabs.logs', {
            url: '/logs',
            views: {
                'logs-tab': {
                    templateUrl: 'templates/logs.html',
                    controller: 'LogController'
                }
            }
        });


    $urlRouterProvider.otherwise('/login');

});