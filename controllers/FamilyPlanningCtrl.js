/**
 * Created by kelvin on 11/26/15.
 */

angular.module("hmisPortal")
    .config(function($httpProvider) {

    })
    .controller("FamilyPlanningCtrl",function ($rootScope,$scope,$http,portalService) {
       var url = "https://dhis.moh.go.tz/api/analytics.json?dimension=dx:GGpsoh0DX6T;IFxhP0O4k0W;JMmqv0tyVr7;Nt8M08bJKXl;OQpasUg1Tse;btKkJROB2gP;epPM7fO8CnH;mlfh4fgiFhd;pqpVKzE951Y&dimension=ou:LEVEL-2;m0frOspS7JY&dimension=pe:201501;201502;201503;201504;201505;201506;201507;201508;201509;201510;201511;201512;2015Q1;2015Q2;2015Q3;2015Q4&displayProperty=NAME";
       var geoZonesUrl = "https://dhis.moh.go.tz/api/organisationUnitGroupSets/eVyUn5tE93t.json?fields=id,name,organisationUnitGroups[id,name,organisationUnits[id,name]]";


        $scope.geographicalZones = {"id":"eVyUn5tE93t","name":"FP Geographical Zones","organisationUnitGroups":[{"id":"kcE3vG4Eq3Q","name":"Southern Highlands Zone","organisationUnits":[{"id":"sWOWPBvwNY2","name":"Iringa Region"},{"id":"DWSo42hunXH","name":"Katavi Region"},{"id":"A3b5mw8DJYC","name":"Mbeya Region"},{"id":"vAtZ8a924Lx","name":"Rukwa Region"},{"id":"qarQhOt2OEh","name":"Njombe Region"}]},{"id":"nvKJnetaMxk","name":"Northern Zone","organisationUnits":[{"id":"YtVMnut7Foe","name":"Arusha Region"},{"id":"vU0Qt1A5IDz","name":"Tanga Region"}]},{"id":"zITJeBfrJ4J","name":"Western Zone","organisationUnits":[{"id":"RD96nI1JXVV","name":"Kigoma Region"},{"id":"kZ6RlMnt2bp","name":"Tabora Region"}]},{"id":"RRGOg1GyLsd","name":"Lake Zone","organisationUnits":[{"id":"lnOyHhoLzre","name":"Kilimanjaro Region"},{"id":"MAL4cfZoFhJ","name":"Geita Region"},{"id":"Crkg9BoUo5w","name":"Kagera Region"},{"id":"IgTAEKMqKRe","name":"Simiyu Region"},{"id":"EO3Ps3ny0Nr","name":"Shinyanga Region"},{"id":"vYT08q7Wo33","name":"Mara Region"},{"id":"hAFRrgDK0fy","name":"Mwanza Region"}]},{"id":"hiqGDmNAFJz","name":"Southern Zone","organisationUnits":[{"id":"VMgrQWSVIYn","name":"Lindi Region"},{"id":"bN5q5k5DgLA","name":"Mtwara Region"}]},{"id":"gb4r7CSrT7U","name":"Eastern Zone","organisationUnits":[{"id":"acZHYslyJLt","name":"Dar Es Salaam Region"},{"id":"yyW17iCz9As","name":"Pwani Region"},{"id":"Sj50oz9EHvD","name":"Morogoro Region"}]},{"id":"gzWRK9qFFVp","name":"Central Zone","organisationUnits":[{"id":"Cpd5l15XxwA","name":"Dodoma Region"},{"id":"LGTVRhKSn1V","name":"Singida Region"},{"id":"qg5ySBw9X5l","name":"Manyara Region"}]}]}




        $scope.data.chartType = 'column';
        $scope.displayTable = false;
        $scope.changeChart = function(type,card){
            card.displayTable = false;

            $scope.showReport = true;
            if(type == 'table'){
                card.displayTable = true;
                card.displayMap = false;
                card.chart = 'table';
                $scope.data.chartType = 'table';
            }else if(type == 'map'){
                card.displayMap = true;
                card.displayTable = false;
                card.chart = 'map';
                $scope.data.chartType = 'map';
            }
            else{
                card.displayMap = false;
                card.displayTable = false;
                card.chart = type;
                $scope.data.chartType = type;
            }
            $scope.prepareSeries(card,$scope.data.chartType);
        };

        $scope.downloadExcel = function(id){
            var base = "https://dhis.moh.go.tz/";
            $.post( base + "dhis-web-commons-security/login.action?authOnly=true", {
                j_username: "portal", j_password: "Portal123"
            },function(){
                var url = "";
                if($scope.selectedOrgUnit == "m0frOspS7JY"){
                    url = "https://dhis.moh.go.tz/api/analytics.csv?dimension=dx:"+id+"&dimension=pe:"+$scope.selectedPeriod+"&dimension=ou:LEVEL-1;LEVEL-2;"+$scope.selectedOrgUnit+"&displayProperty=NAME&tableLayout=true&columns=dx&rows=pe;ou";
                }else{

                    url = "https://dhis.moh.go.tz/api/analytics.csv?dimension=dx:"+id+"&dimension=pe:"+$scope.selectedPeriod+"&dimension=ou:LEVEL-2;LEVEL-3;"+$scope.selectedOrgUnit+"&displayProperty=NAME&tableLayout=true&columns=dx&rows=pe;ou";
                }
                $http.get(url,{'Content-Type': 'application/csv;charset=UTF-8'}).success(function(data){
                    var a = document.createElement('a');
                    var blob = new Blob([data]);
                    a.href = window.URL.createObjectURL(blob);
                    a.download = "data.xls";
                    a.click();
                });
            });
        };

        $scope.FPmethods = [
            {'name':'Male Condoms','uid':'JMmqv0tyVr7'},
            {'name':'Female Condoms','uid':'Nt8M08bJKXl'},
            {'name':'Oral Pills','uid':'IFxhP0O4k0W'},
            {'name':'Injectables','uid':'epPM7fO8CnH'},
            {'name':'Implants','uid':'pqpVKzE951Y'},
            {'name':'IUCDs','uid':'OQpasUg1Tse'},
            {'name':'NSV','uid':'btKkJROB2gP'},
            {'name':'Min Lap','uid':'mlfh4fgiFhd'},
            {'name':'Natural FP','uid':'GGpsoh0DX6T'}
        ]

        $scope.fpCards = [
            {
                title:'Total Clients of [IMPLANTS]',
                description:'OPD STI Genital Ulcer Diseases',
                cardClass:"col s12 m12",
                data:'ZnTi99UdGCS;lMFKZN3UaYp',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)

            },{
                title:'Total Clients',
                description:'OPD STI Genital Ulcer Diseases',
                cardClass:"col s12 m6",
                data:'grtxKHUL0dh',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)

            },{
                title:'Total Clients',
                description:'OPD STI Genital Ulcer Diseases',
                cardClass:"col s12 m6",
                data:'grtxKHUL0dh',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)

            }];

        $scope.prepareSeries = function(cardObject,chart){
            cardObject.chartObject.loading = true;
            var base = "https://dhis.moh.go.tz/";
            $.post( base + "dhis-web-commons-security/login.action?authOnly=true", {
                j_username: "portal", j_password: "Portal123"
            },function(){
                if(chart == 'table'){
                    cardObject.displayTable = true;
                    cardObject.displayMap = false;
                }else if(chart == 'map'){
                    cardObject.displayMap = true;
                    cardObject.displayTable = false;
                }
                else{
                    cardObject.displayMap = false;
                    cardObject.displayTable = false;
                }
                cardObject.chartObject.title.text = cardObject.title;
                cardObject.chartObject.yAxis.title.text = cardObject.title.toLowerCase();

                var period = preparePeriod();
                if($scope.selectedOrgUnit == "m0frOspS7JY"){
                    $scope.url = "https://dhis.moh.go.tz/api/analytics.json?dimension=dx:"+cardObject.data+"&dimension=ou:LEVEL-1;LEVEL-2;m0frOspS7JY&filter=pe:"+$scope.selectedPeriod+"&displayProperty=NAME";
                }else{
                    $scope.url = "https://dhis.moh.go.tz/api/analytics.json?dimension=dx:"+cardObject.data+"&dimension=ou:LEVEL-2;LEVEL-3;"+$scope.selectedOrgUnit+"&filter=pe:"+$scope.selectedPeriod+"&displayProperty=NAME";
                }
                cardObject.chartObject.loading = true;
                $http.get($scope.url).success(function(data){
                    $scope.area = [];
                    cardObject.chartObject.xAxis.categories = [];
                    //
                    var dataToUse = $scope.prepareData(data);
                    //
                    angular.forEach(dataToUse,function(val){
                        cardObject.chartObject.xAxis.categories.push(val.name);
                    });
                    $scope.normalseries = [];
                    if(chart == "pie"){
                        delete cardObject.chartObject.chart;
                        var serie = [];
                        angular.forEach(dataToUse,function(val){
                            serie.push({name: val.name, y: parseInt(val.value)})
                        });
                        $scope.normalseries.push({type: chart, name:cardObject.title , data: serie,showInLegend: true,
                            dataLabels: {
                                enabled: false
                            } });
                        cardObject.chartObject.series = $scope.normalseries;
                    }
                    else if(chart == "combined"){
                        delete cardObject.chartObject.chart;
                        var serie1 = [];
                        var serie = [];

                        angular.forEach(dataToUse,function(val){
                            serie.push(parseInt(val.value));
                            serie1.push({name: val.name , y: parseInt(val.value) })
                        });
                        $scope.normalseries.push({type: 'column', name: cardObject.title, data: serie});
                        $scope.normalseries.push({type: 'spline', name: cardObject.title, data: serie});
                        $scope.normalseries.push({type: 'pie', name: cardObject.title, data: serie1,center: [100, 80],size: 150,showInLegend: false,
                            dataLabels: {
                                enabled: false
                            }})
                        cardObject.chartObject.series = $scope.normalseries;
                    }
                    else if(chart == 'table'){
                        cardObject.table = {};
                        cardObject.table.colums =[];
                        angular.forEach(dataToUse,function(val){
                            cardObject.table.colums.push({name:val.name,value:parseInt(val.value)});
                        });
                    }
                    else if(chart == 'map'){
                        if($scope.selectedOrgUnit == "m0frOspS7JY"){
                            $scope.drawMap($scope.selectedOrgUnit,2,cardObject);
                        }else{
                            $scope.drawMap($scope.selectedOrgUnit,3,cardObject);
                        }
                    }
                    else{
                        delete cardObject.chartObject.chart;
                        var serie = [];
                        angular.forEach(dataToUse,function(val){
                            serie.push(val.value);
                        });
                        cardObject.chartObject.chart={};
                        cardObject.chartObject.chart.type=chart;
                        $scope.normalseries.push({type: chart, name: cardObject.title, data: serie})
                        cardObject.chartObject.series = $scope.normalseries;
                    }
                    cardObject.chartObject.loading = false
                });
            });

        };

        $scope.prepareData = function(jsonObject){
            var data = [];
            data.push({'name':jsonObject.metaData.names[$rootScope.selectedOrgUnit],'id':$rootScope.selectedOrgUnit,'value':getDataFromUrl(jsonObject.rows,$rootScope.selectedOrgUnit)});

            angular.forEach(jsonObject.metaData.ou,function(region){
                if(region != $rootScope.selectedOrgUnit ){
                    data.push({'name':jsonObject.metaData.names[region],'id':region,'value':getDataFromUrl(jsonObject.rows,region)});
                }
            });
            return data;

        };

        $scope.prepareCategory = function(type){
            if(type == 'zones'){
                angular.forEach($scope.geographicalZones,function(region){
                   var names= "";
                    angular.forEach(region.organisationUnits,function(value){
                      name += value.id;
                    })
                });
            }
        }

        $rootScope.firstClick = function(){
            angular.forEach($scope.fpCards,function(value){
//              $scope.data.chartType = value.chart;
                $scope.prepareSeries(value,value.chart);
            });
        }
        $scope.firstClick();
    });

    function preparePeriod(){
        return "2014Q1;2014Q2;2014Q3;2014Q4";
    }



