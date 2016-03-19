angular.module( 'z-killboard' )
  .directive( 'characterTable', function( zKillboardStatsCharacterService, crestItemGroupNameService ) {
    return {
      templateUrl: 'z-killboard/directive/characterTable.html',
      scope: {
        ids: '='
      },
      link: function( scope, element, attr ) {
        scope.characters = [];
        scope.groups = [];
        scope.groupName = {};

        function loadCharacters( ids ) {
          scope.characters = [];
          scope.groups = [];
          for ( var i = 0; i < ids.length; i++ ) {
            zKillboardStatsCharacterService( ids[ i ] )
              .then( addCharacter );
          }
        }

        function addCharacter( character ) {
          scope.characters.push( character );
          console.log( character );

          let groupIds = Object.keys( character.groups ).map( v => Number( v ) );
          for ( var i = 0; i < groupIds.length; i++ ) {
            if ( !scope.groups.includes( groupIds[ i ] ) ) {
              scope.groups.push( groupIds[ i ] );
              addGroupName( groupIds[ i ] );
            }
          }
          scope.groups = scope.groups.concat( groupIds ).distinct();
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
        loadCharacters( scope.ids );

        scope.characterSuccessRate = function( character ) {
          if ( !character.iskDestroyed && !character.iskLost ) return NaN;

          let dest = character.iskDestroyed || 0;
          let lost = character.iskLost || 0
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
