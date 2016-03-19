angular.module( 'eve-crest' )
  .factory( 'typeIconUrlService', function() {
    return function( iconId, size ) {
      if ( !iconId ) return '';
      if (!size) size = 64;
      return '//image.eveonline.com/Type/' + iconId + '_' + size + '.png';
    };
  } );
