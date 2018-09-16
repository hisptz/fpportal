/**
 * Created by kelvin on 1/9/16.
 */
angular.module('hmisPortal')
    .config(function($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    })
    .controller('indicatorsCtrl',function ($rootScope,$window,$scope,$http,$q,$location,$timeout,$resource,olData,olHelpers,shared,portalService,chartsManager) {
        //displaying loading during page change
        $rootScope.$on("$routeChangeStart",
            function (event, current, previous, rejection) {
                $rootScope.online = navigator.onLine;
                $window.addEventListener("offline", function () {
                    $rootScope.$apply(function() {
                        $rootScope.online = false;
                        $rootScope.status = "Offline";
                    });
                }, false);
                $window.addEventListener("online", function () {
                    $timeout(function(){
                    $rootScope.$apply(function() {
                            $rootScope.online = true;
                            $rootScope.status = "Online";

                    });
                    },2000);
                }, false);
                $rootScope.showLoader = true;
            });
        $rootScope.$on("$routeChangeSuccess",
            function (event, current, previous, rejection) {
                $rootScope.online = navigator.onLine;
                $window.addEventListener("offline", function () {
                    $rootScope.$apply(function() {
                        $rootScope.online = false;
                    });
                }, false);
                $window.addEventListener("online", function () {
                    $rootScope.$apply(function() {
                        $rootScope.online = true;
                    });
                }, false);
                $rootScope.showLoader = false
            });

        //$scope.checkbox="false";

        //find the section where the user is now
        $scope.getCurrentSection = function(){
            var location = $location.path();
            location = location.slice(1);
            var name = "";
            if(location == "malaria"){ name = "Malaria Indicators(RCH & HMIS Indicators)"; }
            if(location == "ivd"){ name = "IVD Indicators(Program Indicators)"; }
            if(location == "nutrition"){ name = "Nutrition Indicators(Program Indicators)"; }
            if(location == "hivaids"){ name = "HIV AIDS Indicators(Program Indicators)"; }
            if(location == "tracer_medicine"){ name = "Trace Medicine Indicators(Program Indicators)"; }
            if(location == "tb"){ name = "TB Indicators(Program Indicators)"; }
            if(location == "mortalities"){ name = "Mortalities Indicators"; }
            if(location == "antenatalCare"){ name = "Antenatal Care Indicators(RCH & HMIS Indicators)"; }
            if(location == "ancIntegration"){ name = "ANC Integration Indicators(RCH & HMIS Indicators)"; }
            if(location == "laborDelivery"){ name = "Labour and Delivery Indicators(RCH & HMIS Indicators)"; }
            if(location == "newbornCare"){ name = "Newborn Care Indicators(RCH & HMIS Indicators)"; }
            if(location == "postnatalCare"){ name = "Postnatal Care Indicators(RCH & HMIS Indicators)"; }
            if(location == "gbvVac"){ name = "GBV & VAC Indicators(RCH & HMIS Indicators)"; }
            if(location == "cervicalCancer"){ name = "Cervical Cancer Indicators(RCH & HMIS Indicators)"; }
            if(location == "noncommunicabledisease"){ name = "Non Communicable Disease Indicators(Program Indicators)"; }
            if(location == "pmtct"){ name = "PMTCT(HIV AIDS Indicators(Program Indicators))"; }
            if(location == "art"){ name = "ART(HIV AIDS Indicators(Program Indicators))"; }
            if(location == "hbc"){ name = "HBC(HIV AIDS Indicators(Program Indicators))"; }
            if(location == "pediatrichiv"){ name = "PEDIATRIC HIV(HIV AIDS Indicators(Program Indicators))"; }
            if(location == "tbandhiv"){ name = "TB & HIV(HIV AIDS Indicators(Program Indicators))"; }
            if(location == "vmcc"){ name = "VMCC(HIV AIDS Indicators(Program Indicators))"; }
            if(location == "sti"){ name = "STI(HIV AIDS Indicators(Program Indicators))"; }

            return name;
        };

        //find the section where the user is now



        $rootScope.periodType = 'years';
        portalService.orgUnitId = $rootScope.selectedOrgUnit;
        portalService.parent=$scope.checkbox;
        portalService.period = $rootScope.selectedPeriod;
        $scope.selectedOrgUnitLevel = "2";
        //getting indicators for specified card
        $scope.getSpecifiedIndicators = function (name) {
            var deferred = $q.defer();
            $http.get('indicators/' + name + '.json')
                .success(function (indicatorData) {
                    angular.forEach(indicatorData, function (value) {
                        /**
                         *displayTable,displayTable default to false define them only if you want different value
                         *chart default to bar, define it if you want the value to be otherwise
                         */
                        value.icons = angular.copy(portalService.icons1);
                        value.chartObject = angular.copy(portalService.chartObject);
                        (value.hasOwnProperty('displayTable')) ? value.displayTable = value.displayTable : value.displayTable = false;
                        (value.hasOwnProperty('displayMap')) ? value.displayMap = value.displayMap : value.displayMap = false;
                        (value.hasOwnProperty('chart')) ? value.chart = value.chart : value.chart = "bar";
                    });
                    deferred.resolve(indicatorData);
                })
                .error(function (errorMessageData) {
                    deferred.reject();
                });
            return deferred.promise;
        };

        //defining cards
        $scope.cards = {};
        //selected indicator cards..to change card definitions we can use file at indicators/[urlPath].json
        //prepare dataelements and indicators for sending on analytics
        $scope.prepareDataElements = function (cardsObjects) {
            var dataElements = [];
            angular.forEach(cardsObjects, function (cardsObject) {
                if (dataElements.indexOf(cardsObject.data) == -1) {
                    dataElements.push(cardsObject.data);
                }
            });
            return dataElements.join(";");
        };
        $scope.checkbox=false;
        $scope.updateParent=function(card,value){
            card.chartObject.loading = true;

            //setting orgunit and period for service to use
            portalService.orgUnitId = $rootScope.selectedOrgUnit;
            portalService.parent=value;
            portalService.period = $rootScope.selectedPeriod;
            var url='';
            if(value==true){
                if (portalService.orgUnitId == "m0frOspS7JY") {
                    url = portalService.base+"api/analytics.json?dimension=dx:"+card.data+"&dimension=ou:LEVEL-1;LEVEL-2;m0frOspS7JY&dimension=pe:"+portalService.period+"&displayProperty=NAME";
                } else {
                    url = portalService.base+"api/analytics.json?dimension=dx:"+card.data+"&dimension=ou:LEVEL-2;LEVEL-3;"+portalService.orgUnitId+"&dimension=pe:"+portalService.period+"&displayProperty=NAME";
                }
            }else{
                if (portalService.orgUnitId == "m0frOspS7JY") {
                    url = portalService.base+"api/analytics.json?dimension=dx:"+card.data+"&dimension=ou:LEVEL-2;m0frOspS7JY&dimension=pe:"+portalService.period+"&displayProperty=NAME";
                } else {
                    url = portalService.base+"api/analytics.json?dimension=dx:"+card.data+"&dimension=ou:LEVEL-3;"+portalService.orgUnitId+"&dimension=pe:"+portalService.period+"&displayProperty=NAME";
                }
            }
            $http.get(url).success(function (objectData) {
                card.displayTable = false;
                $scope.showReport = true;
                card.displayColumn = false;
                 if (card.chart == 'table') {
                    card.displayTable = true;
                    card.displayMap = false;
                    card.chart = 'table';
                    card.table = chartsManager.drawChart(objectData, 'dx',[card.data] ,'ou',[] , 'pe', portalService.period, card.title, card.chart);

                    //hiding loading message
                    card.chartObject.loading = false;
                } else if (card.chart == 'map') {
                    card.displayMap = true;
                    card.displayTable = false;
                    card.chart = 'map';
                    var dataToUse = portalService.prepareData(objectData,card.data);
                    if ($rootScope.selectedOrgUnit == "m0frOspS7JY") {
                        portalService.drawMap(portalService.base, portalService.orgUnitId, 2, card, card.title, dataToUse);
                    } else {
                        portalService.drawMap(portalService.base, portalService.orgUnitId, 3, card, card.title, dataToUse);
                    }
                    card.chartObject.loading = false;
                }
                else if(card.chart == 'spider'){
                    card.displayColumn = true;
                    card.displayMap = false;
                    card.displayTable = false;
                    card.chartObject = chartsManager.drawChart(objectData, 'ou', [], 'dx', [card.data], 'pe', portalService.period, card.title, "spider");
                    $(function() {
                        $("#"+card.data).highcharts(card.chartObject);
                        $("#c"+card.data).highcharts(card.chartObject);
                    });

                } else if(card.chart == 'column'){
                    card.displayColumn = true;
                    card.displayMap = false;
                    card.displayTable = false;
                    card.chartObject = chartsManager.drawChart(objectData, 'ou', [], 'dx', [card.data], 'pe', portalService.period, card.title, "column");
                    $(function() {
                        $("#"+card.data).highcharts(card.chartObject);
                        $("#c"+card.data).highcharts(card.chartObject);
                    });

                }
                else {
                    card.displayMap = false;
                    card.displayTable = false;
                    card.chart = "bar";
                    card.chartObject = chartsManager.drawChart(objectData, 'ou', [], 'dx', [card.data], 'pe', portalService.period, card.title, card.chart);


                }
              });
        }

        $scope.changeChart = function (type, card) {
             //displaying loading message
            card.chartObject.loading = true;
             //setting orgunit and period for service to use
             if($scope.checkbox){
              }
            portalService.orgUnitId = $rootScope.selectedOrgUnit;
            portalService.parent=$scope.checkbox;
            portalService.period = $rootScope.selectedPeriod;
            card.displayTable = false;
            $scope.showReport = true;
            card.displayColumn = false;
             if (type == 'table') {
                card.displayTable = true;
                card.displayMap = false;
                card.chart = 'table';
                card.table = chartsManager.drawChart($scope.analyticsObject, 'ou', [], 'dx', [card.data], 'pe', $rootScope.selectedPeriod, card.title, card.chart);

                //hiding loading message
                card.chartObject.loading = false;
            } else if (type == 'map') {
                card.displayMap = true;
                card.displayTable = false;
                card.chart = 'map';
                var dataToUse = portalService.prepareData($scope.analyticsObject,card.data);
                if ($rootScope.selectedOrgUnit == "m0frOspS7JY") {
                    portalService.drawMap(portalService.base, portalService.orgUnitId, 2, card, card.title, dataToUse);
                } else {
                    portalService.drawMap(portalService.base, portalService.orgUnitId, 3, card, card.title, dataToUse);
                }
                card.chartObject.loading = false;
            }
            else if(type == 'spider'){
                card.displayColumn = true;
                card.displayMap = false;
                card.displayTable = false;
                card.chartObject = chartsManager.drawChart($scope.analyticsObject, 'ou', [], 'dx', [card.data], 'pe', $rootScope.selectedPeriod, card.title, "spider");
                $(function() {
                    $("#"+card.data).highcharts(card.chartObject);
                    $("#c"+card.data).highcharts(card.chartObject);
                });

            } else if(type == 'column'){
                card.displayColumn = true;
                card.displayMap = false;
                card.displayTable = false;
                card.chartObject = chartsManager.drawChart($scope.analyticsObject, 'ou', [], 'dx', [card.data], 'pe', $rootScope.selectedPeriod, card.title, "column");
                $(function() {
                    $("#"+card.data).highcharts(card.chartObject);
                    $("#c"+card.data).highcharts(card.chartObject);
                });

            }
            else {
                card.displayMap = false;
                card.displayTable = false;
                card.chart = type;
                card.chartObject = chartsManager.drawChart($scope.analyticsObject, 'ou', [], 'dx', [card.data], 'pe', $rootScope.selectedPeriod, card.title, card.chart);


            }

        };

        //prepare data for use in csv
        $scope.prepareDataForCSV = function(card){
            var chartObject = chartsManager.drawChart($scope.analyticsObject, 'ou', [], 'dx', [card.data], 'pe', $rootScope.selectedPeriod, card.title, 'bar');
            var items = [];
            angular.forEach(chartObject.xAxis.categories,function(value){
                var obj = {name:value};
                var i = 0;
                angular.forEach(chartObject.series,function(val){
                    obj[val.name] = val.data[i];
                    i++;
                })
                items.push(obj);
            })
             return items;
        };

        $scope.getPeriodName = function (period) {
            if (period.length == 4) {
                return period;
            } else if (period.length == 6) {
                var year = period.substring(0, 4);
                var quater = period.substring(4, 6);
                var names = "";
                if (quater == "Q4") {
                    names = "Oct - Dec " + year;
                } else if (quater == "Q3") {
                    names = "July - Sept " + year;
                } else if (quater == "Q2") {
                    names = "Apr - Jun " + year;
                } else if (quater == "Q1") {
                    names = "Jan - Mar " + year;
                }
                return names;
            }
        };

        $scope.getOrgUnitName = function (uid) {
            var orgUnits = [{"id": "YtVMnut7Foe", "name": "Arusha Region"}, {
                "id": "acZHYslyJLt",
                "name": "Dar Es Salaam Region"
            }, {"id": "Cpd5l15XxwA", "name": "Dodoma Region"}, {
                "id": "MAL4cfZoFhJ",
                "name": "Geita Region"
            }, {"id": "sWOWPBvwNY2", "name": "Iringa Region"}, {
                "id": "Crkg9BoUo5w",
                "name": "Kagera Region"
            }, {"id": "DWSo42hunXH", "name": "Katavi Region"}, {
                "id": "RD96nI1JXVV",
                "name": "Kigoma Region"
            }, {"id": "lnOyHhoLzre", "name": "Kilimanjaro Region"}, {
                "id": "VMgrQWSVIYn",
                "name": "Lindi Region"
            }, {"id": "qg5ySBw9X5l", "name": "Manyara Region"}, {
                "id": "vYT08q7Wo33",
                "name": "Mara Region"
            }, {"id": "A3b5mw8DJYC", "name": "Mbeya Region"}, {
                "id": "Sj50oz9EHvD",
                "name": "Morogoro Region"
            }, {"id": "bN5q5k5DgLA", "name": "Mtwara Region"}, {
                "id": "hAFRrgDK0fy",
                "name": "Mwanza Region"
            }, {"id": "qarQhOt2OEh", "name": "Njombe Region"}, {
                "id": "yyW17iCz9As",
                "name": "Pwani Region"
            }, {"id": "vAtZ8a924Lx", "name": "Rukwa Region"}, {
                "id": "ZYYX8Q9SGoV",
                "name": "Ruvuma Region"
            }, {"id": "EO3Ps3ny0Nr", "name": "Shinyanga Region"}, {
                "id": "IgTAEKMqKRe",
                "name": "Simiyu Region"
            }, {"id": "LGTVRhKSn1V", "name": "Singida Region"}, {
                "id": "kZ6RlMnt2bp",
                "name": "Tabora Region"
            }, {"id": "vU0Qt1A5IDz", "name": "Tanga Region"}];
            var name = "";
            if (uid === 'm0frOspS7JY') {
                name = "MOH - Tanzania"
            } else {
                angular.forEach(orgUnits, function (value) {

                    if (uid === value.id) {
                        name = value.name;
                    }
                })
            }
            return name;
        };

        $scope.downloadExcel = function (id) {
            portalService.downloadExcel(id);
        };

        $rootScope.firstClick = function () {
            portalService.orgUnitId = $rootScope.selectedOrgUnit;
            portalService.parent=$scope.checkbox;
            portalService.period = $rootScope.selectedPeriod;
            var location = $location.path();
            location = location.slice(1);
            $rootScope.progressMessage = " getting " + location + " indicators ...";
            $rootScope.showProgressMessage = true;
            $scope.year = "2014";
            $scope.getSpecifiedIndicators(location)
                .then(function (data) {

                    $rootScope.progressMessage = " authenticating portal...";
                    $scope.cards.data = data;
                    var dataElements = $scope.prepareDataElements(data);
                    var base = portalService.base;
                    $.post( base + "dhis-web-commons-security/login.action?authOnly=true", {
                       j_username: "portal", j_password: "Portal123"
                    },function(){
                        $rootScope.progressMessage = " getting " + location + " data ...";
                        portalService.getAnalyticsObject(dataElements,portalService.period,portalService.orgUnitId,portalService.parent).then(function(analyticsObject){
                            $scope.analyticsObject = analyticsObject;
                            $rootScope.showProgressMessage = false;
                            angular.forEach(data, function (value) {
                               var indicatorApi=
                                   $resource(portalService.base+"api/indicators/"+value.data+".json?fields=id,name,numeratorDescription,denominatorDescription,denominator,numerator,indicatorType[id,name],dataSets[id,name,periodType]");
                               var indicatorResult=indicatorApi.get(function(indicatorObject){
                                   value.indicatorType=indicatorObject;
                                   var expApi=
                                       $resource(portalService.base+'api/expressions/description',{get:{method:"JSONP"}});
                                   var numeratorExp=expApi.get({expression:indicatorObject.numerator},function(numeratorText){
                                       value.numerator=numeratorText.description;
                                   });
                                   var denominator=expApi.get({expression:indicatorObject.denominator},function(denominatorText){
                                       value.denominator=denominatorText.description;
                                   });
                               });
                               $scope.changeChart(value.chart, value)
                               });
                        }, function (response) { // optional
                           $rootScope.progressMessage = "!Problem has Occurred, system failed getting " + location + " data !";
                           $timeout(function () {
                               $rootScope.showProgressMessage = false;

                           }, 10000);
                        });
                      });

                   });

        };

        $rootScope.firstClick();

    });
function getTotalDataFromUrl(arr,de,ou){
    var num = 0;
    $.each(arr,function(k,v){
        if(v[1] == ou && v[0]==de){
            num = Number(v[2])
        }
    });
    return num;
}
