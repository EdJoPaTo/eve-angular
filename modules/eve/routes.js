angular.module("eve")
.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'templates/pages/main.html'
  })
  .when('/mining', { redirectTo: '/mining/ore/sell' })
  .when('/mining/:kind/:pricetype', { templateUrl: 'templates/pages/mining.html', controller: 'miningCtrl' })
  .when('/iteminfo', { templateUrl: 'templates/pages/iteminfo.html', controller: 'ItemInfoCtrl' })
  .when('/impressum', { templateUrl: 'templates/pages/impressum.html' })
  .when('/legal', { templateUrl: 'templates/pages/legal.html' })
  .when('/about', { templateUrl: 'templates/pages/about.html' })
  .otherwise({ redirectTo: '/' })
  ;
});
