angular.module( 'eve-crest' )
  .factory( 'allMarketItemsService', function allMarketItemsFactory( $http, CREST, getCrestServiceInfo ) {
    return function( callback, errorcallback ) {
      getCrestServiceInfo( CREST.PUBLIC, 'marketTypes' )
        .then( function( serviceInfo ) {
          getFromUrl( serviceInfo.href );
        }, requestErrorHandler );

      function requestHandler( request ) {
        if ( request.data.next && request.data.next.href ) {
          getFromUrl( request.data.next.href );
        } else {
          console.log( 'all items cached' );
        }

        callback( request.data.items, request.data.next && request.data.next.href );
      }

      function requestErrorHandler( request ) {
        errorcallback( {
          status: request.status,
          statusText: request.statusText
        } );
      }

      function getFromUrl( url ) {
        console.log("getFromUrl");
        console.log(url);
        $http.get( url, {
            cache: true
          } )
          .then( requestHandler, requestErrorHandler );
      };
    }
  } );
