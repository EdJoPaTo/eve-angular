angular.module( 'eve-general' )
  .filter( 'isk', function( $filter ) {
    let allLetters = [ '', 'k', 'M', 'B', 'T' ];

    return function( input, short ) {
      if ( !input ) return;
      if ( short ) {
        return $filter( 'shortnumber' )( input ) + " ISK";
      } else {
        return $filter( 'number' )( input, 2 ) + " ISK";
      }
    };
  } );
