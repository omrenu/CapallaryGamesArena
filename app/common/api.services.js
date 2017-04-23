/**
 * Created by apoorvaagrawal on 18/03/17.
 */
/**
 * Created by Z003FEWY on 2/7/2017.
 */
/**
 * Created by apoorvaagrawal on 17/11/16.
 */
(function() {
    'use strict';

    angular.module('GameArena')
        .factory('Api', Api);

    function Api($http,$q,$resource) {


        var service = {
            games: {
                get: getGame
            }
        };

        return service;

        function getGame(searchTerm){
            var deferred = $q.defer();

            //create post
            $http({

                method:'GET',
                url:'/api/games?search='+searchTerm
            }).then(function(response){

                deferred.resolve(response);

            },function(error){

                deferred.reject(error);

            });

            return  deferred.promise;

        };
    }

})();
