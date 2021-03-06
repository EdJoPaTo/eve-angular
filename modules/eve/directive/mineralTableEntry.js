angular.module('eve')
.directive( 'mineralTableEntry', function( crestMarketService, typeIconUrlService ) {
  return {
    restrict: "A",
    scope: {
      pricetype: "=",
      item: "=",
      regions: "=",
      editmode: "="
    },
    templateUrl: 'eve/directive/mineralTableEntry.html',
    link: function (scope, element, attr) {
      for (var i = 0; i < scope.regions.length; i++) {
        loadPrice(scope.regions[i].id, scope.item.id, scope.pricetype);
      }

      scope.amount = 1;

      scope.prices = {};

      function loadPrice( regionId, itemId, pricetype ) {
        crestMarketService.getBestPrice( regionId, itemId, pricetype ).then( function( data ) {
          scope.prices[regionId] = data;
          scope.ownPrice = Math.max.apply(null, getAllPrices());
        });
      }

      function getAllPrices () {
        return scope.regions.map( v => scope.prices[ v.id ] ).filter( v => !isNaN( v ) );
      }

      scope.isMax = function (price) {
        var allPrices = getAllPrices();
        allPrices.push(scope.ownPrice);
        return price === Math.max.apply(null, allPrices);
      };

      scope.isMin = function (price) {
        var allPrices = getAllPrices();
        allPrices.push(scope.ownPrice);
        return price === Math.min.apply(null, allPrices);
      };

      scope.icon = typeIconUrlService;
    }
  };
});
