angular.module( 'eve-estimator' )
  .directive( 'itemQuickInfo', function( typeInfoService, crestMarketService, typeIconUrlService ) {
    return {
      scope: {
        amount: "=",
        itemId: "=",
        singleprice: "="
      },
      templateUrl: 'eve-estimator/directive/itemQuickInfo.html',
      link: function( scope, element, attr ) {
        function updateTypeInfo() {
          if ( !scope.itemId ) return;
          typeInfoService( scope.itemId ).then( function( typeInfo ) {
            if ( typeInfo.id != scope.itemId ) return;
            scope.typeInfo = typeInfo;
          } );
        }
        updateTypeInfo();

        function updateIcon() {
          element.css( 'background-image', "url(" + typeIconUrlService( scope.itemId ) + ")" );
        }
        updateIcon();

        scope.$watch( 'itemId', function( newValue, oldValue ) {
          if ( oldValue === newValue ) return;
          console.log( 'yaay!' );
          updateTypeInfo();
          updateIcon();
        } );
      }
    };
  } );
