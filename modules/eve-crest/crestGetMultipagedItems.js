angular.module( 'eve-crest' )
  .factory( 'crestGetMultipagedItemsService', function( $q, httpCached ) {

    return function( baseUrl ) {
      var deferred = $q.defer();
      var items = [];

      function responseDataHandler( data ) {
        var finished = !Boolean( data.next && data.next.href );

        items = items.concat( data.items );

        if ( finished ) {
          deferred.resolve( items );
        } else {
          getFromUrl( data.next.href );
          deferred.notify( {
            items: items,
            pageCount: data.pageCount,
            totalCount: data.totalCount
          } );
        }
      }

      function getFromUrl( url ) {
        return httpCached( url )
          .then( response => response.data )
          .then( responseDataHandler );
      }

      getFromUrl( baseUrl );
      return deferred.promise;
    };
  } );
