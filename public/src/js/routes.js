'use strict';
// =============================================================================
// APP ROUTER / SET PAGE ROUTES
// =============================================================================
angular
    .module( 'tickets' )
    .config( [ '$stateProvider', '$urlRouterProvider', '$httpProvider',
        function ( $stateProvider, $urlRouterProvider, $httpProvider ) {
            // For any unmatched url, redirect to /login state
            $urlRouterProvider.otherwise( '/login' );
            $httpProvider.defaults.cache = false;
            if ( !$httpProvider.defaults.headers.get ) {
                $httpProvider.defaults.headers.get = { };
            }
            // Disable IE ajax request caching
            $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
            $stateProvider
                .state('unavailable', {
                    url: '/unavailable',
                    templateUrl: 'views/module/unavailable.html',
                    data: { }
                } );
        }
    ] );
