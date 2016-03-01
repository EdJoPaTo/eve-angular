angular.module("eve")
.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'templates/pages/main.html'
  })
  .when('/mining', { templateUrl: 'templates/pages/mining.html' })
  .when('/impressum', { templateUrl: 'templates/pages/impressum.html' })
  .when('/legal', { templateUrl: 'templates/pages/legal.html' })
  .when('/about', { templateUrl: 'templates/pages/about.html' })
  .otherwise({ redirectTo: '/' })
  ;
});
