angular.module( 'eve-crest' )
  .factory( 'crestItemGroupNameService', function( $q, crestItemGroupInfoService ) {
    var shortNames = {
      27: 'BS',
      29: 'Pod',
      34: 'AF',
      237: 'Rookie',
      358: 'HAC',
      419: 'BC',
      832: 'Logi',
      834: 'Bomber',
      898: 'BlOps',
      963: 'T3C',
      1003: 'TCU',
      1250: 'MTU',
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
