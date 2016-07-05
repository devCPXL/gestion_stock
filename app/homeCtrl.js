/**
 * Created by lakroubassi.n on 15/07/2015.
 */
app.controller('homeCtrl', function ($scope,$rootScope, $location, $route, Data) {
    console.log('homeCtrl');
    console.log($rootScope.rva);
    console.log($rootScope.travaux);
    $scope.go = function ( path ) {
        console.log(path);
        var pathArray = path.split("/");
        pathArray.shift();
        $rootScope.id_service = (pathArray[0] == 'RVA') ? ID_RVA_SERVICE : ((pathArray[0] == 'TRAVAUX') ? ID_TRAVAUX_SERVICE : '');

        if($rootScope.id_service != null){
            Data.get('menu/'+$rootScope.id_service).then(function (results) {
                $rootScope.menu = results.data;
            });
        }

        console.log(pathArray);
        $location.path( path );
    };
});