angular.module( 'general' )
  .directive( 'niceHeightTextarea', function() {
    return function( scope, element, attr ) {
      scope.$watch( attr.ngModel, function( newValue ) {
        element[ 0 ].rows = newValue.split( '\n' ).length + 5;
      } );
    };
  } );
