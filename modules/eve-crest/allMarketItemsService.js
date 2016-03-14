angular.module( 'eve-crest' )
  .factory( 'allMarketItemsService', function allMarketItemsFactory( $http, $q, CREST, getCrestServiceInfo ) {
    return function() {
      var deferred = $q.defer();
      var items = [];

      getCrestServiceInfo( CREST.PUBLIC, 'marketTypes' )
        .then( function( serviceInfo ) {
          getFromUrl( serviceInfo.href );
        }, requestErrorHandler );

      function requestHandler( request ) {
        var finished = !Boolean( request.data.next && request.data.next.href );

        items = items.concat( request.data.items );

        if ( finished ) {
          deferred.resolve( items );
        } else {
          getFromUrl( request.data.next.href );
          deferred.notify( items );
        }
      }

      function requestErrorHandler( request ) {
        deferred.reject( {
          status: request.status,
          statusText: request.statusText
        } );
      }

      function getFromUrl( url ) {
        $http.get( url, {
            cache: true
          } )
          .then( requestHandler, requestErrorHandler );
      }

      return deferred.promise;
    };
  } );
