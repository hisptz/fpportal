
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
        $scope.data = {};
        $scope.selectedYear = FPManager.latestYear;
        $scope.data.selectedMonth = FPManager.latestMonth;

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
                if(value.name != "Eastern Zone"){
                    $scope.data.orgUnitTree1.push({ name:value.name,id:value.id, children:zoneRegions,selected:true });
                    $scope.data.outOrganisationUnits.push({ name:value.name,id:value.id, children:zoneRegions,selected:true })
                }
                else{
                    $scope.data.orgUnitTree1.push({ name:value.name,id:value.id, children:zoneRegions });
                    $scope.data.outOrganisationUnits.push({ name:value.name,id:value.id, children:zoneRegions })
                }
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


        $scope.getSelectedValues = function(){

            if($scope.data.outOrganisationUnits.length === 0){
                alert("no orgunit selected")
            }else{
                $scope.card1 = {
                    showLoader:true,
                    loadingMessage: "",
                    description:'This charts displays changes over time in the percentage of clients that adopted family planning following post abortion or miscarriage care services (at the FP service entry point), in the selected geographies, in the indicated 12 month period',
                    display_option_1:'You can select the geographical areas of interest to you (eg national; zones; regions; districts).This chart allows you to monitor changes over time in proportion of cPAC clients who take up an FP method after cPAC services. This chart helps to identify lower performing zones/regions/district and to monitor unusual variations in the trend over time.',
                    display_option_2:'',
                    option_2:false,
                    indicator_type:'Percentage',
                    numerator:'Among facilities that are eligible to provide FP services, the total number of clients that received each family planning method (Jadelle, Implanon, other) after MVA or D+C for miscarriage or abortion; in the selected geography, for each month in the indicated 12 month period',
                    denominator:' Among facilities that are eligible to provide FP services, the total number of clients that received MVA or D+C for miscarriage or abortion; in the selected geography, for each month in the indicated 12 month period ',
                    data_source:'DHIS-2 FP reporting Tool'
                };
                $scope.card2 = {
                    showLoader:true,
                    loadingMessage: "",
                    description:'This charts displays changes over time in the total number of clients that adopted family planning in the Postpartum period (at the FP service entry point), in the selected geographies, in the indicated 12 month period',
                    display_option_1:'You can select the geographical areas of interest to you (eg national; zones; regions; districts).This chart allows you to monitor changes over time in the number of post-partum clients who take up an FP method42 days after delivery. Note that this trend line shows total numbers so might fluctuate according to number of live births per month in a given facility, but should be generally increasing.This chart helps to identify lower performing zones/regions/district and to monitor unusual variations in the trend over time.',
                    display_option_2:'',
                    option_2:false,
                    indicator_type:'Number',
                    numerator:'Among facilities that are eligible to provide FP services, the total number of clients  that received each family planning method (Jadelle, Implanon, other) within 42 days of delivery; in the selected geography, for each month in the indicated 12 month period',
                    denominator:'N/A',
                    data_source:'DHIS-2 FP reporting Tool'
                };
                $scope.card3 = {
                    showLoader:true,
                    loadingMessage: "",
                    description:'This charts displays changes over time in the percentage of all HIV- negative or status unknown FP clients that adopted HIV Testing and Counselling, in the selected geographies, in the indicated 12 month period',
                    display_option_1:' You can select the geographical areas of interest to you (eg national; zones; regions; districts).This chart allows you to monitor changes over time in the proportion of HIV negative or status unknown FP clients who adopted HTC at the FP service entry point. This chart helps to identify lower performing zones/regions/district and to monitor unusual variations in the trend over time.',
                    display_option_2:'',
                    option_2:false,
                    indicator_type:'Percentage',
                    numerator:'Among facilities that are eligible to provide FP services, the total number of clients of any age that tested for HIV; in the selected geography, for each month in the indicated 12 month period ',
                    denominator:'Among facilities that are eligible to provide FP services, the total number of clients of all ages for all FP methods (male condoms, female condoms, pill, injectables, implants, IUCD, minilap, NSV) minus the total number of FP clients who are known to be HIV positive; in the selected geography, for each month in the indicated 12 month period',
                    data_source:'DHIS-2 FP reporting Tool'
                };

                $scope.card1.loadingMessage = "Authenticating portal...";
                $scope.card1.chartObject = angular.copy(FPManager.chartObject);
                $scope.card1.chartObject.loading = true;
                $scope.card1.chartObject.options.title.text ="Percent Clients Adopting Family Planning post abortion or miscarriage " +FPManager.getlastTwelveMonthName($scope.data.selectedMonth);

                $scope.card2.loadingMessage = "Authenticating portal...";
                $scope.card2.chartObject = angular.copy(FPManager.chartObject);
                $scope.card2.chartObject.loading = true;
                $scope.card2.chartObject.options.title.text ="Clients Adopting Family Planing in the Postpartum Period "+FPManager.getlastTwelveMonthName($scope.data.selectedMonth);

                $scope.card3.loadingMessage = "Authenticating portal...";
                $scope.card3.chartObject = angular.copy(FPManager.chartObject);
                $scope.card3.chartObject.loading = true;
                $scope.card3.chartObject.options.title.text ="Percent Family Planning Clients Adopting HIV Testing and Counselling (HTC) "+FPManager.getlastTwelveMonthName($scope.data.selectedMonth);

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

                var defn = [
                    {id:'NOWyEruy9Ch',name:'Clients Adopting FP Following MVA or D+C(Numerator)' },
                    {id:'MovYxmAwPZP',name:'Clients Adopting FP Following MVA or D+C(Denominator)' },
                    {id:'OwAJT47sIgQ',name:'FP HIV testing rate among FP clients(Numerator)' },
                    {id:'NaCPtfoUkpH',name:'FP HIV testing rate among FP clients(Denominator)' }
                ];
                var url = portalService.base+"api/analytics.json?dimension=dx:cWMJ2HsNTtr;b6O7BaQ46R4;reywf66stpK;NaCPtfoUkpH;OwAJT47sIgQ;MovYxmAwPZP;NOWyEruy9Ch&dimension=ou:"+FPManager.getUniqueOrgUnits($scope.data.outOrganisationUnits)+"&dimension=pe:"+FPManager.lastTwelveMonth($scope.data.selectedMonth)+"&displayProperty=NAME";
                var base = portalService.base;
                $.post( base + "dhis-web-commons-security/login.action?authOnly=true", {
                    j_username: "portal", j_password: "Portal123"
                },function(){
                    $scope.card1.loadingMessage = "Fetching Data...";
                    $scope.card2.loadingMessage = "Fetching Data...";
                    $scope.card3.loadingMessage = "Fetching Data...";
                    $http.get(url).success(function(data){
                        var orgUnits = $scope.prepareCategory('zones');
                        var periods = $scope.prepareCategory('month');
                        $rootScope.showProgressMessage = false;

                        $scope.card1.chartObject.options.yAxis.title.text ="%  of Clients";
                        $scope.card1.chartObject.options.yAxis.labels = {
                            formatter: function () {
                                return this.value + '%';
                            }
                        };
                        $scope.card2.chartObject.options.yAxis.title.text ="# of Clients";
                        $scope.card3.chartObject.options.yAxis.title.text ="%  of Clients";
                        $scope.card3.chartObject.options.yAxis.labels = {
                            formatter: function () {
                                return this.value + '%';
                            }
                        };
                        angular.forEach(periods, function (val) {
                            $scope.card1.chartObject.options.xAxis.categories.push(val.name);
                            $scope.card2.chartObject.options.xAxis.categories.push(val.name);
                            $scope.card3.chartObject.options.xAxis.categories.push(val.name);
                        });

                        angular.forEach(orgUnits,function(yAxis){
                            var chartSeries = [];
                            var chartSeries1 = [];
                            var chartSeries2 = [];
                            angular.forEach(periods,function(xAxis){
                                var number = $scope.findValue(data.rows,yAxis.id,xAxis.id,'cWMJ2HsNTtr','NOWyEruy9Ch','MovYxmAwPZP','percent');
                                var number1 = $scope.findValue(data.rows,yAxis.id,xAxis.id,'b6O7BaQ46R4','','','number');
                                var number2 = $scope.findValue(data.rows,yAxis.id,xAxis.id,'reywf66stpK','OwAJT47sIgQ','NaCPtfoUkpH','percent');
                                chartSeries.push(parseFloat(number));
                                chartSeries1.push(parseFloat(number1));
                                chartSeries2.push(parseFloat(number2));
                            });
                            $scope.card1.chartObject.series.push({type: 'spline', name: yAxis.name, data: chartSeries});
                            $scope.card2.chartObject.series.push({type: 'spline', name: yAxis.name, data: chartSeries1});
                            $scope.card3.chartObject.series.push({type: 'spline', name: yAxis.name, data: chartSeries2});
                        });

                        $scope.card1.csvdata = FPManager.prepareDataForCSV($scope.card1.chartObject);
                        $scope.card2.csvdata = FPManager.prepareDataForCSV($scope.card2.chartObject);
                        $scope.card3.csvdata = FPManager.prepareDataForCSV($scope.card3.chartObject);

                        $scope.card1.chartObject.loading = false;
                        $scope.card2.chartObject.loading = false;
                        $scope.card3.chartObject.loading = false;

                        $scope.card1.showLoader = false;
                        $scope.card2.showLoader = false;
                        $scope.card3.showLoader = false;

                    });
                });
            }
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
                        amount = (denominatorValue != 0)?parseFloat((numeratorValue/denominatorValue )* 100).toFixed(1):0;
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
                data = FPManager.getLastTwelveMonthList($scope.data.selectedMonth)
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
