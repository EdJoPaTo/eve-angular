angular.module( 'eve-general' )
  .filter( 'isk', function( $filter ) {
    return function( input ) {
      return $filter( 'number' )( input, 2 ) + " ISK";
    };
  } );
