app.controller('stocksTravauxCtrl', function ($scope, $rootScope, $modal, $filter, Data, $location, $window, myService, jsonNumericCheck, filterFilter, setElementsScope, $parse) {
    $scope.stock = {};
    $scope.filterLocation = {};
    $scope.filterMaterial = {};
    $scope.filterfamily = {};
    $scope.filterSupplier = {};
    $scope.materials = [];

    setElementsScope.set($rootScope, $parse, $scope, $location, Data);

    //$scope.filteredTodos = []
    //    ,$scope.currentPage = 1
    //    ,$scope.numPerPage = 10
    //    ,$scope.maxSize = 5;

    $scope.items = [];

    $scope.loadData = function(){
        //*** Get All Materials ***//
        Data.get('stocksMaterials/'+ $rootScope.id_service +'/gs.id_location').then(function(data){
            //$scope.materials = data.data;
            //$scope.filteredTodos = data.data;
            $scope.items = data.data;
        });
    };

    $scope.loadData();

    // create empty search model (object) to trigger $watch on update
    $scope.search = {};

    $scope.resetFilters = function () {
        // needs to be a function or it won't trigger a $watch
        $scope.search = {};
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



    $scope.clear = function(filterName) {
        $scope[filterName] = {};
    };

    $scope.changeMaterialStatus = function(stock){
        stock.status = (stock.status=="Active" ? "Inactive" : "Active");
        Data.put("stocks/"+stock.id_stock,{status:stock.status});
    };

    $scope.changeStockAvailability = function(stock){
        stock.availability = (stock.availability == "Available" ? "Not_Available" : "Available");
        Data.put("stocks/"+stock.id_stock,{availability:stock.availability});
    };

    $scope.openAddMvt = function (p,size) {
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
        modalInstance.result.then(function() {
            $scope.loadData();
        });
    };

    $scope.openAddInventory = function (p,size) {
        var modalInstance = $modal.open({
            templateUrl: 'partials/RVA/stockEdit.html',
            controller: 'stockEditCtrl',
            size: size,
            resolve: {
                item: function () {
                    return p;
                }
            }
        });
        modalInstance.result.then(function() {
            $scope.loadData();
        });
    };

// TODO : change from lable 'ajouter outil'

    $scope.openAddMaterial = function (p,size) {
        var modalInstance = $modal.open({
            templateUrl: 'partials/TRAVAUX/articleEdit.html',
            controller: 'articleTravauxEditCtrl',
            size: size,
            resolve: {
                item: function () {
                    return p;
                },
                type_stock: function () {
                    return "MATERIAL";
                }
            }
        });
        modalInstance.result.then(function(selectedObject) {
            $scope.loadData();
        });
    };

    $scope.getListMvt = function(stock){
        console.log(stock);
        var adsUrl = $location.absUrl().split('#')[0];
        var service = $location.absUrl().split('/')[5];

        //var name_article = stock.nom.replace(/ /g, '_');
        $window.stock = stock;
        $window.open(adsUrl+'#/'+service+'/MouvementsStock/'+stock.id_stock, '_blank');
    };

    $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent){

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


    $scope.openStockDelivery = function(p,size){
        var modalInstance = $modal.open({
            templateUrl: 'partials/RVA/stockDelivery.html',
            controller: 'stockRvaDeliveryCtrl',
            size: size,
            resolve: {
                item: function () {
                    return p;
                }
            }
        });
        modalInstance.result.then(function() {
            $scope.loadData();
        });
    };

    $scope.openStockDeliveryList = function(p,size){
        var modalInstance = $modal.open({
            templateUrl: 'partials/RVA/stockDeliveryList.html',
            controller: 'stockRvaDeliveryListCtrl',
            size: size,
            resolve: {
                item: function(){
                    return p;
                }
            }
        });
        modalInstance.result.then(function() {
        });
    };

    $scope.openStockDelivery = function(p,size){
        var modalInstance = $modal.open({
            templateUrl: 'partials/RVA/stockDelivery.html',
            controller: 'stockRvaDeliveryCtrl',
            size: size,
            resolve: {
                item: function () {
                    return p;
                }
            }
        });
        modalInstance.result.then(function() {
            $scope.loadData();
        });
    };

    $scope.openStockDeliveryList = function(p,size){
        var modalInstance = $modal.open({
            templateUrl: 'partials/RVA/stockDeliveryList.html',
            controller: 'stockRvaDeliveryListCtrl',
            size: size,
            resolve: {
                item: function(){
                    return p;
                }
            }
        });
        modalInstance.result.then(function() {
        });
    };

    $scope.openAssessmentLocation = function(p,size){
        var modalInstance = $modal.open({
            templateUrl: 'partials/TRAVAUX/assessmentLocation.html',
            controller: 'assessmentLocationCtrl',
            size: size,
            resolve: {
                item: function(){
                    return p;
                }
            }
        });
        modalInstance.result.then(function() {
        });
    };

    $scope.openDeliveryList = function(p,size){
        var modalInstance = $modal.open({
            templateUrl: 'partials/RVA/stockDeliveryList.html',
            controller: 'stockRvaDeliveryListCtrl',
            size: size,
            resolve: {
                item: function(){
                    return false;
                }
            }
        });
        modalInstance.result.then(function() {
        });
    };

    $scope.openLastMvt = function(p,size){
        var modalInstance = $modal.open({
            templateUrl: 'partials/lastMvtList.html',
            controller: 'stockLastMvtListCtrl',
            size: size,
            resolve: {
                item: function(){
                    return false;
                }
            }
        });
        modalInstance.result.then(function() {
        });
    };

    $scope.exportPDF = function(filtered,size){

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        var hh = today.getHours();
        var mn = today.getMinutes();

        if(mm<10) { mm='0'+mm }
        if(dd<10) { dd='0'+dd }
        if(hh<10) { hh='0'+hh }
        if(mn<10) { mn='0'+mn }
        today = mm+'/'+dd+'/'+yyyy;
        var time = hh+':'+mn;

        var columns = [
            {title:"STOCK",dataKey:"name_location"},
            {title:"MODELE",dataKey:"nom"},
            {title:"DESCRIPTION",dataKey:"description_f"},
            {title:"REFERENCE",dataKey:"code_barre"},
            {title:"TYPE",dataKey:"type_article"},
            {title:"UNITE",dataKey:"unite"},
            {title:"QTE",dataKey:"quantite_current"},
            {title:"PRIX",dataKey:"price"},
            {title:"FAMILLE",dataKey:"name_family"}
        ];

        var getImageFromUrl = function(url, callback) {
            var img = new Image();

            img.onError = function() {
                alert('Cannot load image: "'+url+'"');
            };
            img.onload = function() {
                callback(img);
            };
            img.src = url;
        }


        var createPDF = function(imgData) {
            var doc = new jsPDF('landscape', 'pt');

            doc.autoTable(columns, $scope.filtered, {
                theme: 'grid',
                styles: {
                    fontSize: 8,
                    overflow: 'linebreak'
                },
                //columnStyles: {
                //    id: {fillColor: 255}
                //},
                margin: {top: 100},
                beforePageContent: function(data) {
                    doc.addImage(imgData, 25, 25, 230, 40);
                    doc.setTextColor(100);
                    doc.setFontSize(12);
                    doc.text("SERVICE DES TRAVAUX / ETAT DU STOCKS", 320, 50);


                    doc.setTextColor(100);
                    doc.setFontSize(9);
                    doc.text("Chantier/Magasin : ", 50, 90);
                    doc.text( $scope.filterLocation && $scope.filterLocation.location ? $scope.filterLocation.location.name_location : "vide",
                                            110, 90);
                    doc.text("Article : ", 200, 90);
                    doc.text( $scope.filterMaterial && $scope.filterMaterial.location ? $scope.filterMaterial.location.nom : "vide" ,
                                            240, 90);
                    doc.text("Famille : ", 460, 90);
                    doc.text( $scope.filterfamily && $scope.filterfamily.location ? $scope.filterfamily.location.name_family : "vide",
                                            510, 90);
                    doc.text("Fournisseur : ", 640, 90);
                    doc.text( $scope.filterfamily && $scope.filterSupplier.location ? $scope.filterSupplier.location.name_supplier : "vide",
                                            690, 90);

                    //console.log($scope.filterLocation);
                    //console.log($scope.filterMaterial);
                    //console.log($scope.filterfamily);

                },
                afterPageContent: function (data) {
                    doc.text("SERVICE DES TRAVAUX CHAUSSEE DE BOONDAEL 98, 1050 BRUXELLES Tel : 02.641.55.21 Fax : 02.641.54.79 ", 220, 570);
                    doc.text("Générer le : "+today+" à "+time, 60, 570);
                }
            });
            // Output as Data URI
            //doc.output('datauri');
            doc.save('Stocks_ServiceTravaux_'+today+'_'+time+'.pdf');
        }

        getImageFromUrl('assets/global/img/logoCPASXL.jpg', createPDF);
        //doc.save('table.pdf');
        //console.log(doc);
    };

    $scope.columns = [
        {text:"STOCK",predicate:"MAGASIN/CHANTIER"},
        {text:"MODELE",predicate:"MODELE"},
        {text:"DESCRIPTION",predicate:"DESCRIPTION"},
        {text:"REFERENCE",predicate:"REFERENCE"},
        {text:"TYPE",predicate:"TYPE"},
        {text:"UNITE",predicate:"UNITE"},
        {text:"QTE",predicate:"QTE"},
        {text:"PRIX",predicate:"PRIX"},
        {text:"FAMILLE",predicate:"FAMILLE"},
        {text:"SUPL.",predicate:"SUPL."},
        {text:"ACTION",predicate:"ACTION"},
        //{text:"RECEPTION",predicate:"RECEPTION"},
        {text:"STATUS",predicate:"STATUS"}
    ];

});




app.controller('stockTravauxAddCtrl', function ($scope, $route, $modal, $modalInstance, item, Data, toaster) {

    $scope.loadData = function () {
        Data.get('salles').then(function(data){
            $scope.salles = data.data;

            $scope.newStock = {
                //id_salle: null
            };
        });
    };

    $scope.changeSalleStock = function(id_location){
        $scope.articles = null; // clear the scope to trigger ngFinishRepeat function
        Data.get('articlesToAddStock/'+id_location+'/'+ID_TRAVAUX_SERVICE).then(function(data){
            if(data.data.length > 0){

                $scope.newStock = {
                    id_location: $scope.newStock.id_location,
                    id_article: data.data[0].id_article,
                    stock_alert: $scope.newStock.stock_alert,
                    stock_min: $scope.newStock.stock_min
                };
                $scope.articles = data.data;
            }
        });
    };

    $scope.loadData();

    $scope.title = 'Ajouter Stock';
    $scope.buttonText = 'Ajouter Stock';

    $scope.cancel = function () {
        $modalInstance.dismiss('Close');
    };
    var original = item;
    $scope.isClean = function() {
        return angular.equals(original, $scope.stock);
    };

    $scope.saveNewStock = function (newStock) {
        console.log(newStock);
        Data.post('Stocks', newStock).then(function (result) {
            if(result.status != 'error'){
                console.log(result);
                toaster.pop('success', "succés", '<ul><li>Ajout effectué avec succés</li></ul>', 5000, 'trustedHtml');
                var selectedObject =  $('#SelectArticle option:selected').text();
                $modalInstance.close(selectedObject);

            }else{
                console.log(result);
                toaster.pop('error', "Erreur", '<ul><li>Erreur pendant l \'Ajout du Stock</li></ul>', null, 'trustedHtml');
                $modalInstance.close();
            }
        });
    };

    $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent){
        $('#SelectSalle, #SelectArticle').selectpicker();
        $('#SelectSalle, #SelectArticle').selectpicker('refresh');
    });

});

