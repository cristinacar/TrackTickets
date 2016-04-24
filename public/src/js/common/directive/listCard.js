'use strict';
// =============================================================================
// LIST CARD DIRECTIVE
// =============================================================================
angular
    .module( 'track.common' )
    .directive( 'listCard', listCard );

function listCard( ) {
    var directive = {
        restrict: 'A',
        scope: {
            details: '='
        },
        templateUrl: 'views/common/directive/list-card.html',
        controller: listCardCtrl
    };

    return directive;
}
listCardCtrl.$inject = [ '$scope' ];

function listCardCtrl( $scope ) {
}
