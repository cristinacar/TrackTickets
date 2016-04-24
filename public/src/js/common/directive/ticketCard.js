'use strict';
// =============================================================================
// TICKET CARD DIRECTIVE
// =============================================================================
angular
    .module( 'track.common' )
    .directive( 'ticketCard', ticketCard );

function ticketCard( ) {
    var directive = {
        restrict: 'A',
        scope: {
            details: '='
        },
        templateUrl: 'views/common/directive/ticket-card.html',
        controller: ticketCardCtrl
    };

    return directive;
}
ticketCardCtrl.$inject = [ '$scope' ];

function ticketCardCtrl( $scope ) {
}
