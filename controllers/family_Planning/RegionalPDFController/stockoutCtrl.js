
/**
 * Created by kelvin on 1/11/16.
 */
angular.module("hmisPortal")
    .config(function($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    })
    .controller("stockoutCtrl",function ($rootScope,$scope,$http,$location,$timeout,olData,olHelpers,shared,portalService,FPManager,$filter) {
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
                data = FPManager.getLastTwelveMonthList(FPManager.lastMonthWithData);
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

        $scope.getNumberPerOu = function(arr,ou,arr2,pe){
            var count = 0;
            angular.forEach(arr,function(value){
                angular.forEach(value.ancestors,function(val){
                    if ((ou.indexOf(';') > -1)) {
                        var orgArr = ou.split(";");
                        $.each(orgArr, function (c, j) {
                            if(j == val.id){
                                count++;
                            }
                        });
                    } else {
                        if(ou == val.id){
                            count++;
                        }
                    }
                });
            });
            var num = $scope.getDataFromUrl(arr2,ou,pe);
            var percent = (num/count)*100;
            return percent.toFixed(1);
        };

        $scope.getNumberPerOu1 = function(arr,ou,arr2,pe,type){
            var count = 0;
            angular.forEach(arr,function(value){
                angular.forEach(value.ancestors,function(val){
                    if ((ou.indexOf(';') > -1)) {
                        var orgArr = ou.split(";");
                        $.each(orgArr, function (c, j) {
                            if(j == val.id){
                                count++;
                            }
                        });
                    } else {
                        if(ou == val.id){
                            count++;
                        }
                    }
                });
            });
            var num = $scope.getDataFromUrl1(arr2,ou,pe,type);
            var percent = (num/count)*100;
            return percent.toFixed(1);
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


                        var orgUnits = [];
                        angular.forEach($scope.data.outOrganisationUnits, function (orgUnit) {
                            var name = orgUnit.name;
                            if (name.indexOf("Zone") > -1) {
                                var names = [];
                                angular.forEach(orgUnit.children, function (regions) {
                                    names.push(regions.id);
                                });
                                orgUnits.push({'name': orgUnit.name, 'id': names.join(";")});
                            } else {
                                orgUnits.push({'name': orgUnit.name, 'id': orgUnit.id});
                            }
                        });

                        var chartObject = angular.copy(portalService.chartObject);

                        chartObject.title.text = "Percent of all facilities stocked out of pills or injectables for any number of days in the month, "+FPManager.getlastTwelveMonthName(FPManager.lastMonthWithData);
                        chartObject.yAxis.title.text = "% of facilities";
                        var orgUnits = [{id: $scope.regionUid, name: region.name}];
                        var periods = $scope.prepareCategory('month');

                        angular.forEach(periods, function (val) {
                            chartObject.xAxis.categories.push(val.name);
                        });

                        chartObject.loading = true;
                        $rootScope.progressMessage = "Fetching data please wait ...";
                        $rootScope.showProgressMessage = true;
                        FPManager.getFPFacilityList().then(function (data) {
                            //stockout list table
                            $http.get(portalService.base+'api/sqlViews/vj6E3KoFP28/data.json?'+FPManager.lastTwelveMonthForSql(FPManager.lastMonthWithData)).success(function(facilities){
                                var injecatbleRegions = {};
                                var oralRegions = {};
                                var injecatbleData = [];
                                var oralData = [];
                                angular.forEach(facilities.rows,function(data){
                                    if(data[0] == $scope.regionUid){
                                        injecatbleRegions[data[3]] = data[1];
                                        oralRegions[data[3]] = data[1];
                                    }

                                });
                                var orderBy = $filter('orderBy');
                                angular.forEach(injecatbleRegions, function(value, key) {  injecatbleData.push({name:key ,value:parseFloat($scope.getNumberPerOu1(data.organisationUnits, value, facilities.rows,FPManager.lastMonthWithData,'Injectable'))} ) });
                                angular.forEach(oralRegions, function(value, key) { oralData.push({name:key ,value:parseFloat($scope.getNumberPerOu1(data.organisationUnits, value, facilities.rows,FPManager.lastMonthWithData,'Oral'))} ) });

                                injecatbleData = orderBy(injecatbleData,'value',true);
                                oralData = orderBy(oralData,'value',true);
                                $scope.stockOutData = [
                                    {oral:'Pills',injectable:'Injectables'},
                                    {oral:oralData[0].name+"( "+oralData[0].value +"% )",injectable:injecatbleData[0].name+"( "+injecatbleData[0].value +"% )"},
                                    {oral:oralData[1].name+"( "+oralData[1].value +"% )",injectable:injecatbleData[1].name+"( "+injecatbleData[1].value +"% )"},
                                    {oral:oralData[2].name+"( "+oralData[2].value +"% )",injectable:injecatbleData[2].name+"( "+injecatbleData[2].value +"% )"},
                                ];
                                //$scope.orgunitsWithLowTraining = [
                                //    {name:'Short Acting',region1:shortActingData[0].name+"( "+shortActingData[0].value +"% )",region2:shortActingData[1].name+"( "+shortActingData[1].value +"% )",region3:shortActingData[2].name+"( "+shortActingData[2].value +"% )"},
                                //    {name:'IUCD',region1:iucdData[0].name+"( "+iucdData[0].value +"% )",region2:iucdData[1].name+"( "+iucdData[1].value +"% )",region3:iucdData[2].name+"( "+iucdData[2].value +"% )"},
                                //];
                                $timeout(function () {
                                    render.finishRequest();
                                });
                            });




                            $http.get(portalService.base+'api/sqlViews/Fvxf4sjmWxC/data.json?'+FPManager.lastTwelveMonthForSql(FPManager.lastMonthWithData)).success(function(val1){
                                $rootScope.showProgressMessage = false;
                                angular.forEach(orgUnits, function (yAxis) {
                                    var serie = [];
                                    angular.forEach(periods, function (xAxis) {
                                        serie.push(parseFloat($scope.getNumberPerOu(data.organisationUnits,yAxis.id,val1.rows,xAxis.id)));
                                    });
                                    chartObject.series.push({type: 'spline', name: yAxis.name, data: serie})
                                });
                                $('#stockoutchart').highcharts(chartObject);
                                $scope.pchart = chartObject;
                                $scope.chartObject = chartObject;
                                $scope.csvdata = portalService.prepareDataForCSV(chartObject);
                                $timeout(function () {
                                    render.finishRequest();
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
                data = FPManager.getLastTwelveMonthList(FPManager.lastMonthWithData);
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

            var num = 0;
            if(ou == "m0frOspS7JY" ){
                $.each(arr, function (k, v) {
                    if(v[3] == pe){
                        num += parseInt(v[2]);
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
                                    num += parseInt(v[2]);
                                }
                            }
                        });
                    });
                } else {
                    $.each(arr, function (k, v) {
                        if (v[0] == ou || v[1] == ou) {
                            if(v[3] == pe){
                                num += parseInt(v[2]);
                            }

                        }
                    });
                }
            }
            return num;
        }

        $scope.getDataFromUrl1  = function(arr,ou,pe,type){
            var index = 0;
            if(type == "Injectable"){
                index = 5
            }if(type == "Oral"){
                index = 6
            }
            var num = 0;
            if(ou == "m0frOspS7JY" ){
                $.each(arr, function (k, v) {
                    if(v[4] == pe){
                        if(v[index] !== ""){
                            num += parseInt(v[index]);
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
                                if(v[4] == pe){
                                    if(v[index] !== ""){
                                        num += parseInt(v[index]);
                                    }
                                }
                            }
                        });
                    });
                } else {
                    $.each(arr, function (k, v) {
                        if (v[0] == ou || v[1] == ou) {
                            if(v[4] == pe){
                                if(v[index] !== ""){
                                    num += parseInt(v[index]);
                                }

                            }

                        }
                    });
                }
            }
            return num;
        }

    });

