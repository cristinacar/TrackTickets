'use strict';
// =============================================================================
// TICKETS ROUTE
// =============================================================================
angular
    .module( 'track.tickets' )
    .config( [ '$stateProvider',
        function ( $stateProvider ) {
            $stateProvider
                .state ( 'tickets', {
                   // abstract: true,
                    url: '/tickets',
                    templateUrl: 'views/module/tickets/layout/content.html',
                    controller: 'tickets.indexCtrl',
                } )
                .state ( 'tickets.dashboard', {
                    url: '/dashboard',
                    controller: 'tickets.dashboardCtrl',
                    templateUrl: 'views/module/tickets/dashboard.html',
                    data: {
                        name: 'dashboard'
                    }
                } );
        }
    ] );