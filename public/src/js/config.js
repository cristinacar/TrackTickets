'use strict';
// =============================================================================
// APP CONFIG / SET PAGE ROUTES
// =============================================================================
angular
    .module( 'tickets' )
    .config( [ '$httpProvider',
        function ( $httpProvider) {
            $httpProvider.interceptors.push( 'errorInterceptor' );
        }
    ] );
