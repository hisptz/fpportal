
angular.module("hmisPortal")
    .config(function($httpProvider) {

    })
    .controller("customReportsCtrl",function ($rootScope,$scope,$http,$location,$timeout,olData,olHelpers,shared,portalService,FPManager) {
        //displaying loading during page change
        $scope.showLoader = 'none';
        $scope.serverLink = '../dhis/api/';
        $scope.showstaffedOptions = false;
        $scope.showclientsOptions = false;
        $scope.showfacilityOptions = false;
        $scope.showfacilityReport = true;
        $scope.showLoaderImage = false;
        $("#loadingMessage").hide();
        $scope.aggregateDataWithChildrenOrgunit = true;
        $scope.showserviceIntegrationOptions = false;
        $scope.showstockOptions = false;
        $scope.currentOptionLabel = '';
        $scope.selectedAggregagtionType = '';
        $scope.endDate = '';
        $scope.geographicalZones = FPManager.zones;
        $scope.selectedYear = FPManager.latestYear;
        $scope.monthList = [{value:12,name:"December"}];
        $scope.data.selectedMonth = FPManager.latestMonth;
        $scope.selectedReport = {};
        $scope.outreachData = [];
        $scope.tableHeaderOptions = [];
        $scope.tableHeader = [];
        $scope.tableContents = [];
        $scope.reportOptions = [];
        $scope.startDate = '';
        $scope.showReportSection = false;
        $scope.customDate = false;
        $scope.selectedPeriodType = '';
        $scope.periodType = 'Monthly';
        $scope.reportHeader = 'Report on ';
        $scope.aggregateDataViewHeader = [{name: 'S/N', id:''}, {name: 'Zone', id: ''},
            {name: 'Region', id: ''}, {name: 'District', id: ''}, {name: 'Period', id: ''}, {name: 'Total FP facilities', id: ''},
            {name: 'FP facilities reporting the FP template', id: ''}];
        $scope.facilityDataViewHeader = [{name: 'S/N', id:''}, {name: 'Zone', id: ''},
            {name: 'Region', id: ''}, {name: 'District', id: ''}, {name: 'Facility', id: ''},
            {name: 'Facility type', id: ''}, {name: 'Period', id: ''}, {name: 'Reporting the FP template ', id: ''}];
        $scope.staffedHWstrained = [
            {name: 'Short Acting',active: '',
                aggregateIndicator: [{name: 'Total clients using short acting methods', id:'Tq5PQFhyMnz'}],
                facilityIndicator: [{name: 'Total clients using short acting methods', id:'Tq5PQFhyMnz'}]
            },
            {name: 'Implants',active: '',
                aggregateIndicator: [{name: 'Facility staffed with HWs on implants insertion service', id:'ZnTi99UdGCS'},{name: 'Facility staffed with HWs on implants removal service', id:'Eh1uMcVwxEY'}],
                facilityIndicator: [{name: 'Total facilities staffed with HWs on implants insertion service facility', id:'lMFKZN3UaYp'},{name: 'Facility staffed with HWs on implants removal service', id:'Eh1uMcVwxEY'}]},
            {name: 'IUCD',active: '',
                aggregateIndicator: [{name: 'Total clients of IUCD insertions services Outreach based', id: 'RfSsrHPGBXV'}, {name: 'Total clients of IUCD removal services Outreach based', id: 'O10liqQFwcI'}],
                facilityIndicator: [{name: 'Total clients of IUCD insertions services Facility based', id: 'UjGebiXNg0t'},{name: 'Total clients of IUCD removal services Facility based', id: 'GEjpz3mQo6E'}],
            },
            {name:'NSV', active:'',
                aggregateIndicator:[{name:'Total NSV on men outreach', id:'chmWn8ksICz'}],
                facilityIndicator:[{name:'Total NSV on men routine', id:'JSmtnnW6WrR'}]
            },
            {name:'Minilap', active:'',
                aggregateIndicator:[{name:'Total Minilap on women outreach', id:'xip1SDutimh'}],
                facilityIndicator:[{name:'Total Minilap on women routine', id:'xhcaH3H3pdK'}]
            }
        ];
        $scope.reportTypes = [
            {name:'Comprehensive FP report', id:'1'},
            // {name:'Trainings', id:'2' },
            // {name:'Clients & services', id:'3'},
            // {name:'History of provision', id:'4'},
            // {name:'Commodities', id:'5' },
            // {name:'Service integration', id:'6' },
        ];
        $scope.aggregationTypes = [ {name:'Facility data',id:'2',selected:'selected'},{name:'Aggregate data',id:'1', selected:''}];
        $scope.outreachData =[
            {name:'Short Acting',active: '',indicator: {name: 'Total Short acting outreach', id:'Tq5PQFhyMnz'}},
            {name: 'Implants insertions',active: '', indicator: {name: 'Total Implants insertions outreach', id:'ZnTi99UdGCS'}},
            {name: 'Implants removal',active: '', indicator: {name: 'Total Implants removals outreach', id:'Eh1uMcVwxEY'}},
            {name: 'IUCD insertion',active: '', indicator: {name: 'Total IUCD insertions outreach', id:'RfSsrHPGBXV'}},
            {name: 'IUCD removal',active: '', indicator: {name: 'Total IUCD removals outreach', id:'O10liqQFwcI'}}
        ];
        $scope.cbdServiceData =[
            {name:'Male condoms',active: '',indicator: {name: 'Total male condoms CBD', id:'OxxbMcRjVbt'}},
            {name: 'Female condoms',active: '', indicator: {name: 'Total female condoms CBD', id:'CAZJesl4va5'}},
            {name: 'Oral pills',active: '', indicator: {name: 'Total oral pills on CBD', id:'NHnXpXYblEM'}},
        ];
        $scope.routineFacilityData =[
            {name:'Male condoms',active: '',indicator: {name: 'Total clients of male condoms Facility based', id:'JMmqv0tyVr7'}},
            {name: 'Female condoms',active: '', indicator: {name: 'Total clients of  female condoms Facility based', id:'Nt8M08bJKXl'}},
            {name: 'Oral pills',active: '', indicator: {name: 'Total clients of  oral pills Facility based', id:'IFxhP0O4k0W'}},
            {name: 'Injectables',active: '', indicator: {name: 'Total clients of injectables Facility based', id:'epPM7fO8CnH'}},
            {name: 'Implants insertions',active: '', indicator: {name: 'Total clients of Implants insertions Facility based', id:'lMFKZN3UaYp'}},
            {name: 'Implants removal',active: '', indicator: {name: 'Total clients of Implants removals Facility based', id:'Eh1uMcVwxEY'}},
            {name: 'IUCD insertion',active: '', indicator: {name: 'Total clients of IUCD insertions Facility based', id:'UjGebiXNg0t'}},
            {name: 'IUCD removal',active: '', indicator: {name: 'Total clients of IUCD removals Facility based', id:'GEjpz3mQo6E'}},
            {name: 'NSV',active: '', indicator: {name: 'Total clients of NSV Facility based', id:'JSmtnnW6WrR'}},
            {name: 'Minilap',active: '', indicator: {name: 'Total clients of Minilap Facility based', id:'xhcaH3H3pdK'}}
        ];
        $scope.serviceIntergrationData =[
            {name:'Miscarriage/Post abortion clients adopting FP',active: '',indicator: {name: 'Total Miscarriage/Post abortion clients adopting FP', id:''}},
            {name: 'Postpartum clients adopting FP',active: '', indicator: {name: 'Total Postpartum clients adopting FP', id:''}},
            {name: 'FP Clients adopting HIV testing & Councelling',active: '', indicator: {name: 'Total FP Clients adopting HIV testing & Councelling', id:'qEWJizgHHot'}},
            {name: 'FP Clients adopting Breast cancer screening',active: '', indicator: {name: 'Total FP Clients adopting Breast cancer screening', id:'GQ3JD2MeTIp'}},
            {name: 'FP Clients adopting Cervical cancer screening',active: '', indicator: {name: 'Total FP Clients adopting Cervical cancer screening', id:'KLiLjLEQDrh'}},
        ];
        $scope.providingServiceData =[
            {name:'Male condoms',active: '',indicator: {name: 'Total Male condoms service', id:'JMmqv0tyVr7'}},
            {name: 'Female condoms',active: '', indicator: {name: 'Total Female condoms service', id:'Nt8M08bJKXl'}},
            {name: 'Oral pills',active: '', indicator: {name: 'Total Oral pills service', id:'IFxhP0O4k0W'}},
            {name: 'NSV',active: '', indicator: {name: 'Total NSV service', id:'JSmtnnW6WrR'}},
            {name: 'Minilap',active: '', indicator: {name: 'Total Minilap service', id:'xhcaH3H3pdK'}},
        ];
        $scope.facilityStockOutData =[
            {name: 'Oral pills',active: '', indicator: {name: 'Total Oral pills stock', id:'TFORL9LBEDP'}},
            {name: 'Injectables',active: '', indicator: {name: 'Total injectables stock', id:'TFORL9LBEDP'}}
        ];
        $scope.periodTypes = [
            {value: 'Monthly', name: 'Monthly', shown: true},
            {value: 'Quarterly', name: 'Quarterly', shown: false},
            {value: 'Yearly', name: 'Yearly', shown: true},
            {value: 'RelativeMonth', name: 'Relative Month', shown: false},
            {value: 'RelativeQuarter', name: 'Relative Quarter', shown: false},
            {value: 'RelativeYear', name: 'Relative Year', shown: false},
        ];
        $scope.availablePeriods = [];
        $scope.selectedPeriods = [];
        $scope.lastSelectedPeriods = [];
        $scope.data.outOrganisationUnits = [];



        // this portion of code will clear multselected orgunit to single selected orgunit
        $scope.data.orgUnitTree1 = [];
        $scope.data.orgUnitTree = [];
        // console.log("$scope.geographicalZones.organisationUnitGroups:",$scope.geographicalZones.organisationUnitGroups);
        // $scope.loadingOrganisationUnits = true;
        // $http.get($scope.serverLink+ "organisationUnitGroups?fields=id,name,organisationUnits~rename(children)[id,name,children[id,name,children[id,name]]]&filter=name:ilike:zone")
        //     .then(function(response) {
        //         console.log("response", response.data);
        //         $scope.data.orgUnitTree.push({name:"Tanzania",id:'m0frOspS7JY',children:response.data.organisationUnitGroups,selected:true});
        //         $scope.loadingOrganisationUnits = false;
        //     })

        // tempOrg.sort(function(a, b) {
        //     return a.name.localeCompare(b.name);
        // });
        // $scope.updatePeriodType('Monthly', '');
        // arrange alphabetical the zones
        $scope.geographicalZones.organisationUnitGroups.sort(function(a, b) {
            return a.name.localeCompare(b.name);
        });

        angular.forEach($scope.geographicalZones.organisationUnitGroups,function(value){
            var zoneRegions = [];
            // arrange alphabetical the regions
            value.organisationUnits.sort(function(a, b) {
                return a.name.localeCompare(b.name);
            });
            angular.forEach(value.organisationUnits,function(regions){
                var regionDistricts = [];
                // arrange alphabetical the district
                regions.children.sort(function(a, b) {
                    return a.name.localeCompare(b.name);
                });
                angular.forEach(regions.children,function(district){
                    // arrange alphabetical the facilities
                    district.children.sort(function(a, b) {
                        return a.name.localeCompare(b.name);
                    });
                    regionDistricts.push({name:district.name,id:district.id, children: district.children }); // add this children proprty to allow facilities
                });
                zoneRegions.push({ name:regions.name,id:regions.id, children:regionDistricts });
            });
            $scope.data.orgUnitTree1.push({ name:value.name,id:value.id, children:zoneRegions });
        });
        $scope.data.orgUnitTree.push({name:"Tanzania",id:'m0frOspS7JY',children:$scope.data.orgUnitTree1,selected:true});
        //console.log("Tree:", $scope.data.orgUnitTree);
        // end of portion code will clear multi-selected orgunit to single selected orgunit

        // $scope.updatePeriodType('Monthly', '');

        $scope.selectedReportType = function (reportType) {
            angular.forEach($scope.reportTypes, function (report) {
                if(report.id === '1' && reportType === '1'){
                    $scope.showfacilityReport = true;
                    // $scope.reportOptions = report.options;
                } else if (report.id === '2' && reportType === '2'){
                    console.log(report.id)
                    $scope.showstaffedOptions = true;
                    $scope.showfacilityOptions = false;
                    $scope.showclientsOptions = false;
                    $scope.showserviceIntegrationOptions = false;
                    $scope.showstockOptions = false;
                    $scope.showfacilityReport = false;
                } else if (report.id === '3' && reportType === '3'){
                    $scope.showstaffedOptions = false;
                    $scope.showfacilityOptions = false;
                    $scope.showclientsOptions = true;
                    $scope.showserviceIntegrationOptions = false;
                    $scope.showstockOptions = false;
                    $scope.showfacilityReport = false;
                } else if (report.id === '4' && reportType === '4'){
                    $scope.showstaffedOptions = false;
                    $scope.showfacilityOptions = true;
                    $scope.showclientsOptions = false;
                    $scope.showserviceIntegrationOptions = false;
                    $scope.showstockOptions = false;
                    $scope.showfacilityReport = false;
                } else if (report.id === '5' && reportType === '5'){
                    $scope.showstaffedOptions = false;
                    $scope.showfacilityOptions = false;
                    $scope.showclientsOptions = false;
                    $scope.showserviceIntegrationOptions = false;
                    $scope.showstockOptions = true;
                    $scope.showfacilityReport = false;
                } else if (report.id === '6' && reportType === '6'){
                    $scope.showstaffedOptions = false;
                    $scope.showfacilityOptions = false;
                    $scope.showclientsOptions = false;
                    $scope.showserviceIntegrationOptions = true;
                    $scope.showstockOptions = false;
                    $scope.showfacilityReport = false;
                }
            });
        };
        $scope.selectedAggregate = function (aggregation) {
            $scope.reportHeader = aggregation;
        }
        $scope.updateOutreachCBD = function (staffed) {
            angular.forEach( $scope.staffedHWstrained, function (item) {
                if (item.name === staffed.name) {
                    if (item.active === 'actived') {
                        // hence remove its contents to other list groups
                        item.active = '';
                        $scope.tableHeaderOptions = $scope.itemsOnTableHeaderRemoval($scope.tableHeaderOptions,staffed.name, staffed.indicator, 'name');
                    } else {
                        // hence add its contents to other list groups
                        item.active = 'actived';
                        $scope.tableHeaderOptions = $scope.tableHeaderOptions.concat(staffed.aggregateIndicator)
                        $scope.reportHeader += ',' +staffed.name;
                    }

                }
            });
        };
        $scope.updatingsOutreachOptionsToTable = function (data){
            angular.forEach( $scope.outreachData, function (item) {
                if (item.name === data.name) {
                    if (item.active === 'actived') {
                        item.active = '';
                        $scope.tableHeaderOptions = $scope.itemsOnTableHeaderRemoval($scope.tableHeaderOptions,data.name, data.indicator, 'name')
                    } else {
                        item.active = 'actived';
                        $scope.tableHeaderOptions.push(data.indicator);
                        $scope.reportHeader += ',' +data.name;
                    }
                }
            });
        };
        $scope.updatingsCBDtoTable = function (data){
            angular.forEach( $scope.cbdServiceData, function (item) {
                if (item.name === data.name) {
                    if (item.active === 'actived') {
                        item.active = '';
                        $scope.tableHeaderOptions = $scope.itemsOnTableHeaderRemoval($scope.tableHeaderOptions,data.name,data.indicator, 'name')
                    } else {
                        item.active = 'actived';
                        $scope.tableHeaderOptions.push(data.indicator)
                        $scope.reportHeader += ',' +data.name;
                    }
                }
            });
        }
        $scope.updatingsRoutineDatatoTable = function (data){
            angular.forEach( $scope.routineFacilityData, function (item) {
                if (item.name === data.name) {
                    if (item.active === 'actived') {
                        item.active = '';
                        $scope.tableHeaderOptions = $scope.itemsOnTableHeaderRemoval($scope.tableHeaderOptions,data.name, data.indicator, 'name')
                    } else {
                        item.active = 'actived';
                        $scope.tableHeaderOptions.push(data.indicator)
                        $scope.reportHeader += ',' +data.name;
                    }
                }
            });
        };
        $scope.updatingServiceIntergrationDatatoTable = function (data){
            angular.forEach( $scope.serviceIntergrationData, function (item) {
                if (item.name === data.name) {
                    if (item.active === 'actived') {
                        item.active = '';
                        $scope.tableHeaderOptions = $scope.itemsOnTableHeaderRemoval($scope.tableHeaderOptions,data.name, data.indicator, 'name')
                    } else {
                        item.active = 'actived';
                        $scope.tableHeaderOptions.push(data.indicator)
                        $scope.reportHeader += ',' +data.name;
                    }
                }
            });
        }
        $scope.updatingHistoryOfProvisionDatatoTable = function (data){
            angular.forEach( $scope.providingServiceData, function (item) {
                if (item.name === data.name) {
                    if (item.active === 'actived') {
                        item.active = '';
                        $scope.tableHeaderOptions = $scope.itemsOnTableHeaderRemoval($scope.tableHeaderOptions,data.name, data.indicator, 'name')
                    } else {
                        item.active = 'actived';
                        $scope.tableHeaderOptions.push(data.indicator)
                        $scope.reportHeader += ',' +data.name;
                    }
                }
            });
        }
        $scope.updatingfacilityStockDatatoTable = function (data){
            angular.forEach( $scope.facilityStockOutData, function (item) {
                if (item.name === data.name) {
                    if (item.active === 'actived') {
                        item.active = '';
                        $scope.tableHeaderOptions = $scope.itemsOnTableHeaderRemoval($scope.tableHeaderOptions,data.name, data.indicator, 'name')
                    } else {
                        item.active = 'actived';
                        $scope.tableHeaderOptions.push(data.indicator)
                        $scope.reportHeader += ',' +data.name;
                    }
                }
            });
        }
        $scope.removeDuplicates= function(originalArray, key) {
            var newArray = [];
            var lookupObject  = {};

            for(var i in originalArray) {
                lookupObject[originalArray[i][key]] = originalArray[i];
            }
            for(i in lookupObject) {
                newArray.push(lookupObject[i]);
            }
            return newArray;
        }
        $scope.itemsOnArrayRemoval = function(collection, removals, key){
            angular.forEach(collection, function (collectedItem, index) {
                angular.forEach(removals, function (removalItem) {
                    if(collectedItem[key] === removalItem[key]){
                        collection.splice(index, removals.length);
                    }
                });
            });
            return collection;
        }
        $scope.itemsOnTableHeaderRemoval = function(collection,headerItemRemoval, removal, key){
            $scope.reportHeader = $scope.reportHeader.replace(','+headerItemRemoval, '');

            angular.forEach(collection, function (collectedItem, index) {
                if(collectedItem[key] === removal[key]){
                    collection.splice(index, 1);
                }
            });
            return collection;
        }
        $scope.previewReport = function() {
            $scope.showLoader = 'visible';
            $("#loadingMessage").show();
            $scope.showLoaderImage = true;
            $scope.tableContents = [];
            $scope.tableHeader = [];
            $scope.selectedOrgunit = $scope.data['outRegistrationOrganisationUnits'][0];
            if (!$scope.showfacilityReport){ // this makes decision on table header visibility type

                if($scope.aggregateDataWithChildrenOrgunit){
                    $scope.reporDataWithChildren();
                } else {
                    $scope.reporDataWithOutChildren();
                }

            }
            else {
                // $scope.tableHeader = $scope.facilityDataViewHeader.concat($scope.tableHeaderOptions)
                // $scope.lastSelectedPeriods = $scope.selectedPeriods;
                // var month = $scope.selectedPeriods[0].id.substring(4,6);
                // var year = $scope.selectedPeriods[0].id.substring(0,4);
                // $scope.selectedPeriods = $scope.customLast12Months(month, parseInt(year) );
                // console.log(JSON.stringify($scope.selectedPeriods))
                $scope.loadFacilityDataReport()
                console.log(FPManager.lastTwelveMonth($scope.selectedPeriods[0].id))
            }
            $scope.showReportSection = !$scope.showReportSection;
            // console.log($scope.data['outRegistrationOrganisationUnits']);
            // $scope.showLoaderImage = false;
        };
        $scope.toggleDataSelections = function (){
            $scope.selectedPeriods = $scope.lastSelectedPeriods
            $scope.showReportSection = !$scope.showReportSection;
        }
        $scope.reporDataWithChildren = function (){
            var orgUnit = $scope.data['outRegistrationOrganisationUnits'];
            var orgUnitCollected = $scope.data['outRegistrationOrganisationUnits'][0];
            var dxAnalyticsString = '';
            var orgunitAnalyticsString = '';
            var url = '';

            angular.forEach($scope.tableHeaderOptions, function (dx) {
                dxAnalyticsString += ';'+ dx.id;
            });
            if($scope.selectedOrgunit.children){
                angular.forEach($scope.selectedOrgunit.children, function (orgunit) {
                    orgunitAnalyticsString += ';'+ orgunit.id;
                });
            }else{
                orgunitAnalyticsString += ';'+ $scope.selectedOrgunit.id;
            }

            if(orgUnitCollected.name.indexOf('Tanzania' ) > -1){

                url = $scope.serverLink+'analytics?dimension=dx:' + dxAnalyticsString.substring(1) + '' +
                    '&ou:' + orgunitAnalyticsString.substring(1) + '&dimension=pe:' + sanitizedPeriods($scope.selectedPeriods) + '&displayProperty=NAME&skipMeta=true&includeNumDen=true';

            } else {
                url = $scope.serverLink+'analytics?dimension=dx:' + dxAnalyticsString.substring(1) + '' +
                    '&dimension=ou:' + orgunitAnalyticsString.substring(1) + '&dimension=pe:' + sanitizedPeriods($scope.selectedPeriods) + '&displayProperty=NAME&skipMeta=true&includeNumDen=true';
            }

            $http.get(url)
                .then(function(response) {
                    console.log(JSON.stringify('use this'));
                    $scope.analyticsDataCollection = {};
                    angular.forEach(response.data.rows, function (rowData) {
                        var identiferKey = '';


                        if($scope.selectedOrgunit.name.indexOf('Tanzania' ) > -1){
                            identiferKey =  rowData[0]+'-'+$scope.selectedOrgunit.id+'-'+rowData[1];
                            $scope.analyticsDataCollection[identiferKey] = rowData[2];
                        } else {
                            identiferKey = rowData[0]+'-'+rowData[1]+'-'+rowData[2];
                            $scope.analyticsDataCollection[identiferKey] = rowData[3];
                        }

                    });

                    if(orgUnitCollected.name.indexOf('Zone' ) > -1){
                        var localHeader = [{name: 'S/N', id:''}, {name: 'Zone', id: ''},
                            {name: 'Region', id: ''}, {name: 'Period', id: ''}];
                        // {name: 'Total FP facilities', id: ''}, {name: 'FP facilities reporting the FP template', id: ''}];
                        $scope.tableHeader = localHeader.concat($scope.tableHeaderOptions);

                        angular.forEach($scope.selectedPeriods, function (period) {
                            angular.forEach($scope.selectedOrgunit.children, function (childOrgunit) {
                                $scope.tableContents.push({
                                    zone: $scope.selectedOrgunit.name, region: childOrgunit['name'], period: period, orgunit: childOrgunit['id'],
                                    // fpFacilities: Math.floor(Math.random() * 100) ,  fpFacilitiesReporting: 'Yes' ,
                                    indicatorItems: $scope.tableHeaderOptions
                                });
                            });
                        });
                    }else if(orgUnitCollected.name.indexOf('Region' ) > -1){
                        var localHeader = [{name: 'S/N', id:''},
                            {name: 'Region', id: ''}, {name: 'District', id: ''}, {name: 'Period', id: ''}
                            // {name: 'Total FP facilities', id: ''}, {name: 'FP facilities reporting the FP template', id: ''}
                        ];
                        $scope.tableHeader = localHeader.concat($scope.tableHeaderOptions);

                        angular.forEach($scope.selectedPeriods, function (period) {
                            angular.forEach($scope.selectedOrgunit.children, function (childOrgunit) {
                                $scope.tableContents.push({
                                    region: $scope.selectedOrgunit.name, district: childOrgunit['name'], period: period, orgunit: childOrgunit['id'],
                                    // fpFacilities: Math.floor(Math.random() * 100),   fpFacilitiesReporting: 'Yes' ,
                                    indicatorItems: $scope.tableHeaderOptions
                                });
                            });
                        });
                    }else if(orgUnitCollected.name.indexOf('Council' ) > -1){
                        var localHeader = [{name: 'S/N', id:''},
                            {name: 'District', id: ''}, {name: 'Facility', id: ''}, {name: 'Facility type', id: ''},{name: 'Period', id: ''}
                            // {name: 'Total FP facilities', id: ''}, {name: 'FP facilities reporting the FP template', id: ''}
                        ];
                        $scope.tableHeader = localHeader.concat($scope.tableHeaderOptions);

                        angular.forEach($scope.selectedPeriods, function (period) {
                            angular.forEach($scope.selectedOrgunit.children, function (childOrgunit) {
                                $scope.tableContents.push({
                                    district: $scope.selectedOrgunit.name, facility: childOrgunit['name'], orgunit: childOrgunit['id'],
                                    facilityType:childOrgunit['name'].indexOf('Dispensary') > -1 ? 'Dispensary' : 'Health Center', period: period,
                                    // fpFacilities: Math.floor(Math.random() * 100) , fpFacilitiesReporting: 'Yes' ,
                                    indicatorItems: $scope.tableHeaderOptions
                                });
                            });
                        });
                    }else if(orgUnitCollected.name.indexOf('Tanzania' ) > -1){
                        var localHeader = [{name: 'S/N', id:''},
                            {name: 'Period', id: ''},
                            // {name: 'Total FP facilities', id: ''}, {name: 'FP facilities reporting the FP template', id: ''}
                        ];
                        $scope.tableHeader = localHeader.concat($scope.tableHeaderOptions);

                        angular.forEach($scope.selectedPeriods, function (period) {
                            // angular.forEach($scope.selectedOrgunit.children, function (childOrgunit) {
                            $scope.tableContents.push({
                                period: period, orgunit: $scope.selectedOrgunit.id,
                                // fpFacilities: Math.floor(Math.random() * 100) ,fpFacilitiesReporting: 'Yes' ,
                                indicatorItems: $scope.tableHeaderOptions
                            });
                        });
                        // });
                    }
                    $("#loadingMessage").hide();
                    $scope.showLoaderImage = false;
                });
        };
        $scope.reporDataWithOutChildren = function (){
            var orgUnit = $scope.data['outRegistrationOrganisationUnits'];
            var orgUnitCollected = $scope.data['outRegistrationOrganisationUnits'][0];
            var dxAnalyticsString = '';
            var orgunitAnalyticsString = '';
            var url = '';

            angular.forEach($scope.tableHeaderOptions, function (dx) {
                dxAnalyticsString += ';'+ dx.id;
            });
            orgunitAnalyticsString = $scope.selectedOrgunit.id;
            if(orgUnitCollected.name.indexOf('Zone' ) > -1){

                orgunitAnalyticsString += ';OU_GROUP-'+ $scope.selectedOrgunit.id;

                url = $scope.serverLink+'analytics?dimension=dx:' + dxAnalyticsString.substring(1) + '' +
                    '&dimension=ou:' + orgunitAnalyticsString.substring(1) + '&dimension=pe:' + sanitizedPeriods($scope.selectedPeriods) + '&displayProperty=NAME&skipMeta=true&includeNumDen=true';

            } else {
                url = $scope.serverLink+'analytics?dimension=dx:' + dxAnalyticsString.substring(1) + '' +
                    '&ou:' + orgunitAnalyticsString.substring(1) + '&dimension=pe:' + sanitizedPeriods($scope.selectedPeriods) + '&displayProperty=NAME&skipMeta=true&includeNumDen=true';
            }

            $http.get(url)
                .then(function(response) {
                    console.log(JSON.stringify($scope.tableHeaderOptions))
                    $scope.analyticsDataCollection = {};

                    if(orgUnitCollected.name.indexOf('Zone' ) > -1){
                        angular.forEach(response.data.rows, function (rowData) {
                            var identiferKey = rowData[0]+'-'+$scope.selectedOrgunit.id+'-'+rowData[2];
                            $scope.analyticsDataCollection[identiferKey] =
                                (($scope.analyticsDataCollection[identiferKey])? $scope.analyticsDataCollection[identiferKey] : 0) + parseFloat(rowData[3]);
                        });
                        console.log("Checking : "+ JSON.stringify($scope.analyticsDataCollection))
                    } else {
                        angular.forEach(response.data.rows, function (rowData) {
                            var identiferKey = rowData[0]+'-'+$scope.selectedOrgunit.id+'-'+rowData[1];
                            $scope.analyticsDataCollection[identiferKey] = rowData[2];
                        });
                    }

                    if(orgUnitCollected.name.indexOf('Zone' ) > -1){
                        var localHeader = [{name: 'S/N', id:''}, {name: 'Zone', id: ''},
                            {name: 'Period', id: ''},
                            // {name: 'Total FP facilities', id: ''}, {name: 'FP facilities reporting the FP template', id: ''}
                        ];
                        $scope.tableHeader = localHeader.concat($scope.tableHeaderOptions);

                        angular.forEach($scope.selectedPeriods, function (period) {
                            $scope.tableContents.push({
                                zone: $scope.selectedOrgunit.name, period: period, orgunit: $scope.selectedOrgunit.id,
                                // fpFacilities: Math.floor(Math.random() * 100) ,  fpFacilitiesReporting: 'Yes' ,
                                indicatorItems: $scope.tableHeaderOptions
                            });
                        });
                    }else if(orgUnitCollected.name.indexOf('Region' ) > -1){
                        var localHeader = [{name: 'S/N', id:''},
                            {name: 'Region', id: ''}, {name: 'Period', id: ''},
                            // {name: 'Total FP facilities', id: ''}, {name: 'FP facilities reporting the FP template', id: ''}
                        ];
                        $scope.tableHeader = localHeader.concat($scope.tableHeaderOptions);

                        angular.forEach($scope.selectedPeriods, function (period) {
                            $scope.tableContents.push({
                                region: $scope.selectedOrgunit.name, period: period, orgunit: $scope.selectedOrgunit.id,
                                // fpFacilities: Math.floor(Math.random() * 100),   fpFacilitiesReporting: 'Yes' ,
                                indicatorItems: $scope.tableHeaderOptions
                            });
                        });
                    }else if(orgUnitCollected.name.indexOf('Council' ) > -1){
                        var localHeader = [{name: 'S/N', id:''},
                            {name: 'District', id: ''},{name: 'Period', id: ''},
                            // {name: 'Total FP facilities', id: ''}, {name: 'FP facilities reporting the FP template', id: ''}
                        ];
                        $scope.tableHeader = localHeader.concat($scope.tableHeaderOptions);

                        angular.forEach($scope.selectedPeriods, function (period) {
                            $scope.tableContents.push({
                                district: $scope.selectedOrgunit.name, orgunit: $scope.selectedOrgunit.id,
                                period: period,
                                // fpFacilities: Math.floor(Math.random() * 100) , fpFacilitiesReporting: 'Yes' ,
                                indicatorItems: $scope.tableHeaderOptions
                            });
                        });
                    }else if(orgUnitCollected.name.indexOf('Tanzania' ) > -1){
                        var localHeader = [{name: 'S/N', id:''},
                            {name: 'Period', id: ''},
                            // {name: 'Total FP facilities', id: ''}, {name: 'FP facilities reporting the FP template', id: ''}
                        ];
                        $scope.tableHeader = localHeader.concat($scope.tableHeaderOptions);

                        angular.forEach($scope.selectedPeriods, function (period) {
                            $scope.tableContents.push({
                                period: period, orgunit: $scope.selectedOrgunit.id,
                                // fpFacilities: Math.floor(Math.random() * 100) ,fpFacilitiesReporting: 'Yes' ,
                                indicatorItems: $scope.tableHeaderOptions
                            });
                        });
                    }
                    $("#loadingMessage").hide();
                    $scope.showLoaderImage = false;
                });

        }
        $scope.toggleIncludesubOrgunitLevel = function (event) {
            $scope.aggregateDataWithChildrenOrgunit = !$scope.aggregateDataWithChildrenOrgunit;
            if($scope.aggregateDataWithChildrenOrgunit){
                console.log('Sub-orgunit level included');
            }
        };
        $scope.togglePeriodType = function (periodType) {
            $scope.periodType = periodType;
        }
        $scope.changestartDate = function(startDate) {
            $scope.startDate = startDate;
            // console.log(start)
        }
        $scope.changeendDate = function(endDate) {
            $scope.endDate = endDate;
            // console.log(start)
        }
        $scope.getIndicatorItemsValues = function (){
            var arrayLocal = []
            angular.forEach( $scope.tableHeaderOptions, function (item) {
                arrayLocal.push({
                    name: item.name, id: item.id, value: Math.floor((Math.random() * 500) + 100)
                })
            });
            return arrayLocal;
        };
        $scope.getRandomValue = function (){
            return Math.floor((Math.random() * 500) + 100)
        }
        $scope.printReport = function (){

            if(!$scope.showfacilityReport){
                var w =window.open();
                var htmlPrinted =  document.getElementById('dynamicReport');
                var htmlToPrint = '' +
                    '<style type="text/css">' +
                    'table th, table td {' +
                    'border:1px solid #000;' +
                    'padding:1em;' +
                    '}' + 'table {' +
                    'border-collapse: collapse;' +
                    '}' +
                    '</style>';

                htmlToPrint += htmlPrinted.outerHTML;
                w.document.write(htmlToPrint);
                // w.document.write(htmlPrinted);
                w.print();
            } else {
                // this print is for comprehensive report
                var w =window.open();
                var htmlPrinted =  document.getElementById('comprehensiveReport');
                var htmlToPrint = '' +
                    '<style type="text/css">' +
                    'table {' +
                    'page-break-inside: avoid !important;'+
                    'width: 100%;' +
                    '}' +
                    'table th, table td {' +
                    'border:1px solid #000;' +
                    'padding:1em;' +
                    '}' + 'table {' +
                    'border-collapse: collapse;' +
                    '}' +
                    '</style>';

                htmlToPrint += htmlPrinted.outerHTML;
                w.document.write(htmlToPrint);
                // w.document.write(htmlPrinted);
                w.print();
            }
        }

        $scope.customLast12Months = function () {
            if ($scope.periodType === 'Monthly') {
                var newPeriodsOrder = [];
                var periodStr = FPManager.lastTwelveMonth($scope.selectedPeriods[0].id)
                periodStr = periodStr.substr(0, periodStr.length -1);
                var orginalPeriods = JSON.parse("[" + periodStr.split(";").join(",") + "]");

                $.each(orginalPeriods, function (key, value) {
                    newPeriodsOrder.push(orginalPeriods[orginalPeriods.length - 1 - key]);
                });
                return newPeriodsOrder.map(function (period) {return period;}).join(";");
            } else {
                return $scope.selectedPeriods[0].id;
            }

        }

        // PERIOD COMPONENT FUNCTIONS
        $scope.pushPeriodForward = function (e){
            $scope.selectedYear++;
            $scope.updatePeriodType($scope.periodType, '')
        }
        $scope.pushPeriodBackward = function (e){
            $scope.selectedYear--;
            $scope.updatePeriodType($scope.periodType, '')
        }
        $scope.updatePeriodType = function (periodType, e) {
            $scope.periodType = periodType;
            $scope.availablePeriods = $scope.getPeriodsBasedOnType(periodType, $scope.selectedYear);
        }
        $scope.getPeriodsBasedOnType = function(periodType, year) {
            switch (periodType) {
                case 'Monthly':
                    return this._getMonthlyPeriods(year);
                case 'Quarterly':
                    return this._getQuarterlyPeriods(year);
                case 'Yearly':
                    return this._getYearlyPeriods(year);
                case 'RelativeMonth':
                    return this._getRelativeMonthPeriods();
                case 'RelativeQuarter':
                    return this._getRelativeQuarterPeriods();
                case 'RelativeYear':
                    return this._getRelativeYearPeriods();
                default:
                    return [];
            }
        }
        $scope._getMonthlyPeriods = function(year) {
            const periods = [{id: year + '12', name: 'December ' + year}, {id: year + '11', name: 'November ' + year}, {
                id: year + '10',
                name: 'October ' + year
            }, {id: year + '09', name: 'September ' + year}, {id: year + '08', name: 'August ' + year}, {
                id: year + '07',
                name: 'July ' + year
            }, {id: year + '06', name: 'June ' + year}, {id: year + '05', name: 'May ' + year}, {
                id: year + '04',
                name: 'April ' + year
            }, {id: year + '03', name: 'March ' + year}, {id: year + '02', name: 'February ' + year}, {
                id: year + '01',
                name: 'January ' + year
            }];

            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1;
            const currentPeriod = currentDate.getFullYear() + (currentMonth < 10 ? ('0' + currentMonth) : currentMonth).toString();
            return periods.map((period) => {
                return {
                    ...period,
                    type: 'Monthly',
                };
            }).filter((period) => parseInt(period.id, 10) <= parseInt(currentPeriod, 10));
        }
        $scope._getQuarterlyPeriods = function (year) {
            const periods = [{id: year + 'Q4', name: 'October - December ' + year}, {
                id: year + 'Q3',
                name: 'July - September ' + year
            }, {id: year + 'Q2', name: 'April - June ' + year}, {
                id: year + 'Q1',
                name: 'January - March ' + year
            }];

            return periods.map((period) => {
                period.type = 'Quarterly';
                return period;
            });
        }
        $scope._getYearlyPeriods = function (year) {
            const periods = [];
            for (let i = 0; i <= 10; i++) {
                const useYear = parseInt(year, 10) - i;
                periods.push({id: useYear.toString(), name: useYear.toString(), type: 'Yearly'});
            }

            return periods;
        }
        $scope._getRelativeMonthPeriods = function () {
            const periods = [{id: 'THIS_MONTH', name: 'This Month'}, {id: 'LAST_MONTH', name: 'Last Month'}, {
                id: 'LAST_3_MONTHS',
                name: 'Last 3 Months'
            }, {id: 'LAST_6_MONTHS', name: 'Last 6 Months'}, {id: 'LAST_12_MONTHS', name: 'Last 12 Months'}];

            return periods.map((period) => {
                period.type = 'RelativeMonth';
                return period;
            });
        }
        $scope._getRelativeQuarterPeriods = function () {
            const periods = [{id: 'THIS_QUARTER', name: 'This Quarter'}, {
                id: 'LAST_QUARTER',
                name: 'Last Quarter'
            }, {id: 'LAST_4_QUARTERS', name: 'Last 4 Quarters'}];

            return periods.map((period) => {
                period.type = 'RelativeQuarter';
                return period;
            });
        }
        $scope._getRelativeYearPeriods = function() {
            const periods = [{id: 'THIS_YEAR', name: 'This Year'}, {
                id: 'LAST_YEAR',
                name: 'Last Year'
            }, {id: 'LAST_5_YEARS', name: 'Last 5 Years'}];

            return periods.map((period) => {
                period.type = 'RelativeYear';
                return period;
            });

        }
        $scope.toggleAvailablePeriod = function (selectedPeriod, e) {
            $scope.selectedPeriods = [selectedPeriod];
        };
        $scope.toggleSelectedPeriod = function (selectedPeriod, e) {
            angular.forEach($scope.selectedPeriods, function (period, index) {
                if(period.id === selectedPeriod.id ){
                    $scope.selectedPeriods.splice(index,1);
                }
            })
        }
        // END OF PERIOD COMPONENT FUNCTIONS


        $scope.loadFacilityDataReport = function(){
            // facility data collected functions
            // FACILITY DATA CODE REPORTS
            $( "#bcg1" ).html( $scope.data['outRegistrationOrganisationUnits'][0].name);
            // client_served_by_healthy_facility();
            // total_number_of_healthworkers();
            // client_served_by_CBD();
            // client_served_by_outreach();
            // client_served_age_less_twenty();
            // service_and_intergrations();
            // commodities_stocked_out();

            // $scope.lastSelectedPeriods = $scope.selectedPeriods;
            // var month = $scope.selectedPeriods[0].id.substring(4,6);
            // var year = $scope.selectedPeriods[0].id.substring(0,4);
            // $scope.selectedPeriods = $scope.customLast12Months(month, parseInt(year) );

            generate_orgunit_summary_data($scope.data['outRegistrationOrganisationUnits'][0]);

            total_number_of_healthworkers();

            client_served_by_CBD();

            service_intergrations();

            client_served_by_healthy_facility();

            client_served_by_outreach();

            client_served_age_less_twenty();

            commodities_stocked_out();

            // $scope.showLoaderImage = false;
        }
        function sanitizedPeriods(periodArray) {
            var sanitizedPeriods = periodArray.map(function (period) {
                return period.id;
            }).join(";");
            return sanitizedPeriods;
        }
        function get_last_string(compound_word) {
            var sanitized_str = compound_word.split(" ");
            return sanitized_str[sanitized_str.length - 1];
        }
        function get_first_string(compound_word) {
            var sanitized_str = compound_word.split(" ");
            return sanitized_str[0];
        }
        function get_first_three_letters(word) {
            var processed_word = word.substring(0, 3);
            return processed_word.charAt(0).toUpperCase() + processed_word.slice(1).toLowerCase();
        }
        var orgUnitHierarchy = [];
        // var periods = $scope.customLast12Months();
        // var period = periods[0];

        function generate_orgunit_summary_data() {
            var orgUnit = $scope.data['outRegistrationOrganisationUnits'][0];
            if (orgUnit) {
                if(orgUnit.name && !orgUnitHierarchy[1] && !orgUnitHierarchy[2]) {
                    $("#national_level").show();
                    $("#country_level").html(orgUnit.name);
                } else if (orgUnit.name && orgUnitHierarchy[1].name && !orgUnitHierarchy[2]) {
                    $("#national_level").show();
                    $("#reg_level").show();
                    $("#regional_level").html(orgUnit.name);
                    $("#country_level").html(orgUnitHierarchy[1].name);
                } else if (orgUnit.name && orgUnitHierarchy[1].name && orgUnitHierarchy[2].name) {
                    $("#national_level").show();
                    $("#reg_level").show();
                    $("#dist_level").show();
                    $("#district_level").html(orgUnit.name);
                    $("#regional_level").html(orgUnitHierarchy[1].name);
                    $("#country_level").html(orgUnitHierarchy[2].name);
                } else {
                    $("#fac_level").show();
                    $("#dist_level").show();
                    $("#reg_level").show();
                    $("#facility_level").html(orgUnit.name);
                    $("#district_level").html(orgUnitHierarchy[1].name);
                    $("#regional_level").html(orgUnitHierarchy[2].name);
                }
            }
        }

        function sanitized_periods(periods_data) {
            var sanitized_periods = periods_data.map(function (period) {
                return period;
            }).join(";");
            return sanitized_periods;
        }

        function get_last_string(compound_word) {
            var sanitized_str = compound_word.split(" ");
            return sanitized_str[sanitized_str.length - 1];
        }

        function get_first_string(compound_word) {
            var sanitized_str = compound_word.split(" ");
            return sanitized_str[0];
        }

        function get_first_three_letters(word) {
            var processed_word = word.substring(0, 3);
            return processed_word.charAt(0).toUpperCase() + processed_word.slice(1).toLowerCase();
            // return word;
        }

        function get_all_indicators_data_element_names(metadata_json) {
            var names = [];
            var uid_matcher = '\\b[a-zA-Z0-9]{11}\\b|\\b[a-zA-Z0-9]{11}\\b';

            $.each(metadata_json.metaData.items, function (key, value) {
                $.each(metadata_json.metaData.dimensions.dx, function (key1, value1) {
                    if (key.match(uid_matcher) && key == value1) {
                        $.each(value, function (key2, value2) {
                            names.push(value2)
                        });
                    }
                });
            });
            return names;
        }

        function get_all_raw_periods(metadata_json) {
            var periods = [];
            var meta_period = metadata_json.metaData.dimensions.pe;
            $.each(meta_period, function (key, value) {
                periods.push(value);
            });
            return periods;
        }

        function find_period_index_in_analytic_data(metadata_json) {
            var index = -1;
            var pe_matcher = "^[0-9]{4,6}$";
            for (var i = 0; i < metadata_json.rows.length; i++) {
                for (var j = 0; j < metadata_json.rows[i].length; j++) {
                    if (metadata_json.rows[i][j].match(pe_matcher)) {
                        index = j;
                        break;
                    }
                }
            }
            return index;
        }

        function find_uid_index_in_analytic_data(metadata_json) {
            var uid_matcher = '\\b[a-zA-Z0-9]{11}\\b|\\b[a-zA-Z0-9]{11}\\b';
            var index = -1;
            for (var i = 0; i < metadata_json.rows.length; i++) {
                for (var j = 0; j < metadata_json.rows[i].length; j++) {
                    if (metadata_json.rows[i][j].match(uid_matcher)) {
                        index = j;
                        break;
                    }
                }
            }
            return index;
        }

        function find_datavalue_index_in_analytic_data(metadata_json) {
            var index = -1;
            var datavalue_matcher = /^[\d]+\.[\d]+$/g;
            for (var i = 0; i < metadata_json.rows.length; i++) {
                for (var j = 0; j < metadata_json.rows[i].length; j++) {
                    if (metadata_json.rows[i][j].match(datavalue_matcher)) {
                        index = j;
                        break;
                    }
                }
            }
            return index;
        }

        function get_all_data_based_on_periods(metadata_json) {
            var index = find_datavalue_index_in_analytic_data(metadata_json);
            var uid = find_uid_index_in_analytic_data(metadata_json);
            // var period = find_period_index_in_analytic_data(metadata_json);
            var period = 1;
            var complete_data = [];
            var temp_data = [];

            $.each(metadata_json.metaData.dimensions.dx, function (key, value) {
                for (j = 0; j < get_all_raw_periods(metadata_json).length; j++) {
                    var data_child = null;
                    for (i = 0; i < metadata_json.rows.length; i++) {
                        if (metadata_json.rows[i][uid] == value) {
                            if (metadata_json.metaData.dimensions.pe[j] == metadata_json.rows[i][
                                period
                                ]) {
                                data_child = metadata_json.rows[i][index];
                            }
                        }
                    }
                    temp_data.push(data_child);
                }
                complete_data.push(temp_data);
                temp_data = [];
            });
            return complete_data;
        }

        function get_period_totality_for_each_indicators(data_array, metadata_json) {
            var total_data = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
            for (var i = 0; i < data_array.length; i++) {
                for (var j = 0; j < get_all_raw_periods(metadata_json).length; j++) {
                    if (data_array[i][j] == null) {
                        total_data[j] = (parseFloat(total_data[j]) + 0).toFixed(1);
                    } else {
                        total_data[j] = (parseFloat(total_data[j]) + parseFloat(data_array[i][j])).toFixed(
                            1);
                    }
                }
            }
            return total_data;
        }

        function generate_table_header_information(table_main_title, header_row_definition, metadata_json,
                                                   division_id) {
            // var newPeriodsOrder = [];
            // var orginalPeriods = metadata_json.metaData.dimensions.pe;
            //
            // $.each(metadata_json.metaData.dimensions.pe, function (key, value) {
            //     newPeriodsOrder.push(orginalPeriods[orginalPeriods.length - 1 - key]);
            // });
            //
            // metadata_json.metaData.dimensions.pe = newPeriodsOrder;

            var html_container = "<thead>";
            html_container += "<tr>";
            html_container += "<td class=\"main_header_title\">" + table_main_title + "</td>";
            html_container += "</tr>";

            html_container += "<th class=\"header_definition_props\">" + header_row_definition + "</th>";
            $.each(metadata_json.metaData.dimensions.pe, function (key, value) {

                // var final = get_first_three_letters(get_first_string(
                //     metadata_json.metaData.items[value].name)) + " " + get_last_string(metadata_json.metaData.items[value].name);
                //             html_container += "<th>" + final + "</th>";

                html_container += "<th>" + metadata_json.metaData.items[value].name + "</th>";
            });
            html_container += "</thead>";
            $("#" + division_id).append(html_container);
        }

        function populate_table_with_respective_data(component_id, indicator_name, data_array, data_total) {
            var body_container = "<tbody>";
            body_container += "<tr>";
            var local_indices = [4, 2, 1, 3, 0]
            for (var i = 0; i < indicator_name.length; i++) {
                body_container += "<td class=\"body_definition_props\">" + indicator_name[i] + "</td>";
                for (var k = 0; k < data_array[i].length; k++) {
                    if (data_array[i][k] == null) {
                        body_container += "<td>" + "0" + "</td>";
                    } else {
                        body_container += "<td>" + Math.round(data_array[i][k]) + "</td>";
                    }
                }
                body_container += "</tr>";
            }
            body_container += "</tbody>";
            $("#" + component_id).append(body_container);
        }

        function populate_table_with_respective_data_healthworkers(component_id, indicator_name, data_array,
                                                                   data_total) {
            var body_container = "<tbody>";
            body_container += "<tr>";
            var local_data_indices = [3, 1, 4, 0, 2];
            var local_names_indices = [4, 2, 1, 3, 0];
            var sanitized_names = ["Minilap", "IUCD", "Implants", "NSV", "Short Acting"];
            for (var i = 0; i < indicator_name.length; i++) {
                body_container += "<td class=\"body_definition_props\">" + sanitized_names[
                    local_names_indices[i]] + "</td>";
                for (var k = 0; k < data_array[i].length; k++) {
                    if (data_array[local_data_indices[i]][k] == null) {
                        body_container += "<td>" + "0" + "</td>";
                    } else {
                        body_container += "<td>" + Math.round(data_array[local_data_indices[i]][k]) +
                            "</td>";
                    }
                }
                body_container += "</tr>";
            }
            body_container += "</tbody>";
            $("#" + component_id).append(body_container);
        }

        function populate_table_with_respective_data_cbd(component_id, indicator_name, data_array,
                                                         data_total) {
            var body_container = "<tbody>";
            body_container += "<tr>";
            var local_data_indices = [0, 1, 2];
            var local_names_indices = [2, 1, 0];
            var sanitized_names = ["Oral Pills", "Female Condoms", "Male Condoms"];
            for (var i = 0; i < indicator_name.length; i++) {
                body_container += "<td class=\"body_definition_props\">" + sanitized_names[
                    local_names_indices[i]] + "</td>";
                for (var k = 0; k < data_array[i].length; k++) {
                    if (data_array[local_data_indices[i]][k] == null) {
                        body_container += "<td>" + "0" + "</td>";
                    } else {
                        body_container += "<td>" + Math.round(data_array[local_data_indices[i]][k]) +
                            "</td>";
                    }
                }
                body_container += "</tr>";
            }
            body_container += "</tbody>";
            $("#" + component_id).append(body_container);
        }

        function populate_table_with_respective_data_service_intergrations(component_id, indicator_name,
                                                                           data_array,
                                                                           data_total) {
            var body_container = "<tbody>";
            body_container += "<tr>";
            var local_data_indices = [5, 4, 3, 0, 1, 2];
            var local_names_indices = [0, 3, 4, 5, 2, 1];
            var sanitized_names = [
                "Total number of Miscarriage/abortion clients",
                "Total number of FP clients adopting HIV testing and Counselling",
                "Total number of FP clients adopting Cervical Screening",
                "Total number of Miscarriage/abortion clients adopting FP",
                "Total number of FP Adopting Postportum FP",
                "Total number of FP clients adopting Breast Cancer screening",
            ];
            for (var i = 0; i < indicator_name.length; i++) {
                body_container += "<td class=\"body_definition_props\">" + sanitized_names[
                    local_names_indices[i]] + "</td>";
                for (var k = 0; k < data_array[i].length; k++) {
                    if (data_array[local_data_indices[i]][k] == null) {
                        body_container += "<td>" + "0" + "</td>";
                    } else {
                        body_container += "<td>" + Math.round(data_array[local_data_indices[i]][k]) +
                            "</td>";
                    }
                }
                body_container += "</tr>";
            }
            body_container += "</tbody>";
            $("#" + component_id).append(body_container);
        }

        function populate_table_with_respective_data_commodities(component_id, indicator_name,
                                                                 data_array,
                                                                 data_total) {
            var body_container = "<tbody>";
            body_container += "<tr>";
            var local_data_indices = [5, 4, 3, 0, 1, 2];
            var local_names_indices = [0, 3, 4, 5, 2, 1];
            var sanitized_names = [
                "Total number of Miscarriage/abortion clients",
                "Total number of FP clients adopting HIV testing and Counselling",
                "Total number of FP clients adopting Cervical Screening",
                "Total number of Miscarriage/abortion clients adopting FP",
                "Total number of FP Adopting Postportum FP",
                "Total number of FP clients adopting Breast Cancer screening",
            ];
            for (var i = 0; i < indicator_name.length; i++) {
                body_container += "<td class=\"body_definition_props\">" + sanitized_names[
                    local_names_indices[i]] + "</td>";
                for (var k = 0; k < data_array[i].length; k++) {
                    if (data_array[local_data_indices[i]][k] == null) {
                        body_container += "<td>" + "0" + "</td>";
                    } else {
                        body_container += "<td>" + Math.round(data_array[local_data_indices[i]][k]) +
                            "</td>";
                    }
                }
                body_container += "</tr>";
            }
            body_container += "</tbody>";
            $("#" + component_id).append(body_container);
        }

        function populate_table_with_respective_data_less_twenty(component_id, indicator_name,
                                                                 data_array,
                                                                 data_total) {
            var body_container = "<tbody>";
            body_container += "<tr>";
            var local_data_indices = [2, 5, 3, 1, 4, 0];
            var local_names_indices = [3, 5, 1, 2, 4, 0];
            var sanitized_names = [
                "IUCD",
                "Oral Pills",
                "Injectables",
                "Male Condoms",
                "Implants",
                "Female Condoms",
            ];
            for (var i = 0; i < indicator_name.length; i++) {
                body_container += "<td class=\"body_definition_props\">" + sanitized_names[
                    local_names_indices[i]] + "</td>";
                for (var k = 0; k < data_array[i].length; k++) {
                    if (data_array[local_data_indices[i]][k] == null) {
                        body_container += "<td>" + "0" + "</td>";
                    } else {
                        body_container += "<td>" + Math.round(data_array[local_data_indices[i]][k]) +
                            "</td>";
                    }
                }
                body_container += "</tr>";
            }
            body_container += "</tbody>";
            $("#" + component_id).append(body_container);
        }

        function populate_table_with_respective_data_served_outreach(component_id, indicator_name,
                                                                     data_array,
                                                                     data_total) {
            var body_container = "<tbody>";
            body_container += "<tr>";
            // var local_data_indices = [1,2,3,0,4];
            // var local_names_indices = [2, 3, 4, 0, 1];
            var local_data_indices = [0,1,4,2,3];
            var local_names_indices = [2, 3, 4, 0, 1];
            var sanitized_names = [
                "IUCD Removals",
                "Minilap",
                "Implants Insertions",
                "IUCD Insertions",
                "NSV",
            ];
            for (var i = 0; i < indicator_name.length; i++) {
                body_container += "<td class=\"body_definition_props\">" + sanitized_names[
                    local_names_indices[i]] + "</td>";
                for (var k = 0; k < data_array[i].length; k++) {
                    if (data_array[local_data_indices[i]][k] == null) {
                        body_container += "<td>" + "0" + "</td>";
                    } else {
                        body_container += "<td>" + Math.round(data_array[local_data_indices[i]][k]) +
                            "</td>";
                    }
                }
                body_container += "</tr>";
            }
            body_container += "</tbody>";
            $("#" + component_id).append(body_container);
        }

        function populate_table_with_respective_data_health_facility(component_id, indicator_name,
                                                                     data_array,
                                                                     data_total) {
            var body_container = "<tbody>";
            body_container += "<tr>";
            var local_data_indices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            var local_names_indices = [5, 4, 6, 7, 9, 2, 1, 0, 8, 3];
            var sanitized_names = [
                "IUCD Removals",
                "IUCD Insertions",
                "Implants Removals",
                "Minilap",
                "Female Condoms",
                "Male Condoms",
                "Oral Pills",
                "Injectables",
                "NSV",
                "Implants Insertions"
            ];
            for (var i = 0; i < indicator_name.length; i++) {
                body_container += "<td class=\"body_definition_props\">" + sanitized_names[
                    local_names_indices[i]] + "</td>";
                for (var k = 0; k < data_array[i].length; k++) {
                    if (data_array[local_data_indices[i]][k] == null) {
                        body_container += "<td>" + "0" + "</td>";
                    } else {
                        body_container += "<td>" + Math.round(data_array[local_data_indices[i]][k]) +
                            "</td>";
                    }
                }
                body_container += "</tr>";
            }
            body_container += "</tbody>";
            $("#" + component_id).append(body_container);
        }

        function populate_data_table_commodities(component_id, indicator_name, data_array, data_total) {
            var body_container = "<tbody>";
            body_container += "<tr>";
            var local_data_indices = [0,3,2,1];
            var local_names_indices = [0, 1, 2, 3];
            var sanitized_names = [
                "Combineoral Contraceptives - Available",
                "Depo - Provera Available",
                "HMIS_Uzazi wa Mpango (FP) Expected reports",
                "HMIS_Tracer Medicine Expected reports",
            ];
            for (var i = 0; i < indicator_name.length; i++) {
                body_container += "<td class=\"body_definition_props\">" + sanitized_names[local_names_indices[i]] + "</td>";
                for (var k = 0; k < data_array[i].length; k++) {
                    if (data_array[local_data_indices[i]][k] == null) {
                        body_container += "<td>" + "0" + "</td>";
                    } else {
                        body_container += "<td>" + parseInt(data_array[local_data_indices[i]][k]) + "</td>";
                    }
                }
                body_container += "</tr>";
            }
            body_container += "</tbody>";
            $("#" + component_id).append(body_container);

            // for (var i = 0; i < indicator_name.length; i++) {
            //     body_container += "<td class=\"body_definition_props\">" + indicator_name[i] + "</td>";
            //     for (var k = 0; k < data_array[i].length; k++) {
            //         if (data_array[i][k] == null) {
            //             body_container += "<td>" + "0" + "</td>";
            //         } else {
            //             body_container += "<td>" + parseInt(data_array[i][k]) + "</td>";
            //         }
            //     }
            //     body_container += "</tr>";
            // }
            // body_container += "</tbody>";
            // $("#" + component_id).append(body_container);
        }

        function populate_totality_based_on_period(component_id, array_total) {
            var html_container = "<tfoot>";
            html_container += "<td class=\"footer_definition_props\">" + "Total" + "</td>";
            $.each(array_total, function (key, value) {
                html_container += "<td>" + Math.round(value) + "</td>";
            });
            html_container += "</tfoot>";
            $("#" + component_id).append(html_container);
        }

        function total_number_of_healthworkers() {
            var orgUnit = $scope.data['outRegistrationOrganisationUnits'][0];
            $.get($scope.serverLink+"analytics.json?dimension=dx:BLqgpawRwGN;Igxe3yXGEoW;acbet8SSjCY;iWDh2fUbRTJ;t8vQoqdY0en&dimension=pe:" +
                $scope.customLast12Months()  + "&filter=ou:" + orgUnit.id +
                "&displayProperty=NAME&skipMeta=false",
                function (analytic_data) {
                    var analytic_processed_data = get_all_data_based_on_periods(analytic_data);
                    var indicators_names = get_all_indicators_data_element_names(analytic_data);
                    var indicators_total = get_period_totality_for_each_indicators(
                        analytic_processed_data, analytic_data);
                    var indicators_data = get_all_data_based_on_periods(analytic_data);

                    generate_table_header_information("Trained Health Workers", "Service",
                        analytic_data,
                        "TrainedHW");
                    populate_table_with_respective_data_healthworkers("TrainedHW", indicators_names,
                        indicators_data,
                        indicators_total);
                    // populate_totality_based_on_period("TrainedHW",
                    //     get_period_totality_for_each_indicators(indicators_data, analytic_data));
                });
        }

        function client_served_by_CBD() {
            var orgUnit = $scope.data['outRegistrationOrganisationUnits'][0];
            $.get( $scope.serverLink+"analytics.json?dimension=dx:QDrrZfVwqNd;WXaZ1YSz1yX;GWFza9xVa3F&dimension=pe:" +
                $scope.customLast12Months()  + "&filter=ou:" + orgUnit.id +
                "&displayProperty=NAME&skipMeta=false&includeNumDen=false",
                function (analytic_data) {
                    var analytic_processed_data = get_all_data_based_on_periods(analytic_data);
                    var indicators_names = get_all_indicators_data_element_names(analytic_data);
                    var indicators_total = get_period_totality_for_each_indicators(
                        analytic_processed_data, analytic_data);
                    var indicators_data = get_all_data_based_on_periods(analytic_data);

                    generate_table_header_information("Client Service, Served Through CBD", "Service",
                        analytic_data,
                        "CDBTable");
                    populate_table_with_respective_data_cbd("CDBTable", indicators_names,
                        indicators_data,
                        indicators_total);
                    populate_totality_based_on_period("CDBTable",
                        get_period_totality_for_each_indicators(indicators_data, analytic_data));
                });
        }

        function service_intergrations() {
            var orgUnit = $scope.data['outRegistrationOrganisationUnits'][0];
            $.get($scope.serverLink+"analytics.json?dimension=dx:GQ3JD2MeTIp;KLiLjLEQDrh;qEWJizgHHot;twBzX6Uja4u;udebdxs4kt0;wCLnMe5fRFu&dimension=pe:" +
                $scope.customLast12Months()  + "&filter=ou:" + orgUnit.id +
                "&displayProperty=NAME&skipMeta=false&includeNumDen=false",
                function (analytic_data) {
                    var analytic_processed_data = get_all_data_based_on_periods(analytic_data);
                    var indicators_names = get_all_indicators_data_element_names(analytic_data);
                    var indicators_total = get_period_totality_for_each_indicators(
                        analytic_processed_data, analytic_data);
                    var indicators_data = get_all_data_based_on_periods(analytic_data);

                    generate_table_header_information("Service Intergrations", "Service",
                        analytic_data,
                        "ServiceIntergrationsTable");
                    populate_table_with_respective_data_service_intergrations(
                        "ServiceIntergrationsTable", indicators_names,
                        indicators_data,
                        indicators_total);
                    // populate_totality_based_on_period("ServiceIntergrationsTable",
                    //     get_period_totality_for_each_indicators(indicators_data, analytic_data));
                });
        }

        function client_served_by_healthy_facility() {
            var orgUnit = $scope.data['outRegistrationOrganisationUnits'][0];
            $.get($scope.serverLink+"analytics.json?dimension=dx:JMmqv0tyVr7;Nt8M08bJKXl;IFxhP0O4k0W;epPM7fO8CnH;lMFKZN3UaYp;Eh1uMcVwxEY;UjGebiXNg0t;GEjpz3mQo6E;JSmtnnW6WrR;xhcaH3H3pdK&dimension=pe:" +
                $scope.customLast12Months()  + "&filter=ou:" + orgUnit.id +
                "&displayProperty=NAME&skipMeta=false",
                function (analytic_data) {

                    var analytic_processed_data = get_all_data_based_on_periods(analytic_data);
                    var indicators_names = get_all_indicators_data_element_names(analytic_data);
                    var indicators_total = get_period_totality_for_each_indicators(
                        analytic_processed_data, analytic_data);
                    var indicators_data = get_all_data_based_on_periods(analytic_data);

                    generate_table_header_information("Client Service, Clients Served Through Routine Service",
                        "Service",
                        analytic_data,
                        "ClientServedThroughHealthFacilityTable");
                    populate_table_with_respective_data_health_facility(
                        "ClientServedThroughHealthFacilityTable",
                        indicators_names,
                        indicators_data,
                        indicators_total);
                    populate_totality_based_on_period("ClientServedThroughHealthFacilityTable",
                        get_period_totality_for_each_indicators(indicators_data, analytic_data));
                });
        }

        function client_served_by_outreach() {
            var orgUnit = $scope.data['outRegistrationOrganisationUnits'][0];
            $.get($scope.serverLink+"analytics.json?dimension=dx:ZnTi99UdGCS;RfSsrHPGBXV;O10liqQFwcI;xip1SDutimh;chmWn8ksICz&dimension=pe:" +
                $scope.customLast12Months() + "&filter=ou:" + orgUnit.id +
                "&displayProperty=NAME&skipMeta=false",
                function (analytic_data) {
                    var analytic_processed_data = get_all_data_based_on_periods(analytic_data);
                    var indicators_names = get_all_indicators_data_element_names(analytic_data);
                    var indicators_total = get_period_totality_for_each_indicators(
                        analytic_processed_data, analytic_data);
                    var indicators_data = get_all_data_based_on_periods(analytic_data);

                    generate_table_header_information("Client Service, Served Through Outreach",
                        "Service",
                        analytic_data,
                        "ClientServedByOutreachTable");
                    populate_table_with_respective_data_served_outreach("ClientServedByOutreachTable",
                        indicators_names,
                        indicators_data,
                        indicators_total);
                    populate_totality_based_on_period("ClientServedByOutreachTable",
                        get_period_totality_for_each_indicators(indicators_data, analytic_data));
                });
        }

        function client_served_age_less_twenty() {
            var orgUnit = $scope.data['outRegistrationOrganisationUnits'][0];
            $.get($scope.serverLink+"analytics.json?dimension=dx:GvbkEo6sfSd;LpkdcaLc4I9;W74wyMy1mp0;aSJKs4oPZAf;p14JdJaG2aC;p8cgxI3yPx8&dimension=pe:" +
                $scope.customLast12Months()  + "&filter=ou:" + orgUnit.id +
                "&displayProperty=NAME&skipMeta=false",
                function (analytic_data) {
                    var analytic_processed_data = get_all_data_based_on_periods(analytic_data);
                    var indicators_names = get_all_indicators_data_element_names(analytic_data);
                    var indicators_total = get_period_totality_for_each_indicators(
                        analytic_processed_data, analytic_data);
                    var indicators_data = get_all_data_based_on_periods(analytic_data);

                    generate_table_header_information("Client Service, Served < 20 years",
                        "Service",
                        analytic_data,
                        "ClientServedAgeLessThanTwenty");
                    populate_table_with_respective_data_less_twenty("ClientServedAgeLessThanTwenty",
                        indicators_names,
                        indicators_data,
                        indicators_total);
                    populate_totality_based_on_period("ClientServedAgeLessThanTwenty",
                        get_period_totality_for_each_indicators(indicators_data, analytic_data));
                });
        }

        function commodities_stocked_out() {
            var orgUnit = $scope.data['outRegistrationOrganisationUnits'][0];
            // $.get( $scope.serverLink+"analytics.json?dimension=dx:gOnXFvuLClY;n91UibSDCbn&dimension=pe:" +
            $.get( $scope.serverLink+"analytics.json?dimension=dx:TfoI3vTGv1f.EXPECTED_REPORTS;ZOvFj2vtlor.EXPECTED_REPORTS;gOnXFvuLClY;n91UibSDCbn&dimension=pe:" +
                $scope.customLast12Months()  + "&filter=ou:" + orgUnit.id +
                "&displayProperty=NAME&skipMeta=false",
                function (analytic_data) {
                    var analytic_processed_data = get_all_data_based_on_periods(analytic_data);
                    var indicators_names = get_all_indicators_data_element_names(analytic_data);
                    var indicators_total = get_period_totality_for_each_indicators(
                        analytic_processed_data, analytic_data);
                    var indicators_data = get_all_data_based_on_periods(analytic_data);

                    generate_table_header_information("Commodities Stocked Out",
                        "Commodities",
                        analytic_data,
                        "CommoditiesStockedOut");
                    populate_data_table_commodities("CommoditiesStockedOut",
                        indicators_names,
                        indicators_data,
                        indicators_total);
                    // populate_totality_based_on_period("CommoditiesStockedOut",
                    //     get_period_totality_for_each_indicators(indicators_data, analytic_data));
                });
            $("#loadingMessage").hide();
        }
    });
