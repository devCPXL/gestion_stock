/**
 * Created by lakroubassi.n on 26/10/2016.
 */

app.controller('adminPanelCtrl', function ($scope,$rootScope, $location, $route, Data, $http, $timeout) {
    console.log('adminPanelCtrl');

    $scope.agent = {};
    $scope.disabled = undefined;
    $scope.searchEnabled = undefined;
    $scope.searchRes = [];
    $scope.urlDataSelected = [];
    $scope.urlExtraSettings = {
        displayProp: 'link_url',
        idProp: 'id_url',
        externalIdProp: 'id_url',
        scrollable: true
    };
    $scope.urlTranslationTexts = {
        checkAll : 'sélectionner tout',
        uncheckAll : 'désélectionner tout',
        selectionCount : 'sélectionnée',
        searchPlaceholder : 'Chercher...',
        buttonDefaultText : 'sélectionner',
        dynamicButtonTextSuffix : 'sélectionnée'
    }

    $scope.searchAgents = function($select) {
        return $http.get('http://10.102.97.208/gestion_stock/api/v1/agents/'+$select.search).then(function(response){
            //console.log(response);
            $scope.searchRes = response.data;
        });
    };

    Data.get('url').then(function(data){
        $scope.urlData = data.data;
    });

    $scope.changeAgent = function(agent){
        console.log(agent);
        Data.get('urlUser/'+agent.id_agent).then(function(data){
            var urlDataOrigin = data.data;
            $scope.urlDataSelected = data.data;
        });
    };






});
