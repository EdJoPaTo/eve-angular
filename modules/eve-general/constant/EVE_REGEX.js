angular.module( 'eve-general' )
  .constant( 'EVE_REGEX',
    ( function() {
      var part = {};
      part.amount = /\d+(?:\.?\d{3})*/.source;
      part.amountgroup = '(' + part.amount + ')';

      part.name = /[^\n ]+(?: [^\n ]+)*/.source;
      part.namegroup = '(' + part.name + ')';

      part.splitter = /\s+/.source;

      var constant = {};
      constant.amountName = [
        new RegExp( '^(?:' + part.amountgroup + 'x?' + part.splitter + ')?' + part.namegroup + '$' )
      ];
      constant.nameAmount = [
        new RegExp( '^' + part.namegroup + part.splitter + part.amountgroup + part.splitter + part.name + part.splitter + /\d+,\d+ m3/.source + '$' )
      ];
      return constant;
    } )() );
