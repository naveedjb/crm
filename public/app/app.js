/**
 * Created by naveed on 8/9/2015.
 */

angular.module('firstApp',['routerRoutes','ngAnimate','authService','userService'])
.config(function($httpProvider){
        $httpProvider.interceptors.push('AuthInterceptor');


    });
