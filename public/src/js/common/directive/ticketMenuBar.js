'use strict';
// =============================================================================
// MENU BAR DIRECTIVE
// =============================================================================
angular
    .module( 'track.common' )
    .directive( 'ticketMenuBar', menuBar );

function menuBar( ) {
    var directive = {
        restrict: 'A',
        scope: {
            details: '='
        },
        templateUrl: 'views/common/directive/ticket-menu-bar.html',
        controller: menuBarCtrl
    };

    return directive;
}
menuBarCtrl.$inject = [ '$scope' ];

function menuBarCtrl( $scope ) {
}
