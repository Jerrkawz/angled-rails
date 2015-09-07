(function () {
    'use strict';
    
    var angled_rails = angular.module('angled-rails');
    
    angled_rails.config(function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl : 'templates/index.html',
            controller : 'IndexController'
        });
    });
})();