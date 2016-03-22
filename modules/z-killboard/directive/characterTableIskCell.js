angular.module( 'z-killboard' )
  .directive( 'characterTableIskCell', function() {
    return {
      template: '<span class="successtext">{{ object.iskDestroyed | shortnumber }}</span><br><br><span class="losstext">{{ object.iskLost | shortnumber }}</span>',
      scope: {
        object: '='
      }
    };
  } );
