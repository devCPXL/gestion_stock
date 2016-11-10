/**
 * Created by lakroubassi.n on 26/10/2016.
 */

app.controller('adminPanelCtrl', function ($scope, $rootScope, $location, $route, Data, $http, toaster) {
    console.log('adminPanelCtrl');
    console.log(document.URL)

    var urlDataOrigin = {};
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

    Data.get('url').then(function(data){
        $scope.urlData = data.data;
    });

    $scope.searchAgents = function($select) {
        var adsUrl = $location.absUrl().split('#')[0];
        console.log(adsUrl);
        return $http.get(adsUrl+'api/v1/agents/'+$select.search).then(function(response){
            //console.log(response);
            $scope.searchRes = response.data;
        });
    };

    $scope.changeAgent = function(agent){
        console.log(agent);
        Data.get('urlUser/'+agent.id_agent).then(function(data){
            urlDataOrigin = angular.copy(data.data); // fix copy by reference
            $scope.urlDataSelected = data.data;
        });
    };

    $scope.saveUrlUser = function(){

        var dataUrl = {
            urlDataOrigin: urlDataOrigin,
            urlDataSelected: $scope.urlDataSelected
        };

        Data.put('urlUser/'+$scope.agent.selected.id_agent, dataUrl).then(function(data){
            console.log(data);
            urlDataOrigin = [];
            $scope.urlDataSelected = [];
            $scope.agent = {};

            toaster.pop('success', "succés", '<ul><li>mise a jour effectué avec succés</li></ul>', 5000, 'trustedHtml');
        });
    };

    $scope.reset = function(){
        $scope.urlDataSelected = [];
        $scope.agent = {};
        urlDataOrigin = [];
    };



});
