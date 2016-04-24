'use strict';
// =============================================================================
// ERROR INTERCEPTOR SERVICE
// =============================================================================
angular
    .module( 'track.common' )
    .service( 'errorInterceptor', errorInterceptor );

errorInterceptor.$inject = [ '$injector' ];

function errorInterceptor( $injector ) {
    var redirectTrack = {
            401: function ( ) {
                //$injector.get( 'authenticationService' ).logout( );
                //$injector.get( '$state').transitionTo( 'login' );
            },
            403: function ( ) {
                //$injector.get( 'authenticationService' ).logout( );
                //$injector.get( '$state' ).transitionTo( 'login' );
            },
            404: function ( ) {
               // $injector.get( '$state' ).transitionTo( 'unavailable' );
            },
            405: function ( ) {
                //$injector.get( '$state' ).transitionTo( 'unavailable' );
            },
            pass: function ( ) { }
        },
        services = {
            responseError: ResponseError
        };

    return services;

    function ResponseError( response ) {
        ( redirectTrack[response.status] || redirectTrack.pass )( );
        return response;
    }
}
