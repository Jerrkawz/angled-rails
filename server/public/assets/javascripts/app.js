!function(){"use strict";angular.module("angled-rails",["ngRoute","templates","controllers"]),angular.module("controllers",[])}();
!function(){"use strict";var e=angular.module("angled-rails");e.config(["$routeProvider",function(e){e.when("/",{templateUrl:"templates/index.html",controller:"IndexController"})}])}();

controllers=angular.module("controllers"),controllers.controller("IndexController",function(){});