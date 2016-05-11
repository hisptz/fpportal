/**
 * Created by kelvin on 2/1/16.
 */
/**
 * Created by kelvin on 12/10/15.
 */
/**
 * Created by kelvin on 11/26/15.
 */

angular.module("hmisPortal")
    .config(function($httpProvider) {

    }).controller("FPHomeController",function ($rootScope,$scope,$http,portalService,FPManager,$location) {
        $scope.unsubscribe = function(){

        }
    })
    .controller("HomeHWTrainedCtrl",function ($rootScope,$scope,$http,portalService,FPManager) {

        $rootScope.showProgressMessage = false;
        $scope.geographicalZones = FPManager.zones;
        $scope.geoToUse = [];
        $scope.zones = "";
        $scope.data = {};
        $scope.data.outMethods = [];
        $scope.data.outOrganisationUnits = [];

        $scope.selectedMethod = 'all';
        $scope.selectedPeriod = '2014';
        $scope.data.chartType = 'column';
        $scope.displayTable = false;
        $scope.methods = [
            {'name':'Short Acting','uid':'iWDh2fUbRTJ'},
            {'name':'Implants','uid':'Igxe3yXGEoW'},
            {'name':'IUCDs','uid':'t8vQoqdY0en'},
            {'name':'NSV','uid':'BLqgpawRwGN'},
            {'name':'Mini Lap','uid':'acbet8SSjCY'}
        ];

        $scope.updateMethod = function(){
            $scope.data.menuMethods = [];
            angular.forEach($scope.methods,function(value){
                if(value.name == "Implants"){
                    $scope.data.menuMethods.push({ name:value.name,id:value.uid,selected:true });
                }else{
                    $scope.data.menuMethods.push({ name:value.name,id:value.uid });
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


        //switching between tables and charts
        $scope.displayTables = {card1:false}
        $scope.changeTable =function(card,value){
            if(value == "table"){
                if(card == "card1"){$scope.displayTables.card1 = true}
            }if(value == "chart"){
                if(card == "card1"){$scope.displayTables.card1 = false}
            }
        };

        $scope.fpCards = [
            {
                title:'Total Health Workers Trained as of '+FPManager.lastMonthWithDataName ,
                description:'Total Health Workers Trained as of'+FPManager.lastMonthWithDataName,
                cardClass:"col s12 m12",
                data:$scope.methods,
                category:'month',
                category1:'quarter',
                icons:angular.copy(portalService.minimalIcons),
                displayTable:false,
                displayMap:false,
                chart:'column',
                yaxisTittle:'# Health Workers Trained',
                visible:'consumption by method',
                chartObject:angular.copy(FPManager.chartObject),
                showLoader:true,
                loadingMessage: "",
                description:'This charts displays the current total number of health workers trained in each FP method, nationally, in the indicated month',
                display_option_1:'You can use this chart to compare the total number of health workers trained in each FP method, at a National level. This provides a high-level overview of which FP methods have larger gaps in number of health workers trained, nationally.',
                display_option_2:'',
                option_2:false,
                indicator_type:'Number',
                numerator:'Total number of health workers that have achieved training competency in each FP method (short-acting, implants, IUCDs, minilap, NSV), Nationally, in the indicated month.',
                denominator:'N/A',
                data_source:' Train Tracker'
            }];


        $scope.getAllMethods = function(){
            var methods = [];
            angular.forEach($scope.methods,function(value){
                methods.push(value.uid);
            });
            return methods.join(";");
        };

        $scope.currentYear = '2016';

        $scope.prepareSeries = function(cardObject,chart){
            cardObject.chartObject.loading = true;
            cardObject.loadingMessage = "Authenticating portal..."
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

                cardObject.chartObject.options.yAxis.title.text = cardObject.yaxisTittle;

                $scope.url = portalService.base+"api/analytics.json?dimension=dx:"+$scope.getAllMethods()+"&dimension=ou:m0frOspS7JY&dimension=pe:"+FPManager.lastMonthWithData+"&displayProperty=NAME";
                cardObject.chartObject.loading = true;

                cardObject.loadingMessage = "Fetching Health Workers Trained Data...";
                $http.get($scope.url).success(function(data){
                    if(data.hasOwnProperty('metaData')){
                        var yAxisItems = [{name:"Tanzania",id:'m0frOspS7JY'}];
                        $scope.titleToUse = "Nationally";
                        cardObject.chartObject.options.title.text = cardObject.title+' - '+ $scope.titleToUse;
                        var xAxisItems = $scope.prepareCategory('methods');
                        /////////////////////////// second chart ////////////////////////////////
                        cardObject.chartObject.options.xAxis.categories = [];
                        cardObject.chartObject.options.xAxis.title= { enabled: false }
                        angular.forEach(yAxisItems, function (value) {
                            cardObject.chartObject.options.xAxis.categories.push(value.name);
                        });
                        $scope.normalseries1 = [];
                        delete cardObject.chartObject.chart;
                        angular.forEach(xAxisItems, function (val) {
                            var serie = [];
                            angular.forEach(yAxisItems, function (value) {
                                var number = $scope.getDataFromUrl(data.rows,value.id, $scope.currentYear, val.id);
                                serie.push(number);
                            });
                            $scope.normalseries1.push({type: 'column', name: val.name, data: serie})
                        });
                        cardObject.chartObject.series = $scope.normalseries1;
                        $scope.chartObject = $scope.normalseries1;
                        $('#container12').highcharts(cardObject.chartObject);
                        $scope.csvdata = FPManager.prepareDataForCSV(cardObject.chartObject);


                        cardObject.chartObject.loading = false
                        cardObject.showLoader = false
                    }else{
                        cardObject.chartObject.loading = false;
                        cardObject.showLoader = false
                    }

                    //$rootScope.showProgressMessage = false;

                });
            });

        };

        $scope.getDataFromUrl  = function(arr,ou,pe,de){

            var num = 0;
            var k = 1;


            k =1
            num =0;
            if(ou == 'none'){
                $.each(arr,function(k,v){
                    if(v[0] == de){
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
                            if (v[0] == de) {
                                if (v[1] == j) {
                                    num += parseInt(v[3]);
                                }
                            }
                        });
                    });
                } else {
                    $.each(arr, function (k, v) {
                        if (v[0] == de) {
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
            if(type == 'month'){
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
                angular.forEach($scope.data.menuMethods,function(value){
                    data.push({'name':value.name,'id':value.id})
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
    })
    .controller("HomeclientMethodsCtrl",function ($rootScope,$scope,$http,portalService,FPManager) {

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
        $scope.data.outOrganisationUnits = [];
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



        $scope.homefpCards = [
            {
                title:'Family Planning clients by Method through Routine Facility-Based Service '+FPManager.lastTwelveMonthName,
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
                description:'This charts displays changes over time in total number of routine facility-based FP clients for each FP method, nationally, in the indicated 12 month period',
                display_option_1:'You can use this chart to compare the total number of clients in each FP method, Nationally, over time. This allows you to compare National-level difference between FP methods in the number of clients served and can help identify unusual variations in the trend over time.',
                display_option_2:'If you select one geography (eg"Kigoma Region") and multiple FP methods, you can compare the total number of clients in each selected FP method, within Kigoma Region, over time. This allows you to compare difference between FP methods in the number of clients served (in a given geography) and can help identify unusual variations in the trend over time.',
                option_2:false,
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
            cardObject.loadingMessage = "Authenticating portal..."
            $.post( portalService.base + "dhis-web-commons-security/login.action?authOnly=true", {
                j_username: "portal", j_password: "Portal123"
            },function() {
                $scope.url = portalService.base+"api/analytics.json?dimension=dx:"+$scope.getAllMethods()+"&dimension=ou:m0frOspS7JY&dimension=pe:201401;201402;201403;201404;201405;201406;201407;201408;201409;201410;201411;201412&displayProperty=NAME";
                cardObject.chartObject.loading = true;
                cardObject.loadingMessage = "Fetching Family Planning clients Data..."
                $http.get($scope.url).success(function(data){
                    if(data.hasOwnProperty('metaData')){
                        var yAxisItems = ['new','returning','total'];
                        var xAxisItems = [];
                        var methodId = [];
                        var methodId1 = [];

                        $scope.titleToUse = "Nationally";
                        cardObject.chartObject.options.title.text = cardObject.title  + " - " +$scope.titleToUse;
                        cardObject.chartObject.options.yAxis.title.text = cardObject.yaxisTittle;

                        angular.forEach($scope.data.menuMethods,function(value){
                            xAxisItems.push(value);
                        });
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
                                    var number = $scope.getDataFromUrl(data.rows,'none', value.id, val.id);
                                    serie.push(number);
                                });
                                $scope.normalseries1.push({type: 'spline', name: val.name, data: serie})
                            });
                            cardObject.chartObject.series = $scope.normalseries1;
                            $('#container11').highcharts(cardObject.chartObject);
                            cardObject.csvdata = FPManager.prepareDataForCSV(cardObject.chartObject);

                        }

                        cardObject.chartObject.loading = false;
                        cardObject.showLoader = false;
                    }else{
                        cardObject.chartObject.loading = false;
                        cardObject.showLoader = false;
                    }

                    cardObject.showLoader = false;

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
            angular.forEach($scope.homefpCards,function(value){
                $scope.prepareSeries(value,value.chart);
            });
        };
        $scope.firstClick();
    })
    .controller("HomeHWParcentageCtrl",function ($rootScope,$scope,$http,$location,$timeout,olData,olHelpers,shared,portalService,FPManager) {
        //lidt of all facilities providing fp
        //https://hmisportal.moh.go.tz/dhis/api/dataSets/TfoI3vTGv1f.json?fields=id,name,organisationUnits[id,name]
        $rootScope.showProgressMessage = false;
        $scope.geographicalZones = FPManager.zones;
        $scope.geoToUse = [];
        $scope.zones = "";
        $scope.selectedMethod = 'EcP5Na7DO0r';
        angular.forEach($scope.geographicalZones.organisationUnitGroups,function(value){
            $scope.zones += value.id+";";
            $scope.geoToUse.push({name:value.name,id:value.id, ticked: true });
        });
        $scope.data = {};
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
        $scope.updateTree();

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

        $scope.selectOnly1Or2 = function(item, selectedItems) {
            if (selectedItems  !== undefined && selectedItems.length >= 7) {
                return false;
            } else {
                return true;
            }
        };

        $scope.changeMethod = function(data){
            if(data == "all"){

            }else{
                $scope.updateTree();
            }
        };
        $scope.selectedMethod = 't8vQoqdY0en';


        //switching between tables and charts
        $scope.displayTables = {card1:false,card2:false,card3:false}
        $scope.changeTable =function(card,value){
            if(value == "table"){
                if(card == "card1"){$scope.displayTables.card1 = true}
                if(card == "card2"){$scope.displayTables.card2 = true}
                if(card == "card3"){$scope.displayTables.card3 = true}
            }if(value == "chart"){
                if(card == "card1"){$scope.displayTables.card1 = false}
                if(card == "card2"){$scope.displayTables.card2 = false}
                if(card == "card3"){$scope.displayTables.card3 = false}
            }
        };

        //FP method Defination
        $scope.FPmethods = [
            {'name':'Short Acting','uid':'iWDh2fUbRTJ'},
            {'name':'Implants','uid':'Igxe3yXGEoW'},
            {'name':'IUCDs','uid':'t8vQoqdY0en'},
            {'name':'NSV','uid':'BLqgpawRwGN'},
            {'name':'Mini Lap','uid':'acbet8SSjCY'}
        ];
        $scope.updateMethod = function(){
            $scope.data.menuMethods = [];
            angular.forEach($scope.FPmethods,function(value){
                if(value.name == 'Implants'){
                    $scope.data.menuMethods.push({name:value.name,id:value.uid,selected:true });
                }else{
                    $scope.data.menuMethods.push({name:value.name,id:value.uid });
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

        $scope.getMethodName = function(uid){
            var name  = ""
            angular.forEach($scope.FPmethods, function (value) {
                if(value.uid == uid){

                    name = value.name;
                }
            });

            return name;
        };
        $scope.findValue = function(arr,ou,pe,dx,type){

            var amount = 0;

            return amount;
        }

        $scope.orgUnitType = function(arr,type){
            var name = false;
            angular.forEach(arr,function(value){
                if(value.name == type){
                    name = true;
                }
            });
            return name;
        };

        $scope.getNumberPerOu = function(arr,ou,arr2,pe,type){
            var count = 0;
            angular.forEach(arr,function(value){
                angular.forEach(value.ancestors, function (val) {
                    if ((ou.indexOf(';') > -1)) {
                        var orgArr = ou.split(";");
                        $.each(orgArr, function (c, j) {
                            if (j == val.id) {
                                count++;
                            }
                        });
                    } else {
                        if (ou == val.id) {
                            count++;
                        }
                    }
                });
            });
            var num = $scope.getDataFromUrl(arr2,ou,pe);
            var percent = (num/count)*100;
            return percent.toFixed(2);
        };



        $scope.getNumberPerOu1 = function(arr,ou,arr2,pe,method){
            var count = 0;
            angular.forEach(arr,function(value){
                angular.forEach(value.ancestors, function (val) {
                    if ((ou.indexOf(';') > -1)) {
                        var orgArr = ou.split(";");
                        $.each(orgArr, function (c, j) {
                            if (j == val.id) {
                                count++;
                            }
                        });
                    } else {
                        if (ou == val.id) {
                            count++;
                        }
                    }
                });
            });

            var num = $scope.getDataFromUrl1(arr2,ou,pe,method);
            var percent = (num/count)*100;
            return percent.toFixed(2);
        };


        $scope.getSelectedValues = function(){
            if($scope.data.outOrganisationUnits.length === 0){
                alert("no orgunit selected")
            }else
            {
                $scope.HWcardObject = {
                    showLoader:true,
                    loadingMessage: "",
                    description:'This charts displays the percentage of all facilities, nationally, that provided each FP method (as a proportion of all facilities that are eligible to provide FP services), in the indicated 12 month period',
                    display_option_1:'You can use this chart to compare the percentage of all facilities that provided each FP method over the indicated 12 month-period, nationally. This allows you to monitor high-level changes over time in service provision across FP method types.',
                    display_option_2:'',
                    option_2:false,
                    indicator_type:'Percentage',
                    numerator:'Total number of all facilities nationally, that are eligible to provide FP services and that recorded at least one client (of any age, new or returning) through routine/facility-based services, for each FP method  (oral pills, male condoms, female condoms, injectables, implants, IUCDs, minilap, NSV), for each month in the indicated 12 month period .',
                    denominator:'Total number of facilities, nationally, that are eligible to provide FP services, for each month in the indicated 12 month period',
                    data_source:'DHIS-2 FP reporting Tool'
                };
                $scope.HWcardObject.chartObject = angular.copy(FPManager.chartObject);
                $scope.HWcardObject.chartObject.loading = true;

                $scope.HWcardObject.loadingMessage = "Authenticating portal..."
                $.post( portalService.base + "dhis-web-commons-security/login.action?authOnly=true", {
                    j_username: "portal", j_password: "Portal123"
                },function() {

                    var orgUnits = [{id:'m0frOspS7JY',name:'Tanzania'}];

                    var methodss = [];
                    angular.forEach($scope.data.menuMethods,function(method){
                        methodss.push({'name':method.name,'id':method.id});
                    });





                    $scope.HWcardObject.chartObject.options.yAxis.title.text ="% of Facilities";


                    $scope.HWcardObject.chartObject.options.yAxis.labels = {
                        formatter: function () {
                            return this.value + '%';
                        }
                    };

                    var periods = [];

                    $scope.titleToUse = "Nationally";
                    var periods = $scope.prepareCategory('month');

                    angular.forEach(periods, function (val) {
                        $scope.HWcardObject.chartObject.options.xAxis.categories.push(val.name);
                    });

                    $scope.HWcardObject.chartObject.options.title.text ="Percent of facilities providing FP over time - "+$scope.titleToUse+" "+FPManager.lastTwelveMonthName;
                    $rootScope.progressMessage = "Fetching data please wait ...";
                    $rootScope.showProgressMessage = true;
                    $scope.HWcardObject.loadingMessage = "Getting Facility List...";
                    FPManager.getFPFacilityList().then(function(data){
                        $scope.HWcardObject.loadingMessage = "Fetching Facilities Data...";
                        $http.get(portalService.base+'api/sqlViews/eq83I34KW4K/data.json?var=types:Hospital&var=month1:201401&var=month2:201402&var=month3:201403&var=month4:201404&var=month5:201405&var=month6:201406&var=month7:201407&var=month8:201408&var=month9:201409&var=month10:201410&var=month11:201411&var=month12:201412').success(function(val1){
                            $rootScope.showProgressMessage = false;
                            angular.forEach(methodss, function (yAxis) {
                                var serie = [];
                                angular.forEach(periods, function (xAxis) {
                                    serie.push(parseFloat($scope.getNumberPerOu1(data.organisationUnits,$scope.data.outOrganisationUnits[0].id,val1.rows,xAxis.id,yAxis.name)));
                                });
                                $scope.HWcardObject.chartObject.series.push({type: 'spline', name: yAxis.name, data: serie})
                            });
                            $scope.HWcardObject.csvdata = FPManager.prepareDataForCSV($scope.HWcardObject.chartObject);
                            $scope.HWcardObject.showLoader = false
                            $scope.HWcardObject.chartObject.loading = false;
                        });


                    },function(){
                        console.log("Error getting data");
                        $scope.HWcardObject.showLoader = false
                    });
                });
            }

        };
        $scope.data.outOrganisationUnits = [{name:'Tanzania',id:'m0frOspS7JY'}];
        $scope.getSelectedValues();





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
        $scope.prepareCategory = function(type){
            var data = [];
            var per = $scope.selectedPeriod;
            if(type == 'zones'){
                data.push({'name':"Tanzania",'id':"m0frOspS7JY"});
                angular.forEach($scope.data.outOrganisationUnits,function(orgUnit){
                    var name = orgUnit.name;
                    if(name.indexOf("Zone") > -1){
                        var names = [];
                        angular.forEach(orgUnit.children,function(regions){
                            names.push(regions.id);
                        });
                        data.push({'name':orgUnit.name,'id':names.join(";")});
                    }else{
                        if(orgUnit.id !== 'm0frOspS7JY'){
                            data.push({'name':orgUnit.name,'id':orgUnit.id});
                        }

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
                data.push({'name':'Nov '+per,'id':per+'11'});
                data.push({'name':'Dec '+per,'id':per+'12'});
            }if(type == 'methods'){
                angular.forEach()
            }

            return data;
        };

        $scope.getDataFromUrl  = function(arr,ou,pe){

            var num = 0;
            if(ou == "m0frOspS7JY" ){
                $.each(arr, function (k, v) {
                    num += parseInt(v[2]);
                });
            }else{
                if (ou.indexOf(';') > -1) {
                    var orgArr = ou.split(";");
                    var i = 0;
                    $.each(orgArr, function (c, j) {
                        i++;
                        $.each(arr, function (k, v) {
                            if (v[0] == j || v[1] == j) {
                                num += parseInt(v[2]);
                            }
                        });
                    });
                } else {
                    $.each(arr, function (k, v) {
                        if (v[0] == ou || v[1] == ou) {
                            num += parseInt(v[2]);
                        }
                    });
                }
            }
            return num;
        }
        $scope.getDataFromUrl1  = function(arr,ou,pe,method){

            var index = 0;
            if(method == 'Short Acting'){
                index = 3;
            }if(method == 'Implants'){
                index = 4;
            }if(method == 'IUCDs'){
                index = 5;
            }if(method == 'NSV'){
                index = 6;
            }if(method == 'Mini Lap'){
                index = 7;
            }

            var count = 0;
            var num = 0;
            if(ou == "m0frOspS7JY" ){
                $.each(arr, function (k, v) {
                    if(v[index] !== ""){
                        if(v[2] == pe){
                            num += parseInt(v[index]);
                            count++;
                        }
                    }
                });
            }else{
                if (ou.indexOf(';') > -1) {
                    var orgArr = ou.split(";");
                    var i = 0;
                    $.each(orgArr, function (c, j) {
                        i++;
                        $.each(arr, function (k, v) {
                            if (v[0] == j || v[1] == j) {
                                if(v[index] !== ""){
                                    if(v[2] == pe){
                                        num += parseInt(v[index]);
                                    }
                                }
                            }
                        });
                    });
                } else {
                    $.each(arr, function (k, v) {
                        if (v[0] == ou || v[1] == ou) {
                            if(v[index] !== ""){
                                if(v[2] == pe){
                                    num += parseInt(v[index]);
                                }
                            }
                        }
                    });
                }
            }

            return num;
        }
    })
    .controller("Homestockout1Ctrl",function ($rootScope,$scope,$http,$location,$timeout,olData,olHelpers,shared,portalService,FPManager) {
        //lidt of all facilities providing fp
        //https://hmisportal.moh.go.tz/dhis/api/dataSets/TfoI3vTGv1f.json?fields=id,name,organisationUnits[id,name]
        $rootScope.showProgressMessage = false;
        $scope.geographicalZones = FPManager.zones;
        $scope.geoToUse = [];
        $scope.zones = "";
        $scope.selectedMethod = 'EcP5Na7DO0r';
        angular.forEach($scope.geographicalZones.organisationUnitGroups,function(value){
            $scope.zones += value.id+";";
            $scope.geoToUse.push({name:value.name,id:value.id, ticked: true });
        });
        $scope.data = {};
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
        $scope.updateTree();

        $scope.selectOnly1Or2 = function(item, selectedItems) {
            if (selectedItems  !== undefined && selectedItems.length >= 7) {
                return false;
            } else {
                return true;
            }
        };

        $scope.changeMethod = function(data){
            if(data == "all"){

            }else{
                $scope.updateTree();
            }
        };
        $scope.selectedMethod = 'EcP5Na7DO0r';

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
                data.push({'name':'Nov '+per,'id':per+'11'});
                data.push({'name':'Dec '+per,'id':per+'12'});
            }if(type == 'methods'){
                data.push({'name':'client <20 Male Condoms','id':'W74wyMy1mp0'},
                    {'name':'client <20 Female Condoms','id':'p8cgxI3yPx8'},
                    {'name':'Oral Pills','id':'aSJKs4oPZAf'},
                    {'name':'Injectables','id':'LpkdcaLc4I9'},
                    {'name':'Implants','id':'p14JdJaG2aC'},
                    {'name':'IUCDs','id':'GvbkEo6sfSd'},
                    {'name':'Natural FP','id':'QRCRjFreECE'});
            }

            return data;
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
            {'name':'All Clients','uid':'EcP5Na7DO0r'},
            {'name':'Natural FP','uid':'GGpsoh0DX6T'}
        ];
        $scope.updateMethod = function(){
            $scope.data.menuMethods = [];
            angular.forEach($scope.FPmethods,function(value){
                $scope.data.menuMethods.push({name:value.name,id:value.uid });
            });
        };
        $scope.updateMethod();

        $scope.selectOnly1Or3 = function(item, selectedItems) {
            if (selectedItems  !== undefined && selectedItems.length >= 7) {
                return false;
            } else {
                return true;
            }
        };


        //switching between tables and charts
        $scope.displayTables = {card1:false}
        $scope.changeTable =function(card,value){
            if(value == "table"){
                if(card == "card1"){$scope.displayTables.card1 = true}
            }if(value == "chart"){
                if(card == "card1"){$scope.displayTables.card1 = false}
            }
        };

        $scope.getMethodName = function(uid){
            var name  = ""
            angular.forEach($scope.FPmethods, function (value) {
                if(value.uid == uid){

                    name = value.name;
                }
            });

            return name;
        };
        $scope.findValue = function(arr,ou,pe,dx,type){

            var amount = 0;

            return amount;
        };

        $scope.getNumberPerOu = function(ou,arr2,pe){
            var num = $scope.getDataFromUrl(arr2,ou,pe);
            var percent = (num.trained == 0)?0:(num.trainedAndstockOut/num.trained)*100;
            return percent.toFixed(2);
        };


        $scope.getSelectedValues = function(){
            if($scope.data.outOrganisationUnits.length === 0){
                alert("no orgunit selected")
            }else
            {
                $scope.StockOutCard = {
                    showLoader:true,
                    loadingMessage: "",
                    description:'This charts displays changes over time in the percentage of facilities, nationally, that have a trained health worker in short-acting methods AND reported stock-out of either pills or injectables (as a proportion of all facilities that are eligible to provide FP services), in the indicated 12 month period',
                    display_option_1:'You can use this chart to monitor changes over time (an unusual variations in trends) of percentage of facilities that have at least on health worker trained in short-acting methods AND were stocked out of pills or injectables, Nationally. ',
                    display_option_2:'',
                    option_2:false,
                    indicator_type:'Percentage',
                    numerator:'Number of all facilities (given the FP Reporting Template that reported management of contraceptive pills or injectables in the Tracer Medicines Reporting Form for the given month and that experienced a stock out of contraceptive pills or injectables for either < 1 week, 1-4 weeks or > 4 weeks in the given month in the selected geographies to date in the given month for each month over the preceeding 12 month period',
                    denominator:'Number of all facilities given the FP Reporting Template that reported management of contraceptive pills or injectables in the Tracer Medicines Reporting Form for the given month in the selected geographies to date in the given month for each month over the preceeding 12 month period',
                    data_source:' TrainTracker and DHIS-2 Tracer Commodity Tool'
                };
                $scope.StockOutCard.chartObject = angular.copy(FPManager.chartObject);
                $scope.StockOutCard.chartObject.loading = true;
                $scope.StockOutCard.loadingMessage = "Authenticating portal...";
                $.post( portalService.base + "dhis-web-commons-security/login.action?authOnly=true", {
                    j_username: "portal", j_password: "Portal123"
                },function() {
                    var orgUnits = [];
                    angular.forEach($scope.data.outOrganisationUnits,function(orgUnit){
                        var name = orgUnit.name;
                        if(name.indexOf("Zone") > -1){
                            var names = [];
                            angular.forEach(orgUnit.children,function(regions){
                                names.push(regions.id);
                            });
                            orgUnits.push({'name':orgUnit.name,'id':names.join(";")});
                        }else{
                            orgUnits.push({'name':orgUnit.name,'id':orgUnit.id});
                        }
                    });


                    $scope.StockOutCard.chartObject.options.title.text ="Percent All Facilities with a Health Worker Trained in Short-Acting Methods but Stocked Out of Injectables "+FPManager.lastTwelveMonthName;
                    $scope.StockOutCard.chartObject.options.yAxis.title.text ="% of Facilities";
                    var orgUnits = [{name:'Tanzania',id:'m0frOspS7JY'}];
                    var periods = $scope.prepareCategory('month');

                    angular.forEach(periods, function (val) {
                        $scope.StockOutCard.chartObject.options.xAxis.categories.push(val.name);
                    });


                    $rootScope.progressMessage = "Fetching data please wait ...";
                    $rootScope.showProgressMessage = true;
                    $scope.StockOutCard.loadingMessage = "Fetching Stock out Information ..."
                    //$http.get(portalService.base+'api/sqlViews/dLJMOOQYLZS/data.json?var=month1:201401&var=month2:201402&var=month3:201403&var=month4:201404&var=month5:201405&var=month6:201406&var=month7:201407&var=month8:201408&var=month9:201409&var=month10:201410&var=month11:201411&var=month12:201412').success(function(val1){
                    $http.get(portalService.base+'api/sqlViews/N9UEcr3rwUv/data.json?var=month1:201401&var=month2:201402&var=month3:201403&var=month4:201404&var=month5:201405&var=month6:201406&var=month7:201407&var=month8:201408&var=month9:201409&var=month10:201410&var=month11:201411&var=month12:201412').success(function(val1){
                        $rootScope.showProgressMessage = false;
                        angular.forEach(orgUnits, function (yAxis) {
                            var serie = [];
                            angular.forEach(periods, function (xAxis) {
                                serie.push(parseFloat($scope.getNumberPerOu(yAxis.id,val1.rows,xAxis.id)));
                            });
                            $scope.StockOutCard.chartObject.series.push({type: 'spline', name: yAxis.name, data: serie})
                        });
                        $scope.StockOutCard.csvdata = FPManager.prepareDataForCSV($scope.StockOutCard.chartObject);
                        $scope.StockOutCard.showLoader = false;
                        $scope.StockOutCard.chartObject.loading = false;
                    });
                });
            }

        };
        $scope.data.outOrganisationUnits = [{name:'Tanzania',id:'m0frOspS7JY'}];
        $scope.getSelectedValues();





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
                data.push({'name':'Nov '+per,'id':per+'11'});
                data.push({'name':'Dec '+per,'id':per+'12'});
            }if(type == 'methods'){
                data.push({'name':'client <20 Male Condoms','id':'W74wyMy1mp0'},
                    {'name':'client <20 Female Condoms','id':'p8cgxI3yPx8'},
                    {'name':'Oral Pills','id':'aSJKs4oPZAf'},
                    {'name':'Injectables','id':'LpkdcaLc4I9'},
                    {'name':'Implants','id':'p14JdJaG2aC'},
                    {'name':'IUCDs','id':'GvbkEo6sfSd'},
                    {'name':'Natural FP','id':'QRCRjFreECE'});
            }

            return data;
        };

        $scope.getDataFromUrl  = function(arr,ou,pe){
            //console.log(ou+"---"+pe);
            var num = 0; var num1 = 0;
            if(ou == "m0frOspS7JY" ){
                $.each(arr, function (k, v) {
                    if(v[3] == pe){
                        if(v[4] == "1" && v[5] == "1"){
                            num ++;
                        }
                        if(v[5] == "1"){
                            num1 ++;
                        }
                    }
                });
            }else{
                if (ou.indexOf(';') > -1) {
                    var orgArr = ou.split(";");
                    var i = 0;
                    $.each(orgArr, function (c, j) {
                        i++;
                        $.each(arr, function (k, v) {
                            if (v[0] == j || v[1] == j) {
                                if(v[3] == pe){
                                    if(v[4] == "1" && v[5] == "1"){
                                        num ++;
                                    }
                                    if(v[5] == "1"){
                                        num1 ++;
                                    }
                                }
                            }
                        });
                    });
                } else {
                    $.each(arr, function (k, v) {
                        if (v[0] == ou || v[1] == ou) {
                            if(v[3] == pe){
                                if(v[4] == "1" && v[5] == "1"){
                                    num ++;
                                }
                                if(v[5] == "1"){
                                    num1 ++;
                                }
                            }

                        }
                    });
                }
            }
            return {trainedAndstockOut:num,trained:num1};
        }


    });

function preparePeriod(period){

    return ""+period+"01;"+period+"02;"+period+"03;"+period+"04;"+period+"05;"+period+"06;"+period+"07;"+period+"08;"+period+"09;"+period+"10;"+period+"11;"+period+"12";
}



