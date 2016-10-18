/**
 * Created by lakroubassi.n on 4/08/2015.
 */
app.controller('toolsCtrl', function ($scope, $rootScope, $modal, $filter, Data, $location, $window,filterFilter, setElementsScope, $parse, myService, jsonNumericCheck) {
    $scope.stock = {};
    $scope.filterLocation = {};
    $scope.filterTool = {};
    $scope.filterFamily = {};

    $scope.items = {};

    $scope.clear = function(filterName) {
        $scope[filterName] = {};
    };
    $scope.loadData = function(){

        Data.get('tools/'+$rootScope.id_service).then(function(data){
            $scope.items = data.data;
        });

        Data.get('familys/'+$rootScope.id_service).then(function(data){
            $scope.familys = data.data;
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

    $scope.changeStockStatus = function(stock){
        stock.status = (stock.status=="Active" ? "Inactive" : "Active");
        Data.put("stocks/"+stock.id_stock,{status:stock.status});
    };

    $scope.openAddTool = function (p,size) {
        var modalInstance = $modal.open({
            templateUrl: 'partials/TRAVAUX/articleEdit.html',
            controller: 'articleTravauxEditCtrl',
            size: size,
            resolve: {
                item: function () {
                    return p;
                },
                type_stock: function () {
                    return "TOOL";
                }
            }
        });
        modalInstance.result.then(function(selectedObject) {
            $scope.loadData();
            //$scope.filterArticle.nom_article = selectedObject;
        });
    };
    $scope.openAddMvt = function(p,size) {
        var modalInstance = $modal.open({
            templateUrl: 'partials/TRAVAUX/stockAddMvtTool.html',
            controller: 'addMvtCtrl',
            size: size,
            resolve: {
                params: function () {
                    return {
                        type_stock : p
                    };
                }
            }
        });
        modalInstance.result.then(function(selectedObject) {
            //console.log(selectedObject);
            $scope.loadData();
        });
    };

    $scope.getListMvt = function(stock){
        console.log(stock);
        var str = document.URL;
        //myService.set(stock);
        var n = str.indexOf("#");
        var host = str.substring(0, n);
        var name_article = stock.nom.replace(" ", "_");
        $window.stock = stock;
        $window.open(host+'#/TRAVAUX/MouvementsStock/'+stock.id_stock, '_blank');
    };

    $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent){
        $('#filterTool').selectpicker();
        $('#filterTool').selectpicker('refresh');
        $('#filterFamily').selectpicker();
        $('#filterFamily').selectpicker('refresh');
        $('#filterLocation').selectpicker();
        $('#filterLocation').selectpicker('refresh');

        var i= 1;
        $('.tableFloatingHeader th').each(function() {
            tdWidth = $(this).outerWidth();
            $(".tableFloatingHeaderOriginal th:nth-of-type("+i+")").css({'min-width': tdWidth+'px' , 'max-width': tdWidth+'px' });
            //console.log(i + ' : ' + tdWidth);
            i++;
        });

    });

    $scope.go = function ( path ) {
        $location.path( path );
    };

    $scope.columns = [
        {text:"ID",predicate:"ID"},
        {text:"STOCK",predicate:"STOCK"},
        {text:"MODELE",predicate:"NOM"},
        {text:"REFERENCE",predicate:"MODELE"},
        {text:"MARQUE",predicate:"MARQUE"},
        {text:"TYPE",predicate:"TYPE"},
        {text:"DESCRIPTION",predicate:"DESCRIPTION"},

        {text:"ETAT STOCK",predicate:"ETAT STOCK"},
        //{text:"QTE",predicate:"QTE"},
        {text:"FAMILLE",predicate:"FAMILLE"},
        {text:"ACTION",predicate:"ACTION"},
        {text:"LISTE",predicate:"LISTE"},
        //{text:"STATUS",predicate:"STATUS"}
    ];

});
