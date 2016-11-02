var ComponentsDropdowns = function () {

    var handleSelect2 = function () {

       function format(state) {
            if (!state.id) return state.text; // optgroup
            return "<img class='flag' src='" + Metronic.getGlobalImgPath() + "flags/" + state.id.toLowerCase() + ".png'/>&nbsp;&nbsp;" + state.text;
        }

        function movieFormatResult(agent) {
            var markup = "<table class='movie-result'><tr>";
            markup += "<td valign='top'><h5>" + agent.nom +" - "+ agent.prenom + "</h5>";
            markup += "</td></tr></table>"
            return markup;
        }

        function movieFormatSelection(agent) {
            return agent.nom+" - "+agent.prenom;
        }

        var searchTerm = null;
        // Remote data example
        var remoteDataConfig = {
            width: '30em',
            locale: 'fr',
            placeholder: "Chercher agent...",
            minimumInputLength: 5,
            ajax: {
                url: 'http://10.102.97.208/gestion_stock/api/v1/agents',
                type: "POST",
                dataType: 'json',
                data: function (term) {
                    return term;
                },
                results: function (data) { // parse the results into the format expected by Select2.
                    // since we are using custom formatting functions we do not need to alter remote JSON data
                    return {
                        results: data
                    };
                }
            },
            formatResult: function (agent) {
                return agent.nom+" - "+agent.prenom;
            },
            formatSelection: function (agent) {
                return agent.nom+" - "+agent.prenom;
            },
            id: function(agent) {
                return agent;
            }
        };

        $("#remoteDataAgents").select2(remoteDataConfig);


    }

    var handleSelect2Modal = function () {


    }

    var handleBootstrapSelect = function() {

    }

    var handleMultiSelect = function () {

    }

    return {
        //main function to initiate the module
        init: function () {
            handleSelect2();
        }
    };

}();