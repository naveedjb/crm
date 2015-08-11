/**
 * Created by naveed on 8/12/2015.
 */
angular.module('userService',[])
.factory('User',function($http){

        var userFactory={};
        userFactory.get=function(id){

            return $http.get('/api/users/'+id)

        };

        userFactory.all=function(){

            return $http.get('/api/stuff')
        };

        userFactory.create=function(userData){

            return $http.post('/api/users',userData);

        }

        userFactory.update=function(id,userData){
            return $http.put('/api/users'+id,userData);

        }

        userFactory.delete=function(id){

            return $http.delete('/api/users'+id);
        }

return userFactory;

    })