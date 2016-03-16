angular.module( "eve" )
  .config( function( $routeProvider, PAGETITLE ) {
    $routeProvider
      .when( '/', {
        title: PAGETITLE,
        templateUrl: 'general/page/main.html'
      } )
      .when( '/mining', {
        redirectTo: '/mining/ore/sell'
      } )
      .when( '/mining/:kind/:pricetype', {
        title: 'Mining',
        templateUrl: 'eve/page/mining.html',
        controller: 'miningCtrl'
      } )
      .when( '/iteminfo', {
        title: 'Item Info',
        templateUrl: 'eve/page/itemInfo.html',
        controller: 'ItemInfoCtrl',
        reloadOnSearch: false
      } )
      .when( '/itemestimator', {
        title: 'Item Estimator',
        templateUrl: 'eve-estimator/page/itemEstimator.html',
        controller: 'ItemEstimatorCtrl',
        reloadOnSearch: false
      } )
      .when( '/impressum', {
        title: 'Impressum',
        templateUrl: 'general/page/impressum.html'
      } )
      .when( '/legal', {
        title: 'Legal',
        templateUrl: 'general/page/legal.html'
      } )
      .when( '/about', {
        title: 'About',
        templateUrl: 'general/page/about.html'
      } )
      .otherwise( {
        redirectTo: '/'
      } );
  } );
