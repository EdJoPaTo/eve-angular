angular.module( 'eve-xml-api' )
  .factory( 'pilotIdService', function( $q, $cacheFactory, $http ) {
    let cache = $cacheFactory( 'pilotIdService' );
    let baseUrl = 'https://api.eveonline.com/eve/CharacterID.xml.aspx?names=';

    return function( pilotNames ) {
      let notInCache = [];
      let result = [];

      pilotNames = pilotNames.map( v => v.trim().toLowerCase() );

      for ( var i = 0; i < pilotNames.length; i++ ) {
        let val = cache.get( pilotNames[ i ] );
        if ( val ) {
          result.push( val );
        } else if ( val !== 0 ) {
          notInCache.push( pilotNames[ i ] );
        }
      }

      var deferred = $q.defer();

      if ( notInCache.length === 0 ) {
        deferred.resolve( result );
      } else {
        if ( result.length > 0 )
          deferred.notify( result );

        let url = baseUrl + notInCache.join();
        $http.get( url, {
            cache: true,
            responseType: 'document'
          } )
          .then( result => result.data )
          .then( doc => doc.getElementsByTagName( 'row' ) )
          // get array of the nodes to use .map() on it
          .then( nodes => Array.prototype.slice.call( nodes ) )
          // put node info in an object
          .then( nodes => nodes.map( node => ( {
            name: node.getAttribute( 'name' ),
            characterId: Number( node.getAttribute( 'characterID' ) || 0 )
          } ) ) )
          // add to cache
          .then( function( data ) {
            for ( var i = 0; i < data.length; i++ ) {
              cache.put( data[ i ].name.toLowerCase(), data[ i ] );
            }
            return data;
          } )
          .then( function( data ) {
            result = result.concat( data );
            deferred.resolve( result );
          }, function( error ) {
            console.error( 'pilotIdService Error with pilotNames ' + pilotNames );
            console.error( error );
            deferred.reject( error );
          } );
      }

      return deferred.promise;
    };
  } );
