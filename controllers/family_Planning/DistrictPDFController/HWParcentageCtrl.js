
/**
 * Created by kelvin on 1/11/16.
 */
angular.module("hmisPortal")
    .config(function($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    })
    .controller("HWParcentageCtrl",function ($rootScope,$scope,$http,$location,$timeout,olData,olHelpers,shared,portalService,FPManager,$filter) {
        $scope.regionUid = $location.search().uid;
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
            var item = {  name: type }

            angular.forEach(arr,function(value){
                if ($scope.orgUnitType(value.organisationUnitGroups,type)) {
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
                }
            });
            var num = $scope.getDataFromUrl(arr2,ou,pe);
            var percent = (num/count)*100;
            return percent.toFixed(2);
        };



        $scope.getNumberPerOu1 = function(arr,ou,arr2,pe,type,method){
            var count = 0;
            angular.forEach(arr,function(value){
                if ($scope.orgUnitType(value.organisationUnitGroups,type)) {
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
                }
            });
            var num = $scope.getDataFromUrl1(arr2,ou,pe,method);
            var percent = (num/count)*100;
            return percent.toFixed(2);
        };

        $scope.getNumberPerOu2 = function(arr,ou,arr2,pe,method){
            var count = 0;
            angular.forEach(arr,function(value){
                    angular.forEach(value.ancestors, function (val) {
                        if (ou == val.id) {
                            count++;
                        }
                    });
            });
            var num = $scope.getDataFromUrl2(arr2,ou,pe,method);
            var percent = (num/count)*100;
            return percent.toFixed(2);
        };

        $scope.getFacilityForMethod = function(type,hosptal,hcenter,dispensary){
            var arr = [];
            var index = 0; var checkIndex = 0;
            if(type == 'Short Acting'){
                index = 8; checkIndex = 9;
            }if(type == 'Implants'){
                index = 6; checkIndex = 7;
            }if(type == 'IUCDs'){
                index = 10; checkIndex = 11;
            }if(type == 'NSV'){
                index = 12; checkIndex = 13;
            }if(type == 'Mini Lap'){
                index = 14; checkIndex = 15;
            }
            $.each(hosptal, function (k, v) {
                if (v[0] == $scope.regionUid || v[1] == $scope.regionUid) {
                    if(v[index] == "" && v[checkIndex] == "1"){
                        if(arr.indexOf(v[4]) == -1){
                            arr.push(v[4])
                        }

                    }
                }
            });
            $.each(hcenter, function (k, v) {
                if (v[0] == $scope.regionUid || v[1] == $scope.regionUid) {
                    if(v[index] == "" && v[checkIndex] == "1"){
                        if(arr.indexOf(v[4]) == -1){
                            arr.push(v[4])
                        }

                    }
                }
            });
            $.each(dispensary, function (k, v) {
                if (v[0] == $scope.regionUid || v[1] == $scope.regionUid) {
                    if(v[index] == "" && v[checkIndex] == "1"){
                        if(arr.indexOf(v[4]) == -1){
                            arr.push(v[4])
                        }
                    }
                }
            });
            return arr;
        };


        $scope.getSelectedValues = function(){
            if($scope.data.outOrganisationUnits.length === 0){
                alert("no orgunit selected")
            }else
            {
                $.post( portalService.base + "dhis-web-commons-security/login.action?authOnly=true", {
                    j_username: "portal", j_password: "Portal123"
                },function() {
                    $http.get(portalService.base + "api/organisationUnits/" + $scope.regionUid + ".json?fields=name").success(function (region) {
                        $scope.name = region.name;
                        var orgUnits = [{name:'Hospital'},{name:'Health Center'},{name:'Dispensary'}];

                        var methodss = [];
                        angular.forEach($scope.data.menuMethods,function(method){
                            methodss.push({'name':method.name,'id':method.id});
                        });

                        var chartObject = angular.copy(portalService.chartObject);


                        chartObject.xAxis.labels.rotation = 0;
                        chartObject.legend = {enabled : false};
                        chartObject.yAxis.max = 100;
                        chartObject.yAxis.labels = {
                            formatter: function () {
                                return this.value + '%';
                            }
                        };

                        var periods = [];

                        $scope.titleToUse = region.name;
                        angular.forEach(orgUnits,function(value){
                            periods.push({name:value.name,id:value.id})
                        });
                        //chartObject.title.text ="Percent of Facilities with 2 or more Health Workers Trained in - "+$scope.titleToUse;
                        var chart1 = angular.copy(chartObject);
                        var chart2 = angular.copy(chartObject);
                        var chart3 = angular.copy(chartObject);
                        var chart4 = angular.copy(chartObject);
                        var chart5 = angular.copy(chartObject);
                        chart1.yAxis.title.text ="% of Facilities";
                        chart5.legend = {
                            align: 'right',
                            enabled: true,
                            verticalAlign: 'top',
                            layout: 'vertical',
                            x: 0,
                            y: 100,
                            itemMarginTop: 10,
                            itemMarginBottom: 10
                        };

                        //define xaxis
                        chart1.xAxis.categories.push('NSV');
                        chart2.xAxis.categories.push('Min Lap');
                        chart3.xAxis.categories.push('Short Acting Methods');
                        chart4.xAxis.categories.push('IUCD');
                        chart5.xAxis.categories.push('Implants');

                        chartObject.loading = true;
                        $rootScope.progressMessage = "Fetching data please wait ...";
                        $rootScope.showProgressMessage = true;
                        $http.get(portalService.base+'api/dataSets/TfoI3vTGv1f.json?fields=organisationUnits[name,organisationUnitGroups[name],ancestors[id]]').success(function(data){

                            //charts local uid = KIuvtXj2Dt2
                            $http.get(portalService.base+'api/sqlViews/Aj6aLkjr7dk/data.json?var=types:Hospital&var=month:'+FPManager.lastMonthWithOtherData ).success(function(hosptal){
                                $http.get(portalService.base+'api/sqlViews/Aj6aLkjr7dk/data.json?var=types:Health Center&var=month:'+FPManager.lastMonthWithOtherData ).success(function(hcenter){
                                    $http.get(portalService.base+'api/sqlViews/Aj6aLkjr7dk/data.json?var=types:Dispensary&var=month:'+FPManager.lastMonthWithOtherData ).success(function(dispensary){

                                        $scope.nsvData = $scope.getFacilityForMethod('NSV',hosptal.rows,hcenter.rows,dispensary.rows);
                                        $scope.miniLapData = $scope.getFacilityForMethod('Mini Lap',hosptal.rows,hcenter.rows,dispensary.rows);
                                        $scope.iucdData = $scope.getFacilityForMethod('IUCDs',hosptal.rows,hcenter.rows,dispensary.rows);
                                        $scope.implantData = $scope.getFacilityForMethod('Implants',hosptal.rows,hcenter.rows,dispensary.rows);
                                        $scope.shortActingData = $scope.getFacilityForMethod('Short Acting',hosptal.rows,hcenter.rows,dispensary.rows);

                                        angular.forEach(orgUnits, function (xAxis) {


                                            var serie1 = [];serie2 = [];serie3 = [];serie4 = [];serie5 = [];
                                            if(xAxis.name == "Hospital"){
                                                serie1.push(parseFloat($scope.getNumberPerOu1(data.organisationUnits, $scope.regionUid, hosptal.rows, $scope.regionUid, xAxis.name, 'NSV')));
                                                serie2.push(parseFloat($scope.getNumberPerOu1(data.organisationUnits, $scope.regionUid, hosptal.rows, $scope.regionUid, xAxis.name, 'Mini Lap')));
                                                serie3.push(parseFloat($scope.getNumberPerOu1(data.organisationUnits, $scope.regionUid, hosptal.rows, $scope.regionUid, xAxis.name, 'Short Acting')));
                                                serie4.push(parseFloat($scope.getNumberPerOu1(data.organisationUnits, $scope.regionUid, hosptal.rows, $scope.regionUid, xAxis.name, 'IUCDs')));
                                                serie5.push(parseFloat($scope.getNumberPerOu1(data.organisationUnits, $scope.regionUid, hosptal.rows, $scope.regionUid, xAxis.name, 'Implants')));
                                            }if(xAxis.name == "Health Center"){
                                                serie1.push(parseFloat($scope.getNumberPerOu1(data.organisationUnits, $scope.regionUid, hcenter.rows, $scope.regionUid, xAxis.name, 'NSV')));
                                                serie2.push(parseFloat($scope.getNumberPerOu1(data.organisationUnits, $scope.regionUid, hcenter.rows, $scope.regionUid, xAxis.name, 'Mini Lap')));
                                                serie3.push(parseFloat($scope.getNumberPerOu1(data.organisationUnits, $scope.regionUid, hcenter.rows, $scope.regionUid, xAxis.name, 'Short Acting')));
                                                serie4.push(parseFloat($scope.getNumberPerOu1(data.organisationUnits, $scope.regionUid, hcenter.rows, $scope.regionUid, xAxis.name, 'IUCDs')));
                                                serie5.push(parseFloat($scope.getNumberPerOu1(data.organisationUnits, $scope.regionUid, hcenter.rows, $scope.regionUid, xAxis.name, 'Implants')));
                                            }if(xAxis.name == "Dispensary"){
                                                serie1.push(parseFloat($scope.getNumberPerOu1(data.organisationUnits, $scope.regionUid, dispensary.rows, $scope.regionUid, xAxis.name, 'NSV')));
                                                serie2.push(parseFloat($scope.getNumberPerOu1(data.organisationUnits, $scope.regionUid, dispensary.rows, $scope.regionUid, xAxis.name, 'Mini Lap')));
                                                serie3.push(parseFloat($scope.getNumberPerOu1(data.organisationUnits, $scope.regionUid, dispensary.rows, $scope.regionUid, xAxis.name, 'Short Acting')));
                                                serie4.push(parseFloat($scope.getNumberPerOu1(data.organisationUnits, $scope.regionUid, dispensary.rows, $scope.regionUid, xAxis.name, 'IUCDs')));
                                                serie5.push(parseFloat($scope.getNumberPerOu1(data.organisationUnits, $scope.regionUid, dispensary.rows, $scope.regionUid, xAxis.name, 'Implants')));
                                            }
                                            chart1.series.push({type: 'column', name: xAxis.name, data: serie1});
                                            chart2.series.push({type: 'column', name: xAxis.name, data: serie2});
                                            chart3.series.push({type: 'column', name: xAxis.name, data: serie3});
                                            chart4.series.push({type: 'column', name: xAxis.name, data: serie4});
                                            chart5.series.push({type: 'column', name: xAxis.name, data: serie5});
                                        });
                                        $('#parChar1').highcharts(chart1);
                                        $('#parChar2').highcharts(chart2);
                                        $('#parChar3').highcharts(chart3);
                                        $('#parChar4').highcharts(chart4);
                                        $('#parChar5').highcharts(chart5);
                                        $scope.csvdata = portalService.prepareDataForCSV(chartObject);
                                        $scope.pchart = chartObject;
                                    });
                                });

                            });

                        });

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
        };
        $scope.getDataFromUrl1  = function(arr,ou,pe,method){

            var index = 0; var checkIndex = 0;
            if(method == 'Short Acting'){
                index = 8; checkIndex = 9;
            }if(method == 'Implants'){
                index = 6; checkIndex = 7;
            }if(method == 'IUCDs'){
                index = 10; checkIndex = 11;
            }if(method == 'NSV'){
                index = 12; checkIndex = 13;
            }if(method == 'Mini Lap'){
                index = 14; checkIndex = 15;
            }


            var num = 0;
            if(ou == "m0frOspS7JY" ){
                $.each(arr, function (k, v) {
                    if(v[index] == "" && v[checkIndex] == "1"){
                        num ++;
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
                                if(v[index] == "" && v[checkIndex] == "1"){
                                    num ++;
                                }
                            }
                        });
                    });
                } else {
                    $.each(arr, function (k, v) {
                        if (v[0] == ou || v[1] == ou) {
                            if(v[index] == "" && v[checkIndex] == "1"){
                                num ++;
                            }
                        }
                    });
                }
            }

            return num;
        };
        $scope.getDataFromUrl2  = function(arr,ou,pe,method){

            var index = 0;
            if(method == 'Short Acting'){
                index = 4;
            }if(method == 'Implants'){
                index = 5;
            }if(method == 'IUCDs'){
                index = 6;
            }if(method == 'NSV'){
                index = 7;
            }if(method == 'Mini Lap'){
                index = 8;
            }
            var num = 0;
                $.each(arr, function (k, v) {
                    if (v[0] == ou || v[2] == ou) {
                        console.log(ou)
                        if(v[index] !== ""){
                            num += parseInt(v[index]);
                        }
                    }
                });
            return num;
        }


    });





function preparePeriod(period){

    return ""+period+"01;"+period+"02;"+period+"03;"+period+"04;"+period+"05;"+period+"06;"+period+"07;"+period+"08;"+period+"09;"+period+"10;"+period+"11;"+period+"12;"+period+"Q1;"+period+"Q2;"+period+"Q3;"+period+"Q4";
}
