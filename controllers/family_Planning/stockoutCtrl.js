
/**
 * Created by kelvin on 1/11/16.
 */
angular.module("hmisPortal")
    .config(function($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    })
    .controller("stockoutCtrl",function ($rootScope,$scope,$http,$location,$timeout,olData,olHelpers,shared,portalService,FPManager) {
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
            return percent.toFixed(2);
        };


        $scope.getSelectedValues = function(){
            if($scope.data.outOrganisationUnits.length === 0){
                alert("no orgunit selected")
            }else
            {
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

                    var chartObject = angular.copy(portalService.chartObject);

                    chartObject.title.text ="Percent of Facilities Stocked out of Injectables Jan 2014 to Dec 2014";
                    chartObject.yAxis.title.text ="% of Facilities";
                    var orgUnits = $scope.prepareCategory('zones');
                    var periods = $scope.prepareCategory('month');

                    angular.forEach(periods, function (val) {
                        chartObject.xAxis.categories.push(val.name);
                    });

                    chartObject.loading = true;
                    $rootScope.progressMessage = "Fetching data please wait ...";
                    $rootScope.showProgressMessage = true;
                    $http.get(portalService.base+'api/dataSets/TfoI3vTGv1f.json?fields=organisationUnits[name,ancestors[id]]').success(function(data){
                        $http.get(portalService.base+'api/sqlViews/Fvxf4sjmWxC/data.json?var=month1:201401&var=month2:201402&var=month3:201403&var=month4:201404&var=month5:201405&var=month6:201406&var=month7:201407&var=month8:201408&var=month9:201409&var=month10:201410&var=month11:201411&var=month12:201412').success(function(val1){
                        //$http.get(portalService.base+'api/sqlViews/Skg2digJF1h/data.json?var=month1:201401&var=month2:201402&var=month3:201403&var=month4:201404&var=month5:201405&var=month6:201406&var=month7:201407&var=month8:201408&var=month9:201409&var=month10:201410&var=month11:201411&var=month12:201412').success(function(val1){
                            $rootScope.showProgressMessage = false;
                            angular.forEach(orgUnits, function (yAxis) {
                                var serie = [];
                                angular.forEach(periods, function (xAxis) {
                                    serie.push(parseFloat($scope.getNumberPerOu(data.organisationUnits,yAxis.id,val1.rows,xAxis.id)));
                                });
                                chartObject.series.push({type: 'spline', name: yAxis.name, data: serie})
                            });
                            $('#pchart').highcharts(chartObject);
                            $scope.pchart = chartObject;
                            $scope.chartObject = chartObject;
                            $scope.csvdata = portalService.prepareDataForCSV(chartObject);
                        }).error(function(){
                            $rootScope.showProgressMessage = true;
                            $rootScope.progressMessage = "Error Fetching Data Portal, Please try again. ...";
                            $timeout(function(){
                                $rootScope.showProgressMessage = false;
                            },3000)
                        });
                    }).error(function(){
                        $rootScope.showProgressMessage = true;
                        $rootScope.progressMessage = "Error Fetching Data Portal, Please try again. ...";
                        $timeout(function(){
                            $rootScope.showProgressMessage = false;
                        },3000)
                    });
                },function(){
                        $rootScope.showProgressMessage = true;
                        $rootScope.progressMessage = "Error Fetching Data Portal, Please try again. ...";
                        $timeout(function(){
                            $rootScope.showProgressMessage = false;
                        },3000)
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

    });





function preparePeriod(period){

    return ""+period+"01;"+period+"02;"+period+"03;"+period+"04;"+period+"05;"+period+"06;"+period+"07;"+period+"08;"+period+"09;"+period+"10;"+period+"11;"+period+"12;"+period+"Q1;"+period+"Q2;"+period+"Q3;"+period+"Q4";
}
