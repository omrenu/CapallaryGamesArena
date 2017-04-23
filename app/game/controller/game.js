
(function () {
    'use strict';
    angular.module('GameArena')
        .controller('GameCtrl', GameCtrl);

    function GameCtrl(Api,$scope, $rootScope, $timeout) {
        var vm = this;

        $scope.searchByName = '';
        $scope.platform = '';

        vm.setPage = setPage;
        vm.searchTerms = '';
        vm.showFilter = false;
        vm.bkGames = [];
        vm.pager = {};
        vm.pagedItems = [];
        vm.pageSize = 10;


        $scope.$on('$viewContentLoaded', function() {

            $scope.getGames();
        });

        $scope.getGames = function() {
            $rootScope.loading = true;

            if(($scope.searchByName!=undefined || $scope.searchByName!=null) && $scope.searchByName.length){
                 vm.searchTerms = $scope.searchByName;
            }
            else
            {
                vm.searchTerms = '';
            }

            Api.games.get(vm.searchTerms).then(function(games) {

                vm.allGames = games.data;
                //console.log("All Games",vm.allGames);
                $timeout(function () {
                    $rootScope.loading = false;
                }, 1500);

                vm.setPage(1);
            });

        };
        $scope.$watch('searchByName', function(newSearch, oldSearch) {

            vm.searchTerms = '';
            if (newSearch !== oldSearch) {

                $rootScope.loading = true;

                if((newSearch!=undefined || newSearch!=null) && newSearch.length){
                    vm.searchTerms = newSearch;
                }

                Api.games.get(vm.searchTerms).then(function(games) {

                    vm.allGames = games.data;
                    //console.log("All Games",vm.allGames);
                    $timeout(function () {
                        $rootScope.loading = false;
                    }, 1500);

                    vm.setPage(1);
                });

            }
        });


        vm.filterClick = function(){

            vm.showFilter = !vm.showFilter;
            vm.ascendingId =  document.getElementById("ascending");
            vm.descendingId = document.getElementById("descending");
            vm.filter = document.getElementsByClassName("filter")[0];

            var val= vm.filter.style.display;

            if(val=='flex'){

                vm.filter.style.display='none';
            }else{
                vm.filter.style.display='flex';

            }

            if(vm.ascendingVal){
                if(vm.ascendingId){
                    vm.ascendingId.setAttribute('background','#3f51b5');
                    vm.ascendingId.setAttribute('color','#3f51b5');
                }
            }
            if(vm.descendingVal){
                if(vm.descendingId){
                    vm.descendingId.setAttribute('background','#3f51b5');
                    vm.descendingId.setAttribute('color','#3f51b5');
                }
            }

        }

        vm.ascendingFun =function(evt){

            //console.log(evt.target.id);
            vm.ascendingVal=true;
            vm.descendingVal=false;
            vm.ascendingId.style.background = '#3f51b5';
            vm.ascendingId.style.color = '#3f51b5';
            vm.descendingId.style.background = 'yellow';
            vm.descendingId.style.color = 'yellow';
            //alert("ascendingFun");
            vm.allGames = sortFunctionality("score");
            vm.setPage(1);
        }

        vm.descendingFun = function(){

            vm.ascendingVal=false;
            vm.descendingVal=true;
            vm.ascendingId.style.background = 'yellow' ;
            vm.ascendingId.style.color = 'yellow';
            vm.descendingId.style.background = '#3f51b5';
            vm.descendingId.style.color = '#3f51b5';
            vm.allGames = sortFunctionality("score").reverse();
            vm.setPage(1);
        }

        vm.sortPlatform = function(){

            if($scope.platform===true || !$scope.platform){
                vm.bkGames=JSON.parse(JSON.stringify(vm.allGames));
                vm.allGames = sortFunctionality("platform");
            }else{
                vm.allGames = vm.bkGames;
            }
            this.setPage(1);

        }

        function setPage(pageNo){

            //alert("i am in setPage");
            vm.pager = getPager(vm.allGames.length,pageNo,vm.pageSize);
            vm.pagedItems = vm.allGames.slice(vm.pager.startIndex, vm.pager.endIndex + 1);

        }

        function getPager(totalItems,currentPage,pageSize){

            var totalPages = Math.ceil(totalItems / pageSize);

            var startPage,endPage;

            if (totalPages <= 10) {
                startPage = 1;
                endPage = totalPages;
            } else {
                if (currentPage <= 6) {
                    startPage = 1;
                    endPage = 10;
                } else if (currentPage + 4 >= totalPages) {
                    startPage = totalPages - 9;
                    endPage = totalPages;
                } else {
                    startPage = currentPage - 5;
                    endPage = currentPage + 4;
                }
            }

            var startIndex = (currentPage - 1) * pageSize;
            var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

            var pages = _.range(startPage, endPage + 1);

            return {
                totalItems: totalItems,
                currentPage: currentPage,
                pageSize: pageSize,
                totalPages: totalPages,
                startPage: startPage,
                endPage: endPage,
                startIndex: startIndex,
                endIndex: endIndex,
                pages: pages
            };

        }

        function initShow() {
            hideAll();
            vm.searchByName = '';
        }

        function sortFunctionality(val){

            return vm.allGames.sort(function(name1, name2) {
                if ( name1[val] < name2[val] ){
                    return -1;
                }else if( name1[val] > name2[val] ){
                    return 1;
                }else{
                    return 0;
                }
            });
        }


    }

})();