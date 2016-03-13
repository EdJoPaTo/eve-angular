angular.module( 'eve-crest' )
  .factory( 'allMarketItemsService', function allMarketItemsFactory( $http, CREST, getCrestServiceInfo ) {
    return function( callback, errorcallback ) {
      getCrestServiceInfo( CREST.PUBLIC, 'marketTypes' )
        .then( function( serviceInfo ) {
          getFromUrl( serviceInfo.href );
        }, requestErrorHandler );

      function requestHandler( request ) {
        var finished = !Boolean( request.data.next && request.data.next.href );

        if ( !finished ) {
          getFromUrl( request.data.next.href );
        }

        callback( request.data.items, finished );
      }

      function requestErrorHandler( request ) {
        errorcallback( {
          status: request.status,
          statusText: request.statusText
        } );
      }

      function getFromUrl( url ) {
        $http.get( url, {
            cache: true
          } )
          .then( requestHandler, requestErrorHandler );
      };
    }
  } );
