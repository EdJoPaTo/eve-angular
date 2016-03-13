angular.module( 'eve' )
  .directive( 'buildCacheIndicator', function() {
    return {
      template: '<span ng-show="error">CREST: <span ng-show="error.statusText">{{ error.statusText }}</span><span ng-hide="error.statusText">connection failed</span></span>'
      + '<span ng-hide="error">'
      + '{{ itemcount }} Items loaded.'
      + '<span ng-show="stillloading"> (still loading...)</span>'
      + '</span>',
      scope: {
        error: "=",
        itemcount: "=",
        stillloading: "="
      }
    };
  } );
