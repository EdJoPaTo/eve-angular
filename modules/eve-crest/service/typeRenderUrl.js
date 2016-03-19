angular.module( 'eve-crest' )
  .factory( 'typeRenderUrlService', function() {
    return function( iconId, size ) {
      if ( !iconId ) return '';
      if ( !size ) size = 512;
      return '//image.eveonline.com/Render/' + iconId + '_' + size + '.png';
    };
  } );
