/**
 * Created by naveed on 8/14/2015.
 */

angular.module('firstApp')
.controller('mainCtrl',function($rootScope,$location,Auth){

        var vm=this;

     vm.loggedIn=Auth.isLoggedIn();
        vm.error='';

        $rootScope.$on('$routeChangeStart',function(){
        vm.loggedIn=Auth.isLoggedIn();

            /*Auth.getUser()
                .then(function(data) {
                    vm.user = data.data;
                });*/

        });
        vm.doLogIn=function(){
            vm.processing = true;
            Auth.login(vm.loginData.username,vm.loginData.password)
                .success(function(data){
                    vm.processing = false;
                    if(data.success)
                    $location.path('/users');
                    else
                    vm.error=data.message;
                });

        };

        vm.doLogOut=function(){
            Auth.logout();
            vm.user={};
            $location.path('/login');


        };


    });