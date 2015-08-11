/**
 * Created by naveed on 8/9/2015.
 */

angular.module('firstApp',['routerRoutes','ngAnimate'])
    .config(function($routeProvider,$locationProvider){
        $routeProvider
            .when('/home',{
              templateUrl:'views/pages/home.html',
                controller:'homeController',
                controllerAs:'home'
            })
            .when('/about',{
                templateUrl:'views/pages/about.html',
                controller:'aboutController',
                controllerAs:'about'
            })
            .when('/contact',{
                templateUrl:'views/pages/contact.html',
                controller:'contactController',
                controllerAs:'contact'
            })
        $locationProvider.html5Mode(true);

    })


.controller('mainController',function(){

        var vm=this;

        vm.bigMessage="Hello, How are you";
        vm.computers = [
        {name:'MacBook Pro', color: 'silver', nerdness:7},
            {name:'MacBook Pro', color: 'black', nerdness:7},
            {name:'MacBook Pro', color: 'yellow', nerdness:7}
        ];

        vm.computerData={};
vm.addComputer=function(){
    vm.computers.push({
        name:vm.computerData.name,
        color: vm.computerData.color,
        nerdness: vm.computerData.nerdness

    });
    vm.computerData={}
}

    })
.controller('homeController',function(){
var vm=this;

vm.message='Hello Home'

    })
.controller('aboutController',function(){
var vm=this;
vm.message='Hello About'



    })
.controller('contactController',function(){
        var vm=this;
vm.message='Hello Contact'


    })