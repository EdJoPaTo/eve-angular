angular.module( 'eve-crest' )
  .factory( 'getCrestServiceInfo', function( $q, httpCached ) {
    function getSingleServiceInfo( crestBaseUrl, serviceName ) {
      return httpCached( crestBaseUrl )
        .then( function( request ) {
          return request.data[ serviceName ];
        } );
    }

    return function( crestBaseUrl, serviceName ) {
      if ( typeof serviceName === 'string' ) {
        return getSingleServiceInfo( crestBaseUrl, serviceName );
      } else if ( Array.isArray( serviceName ) ) {
        return $q.all( serviceName.map( name => getSingleServiceInfo( crestBaseUrl, name ) ) );
      } else {
        console.error( 'serviceName is of the wrong type' );
      }
    };
  } );
