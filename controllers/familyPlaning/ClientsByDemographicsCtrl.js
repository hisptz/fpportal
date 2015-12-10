/**
 * Created by kelvin on 12/10/15.
 */
/**
 * Created by kelvin on 11/26/15.
 */

angular.module("hmisPortal")
    .config(function($httpProvider) {

    })
    .controller("ClientsByDemographicsCtrl",function ($rootScope,$scope,$http,portalService) {
        var url = "https://dhis.moh.go.tz/api/analytics.json?dimension=dx:GGpsoh0DX6T;IFxhP0O4k0W;JMmqv0tyVr7;Nt8M08bJKXl;OQpasUg1Tse;btKkJROB2gP;epPM7fO8CnH;mlfh4fgiFhd;pqpVKzE951Y&dimension=ou:LEVEL-2;m0frOspS7JY&dimension=pe:201501;201502;201503;201504;201505;201506;201507;201508;201509;201510;201511;201512;2015Q1;2015Q2;2015Q3;2015Q4&displayProperty=NAME";
        var geoZonesUrl = "https://dhis.moh.go.tz/api/organisationUnitGroupSets/eVyUn5tE93t.json?fields=id,name,organisationUnitGroups[id,name,organisationUnits[id,name]]";


        $scope.geographicalZones = {"id":"eVyUn5tE93t","name":"FP Geographical Zones","organisationUnitGroups":[{"id":"kcE3vG4Eq3Q","name":"Southern Highlands Zone","organisationUnits":[{"id":"sWOWPBvwNY2","name":"Iringa Region"},{"id":"DWSo42hunXH","name":"Katavi Region"},{"id":"A3b5mw8DJYC","name":"Mbeya Region"},{"id":"vAtZ8a924Lx","name":"Rukwa Region"},{"id":"qarQhOt2OEh","name":"Njombe Region"}]},{"id":"nvKJnetaMxk","name":"Northern Zone","organisationUnits":[{"id":"YtVMnut7Foe","name":"Arusha Region"},{"id":"vU0Qt1A5IDz","name":"Tanga Region"}]},{"id":"zITJeBfrJ4J","name":"Western Zone","organisationUnits":[{"id":"RD96nI1JXVV","name":"Kigoma Region"},{"id":"kZ6RlMnt2bp","name":"Tabora Region"}]},{"id":"RRGOg1GyLsd","name":"Lake Zone","organisationUnits":[{"id":"lnOyHhoLzre","name":"Kilimanjaro Region"},{"id":"MAL4cfZoFhJ","name":"Geita Region"},{"id":"Crkg9BoUo5w","name":"Kagera Region"},{"id":"IgTAEKMqKRe","name":"Simiyu Region"},{"id":"EO3Ps3ny0Nr","name":"Shinyanga Region"},{"id":"vYT08q7Wo33","name":"Mara Region"},{"id":"hAFRrgDK0fy","name":"Mwanza Region"}]},{"id":"hiqGDmNAFJz","name":"Southern Zone","organisationUnits":[{"id":"VMgrQWSVIYn","name":"Lindi Region"},{"id":"bN5q5k5DgLA","name":"Mtwara Region"}]},{"id":"gb4r7CSrT7U","name":"Eastern Zone","organisationUnits":[{"id":"acZHYslyJLt","name":"Dar Es Salaam Region"},{"id":"yyW17iCz9As","name":"Pwani Region"},{"id":"Sj50oz9EHvD","name":"Morogoro Region"}]},{"id":"gzWRK9qFFVp","name":"Central Zone","organisationUnits":[{"id":"Cpd5l15XxwA","name":"Dodoma Region"},{"id":"LGTVRhKSn1V","name":"Singida Region"},{"id":"qg5ySBw9X5l","name":"Manyara Region"}]}]}

        $scope.changeMethod = function(){
            $scope.currentOrgUnit = "m0frOspS7JY";
            $('#orgunitss option[value="m0frOspS7JY"]').prop('selected', true);
            $scope.firstClick();
        }
        $scope.changeZone = function(){
            $scope.selectedMethod = "all";
            $scope.firstClick();
        }
        $scope.selectedMethod = 'all';
        $scope.selectedPeriod = '2014';
        $scope.data.chartType = 'column';
        $scope.displayTable = false;
        $scope.currentOrgUnit = "m0frOspS7JY";
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
            {'name':'client <20 Male Condoms','uid':'W74wyMy1mp0'},
            {'name':'client <20 Female Condoms','uid':'p8cgxI3yPx8'},
            {'name':'client <20 Oral Pills','uid':'aSJKs4oPZAf'},
            {'name':'client <20 Injectables','uid':'LpkdcaLc4I9'},
            {'name':'client <20 Implants','uid':'p14JdJaG2aC'},
            {'name':'client <20 IUCDs','uid':'GvbkEo6sfSd'},
            {'name':'client <20 Natural FP','uid':'QRCRjFreECE'},
            {'name':'Eastern Zone','uid':'gb4r7CSrT7U'},
            {'name':'Lake Zone','uid':'RRGOg1GyLsd'},
            {'name':'Northern Zone','uid':'nvKJnetaMxk'},
            {'name':'Southern Highlands Zone','uid':'kcE3vG4Eq3Q'},
            {'name':'Southern Zone','uid':'hiqGDmNAFJz'},
            {'name':'Western Zone','uid':'zITJeBfrJ4J'},
            {'name':'Central Zone','uid':'gzWRK9qFFVp'},
            {'name':'MOH Tanzania','uid':'m0frOspS7JY'}
        ]

        $scope.fpCards = [{
                title:'Clients < 20 Years of Age Quarterly',
                description:'Total Clients Quarterly',
                cardClass:"col s12 m6",
                data:'W74wyMy1mp0;p8cgxI3yPx8;aSJKs4oPZAf;LpkdcaLc4I9;p14JdJaG2aC;GvbkEo6sfSd;QRCRjFreECE',
                category:'quarter',
                category1:'quarter',
                icons:angular.copy(portalService.minimalIcons),
                displayTable:false,
                displayMap:false,
                chart:'line',
                visible:'consumption by demographic',
                chartObject:angular.copy(portalService.chartObject)

            },{
                title:'Clients < 20 Years of Age Monthly',
                description:'Total Clients Monthly',
                cardClass:"col s12 m6",
                data:'W74wyMy1mp0;p8cgxI3yPx8;aSJKs4oPZAf;LpkdcaLc4I9;p14JdJaG2aC;GvbkEo6sfSd;QRCRjFreECE',
                category:'month',
                category1:'month',
                icons:angular.copy(portalService.minimalIcons),
                displayTable:false,
                displayMap:false,
                chart:'line',
                visible:'consumption by demographic',
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

            var peri = preparePeriod($scope.selectedPeriod);
            $scope.url = "https://dhis.moh.go.tz/api/analytics.json?dimension=dx:W74wyMy1mp0;p8cgxI3yPx8;aSJKs4oPZAf;LpkdcaLc4I9;p14JdJaG2aC;GvbkEo6sfSd;QRCRjFreECE&dimension=ou:LEVEL-2;m0frOspS7JY&dimension=pe:201501;201502;201503;201504;201505;201506;201507;201508;201509;201510;201511;201512;2015Q1;2015Q2;2015Q3;2015Q4&displayProperty=NAME";
            var area = [];
            cardObject.chartObject.loading = true;
            var datass = '';

            if($scope.currentOrgUnit == "m0frOspS7JY"){
                if(cardObject.category1 == 'zones'){
                    cardObject.data = 'jvwTTzpWBD0';
                    cardObject.category = 'zones';
                }
            }else{
                if(cardObject.category1 == 'zones'){
                    cardObject.category = 'methods';
                    cardObject.data = $scope.currentOrgUnit;
//                    cardObject.data = 'JMmqv0tyVr7;Nt8M08bJKXl;IFxhP0O4k0W;epPM7fO8CnH;pqpVKzE951Y;OQpasUg1Tse;btKkJROB2gP;mlfh4fgiFhd;GGpsoh0DX6T';
                }

            }

            if($scope.selectedMethod == 'all'){
                if(cardObject.category1 == "month"){
                    cardObject.category = 'month';
                    cardObject.data ='W74wyMy1mp0;p8cgxI3yPx8;aSJKs4oPZAf;LpkdcaLc4I9;p14JdJaG2aC;GvbkEo6sfSd;QRCRjFreECE';
                }
                if(cardObject.category1 == "quarter"){
                    cardObject.category = 'quarter';
                    cardObject.data = 'W74wyMy1mp0;p8cgxI3yPx8;aSJKs4oPZAf;LpkdcaLc4I9;p14JdJaG2aC;GvbkEo6sfSd;QRCRjFreECE';
                }
                if(cardObject.category1 == 'zones'){
                    if($scope.currentOrgUnit == "m0frOspS7JY"){
                        cardObject.data = 'jvwTTzpWBD0';
                    }else{
                        cardObject.data = $scope.currentOrgUnit;
                    }

                }
            }else{
                if(cardObject.category1 == "month"){
                    cardObject.category = 'month';
                    cardObject.data = 'gb4r7CSrT7U;RRGOg1GyLsd;nvKJnetaMxk;kcE3vG4Eq3Q;hiqGDmNAFJz;zITJeBfrJ4J;gzWRK9qFFVp';
                }
                if(cardObject.category1 == "quarter"){
                    cardObject.category = 'quarter';
                    cardObject.data = 'gb4r7CSrT7U;RRGOg1GyLsd;nvKJnetaMxk;kcE3vG4Eq3Q;hiqGDmNAFJz;zITJeBfrJ4J;gzWRK9qFFVp';
                }
                if(cardObject.category1 == 'zones'){
                    cardObject.data = $scope.selectedMethod;
                }
            }
            $http.get($scope.url).success(function(data){
                if(data.hasOwnProperty('metaData')){
                    var useThisData = $scope.prepareData(data,$scope.prepareCategory(cardObject.category),cardObject.category,cardObject);
                    angular.forEach(useThisData.regions,function(value){
                        area.push(value.name);
                    });
                    $scope.subCategory = useThisData.elements;
                    cardObject.chartObject.xAxis.categories = area;

                    $scope.normalseries = [];
                    if($scope.data.chartType == "pie"){
                        delete cardObject.chartObject.chart;
                        var serie = [];
                        angular.forEach(useThisData.elements,function(value){
                            angular.forEach(useThisData.regions,function(val){
                                var number = $scope.getDataFromUrl(data.rows,val.id,cardObject.category,value.uid);

                                serie.push({name: value.name+" - "+ val.name , y: parseInt(number)})
                            });
                        });
                        $scope.normalseries.push({type: chart, name:$scope.UsedName , data: serie,showInLegend: true,
                            dataLabels: {
                                enabled: false
                            } })
                        cardObject.chartObject.series = $scope.normalseries;
                    }
                    else if(chart == "combined"){
                        delete cardObject.chartObject.chart;
                        var serie1 = [];
                        angular.forEach(useThisData.elements,function(value){
                            var serie = [];

                            angular.forEach(useThisData.regions,function(val){
                                var number = $scope.getDataFromUrl(data.rows,val.id,cardObject.category,value.uid);
                                serie.push(parseInt(number));
                                serie1.push({name: value.name+" - "+ val.name , y: parseInt(number) })
                            });
                            $scope.normalseries.push({type: 'column', name: value.name, data: serie});
                            $scope.normalseries.push({type: 'spline', name: value.name, data: serie});
                        });
                        $scope.normalseries.push({type: 'pie', name: $scope.UsedName, data: serie1,center: [100, 80],size: 150,showInLegend: false,
                            dataLabels: {
                                enabled: false
                            }})
                        cardObject.chartObject.series = $scope.normalseries;
                    }
                    else if(chart == 'table'){
                        cardObject.table ={}
                        cardObject.table.headers = [];
                        cardObject.table.colums =[];
                        angular.forEach(useThisData.elements,function(value){
                            var serie = [];
                            cardObject.table.headers.push(value.name);
                        });
                        angular.forEach(useThisData.regions,function(val){
                            var seri = [];
                            angular.forEach(useThisData.elements,function(value){
                                var number = $scope.getDataFromUrl(data.rows,val.id,cardObject.category,value.uid);
                                seri.push({name:value.name,value:parseInt(number)});
                            });
                            cardObject.table.colums.push({name:val.name,values:seri});
                        });
                    }
                    else{
                        delete cardObject.chartObject.chart;
                        angular.forEach(useThisData.elements,function(value){
                            var serie = [];
                            angular.forEach(useThisData.regions,function(val){
                                var number = $scope.getDataFromUrl(data.rows,val.id,cardObject.category,value.uid);
                                serie.push(number);
                            });
                            $scope.normalseries.push({type: chart, name: value.name, data: serie})
                        });
                        cardObject.chartObject.series = $scope.normalseries;
                    }
                    cardObject.chartObject.loading = false
                }else{
                    cardObject.chartObject.loading = false
                }

            });
            });

        };

        $scope.prepareData = function(jsonObject,categories,type,card){
            var structure = {};
            var data = [];
            var elements = [];
            var arr = card.data.split(";")
            angular.forEach(arr,function(val){
                var name="";
                angular.forEach($scope.FPmethods,function(valu){
                    if(valu.uid == val){
                        name = valu.name;
                    }
                });
                elements.push({'name':name,'uid':val})
            });
            angular.forEach(categories,function(region){
                data.push({'name':region.name,'id':region.id});
            });
            structure.regions = data;
            structure.elements = elements;
            return structure;
        };

        $scope.getDataFromUrl  = function(arr,ou,type,de){
            var num = 0;
            var k = 1;

            if(type == 'zones'){
                k =1
                num =0;
                var orgs = ou.substring(1, ou.length-1);
                var orgArr = orgs.split(";");
                $.each(orgArr,function(c,j){
                    $.each(arr,function(k,v){
                        if(v[1] == j && v[0] == de){
                            num += parseInt(v[3])
                        }
                    });
                });

            }if(type == 'quarter'){
                num =0;
                if($scope.currentOrgUnit == 'm0frOspS7JY'){
                    if($scope.selectedMethod == "all"){
                        $.each(arr,function(k,v){
                            if(v[2] == ou && v[0] == de){
                                num = num+parseInt(v[3])
                            }
                        });
                    }else{

                        var names= "";
                        angular.forEach($scope.geographicalZones.organisationUnitGroups,function(region){
                            if(region.id == de){
                                angular.forEach(region.organisationUnits,function(value){
                                    names += value.id+';';
                                });
                            }
                        });

                        var orgs = names.substring(1, names.length-1);
                        var orgArr = orgs.split(";");
                        $.each(orgArr,function(c,j){
                            $.each(arr,function(k,v){
                                if(v[2] == ou && v[1] == j && v[0] == $scope.selectedMethod){
                                    num = num+parseInt(v[3])
                                }
                            });
                        });

                    }
                }else{
                    var names= "";
                    angular.forEach($scope.geographicalZones.organisationUnitGroups,function(region){
                        if(region.id == $scope.currentOrgUnit){
                            angular.forEach(region.organisationUnits,function(value){
                                names += value.id+';';
                            });
                        }
                    });
                    var orgs = names.substring(1, names.length-1);
                    var orgArr = orgs.split(";");
                    $.each(orgArr,function(c,j){
                        $.each(arr,function(k,v){
                            if(v[1] == j && v[2] == ou && v[0] == de){
                                num = num+parseInt(v[3])
                            }
                        });
                    });
                }

            }if(type == 'month'){
                if($scope.currentOrgUnit == 'm0frOspS7JY'){
                    if($scope.selectedMethod == "all"){
                        $.each(arr,function(k,v){
                            if(v[2] == ou && v[0] == de){
                                num = num+parseInt(v[3])
                            }
                        });
                    }else{

                        var names= "";
                        angular.forEach($scope.geographicalZones.organisationUnitGroups,function(region){
                            if(region.id == de){
                                angular.forEach(region.organisationUnits,function(value){
                                    names += value.id+';';
                                });
                            }
                        });

                        var orgs = names.substring(1, names.length-1);
                        var orgArr = orgs.split(";");
                        $.each(orgArr,function(c,j){
                            $.each(arr,function(k,v){
                                if(v[2] == ou && v[1] == j && v[0] == $scope.selectedMethod){
                                    num = num+parseInt(v[3])
                                }
                            });
                        });

                    }
                }else{
                    var names= "";
                    angular.forEach($scope.geographicalZones.organisationUnitGroups,function(region){
                        if(region.id == $scope.currentOrgUnit){
                            angular.forEach(region.organisationUnits,function(value){
                                names += value.id+';';
                            });
                        }
                    });
                    var orgs = names.substring(1, names.length-1);
                    var orgArr = orgs.split(";");
                    $.each(orgArr,function(c,j){
                        $.each(arr,function(k,v){
                            if(v[1] == j && v[2] == ou && v[0] == de){
                                num = num+parseInt(v[3])
                            }
                        });
                    });
                }
            }if(type == 'methods'){

                num =0;
                var names= "";
                angular.forEach($scope.geographicalZones.organisationUnitGroups,function(region){

                    if(region.id == $scope.currentOrgUnit){
                        angular.forEach(region.organisationUnits,function(value){
                            names += value.id+';';
                        });
                    }
                });
                var orgs = names.substring(1, names.length-1);
                var orgArr = orgs.split(";");
                $.each(orgArr,function(c,j){
                    $.each(arr,function(k,v){
                        if(v[1] == j && v[0] == ou){
                            num += parseInt(v[3])
                        }
                    });
                });

            }

            return num;
        }

        $scope.prepareCategory = function(type){
            var data = [];
            var per = $scope.selectedPeriod;
            if(type == 'zones'){
                if($scope.currentOrgUnit == "m0frOspS7JY"){
                    angular.forEach($scope.geographicalZones.organisationUnitGroups,function(region){
                        var names= "";
                        angular.forEach(region.organisationUnits,function(value){
                            names += value.id+';';
                        });
                        data.push({'name':region.name,'id':names});
                    });
                }else{
                    angular.forEach($scope.geographicalZones.organisationUnitGroups,function(region){
                        var names= "";
                        if(region.id == $scope.currentOrgUnit){
                            angular.forEach(region.organisationUnits,function(value){
                                names += value.id+';';
                            });
                            data.push({'name':region.name,'id':names});
                        }
                    });
                }

            }if(type == 'quarter'){
                data.push({'name':'Jan - Mar '+per,'id':per+'Q1'});
                data.push({'name':'Apr - Jun '+per,'id':per+'Q2'});
                data.push({'name':'Jul - Sep '+per,'id':per+'Q3'});
                data.push({'name':'Oct - Dec '+per,'id':per+'Q4'});
            }if(type == 'month'){
                data.push({'name':'Jan '+per,'id':per+'01'});
                data.push({'name':'Feb '+per,'id':per+'02'});
                data.push({'name':'Mar '+per,'id':per+'03'});
                data.push({'name':'Apr '+per,'id':per+'04'});
                data.push({'name':'May '+per,'id':per+'05'});
                data.push({'name':'Jun '+per,'id':per+'06'});
                data.push({'name':'Jul '+per,'id':per+'07'});
                data.push({'name':'Aug '+per,'id':per+'08'});
                data.push({'name':'Sep '+per,'id':per+'09'});
                data.push({'name':'Oct '+per,'id':per+'10'});
                data.push({'name':'Nov'+per,'id':per+'11'});
                data.push({'name':'Dec '+per,'id':per+'12'});
            }if(type == 'methods'){
                data.push({'name':'Male Condoms','id':'JMmqv0tyVr7'},
                    {'name':'Female Condoms','id':'Nt8M08bJKXl'},
                    {'name':'Oral Pills','id':'IFxhP0O4k0W'},
                    {'name':'Injectables','id':'epPM7fO8CnH'},
                    {'name':'Implants','id':'pqpVKzE951Y'},
                    {'name':'IUCDs','id':'OQpasUg1Tse'},
                    {'name':'NSV','id':'btKkJROB2gP'},
                    {'name':'Min Lap','id':'mlfh4fgiFhd'},
                    {'name':'Natural FP','id':'GGpsoh0DX6T'});
            }if(type == 'method'){
                if($scope.currentOrgUnit == "m0frOspS7JY"){
                    angular.forEach($scope.geographicalZones.organisationUnitGroups,function(region){
                        var names= "";
                        angular.forEach(region.organisationUnits,function(value){
                            names += value.id+';';
                        });
                        data.push({'name':region.name,'id':names});
                    });
                }else{
                    angular.forEach($scope.geographicalZones.organisationUnitGroups,function(region){
                        var names= "";
                        if(region.id == $scope.currentOrgUnit){
                            angular.forEach(region.organisationUnits,function(value){
                                names += value.id+';';
                            });
                            data.push({'name':region.name,'id':names});
                        }
                    });
                }
            }

            return data;
        }


        $rootScope.firstClick = function(){
            angular.forEach($scope.fpCards,function(value){
                $scope.prepareSeries(value,value.chart);
            });
        };
        $scope.firstClick();
    });

function preparePeriod(period){

    return ""+period+"01;"+period+"02;"+period+"03;"+period+"04;"+period+"05;"+period+"06;"+period+"07;"+period+"08;"+period+"09;"+period+"10;"+period+"11;"+period+"12;"+period+"Q1;"+period+"Q2;"+period+"Q3;"+period+"Q4";
}



