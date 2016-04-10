angular.module( 'eve' )
  .directive( 'miningTableEntry', function( crestMarketService, typeIconUrlService ) {
    return {
      restrict: "A",
      scope: {
        pricetype: "=",
        item: "=",
        volume: "=",
        region: "=",
        editmode: "="
      },
      templateUrl: 'eve/directive/miningTableEntry.html',
      link: function( scope, element, attr ) {
        loadPrice( scope.region, scope.item.id, scope.pricetype );

        function recalcAmount() {
          //TODO: 1 cycle or 1 hour
          scope.amount = scope.volume / scope.item.volume;
        }
        scope.$watch( 'volume', recalcAmount );
        recalcAmount();

        scope.singleprice = NaN;

        function loadPrice( regionId, itemId, pricetype ) {
          crestMarketService.getBestPrice( regionId, itemId, pricetype ).then( function( data ) {
            scope.singleprice = data;
            scope.ownPrice = Math.max.apply( null, getAllPrices() );
          } );
        }

        function getAllPrices() {
          //TODO: return normal, reprocessed, compressed
          return [ 0, 1, 2 ];
        }

        scope.isMax = function( price ) {
          var allPrices = getAllPrices();
          allPrices.push( scope.ownPrice );
          return price === Math.max.apply( null, allPrices );
        };

        scope.isMin = function( price ) {
          var allPrices = getAllPrices();
          allPrices.push( scope.ownPrice );
          return price === Math.min.apply( null, allPrices );
        };

        scope.icon = typeIconUrlService;
      }
    };
  } );
