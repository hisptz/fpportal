/**
 * Created by kelvin on 12/10/15.
 */
/**
 * Created by kelvin on 11/26/15.
 */

angular.module("hmisPortal")
    .config(function($httpProvider) {

    })
    .controller("menuController",function ($rootScope,$scope,$http,portalService,FPManager,$location,Base64,$timeout) {
        $scope.isActive = function (viewLocation) {
            var active = (viewLocation === $location.path());
            return active;

        };

        $scope.selectOnly1Or2 = function(item, selectedItems) {
            if (selectedItems  !== undefined && selectedItems.length >= 7) {
                return false;
            } else {
                return true;
            }
        };

        $scope.geographicalZones = FPManager.zones;
        $scope.updateTree1 = function(){
            $scope.data.orgUnitTree3 = [];
            $scope.data.orgUnitTree4 = [];
            $scope.zoneRegions1 = [];
            angular.forEach($scope.geographicalZones.organisationUnitGroups,function(value){

                angular.forEach(value.organisationUnits,function(regions){
                    var regionDistricts = [];
                    angular.forEach(regions.children,function(district){
                        regionDistricts.push({name:district.name,id:district.id });
                    });
                    $scope.zoneRegions1.push({ name:regions.name,id:regions.id, children:regionDistricts });
                });
                //$scope.data.orgUnitTree1.push({ name:value.name,id:value.id, children:zoneRegions});
            });
            $scope.data.orgUnitTree4.push({name:"Tanzania",id:'m0frOspS7JY',children:$scope.zoneRegions1,selected:true });
        };
        $scope.updateTree1();

        $scope.addSubscriber = function(){
            $rootScope.progressMessage = "Adding you to the list of subscribers, Please wait ...";
            $rootScope.showProgressMessage = true;
            var userPayload = {
                firstName: $scope.newUser.name,
                surname: $scope.newUser.name,
                email: $scope.newUser.email,
                userCredentials: {
                    username: $scope.newUser.name.replace(/ /g,''),
                    password: "DHIS2016",
                    userRoles: [ {
                        id: "Euq3XfEIEbx"
                    } ]
                },
                organisationUnits: [ {
                    id: "ImspTQPwCqd"
                } ],
                userGroups: [ {
                    id: "vAvEltyXGbD"
                } ]
            }
            var authdata = Base64.encode('portal:Portal123');
            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
            $http.get(portalService.base +"api/userGroups.json?filter=name:eq:Portal Subscription").then(function(result){
                console.log(result);
                console.log(result.data.userGroups[0]);

                $http.post(portalService.base +"api/users",userPayload).then(function(result){
                    console.log(result);
                    $rootScope.progressMessage = "You have been subscribed Successfully.";
                    $rootScope.showProgressMessage = true;
                    $timeout(function(){
                        $rootScope.showProgressMessage = false;
                    },2000)
                });
            });
        }



    })
    .controller("clientDemographicsCtrl",function ($rootScope,$scope,$http,portalService,FPManager,$location) {

        //var geoZonesUrl = "https://dhis.moh.go.tz/api/organisationUnitGroupSets/eVyUn5tE93t.json?fields=id,name,organisationUnitGroups[id,name,organisationUnits[id,name]]";

        $rootScope.showProgressMessage = false;
        $scope.geographicalZones = FPManager.zones;
        $scope.geoToUse = [];
        $scope.zones = "";

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

        $scope.updateTree();

        $scope.methods = [
            {'name':'Male Condoms','id':'W74wyMy1mp0','facility':'','outreach':''},
            {'name':'Female Condoms','id':'p8cgxI3yPx8','facility':'','outreach':''},
            {'name':'Oral Pills','id':'aSJKs4oPZAf','facility':'','outreach':''},
            {'name':'Injectables','id':'LpkdcaLc4I9','facility':'','outreach':''},
            {'name':'Implants','id':'p14JdJaG2aC','facility':'lMFKZN3UaYp','outreach':'ZnTi99UdGCS'},
            {'name':'IUCDs','id':'GvbkEo6sfSd','facility':'UjGebiXNg0t','outreach':'RfSsrHPGBXV'},
            {'name':'NSV','id':'p14JdJaG2a','facility':'JSmtnnW6WrR','outreach':'chmWn8ksICz'},
            {'name':'Mini Lap','facility':'xhcaH3H3pdK','outreach':'xip1SDutimh'},
            {'name':'Natural FP','id':'QRCRjFreECE','facility':'','outreach':''}];

        $scope.updateMethod = function(){
            $scope.data.menuMethods = [];
            angular.forEach($scope.methods,function(value){
                if(value.name == "Implants"){
                    $scope.data.menuMethods.push({ name:value.name,id:value.id,'facility':value.facility,'outreach':value.outreach,selected:true });
                }else{
                    $scope.data.menuMethods.push({ name:value.name,id:value.id,'facility':value.facility,'outreach':value.outreach });
                }
            });

        };

        $scope.selectOnly1Or2 = function(item, selectedItems) {

            if (selectedItems  !== undefined && selectedItems.length >= 1) {
            }
            if (selectedItems  !== undefined && selectedItems.length >= 7) {
                return false;
            } else {
                return true;
            }
        };

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

        $scope.displayMesage = true;
        $scope.displayshortMesage = true;

        $scope.updateDisplayMessage = function(methods){
            $scope.displayMesage = false;
            angular.forEach(methods,function(value){
                if(value.name == 'Implants' || value.name == 'IUCDs' || value.name == 'NSV' || value.name == 'Mini Lap'){
                    $scope.displayMesage = true;
                }
            });
        };

        $scope.updateDisplayShortMessage = function(methods){
            $scope.displayshortMesage = false;
            angular.forEach(methods,function(value){
                if(value.name == 'Male Condoms' || value.name == 'Female Condoms' || value.name == 'Oral Pills' || value.name == 'Implants' || value.name == 'Injectables' || value.name == 'IUCDs' || value.name == 'Natural FP'){
                    $scope.displayshortMesage = true;
                }
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

        $scope.getSingleMethods = function(methods){
            var method = "";
            if(methods.length === 1){
                angular.forEach(methods,function(value){
                    method= value.name;
                });
            }else{
                angular.forEach($scope.data.outOrganisationUnits,function(value){
                    method += value.name+", ";
                });
            }
            return method;

        };

        $scope.displayTables = {card1:false,card2:false}
        $scope.changeTable =function(card,value){
            if(value == "table"){
                if(card == "card1"){$scope.displayTables.card1 = true}
                if(card == "card2"){$scope.displayTables.card2 = true}
            }if(value == "chart"){
                if(card == "card1"){$scope.displayTables.card1 = false}
                if(card == "card2"){$scope.displayTables.card2 = false}
            }
        };

        $scope.prepareHeaders = function(arr){
            var headers = [""]
            angular.forEach(arr.xAxis.categories,function(value){
                headers.push(value);
            })
            return headers;
        };


        $scope.fpCards = [

            {
                title:'New Family Planning clients < 20 Years of Age through Routine Facility-Based Service and Community Based Distribution '+FPManager.lastTwelveMonthName,
                description:'Total Clients Monthly',
                cardClass:"col s12 m12",
                data:$scope.methods,
                category:'month',
                category1:'month',
                icons:angular.copy(portalService.minimalIcons),
                displayTable:false,
                displayMap:false,
                chart:'line',
                yaxisTittle:"# of Clients",
                visible:'consumption by demographic',
                chartObject:angular.copy(FPManager.chartObject),
                showLoader:true,
                loadingMessage: "",
                description:'This charts displays changes over time in total number of new routine facility-based FP clients under the age of 20, for the selected FP method/s, in the selected geographies, in the indicated 12 month period',
                display_option_1:'If you select one FP method (eg  injectables) and multiple geographies (eg 6 regions within a zone) you can compare the total number of new injectable clients aged <20 across the 6 selected regions, over time. This allows you to compare geographic differences in the number of new clients aged <20  (for a given FP method) and identify unusual variations in the trends over time.',
                display_option_2:'If you select one geography (eg "Lake Zone") and multiple FP methods, you can compare the total number of clients in each selected FP method, within Lake Zone, over time. This allows you to compare difference between FP methods in the number of clients served (in a given geography) and can help identify unusual variations in the trend over time.',
                option_2:true,
                indicator_type:'Number',
                numerator:'Total number of new clients aged below 20 recorded by each facility as having received the selected FP method/s (oral pills, male condoms, female condoms, injectables, implants, IUCDs, minilap, NSV) either through CBD or routine-facility based service, in the selected geography, for each month in the indicated 12 month period',
                denominator:'N/A',
                data_source:'DHIS-2 FP reporting Tool'

        }, {
                title:'Family Planning clients through Routine Facility-Based and Outreach-Based Service '+FPManager.lastMonthWithOtherDataName,
                description:'Family Planning clients through Routine Facility-Based and Outreach-Based Service '+FPManager.lastMonthWithOtherDataName,
                cardClass:"col s12 m12",
                data:$scope.methods,
                category:'quarter',
                category1:'routineFacility',
                icons:angular.copy(portalService.minimalIcons),
                displayTable:false,
                displayMap:false,
                chart:'line',
                yaxisTittle:"# of Clients",
                visible:'consumption by demographic',
                chartObject:angular.copy(FPManager.chartObject),
                showLoader:true,
                loadingMessage: "",
                description:'This charts displays the total number of long-acting and/or permanent method FP clients through outreach vs routine service modalities, in the selected geographies, for the indicated month',
                display_option_1:'If you select one long acting  or permanent FP method (eg implants) and multiple geographies (eg 6 districts within your region) you can compare the total number of implant clients by outreach vs routine service modality, across the 6 selected districts. This allows you to compare the number of clients and the service modality across geographic areas, in a given month.',
                display_option_2:'If you select one geography (eg "Morogoro District Council") and multiple long acting and/or permanent FP methods, you can compare the total number of clients in each selected FP method, within Morogoro DC. This allows you to compare the total number of clients and the service modality between different FP methods, in a given geography, in a given month.',
                option_2:true,
                indicator_type:'Number',
                numerator:'Series 1: ("Routine Facility-Based Services"):<br> Total number of clients recorded by each facility as having received the selected permanent or long acting FP method/s (implants, IUCDs, minilap, NSV) through routine facility-based service modality, in the selected geography, for the indicated month <br> Series 2: ("Outreach-Based Services) <br> Total number of clients recorded by each facility as having received the selected permanent or long acting FP method/s (implants, IUCDs, minilap, NSV) through outreach-based service modality, in the selected geography, for the indicated month',
                denominator:'N/A',
                data_source:'DHIS-2 FP reporting Tool'

            }];
        $scope.getSingleMethods = function(uid){
            var method = [];
            angular.forEach($scope.methods,function(value){
                if(value.id == uid){
                    method.push(value);
                }
            });
        };

        $scope.getSingleMethodForOutreach = function(uid){
            var method = {};
            var meth = {};
            angular.forEach($scope.methods,function(value){
                if(value.id == uid){
                    method = value;
                }
            });
            var methods = $scope.prepareCategory('routineOutreachMethod');
            angular.forEach(methods, function (val) {
                if(val.name == method.name){
                    meth = val;
                }
            });
            return meth;
        };
        $scope.prepareSeries = function(cardObject,chart){
            cardObject.chartObject.loading = true;
            cardObject.loadingMessage = "Authenticating portal...";
            $.post( portalService.base + "dhis-web-commons-security/login.action?authOnly=true", {
                j_username: "portal", j_password: "Portal123"
            },function() {
                if($scope.data.outMethods.length == 1){
                    $scope.titleToUse = $scope.data.outMethods[0].name;
                }else{
                    $scope.titleToUse = $scope.data.outOrganisationUnits[0].name;
                }
                if (chart == 'table') {
                    cardObject.displayTable = true;
                    cardObject.displayMap = false;
                }
                else {
                    cardObject.displayMap = false;
                    cardObject.displayTable = false;
                }
                cardObject.chartObject.options.title.text = cardObject.title + " - " +$scope.titleToUse;
                cardObject.chartObject.options.yAxis.title.text = cardObject.yaxisTittle;

                var peri = preparePeriod($scope.selectedPeriod);
                //$scope.url = "https://dhis.moh.go.tz/api/analytics.json?dimension=dx:W74wyMy1mp0;p8cgxI3yPx8;aSJKs4oPZAf;LpkdcaLc4I9;p14JdJaG2aC;GvbkEo6sfSd;QRCRjFreECE&dimension=ou:"+FPManager.getUniqueOrgUnits($scope.data.outOrganisationUnits)+"&dimension=pe:201401;201402;201403;201404;201405;201406;201407;201408;201409;201410;201411;201412;2014Q1;2014Q2;2014Q3;2014Q4&displayProperty=NAME";
                var area = [];
                cardObject.chartObject.loading = true;
                var datass = '';

                if ($scope.selectedMethod == 1) {
                    if (cardObject.category1 == "month") {
                        cardObject.category = 'month';
                        cardObject.data = $scope.methods;
                    }
                    if (cardObject.category1 == 'zones') {
                        cardObject.data = [{'name': 'All Clients', 'id': 'jvwTTzpWBD0'}];
                    }
                    if (cardObject.category1 == 'routineFacility') {
                        cardObject.data = $scope.prepareCategory('routineOutreachMethod')
                    }
                } else {
                    if (cardObject.category1 == "month") {
                        cardObject.category = 'month';
                        cardObject.data = $scope.prepareCategory('zones');
                    }
                    if (cardObject.category1 == 'zones') {
                        cardObject.data = $scope.getSingleMethods($scope.selectedMethod);
                    }
                }

                $scope.url1 = portalService.base + "api/analytics.json?dimension=dx:lMFKZN3UaYp;ZnTi99UdGCS;UjGebiXNg0t;RfSsrHPGBXV;JSmtnnW6WrR;xhcaH3H3pdK;xip1SDutimh;chmWn8ksICz&dimension=ou:" + FPManager.getUniqueOrgUnits($scope.data.outOrganisationUnits) + "&dimension=pe:201412;&displayProperty=NAME";
                $scope.url = portalService.base + "api/analytics.json?dimension=dx:W74wyMy1mp0;p8cgxI3yPx8;aSJKs4oPZAf;LpkdcaLc4I9;p14JdJaG2aC;GvbkEo6sfSd;QRCRjFreECE&dimension=ou:" + FPManager.getUniqueOrgUnits($scope.data.outOrganisationUnits) + "&dimension=pe:201401;201402;201403;201404;201405;201406;201407;201408;201409;201410;201411;201412&displayProperty=NAME";

                //data for routine facility
                cardObject.loadingMessage = "Fetching Data...";
                if (cardObject.category1 == 'routineFacility') {
                    $http.get($scope.url1).success(function (data) {

                        $scope.updateDisplayMessage($scope.data.outMethods);
                        if (data.hasOwnProperty('metaData')) {
                            var cats = ['Routine', 'Outreach'];

                            //if selected method == all
                            if ($scope.data.outMethods.length > 1) {
                                var subcats = $scope.prepareCategory('routineOutreachMethod');
                                cardObject.chartObject.xAxis.categories = [];
                                angular.forEach(subcats, function (value) {
                                    cardObject.chartObject.xAxis.categories.push(value.name);
                                });
                                var orgUnits = $scope.prepareOu();
                                $scope.normalseries1 = [];
                                if (chart == 'table') {
                                    cardObject.table = {}
                                    cardObject.table.headers = [];
                                    cardObject.table.colums = [];
                                    angular.forEach(cats, function (value) {
                                        var serie = [];
                                        cardObject.table.headers.push(value);
                                    });
                                    angular.forEach(subcats, function (val) {
                                        var seri = [];
                                        angular.forEach(cats, function (value) {
                                            if (value == "Routine") {
                                                var number = parseInt($scope.getDataFromUrl(data.rows, orgUnits[0].id, 'methods', val.facility));

                                            }
                                            if (value == "Outreach") {
                                                var number = parseInt($scope.getDataFromUrl(data.rows, orgUnits[0].id, 'methods', val.outreach));
                                            }
                                            seri.push({name: value.name, value: parseInt(number)});
                                        });
                                        cardObject.table.colums.push({name: val.name, values: seri});
                                    });
                                }
                                else {
                                    delete cardObject.chartObject.chart;
                                    angular.forEach(cats, function (val) {
                                        var serie = [];
                                        angular.forEach(subcats, function (value) {
                                            if (val == "Routine") {
                                                var number = parseInt($scope.getDataFromUrl(data.rows, orgUnits[0].id, 'methods', value.facility));
                                            }
                                            if (val == "Outreach") {
                                                var number =  parseInt($scope.getDataFromUrl(data.rows, orgUnits[0].id, 'methods', value.outreach));
                                            }
                                            serie.push(number);
                                        });

                                        $scope.normalseries1.push({type: 'bar', name: val, data: serie})
                                    });
                                    cardObject.chartObject.series = $scope.normalseries1;
                                }
                                cardObject.chartObject.loading = false
                            }
                            //if the single method has been selected
                            else if($scope.data.outMethods.length == 1){
                                var orgunits = $scope.prepareCategory('zones');
                                var singleMethod = $scope.prepareCategory('routineOutreachMethod');
                                cardObject.chartObject.options.xAxis.categories = [];
                                angular.forEach(orgunits, function (value) {
                                    cardObject.chartObject.options.xAxis.categories.push(value.name);
                                });
                                $scope.normalseries2 = [];

                                    angular.forEach(cats, function (val) {
                                        var serie = [];
                                        angular.forEach(orgunits, function (value) {
                                            if (val == "Routine") {
                                                var number = parseInt($scope.getDataFromUrl(data.rows, value.id, 'methods', $scope.data.outMethods[0].facility));
                                            }
                                            if (val == "Outreach") {
                                                var number = parseInt($scope.getDataFromUrl(data.rows, value.id, 'methods', $scope.data.outMethods[0].outreach));
                                            }
                                            serie.push(number);
                                        });
                                        $scope.normalseries2.push({type: 'column', name: val, data: serie});

                                    });
                                    cardObject.chartObject.series = $scope.normalseries2;
                                    cardObject.csvdata = FPManager.prepareDataForCSV(cardObject.chartObject);

                                cardObject.chartObject.loading = false;
                                cardObject.showLoader = false;
                            }

                        }
                    });
                }
                else {
                ////////////////////////////data for <20/////////////////////////////////////////////
                    $scope.updateDisplayShortMessage($scope.data.outMethods);
                $http.get($scope.url).success(function (data) {
                    $rootScope.showProgressMessage = false;
                    if (data.hasOwnProperty('metaData')) {
                        var xAxisItems = [];
                        var yAxisItems = [];
                        var methodId = [];
                        if($scope.data.outMethods.length == 1){
                            xAxisItems = $scope.prepareCategory('zones');
                            yAxisItems = $scope.prepareCategory('month');
                        }else{
                            xAxisItems = $scope.prepareCategory('methods');
                            yAxisItems = $scope.prepareCategory('month');
                        }
                        cardObject.chartObject.options.xAxis.categories = [];
                        angular.forEach(yAxisItems, function (value) {
                            cardObject.chartObject.options.xAxis.categories.push(value.name);
                        });
                        $scope.normalseries1 = [];
                        if (chart == 'table') {
                            cardObject.table = {};
                            cardObject.table.headers = [];
                            cardObject.table.colums = [];
                            angular.forEach(xAxisItems, function (value) {
                                var serie = [];
                                cardObject.table.headers.push(value);
                            });
                            angular.forEach(yAxisItems, function (val) {
                                var seri = [];
                                angular.forEach(xAxisItems, function (value) {
                                    var number = $scope.getDataFromUrl(data.rows, orgUnits[0].id, 'methods'.category, methodId);
                                    seri.push({name: value.name, value: parseInt(number)});
                                });
                                cardObject.table.colums.push({name: val.name, values: seri});
                            });
                        }
                        else {
                            delete cardObject.chartObject.chart;
                            angular.forEach(xAxisItems, function (val) {
                                var serie = [];
                                angular.forEach(yAxisItems, function (value) {
                                    if($scope.data.outMethods.length == 1){
                                        var number = $scope.getDataForFirstChart(data.rows, val.id, value.id, $scope.data.outMethods[0].id);
                                    }else{
                                        var number = $scope.getDataForFirstChart(data.rows,$scope.data.outOrganisationUnits[0].id, value.id, val.id);
                                    }
                                    serie.push(number);
                                });
                                $scope.normalseries1.push({type: 'spline', name: val.name, data: serie})
                            });
                            cardObject.chartObject.series = $scope.normalseries1;
                            cardObject.csvdata = FPManager.prepareDataForCSV(cardObject.chartObject);
                            cardObject.showLoader = false;
                            cardObject.chartObject.loading = false;

                        }

                    } else {
                        cardObject.chartObject.loading = false;
                        cardObject.showLoader = false;
                    }

                });
            }
            });

        };

        $scope.prepareOu = function(){
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
            return orgUnits;
        }


        $scope.prepareData = function(jsonObject,categories,type,card){
            var structure = {};
            var data = [];
            var elements = [];
            var arr = card.data;
            angular.forEach(arr,function(val){
                elements.push({'name':val.name,'uid':val.id})
            });
            angular.forEach(categories,function(region){
                data.push({'name':region.name,'id':region.id});
            });
            structure.regions = data;
            structure.elements = elements;

            return structure;
        };

        $scope.getDataForFirstChart  = function(arr,ou,pe,de){

            var num = 0;
            var k = 1;


            k =1
            num =0;
            if(ou == 'none'){

            }else{
                if ((ou.indexOf(';') > -1)) {
                    var orgArr = ou.split(";");
                    var i = 0;
                    $.each(orgArr, function (c, j) {
                        i++;
                        $.each(arr, function (k, v) {
                            if (v[0] == de) {
                                if (v[1] == j && v[2] == pe) {
                                    num += parseInt(v[3]);
                                }
                            }
                        });
                    });
                } else {
                    $.each(arr, function (k, v) {
                        if (v[0] == de) {
                            if (v[1] == ou && v[2] == pe) {
                                num += parseInt(v[3]);
                            }
                        }
                    });
                }
            }

            return num;
        }

        $scope.getDataFromUrl  = function(arr,ou,type,de){
            var num = 0;
            var k = 1;

            if(type == 'zones'){
                k =1;
                num =0;
                var orgs = ou.substring(1, ou.length-1);
                var orgArr = orgs.split(";");
                $.each(orgArr,function(c,j){
                    $.each(arr,function(k,v){
                        if(v[1] == j && v[0] == de){
                            num += parseInt(v[3])
                        }
                    });
                });

            }if(type == 'month'){
                if($scope.selectedMethod == "all"){
                    $.each(arr,function(k,v){
                        if(v[2] == ou && v[0] == de){
                            num = num+parseInt(v[3])
                        }
                    });
                }else{
                    var orgArr = de.split(";");
                    $.each(orgArr,function(c,j){
                        $.each(arr,function(k,v){
                            if(v[2] == ou && v[1] == j && v[0] == $scope.selectedMethod){
                                num = num+parseInt(v[3])
                            }
                        });
                    });

                }
//
            }if(type == 'methods') {


                if ((ou.indexOf(';') > -1)) {

                    var orgArr = ou.split(";");
                    var i = 0;
                    $.each(orgArr, function (c, j) {
                        i++;
                        $.each(arr, function (k, v) {
                            if (v[0] == de) {
                                if (v[1] == j) {
                                    num += parseInt(v[3]);
                                }
                            }
                        });
                    });
                } else {
                    $.each(arr, function (k, v) {
                        if (v[0] == de && v[1] == ou ) {
                            num += v[3];
                        }
                    });
                }

                return num;
            }
            return num;
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
                data.push({'name':'Nov'+per,'id':per+'11'});
                data.push({'name':'Dec '+per,'id':per+'12'});
            }if(type == 'methods'){
                angular.forEach($scope.data.outMethods,function(value){
                    if(value.name == 'Male Condoms' || value.name == 'Female Condoms' || value.name == 'Oral Pills' || value.name == 'Injectables' || value.name == 'Implants' || value.name == 'IUCDs' || value.name == 'Natural FP')
                        data.push({'name':value.name,'id':value.id})
                });
            }if(type == 'routineOutreachMethod'){
                angular.forEach($scope.data.outMethods,function(value){
                    if(value.name == 'Implants' || value.name == 'IUCDs' || value.name == 'NSV' || value.name == 'Mini Lap'){
                        data.push({'name':value.name,'facility':value.facility,'outreach':value.outreach})
                    }
                });
            }if(type == 'method'){
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
            }

            return data;
        };


        //second chart issues



        $rootScope.firstClick = function(){
            angular.forEach($scope.fpCards,function(value){
                $scope.prepareSeries(value,value.chart);
            });
        };
        $scope.firstClick();
    });

function preparePeriod(period){

    return ""+period+"01;"+period+"02;"+period+"03;"+period+"04;"+period+"05;"+period+"06;"+period+"07;"+period+"08;"+period+"09;"+period+"10;"+period+"11;"+period+"12";
}



