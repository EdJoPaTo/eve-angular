angular.module( 'eve-crest' )
  .factory( 'crestMarketService', function( httpCached, $q, CREST, getCrestServiceInfo, crestRegionsService, crestGetMultipagedItemsService ) {
    var service = {};

    var marketUrlSuffix = "?type=";

    service.getAllMarketItems = function() {
      return getCrestServiceInfo( CREST.PUBLIC, 'marketTypes' )
        .then( serviceInfo => serviceInfo.href )
        .then( crestGetMultipagedItemsService );
    };

    service.getItemsOfMarketGroup = function( marketGroupId ) {
      return getCrestServiceInfo( CREST.PUBLIC, [ 'marketTypes', 'marketGroups' ] )
        .then( data => data[ 0 ].href + '?group=' + data[ 1 ].href + marketGroupId + '/' )
        .then( crestGetMultipagedItemsService )
        .then( items => items.map( v => v.type ) );
    };

    service.getPrices = function( regionId, orderType, typeId ) {
      return $q.all( [
          crestRegionsService.getMarketUrl( regionId, orderType ),
          getCrestServiceInfo( CREST.PUBLIC, 'itemTypes' ).then( serviceInfo => serviceInfo.href )
        ] )
        .then( urls => urls[ 0 ] + marketUrlSuffix + urls[ 1 ] + typeId + '/' )
        .then( crestGetMultipagedItemsService );
    };

    service.getBestPrice = function( regionId, typeId, pricetype ) {
      if ( pricetype !== 'sell' && pricetype !== 'buy' ) pricetype = "sell";
      return service.getPrices( regionId, pricetype, typeId )
        .then( items => items.map( i => i.price ) )
        .then( function( prices ) {
          if ( prices.length === 0 ) return NaN;
          var func = pricetype === 'buy' ? Math.max : Math.min;
          return func.apply( null, prices );
        } );
    };

    return service;
  } );
