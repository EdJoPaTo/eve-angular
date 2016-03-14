angular.module( 'eve' )
  .directive( 'itemTypeInfo', function( typeInfoService, typeIconUrlService, typeRenderUrlService ) {
    return {
      scope: {
        itemId: "="
      },
      templateUrl: 'eve/directive/itemTypeInfo.html',
      controller: function( $scope, $sce ) {
        $scope.item = {};
        $scope.$watch( 'itemId', function() {
          if ( !$scope.itemId ) return;
          typeInfoService( $scope.itemId ).then( function( typeInfo ) {
            if ( typeInfo.id != $scope.itemId ) return;
            $scope.item = typeInfo;
          } );
        } );

        $scope.html = function( text ) {
          if ( !text ) return "";
          var tmp = text;
          tmp = tmp.replace( '\r\n', '<br>' );

          return $sce.trustAsHtml( tmp );
        };

        $scope.icon = typeIconUrlService;
        $scope.render = function( item ) {
          if ( !item.graphicID ) return "";
          return typeRenderUrlService( item.id );
        };

        var keysToIgnore = [ 'name', 'id_str', 'iconID_str', 'description', 'portionSize_str' ];

        $scope.stringOnly = function( item ) {
          var result = {};
          var keys = Object.keys( item ).filter( function( v ) {
            return !keysToIgnore.includes( v );
          } );

          for ( var i = 0; i < keys.length; i++ ) {
            var type = typeof item[ keys[ i ] ];

            if ( type === 'string' || type === 'number' || type === 'boolean' ) {
              result[ keys[ i ] ] = item[ keys[ i ] ];
            } else if ( type === 'object' ) {
              continue;
            } else {
              console.log( keys[ i ] );
              console.log( type );
            }
          }

          return result;
        };

        var objectsToIgnore = [ 'dogma', 'attributes', 'effects', 'graphicID' ];

        $scope.keysOfObjects = function( item ) {
          if ( !item ) return [];
          var keys = Object.keys( item );
          return keys.filter( function( v ) {
            if ( objectsToIgnore.includes( v ) ) return false;
            return typeof item[ v ] === 'object';
          } );
        };
      }
    };
  } );
