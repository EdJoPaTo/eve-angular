angular.module( 'eve-estimator' )
  .controller( 'PlayerEstimatorCtrl', function( $scope, pilotIdService ) {
    $scope.input = "Rell Silfani\nKarnis Delvari";
    $scope.ids = [ 90419497, 91572014 ];

    function updateIds( inputText ) {
      let array = inputText
        .split( '\n' )
        .map( v => v.trim() );

      pilotIdService( array )
        .then( function( ids ) {
            $scope.ids = ids;
          }, function( error ) {},
          function( ids ) {
            $scope.ids = ids;
          } );
    }

    $scope.$watch( 'input', function( newValue, oldValue ) {
      if ( newValue === oldValue ) return;
      updateIds( newValue );
    } );
    updateIds( $scope.input );
  } );
