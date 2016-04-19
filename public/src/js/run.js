'use strict';
// =============================================================================
// APP RUN
// =============================================================================
angular
    .module( 'track' )
    .run( [ '$rootScope', '$state',
        function ( $rootScope, $state ) {
            $rootScope.$on( '$stateChangeStart', function ( e, toState, param, fromState ) {
            } );
        }
    ] );
