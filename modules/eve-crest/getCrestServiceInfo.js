angular.module( 'eve-crest' )
  .factory( 'getCrestServiceInfo', function( httpCached ) {
    return function( crestBaseUrl, serviceName ) {
      return httpCached( crestBaseUrl )
        .then( function( request ) {
          return request.data[ serviceName ];
        } );
    };
  } );
