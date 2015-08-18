/**
 * Created by naveed on 8/9/2015.
 */
angular.module('routerRoutes',['ngRoute'])
    .config(function($routeProvider,$locationProvider){
        $routeProvider
            .when('/',{
                templateUrl:'app/views/pages/home.html'
               /* controller:'homeController',
                controllerAs:'home'*/
            })
            .when('/login',{
                templateUrl:'app/views/pages/login.html',
                 controller:'mainCtrl',
                 controllerAs:'login'
            })
            .when('/users',{
                templateUrl:'app/views/pages/all.html',
                controller:'userCtrl',
                controllerAs:'user'
            })
            .when('/users/create',{
                templateUrl:'app/views/pages/single.html',
                controller:'userCreateCtrl',
                controllerAs:'users'
            })
            .when('/users/:user_id',{
                templateUrl:'app/views/pages/single.html',
                controller:'userEditCtrl',
                controllerAs:'users'
            });
        $locationProvider.html5Mode(true);

    });