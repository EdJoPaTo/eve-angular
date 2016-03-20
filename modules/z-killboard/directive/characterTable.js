angular.module( 'z-killboard' )
  .directive( 'characterTable', function( zKillboardStatsCharacterService, crestItemGroupNameService ) {
    return {
      templateUrl: 'z-killboard/directive/characterTable.html',
      scope: {
        ids: '='
      },
      link: function( scope, element, attr ) {
        scope.characters = [];
        scope.noInfoCharacters = [];
        scope.groups = [];
        scope.groupName = {};

        function loadCharacters( ids ) {
          scope.characters = [];
          scope.noInfoCharacters = [];
          scope.groups = [];
          ids = ids.filter( v => v && v !== 0 );
          for ( var i = 0; i < ids.length; i++ ) {
            loadCharacter( ids[ i ] );
          }
        }

        function loadCharacter( character ) {
          let id = character.characterId;
          if ( !id || id === 0 ) return;
          zKillboardStatsCharacterService( id )
            .then( function( zKillInfo ) {
              if ( !zKillInfo || !zKillInfo.info ) {
                zKillInfo.info = {
                  name: character.name
                };
                scope.noInfoCharacters.push( zKillInfo );
                return;
              }

              if ( !zKillInfo.iskDestroyed ) zKillInfo.iskDestroyed = 0;
              scope.characters.push( zKillInfo );
              console.log( zKillInfo );

              if ( !zKillInfo.groups ) return;
              let groupIds = Object.keys( zKillInfo.groups ).map( v => Number( v ) );
              for ( var i = 0; i < groupIds.length; i++ ) {
                if ( !scope.groups.includes( groupIds[ i ] ) ) {
                  scope.groups.push( groupIds[ i ] );
                  addGroupName( groupIds[ i ] );
                }
              }
              scope.groups = scope.groups.concat( groupIds ).distinct();
            }, error => {
              console.error( 'zKillboardStatsCharacterService Error with id ' + id );
              console.error( error );
            } );
        }

        function addGroupName( groupId ) {
          crestItemGroupNameService( groupId, true )
            .then( function( groupName ) {
              scope.groupName[ groupId ] = groupName;
              console.log( scope.groupName );
            } );
        }

        scope.$watch( 'ids', function( newValue, oldValue ) {
          if ( newValue === oldValue ) return;
          loadCharacters( newValue );
        } );

        scope.characterSuccessRate = function( character ) {
          if ( !character.iskDestroyed && !character.iskLost ) return NaN;

          let dest = character.iskDestroyed || 0;
          let lost = character.iskLost || 0;
          return dest / ( dest + lost );
        };
      }
    };
  } );

Array.prototype.distinct = function( comparer ) {
  var arr = [];
  var l = this.length;
  for ( var i = 0; i < l; i++ ) {
    if ( !arr.includes( this[ i ] ) )
      arr.push( this[ i ] );
  }
  return arr;
};
