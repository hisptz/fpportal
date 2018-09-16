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
        var url = "https://dhis.moh.go.tz/api/24/analytics.json?dimension=dx:GGpsoh0DX6T;IFxhP0O4k0W;JMmqv0tyVr7;Nt8M08bJKXl;OQpasUg1Tse;btKkJROB2gP;epPM7fO8CnH;mlfh4fgiFhd;pqpVKzE951Y&dimension=ou:LEVEL-2;m0frOspS7JY&dimension=pe:201501;201502;201503;201504;201505;201506;201507;201508;201509;201510;201511;201512;2015Q1;2015Q2;2015Q3;2015Q4&displayProperty=NAME";
        var geoZonesUrl = "https://dhis.moh.go.tz/api/organisationUnitGroupSets/eVyUn5tE93t.json?fields=id,name,organisationUnitGroups[id,name,organisationUnits[id,name]]";

        $rootScope.showProgressMessage = false;
        $scope.geographicalZones = FPManager.zones;
        $scope.geoToUse = [];
        $scope.zones = "";
        $scope.data = {};
        $scope.selectedYear = FPManager.latestYear;
        $scope.data.selectedMonth = FPManager.latestMonth;

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
            $scope.getSelectedValues();
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

        $scope.methods = [
            {'name':'Male Condoms','uid':'JMmqv0tyVr7'},
            {'name':'Female Condoms','uid':'Nt8M08bJKXl'},
            {'name':'Oral Pills','uid':'IFxhP0O4k0W'},
            {'name':'Injectables','uid':'epPM7fO8CnH'},
            {'name':'Implants','uid':'pqpVKzE951Y'},
            {'name':'IUCDs','uid':'OQpasUg1Tse'},
            {'name':'NSV','uid':'btKkJROB2gP'},
            {'name':'Mini Lap','uid':'mlfh4fgiFhd'}
        ];
        $scope.detailedMethod =[
            {'name':'Male Condoms','total':'JMmqv0tyVr7','new':'i1Zz36jwvdx','returning':'q7IbPTlyMFT','total1':''},
            {'name':'Female Condoms','total':'Nt8M08bJKXl','new':'Ze7MDBFPyhx','returning':'cPWMtdCw1Z4','total1':''},
            {'name':'Oral Pills','total':'IFxhP0O4k0W','new':'RAGwynaw4MI','returning':'vrqwn4dNqQY','total1':''},
            {'name':'Injectables','total':'epPM7fO8CnH','new':'sN2NtkZjVyJ','returning':'LmbDl4YdYAn','total1':''},
            {'name':'Implants','total':'lMFKZN3UaYp','new':'','returning':'','total1':'lMFKZN3UaYp'},
            {'name':'IUCDs','total':'UjGebiXNg0t','new':'','returning':'','total1':'UjGebiXNg0t'},
            {'name':'NSV','total':'JSmtnnW6WrR','new':'','returning':'','total1':'JSmtnnW6WrR'},
            {'name':'Mini Lap','total':'xhcaH3H3pdK','new':'','returning':'','total1':'xhcaH3H3pdK'}
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

        $scope.clearMethods = function(){
            $scope.data.menuMethods = [];
            angular.forEach($scope.detailedMethod,function(value){
                if(value.name == "Implants"){
                    $scope.data.menuMethods.push({name:value.name,id:value.total,new:value.new,returning:value.returning,total1:value.total1 });
                }else{
                    $scope.data.menuMethods.push({name:value.name,id:value.total,new:value.new,returning:value.returning,total1:value.total1 });
                }
            });
        };

        $scope.$watch('data.outOrganisationUnits', function() {
            FPManager.getFPFacilityList().then(function(data){
                console.log(data)
            });
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



        $scope.fpCards = [

    {
        title:'Family Planning clients by Method through Routine Facility-Based Service ' ,
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
        chartObject:angular.copy(FPManager.defaultChartObject),
        showLoader:true,
        loadingMessage: "",
        description:'This charts displays the total number of new and returning routine facility-based FP clients for the selected FP method/s, in the selected geographies, for the indicated month',
        display_option_1:'If you select one FP method (eg implants) and multiple geographies (eg 6 districts within your region) you can compare the total number of implants clients across the 6 selected districts. This allows you to identify which districts have the larger gaps in number of clients served.',
        display_option_2:'If you select one geography (eg "Pwani Region") and multiple FP methods, you can compare the total number of clients in each selected FP method, within Pwani Region. This allows you to identify which FP methods have the larger gaps in number of clients served, in a given geography.',
        option_2:true,
        indicator_type:'Number',
        numerator:"Total number of new and returning clients recorded by each facility for the selected FP method/s (oral pills, male condoms, female condoms, injectables, implants, IUCDs, minilap, NSV) in the selected geography in the indicated month<br><br> *Note: for long-acting and permanent methods, the data is not disaggregated by 'new' and 'returning' so displays as 'totals'",
        denominator:'N/A',
        data_source:'DHIS-2 FP reporting Tool'

            },
            {
                title:'Family Planning clients by Method through Routine Facility-Based Service ',
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
                chartObject:angular.copy(FPManager.chartObject),
                showLoader:true,
                loadingMessage: "",
                description:'This charts displays the total number of new and returning routine facility-based FP clients for the selected FP method/s, in the selected geographies, for the indicated month',
                display_option_1:'If you select one FP method (eg  IUCDs) and multiple geographies (eg 6 regions within a zone) you can compare the total number of IUCD clients across the 6 selected regions, over time. This allows you to compare geographic differences in the number of clients served (for a given FP method) and identify unusual variations in the trend over time.',
                display_option_2:'If you select one geography (eg"Kigoma Region") and multiple FP methods, you can compare the total number of clients in each selected FP method, within Kigoma Region, over time. This allows you to compare difference between FP methods in the number of clients served (in a given geography) and can help identify unusual variations in the trend over time.',
                option_2:true,
                indicator_type:'Number',
                numerator:'Total number of clients recorded by each facility for the selected FP method/s (oral pills, male condoms, female condoms, injectables, implants, IUCDs, minilap, NSV) in the selected geography, for each month in the indicated 12 month period',
                denominator:'N/A',
                data_source:'DHIS-2 FP reporting Tool'
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
            cardObject.loadingMessage = "Authenticating portal...";
            $.post( portalService.base + "dhis-web-commons-security/login.action?authOnly=true", {
            j_username: "portal", j_password: "Portal123"
            },function() {
                cardObject.loadingMessage = "Fetching Data...";
            $scope.url = portalService.base+"api/analytics.json?dimension=dx:"+$scope.getAllMethods()+"&dimension=ou:"+FPManager.getUniqueOrgUnits($scope.data.outOrganisationUnits)+"&dimension=pe:"+FPManager.lastTwelveMonth($scope.data.selectedMonth)+"&displayProperty=NAME";
            var area = [];
            $http.get($scope.url).success(function(data){
                if(data.hasOwnProperty('metaData')){
                    var yAxisItems = ['new','returning','total'];
                    var xAxisItems = [];
                    var methodId = [];
                    var methodId1 = [];
                    if($scope.data.outMethods.length == 1){
                        $scope.titleToUse = $scope.data.outMethods[0].name;
                        if(cardObject.category1 == 'quarter') {
                            cardObject.chartObject.options.title.text = cardObject.title  +"  "+ FPManager.getMonthName($scope.data.selectedMonth) + " - " + $scope.titleToUse;
                        }else if(cardObject.category1 == 'month'){
                            cardObject.chartObject.options.title.text = cardObject.title  +"  "+ FPManager.getlastTwelveMonthName($scope.data.selectedMonth) + " - " + $scope.titleToUse;
                        }
                        cardObject.chartObject.options.yAxis.title.text = cardObject.yaxisTittle;

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
                        if(cardObject.category1 == 'quarter') {
                            cardObject.chartObject.options.title.text = cardObject.title  +"  "+ FPManager.getMonthName($scope.data.selectedMonth) + " - " + $scope.titleToUse;
                        }else if(cardObject.category1 == 'month'){
                            cardObject.chartObject.options.title.text = cardObject.title  +"  "+ FPManager.getlastTwelveMonthName($scope.data.selectedMonth) + " - " + $scope.titleToUse;
                        }
                        cardObject.chartObject.options.yAxis.title.text = cardObject.yaxisTittle;

                        angular.forEach($scope.data.outMethods,function(value){
                            xAxisItems.push(value);
                        });
                    }
                    /////////////////////////// second chart ////////////////////////////////
                    cardObject.chartObject.options.xAxis.categories = [];
                    if(cardObject.category == 'month'){
                        angular.forEach($scope.prepareCategory('month'), function (value) {
                            cardObject.chartObject.options.xAxis.categories.push(value.name);
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
                        cardObject.csvdata = FPManager.prepareDataForCSV(cardObject.chartObject);

                    }

                    //////////////////////////////first chart ///////////////////////////
                    if(cardObject.category == 'other'){
                        angular.forEach(xAxisItems, function (value) {
                            cardObject.chartObject.options.xAxis.categories.push(value.name);
                        });
                        $scope.normalseries1 = [];

                        //delete cardObject.chartObject.chart;
                        angular.forEach(yAxisItems, function (val) {
                            var serie = [];
                            angular.forEach(xAxisItems, function (value) {
                                if($scope.data.outMethods.length == 1){
                                    if (val == "new") {
                                        if(methodId1.new !== "")
                                        var number = $scope.getDataFromUrl(data.rows, value.id, $scope.data.selectedMonth, methodId1.new);

                                    }
                                    if (val == "returning") {
                                        if(methodId1.returning !== "")
                                        var number = $scope.getDataFromUrl(data.rows, value.id, $scope.data.selectedMonth, methodId1.returning);
                                    }
                                    if (val == "total") {
                                        if(methodId1.total1 !== "")
                                        var number = $scope.getDataFromUrl(data.rows, value.id, $scope.data.selectedMonth, methodId1.total1);
                                    }
                                }else{
                                    if (val == "new") {
                                        //if(value.new !== "")
                                        var number = $scope.getDataFromUrl(data.rows, 'none', $scope.data.selectedMonth, value.new);
                                    }
                                    if (val == "returning") {
                                        //if(value.returning !== "")
                                        var number = $scope.getDataFromUrl(data.rows, 'none', $scope.data.selectedMonth, value.returning);
                                    }
                                    if (val == "total") {
                                        //if(value.total1 !== "")
                                        var number = $scope.getDataFromUrl(data.rows, 'none', $scope.data.selectedMonth, value.total1);
                                    }
                                }

                                serie.push(number);
                            });
                            $scope.normalseries1.push({ name: val, data: serie})
                        });
                        cardObject.chartObject.series = $scope.normalseries1;
                        cardObject.csvdata = FPManager.prepareDataForCSV(cardObject.chartObject);

                    }
                    cardObject.chartObject.loading = false;
                    cardObject.showLoader = false
                }else{
                    cardObject.chartObject.loading = false;
                   cardObject.showLoader = false;
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
                data=FPManager.getLastTwelveMonthList($scope.data.selectedMonth);
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


        $rootScope.getSelectedValues = function(){
            if($scope.data.outMethods.length === 0){

            }
            angular.forEach($scope.fpCards,function(value){
                $scope.prepareSeries(value,value.chart);
            });
        };
        $scope.getSelectedValues();
    });

function preparePeriod(period){

    return ""+period+"01;"+period+"02;"+period+"03;"+period+"04;"+period+"05;"+period+"06;"+period+"07;"+period+"08;"+period+"09;"+period+"10;"+period+"11;"+period+"12";
}



