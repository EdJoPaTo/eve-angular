angular.module( 'eve-crest' )
  .factory( 'httpCached', function( $http ) {
    return url => $http.get( url, {
      cache: true
    } );
  } );
