/**
 * Created by apoorvaagrawal on 18/03/17.
 */
/**
 * Created by ripu on 13/11/16.
 */
(function(){

    'use strict';
    angular.module("GameArena").config(Routes);

    Routes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider'];


    function Routes($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider){

        $stateProvider.

             state('arena', {
                abstract: true,
                templateUrl: 'arena/views/arena.html'
            })
            .state('arena.game', {
                url: '/',
                templateUrl: 'game/views/game.html',
                controller: 'GameCtrl as game'
            })

        $urlRouterProvider.otherwise('/');

    }


})();