angular.module( 'z-killboard' )
  .directive( 'characterTableIskCell', function() {
    return {
      template: '<span style="color: green;">{{ object.iskDestroyed | isk: true }}</span><br><span style="color:red;">{{ object.iskLost | isk: true }}</span>',
      scope: {
        object: '='
      },
      link: function( scope, element, attr ) {
        element.addClass( 'text-right' );
      }
    };
  } );
