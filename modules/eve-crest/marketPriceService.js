angular.module('eve-crest')
.factory('crestMarketPriceService', function ($http, CREST_BASE_URL) {
  var service = {};

  var marketBaseUrl = "market/";
  // regionID between them...
  var marketUrlPart = "/orders/";
  // buy / sell between them...
  var marketUrlSuffix = "/?type=";

  var typeBaseUrl = "types/";

  var bla = "https://public-crest.eveonline.com/market/types/?group=https://public-crest.eveonline.com/market/groups/1857/";

  function askCrest (url) {
    return $http.get(url, { cache: true }).then(function (request) { return request.data; });
  }

  function getPrices (regionID, orderType, typeID) {
    var url = CREST_BASE_URL + marketBaseUrl + regionID + marketUrlPart + orderType + marketUrlSuffix + CREST_BASE_URL + typeBaseUrl + typeID + "/";
    return askCrest(url).then(function (data) {
      return data.items;
    });
  }

  service.getItemsOfMarketGroup = function (marketGroupId) {
    var url = CREST_BASE_URL + "market/types/?group=" + CREST_BASE_URL + "market/groups/" + marketGroupId + "/";
    return askCrest(url).then(function (data) {
      return data.items.map( v => v.type );
    });
  }

  service.getBestPrice = function (regionID, typeID, pricetype) {
    if (!pricetype) pricetype = "sell";
    return getPrices(regionID, pricetype, typeID).then(function(data) {
      return data[0] ? data[0].price : NaN;
    });
  };

  return service;
});
