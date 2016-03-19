angular.module( 'eve-crest' )
  .factory( 'crestItemGroupInfoService', function( httpCached, CREST, crestServiceInfoService ) {
    function getGroupInfo( serviceUrl, id ) {
      var url = serviceUrl + id + '/';

      return httpCached( url )
        .then( response => response.data );
    }

    return function( id ) {
      return crestServiceInfoService( CREST.PUBLIC, 'itemGroups' )
        .then( serviceInfo => serviceInfo.href )
        .then( url => getGroupInfo( url, id ) );
    };
  } );