app.controller('stockDeliveryCtrl', function ($scope, $route, $modal, $modalInstance, $filter, item, Data, toaster) {
    var DateNow = $filter("date")(Date.now(), 'yyyy-MM-dd');
    $scope.title = 'Reception au Stock';
    $scope.subTitle = item.nom_article;
    $scope.buttonText = 'Ajouter Reception';

    $scope.cancel = function () {
        $modalInstance.dismiss('Close');
    };
    var original = item;
    $scope.isClean = function() {
        return angular.equals(original, $scope.stock);
    };

    $scope.loadData = function () {
        Data.get('stocksSuppliers/'+item.id_article).then(function(data){
            $scope.stocksSuppliers = data.data;
            console.log($scope.stocksSuppliers);
            $scope.DeliveryStock = {
                stockArticle: JSON.stringify($scope.stocksSuppliers[0]),
                date_mvt: DateNow,
                date_order: DateNow

            };
        });
    };
    $scope.stock = angular.copy(item);
    $scope.loadData();

    $scope.saveDeliveryStock = function(DeliveryStock){
        console.log(DeliveryStock);
        DeliveryStock.stockArticle = JSON.parse(DeliveryStock.stockArticle);
        DeliveryStock.to_stockArticle = $scope.stock;
        DeliveryStock.type_mvt = 'DELIVERY';

        DeliveryStock.quantite = DeliveryStock.quantite * DeliveryStock.pack_carton;
        DeliveryStock.price = DeliveryStock.price / DeliveryStock.pack_carton;
        //delete DeliveryStock.pack_carton;

        console.log(DeliveryStock);

        Data.post('StockMvt', DeliveryStock).then(function (result) {
            if(result.status != 'error'){
                console.log(result)
                toaster.pop('success', "succés", '<ul><li>Reception effectué avec succés</li></ul>', 5000, 'trustedHtml');
                $modalInstance.close();
            }else{
                console.log(result);
                toaster.pop('error', "Erreur", '<ul><li>Erreur pendant l \'Ajout de la Réception</li></ul>', null, 'trustedHtml');
                $modalInstance.close();
            }
        });
    };

    $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent){
        $('#SelectStockSupplier').selectpicker();
        $('#SelectStockSupplier').selectpicker('refresh');
    });

});


