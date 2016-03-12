angular.module( 'eve-crest' )
  .factory( 'getCrestServiceInfo', function( $http ) {
    return function( crestBaseUrl, serviceName ) {
      return $http.get( crestBaseUrl, {
          cache: true
        } )
        .then( function( request ) {
          return request.data[ serviceName ];
        } );
    };
  } );
