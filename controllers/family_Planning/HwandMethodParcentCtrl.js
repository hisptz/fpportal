
/**
 * Created by kelvin on 1/11/16.
 */
angular.module("hmisPortal")
    .config(function($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    })
    .controller("HwandMethodParcentCtrl",function ($rootScope,$scope,$http,$location,$timeout,olData,olHelpers,shared,portalService,FPManager) {
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

        //$scope.getSelectedMethod = function(){
        //    angular.forEach()
        //}

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



        $scope.getNumberPerOu1 = function(ou,arr2,pe,type,method){
            var num = $scope.getDataFromUrl1(arr2,ou,pe,method,type);

            var percent = (num.trained == 0)?0:(parseInt(num.trainedAndprovide)/parseInt(num.trained))*100;


            return percent.toFixed(2);
        };


        $scope.getSelectedValues = function(){
            if($scope.data.outOrganisationUnits.length === 0){
                alert("no orgunit selected")
            }else
            {
                $scope.titleToUse = "";
                $scope.hospitalObject = {
                    showLoader:true,
                    loadingMessage: "",
                    description:'This charts displays the percentage of hospitals that have at least one provider trained in selected FP method/s AND provided selected FP method/s (as a proportion of all hospitals that are eligible to provide FP services) in the selected geographies, in the indicated 12 month period',
                    display_option_1:'If you select one FP method (eg short-acting) and multiple geographies (eg 4 regions within a zone) you can compare the percentage of hospitals that have at least one health worker trained in providing short-acting methods AND provided at least one short-acting method across the 4 selected regions, over the indicated 12 month period. This allows you to monitor changes over time in provision of the selected FP method, among facilities with trained providers, in the selected regions.',
                    display_option_2:'If you select one geography (eg "Kigoma Region") and multiple FP methods, you can compare the percentage of hospitals that have at least one health worker trained in providing the selected FP method/s AND provided at least one of the selected FP method/s,  within the Kigoma Region. This allows you to monitor changes over time in service provision across FP method types, among facilities with trained providers',
                    option_2:true,
                    indicator_type:'Percentage',
                    numerator:' Total number of hospitals that are: <br>(i) eligible to provide FP services AND <br>(ii) have one or more healthworkers that have achieved training competency  in the selected FP method/s (short-acting, implants, IUCDs, minilap, NSV) AND <br>(iii) have recorded at least one client (of any age, new or returning) through routine/facility-based services, for selected FP method/s (short-acting, implants, IUCDs, In the selected geography for each month in the indicated month.',
                    denominator:'Total number of hospitals that are: <br>(i) eligible to provide FP services AND  <br>(ii) have one or more healthworkers that have achieved training competency  in the selected FP method/s (short-acting, implants, IUCDs, minilap, NSV) In the selected geography for each month in the indicated month.',
                    data_source:'TrainTracker and DHIS-2 FP reporting Tool'
                };

                $scope.dispensaryObject = {
                    showLoader:true,
                    loadingMessage: "",
                    description:'This charts displays the percentage of dispensaries that have at least one provider trained in selected FP method/s AND provided selected FP method/s (as a proportion of all dispensaries that are eligible to provide FP services) in the selected geographies, in the indicated 12 month period',
                    display_option_1:'If you select one FP method (eg short-acting) and multiple geographies (eg 4 regions within a zone) you can compare the percentage of dispensaries that have at least one health worker trained in providing short-acting methods AND provided at least one short-acting method across the 4 selected regions, over the indicated 12 month period. This allows you to monitor changes over time in provision of the selected FP method, among facilities with trained providers, in the selected regions.',
                    display_option_2:'If you select one geography (eg "Kigoma Region") and multiple FP methods, you can compare the percentage of dispensaries that have at least one health worker trained in providing the selected FP method/s AND provided at least one of the selected FP method/s,  within the Kigoma Region. This allows you to monitor changes over time in service provision across FP method types, among facilities with trained providers',
                    option_2:true,
                    indicator_type:'Percentage',
                    numerator:' Total number of dispensaries that are: <br>(i) eligible to provide FP services AND <br>(ii) have one or more healthworkers that have achieved training competency  in the selected FP method/s (short-acting, implants, IUCDs, minilap, NSV) AND <br>(iii) have recorded at least one client (of any age, new or returning) through routine/facility-based services, for selected FP method/s (short-acting, implants, IUCDs, In the selected geography for each month in the indicated month .',
                    denominator:'Total number of dispensaries that are: <br>(i) eligible to provide FP services AND  <br>(ii) have one or more healthworkers that have achieved training competency  in the selected FP method/s (short-acting, implants, IUCDs, minilap, NSV) In the selected geography for each month in the indicated month.',
                    data_source:'TrainTracker and DHIS-2 FP reporting Tool'
                };

                $scope.healtyCenterObject = {
                    showLoader:true,
                    loadingMessage: "",
                    description:'This charts displays the percentage of health centres have at least one provider trained in selected FP method/s AND provided selected FP method/s (as a proportion of all health centres that are eligible to provide FP services) in the selected geographies, in the indicated 12 month period',
                    display_option_1:'If you select one FP method (eg short-acting) and multiple geographies (eg 4 regions within a zone) you can compare the percentage of health centres that have at least one health worker trained in providing short-acting methods AND provided at least one short-acting method across the 4 selected regions, over the indicated 12 month period. This allows you to monitor changes over time in provision of the selected FP method, among facilities with trained providers, in the selected regions.',
                    display_option_2:'If you select one geography (eg "Kigoma Region") and multiple FP methods, you can compare the percentage of health centres that have at least one health worker trained in providing the selected FP method/s AND provided at least one of the selected FP method/s,  within the Kigoma Region. This allows you to monitor changes over time in service provision across FP method types, among facilities with trained providers',
                    option_2:true,
                    indicator_type:'Percentage',
                    numerator:' Total number of health centres that are: <br>(i) eligible to provide FP services AND <br>(ii) have one or more healthworkers that have achieved training competency  in the selected FP method/s (short-acting, implants, IUCDs, minilap, NSV) AND <br>(iii) have recorded at least one client (of any age, new or returning) through routine/facility-based services, for selected FP method/s (short-acting, implants, IUCDs, In the selected geography for each month in the indicated  month .',
                    denominator:'Total number of health centres that are: <br>(i) eligible to provide FP services AND  <br>(ii) have one or more healthworkers that have achieved training competency  in the selected FP method/s (short-acting, implants, IUCDs, minilap, NSV) In the selected geography for each month in the indicated  month .',
                    data_source:'TrainTracker and DHIS-2 FP reporting Tool'
                };

                //hosptals
                $scope.hospitalObject.loadingMessage = "Authenticating portal...";
                $scope.hospitalObject.chartObject = angular.copy(FPManager.chartObject);
                $scope.hospitalObject.chartObject.loading = true;
                $scope.hospitalObject.chartObject.options.title.text ="Percent Hospitals with a Health Worker Trained in and Providing - "+$scope.titleToUse +" "+FPManager.lastMonthWithOtherDataName;

                //dispensary
                $scope.dispensaryObject.loadingMessage = "Authenticating portal...";
                $scope.dispensaryObject.chartObject = angular.copy(FPManager.chartObject);
                $scope.dispensaryObject.chartObject.loading = true;
                $scope.dispensaryObject.chartObject.options.title.text ="Percent Dispensaries with a Health Worker Trained in and Providing - "+$scope.titleToUse +" "+FPManager.lastMonthWithOtherDataName;

                //Health Centers
                $scope.healtyCenterObject.loadingMessage = "Authenticating portal...";
                $scope.healtyCenterObject.chartObject = angular.copy(FPManager.chartObject);
                $scope.healtyCenterObject.chartObject.loading = true;
                $scope.healtyCenterObject.chartObject.options.title.text ="Percent Health Centers with a Health Worker Trained in and Providing - "+$scope.titleToUse +" "+FPManager.lastMonthWithOtherDataName;
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

                    var methodss = [];
                    angular.forEach($scope.data.outMethods,function(method){
                        methodss.push({'name':method.name,'id':method.id});
                    });


                    $scope.hospitalObject.chartObject.options.yAxis.title.text ="% of Facilities";
                    $scope.healtyCenterObject.chartObject.options.yAxis.title.text ="% of Facilities";
                    $scope.dispensaryObject.chartObject.options.yAxis.title.text ="% of Facilities";

                    $scope.hospitalObject.chartObject.options.yAxis.labels = {
                        formatter: function () {
                            return this.value + '%';
                        }
                    };
                    $scope.healtyCenterObject.chartObject.options.yAxis.labels = {
                        formatter: function () {
                            return this.value + '%';
                        }
                    };
                    $scope.dispensaryObject.chartObject.options.yAxis.labels = {
                        formatter: function () {
                            return this.value + '%';
                        }
                    };

                    var orgUnits = $scope.prepareCategory('zones');
                    var periods = [];
                    if($scope.data.outMethods.length == 1){
                        $scope.titleToUse = $scope.data.outMethods[0].name;
                        angular.forEach($scope.data.outMethods,function(value){
                            periods.push({name:value.name,id:value.id})
                        });
                    }else{
                        $scope.titleToUse = $scope.data.outOrganisationUnits[0].name;
                        angular.forEach($scope.data.outOrganisationUnits,function(value){
                            periods.push({name:value.name,id:value.id})
                        });
                    }
                    angular.forEach(periods, function (val) {
                        $scope.hospitalObject.chartObject.options.xAxis.categories.push(val.name);
                        $scope.hospitalObject.chartObject.options.xAxis.labels.style = { visibility: 'hidden' };
                    });
                    angular.forEach(periods, function (val) {
                        $scope.healtyCenterObject.chartObject.options.xAxis.categories.push(val.name);
                        $scope.healtyCenterObject.chartObject.options.xAxis.labels.style = { visibility: 'hidden' };
                    });
                    angular.forEach(periods, function (val) {
                        $scope.dispensaryObject.chartObject.options.xAxis.categories.push(val.name);
                        $scope.dispensaryObject.chartObject.options.xAxis.labels.style = { visibility: 'hidden' };
                    });
                    $scope.hospitalObject.loadingMessage = "Fetching Hospitals  Data...";
                    $scope.healtyCenterObject.loadingMessage = "Fetching Health Centres Data...";
                    $scope.dispensaryObject.loadingMessage = "Fetching Dispensaries Data...";
                    var method = $scope.data.outMethods[0].id;
                        if($scope.data.outMethods.length  == 1){

                            $http.get(portalService.base+'api/sqlViews/Aj6aLkjr7dk/data.json?var=types:Hospital&var=month:'+FPManager.lastMonthWithOtherData ).success(function(val1){
                                $rootScope.showProgressMessage = false;
                                angular.forEach(orgUnits, function (yAxis) {
                                    var serie = [];
                                    angular.forEach(periods, function (xAxis) {
                                        serie.push(parseFloat($scope.getNumberPerOu1(yAxis.id,val1.rows,'','Hospital',xAxis.name)));
                                    });
                                    $scope.hospitalObject.chartObject.series.push({type: 'column', name: yAxis.name, data: serie})
                                });
                                $scope.hospitalObject.csvdata = FPManager.prepareDataForCSV($scope.hospitalObject.chartObject);
                                $scope.hospitalObject.showLoader = false;
                                $scope.hospitalObject.chartObject.loading = false;
                            });

                            $http.get(portalService.base+'api/sqlViews/Aj6aLkjr7dk/data.json?var=types:Health Center&var=month:'+FPManager.lastMonthWithOtherData ).success(function(val1){
                                $rootScope.showProgressMessage = false;
                                angular.forEach(orgUnits, function (yAxis) {
                                    var serie = [];
                                    angular.forEach(periods, function (xAxis) {
                                        serie.push(parseFloat($scope.getNumberPerOu1(yAxis.id,val1.rows,'','Health Center',xAxis.name)));
                                    });
                                    $scope.healtyCenterObject.chartObject.series.push({type: 'column', name: yAxis.name, data: serie})
                                });
                                $scope.healtyCenterObject.csvdata = FPManager.prepareDataForCSV($scope.healtyCenterObject.chartObject);
                                $scope.healtyCenterObject.showLoader = false;
                                $scope.healtyCenterObject.chartObject.loading = false;
                            });


                            $http.get(portalService.base+'api/sqlViews/Aj6aLkjr7dk/data.json?var=types:Dispensary&var=month:'+FPManager.lastMonthWithOtherData ).success(function(val1){
                                $rootScope.showProgressMessage = false;
                                angular.forEach(orgUnits, function (yAxis) {
                                    var serie = [];
                                    angular.forEach(periods, function (xAxis) {
                                        serie.push(parseFloat($scope.getNumberPerOu1(yAxis.id,val1.rows,'','Dispensary',xAxis.name)));
                                    });
                                    $scope.dispensaryObject.chartObject.series.push({type: 'column', name: yAxis.name, data: serie})
                                });
                                $scope.dispensaryObject.csvdata = FPManager.prepareDataForCSV($scope.dispensaryObject.chartObject);
                                $scope.dispensaryObject.showLoader = false;
                                $scope.dispensaryObject.chartObject.loading = false;
                            });

                        }else{

                            $http.get(portalService.base+'api/sqlViews/Aj6aLkjr7dk/data.json?var=types:Hospital&var=month:'+FPManager.lastMonthWithOtherData ).success(function(val1){
                                $rootScope.showProgressMessage = false;
                                angular.forEach(methodss, function (yAxis) {
                                    var serie = [];
                                    angular.forEach(periods, function (xAxis) {
                                        serie.push(parseFloat($scope.getNumberPerOu1($scope.data.outOrganisationUnits[0].id,val1.rows,xAxis.id,'Hospital',yAxis.name)));
                                    });
                                    $scope.hospitalObject.chartObject.series.push({type: 'column', name: yAxis.name, data: serie})
                                });
                                $scope.hospitalObject.csvdata = FPManager.prepareDataForCSV($scope.hospitalObject.chartObject);
                                $scope.hospitalObject.showLoader = false;
                                $scope.hospitalObject.chartObject.loading = false;
                            });

                            $http.get(portalService.base+'api/sqlViews/Aj6aLkjr7dk/data.json?var=types:Health Center&var=month:'+FPManager.lastMonthWithOtherData ).success(function(val1){
                                $rootScope.showProgressMessage = false;
                                angular.forEach(methodss, function (yAxis) {
                                    var serie = [];
                                    angular.forEach(periods, function (xAxis) {
                                        serie.push(parseFloat($scope.getNumberPerOu1($scope.data.outOrganisationUnits[0].id,val1.rows,xAxis.id,'Health Center',yAxis.name)));
                                    });
                                    $scope.healtyCenterObject.chartObject.series.push({type: 'column', name: yAxis.name, data: serie})
                                });
                                $scope.healtyCenterObject.csvdata = FPManager.prepareDataForCSV($scope.healtyCenterObject.chartObject);
                                $scope.healtyCenterObject.showLoader = false;
                                $scope.healtyCenterObject.chartObject.loading = false;
                            });

                            $http.get(portalService.base+'api/sqlViews/Aj6aLkjr7dk/data.json?var=types:Dispensary&var=month:'+FPManager.lastMonthWithOtherData ).success(function(val1){
                                $rootScope.showProgressMessage = false;
                                angular.forEach(methodss, function (yAxis) {
                                    var serie = [];
                                    angular.forEach(periods, function (xAxis) {
                                        serie.push(parseFloat($scope.getNumberPerOu1($scope.data.outOrganisationUnits[0].id,val1.rows,xAxis.id,'Dispensary',yAxis.name)));
                                    });
                                    $scope.dispensaryObject.chartObject.series.push({type: 'column', name: yAxis.name, data: serie})
                                });
                                $scope.dispensaryObject.csvdata = FPManager.prepareDataForCSV($scope.dispensaryObject.chartObject);
                                $scope.dispensaryObject.showLoader = false;
                                $scope.dispensaryObject.chartObject.loading = false;
                            });

                        }
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

        $scope.getDataFromUrl1  = function(arr,ou,pe,method,type){

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
            var num1 = 0;
            if(ou == "m0frOspS7JY" ){
                $.each(arr, function (k, v) {
                    if(v[index] == "1" && v[checkIndex] == "1"){
                        num ++;
                    }
                    if(v[checkIndex] == "1"){
                        num1 ++;
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
                                if(type == "Hospital"){
                                    console.log("method: ",method)
                                    console.log("trained: ",v[index]);
                                    console.log('trained and Provide, ',v[checkIndex])
                                }
                                if(v[index] == "1" && v[checkIndex] == "1"){
                                    num ++;
                                }
                                if(v[checkIndex] == "1"){
                                    num1 ++;
                                }
                            }
                        });
                    });
                } else {
                    $.each(arr, function (k, v) {
                        if (v[0] == ou || v[1] == ou) {
                            if(v[index] == "1" && v[checkIndex] == "1"){
                                num ++;
                            }
                            if(v[checkIndex] == "1"){
                                num1 ++;
                            }
                        }
                    });
                }
            }
            if(type == "Hospital"){
                console.log("method: ",method)
                console.log("trained: ",num1);
                console.log('trained and Provide, ',num)
            }

            return {trainedAndprovide:num,trained:num1};
        };
    });





function preparePeriod(period){

    return ""+period+"01;"+period+"02;"+period+"03;"+period+"04;"+period+"05;"+period+"06;"+period+"07;"+period+"08;"+period+"09;"+period+"10;"+period+"11;"+period+"12;"+period+"Q1;"+period+"Q2;"+period+"Q3;"+period+"Q4";
}
