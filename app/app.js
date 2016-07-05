'use strict';

var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate', 'toaster', 'ui.select', 'ngSanitize']); // 'angularFileUpload'

//var id_serviceRva = 260, id_serviceTravaux = 370;
//var id_serviceRva = 15, id_serviceTravaux = 19;

const ID_RVA_SERVICE = 15;
const ID_TRAVAUX_SERVICE = 19;

app.config(['$routeProvider','$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider.
        when('/home', {
          title: 'Home',
          templateUrl: 'partials/home.html',
          controller: 'homeCtrl'
        })
        .when('/RVA/Articles', {
            title: 'Articles',
            templateUrl: 'partials/RVA/articles.html',
            controller: 'articlesCtrl'
        })
        .when('/RVA/Salles', {
            title: 'Salles',
            templateUrl: 'partials/RVA/salles.html',
            controller: 'sallesCtrl'
        })
        .when('/RVA/Batiments', {
          title: 'Batiments',
          templateUrl: 'partials/RVA/batiments.html',
          controller: 'batimentsCtrl'
        })
        .when('/RVA/Suppliers', {
            title: 'FOURNISSEUR',
            templateUrl: 'partials/RVA/suppliers.html',
            controller: 'suppliersCtrl'
        })
        .when('/RVA/Stocks', {
            title: 'STOCKS',
            templateUrl: 'partials/RVA/stocks.html',
            controller: 'stocksRvaCtrl'
        })
        .when('/RVA/stockstatus', {
            title: 'Stock Status',
            templateUrl: 'php/StockStatus.php'
        })
        .when('/RVA/Exceltohtml', {
            title: 'Stock Status',
            templateUrl: 'partials/RVA/test_lecture_xls.php'
        })
        .when('/RVA/listArticleXls', {
            title: 'listArticleXls',
            templateUrl: 'partials/RVA/listArticleXls.php'
        })
        .when('/RVA/MouvementsStock/:id', {
            title: 'Liste de Mouvements',
            templateUrl: 'partials/movementList.html',
            controller: 'listMvtCtrl'
        })
        .when('/RVA/angularjsFileUpload', {
            title: 'File Upload',
            templateUrl: 'partials/RVA/angularjsFileUpload.html'
            ,controller: 'AppController'
        })
        .when('/RVA/FinalizeOrder', {
            title: 'Finaliser Commande Etage',
            templateUrl: 'partials/RVA/finalizeOrder.html',
            controller: 'finalizeOrderCtrl'
        })
        .when('/TRAVAUX/Articles', {
            title: 'Liste Travaux Articles',
            templateUrl: 'partials/TRAVAUX/articles.html',
            controller: 'articlesTravauxCtrl'
        })
        .when('/TRAVAUX/Suppliers', {
            title: 'Liste Travaux Suppliers',
            templateUrl: 'partials/RVA/suppliers.html',
            controller: 'suppliersCtrl'
        })
        .when('/TRAVAUX/Chantiers', {
            title: 'Liste Travaux Chantiers',
            templateUrl: 'partials/TRAVAUX/locations.html',
            controller: 'locationsCtrl'
        })
        .when('/TRAVAUX/Stocks', {
            title: 'Liste Outils',
            templateUrl: 'partials/TRAVAUX/stocks.html',
            controller: 'stocksTravauxCtrl'
        })
        .when('/TRAVAUX/Tools', {
            title: 'Gestion Outils',
            templateUrl: 'partials/TRAVAUX/tools.html',
            controller: 'toolsCtrl'
        })
        .when('/TRAVAUX/MouvementsStock/:id', {
            title: 'Liste de Mouvements',
            templateUrl: 'partials/movementList.html',
            controller: 'listMvtCtrl'
        })
        .when('/RVA/readXlsx', {
            title: 'readXlsx',
            templateUrl: 'partials/readXlsx.php'
        })
        .when('/importJsonFile', {
            title: 'import Json File',
            templateUrl: 'partials/importJsonFile.php'
        })
        .when('/RVA/importJsonFile', {
            title: 'import Json File',
            templateUrl: 'partials/RVA/importJsonFile.php'
        })
        .otherwise({
            redirectTo: '/home'
        });
      //$locationProvider.html5Mode(true);
}]);

