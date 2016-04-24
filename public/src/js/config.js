'use strict';
// =============================================================================
// APP CONFIG / SET PAGE ROUTES
// =============================================================================
angular
    .module( 'track' )
    .config( [ '$httpProvider', '$mdThemingProvider',
        function ( $httpProvider, $mdThemingProvider) {
        	$mdThemingProvider.theme('default')
                .primaryPalette('blue')
                .accentPalette('light-blue');

         	$mdThemingProvider.theme('orangeTheme')
      			.primaryPalette('orange')
      			.accentPalette('deep-orange');

  			$mdThemingProvider.theme('yellowTheme')
      			.primaryPalette('yellow')
      			.accentPalette('lime');

  			$mdThemingProvider.theme('greenTheme')
      			.primaryPalette('green')
      			.accentPalette('light-green');

  			$mdThemingProvider.theme('greyTheme')
      			.primaryPalette('grey')
      			.accentPalette('blue-grey');
            //$httpProvider.interceptors.push( 'errorInterceptor' );
        }
    ] );
