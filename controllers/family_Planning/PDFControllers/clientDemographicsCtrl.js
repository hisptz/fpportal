/**
 * Created by kelvin on 12/10/15.
 */
/**
 * Created by kelvin on 11/26/15.
 */

angular.module("hmisPortal")
    .config(function ($httpProvider) {

    })
    .controller("clientDemographicsCtrl", function ($rootScope, $scope, $http, portalService, FPManager, $location,$timeout) {

        $rootScope.showProgressMessage = false;
        $scope.geographicalZones = FPManager.zones;
        $scope.geoToUse = [];
        $scope.zones = "";
        angular.forEach($scope.geographicalZones.organisationUnitGroups, function (value) {
            $scope.zones += value.id + ";";
            $scope.geoToUse.push({name: value.name, id: value.id, ticked: true});
        });
        $scope.data = {};
        $scope.updateTree = function () {
            $scope.data.orgUnitTree1 = [];
            $scope.data.orgUnitTree = [];
            angular.forEach($scope.geographicalZones.organisationUnitGroups, function (value) {
                var zoneRegions = [];
                angular.forEach(value.organisationUnits, function (regions) {
                    var regionDistricts = [];
                    angular.forEach(regions.children, function (district) {
                        regionDistricts.push({name: district.name, id: district.id});
                    });
                    zoneRegions.push({name: regions.name, id: regions.id, children: regionDistricts});
                });
                $scope.data.orgUnitTree1.push({name: value.name, id: value.id, children: zoneRegions, selected: true});
            });
            $scope.data.orgUnitTree.push({name: "Tanzania", id: 'm0frOspS7JY', children: $scope.data.orgUnitTree1});
        };

        $scope.updateTreeWithOne = function () {
            $scope.data.orgUnitTree1 = [];
            $scope.data.orgUnitTree = [];
            angular.forEach($scope.geographicalZones.organisationUnitGroups, function (value) {
                var zoneRegions = [];
                angular.forEach(value.organisationUnits, function (regions) {
                    var regionDistricts = [];
                    angular.forEach(regions.children, function (district) {
                        regionDistricts.push({name: district.name, id: district.id});
                    });
                    zoneRegions.push({name: regions.name, id: regions.id, children: regionDistricts});
                });
                $scope.data.orgUnitTree1.push({name: value.name, id: value.id, children: zoneRegions});
            });
            $scope.data.orgUnitTree.push({
                name: "Tanzania",
                id: 'm0frOspS7JY',
                children: $scope.data.orgUnitTree1,
                selected: true
            });
        };

        $scope.updateTree();

        $scope.methods = [
            {'name': 'Male Condoms', 'id': 'W74wyMy1mp0', 'facility': '', 'outreach': ''},
            {'name': 'Female Condoms', 'id': 'p8cgxI3yPx8', 'facility': '', 'outreach': ''},
            {'name': 'Oral Pills', 'id': 'aSJKs4oPZAf', 'facility': '', 'outreach': ''},
            {'name': 'Injectables', 'id': 'LpkdcaLc4I9', 'facility': '', 'outreach': ''},
            {'name': 'Implants', 'id': 'p14JdJaG2aC', 'facility': 'lMFKZN3UaYp', 'outreach': 'ZnTi99UdGCS'},
            {'name': 'IUCDs', 'id': 'GvbkEo6sfSd', 'facility': 'UjGebiXNg0t', 'outreach': 'RfSsrHPGBXV'},
            {'name': 'NSV', 'id': 'p14JdJaG2a', 'facility': 'JSmtnnW6WrR', 'outreach': 'chmWn8ksICz'},
            {'name': 'Mini Lap', 'facility': 'xhcaH3H3pdK', 'outreach': 'xip1SDutimh'},
            {'name': 'Natural FP', 'id': 'QRCRjFreECE', 'facility': '', 'outreach': ''}];

        $scope.updateMethod = function () {
            $scope.data.menuMethods = [];
            angular.forEach($scope.methods, function (value) {
                if (value.name == "Implants") {
                    $scope.data.menuMethods.push({
                        name: value.name,
                        id: value.id,
                        'facility': value.facility,
                        'outreach': value.outreach,
                        selected: true
                    });
                } else {
                    $scope.data.menuMethods.push({
                        name: value.name,
                        id: value.id,
                        'facility': value.facility,
                        'outreach': value.outreach
                    });
                }
            });

        };

        $scope.selectOnly1Or2 = function (item, selectedItems) {

            if (selectedItems !== undefined && selectedItems.length >= 1) {
            }
            if (selectedItems !== undefined && selectedItems.length >= 7) {
                return false;
            } else {
                return true;
            }
        };

        $scope.$watch('data.outOrganisationUnits', function () {
            if ($scope.data.outOrganisationUnits) {
                if ($scope.data.outOrganisationUnits.length > 1) {
                    $scope.updateMethod();
                } else {

                }
            }

        }, true);

        $scope.$watch('data.outMethods', function () {
            if ($scope.data.outMethods) {
                if ($scope.data.outMethods.length > 1) {
                    $scope.updateTreeWithOne();
                } else {

                }
            }

        }, true);


        $scope.changeZone = function () {
            $scope.zones = "";
            angular.forEach($scope.selectedRegions, function (value) {
                $scope.zones += value.id + ";";
            });
            $scope.firstClick();
        };
        $scope.selectedMethod = 'all';
        $scope.selectedPeriod = '2014';
        $scope.data.chartType = 'column';
        $scope.displayTable = false;
        $scope.currentOrgUnit = "m0frOspS7JY";
        $scope.changeChart = function (type, card) {
            card.displayTable = false;

            $scope.showReport = true;
            if (type == 'table') {
                card.displayTable = true;
                card.displayMap = false;
                card.chart = 'table';
                $scope.data.chartType = 'table';
            } else if (type == 'map') {
                card.displayMap = true;
                card.displayTable = false;
                card.chart = 'map';
                $scope.data.chartType = 'map';
            }
            else {
                card.displayMap = false;
                card.displayTable = false;
                card.chart = type;
                $scope.data.chartType = type;
            }
            $scope.prepareSeries(card, $scope.data.chartType);
        };

        $scope.FPmethods = [
            {'name': 'Male Condoms', 'uid': 'W74wyMy1mp0'},
            {'name': 'Female Condoms', 'uid': 'p8cgxI3yPx8'},
            {'name': 'Oral Pills', 'uid': 'aSJKs4oPZAf'},
            {'name': 'Injectables', 'uid': 'LpkdcaLc4I9'},
            {'name': 'Implants', 'uid': 'p14JdJaG2aC'},
            {'name': 'IUCDs', 'uid': 'GvbkEo6sfSd'},
            {'name': 'Natural FP', 'uid': 'QRCRjFreECE'},
            {'name': 'Eastern Zone', 'uid': 'gb4r7CSrT7U'},
            {'name': 'Lake Zone', 'uid': 'RRGOg1GyLsd'},
            {'name': 'Northern Zone', 'uid': 'nvKJnetaMxk'},
            {'name': 'Southern Highlands Zone', 'uid': 'kcE3vG4Eq3Q'},
            {'name': 'Southern Zone', 'uid': 'hiqGDmNAFJz'},
            {'name': 'Western Zone', 'uid': 'zITJeBfrJ4J'},
            {'name': 'Central Zone', 'uid': 'gzWRK9qFFVp'},
            {'name': 'MOH Tanzania', 'uid': 'm0frOspS7JY'}
        ];


        $scope.displayMesage = true;
        $scope.displayshortMesage = true;

        $scope.updateDisplayMessage = function (methods) {
            $scope.displayMesage = false;
            angular.forEach(methods, function (value) {
                if (value.name == 'Implants' || value.name == 'IUCDs' || value.name == 'NSV' || value.name == 'Mini Lap') {
                    $scope.displayMesage = true;
                }
            });
        };

        $scope.updateDisplayShortMessage = function (methods) {
            $scope.displayshortMesage = false;
            angular.forEach(methods, function (value) {
                if (value.name == 'Male Condoms' || value.name == 'Female Condoms' || value.name == 'Oral Pills' || value.name == 'Implants' || value.name == 'Injectables' || value.name == 'IUCDs' || value.name == 'Natural FP') {
                    $scope.displayshortMesage = true;
                }
            });
        }
        $scope.updateMethod();

        $scope.selectOnly1Or3 = function (item, selectedItems) {
            if (selectedItems !== undefined && selectedItems.length >= 7) {
                return false;
            } else {
                return true;
            }
        };

        $scope.getSingleMethods = function (methods) {
            var method = "";
            if (methods.length === 1) {
                angular.forEach(methods, function (value) {
                    method = value.name;
                });
            } else {
                angular.forEach($scope.data.outOrganisationUnits, function (value) {
                    method += value.name + ", ";
                });
            }
            return method;

        };

        $scope.displayTables = {card1: false, card2: false}
        $scope.changeTable = function (card, value) {
            if (value == "table") {
                if (card == "card1") {
                    $scope.displayTables.card1 = true
                }
                if (card == "card2") {
                    $scope.displayTables.card2 = true
                }
            }
            if (value == "chart") {
                if (card == "card1") {
                    $scope.displayTables.card1 = false
                }
                if (card == "card2") {
                    $scope.displayTables.card2 = false
                }
            }
        };

        $scope.prepareHeaders = function (arr) {
            var headers = [""]
            angular.forEach(arr.xAxis.categories, function (value) {
                headers.push(value);
            })
            return headers;
        };


        $scope.fpCards = [

            {
                title: 'New Family Planning clients < 20 Years of Age through Routine Facility-Based Service and Community Based Distribution ' + FPManager.getlastTwelveMonthName(FPManager.lastMonthWithData),
                description: 'Total Clients Monthly',
                cardClass: "col s12 m12",
                data: $scope.methods,
                category: 'month',
                category1: 'month',
                icons: angular.copy(portalService.minimalIcons),
                displayTable: false,
                displayMap: false,
                chart: 'line',
                yaxisTittle: "# of Clients",
                visible: 'consumption by demographic',
                chartObject: angular.copy(portalService.chartObject)

            }, {
                title: 'Family Planning clients through Routine Facility-Based and Outreach-Based Service ' + FPManager.getMonthName(FPManager.lastMonthWithData),
                description: 'Family Planning clients through Routine Facility-Based and Outreach-Based Service December 2014',
                cardClass: "col s12 m12",
                data: $scope.methods,
                category: 'quarter',
                category1: 'routineFacility',
                icons: angular.copy(portalService.minimalIcons),
                displayTable: false,
                displayMap: false,
                chart: 'line',
                yaxisTittle: "# of Clients",
                visible: 'consumption by demographic',
                chartObject: angular.copy(portalService.chartObject)

            }];
        $scope.getSingleMethods = function (uid) {
            var method = [];
            angular.forEach($scope.methods, function (value) {
                if (value.id == uid) {
                    method.push(value);
                }
            });
        };

        $scope.getSingleMethodForOutreach = function (uid) {
            var method = {};
            var meth = {};
            angular.forEach($scope.methods, function (value) {
                if (value.id == uid) {
                    method = value;
                }
            });
            var methods = $scope.prepareCategory('routineOutreachMethod');
            angular.forEach(methods, function (val) {
                if (val.name == method.name) {
                    meth = val;
                }
            });
            return meth;
        };
        $scope.prepareSeries = function (cardObject, chart) {
            cardObject.chartObject.loading = true;
            $rootScope.progressMessage = "Fetching data please wait ...";
            $rootScope.showProgressMessage = true;
            render.addRequest();
            $.post(portalService.base + "dhis-web-commons-security/login.action?authOnly=true", {
                j_username: "portal", j_password: "Portal123"
            }, function () {
                if ($scope.data.menuMethods.length == 1) {
                    $scope.titleToUse = $scope.data.menuMethods[0].name;
                } else {
                    $scope.titleToUse = "Nationally";
                }
                if (chart == 'table') {
                    cardObject.displayTable = true;
                    cardObject.displayMap = false;
                }
                else {
                    cardObject.displayMap = false;
                    cardObject.displayTable = false;
                }
                cardObject.chartObject.title.text = cardObject.title + " - " + $scope.titleToUse;
                cardObject.chartObject.yAxis.title.text = cardObject.yaxisTittle;

                var peri = preparePeriod($scope.selectedPeriod);
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

                $scope.url1 = portalService.base + "api/analytics.json?dimension=dx:lMFKZN3UaYp;ZnTi99UdGCS;UjGebiXNg0t;RfSsrHPGBXV;JSmtnnW6WrR;xhcaH3H3pdK;xip1SDutimh;chmWn8ksICz&dimension=ou:m0frOspS7JY&dimension=pe:" + FPManager.lastMonthWithData + ";&displayProperty=NAME";
                $scope.url = portalService.base + "api/analytics.json?dimension=dx:W74wyMy1mp0;p8cgxI3yPx8;aSJKs4oPZAf;LpkdcaLc4I9;p14JdJaG2aC;GvbkEo6sfSd;QRCRjFreECE&dimension=ou:m0frOspS7JY&dimension=pe:" + FPManager.lastTwelveMonth(FPManager.lastMonthWithData) + "&displayProperty=NAME";

                ////////////////////////////data for <20/////////////////////////////////////////////
                $scope.updateDisplayShortMessage($scope.data.outMethods);
                $http.get($scope.url).success(function (data) {
                    if (data.hasOwnProperty('metaData')) {
                        var xAxisItems = [];
                        var yAxisItems = [];
                        var methodId = [];
                        if ($scope.data.menuMethods.length == 1) {
                            xAxisItems = [{'name': "MOH Tanzania", 'id': 'm0frOspS7JY'}];
                            yAxisItems = $scope.prepareCategory('month');
                        } else {
                            xAxisItems = $scope.prepareCategory('methods');
                            yAxisItems = $scope.prepareCategory('month');
                        }
                        cardObject.chartObject.xAxis.categories = [];
                        angular.forEach(yAxisItems, function (value) {
                            cardObject.chartObject.xAxis.categories.push(value.name);
                        });
                        $scope.normalseries1 = [];
                        delete cardObject.chartObject.chart;
                        angular.forEach(xAxisItems, function (val) {
                            var serie = [];
                            angular.forEach(yAxisItems, function (value) {
                                var number = $scope.getDataForFirstChart(data.rows, 'm0frOspS7JY', value.id, val.id);
                                serie.push(number);
                            });
                            $scope.normalseries1.push({type: 'spline', name: val.name, data: serie})
                        });
                        cardObject.chartObject.series = $scope.normalseries1;

                        $('#container11').highcharts(cardObject.chartObject);
                        cardObject.csvdata = portalService.prepareDataForCSV(cardObject.chartObject);


                    } else {
                        cardObject.chartObject.loading = false
                    }
                    $timeout(function () {
                        render.finishRequest();
                    });
                });
            });

        };

        $scope.prepareOu = function () {
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
            return orgUnits;
        }


        $scope.prepareData = function (jsonObject, categories, type, card) {
            var structure = {};
            var data = [];
            var elements = [];
            var arr = card.data;
            angular.forEach(arr, function (val) {
                elements.push({'name': val.name, 'uid': val.id})
            });
            angular.forEach(categories, function (region) {
                data.push({'name': region.name, 'id': region.id});
            });
            structure.regions = data;
            structure.elements = elements;

            return structure;
        };

        $scope.getDataForFirstChart = function (arr, ou, pe, de) {

            var num = 0;
            var k = 1;


            k = 1
            num = 0;
            if (ou == 'none') {

            } else {
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

        $scope.getDataFromUrl = function (arr, ou, type, de) {
            var num = 0;
            var k = 1;

            if (type == 'zones') {
                k = 1;
                num = 0;
                var orgs = ou.substring(1, ou.length - 1);
                var orgArr = orgs.split(";");
                $.each(orgArr, function (c, j) {
                    $.each(arr, function (k, v) {
                        if (v[1] == j && v[0] == de) {
                            num += parseInt(v[3])
                        }
                    });
                });

            }
            if (type == 'month') {
                if ($scope.selectedMethod == "all") {
                    $.each(arr, function (k, v) {
                        if (v[2] == ou && v[0] == de) {
                            num = num + parseInt(v[3])
                        }
                    });
                } else {
                    var orgArr = de.split(";");
                    $.each(orgArr, function (c, j) {
                        $.each(arr, function (k, v) {
                            if (v[2] == ou && v[1] == j && v[0] == $scope.selectedMethod) {
                                num = num + parseInt(v[3])
                            }
                        });
                    });

                }
//
            }
            if (type == 'methods') {


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
                        if (v[0] == de && v[1] == ou) {
                            num += v[3];
                        }
                    });
                }

                return num;
            }
            return num;
        };

        $scope.prepareCategory = function (type) {
            var data = [];
            var per = $scope.selectedPeriod;
            if (type == 'zones') {
                angular.forEach($scope.data.outOrganisationUnits, function (orgUnit) {
                    var name = orgUnit.name;
                    if (name.indexOf("Zone") > -1) {
                        var names = [];
                        angular.forEach(orgUnit.children, function (regions) {
                            names.push(regions.id);
                        });
                        data.push({'name': orgUnit.name, 'id': names.join(";")});
                    } else {
                        data.push({'name': orgUnit.name, 'id': orgUnit.id});

                    }
                });
            }
            if (type == 'quarter') {
                data.push({'name': 'Jan - Mar ' + per, 'id': per + 'Q1'});
                data.push({'name': 'Apr - Jun ' + per, 'id': per + 'Q2'});
                data.push({'name': 'Jul - Sep ' + per, 'id': per + 'Q3'});
                data.push({'name': 'Oct - Dec ' + per, 'id': per + 'Q4'});
            }
            if (type == 'month') {
                data = FPManager.getLastTwelveMonthList(FPManager.lastMonthWithData);
            }
            if (type == 'methods') {
                angular.forEach($scope.data.menuMethods, function (value) {
                    if (value.name == 'Male Condoms' || value.name == 'Female Condoms' || value.name == 'Oral Pills' || value.name == 'Injectables' || value.name == 'Implants' || value.name == 'IUCDs' || value.name == 'Natural FP')
                        data.push({'name': value.name, 'id': value.id})
                });
            }
            if (type == 'routineOutreachMethod') {
                angular.forEach($scope.data.menuMethods, function (value) {
                    if (value.name == 'Implants' || value.name == 'IUCDs' || value.name == 'NSV' || value.name == 'Mini Lap') {
                        data.push({'name': value.name, 'facility': value.facility, 'outreach': value.outreach})
                    }
                });
            }
            if (type == 'method') {
                angular.forEach($scope.data.outOrganisationUnits, function (orgUnit) {
                    var name = orgUnit.name;
                    if (name.indexOf("Zone") > -1) {
                        var names = [];
                        angular.forEach(orgUnit.children, function (regions) {
                            names.push(regions.id);
                        });
                        data.push({'name': orgUnit.name, 'id': names.join(";")});
                    } else {
                        data.push({'name': orgUnit.name, 'id': orgUnit.id});

                    }
                });
            }

            return data;
        };


        //second chart issues


        $rootScope.firstClick = function () {
            angular.forEach($scope.fpCards, function (value) {
                $scope.prepareSeries(value, value.chart);
            });
        };
        $scope.firstClick();
    });

function preparePeriod(period) {

    return "" + period + "01;" + period + "02;" + period + "03;" + period + "04;" + period + "05;" + period + "06;" + period + "07;" + period + "08;" + period + "09;" + period + "10;" + period + "11;" + period + "12";
}



