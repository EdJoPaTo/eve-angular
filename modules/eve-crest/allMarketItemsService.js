angular.module( 'eve-crest' )
  .factory( 'allMarketItemsService', function allMarketItemsFactory( $http, CREST, getCrestServiceInfo ) {
    return function( callback ) {
      getCrestServiceInfo( CREST.PUBLIC, 'marketTypes' )
        .then( function( serviceInfo ) {
          return serviceInfo.href;
        } )
        .then( function( url ) {
          getFromUrl( url );
        } );

      function requestHandler( request ) {
        if ( request.data.next && request.data.next.href ) {
          getFromUrl( request.data.next.href );
        } else {
          console.log( 'all items cached' );
        }

        return request.data.items;
      }

      function getFromUrl( url ) {
        $http.get( url, {
            cache: true
          } )
          .then( requestHandler )
          .then( callback );
      };
    }
  } );
