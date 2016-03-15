angular.module( "eve" )
  .config( function( $routeProvider ) {
    $routeProvider
      .when( '/', {
        templateUrl: 'general/page/main.html'
      } )
      .when( '/mining', {
        redirectTo: '/mining/ore/sell'
      } )
      .when( '/mining/:kind/:pricetype', {
        templateUrl: 'eve/page/mining.html',
        controller: 'miningCtrl'
      } )
      .when( '/iteminfo', {
        templateUrl: 'eve/page/itemInfo.html',
        controller: 'ItemInfoCtrl',
        reloadOnSearch: false
      } )
      .when( '/impressum', {
        templateUrl: 'general/page/impressum.html'
      } )
      .when( '/legal', {
        templateUrl: 'general/page/legal.html'
      } )
      .when( '/about', {
        templateUrl: 'general/page/about.html'
      } )
      .otherwise( {
        redirectTo: '/'
      } );
  } );