app.run(['$location', '$rootScope','Data', function($location, $rootScope, Data) {
    console.log("app.run");
    $rootScope.authenticated = true;
    $rootScope.idRvaService = ID_RVA_SERVICE;
    $rootScope.idTravauxService = ID_TRAVAUX_SERVICE;
    $rootScope.menu = null;

    console.log($rootScope.id_service);

    Data.get('session').then(function (results) {
        if(results['session'] != true)
            window.location.replace(protocol +'://'+ host +'/intranet_v2');
        else
            $rootScope.idServiceUser = results['id_ser'];
    });

    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        console.log("$routeChangeStart");

        var pathArray = $location.path().split("/");
        pathArray.shift();
        $rootScope.id_service = (pathArray[0] == 'RVA') ? ID_RVA_SERVICE : ((pathArray[0] == 'TRAVAUX') ? ID_TRAVAUX_SERVICE : '');
        console.log($rootScope.id_service);

        if($rootScope.id_service != ''){

            Data.get('menu/'+$rootScope.id_service).then(function (results) {
                $rootScope.menu = results.data;
            });
            Data.put('elements',{link_url : $location.path()}).then(function (results) {
                $rootScope.elements = results.data;
            });
        }
    });

    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        console.log("$routeChangeSuccess");



    });

}]);

app.controller('NavCtrl', function($rootScope, $scope, $location, Data, paginationConfig) {

/** Translate Angular-UI pagination */
    paginationConfig.firstText = 'Premier';
    paginationConfig.previousText = 'Précédent';
    paginationConfig.nextText = 'Suivant';
    paginationConfig.lastText = 'Dernier';
    //$rootScope.btn_edit_article =  null;

    //$scope.selectedIndex = 0;
    //$scope.itemClicked = function($index, item){
    //    $scope.selectedIndex = $index;
    //    $rootScope.selectedItem = item;
    //
    //    Data.get('elements/'+$rootScope.selectedItem.id_url).then(function (results) {
    //        $rootScope.elements = results.data;
    //
    //        $rootScope.elements.forEach(function(element, index, array){
    //            console.log("a[" + index + "] = " + element);
    //        });
    //
    //        for(var key in $rootScope.elements){
    //            $rootScope.btn_edit_article = true;
    //
    //            console.log($rootScope.elements[key].id_text_element);
    //            angular.element($rootScope.elements[key].id_text_element).addClass("ng-hide");
    //            //console.log(document.getElementsByClassName($rootScope.elements[key].id_text_element));
    //            //document.getElementsByClassName($rootScope.elements[key].id_text_element).className += "ng-hide";
    //        }
    //
    //    });
    //};

    $scope.isActive = function(route) {
        $scope.path = $location.path();
        return $location.path() === route;
    };
    $scope.includes = function(s){
        //console.log(s);
        return $location.path().includes(s);
    };
    $scope.logout = function () {
        Data.get('logout').then(function (results) {
			window.localStorage.clear();
			$rootScope.agent = {};
            $rootScope.agent_session = {};

            var host = $location.host();
            var protocol = $location.protocol();
            window.location.replace(protocol +'://'+ host +'/intranet_v2');
            //Data.toast(results);
        });
    }

});

app.filter('unique', function() {
    return function(collection, keyname) {
        var output = [],
            keys = [];

        angular.forEach(collection, function(item) {
            var key = item[keyname];
            if(keys.indexOf(key) === -1) {
                keys.push(key);
                output.push(item);
            }
        });

        return output;
    };
});



app.filter('propsFilter', function() {
    return function(items, props) {
        var out = [];

        if (angular.isArray(items)) {
            items.forEach(function(item) {
                var itemMatches = false;

                var keys = Object.keys(props);
                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                        itemMatches = true;
                        break;
                    }
                }

                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            // Let the output be the input untouched
            out = items;
        }

        return out;
    }
});

app.filter('num', function() {
    return function(input) {
        return parseInt(input, 10);
    };
});

//app.filter('startFrom', function() {
//    return function(input, start) {
//        start = +start; //parse to int
//        return input.slice(start);
//    }
//});

app.filter('startFrom', function () {
    return function (input, start) {
        if (input) {
            start = +start;
            return input.slice(start);
        }
        return [];
    };
});