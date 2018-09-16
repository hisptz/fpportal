
/**
 * Created by kelvin on 1/11/16.
 */
angular.module("hmisPortal")
    .config(function($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    })
    .controller("parcentageCtrl",function ($rootScope,$scope,$http,$location,$timeout,olData,olHelpers,shared,portalService,FPManager) {
        //lidt of all facilities providing fp
        //https://hmisportal.moh.go.tz/dhis/api/dataSets/TfoI3vTGv1f.json?fields=id,name,organisationUnits[id,name]
        $rootScope.showProgressMessage = false;
        $scope.geographicalZones = FPManager.zones;
        $scope.geoToUse = [];
        $scope.zones = "";
        $scope.data = {};
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
        $scope.selectedMethod = 'EcP5Na7DO0r';

        $scope.FPmethods = [
            {'name':'Short Acting','uid':'PHN05p61ByJ'},
            {'name':'Implants','uid':'pqpVKzE951Y'},
            {'name':'IUCDs','uid':'OQpasUg1Tse'},
            {'name':'NSV','uid':'btKkJROB2gP'},
            {'name':'Mini Lap','uid':'mlfh4fgiFhd'}
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
        $scope.clearMethods = function(){
            $scope.data.menuMethods = [];
            angular.forEach($scope.FPmethods,function(value){
                if(value.name == 'Implants'){
                    $scope.data.menuMethods.push({name:value.name,id:value.uid });
                }else{
                    $scope.data.menuMethods.push({name:value.name,id:value.uid });
                }

            });
        };
        $scope.updateMethod();

        //getting the title for a chart


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
            return percent.toFixed(1);
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

            return percent.toFixed(1);
        };

        $scope.getNumberPerOu2 = function(arr){
            var DispensaryCount = 0;
            var HosptalCount = 0;
            var HealthCount = 0;
            var OtherCount = 0;
            angular.forEach(arr,function(value){
                if ($scope.orgUnitType(value.organisationUnitGroups,'Hospital')) {

                            HosptalCount++;

                }else if ($scope.orgUnitType(value.organisationUnitGroups,'Health Center')) {

                            HealthCount++;

                }else if ($scope.orgUnitType(value.organisationUnitGroups,'Dispensary')) {

                            DispensaryCount++;

                }else{
                    OtherCount++
                }
            });
            console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
            console.log(HosptalCount);
            console.log(DispensaryCount);
            console.log(HealthCount);
            console.log(OtherCount);
            console.log('******************************************');
        };

        $scope.getSelectedValues = function(){
            $rootScope.progressMessage = "Fetching data please wait ...";
            $rootScope.showProgressMessage = true;
            if($scope.data.outOrganisationUnits.length === 0){
                alert("no orgunit selected")
            }else
            {
                $scope.titleToUse = "";
                $scope.hospitalObject = {
                    showLoader:true,
                    loadingMessage: "",
                    description:'This charts displays the percentage of hospitals that provided selected FP method/s (as a proportion of all hospitals that are eligible to provide FP services) in the selected geographies, in the indicated 12 month period',
                    display_option_1:'If you select one FP method (eg IUCDs) and multiple geographies (eg 6 districts within a region) you can compare the percentage of hospitals that provided IUCDs across the 6 selected districts, over the indicated 12 month period. This allows you to monitor changes over time in provision of IUCDs in the selected districts.',
                    display_option_2:'If you select one geography (eg Western Zone) and multiple FP methods, you can compare the percentage of hospitals that provided selected FP methods,  within the Western Zone. This allows you to monitor changes over time in service provision across FP method types, ',
                    option_2:true,
                    indicator_type:'Percentage',
                    numerator:'Total number of hospitals that are eligible to provide FP services that recorded at least one client (of any age, new or returning) through routine/facility-based services, for selected FP method/s  (oral pills, male condoms, female condoms, injectables, implants, IUCDs, minilap, NSV) , in the selected geography for each month in the indicated 12 month period',
                    denominator:'Total number of hospitals that are eligible to provide FP services, in the selected geography for each month in the indicated 12 month period',
                    data_source:'DHIS-2 FP reporting Tool'
                };

                $scope.dispensaryObject = {
                    showLoader:true,
                    loadingMessage: "",
                    description:'This charts displays the percentage of dispensaries that provided selected FP method/s (as a proportion of all dispensaries that are eligible to provide FP services) in the selected geographies, in the indicated 12 month period',
                    display_option_1:'If you select one FP method (eg IUCDs) and multiple geographies (eg 6 districts within a region) you can compare the percentage of dispensaries that provided IUCDs across the 6 selected districts, over the indicated 12 month period. This allows you to monitor changes over time in provision of IUCDs in the selected districts, to help identify lower performing zones/regions/district for follow-up.',
                    display_option_2:'If you select one geography (eg Western Zone) and multiple FP methods, you can compare the percentage of dispensaries that provided selected FP methods over the indicated 12 month-period,  within the Western Zone. This allows you to monitor changes over time in service provision across FP method types.',
                    option_2:true,
                    indicator_type:'Percentage',
                    numerator:'Total number of dispensaries that are eligible to provide FP services that recorded at least one client (of any age, new or returning) through routine/facility-based services, for selected FP method/s (oral pills, male condoms, female condoms, injectables, implants, IUCDs, minilap, NSV) , in the selected geography for each month in the indicated 12 month period ',
                    denominator:'Total number of dispensaries that are eligible to provide FP services, in the selected geography  for each month in the indicated 12 month period',
                    data_source:'DHIS-2 FP reporting Tool'
                };

                $scope.healtyCenterObject = {
                    showLoader:true,
                    loadingMessage: "",
                    description:'',
                    display_option_1:'',
                    display_option_2:'',
                    option_2:true,
                    indicator_type:'Percentage',
                    numerator:'',
                    denominator:'',
                    data_source:'DHIS-2 FP reporting Tool'
                };

                $scope.hospitalObject.loadingMessage = "Authenticating portal...";
                $scope.hospitalObject.chartObject = angular.copy(FPManager.chartObject);
                $scope.hospitalObject.chartObject.loading = true;
                $scope.hospitalObject.chartObject.options.title.text ="Percent Hospitals with a Health Worker Trained in and Providing - "+$scope.titleToUse +" "+FPManager.getMonthName($scope.data.selectedMonth);

                //dispensary
                $scope.dispensaryObject.loadingMessage = "Authenticating portal...";
                $scope.dispensaryObject.chartObject = angular.copy(FPManager.chartObject);
                $scope.dispensaryObject.chartObject.loading = true;
                $scope.dispensaryObject.chartObject.options.title.text ="Percent Dispensaries with a Health Worker Trained in and Providing - "+$scope.titleToUse +" "+FPManager.getMonthName($scope.data.selectedMonth);

                //Health Centers
                $scope.healtyCenterObject.loadingMessage = "Authenticating portal...";
                $scope.healtyCenterObject.chartObject = angular.copy(FPManager.chartObject);
                $scope.healtyCenterObject.chartObject.loading = true;
                $scope.healtyCenterObject.chartObject.options.title.text ="Percent Health Centers with a Health Worker Trained in and Providing - "+$scope.titleToUse +" "+FPManager.getMonthName($scope.data.selectedMonth);

                $.post( portalService.base + "dhis-web-commons-security/login.action?authOnly=true", {
                    j_username: "portal", j_password: "Portal123"
                },function() {
                    if($scope.data.outMethods.length == 1){
                        $scope.titleToUse = $scope.data.outMethods[0].name;
                    }else{
                        $scope.titleToUse = $scope.data.outOrganisationUnits[0].name;
                    }
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

                    if($scope.data.outMethods.length == 1){
                        $scope.hospitalObject.chartObject.options.title.text ="Percent of Hospitals Providing - " +$scope.titleToUse +" "+FPManager.getlastTwelveMonthName($scope.data.selectedMonth);
                        $scope.healtyCenterObject.chartObject.options.title.text ="Percent of Health Centres Providing - " +$scope.titleToUse +" "+FPManager.getlastTwelveMonthName($scope.data.selectedMonth);
                        $scope.dispensaryObject.chartObject.options.title.text ="Percent of Dispensaries Providing - " +$scope.titleToUse +" "+FPManager.getlastTwelveMonthName($scope.data.selectedMonth);
                    }else{
                        $scope.hospitalObject.chartObject.options.title.text ="Percent of Hospitals Providing Family Planning - " +$scope.titleToUse +" "+FPManager.getlastTwelveMonthName($scope.data.selectedMonth);
                        $scope.healtyCenterObject.chartObject.options.title.text ="Percent of Health Centres  Providing Family Planning - " +$scope.titleToUse +" "+FPManager.getlastTwelveMonthName($scope.data.selectedMonth);
                        $scope.dispensaryObject.chartObject.options.title.text ="Percent of Dispensaries  Providing Family Planning  - " +$scope.titleToUse +" "+FPManager.getlastTwelveMonthName($scope.data.selectedMonth);
                    }

                    $scope.hospitalObject.chartObject.options.yAxis.title.text ="% of Facilities";
                    $scope.healtyCenterObject.chartObject.options.yAxis.title.text ="% of Facilities";
                    $scope.dispensaryObject.chartObject.options.yAxis.title.text ="% of Facilities";

                    $scope.hospitalObject.chartObject.options.yAxis.labels = {
                        formatter: function () {
                            return this.value + '%';
                        }
                    };
                    $scope.dispensaryObject.chartObject.options.yAxis.labels = {
                        formatter: function () {
                            return this.value + '%';
                        }
                    };
                    $scope.healtyCenterObject.chartObject.options.yAxis.labels = {
                        formatter: function () {
                            return this.value + '%';
                        }
                    };
                    var methodss = [];
                    angular.forEach($scope.data.outMethods,function(method){
                        methodss.push({'name':method.name,'id':method.id});
                    });

                    var orgUnits = $scope.prepareCategory('zones');
                    var periods = $scope.prepareCategory('month');

                    angular.forEach(periods, function (val) {
                        $scope.hospitalObject.chartObject.options.xAxis.categories.push(val.name);
                    });
                    angular.forEach(periods, function (val) {
                        $scope.healtyCenterObject.chartObject.options.xAxis.categories.push(val.name);
                    });
                    angular.forEach(periods, function (val) {
                        $scope.dispensaryObject.chartObject.options.xAxis.categories.push(val.name);
                    });

                    $scope.hospitalObject.loadingMessage = "Fetching Hospitals  Data...";
                    $scope.healtyCenterObject.loadingMessage = "Fetching Health Centres Data...";
                    $scope.dispensaryObject.loadingMessage = "Fetching Dispensaries Data...";
                    var method = $scope.data.outMethods[0].id;
                    console.log("methods:",$scope.data.outMethods.length);
                    FPManager.getFPFacilityList().then(function(data){
                        $scope.getNumberPerOu2(data.organisationUnits);
                        if($scope.data.outMethods.length  == 1) {
                            $http.get(portalService.base+'api/sqlViews/GgYRxB7qHaS/data.json?var=types:Hospital&'+FPManager.lastTwelveMonthForSql($scope.data.selectedMonth)).success(function(val1){
                                $rootScope.showProgressMessage = false;
                                angular.forEach(orgUnits, function (yAxis) {
                                    var serie = [];
                                    angular.forEach(periods, function (xAxis) {
                                        serie.push(parseFloat($scope.getNumberPerOu1(data.organisationUnits,yAxis.id,val1.rows,xAxis.id,'Hospital',$scope.data.outMethods[0].name)));
                                    });
                                    $scope.hospitalObject.chartObject.series.push({type: 'spline', name: yAxis.name, data: serie})
                                });
                                $scope.hospitalObject.csvdata = FPManager.prepareDataForCSV($scope.hospitalObject.chartObject);
                                $scope.hospitalObject.showLoader = false;
                                $scope.hospitalObject.chartObject.loading = false;
                            });

                            $http.get(portalService.base+'api/sqlViews/GgYRxB7qHaS/data.json?var=types:Health Center&'+FPManager.lastTwelveMonthForSql($scope.data.selectedMonth)).success(function(val1){
                                $rootScope.showProgressMessage = false;
                                angular.forEach(orgUnits, function (yAxis) {
                                    var serie = [];
                                    angular.forEach(periods, function (xAxis) {
                                        serie.push(parseFloat($scope.getNumberPerOu1(data.organisationUnits,yAxis.id,val1.rows,xAxis.id,'Health Center',$scope.data.outMethods[0].name)));
                                    });
                                    $scope.healtyCenterObject.chartObject.series.push({type: 'spline', name: yAxis.name, data: serie})
                                });
                                $scope.healtyCenterObject.csvdata = FPManager.prepareDataForCSV($scope.healtyCenterObject.chartObject);
                                $scope.healtyCenterObject.showLoader = false;
                                $scope.healtyCenterObject.chartObject.loading = false;
                            });

                            $http.get(portalService.base+'api/sqlViews/GgYRxB7qHaS/data.json?var=types:Dispensary&'+FPManager.lastTwelveMonthForSql($scope.data.selectedMonth)).success(function(val1){
                                $rootScope.showProgressMessage = false;
                                angular.forEach(orgUnits, function (yAxis) {
                                    var serie = [];
                                    angular.forEach(periods, function (xAxis) {
                                        serie.push(parseFloat($scope.getNumberPerOu1(data.organisationUnits,yAxis.id,val1.rows,xAxis.id,'Dispensary',$scope.data.outMethods[0].name)));
                                    });
                                    $scope.dispensaryObject.chartObject.series.push({type: 'spline', name: yAxis.name, data: serie})
                                });
                                $scope.dispensaryObject.csvdata = FPManager.prepareDataForCSV($scope.dispensaryObject.chartObject);
                                $scope.dispensaryObject.showLoader = false;
                                $scope.dispensaryObject.chartObject.loading = false;
                            });
                        }else{
                            console.log("It is reaching here");

                            $http.get(portalService.base+'api/sqlViews/GgYRxB7qHaS/data.json?var=types:Hospital&'+FPManager.lastTwelveMonthForSql($scope.data.selectedMonth)).success(function(val1){

                                $rootScope.showProgressMessage = false;
                                angular.forEach(methodss, function (yAxis) {
                                    var serie = [];
                                    angular.forEach(periods, function (xAxis) {
                                        serie.push(parseFloat($scope.getNumberPerOu1(data.organisationUnits,orgUnits[0].id,val1.rows,xAxis.id,'Hospital',yAxis.name)));
                                    });
                                    $scope.hospitalObject.chartObject.series.push({type: 'spline', name: yAxis.name, data: serie})
                                });
                                console.log("It is reaching here too:",$scope.hospitalObject.chartObject.series);
                                $scope.hospitalObject.csvdata = FPManager.prepareDataForCSV($scope.hospitalObject.chartObject);
                                $scope.hospitalObject.showLoader = false;
                                $scope.hospitalObject.chartObject.loading = false;
                            });

                            $http.get(portalService.base+'api/sqlViews/GgYRxB7qHaS/data.json?var=types:Health Center&'+FPManager.lastTwelveMonthForSql($scope.data.selectedMonth)).success(function(val1){
                                $rootScope.showProgressMessage = false;
                                angular.forEach(methodss, function (yAxis) {
                                    var serie = [];
                                    angular.forEach(periods, function (xAxis) {
                                        serie.push(parseFloat($scope.getNumberPerOu1(data.organisationUnits,orgUnits[0].id,val1.rows,xAxis.id,'Health Center',yAxis.name)));
                                    });
                                    $scope.healtyCenterObject.chartObject.series.push({type: 'spline', name: yAxis.name, data: serie})
                                });
                                $scope.healtyCenterObject.csvdata = FPManager.prepareDataForCSV($scope.healtyCenterObject.chartObject);
                                $scope.healtyCenterObject.showLoader = false;
                                $scope.healtyCenterObject.chartObject.loading = false;
                            });

                            $http.get(portalService.base+'api/sqlViews/GgYRxB7qHaS/data.json?var=types:Dispensary&'+FPManager.lastTwelveMonthForSql($scope.data.selectedMonth)).success(function(val1){
                                $rootScope.showProgressMessage = false;
                                angular.forEach(methodss, function (yAxis) {
                                    var serie = [];
                                    angular.forEach(periods, function (xAxis) {
                                        serie.push(parseFloat($scope.getNumberPerOu1(data.organisationUnits,orgUnits[0].id,val1.rows,xAxis.id,'Dispensary',yAxis.name)));
                                    });
                                    $scope.dispensaryObject.chartObject.series.push({type: 'spline', name: yAxis.name, data: serie})
                                });
                                $scope.dispensaryObject.csvdata = FPManager.prepareDataForCSV($scope.dispensaryObject.chartObject);
                                $scope.dispensaryObject.showLoader = false;
                                $scope.dispensaryObject.chartObject.loading = false;
                            });

                        }
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
        //switching between tables and charts
        $scope.displayTables = {card1: false, card2: false, card3: false}
        $scope.changeTable = function (card, value) {
            if (value == "table") {
                if (card == "card1") {
                    $scope.displayTables.card1 = true
                }
                if (card == "card2") {
                    $scope.displayTables.card2 = true
                }
                if (card == "card3") {
                    $scope.displayTables.card3 = true
                }
            }
            if (value == "chart") {
                if (card == "card1") {
                    $scope.displayTables.card1 = false
                }
                if (card == "card2") {
                    $scope.displayTables.card2 = false
                }
                if (card == "card3") {
                    $scope.displayTables.card3 = false
                }
            }
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
                data=FPManager.getLastTwelveMonthList($scope.data.selectedMonth);
            }if(type == 'methods'){
                data.push({'name':'Male Condoms','id':'W74wyMy1mp0'},
                    {'name':'Female Condoms','id':'p8cgxI3yPx8'},
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

    });





function preparePeriod(period){

    return ""+period+"01;"+period+"02;"+period+"03;"+period+"04;"+period+"05;"+period+"06;"+period+"07;"+period+"08;"+period+"09;"+period+"10;"+period+"11;"+period+"12;"+period+"Q1;"+period+"Q2;"+period+"Q3;"+period+"Q4";
}
