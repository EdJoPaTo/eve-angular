angular.module( 'eve-crest' )
  .factory( 'crestItemGroupNameService', function( $q, crestItemGroupInfoService ) {
    var shortNames = {
      27: 'BS',
      29: 'Pod',
      237: 'Rookie',
      358: 'HAC',
      1305: 'T3D'
    };

    return function( id, short ) {
      if ( short && shortNames[ id ] ) {
        let deferred = $q.defer();
        deferred.resolve( shortNames[ id ] );
        return deferred.promise;
      } else {
        return crestItemGroupInfoService( id )
          .then( groupInfo => groupInfo.name );
      }
    };
  } );
