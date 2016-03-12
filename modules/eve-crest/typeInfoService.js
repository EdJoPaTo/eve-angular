angular.module( 'eve-crest' )
  .factory( 'typeInfoService', function typeInfoServiceFactory( $http, CREST, getCrestServiceInfo ) {

    function getTypeInfo( serviceUrl, id ) {
      var url = serviceUrl + id + '/';

      return $http.get( url, {
          cache: true
        } )
        .then( function( request ) {
          return request.data;
        } );
    }

    return function( id ) {
      return getCrestServiceInfo( CREST.PUBLIC, 'itemTypes' )
        .then( function( serviceInfo ) {
          return serviceInfo.href;
        } )
        .then( function( url ) {
          return getTypeInfo( url, id );
        } );
    };
  } );
