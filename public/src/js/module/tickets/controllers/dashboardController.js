'use strict';
// =============================================================================
// DASHBOARD CONTROLLER
// =============================================================================
angular
    .module( 'track.tickets' )
    .controller( 'tickets.dashboardCtrl' , dashboardCtrl );

dashboardCtrl.$inject = [
   '$scope'
];
function dashboardCtrl( $scope ) {
   $scope.model = {
   		cards: [ 
   			{
   				title: 'Backlog',
   				theme: 'yellowTheme',
   				positon: 1
   			},
   			{
   				title: 'TO DO',
   				theme: 'orangeTheme',
   				positon: 3
   			},
   			{
   				title: 'Review',
   				theme: 'greyTheme',
   				positon: 2 
   			}, 
   			{
   				title: 'Done',
   				theme: 'greenTheme',
   				positon: 4
   			}
   		]
   };



}
