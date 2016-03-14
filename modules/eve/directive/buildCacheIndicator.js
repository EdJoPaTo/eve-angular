angular.module( 'eve' )
  .directive( 'buildCacheIndicator', function() {
    return {
      templateUrl: 'eve/directive/buildCacheIndicator.html',
      scope: {
        error: "=",
        itemcount: "=",
        stillloading: "="
      }
    };
  } );
