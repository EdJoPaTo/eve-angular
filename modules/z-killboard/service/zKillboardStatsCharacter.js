angular.module( 'z-killboard' )
  .factory( 'zKillboardStatsCharacterService', function( httpCached ) {
    let baseUrl = 'https://zkillboard.com/api/stats/characterID/';

    return function( id ) {
      let url = baseUrl + id + '/';
      return httpCached( url ).then( result => result.data );
    };
  } );
