
/**
 * Created by kelvin on 1/11/16.
 */
angular.module("hmisPortal")
    .config(function($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    })
    .controller("survilienceCtrl",function ($rootScope,$scope,$http,$location,$timeout,olData,olHelpers,shared,portalService,FPManager) {
        $rootScope.showProgressMessage = false;
        $scope.geographicalZones = FPManager.zones;
        $scope.geoToUse = [];
        $scope.zones = "";
        angular.forEach($scope.geographicalZones.organisationUnitGroups,function(value){
            $scope.zones += value.id+";";
            $scope.geoToUse.push({name:value.name,id:value.id, ticked: true });
        });
        $scope.data = {};
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
                $scope.data.outOrganisationUnits.push({ name:value.name,id:value.id, children:zoneRegions,selected:true });
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

        //prepare data for use in csv
        $scope.prepareDataForCSV = function(arr){
            var items = [];
            angular.forEach(arr.series,function(value){
                var obj = {name:value.name};
                var i = 0;
                angular.forEach(arr.xAxis.categories,function(val){
                    obj[val] = value.data[i];
                    i++;
                })
                items.push(obj);
            })
            return items;
        };

        $scope.getSelectedValues = function(){

            if($scope.data.outOrganisationUnits.length === 0){
                alert("no orgunit selected")
            }else{
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

                var period = $scope.selectedPeriod;
                var method = "uid";
                var chartObject = angular.copy(portalService.chartObject);
                var chartObject1 = angular.copy(portalService.chartObject);
                var chartObject2 = angular.copy(portalService.chartObject);

                chartObject.loading = true;
                chartObject1.loading = true;
                chartObject2.loading = true;

                var url = portalService.base+"api/analytics.json?dimension=dx:cWMJ2HsNTtr;b6O7BaQ46R4;reywf66stpK&dimension=ou:"+FPManager.getUniqueOrgUnits($scope.data.outOrganisationUnits)+"&dimension=pe:201401;201402;201403;201404;201405;201406;201407;201408;201409;201410;201411;201412&displayProperty=NAME";
                var base = portalService.base;
                $.post( base + "dhis-web-commons-security/login.action?authOnly=true", {
                    j_username: "portal", j_password: "Portal123"
                },function(){
                $rootScope.progressMessage = "Fetching data please wait ...";
                $rootScope.showProgressMessage = true;
                    $http.get(url).success(function(data){
                        var period = ""
                        var orgUnits = $scope.prepareCategory('zones');
                        var periods = $scope.prepareCategory('month')
                        $rootScope.showProgressMessage = false;


                        chartObject.title.text ="Percent Clients Adopting Family Planning following comprehensive Post Abortion Care (cPAC) Jan 2014 to Dec 2014";
                        chartObject1.title.text ="Clients Adopting Family Planing in the Postpartum Period  Jan 2014 to Dec 2014";
                        chartObject2.title.text ="Family Planning clients Adopting HIV testing and Counseling   Jan 2014 to Dec 2014";
                        chartObject.yAxis.title.text ="%  of Clients";
                        chartObject.yAxis.labels = {
                            formatter: function () {
                                return this.value + '%';
                            }
                        };
                        chartObject1.yAxis.title.text ="# of Clients";
                        chartObject2.yAxis.title.text ="%  of Clients";
                        chartObject2.yAxis.labels = {
                            formatter: function () {
                                return this.value + '%';
                            }
                        };
                        angular.forEach(periods, function (val) {
                            chartObject.xAxis.categories.push(val.name);
                            chartObject1.xAxis.categories.push(val.name);
                            chartObject2.xAxis.categories.push(val.name);
                        });

                        angular.forEach(orgUnits,function(yAxis){
                            var chartSeries = [];
                            var chartSeries1 = [];
                            var chartSeries2 = [];
                            angular.forEach(periods,function(xAxis){
                                var number = $scope.findValue(data.rows,yAxis.id,xAxis.id,'cWMJ2HsNTtr','percent');
                                var number1 = $scope.findValue(data.rows,yAxis.id,xAxis.id,'b6O7BaQ46R4','number');
                                var number2 = $scope.findValue(data.rows,yAxis.id,xAxis.id,'reywf66stpK','percent');
                                chartSeries.push(parseFloat(number));
                                chartSeries1.push(parseFloat(number1));
                                chartSeries2.push(parseFloat(number2));
                            });
                            chartObject.series.push({type: 'spline', name: yAxis.name, data: chartSeries});
                            chartObject1.series.push({type: 'spline', name: yAxis.name, data: chartSeries1});
                            chartObject2.series.push({type: 'spline', name: yAxis.name, data: chartSeries2});
                        });
                        chartObject.loading = false;
                        chartObject1.loading = false;
                        chartObject2.loading = false;

                        $('#chart').highcharts(chartObject);
                        $scope.chartObject = chartObject;
                        $scope.csvdata = $scope.prepareDataForCSV(chartObject);
                        $('#chart2').highcharts(chartObject1);
                        $scope.chartObject1 = chartObject1;
                        $scope.csvdata1 = $scope.prepareDataForCSV(chartObject1);
                        $('#chart3').highcharts(chartObject2);
                        $scope.chartObject2 = chartObject2;
                        $scope.csvdata2 = $scope.prepareDataForCSV(chartObject2);

                    });
                });
            }
        };

        $scope.getSelectedValues();

        $scope.getMethodName = function(uid){
            angular.forEach()
        };

        $scope.findValue = function(arr,ou,pe,dx,type){

            var amount = 0;
            if((ou.indexOf(';') > -1)){

                var orgArr = ou.split(";");
                var i = 0;
                $.each(orgArr,function(c,j){
                    i++;
                    $.each(arr,function(k,v){
                        if( v[2] == pe){
                            if(v[0] == dx ){
                                if(v[1] == j ){
                                    amount += parseInt(v[3]);
                                }
                            }

                        }
                    });
                    if(type == 'percent'){
                        amount = (amount != 0)?parseInt(amount/i):0;
                    }

                });
            }else{
                $.each(arr,function(k,v){
                    if(v[0] == dx && v[1] == ou && v[2] == pe){
                        amount = v[3];
                    }
                });
            }


            return amount;
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


    });





function preparePeriod(period){

    return ""+period+"01;"+period+"02;"+period+"03;"+period+"04;"+period+"05;"+period+"06;"+period+"07;"+period+"08;"+period+"09;"+period+"10;"+period+"11;"+period+"12;"+period+"Q1;"+period+"Q2;"+period+"Q3;"+period+"Q4";
}
