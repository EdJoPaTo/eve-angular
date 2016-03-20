angular.module( 'eve-crest' )
  .directive( 'regionSelector', function( $route, $routeParams, crestRegionsService ) {
    return {
      template: '<select ng-model="regionId" ng-options="region.id as region.name for region in regions"></select>',
      scope: {
        regionId: "="
      },
      link: function( scope, element, attr ) {
        scope.regionId = Number( $routeParams.region ) || 10000002;

        crestRegionsService.getAll().then( function( allRegions ) {
          scope.regions = allRegions;
        } );

        scope.$watch( 'regionId', function( newValue, oldValue ) {
          if ( newValue === oldValue ) return;
          $route.updateParams( {
            region: newValue !== 10000002 ? newValue : null
          } );
        } );
      }
    };
  } );
