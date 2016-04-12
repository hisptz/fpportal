
/**
 * Created by kelvin on 1/11/16.
 */
angular.module("hmisPortal")
    .config(function($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    })
    .controller("survilienceCtrl",function ($rootScope,$scope,$http,$location,$timeout,olData,olHelpers,shared,portalService,FPManager,$filter) {
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

        $scope.OrgunitInReportingRate = [];
        $scope.getSelectedValues = function(){

            if($scope.data.outOrganisationUnits.length === 0){
                alert("no orgunit selected")
            }else{


                var period = $scope.selectedPeriod;
                var method = "uid";
                var chartObject = angular.copy(portalService.chartObject);
                var chartObject1 = angular.copy(portalService.chartObject);
                var chartObject2 = angular.copy(portalService.chartObject);

                chartObject.loading = true;
                chartObject1.loading = true;
                chartObject2.loading = true;
                var defn = [
                    {id:'NOWyEruy9Ch',name:'Clients Adopting FP Following MVA or D+C(Numerator)' },
                    {id:'MovYxmAwPZP',name:'Clients Adopting FP Following MVA or D+C(Denominator)' },
                    {id:'OwAJT47sIgQ',name:'FP HIV testing rate among FP clients(Numerator)' },
                    {id:'NaCPtfoUkpH',name:'FP HIV testing rate among FP clients(Denominator)' }
                ];
                var url = portalService.base+"api/analytics.json?dimension=dx:cWMJ2HsNTtr;b6O7BaQ46R4;reywf66stpK;NaCPtfoUkpH;OwAJT47sIgQ;MovYxmAwPZP;NOWyEruy9Ch&dimension=ou:LEVEL-2;LEVEL-1;m0frOspS7JY&dimension=pe:201401;201402;201403;201404;201405;201406;201407;201408;201409;201410;201411;201412&displayProperty=NAME";
                var base = portalService.base;
                $.post( base + "dhis-web-commons-security/login.action?authOnly=true", {
                    j_username: "portal", j_password: "Portal123"
                },function(){

                    //load the completeness data and handle the comparison
                    $http.get(portalService.base+'api/analytics.json?dimension=dx:TfoI3vTGv1f&dimension=ou:LEVEL-2;m0frOspS7JY&filter=pe:201412&displayProperty=NAME').success(function(data){
                        var orgUnitsCompletenes = [];
                        angular.forEach(data.rows,function(v){
                            orgUnitsCompletenes.push({name:data.metaData.names[v[1]],value:v[2]})
                        });
                        var orderBy = $filter('orderBy');
                        $scope.orgUnitsCompletenes = orderBy(orgUnitsCompletenes, 'value', false);
                        $scope.orgUnitsCompletenes1 = orderBy(orgUnitsCompletenes, 'value', true);
                        $scope.OrgunitInReportingRate = [
                            {high:$scope.orgUnitsCompletenes1[0].name+'( '+$scope.orgUnitsCompletenes1[0].value+' % )',low:$scope.orgUnitsCompletenes[0].name+'( '+$scope.orgUnitsCompletenes[0].value+' % )'},
                            {high:$scope.orgUnitsCompletenes1[1].name+'( '+$scope.orgUnitsCompletenes1[1].value+' % )',low:$scope.orgUnitsCompletenes[1].name+'( '+$scope.orgUnitsCompletenes[1].value+' % )'},
                            {high:$scope.orgUnitsCompletenes1[2].name+'( '+$scope.orgUnitsCompletenes1[2].value+' % )',low:$scope.orgUnitsCompletenes[2].name+'( '+$scope.orgUnitsCompletenes[2].value+' % )'}
                        ];
                    });


                    $rootScope.progressMessage = "Fetching data please wait ...";
                    $rootScope.showProgressMessage = true;
                    $http.get(url).success(function(data){
                        var period = "";
                        var orderBy = $filter('orderBy');
                        var orderedOrgunits1 = orderBy($scope.getThreeRegions(data,'cWMJ2HsNTtr',FPManager.lastMonthWithOtherData), 'value', false);
                        var orderedOrgunits3 = orderBy($scope.getThreeRegions(data,'reywf66stpK',FPManager.lastMonthWithOtherData), 'value', false);
                        var orgUnits2 = [{'name':"Tanzania",'id':"m0frOspS7JY"}];
                        var orgUnits1 = [{'name':"Tanzania",'id':"m0frOspS7JY"},{name:orderedOrgunits1[0].name,id:orderedOrgunits1[0].id},{name:orderedOrgunits1[1].name,id:orderedOrgunits1[1].id},{name:orderedOrgunits1[2].name,id:orderedOrgunits1[2].id}];
                        var orgUnits3 = [{'name':"Tanzania",'id':"m0frOspS7JY"},{name:orderedOrgunits3[0].name,id:orderedOrgunits3[0].id},{name:orderedOrgunits3[1].name,id:orderedOrgunits3[1].id},{name:orderedOrgunits3[2].name,id:orderedOrgunits3[2].id}];
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

                        angular.forEach(orgUnits1,function(yAxis){
                            var chartSeries = [];
                            angular.forEach(periods,function(xAxis){
                                var number = $scope.findValue(data.rows,yAxis.id,xAxis.id,'cWMJ2HsNTtr','NOWyEruy9Ch','MovYxmAwPZP','percent');
                                chartSeries.push(parseFloat(number));
                            });
                            chartObject.series.push({type: 'spline', name: yAxis.name, data: chartSeries});
                        });
                        angular.forEach(orgUnits2,function(yAxis){
                            var chartSeries1 = [];
                            angular.forEach(periods,function(xAxis){
                                var number1 = $scope.findValue(data.rows,yAxis.id,xAxis.id,'b6O7BaQ46R4','','','number');
                                chartSeries1.push(parseFloat(number1));
                            });
                            chartObject1.series.push({type: 'spline', name: yAxis.name, data: chartSeries1});
                        });
                        angular.forEach(orgUnits3,function(yAxis){
                            var chartSeries2 = [];
                            angular.forEach(periods,function(xAxis){
                                var number2 = $scope.findValue(data.rows,yAxis.id,xAxis.id,'reywf66stpK','OwAJT47sIgQ','NaCPtfoUkpH','percent');
                                chartSeries2.push(parseFloat(number2));
                            });
                            chartObject2.series.push({type: 'spline', name: yAxis.name, data: chartSeries2});
                        });
                        chartObject.loading = false;
                        chartObject1.loading = false;
                        chartObject2.loading = false;

                        $('#survilience1').highcharts(chartObject);
                        $scope.chartObject = chartObject;
                        $scope.csvdata = portalService.prepareDataForCSV(chartObject);
                        $('#survilience2').highcharts(chartObject1);
                        $scope.chartObject1 = chartObject1;
                        $scope.csvdata1 = portalService.prepareDataForCSV(chartObject1);
                        $('#survilience3').highcharts(chartObject2);
                        $scope.chartObject2 = chartObject2;
                        $scope.csvdata2 = portalService.prepareDataForCSV(chartObject2);

                    });
                });
            }
        };

        $scope.getThreeRegions = function(arr,dx,pe){
            var regions = [];
            angular.forEach(arr.metaData.ou,function(val){
                var count = 0;
                if(val !== "m0frOspS7JY"){
                    angular.forEach(arr.rows,function(v){
                        if(v[1] == val && v[0] == dx){
                            if(v[2] == pe){
                                count+= parseInt(v[3])
                            }

                        }
                    });
                regions.push({name:arr.metaData.names[val],value:count,id:val})
                }
            });
            return regions;

        };

        $scope.getSelectedValues();

        $scope.getMethodName = function(uid){
            angular.forEach()
        };

        $scope.findValue = function(arr,ou,pe,dx,numerator,denominator,type){

            var amount = 0;
            var numeratorValue = 0;
            var denominatorValue = 0;
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
                            }if(v[0] == numerator ){
                                if(v[1] == j ){
                                    numeratorValue += parseInt(v[3]);
                                }
                            }if(v[0] == denominator ){
                                if(v[1] == j ){
                                    denominatorValue += parseInt(v[3]);
                                }
                            }

                        }
                    });
                    if(type == 'percent'){
                        amount = (denominatorValue != 0)?parseFloat((numeratorValue/denominatorValue )* 100).toFixed(2):0;
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
