angular.module( 'eve-general' )
  .filter( 'volume', function( $filter ) {
    return function( input ) {
      return $filter( 'number' )( input, 2 ) + " m³";
    };
  } );
