const app = angular.module('HotelApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/home.html'
    }).when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardController as vm'
    }).when('/owners', {
        templateUrl: 'views/owners.html',
        controller: 'OwnersController as vm'
    }).otherwise({
        templateUrl: 'views/oops.html'
    });
}]);