/**
 * Created by lakroubassi.n on 17/10/2016.
 */
app.controller('addMvtCtrl', function ($rootScope, $scope, $route, $modal, $filter, $modalInstance, params, Data, toaster) {
    $scope.title = 'Ajouter mouvement';
    $scope.buttonText = 'Ajouter';
    $scope.qteMax = 0;
    $scope.toolMvt = {};

    $scope.cancel = function () {
        $modalInstance.dismiss('Close');
    };

    $scope.loadStocksCartridges = function(id_location){
        if(params.order_cartridge != undefined){
            Data.get('stocksCartridges/'+ id_location +'/'+ params.order_cartridge.id_article).then(function(data){
                $scope.stocksArticle = data.data;
                if(data.data.length > 0){
                    $scope.toolMvt.stockArticle = {}
                }else{
                    $scope.stocksArticle = [];
                }
            });
        }
    };


    $scope.loadData = function () {
        Data.get('locations/'+$rootScope.id_service).then(function(data){
            $scope.locations = data.data;
            $scope.locations_to = data.data;

            // Initialize Location

            $scope.toolMvt = {
                date_mvt : $filter("date")(Date.now(), 'yyyy-MM-dd'),
                selected_location : $.grep($scope.locations, function(e){ return e.id_location == $rootScope.id_MainStock; })[0],
                selected_location_to : $.grep($scope.locations, function(e){ return e.description_f.search(params.order_cartridge.id_service) != -1; })[0]
            };

            //$scope.qteMax = $scope.toolMvt.quantite;

            $scope.changeLocation($rootScope.id_MainStock);

            if(params.order_cartridge != undefined)
                $scope.loadStocksCartridges($scope.toolMvt.selected_location.id_location);
        });
    };
    $scope.loadData();

    $scope.changeLocation = function(id_location){
        if(params.order_cartridge != undefined)
            $scope.loadStocksCartridges($scope.toolMvt.selected_location.id_location);
        else
            Data.get('stocksLocation/'+$rootScope.id_service+'/'+params.type_stock+'/'+id_location).then(function(data){
                $scope.stocksArticle = data.data;
                if(data.data.length > 0){
                    $scope.toolMvt.stockArticle = {}
                }else{
                    $scope.stocksArticle = [];
                }
            });

    };

    $scope.changeStockArticle = function(){
        $scope.toolMvt.quantite = 1;
    };

    $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent){
    });

    $scope.savetoolMvt = function(toolMvt){
        //toolMvt.stockArticle = JSON.parse(toolMvt.stockArticle);
        toolMvt.type_mvt = 'INTERNAL';
        toolMvt.type_stock = params.type_stock;
        console.log(toolMvt);

        Data.post('ToolMvt',toolMvt).then(function(result){
            if(result.status != 'error'){
                console.log(result)
                $modalInstance.close();
                toaster.pop('success', "succés", '<ul><li>Ajout effectué avec succés</li></ul>', 5000, 'trustedHtml');

            }else{
                console.log(result);
                $modalInstance.close();
                toaster.pop('error', "Erreur", '<ul><li>Erreur pendant l \'Ajout du mouvement</li></ul>', null, 'trustedHtml');
            }
        });
    };
});


app.controller('stockLastMvtListCtrl', function ($rootScope, $scope, $route, $modal, $modalInstance, $filter, item, Data, toaster) {

    console.log(item);
    $scope.title = 'Liste Dernière mouvement ';
    var original = item;

    $scope.cancel = function () {
        $modalInstance.dismiss('Close');
    };

    $scope.isClean = function() {
        return angular.equals(original, $scope.stock);
    };

    $scope.loadData = function () {
        Data.get('lastMvtStockTravaux/'+$rootScope.id_service).then(function(data){
            $scope.lastMvtMaterial = data.data;
        });
    };
    $scope.stock = angular.copy(item);
    $scope.loadData();

    $scope.columns = [
        {text:"REFERENCE",predicate:"REFERENCE",sortable:true,dataType:"number"},
        {text:"ARTICLE",predicate:"ARTICLE",sortable:true},
        {text:"STOCK DEPART",predicate:"STOCK DEPART",sortable:true},
        {text:"STOCK ARRIVEE",predicate:"STOCK ARRIVEE",sortable:true},
        {text:"QTE",predicate:"QTE",sortable:true},
        {text:"DATE MVT",predicate:"DATE MVT"},
        {text:"COMMENTAIRE",predicate:"Commentaire",sortable:true}
    ];
});