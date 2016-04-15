'use strict';
// =============================================================================
// APP RUN
// =============================================================================
angular
    .module( 'tickets' )
    .run( [ '$rootScope', '$state', 'authenticationService',
        function ( $rootScope, $state, authenticationService ) {
            $rootScope.$on( '$stateChangeStart', function ( e, toState, param, fromState ) {

            } );
        }
    ] );
