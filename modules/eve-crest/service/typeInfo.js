angular.module( 'eve-crest' )
  .factory( 'typeInfoService', function typeInfoServiceFactory( httpCached, CREST, crestServiceInfoService ) {

    function getTypeInfo( serviceUrl, id ) {
      var url = serviceUrl + id + '/';

      return httpCached( url )
        .then( response => response.data );
    }

    return function( id ) {
      return crestServiceInfoService( CREST.PUBLIC, 'itemTypes' )
        .then( function( serviceInfo ) {
          return serviceInfo.href;
        } )
        .then( function( url ) {
          return getTypeInfo( url, id );
        } );
    };
  } );
