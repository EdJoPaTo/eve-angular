angular.module( 'eve-general' )
  .filter( 'shortnumber', function( $filter ) {
    let allLetters = [ '', 'k', 'M', 'B', 'T' ];

    return function( input ) {
      if ( !input ) return;
      let exponent = Math.ceil( Math.log10( input ) );
      let engineerExponentLevel = Math.floor( exponent / 3 );
      let engineerExponent = engineerExponentLevel * 3;
      let letter = allLetters[ engineerExponentLevel ];
      let shortValue = input / Math.pow( 10, engineerExponent );

      let fractionDigits = Math.min(2, 3 - exponent % 3);
      return $filter( 'number' )( shortValue, fractionDigits ) + letter;
    };
  } );
