
/**
 * Created by kelvin on 1/11/16.
 */
angular.module("hmisPortal")
    .config(function($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    })
    .controller("parcentage1Ctrl",function ($rootScope,$scope,$http,$location,$timeout,olData,olHelpers,shared,portalService,FPManager) {
        //lidt of all facilities providing fp
        //https://hmisportal.moh.go.tz/dhis/api/dataSets/TfoI3vTGv1f.json?fields=id,name,organisationUnits[id,name]
        $rootScope.showProgressMessage = false;
        $scope.geographicalZones = FPManager.zones;
        $scope.geoToUse = [];
        $scope.zones = "";
        $scope.data = {};
        $scope.hideMethods = true;
        $scope.selectedYear = FPManager.latestYear;
        $scope.data.selectedMonth = FPManager.latestMonth;

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
        $scope.clearMethods = function(){
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

        //switching between tables and charts
        $scope.displayTables = {card1:false}
        $scope.changeTable =function(card,value){
            if(value == "table"){
                if(card == "card1"){$scope.displayTables.card1 = true}
            }if(value == "chart"){
                if(card == "card1"){$scope.displayTables.card1 = false}
            }
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


        $scope.getSelectedValues = function(){
            if($scope.data.outOrganisationUnits.length === 0){
                alert("no orgunit selected")
            }else
            {
                $scope.cardObject = {
                    showLoader:true,
                    loadingMessage: "",
                    description:'This charts displays the percentage of facilities that provided  either pills or condoms through community-based distribution (as a proportion of all facilities that are eligible to provide FP services) in the selected geographies, in the indicated 12 month period',
                    display_option_1:'You can select the geographical areas of interest to you (eg national; zones; regions; districts).This chart allows you to monitor changes over time in community-based distribution of condoms or pills in the selected geographies. This chart This allows you to identify lower performing zones/regions/district and to monitor unusual variations in the trend over time.',
                    display_option_2:'',
                    option_2:false,
                    indicator_type:'Percentage',
                    numerator:' Total number of facilities that are eligible to provide FP services that recorded at least one pill or male or female condoms client (of any age, new or returning) through community-based distribution, in the selected geography for each month in the indicated 12 month period ',
                    denominator:'Total number of facilities that are eligible to provide FP services,  in the selected geography  for each month in the indicated 12 month period',
                    data_source:'DHIS-2 FP reporting Tool'
                };
                $scope.cardObject.chartObject = angular.copy(FPManager.chartObject);

                $scope.cardObject.chartObject.loading = true;
                $scope.cardObject.loadingMessage = "Authenticating portal...";
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


                    $scope.cardObject.chartObject.options.title.text ="Percent of Facilities Providing Pills or Condoms through Community Based Distribution, "+FPManager.getlastTwelveMonthName($scope.data.selectedMonth);
                    $scope.cardObject.chartObject.options.yAxis.title.text ="% of Facilities";
                    var orgUnits = $scope.prepareCategory('zones');
                    var periods = $scope.prepareCategory('month');

                    angular.forEach(periods, function (val) {
                        $scope.cardObject.chartObject.options.xAxis.categories.push(val.name);
                    });


                    $scope.cardObject.loadingMessage = "Fetching List of facility...";
                    FPManager.getFPFacilityList().then(function(data){
                        $scope.cardObject.loadingMessage = "Fetching Data...";
                        $http.get(portalService.base+'api/sqlViews/i9ko4WjK1Wj/data.json?'+FPManager.lastTwelveMonthForSql($scope.data.selectedMonth)).success(function(val1){
                            $rootScope.showProgressMessage = false;
                            angular.forEach(orgUnits, function (yAxis) {
                                var serie = [];
                                angular.forEach(periods, function (xAxis) {
                                    serie.push(parseFloat($scope.getNumberPerOu(data.organisationUnits,yAxis.id,val1.rows,xAxis.id)));
                                });
                                $scope.cardObject.chartObject.series.push({type: 'spline', name: yAxis.name, data: serie})
                            });
                            $scope.cardObject.csvdata = FPManager.prepareDataForCSV($scope.cardObject.chartObject);
                            $scope.cardObject.chartObject.loading = false;
                            $scope.cardObject.showLoader = false
                        });
                    });
                });
            }

        };
        $scope.data.outOrganisationUnits = [{name:'Tanzania',id:'m0frOspS7JY'}];
        $scope.getSelectedValues();

        $scope.prepareCategory = function(type){
            var data = [];
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
                data = FPManager.getLastTwelveMonthList($scope.data.selectedMonth);
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
