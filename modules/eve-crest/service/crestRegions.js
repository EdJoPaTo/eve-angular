angular.module( 'eve-crest' )
  .factory( 'crestRegionsService', function( httpCached, CREST, crestServiceInfoService ) {
    var service = {};

    service.getAll = function() {
      return crestServiceInfoService( CREST.PUBLIC, 'regions' )
        .then( regionServiceInfo => regionServiceInfo.href )
        .then( httpCached )
        .then( response => response.data.items )
        .then( regions => regions.filter( region => !region.name.match( '.-R00' ) || region.name === 'G-R00031' ) );
    };

    service.getSpecific = function( regionId ) {
      return crestServiceInfoService( CREST.PUBLIC, 'regions' )
        .then( regionServiceInfo => regionServiceInfo.href )
        .then( url => httpCached( url + regionId + '/' ) )
        .then( response => response.data );
    };

    service.getMarketUrl = function( regionId, orderType ) {
      if ( orderType !== 'buy' && orderType !== 'sell' ) {
        console.error( 'wrong orderType' );
        return;
      }

      return service.getSpecific( regionId )
        .then( function( regionData ) {
          if ( orderType === 'buy' )
            return regionData.marketBuyOrders.href;
          else
            return regionData.marketSellOrders.href;
        } );
    };

    return service;
  } );
