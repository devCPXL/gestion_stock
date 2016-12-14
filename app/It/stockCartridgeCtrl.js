/**
 * Created by lakroubassi.n on 2/09/2016.
 */
app.controller('stockCartridgeCtrl', function ($scope, $rootScope, $modal, $filter, Data, $location, $window,filterFilter, setElementsScope, $parse, myService, jsonNumericCheck) {

    $scope.items = {};
    $scope.filterAgent = {};
    $scope.filterArticle = {};


    $scope.clear = function(filterName) {
        $scope[filterName] = {};
    };
    $scope.loadData = function(){
        Data.get('orderCartridge').then(function(data){
            $scope.items = data.data;
        });
    };

    // pagination controls
    $scope.currentPage = 1;
    $scope.totalItems = $scope.items.length;
    $scope.entryLimit = 10; // items per page
    $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

    // $watch search to update pagination
    $scope.$watch('search', function (newVal, oldVal) {
        $scope.filtered = filterFilter($scope.items, newVal);
        $scope.totalItems = $scope.filtered.length;
        $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
        $scope.currentPage = 1;
    }, true);

    $scope.loadData();

    $scope.openAddMvt = function(order_cartridge,size) {
        console.log(order_cartridge);

        var modalInstance = $modal.open({
            templateUrl: 'partials/TRAVAUX/stockAddMvtTool.html',
            controller: 'addMvtCtrl',
            size: size,
            resolve: {
                params: function () {
                    return {
                        type_stock : 'MATERIAL',
                        order_cartridge: order_cartridge
                    };
                }
            }
        });
        modalInstance.result.then(function(selectedObject) {
            //console.log(selectedObject);
            $scope.loadData();
        });
    };

    $scope.columns = [
        {text:"ID",predicate:"ID"},
        {text:"DEMANDEUR(se)",predicate:"DEMANDEUR"},
        {text:"SERVICE",predicate:"SERVICE"},
        {text:"IMPRIMANTE",predicate:"IMPRIMANTE"},
        {text:"COULEUR",predicate:"COULEUR"},
        {text:"DESCRIPTION",predicate:"DESCRIPTION"},
        {text:"DATE",predicate:"DATE"},
        {text:"MVT",predicate:"MVT"},
        {text:"LISTE",predicate:"LISTE"},
        //{text:"STATUS",predicate:"STATUS"}
    ];

});
