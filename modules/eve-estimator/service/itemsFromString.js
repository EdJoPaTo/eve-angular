angular.module( 'eve-estimator' )
  .factory( 'itemsFromStringService', function( EVE_REGEX ) {
    function filterOutNullOrEmpty( input ) {
      if ( !input ) return false;
      if ( input === "" ) return false;
      return true;
    }

    function getItemWithName( possibleItems, name ) {
      if ( !name ) return;
      var hits = possibleItems.filter( i => i.type.name === name );
      return hits[ 0 ];
    }

    function amountToNumber( amountString ) {
      if ( !amountString ) return 1;
      return Number( amountString.replace( '.', '' ) );
    }

    function getItemsOfLine( possibleItems, line ) {
      var items = [];

      items = items.concat(
        EVE_REGEX.amountName
        .map( r => r.exec( line ) )
        .filter( filterOutNullOrEmpty )
        .map( match => ( {
          name: match[ 2 ],
          amount: amountToNumber( match[ 1 ] )
        } ) )
      );
      items = items.concat(
        EVE_REGEX.nameAmount
        .map( r => r.exec( line ) )
        .filter( filterOutNullOrEmpty )
        .map( match => ( {
          name: match[ 1 ],
          amount: amountToNumber( match[ 2 ] )
        } ) )
      );

      items = items
        .map( function( hit ) {
          var item = getItemWithName( possibleItems, hit.name );
          if ( item ) {
            hit.id = item.id;
          }
          return hit;
        } )
        .filter( item => item.id );
      return items;
    }


    return function( possibleItems, input ) {
      var lines = input
        .split( '\n' )
        .filter( filterOutNullOrEmpty );

      var items = [];

      for ( var i = 0; i < lines.length; i++ ) {
        items = items.concat( getItemsOfLine( possibleItems, lines[ i ] ) );
      }

      return items;
    };
  } );