app.controller('assessmentLocationCtrl', function ($rootScope, $scope, $route, $modal, $modalInstance, $filter, item, Data) {

    $scope.title = 'GENERER BILAN CHANTIER';
    $scope.buttonText = 'Générer & Télécharger';
    $scope.assessmentLocation = {};

    $scope.cancel = function () {
        $modalInstance.dismiss('Close');
    };

    Data.get('locations/' + $rootScope.id_service).then(function(data){
        $scope.locations = data.data;
    });


    $scope.generatePdf = function(p,size){
        console.log(p);
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        var hh = today.getHours();
        var mn = today.getMinutes();

        if(mm<10) { mm='0'+mm }
        if(dd<10) { dd='0'+dd }
        if(hh<10) { hh='0'+hh }
        if(mn<10) { mn='0'+mn }
        today = mm+'/'+dd+'/'+yyyy;
        var time = hh+':'+mn;
        var columns = [
            {title:"REFERENCE",dataKey:"code_barre"},
            {title:"MODELE",dataKey:"nom"},
            {title:"DESCRIPTION",dataKey:"description_f"},
            {title:"UNITE",dataKey:"unite"},
            {title:"TYPE",dataKey:"type_article"},
            {title:"FAMILLE",dataKey:"name_family"},
            {title:"QTE",dataKey:"quantite_current"},
            {title:"PRIX",dataKey:"price"},
            {title:"MONTANT",dataKey:"amount"},
            {title:"TVA",dataKey:"vat"},
            {title:"TOTAL",dataKey:"total"}
        ];

        Data.get('stocksMaterials/'+ $rootScope.id_service +'/'+ $scope.assessmentLocation.location.id_location).then(function(data){
            $scope.stocksMaterials = data.data;
            //console.log($scope.stocksMaterials);

            $scope.TotalTTC = 0;
            $scope.TotalHT = 0;

            for (var key in $scope.stocksMaterials) {
                var data = {};
                //console.log($scope.stocksMaterials[key]);

                $scope.stocksMaterials[key].price = $scope.stocksMaterials[key].price == null ? 0 : $scope.stocksMaterials[key].price;
                $scope.stocksMaterials[key].amount = (parseFloat($scope.stocksMaterials[key].price) * parseInt($scope.stocksMaterials[key].quantite_current)).toFixed(2);
                $scope.stocksMaterials[key].total = (parseFloat($scope.stocksMaterials[key].amount) * (1 + (parseFloat($scope.stocksMaterials[key].vat)/100))).toFixed(2);

                $scope.TotalHT = $scope.TotalHT + parseFloat($scope.stocksMaterials[key].amount);
                $scope.TotalTTC = $scope.TotalTTC + parseFloat($scope.stocksMaterials[key].total);

                $scope.stocksMaterials[key].vat = $scope.stocksMaterials[key].vat + ' %';
                $scope.stocksMaterials[key].total = $scope.stocksMaterials[key].total + ' €';
            }

            console.log($scope.TotalTTC.toFixed(2));
        });

        var getImageFromUrl = function(url, callback) {
            var img = new Image();

            img.onError = function() {
                alert('Cannot load image: "'+url+'"');
            };
            img.onload = function() {
                callback(img);
            };
            img.src = url;
        }


        var createPDF = function(imgData) {
            var doc = new jsPDF('landscape', 'pt');

            doc.autoTable(columns, $scope.stocksMaterials, {
                theme: 'grid',
                styles: {
                    fontSize: 8,
                    overflow: 'linebreak'
                },
                //columnStyles: {
                //    id: {fillColor: 255}
                //},
                margin: {top: 130},
                beforePageContent: function(data) {
                    doc.addImage(imgData, 25, 25, 230, 40);
                    doc.setTextColor(100);
                    doc.setFontSize(12);
                    doc.text("SERVICE DES TRAVAUX", 360, 70);
                    doc.text("BILAN CHANTIER", 380, 85);
                    doc.setFontSize(10);
                    doc.text("TYPE : "+$scope.assessmentLocation.location.type_location, 60, 100);
                    doc.text("CHANTIER : "
                        +$scope.assessmentLocation.location.description_f + ' '
                        +$scope.assessmentLocation.location.start_date + ' --> '
                        +$scope.assessmentLocation.location.end_date, 60, 115);

                    //console.log($scope.filterLocation);
                    //console.log($scope.filterMaterial);
                    //console.log($scope.filterfamily);

                },
                afterPageContent: function (data) {
                    doc.setFontSize(9);
                    doc.text(" Total HT : "+$scope.TotalHT.toFixed(2)+' €', 600, 550);
                    doc.text(" Total TTC : "+$scope.TotalTTC.toFixed(2)+' €', 700, 550);
                    doc.setFontSize(8);
                    doc.text("SERVICE DES TRAVAUX CHAUSSEE DE BOONDAEL 98, 1050 BRUXELLES Tel : 02.641.55.21 Fax : 02.641.54.79 ", 220, 570);
                    doc.text("Générer le : "+today+" à "+time, 60, 570);
                }
                //,
                //afterPageAdd: function(data){
                //    doc.setFontSize(9);
                //    doc.text(" Total HT : "+$scope.TotalHT.toFixed(2)+' €', 600, 500);
                //    doc.text(" Total TTC : "+$scope.TotalTTC.toFixed(2)+' €', 700, 500);
                //}
            });
            // Output as Data URI
            //doc.output('datauri');
            doc.save('ServiceTravaux_BilanChantier_'+today+'_'+time+'.pdf');
        }
        getImageFromUrl('assets/global/img/logoCPASXL.jpg', createPDF);
    };
});

