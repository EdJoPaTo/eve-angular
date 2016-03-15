angular.module( 'eve-crest' )
  .factory( 'allMarketItemsService', function allMarketItemsFactory( CREST, getCrestServiceInfo, crestGetMultipagedItemsService ) {
    return function() {
      return getCrestServiceInfo( CREST.PUBLIC, 'marketTypes' )
        .then( serviceInfo => serviceInfo.href )
        .then (crestGetMultipagedItemsService );
    };
  } );
