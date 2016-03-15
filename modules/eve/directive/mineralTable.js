angular.module('eve')
.directive( 'mineralTable', function( crestMarketService ) {
  return {
    restrict: "E",
    scope: {
      pricetype: "=",
      kind: "=",
      filter: "=",
      editmode: "="
    },
    templateUrl: 'eve/directive/mineralTable.html',
    link: function (scope, element, attr) {
      scope.regions = [
        { id: 10000002, name: "The Forge" },
        { id: 10000042, name: "Metropolis" },
        { id: 10000043, name: "Domain" },
        { id: 10000030, name: "Heimatar" },
        { id: 10000032, name: "Sinq Laison" }
      ];

      scope.minerals = [];
      function loadMarketGroup(marketGroupId) {
        crestMarketService.getItemsOfMarketGroup( marketGroupId ).then( function ( data ) {
          scope.minerals = scope.minerals.concat(data);
        });
      }
      if (scope.kind === 'ore' || scope.kind === 'all') {
        loadMarketGroup(1857);
      }
      if (scope.kind === 'ice' || scope.kind === 'all') {
        loadMarketGroup(1033);
      }
      if (scope.kind === 'gas' || scope.kind === 'all') {
        loadMarketGroup(983);
      }
      if (scope.kind === 'whgas' || scope.kind === 'all') {
        loadMarketGroup(1859);
      }
    }
  };
});
