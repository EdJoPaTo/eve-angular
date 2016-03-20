angular.module( 'z-killboard' )
  .directive( 'characterTableIskCell', function() {
    return {
      template: '<span class="successtext">{{ object.iskDestroyed | isk: true }}</span><br><br><span class="losstext">{{ object.iskLost | isk: true }}</span>',
      scope: {
        object: '='
      }
    };
  } );
