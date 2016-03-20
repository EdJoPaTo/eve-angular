angular.module( 'eve-general' )
  .filter( 'isk', function( $filter ) {
    let allLetters = [ '', 'k', 'M', 'B', 'T' ];

    return function( input, short ) {
      if ( !input ) return;
      if ( short ) {
        let exponent = Math.ceil( Math.log10( input ) );
        let engineerExponentLevel = Math.floor( exponent / 3 );
        let engineerExponent = engineerExponentLevel * 3;
        let letter = allLetters[ engineerExponentLevel ];
        let shortValue = input / Math.pow( 10, engineerExponent );

        return $filter( 'number' )( shortValue, 2 - exponent % 3 ) + letter;
      } else {
        return $filter( 'number' )( input, 2 ) + " ISK";
      }
    };
  } );
