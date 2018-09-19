
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

        $scope.orgUnitType = function(arr,type){
            var name = false;
            angular.forEach(arr,function(value){
                if(value.name == type){
                    name = true;
                }
            });
            return name;
        };

        $scope.getNumberPerOu2 = function(arr,ou,arr2,pe,type){
            var count = 0;
            angular.forEach(arr,function(value) {
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

            var num = $scope.getDataFromUrl2(arr2,ou,pe);
            var percent = (count == 0)?0:(num/count)*100;
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

                        $scope.name = region.name;

                        var chartObject = angular.copy(portalService.chartObject);

                        chartObject.title.text = "Percent of facilities in "+region.name+" stocked out of pills or injectables for any number of days";
                        chartObject.yAxis.title.text = "% of facilities";
                        chartObject.legend = {
                            align: 'right',
                            verticalAlign: 'top',
                            layout: 'vertical',
                            x: 0,
                            y: 100,
                            itemMarginTop: 10,
                            itemMarginBottom: 10
                        };
                        var orgUnits = [{name:'Facilities'}];
                        var periods = $scope.prepareCategory('month');

                        angular.forEach(periods, function (val) {
                            chartObject.xAxis.categories.push(val.name);
                        });

                        chartObject.loading = true;
                        $rootScope.progressMessage = "Fetching data please wait ...";
                        $rootScope.showProgressMessage = true;
                        $http.get(portalService.base + 'api/dataSets/TfoI3vTGv1f.json?fields=organisationUnits[name,organisationUnitGroups[name],ancestors[id]]').success(function (data) {
                            $http.get(portalService.base+'api/analytics.json?dimension=dx:gOnXFvuLClY;n91UibSDCbn&dimension=ou:LEVEL-4;'+$scope.regionUid+'&filter=pe:'+FPManager.lastMonthWithData+'&displayProperty=NAME').success(function(facilities){
                                $scope.AllstockOutData = [];
                                $scope.PillstockOutData = [];
                                $scope.InjectablestockOutData = [];
                                angular.forEach(facilities.rows,function(data){
                                    if(data[1] !== $scope.regionUid){
                                        if(data[0] == "gOnXFvuLClY" && data[2] == 0.0){
                                            $scope.InjectablestockOutData.push(facilities.metaData.names[data[1]])
                                        }
                                        if(data[0] == "n91UibSDCbn" && data[2] == 0.0){
                                            $scope.PillstockOutData.push(facilities.metaData.names[data[1]])
                                        }
                                    }

                                });
                                angular.forEach($scope.InjectablestockOutData,function(injectables){
                                    angular.forEach($scope.PillstockOutData,function(pills){
                                        if(injectables == pills){
                                            $scope.AllstockOutData.push(pills);
                                        }
                                    });
                                });
                                var orderBy = $filter('orderBy');
                                $timeout(function () {
                                    render.finishRequest();
                                });

                            });


                            $http.get(portalService.base+'api/sqlViews/Fvxf4sjmWxC/data.json?'+FPManager.lastTwelveMonthForSql(FPManager.lastMonthWithData)).success(function(val1){
                                    $rootScope.showProgressMessage = false;
                                    angular.forEach(orgUnits, function (yAxis) {
                                        var serie = [];
                                        angular.forEach(periods, function (xAxis) {
                                            if (yAxis.name == "Facilities") {
                                                serie.push(parseFloat($scope.getNumberPerOu(data.organisationUnits,$scope.regionUid,val1.rows,xAxis.id)));
                                            }
                                        });
                                        chartObject.series.push({
                                            type: 'spline',
                                            name: yAxis.name,
                                            data: serie
                                        })
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
            }if(type == 'month'){
                data = FPManager.getLastTwelveMonthList(FPManager.lastMonthWithData);
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
            $.each(arr, function (k, v) {
                if (v[0] == ou || v[1] == ou) {
                    if(v[4] == pe){
                        if(v[index] !== ""){
                            num += parseInt(v[index]);
                        }

                    }

                }
            });
            return num;
        };

        $scope.getDataFromUrl2  = function(arr,ou,pe){
            var num = 0;
                $.each(arr, function (k, v) {
                    if (v[0] == ou || v[1] == ou) {
                        if(v[4] == pe){
                            if(v[5] !== "" ){
                                num += parseInt(v[5]);
                            }
                        }
                    }
                });
            return num;
        }

    });


