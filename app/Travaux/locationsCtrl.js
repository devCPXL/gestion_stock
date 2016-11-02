
app.controller('locationsCtrl', function ($rootScope, $scope, $route, $modal, $filter, Data, jsonNumericCheck) {
    $scope.locations = {};
    var templateUrl = "";

    var columnsTra = [
        {   nameColumn:"id_salle",              text:"ID",                  visibility: "true"},
        {   nameColumn:"type_location",         text:"ART BUEGETAIRE",      visibility: "true"},
        {   nameColumn:"description_f",         text:"LOCALISATION BAT",    visibility: "true"},
        {   nameColumn:"start_date",            text:"DATE DEBUT",          visibility: "true"},
        {   nameColumn:"end_date",              text:"DATE FIN",            visibility: "true"},
        {   nameColumn:"id_agent",              text:"CHEF D'EQUIPE",       visibility: "true"},
        {   nameColumn:"further_information",   text:"DESCRIPTION CHANTIER",visibility: "true"}
        //,{   text:"MAJ", predicate:"MAJ"}
    ];

    var columnsInfo = [
        {   nameColumn:"id_salle",              text:"ID",          visibility: "true"},
        {   nameColumn:"type_location",         text:"BATIMENT",    visibility: "true"},
        {   nameColumn:"description_f",         text:"LOCAL",       visibility: "true"},
        {   nameColumn:"start_date",            text:"DATE DEBUT",  visibility: "false"},
        {   nameColumn:"end_date",              text:"DATE FIN",    visibility: "false"},
        {   nameColumn:"id_agent",              text:"AGENT",       visibility: "false"},
        {   nameColumn:"further_information",   text:"DESCRIPTION ",visibility: "true"}
        //,{   text:"MAJ", predicate:"MAJ"}
    ];

    switch ($rootScope.id_service)
    {   case ID_TRAVAUX_SERVICE:
            $scope.columns = columnsTra;
            templateUrl = 'partials/TRAVAUX/locationEdit.html';
            $scope.title_location = 'chantiers';
            break;
        case ID_IT_SERVICE:
            $scope.columns = columnsInfo;
            templateUrl = 'partials/IT/locationEdit.html';
            $scope.title_location = 'services'
            break;
    }

    Data.get('locations/'+$rootScope.id_service).then(function(data){
        $scope.locations = jsonNumericCheck.d(data.data);
    });

    $scope.open = function (p,size) {

        var modalInstance = $modal.open({
            templateUrl: templateUrl,
            controller: 'locationEditCtrl',
            size: size,
            resolve: {
                item: function () {
                    return p;
                },
                columns: function(){
                    return $scope.columns;
                }
            }
        });

        modalInstance.result.then(function(selectedObject) {
            if(selectedObject.save == "insert"){

                delete selectedObject.save;
                selectedObject.name = $('#SelectAgent option:selected').text();
                $scope.locations.push(selectedObject);
            }
            else if(selectedObject.save == "update"){

                delete selectedObject.save;
                p.description_f = selectedObject.description_f;
                p.start_date = selectedObject.start_date;
                p.end_date = selectedObject.end_date;
                p.further_information = selectedObject.further_information;
                p.id_agent = selectedObject.id_agent;
                p.name = selectedObject.name;
                p.type_location = selectedObject.type_location;

            }
        });
    };
    
});


app.controller('locationEditCtrl', function ($rootScope, $scope, $modalInstance, item, columns, Data, jsonNumericCheck) {
    $scope.location = {};
    $scope.agents = {};
    $scope.columns = columns;
    console.log(item);

    console.log("$scope.agents : ");
    console.log($scope.agents);

    Data.get('agentsTravaux').then(function(data){
        $scope.agents = jsonNumericCheck.d(data.data);

        if(!angular.isDefined(item)){
            $scope.location = {
                id_agent : parseInt($scope.agents[0].id_agent)
            };
        }
    });

    $scope.location = angular.copy(item);

    $scope.cancel = function () {
        $modalInstance.dismiss('Close');
    };
    $scope.title        = (angular.isDefined(item)) ? 'Editer'        : 'Ajouter';
    $scope.buttonText   = (angular.isDefined(item)) ? 'Mise à jour'   : 'Ajouter nouveau';

    var original = item;
    $scope.isClean = function() {
        return angular.equals(original, $scope.location);
    }
    $scope.saveLocation = function (location) {

        location.uid = $scope.uid;
        delete location.name;
        location.id_service = $rootScope.id_service; // set Service to Location Row
        console.log(location);
        if(angular.isDefined(location.id_location)){
            Data.put('location/'+location.id_location, location).then(function (result) {
                if(result.status != 'error'){
                    location.save = 'update';
                    location.name = $('#SelectAgent option:selected').text();
                    $modalInstance.close(location);
                }else{
                    console.log(result);
                }
            });
        }else{
            Data.post('location', location).then(function (result) {
                if(result.status != 'error'){
                    location.save = 'insert';
                    location.id_location = result.data;
                    $modalInstance.close(location);
                }else{
                    console.log(result);
                }
            });
        }
    };

    $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {

        $("#SelectAgent").selectpicker();

        $("#SelectAgent").selectpicker('val', item.id_agent);

        //if(angular.isDefined(location.id_location)){
        //    $('#SelectAgent').selectpicker('val',location.id_agent);
        //}
        $("#SelectAgent").selectpicker('refresh');
    });

});
