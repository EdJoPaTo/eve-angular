angular.module( 'z-killboard' )
  .directive( 'characterTableSuccessRateCell', function() {
    return {
      templateUrl: 'z-killboard/directive/characterTableSuccessRateCell.html',
      scope: {
        destroyed: '=',
        lost: '='
      },
      link: function( scope, element, attr ) {
        scope.$watchGroup( [], function() {
          let successrate = scope.successrate( scope.destroyed, scope.lost );
          let opacity = Math.abs( successrate - 0.5 ) * 2;

          if ( successrate >= 0.5 ) {
            element.css( 'background-color', 'rgba(0, 100, 0, ' + opacity + ')' );
          } else {
            element.css( 'background-color', 'rgba(100, 0, 0, ' + opacity + ')' );
          }
        } );


        scope.successrate = function( destroyed, lost ) {
          let d = destroyed || 0;
          let l = lost || 0;

          return d / ( d + l );
        };
      }
    };
  } );
