/**
 * Created by kelvin on 12/10/15.
 */
/**
 * Created by kelvin on 11/26/15.
 */

angular.module("hmisPortal")
    .config(function($httpProvider) {

    })
    .controller("clientMethodsCtrl",function ($rootScope,$scope,$http,portalService,FPManager) {
        var url = "https://dhis.moh.go.tz/api/analytics.json?dimension=dx:GGpsoh0DX6T;IFxhP0O4k0W;JMmqv0tyVr7;Nt8M08bJKXl;OQpasUg1Tse;btKkJROB2gP;epPM7fO8CnH;mlfh4fgiFhd;pqpVKzE951Y&dimension=ou:LEVEL-2;m0frOspS7JY&dimension=pe:201501;201502;201503;201504;201505;201506;201507;201508;201509;201510;201511;201512;2015Q1;2015Q2;2015Q3;2015Q4&displayProperty=NAME";
        var geoZonesUrl = "https://dhis.moh.go.tz/api/organisationUnitGroupSets/eVyUn5tE93t.json?fields=id,name,organisationUnitGroups[id,name,organisationUnits[id,name]]";

        $rootScope.showProgressMessage = false;
        $scope.geographicalZones = FPManager.zones;
        $scope.geoToUse = [];
        $scope.zones = "";
        angular.forEach($scope.geographicalZones.organisationUnitGroups,function(value){
            $scope.zones += value.id+";";
            $scope.geoToUse.push({name:value.name,id:value.id, ticked: true });
        });
        $scope.data = {};
        $scope.data.outMethods = [];
        $scope.updateTree = function(){
            $scope.data.orgUnitTree1 = [];
            $scope.data.orgUnitTree = [];
            angular.forEach($scope.geographicalZones.organisationUnitGroups,function(value){
                var zoneRegions = [];
                angular.forEach(value.organisationUnits,function(regions){
                    var regionDistricts = [];
                    angular.forEach(regions.children,function(district){
                        regionDistricts.push({name:district.name,id:district.id });
                    });
                    zoneRegions.push({ name:regions.name,id:regions.id, children:regionDistricts });
                });
                $scope.data.orgUnitTree1.push({ name:value.name,id:value.id, children:zoneRegions,selected:true });
            });
            $scope.data.orgUnitTree.push({name:"Tanzania",id:'m0frOspS7JY',children:$scope.data.orgUnitTree1});
        };

        $scope.updateTreeWithOne = function(){
            $scope.data.orgUnitTree1 = [];
            $scope.data.orgUnitTree = [];
            angular.forEach($scope.geographicalZones.organisationUnitGroups,function(value){
                var zoneRegions = [];
                angular.forEach(value.organisationUnits,function(regions){
                    var regionDistricts = [];
                    angular.forEach(regions.children,function(district){
                        regionDistricts.push({name:district.name,id:district.id });
                    });
                    zoneRegions.push({ name:regions.name,id:regions.id, children:regionDistricts });
                });
                $scope.data.orgUnitTree1.push({ name:value.name,id:value.id, children:zoneRegions });
            });
            $scope.data.orgUnitTree.push({name:"Tanzania",id:'m0frOspS7JY',children:$scope.data.orgUnitTree1,selected:true});
        };

        $scope.updateTree();

        $scope.selectOnly1Or2 = function(item, selectedItems) {
            if (selectedItems  !== undefined && selectedItems.length >= 7) {
                return false;
            } else {
                return true;
            }
        };
        $scope.changeMethod = function(){
            $scope.currentOrgUnit = "m0frOspS7JY";
            angular.forEach($scope.geoToUse,function(value){
                value.ticked = true;
            });
//            $('#orgunitss option[value="m0frOspS7JY"]').prop('selected', true);
            $scope.firstClick();
        };

        $scope.changeZone = function(){
            $scope.zones = "";
            angular.forEach($scope.selectedRegions,function(value){
                $scope.zones += value.id+";";
            })
            $scope.firstClick();
        };

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
            {'name':'Male Condoms','uid':'JMmqv0tyVr7'},
            {'name':'Female Condoms','uid':'Nt8M08bJKXl'},
            {'name':'Oral Pills','uid':'IFxhP0O4k0W'},
            {'name':'Injectables','uid':'epPM7fO8CnH'},
            {'name':'Implants','uid':'pqpVKzE951Y'},
            {'name':'IUCDs','uid':'OQpasUg1Tse'},
            {'name':'NSV','uid':'btKkJROB2gP'},
            {'name':'Mini Lap','uid':'mlfh4fgiFhd'},
            {'name':'NSV','uid':'btKkJROB2gP'},
            {'name':'Mini Lap','uid':'mlfh4fgiFhd'},
            {'name':'All Clients','uid':'jvwTTzpWBD0'},
            {'name':'Natural FP','uid':'GGpsoh0DX6T'},
            {'name':'Eastern Zone','uid':'gb4r7CSrT7U'},
            {'name':'Lake Zone','uid':'RRGOg1GyLsd'},
            {'name':'Northern Zone','uid':'nvKJnetaMxk'},
            {'name':'Southern Highlands Zone','uid':'kcE3vG4Eq3Q'},
            {'name':'Southern Zone','uid':'hiqGDmNAFJz'},
            {'name':'Western Zone','uid':'zITJeBfrJ4J'},
            {'name':'Central Zone','uid':'gzWRK9qFFVp'},
            {'name':'MOH Tanzania','uid':'m0frOspS7JY'}
        ];

        $scope.methods = [
            {'name':'Male Condoms','uid':'JMmqv0tyVr7'},
            {'name':'Female Condoms','uid':'Nt8M08bJKXl'},
            {'name':'Oral Pills','uid':'IFxhP0O4k0W'},
            {'name':'Injectables','uid':'epPM7fO8CnH'},
            {'name':'Implants','uid':'pqpVKzE951Y'},
            {'name':'IUCDs','uid':'OQpasUg1Tse'},
            {'name':'NSV','uid':'btKkJROB2gP'},
            {'name':'Mini Lap','uid':'mlfh4fgiFhd'},
            {'name':'NSV','uid':'btKkJROB2gP'},
            {'name':'Mini Lap','uid':'mlfh4fgiFhd'}
        ];
        $scope.detailedMethod =[
            {'name':'Male Condoms','total':'JMmqv0tyVr7','new':'i1Zz36jwvdx','returning':'q7IbPTlyMFT','total1':''},
            {'name':'Female Condoms','total':'Nt8M08bJKXl','new':'Ze7MDBFPyhx','returning':'cPWMtdCw1Z4','total1':''},
            {'name':'Oral Pills','total':'IFxhP0O4k0W','new':'RAGwynaw4MI','returning':'vrqwn4dNqQY','total1':''},
            {'name':'Injectables','total':'epPM7fO8CnH','new':'sN2NtkZjVyJ','returning':'LmbDl4YdYAn','total1':''},
            {'name':'Implants','total':'pqpVKzE951Y','new':'','returning':'','total1':'pqpVKzE951Y'},
            {'name':'IUCDs','total':'gHL3qXij2Yg','new':'','returning':'','total1':'gHL3qXij2Yg'},
            {'name':'NSV','total':'btKkJROB2gP','new':'','returning':'','total1':'btKkJROB2gP'},
            {'name':'Mini Lap','total':'mlfh4fgiFhd','new':'','returning':'','total1':'mlfh4fgiFhd'}
        ];

        $scope.updateMethod = function(){
            $scope.data.menuMethods = [];
            angular.forEach($scope.detailedMethod,function(value){
                if(value.name == "Implants"){
                    $scope.data.menuMethods.push({name:value.name,id:value.total,new:value.new,returning:value.returning,total1:value.total1,selected:true });
                }else{
                    $scope.data.menuMethods.push({name:value.name,id:value.total,new:value.new,returning:value.returning,total1:value.total1 });
                }
            });
        };
        $scope.updateMethod();

        $scope.$watch('data.outOrganisationUnits', function() {
            if($scope.data.outOrganisationUnits){
                if($scope.data.outOrganisationUnits.length > 1){
                    $scope.updateMethod();
                }else{

                }
            }

        }, true);

        $scope.$watch('data.outMethods', function() {
            if($scope.data.outMethods){
                if($scope.data.outMethods.length > 1){
                    $scope.updateTreeWithOne();
                }else{

                }
            }

        }, true);

        $scope.selectOnly1Or3 = function(item, selectedItems) {
            if (selectedItems  !== undefined && selectedItems.length >= 7) {
                return false;
            } else {
                return true;
            }
        };

        $scope.getSingleMethods = function(methods){
            var method = "";
            if(methods.length === 1){
                angular.forEach(methods,function(value){
                    method= value.name;
                });
            }else{
                angular.forEach($scope.data.outOrganisationUnits,function(value){
                    method += value.name+", ";
                });
            }
            return method;


        };


        //switching between tables and charts
        $scope.displayTables = {card1:false,card2:false}
        $scope.changeTable =function(card,value){
            if(value == "table"){
                if(card == "card1"){$scope.displayTables.card1 = true}
                if(card == "card2"){$scope.displayTables.card2 = true}
            }if(value == "chart"){
                if(card == "card1"){$scope.displayTables.card1 = false}
                if(card == "card2"){$scope.displayTables.card2 = false}
            }
        };

        //prepare data for use in csv
        $scope.prepareDataForCSV = function(arr){
            var items = [];
            angular.forEach(arr.xAxis.categories,function(value){
                var obj = {name:value};
                var i = 0;
                angular.forEach(arr.series,function(val){
                    obj[val.name] = val.data[i];
                    i++;
                })
                items.push(obj);
            })
            return items;
        };

        $scope.fpCards = [
            //{
            //    title:'Total Clients of [IMPLANTS]',
            //    description:'Total Clients of [IMPLANTS]',
            //    cardClass:"col s12 m12",
            //    data:[{'name':'All Clients','id':'jvwTTzpWBD0'}],
            //    data1:$scope.currentOrgUnit,
            //    category:'zones',
            //    category1:'zones',
            //    icons:angular.copy(portalService.minimalIcons),
            //    displayTable:false,
            //    displayMap:false,
            //    chart:'bar',
            //    visible:'consumption by method',
            //    chartObject:angular.copy(portalService.chartObject)
            //
            //},
    {
                title:'Family Planning clients by Method through Routine Facility-Based Service Dec 2014' ,
                description:'Total Clients Quarterly',
                cardClass:"col s12 m12",
                data:$scope.methods,
                category:'other',
                category1:'quarter',
                icons:angular.copy(portalService.minimalIcons),
                displayTable:false,
                displayMap:false,
                chart:'line',
                yaxisTittle:'# client',
                visible:'consumption by method',
                chartObject:angular.copy(FPManager.defaultChartObject)

            },
            {
                title:'Family Planning clients by Method through Routine Facility-Based Service Jan 2014 to Dec 2014',
                description:'Total Clients Monthly',
                cardClass:"col s12 m12",
                data:$scope.methods,
                category:'month',
                category1:'month',
                icons:angular.copy(portalService.minimalIcons),
                displayTable:false,
                displayMap:false,
                chart:'line',
                yaxisTittle:'# client',
                visible:'consumption by method',
                chartObject:angular.copy(portalService.chartObject)

            }];


        $scope.getAllMethods = function(){
            var methods = [];
            angular.forEach($scope.detailedMethod,function(value){
                methods.push(value.total);
                if(value.new != ''){methods.push(value.new)}
                if(value.returning != ''){methods.push(value.returning)}
            });
            return methods.join(";");
        };
        $scope.getAllMethods();

        $scope.prepareSeries = function(cardObject,chart){
            cardObject.chartObject.loading = true;
            var base = "https://dhis.moh.go.tz/";
            $rootScope.progressMessage = "Fetching data please wait ...";
            $rootScope.showProgressMessage = true;
            $.post( portalService.base + "dhis-web-commons-security/login.action?authOnly=true", {
            j_username: "portal", j_password: "Portal123"
            },function() {

            if (chart == 'table') {
                cardObject.displayTable = true;
                cardObject.displayMap = false;
            }
            else {
                cardObject.displayMap = false;
                cardObject.displayTable = false;
            }

            var peri = preparePeriod($scope.selectedPeriod);
            $scope.url = portalService.base+"api/analytics.json?dimension=dx:"+$scope.getAllMethods()+"&dimension=ou:"+FPManager.getUniqueOrgUnits($scope.data.outOrganisationUnits)+"&dimension=pe:201401;201402;201403;201404;201405;201406;201407;201408;201409;201410;201411;201412&displayProperty=NAME";
            var area = [];
            cardObject.chartObject.loading = true;
            var datass = '';


            $http.get($scope.url).success(function(data){
                if(data.hasOwnProperty('metaData')){
                    //var useThisData = $scope.prepareData(data,$scope.prepareCategory(cardObject.category),cardObject.category,cardObject);
                    var yAxisItems = ['new','returning','total'];
                    var xAxisItems = [];
                    var methodId = [];
                    var methodId1 = [];
                    if($scope.data.outMethods.length == 1){
                        $scope.titleToUse = $scope.data.outMethods[0].name;
                        cardObject.chartObject.title.text = cardObject.title  + " - " +$scope.titleToUse;
                        cardObject.chartObject.yAxis.title.text = cardObject.yaxisTittle;

                        xAxisItems = $scope.prepareCategory('zones');
                        angular.forEach($scope.data.outMethods,function(value){
                            angular.forEach($scope.detailedMethod,function(va){
                                if(va.name == value.name){
                                    methodId = va.total;
                                    methodId1 = va;
                                }
                            });
                        });
                    }else{
                        $scope.titleToUse = $scope.data.outOrganisationUnits[0].name;
                        cardObject.chartObject.title.text = cardObject.title  + " - " +$scope.titleToUse;
                        cardObject.chartObject.yAxis.title.text = cardObject.yaxisTittle;

                        angular.forEach($scope.data.outMethods,function(value){
                            xAxisItems.push(value);
                        });
                    }
                    /////////////////////////// second chart ////////////////////////////////
                    cardObject.chartObject.xAxis.categories = [];
                    if(cardObject.category == 'month'){
                        angular.forEach($scope.prepareCategory('month'), function (value) {
                            cardObject.chartObject.xAxis.categories.push(value.name);
                        });
                        $scope.normalseries1 = [];
                        //delete cardObject.chartObject.chart;
                        angular.forEach(xAxisItems, function (val) {
                            var serie = [];
                            angular.forEach($scope.prepareCategory('month'), function (value) {
                                if($scope.data.outMethods.length == 1){
                                    //console.log(methodId+"--pe: "+value.id+" -- ou: "+val.id)
                                    var number = $scope.getDataFromUrl(data.rows, val.id, value.id, methodId);
                                }else{
                                    var number = $scope.getDataFromUrl(data.rows,'none', value.id, val.id);
                                }
                                serie.push(number);
                            });
                            $scope.normalseries1.push({type: 'spline', name: val.name, data: serie})
                        });
                        cardObject.chartObject.series = $scope.normalseries1;
                        $('#container12').highcharts(cardObject.chartObject);
                        cardObject.csvdata = $scope.prepareDataForCSV(cardObject.chartObject);

                    }

                    //////////////////////////////first chart ///////////////////////////
                    if(cardObject.category == 'other'){
                        angular.forEach(xAxisItems, function (value) {
                            cardObject.chartObject.xAxis.categories.push(value.name);
                        });
                        $scope.normalseries1 = [];

                        //delete cardObject.chartObject.chart;
                        angular.forEach(yAxisItems, function (val) {
                            var serie = [];
                            angular.forEach(xAxisItems, function (value) {
                                if($scope.data.outMethods.length == 1){
                                    if (val == "new") {
                                        if(methodId1.new !== "")
                                        var number = $scope.getDataFromUrl(data.rows, value.id, '201412', methodId1.new);

                                    }
                                    if (val == "returning") {
                                        if(methodId1.returning !== "")
                                        var number = $scope.getDataFromUrl(data.rows, value.id, '201412', methodId1.returning);
                                    }
                                    if (val == "total") {
                                        if(methodId1.total1 !== "")
                                        var number = $scope.getDataFromUrl(data.rows, value.id, '201412', methodId1.total1);
                                    }
                                }else{
                                    if (val == "new") {
                                        //if(value.new !== "")
                                        var number = $scope.getDataFromUrl(data.rows, 'none', '201412', value.new);
                                    }
                                    if (val == "returning") {
                                        //if(value.returning !== "")
                                        var number = $scope.getDataFromUrl(data.rows, 'none', '201412', value.returning);
                                    }
                                    if (val == "total") {
                                        //if(value.total1 !== "")
                                        var number = $scope.getDataFromUrl(data.rows, 'none', '201412', value.total1);
                                    }
                                }

                                serie.push(number);
                            });
                            console.log(serie)
                            $scope.normalseries1.push({ name: val, data: serie})
                        });
                        cardObject.chartObject.series = $scope.normalseries1;
                        $('#container11').highcharts(cardObject.chartObject);
                        cardObject.csvdata = $scope.prepareDataForCSV(cardObject.chartObject);

                    }
                    cardObject.chartObject.loading = false
                }else{
                    cardObject.chartObject.loading = false
                }

                $rootScope.showProgressMessage = false;

            });
            });

        };

        $scope.prepareData = function(jsonObject,categories,type,card){
            var structure = {};
            var data = [];
            var elements = [];
            var arr = card.data;
            angular.forEach(arr,function(val){
                elements.push({'name':val.name,'uid':val.id})
            });
            angular.forEach(categories,function(region){
                data.push({'name':region.name,'id':region.id});
            });
            structure.regions = data;
            structure.elements = elements;

            return structure;
        };

        $scope.getDataFromUrl  = function(arr,ou,pe,de){

            var num = 0;
            var k = 1;


                k =1
                num =0;
            if(ou == 'none'){
                $.each(arr,function(k,v){
                    if(v[2] == pe && v[0] == de){
                        num += parseInt(v[3])
                    }
                });
            }else{
                if ((ou.indexOf(';') > -1)) {
                    var orgArr = ou.split(";");
                    var i = 0;
                    $.each(orgArr, function (c, j) {
                        i++;
                        $.each(arr, function (k, v) {
                            if (v[0] == de && v[2] == pe) {
                                if (v[1] == j) {
                                    num += parseInt(v[3]);
                                }
                            }
                        });
                    });
                } else {
                    $.each(arr, function (k, v) {
                        if (v[0] == de && v[2] == pe) {
                            if (v[1] == ou) {
                                num += parseInt(v[3]);
                            }
                        }
                    });
                }
            }

            return num;
        }

        $scope.prepareCategory = function(type){
            var data = [];
            var per = $scope.selectedPeriod;
            if(type == 'zones'){
                angular.forEach($scope.data.outOrganisationUnits,function(orgUnit){
                    var name = orgUnit.name;
                    if(name.indexOf("Zone") > -1){
                        var names = [];
                        angular.forEach(orgUnit.children,function(regions){
                            names.push(regions.id);
                        });
                        data.push({'name':orgUnit.name,'id':names.join(";")});
                    }else{
                        data.push({'name':orgUnit.name,'id':orgUnit.id});

                    }
                });
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
                data.push({'name':'Male Condoms','uid':'JMmqv0tyVr7'},
                    {'name':'Female Condoms','uid':'Nt8M08bJKXl'},
                    {'name':'Oral Pills','uid':'IFxhP0O4k0W'},
                    {'name':'Injectables','uid':'epPM7fO8CnH'},
                    {'name':'Implants','uid':'pqpVKzE951Y'},
                    {'name':'IUCDs','uid':'OQpasUg1Tse'},
                    {'name':'NSV','uid':'btKkJROB2gP'},
                    {'name':'Mini Lap','uid':'mlfh4fgiFhd'},
                    {'name':'NSV','uid':'btKkJROB2gP'},
                    {'name':'Mini Lap','uid':'mlfh4fgiFhd'});
            }if(type == 'method'){
                angular.forEach($scope.data.outOrganisationUnits,function(orgUnit){
                    var name = orgUnit.name;
                    if(name.indexOf("Zone") > -1){
                        var names = [];
                        angular.forEach(orgUnit.children,function(regions){
                            names.push(regions.id);
                        });
                        data.push({'name':orgUnit.name,'id':names.join(";")});
                    }else{
                        data.push({'name':orgUnit.name,'id':orgUnit.id});

                    }
                });
            }

            return data;
        };


        $rootScope.firstClick = function(){
            if($scope.data.outMethods.length === 0){

            }
            angular.forEach($scope.fpCards,function(value){
                $scope.prepareSeries(value,value.chart);
            });
        };
        $scope.firstClick();
    });

function preparePeriod(period){

    return ""+period+"01;"+period+"02;"+period+"03;"+period+"04;"+period+"05;"+period+"06;"+period+"07;"+period+"08;"+period+"09;"+period+"10;"+period+"11;"+period+"12";
}



