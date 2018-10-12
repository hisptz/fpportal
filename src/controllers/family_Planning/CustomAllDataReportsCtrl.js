
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
        $scope.periodType = 'monthly';
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
            {name: 'UICDs',active: '',
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
            {name:'Trainings', id:'2' },
            {name:'Clients & services', id:'3'},
            {name:'History of provision', id:'4'},
            {name:'Commodities', id:'5' },
            {name:'Service integration', id:'6' },
        ];
        $scope.aggregationTypes = [ {name:'Facility data',id:'2',selected:'selected'},{name:'Aggregate data',id:'1', selected:''}];
        $scope.outreachData =[
            {name:'Short Acting',active: '',indicator: {name: 'Total Short acting outreach', id:'Tq5PQFhyMnz'}},
            {name: 'Implants insertions',active: '', indicator: {name: 'Total Implants insertions outreach', id:'ZnTi99UdGCS'}},
            {name: 'Implants removal',active: '', indicator: {name: 'Total Implants removals outreach', id:'Eh1uMcVwxEY'}},
            {name: 'UICDs insertion',active: '', indicator: {name: 'Total UICDs insertions outreach', id:'RfSsrHPGBXV'}},
            {name: 'UICDs removal',active: '', indicator: {name: 'Total UICDs removals outreach', id:'O10liqQFwcI'}}
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
            {name: 'UICDs insertion',active: '', indicator: {name: 'Total clients of UICDs insertions Facility based', id:'UjGebiXNg0t'}},
            {name: 'UICDs removal',active: '', indicator: {name: 'Total clients of UICDs removals Facility based', id:'GEjpz3mQo6E'}},
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
        $scope.availablePeriods = [
            {id: 'THIS_MONTH', name: 'This Month'}, {id: 'LAST_MONTH', name: 'Last Month'}, {
            id: 'LAST_3_MONTHS',
            name: 'Last 3 Months'
        }, {id: 'LAST_6_MONTHS', name: 'Last 6 Months'}, {id: 'LAST_12_MONTHS', name: 'Last 12 Months'}];
        $scope.selectedPeriods = [{id: 'LAST_12_MONTHS', name: 'Last 12 Months'}];
        $scope.data.outOrganisationUnits = [];

            // this portion of code will clear multselected orgunit to single selected orgunit
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
        // end of portion code will clear multi-selected orgunit to single selected orgunit


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
                $scope.loadFacilityDataReport()
            }
            $scope.showReportSection = !$scope.showReportSection;
            // console.log($scope.data['outRegistrationOrganisationUnits']);
            // $scope.showLoaderImage = false;
        };

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




                // window.frames["monthlyReportFrame"].focus();
                // window.frames["monthlyReportFrame"].print();
                // document.getElementById("reportFrame").contentWindow.print()​​​​​​;

                // window.print();



                // try{
                //     var oIframe = document.getElementById('ifrmPrint');
                //     var oContent = document.getElementById('divToPrint').innerHTML;
                //     var oDoc = (oIframe.contentWindow || oIframe.contentDocument);
                //     if (oDoc.document) oDoc = oDoc.document;
                //     oDoc.write("<html><head><title>title</title>");
                //     oDoc.write("</head><body onload='this.focus(); this.print();'>");
                //     oDoc.write(oContent + "</body></html>");
                //
                //     oDoc.close();
                //
                // }
                // catch(e){
                //     self.print();
                // }




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
           $scope.periodType = periodType
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
            $scope.selectedPeriods.push(selectedPeriod);
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
            client_served_by_healthy_facility();
            total_number_of_healthworkers();
            client_served_by_CBD();
            client_served_by_outreach();
            client_served_age_less_twenty();
            service_and_intergrations();
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
        function client_served_by_CBD() {
            var orgUnit = $scope.data['outRegistrationOrganisationUnits'][0];
            $.get( $scope.serverLink+"analytics.json?dimension=dx:CAZJesl4va5;NHnXpXYblEM;OxxbMcRjVbt&dimension=pe:"+ sanitizedPeriods($scope.selectedPeriods) +"&ou:" + orgUnit.id + "&displayProperty=NAME&skipMeta=false", function( json ) {
                var pe = json.metaData.dimensions.pe;
                var dx = json.metaData.dimensions.dx;
                var datas = json.rows;
                var pe_OBJECT =  json.metaData.items;

                if(orgUnit.name) {
                    console.log("Data Available");
                    var header_data = "<thead>";
                    header_data += "<tr>";
                    header_data += "<td>" + "Client Service, Served Through CBD" + "</td>";
                    header_data += "</tr>";

                    header_data += "<th>Service</th>";
                    $.each(pe_OBJECT, function(key, value){
                        $.each(value, function(key2, value2){
                            $.each(pe, function(key3, value3){
                                if(value3 == key) {
                                    var final = get_first_three_letters(get_first_string(value2)) + " " + get_last_string(value2);
                                    header_data += "<th>" + final + "</th>";
                                }
                            });
                        });
                    });
                    header_data += "</thead>";
                    $("#CBDTable").append(header_data);

                    var header_data = "<tbody>";
                    var total = [0,0.0,0,0,0,0,0,0,0,0,0,0];
                    var title_array = ["Female Condoms","Oral Pills", "Male Condoms"];
                    $.each(pe_OBJECT, function(key, value){
                        $.each(dx, function(key1, value1) {
                            if(key == value1) {
                                $.each(value, function(key2, value2) {
                                    header_data += "<tr>";
                                    header_data += "<td>" + title_array[key1] + "</td>";
                                    for(j = 0; j < 12; j++) {
                                        for(i = 0; i < json.rows.length; i++) {
                                            if(json.rows[i][0] == key) {
                                                if(json.rows[i][1] == pe[j]) {
                                                    header_data += "<td>" + Math.ceil(json.rows[i][2]) + "</td>";
                                                    var index = total.indexOf(total[j]);
                                                    total[index] = parseInt(total[index]) + parseInt(json.rows[i][2]);
                                                }
                                            }
                                        }
                                    }
                                    header_data += "</tr>";
                                });
                            }
                        });
                    });
                    header_data += "</tbody>";
                    $("#CBDTable").append(header_data);

                    var header_data = "<tfoot>";
                    header_data += "<td><strong>Total</strong></td>";
                    $.each(total, function(key, value){
                        header_data += "<td>" + Math.ceil(value) + "</td>";
                    });
                    header_data += "</tfoot>";
                    $("#CBDTable").append(header_data);
                }else {
                    console.log("Please Select Facility Level");
                    $("#notification").show();
                    $("#notification").html("Please Select Facility Level");
                }
            });
        }
        function client_served_by_healthy_facility() {
            var orgUnit = $scope.data['outRegistrationOrganisationUnits'][0];
            $.get( $scope.serverLink+"analytics.json?dimension=dx:Eh1uMcVwxEY;GEjpz3mQo6E;JSmtnnW6WrR;LmbDl4YdYAn;UjGebiXNg0t;bjkeLqFDDjo;c3f9YMx29Bx;isK24MvwQmy;lMFKZN3UaYp;xhcaH3H3pdK&dimension=pe:" + sanitizedPeriods($scope.selectedPeriods) + "&ou:" + orgUnit.id + "&displayProperty=NAME&skipMeta=false", function( json ) {
                var pe = json.metaData.dimensions.pe;
                var dx = json.metaData.dimensions.dx;
                var datas = json.rows;
                var pe_OBJECT =  json.metaData.items;

                if(orgUnit.name) {
                    console.log("Data Available");
                    var header_data = "<thead>";
                    header_data += "<tr>";
                    header_data += "<td>" + "Client Service, Served Through Health Facility" + "</td>";
                    header_data += "</tr>";

                    header_data += "<th>Service</th>";
                    $.each(pe_OBJECT, function(key, value){
                        $.each(value, function(key2, value2){
                            $.each(pe, function(key3, value3){
                                if(value3 == key) {
                                    var final = get_first_three_letters(get_first_string(value2)) + " " + get_last_string(value2);
                                    header_data += "<th>" + final + "</th>";
                                }
                            });
                        });
                    });
                    header_data += "</thead>";
                    $("#HealthyFacilityTable").append(header_data);

                    var header_data = "<tbody>";
                    var total = [0,0.0,0,0,0,0,0,0,0,0,0,0];
                    var title_array = ["Implant Removal", "IUCD's Removal", "NSV", "Injectables", "IUCD's Insertion", "Oral Pills", "Female Condoms", "Male Condoms", "Implant Insertion", "Minilap"]
                    $.each(pe_OBJECT, function(key, value){
                        $.each(dx, function(key1, value1) {
                            if(key == value1) {
                                $.each(value, function(key2, value2) {
                                    console.log(key1);
                                    header_data += "<tr>";
                                    header_data += "<td>" + title_array[key1] + "</td>";
                                    for(j = 0; j < 12; j++) {
                                        for(i = 0; i < json.rows.length; i++) {
                                            if(json.rows[i][0] == key) {
                                                if(json.rows[i][1] == pe[j]) {
                                                    header_data += "<td>" + Math.ceil(json.rows[i][2]) + "</td>";
                                                    var index = total.indexOf(total[j]);
                                                    total[index] = parseInt(total[index]) + parseInt(json.rows[i][2]);
                                                }
                                                // else {
                                                //     header_data += "<td>" + 0 + "</td>";
                                                // }
                                            }
                                        }
                                    }
                                    header_data += "</tr>";
                                });
                            }
                        });
                    });
                    header_data += "</tbody>";
                    $("#HealthyFacilityTable").append(header_data);

                    var header_data = "<tfoot>";
                    header_data += "<td><strong>Total</strong></td>";
                    $.each(total, function(key, value){
                        header_data += "<td>" + Math.ceil(value) + "</td>";
                    });
                    header_data += "</tfoot>";
                    $("#HealthyFacilityTable").append(header_data);
                }else {
                    console.log("Please Select Facility Level");
                    $("#notification").show();
                    $("#notification").html("Please Select Facility Level");
                }
            });
        }
        function client_served_by_outreach() {
            var orgUnit = $scope.data['outRegistrationOrganisationUnits'][0];
            $.get( $scope.serverLink+"analytics.json?dimension=dx:O10liqQFwcI;PLfFV1fKVfQ;RfSsrHPGBXV;ZnTi99UdGCS;chmWn8ksICz;xip1SDutimh&dimension=pe:" + sanitizedPeriods($scope.selectedPeriods) + "&ou:" + orgUnit.id + "&displayProperty=NAME&skipMeta=false", function( json ) {
                var pe = json.metaData.dimensions.pe;
                var dx = json.metaData.dimensions.dx;
                var datas = json.rows;
                var pe_OBJECT =  json.metaData.items;

                if(orgUnit.name) {
                    console.log("Data Available");
                    var header_data = "<thead>";
                    header_data += "<tr>";
                    header_data += "<td>" + "Client Service, Served Through Outreach" + "</td>";
                    header_data += "</tr>";

                    header_data += "<th>Service</th>";
                    $.each(pe_OBJECT, function(key, value){
                        $.each(value, function(key2, value2){
                            $.each(pe, function(key3, value3){
                                if(value3 == key) {
                                    var final = get_first_three_letters(get_first_string(value2)) + " " + get_last_string(value2);
                                    header_data += "<th>" + final + "</th>";
                                }
                            });
                        });
                    });
                    header_data += "</thead>";
                    $("#OutReachTable").append(header_data);

                    var header_data = "<tbody>";
                    var total = [0,0.0,0,0,0,0,0,0,0,0,0,0];
                    var title_array = ["IUCD Removals", "Implant Removals", "IUCD Insertion", "Implant Insertion", "NSV", "Minilap"];
                    $.each(pe_OBJECT, function(key, value){
                        $.each(dx, function(key1, value1) {
                            if(key == value1) {
                                $.each(value, function(key2, value2) {
                                    header_data += "<tr>";
                                    header_data += "<td>" + title_array[key1] + "</td>";
                                    for(j = 0; j < 12; j++) {
                                        for(i = 0; i < json.rows.length; i++) {
                                            if(json.rows[i][0] == key) {
                                                if(json.rows[i][1] == pe[j]) {
                                                    header_data += "<td>" + Math.ceil(json.rows[i][2]) + "</td>";
                                                    var index = total.indexOf(total[j]);
                                                    total[index] = parseInt(total[index]) + parseInt(json.rows[i][2]);
                                                }
                                            }
                                        }
                                    }
                                    header_data += "</tr>";
                                });
                            }
                        });
                    });
                    header_data += "</tbody>";
                    $("#OutReachTable").append(header_data);

                    var header_data = "<tfoot>";
                    header_data += "<td><strong>Total</strong></td>";
                    $.each(total, function(key, value){
                        header_data += "<td>" + Math.ceil(value) + "</td>";
                    });
                    header_data += "</tfoot>";
                    $("#OutReachTable").append(header_data);
                }else {
                    console.log("Please Select Facility Level");
                    $("#notification").show();
                    $("#notification").html("Please Select Facility Level");
                }
            });
        }
        function client_served_age_less_twenty() {
            var orgUnit = $scope.data['outRegistrationOrganisationUnits'][0];
            $.get( $scope.serverLink+"analytics.json?dimension=dx:GvbkEo6sfSd;LpkdcaLc4I9;W74wyMy1mp0;aSJKs4oPZAf;p14JdJaG2aC;p8cgxI3yPx8&dimension=pe:" + sanitizedPeriods($scope.selectedPeriods) + "&ou:" + orgUnit.id + "&displayProperty=NAME&skipMeta=false", function( json ) {
                var pe = json.metaData.dimensions.pe;
                var dx = json.metaData.dimensions.dx;
                var datas = json.rows;
                var pe_OBJECT =  json.metaData.items;

                if(orgUnit.name) {
                    console.log("Data Available");
                    var header_data = "<thead>";
                    header_data += "<tr>";
                    header_data += "<td>" + "Client Service, Served < 20 years" + "</td>";
                    header_data += "</tr>";

                    header_data += "<th>Service</th>";
                    $.each(pe_OBJECT, function(key, value){
                        $.each(value, function(key2, value2){
                            $.each(pe, function(key3, value3){
                                if(value3 == key) {
                                    var final = get_first_three_letters(get_first_string(value2)) + " " + get_last_string(value2);
                                    header_data += "<th>" + final + "</th>";
                                }
                            });
                        });
                    });
                    header_data += "</thead>";
                    $("#LessTwentyAgeTable").append(header_data);

                    var header_data = "<tbody>";
                    var total = [0,0.0,0,0,0,0,0,0,0,0,0,0];
                    var title_array = ["IUCD's", "Injectables", "Male Condoms", "Oral Pills", "Implants", "Female Condoms"];
                    $.each(pe_OBJECT, function(key, value){
                        $.each(dx, function(key1, value1) {
                            if(key == value1) {
                                $.each(value, function(key2, value2) {
                                    header_data += "<tr>";
                                    header_data += "<td>" + title_array[key1] + "</td>";
                                    for(j = 0; j < 12; j++) {
                                        for(i = 0; i < json.rows.length; i++) {
                                            if(json.rows[i][0] == key) {
                                                if(json.rows[i][1] == pe[j]) {
                                                    $.each(pe, function(key4, value4){
                                                        if(j == key4) {
                                                            header_data += "<td>" + Math.ceil(json.rows[i][2]) + "</td>";
                                                            var index = total.indexOf(total[j]);
                                                            total[index] = parseInt(total[index]) + parseInt(json.rows[i][2]);
                                                        }
                                                    });
                                                }
                                            }
                                        }
                                    }
                                    header_data += "</tr>";
                                });
                            }
                        });
                    });
                    header_data += "</tbody>";
                    $("#LessTwentyAgeTable").append(header_data);

                    var header_data = "<tfoot>";
                    header_data += "<td><strong>Total</strong></td>";
                    $.each(total, function(key, value){
                        header_data += "<td>" + Math.ceil(value) + "</td>";
                    });
                    header_data += "</tfoot>";
                    $("#LessTwentyAgeTable").append(header_data);
                }else {
                    console.log("Please Select Facility Level");
                    $("#notification").show();
                    $("#notification").html("Please Select Facility Level");
                }
            });
        }
        function healthworkerstesting() {
            var orgUnit = $scope.data['outRegistrationOrganisationUnits'][0];
            $.get( $scope.serverLink+"analytics.json?dimension=dx:BLqgpawRwGN;Igxe3yXGEoW;acbet8SSjCY;iWDh2fUbRTJ;t8vQoqdY0en&dimension=pe:" + sanitizedPeriods($scope.selectedPeriods) + "&ou:" +orgUnit.id + "&displayProperty=NAME&skipMeta=false", function( json ) {
                var pe = json.metaData.dimensions.pe;
                var dx = json.metaData.dimensions.dx;
                var datas = json.rows;
                var pe_OBJECT =  json.metaData.items;

                if(orgUnit.name) {
                    if(json.rows.length == 0) {
                        console.log("No Data Returned For The Facility [" + orgUnit.name + "]");
                        $("#notification").show();
                        $("#notification").html("No Data Available For The Facility (" + orgUnit.name + ")");
                    }else {
                        console.log("Data Available");
                        var header_data = "<thead>";
                        header_data += "<tr>";
                        header_data += "<td>" + "Client Service, Served Through CBD" + "</td>";
                        header_data += "</tr>";

                        header_data += "<th>Service</th>";
                        $.each(pe_OBJECT, function(key, value){
                            $.each(value, function(key2, value2){
                                $.each(pe, function(key3, value3){
                                    if(value3 == key) {
                                        var final = get_first_three_letters(get_first_string(value2)) + " " + get_last_string(value2);
                                        header_data += "<th>" + final + "</th>";
                                    }
                                });
                            });
                        });
                        header_data += "</thead>";
                        $("#testing").append(header_data);

                        var header_data = "<tbody>";
                        var total = [0,0.0,0,0,0,0,0,0,0,0,0,0];
                        $.each(pe_OBJECT, function(key, value){
                            $.each(dx, function(key1, value1) {
                                if(key == value1) {
                                    $.each(value, function(key2, value2) {
                                        header_data += "<tr>";
                                        header_data += "<td>" + value2 + "</td>";
                                        for(j = 0; j < 12; j++) {
                                            for(i = 0; i < json.rows.length; i++) {
                                                if(json.rows[i][0] == key) {
                                                    if(json.rows[i][1] == pe[j]) {
                                                        header_data += "<td>" + Math.ceil(json.rows[i][2]) + "</td>";
                                                        var index = total.indexOf(total[j]);
                                                        total[index] = parseInt(total[index]) + parseInt(json.rows[i][2]);
                                                    }
                                                    // else {
                                                    //     header_data += "<td>" + 0 + "</td>";
                                                    // }
                                                }
                                            }
                                        }
                                        header_data += "</tr>";
                                    });
                                }
                            });
                        });
                        header_data += "</tbody>";
                        $("#testing").append(header_data);

                        var header_data = "<tfoot>";
                        header_data += "<td><strong>Total</strong></td>";
                        $.each(total, function(key, value){
                            header_data += "<td>" + Math.ceil(value) + "</td>";
                        });
                        header_data += "</tfoot>";
                        $("#testing").append(header_data);
                    }
                }else {
                    console.log("Please Select Facility Level");
                    $("#notification").show();
                    $("#notification").html("Please Select Facility Level");
                }
            });
        }
        function total_number_of_healthworkers() {
            var orgUnit = $scope.data['outRegistrationOrganisationUnits'][0];
            $.get( $scope.serverLink+"analytics.json?dimension=dx:BLqgpawRwGN;Igxe3yXGEoW;acbet8SSjCY;iWDh2fUbRTJ;t8vQoqdY0en&dimension=pe:" + sanitizedPeriods($scope.selectedPeriods) + "&ou:" +orgUnit.id + "&displayProperty=NAME&skipMeta=false", function( json ) {
                var pe = json.metaData.dimensions.pe;
                var dx = json.metaData.dimensions.dx;
                var datas = json.rows;
                var pe_OBJECT =  json.metaData.items;

                var header_data = "<thead>";
                header_data += "<tr>";
                header_data += "<td>" + "Trained HealthWorkers" + "</td>";
                header_data += "</tr>";

                header_data += "<th>Type Of Training</th>";
                header_data += "<th>Trained HW's</th>";
                header_data += "</thead>";
                $("#TrainedHW").append(header_data);

                var header_data = "<tbody>";
                var total_hw = [0,0,0,0,0];
                var title_array = ["NSV", "Implants", "Minilap", "Short-Acting", "IUCD's"]
                $.each(pe_OBJECT, function(key, value){
                    $.each(dx, function(key1, value1) {
                        if(key == value1) {
                            $.each(value, function(key2, value2) {
                                header_data += "<tr>";
                                header_data += "<td>" + title_array[key1] + "</td>";
                                for(i = 0; i < json.rows.length; i++) {
                                    for(j = 0; j < 12; j++) {
                                        if(json.rows[i][0] == key) {
                                            if(json.rows[i][1] == pe[j]) {
                                                total_hw[key1] = total_hw[key1] + parseInt(json.rows[i][2]);
                                            }
                                        }
                                    }
                                }
                                header_data += "<td>" + total_hw[key1] + "</td>";
                                header_data += "</tr>";
                            });
                        }
                    });
                });
                header_data += "</tbody>";
                $("#TrainedHW").append(header_data);

                var overall = 0;
                var header_data = "<tfoot>";
                header_data += "<td><strong>Total</strong></td>";
                $.each(total_hw, function(key, value5){
                    overall = overall + value5;
                });
                header_data += "<td>" + Math.ceil(overall) + "</td>";
                header_data += "</tfoot>";
                $("#TrainedHW").append(header_data);

            });
        }
        function healthworkerstesting() {
            var orgUnit = $scope.data['outRegistrationOrganisationUnits'][0];
            $.get( "../api/analytics.json?dimension=dx:BLqgpawRwGN;Igxe3yXGEoW;acbet8SSjCY;iWDh2fUbRTJ;t8vQoqdY0en&dimension=pe:" + sanitizedPeriods($scope.selectedPeriods) + "&filter=ou:" +orgUnit.id + "&displayProperty=NAME&skipMeta=false", function( json ) {
                var pe = json.metaData.dimensions.pe;
                var dx = json.metaData.dimensions.dx;
                var datas = json.rows;
                var pe_OBJECT =  json.metaData.items;

                if(orgUnit.name) {
                    if(json.rows.length == 0) {
                        console.log("No Data Returned For The Facility [" + orgUnit.name + "]");
                        $("#notification").show();
                        $("#notification").html("No Data Available For The Facility (" + orgUnit.name + ")");
                    }else {
                        console.log("Data Available");
                        var header_data = "<thead>";
                        header_data += "<tr>";
                        header_data += "<td>" + "Client Service, Served Through CBD" + "</td>";
                        header_data += "</tr>";

                        header_data += "<th>Service</th>";
                        $.each(pe_OBJECT, function(key, value){
                            $.each(value, function(key2, value2){
                                $.each(pe, function(key3, value3){
                                    if(value3 == key) {
                                        var final = get_first_three_letters(get_first_string(value2)) + " " + get_last_string(value2);
                                        header_data += "<th>" + final + "</th>";
                                    }
                                });
                            });
                        });
                        header_data += "</thead>";
                        $("#testing").append(header_data);

                        var header_data = "<tbody>";
                        var total = [0,0.0,0,0,0,0,0,0,0,0,0,0];
                        $.each(pe_OBJECT, function(key, value){
                            $.each(dx, function(key1, value1) {
                                if(key == value1) {
                                    $.each(value, function(key2, value2) {
                                        header_data += "<tr>";
                                        header_data += "<td>" + value2 + "</td>";
                                        for(j = 0; j < 12; j++) {
                                            for(i = 0; i < json.rows.length; i++) {
                                                if(json.rows[i][0] == key) {
                                                    if(json.rows[i][1] == pe[j]) {
                                                        header_data += "<td>" + Math.ceil(json.rows[i][2]) + "</td>";
                                                        var index = total.indexOf(total[j]);
                                                        total[index] = parseInt(total[index]) + parseInt(json.rows[i][2]);
                                                    }
                                                    // else {
                                                    //     header_data += "<td>" + 0 + "</td>";
                                                    // }
                                                }
                                            }
                                        }
                                        header_data += "</tr>";
                                    });
                                }
                            });
                        });
                        header_data += "</tbody>";
                        $("#testing").append(header_data);

                        var header_data = "<tfoot>";
                        header_data += "<td><strong>Total</strong></td>";
                        $.each(total, function(key, value){
                            header_data += "<td>" + Math.ceil(value) + "</td>";
                        });
                        header_data += "</tfoot>";
                        $("#testing").append(header_data);
                    }
                }else {
                    console.log("Please Select Facility Level");
                    $("#notification").show();
                    $("#notification").html("Please Select Facility Level");
                }
            });
        }
        function total_number_of_healthworkers() {
            var orgUnit = $scope.data['outRegistrationOrganisationUnits'][0];
            $.get( $scope.serverLink+"analytics.json?dimension=dx:BLqgpawRwGN;Igxe3yXGEoW;acbet8SSjCY;iWDh2fUbRTJ;t8vQoqdY0en&dimension=pe:" + sanitizedPeriods($scope.selectedPeriods) + "&filter=ou:" + orgUnit.id + "&displayProperty=NAME&skipMeta=false", function( json ) {
                var pe = json.metaData.dimensions.pe;
                var dx = json.metaData.dimensions.dx;
                var datas = json.rows;
                var pe_OBJECT =  json.metaData.items;

                if(orgUnit.name) {
                    console.log("Data Available");
                    var header_data = "<thead>";
                    header_data += "<tr>";
                    header_data += "<td>" + "Trained Health Workers" + "</td>";
                    header_data += "</tr>";

                    header_data += "<th>Service</th>";
                    $.each(pe_OBJECT, function(key, value){
                        $.each(value, function(key2, value2){
                            $.each(pe, function(key3, value3){
                                if(value3 == key) {
                                    var final = get_first_three_letters(get_first_string(value2)) + " " + get_last_string(value2);
                                    header_data += "<th>" + final + "</th>";
                                }
                            });
                        });
                    });
                    header_data += "</thead>";
                    $("#TrainedHW").append(header_data);

                    var header_data = "<tbody>";
                    var total = [0,0.0,0,0,0,0,0,0,0,0,0,0];
                    var title_array = [
                        "Number of Health Workes Trained IUCDs",
                        "Number of Health Workes Trained Implants",
                        "Number of Health Workes Trained Minlap",
                        "Number of Health Workes Trained NSV",
                        "Number of Health Workes Trained Short Acting Methods"
                    ];
                    $.each(pe_OBJECT, function(key, value){
                        $.each(dx, function(key1, value1) {
                            if(key == value1) {
                                $.each(value, function(key2, value2) {
                                    header_data += "<tr>";
                                    header_data += "<td>" + title_array[key1] + "</td>";
                                    for(j = 0; j < 12; j++) {
                                        for(i = 0; i < json.rows.length; i++) {
                                            if(json.rows[i][0] == key) {
                                                if(json.rows[i][1] == pe[j]) {
                                                    header_data += "<td>" + Math.ceil(json.rows[i][2]) + "</td>";
                                                    var index = total.indexOf(total[j]);
                                                    total[index] = parseInt(total[index]) + parseInt(json.rows[i][2]);
                                                }
                                            }
                                        }
                                    }
                                    header_data += "</tr>";
                                });
                            }
                        });
                    });
                    header_data += "</tbody>";
                    $("#TrainedHW").append(header_data);

                    var header_data = "<tfoot>";
                    header_data += "<td><strong>Total</strong></td>";
                    $.each(total, function(key, value){
                        header_data += "<td>" + Math.ceil(value) + "</td>";
                    });
                    header_data += "</tfoot>";
                    $("#TrainedHW").append(header_data);
                }else {
                    console.log("Please Select Facility Level");
                    $("#notification").show();
                    $("#notification").html("Please Select Facility Level");
                }
            });
        }
        function commodities_stocked_out() {
            var orgUnit = $scope.data['outRegistrationOrganisationUnits'][0];
            $.get( $scope.serverLink+"analytics.json?dimension=dx:gOnXFvuLClY;n91UibSDCbn&dimension=pe:" + sanitizedPeriods($scope.selectedPeriods)+ "&filter=ou:" + orgUnit.id + "&displayProperty=NAME&skipMeta=false", function( json ) {
                var pe = json.metaData.dimensions.pe;
                var dx = json.metaData.dimensions.dx;

                var datas = json.rows;
                var pe_OBJECT =  json.metaData.items;

                if(orgUnit.name) {
                    console.log("Data Available");
                    var header_data = "<thead>";
                    header_data += "<tr>";
                    header_data += "<td>" + "Commodities Stocked Out" + "</td>";
                    header_data += "</tr>";

                    header_data += "<th>Commodities</th>";
                    $.each(pe_OBJECT, function(key, value){
                        $.each(value, function(key2, value2){
                            $.each(pe, function(key3, value3){
                                if(value3 == key) {
                                    var final = get_first_three_letters(get_first_string(value2)) + " " + get_last_string(value2);
                                    header_data += "<th>" + final + "</th>";
                                }
                            });
                        });
                    });
                    header_data += "</thead>";
                    $("#commoditiesTable").append(header_data);

                    var header_data = "<tbody>";
                    var total = [0,0.0,0,0,0,0,0,0,0,0,0,0];
                    var title_array = ["Injectables","Oral Pills"];
                    $.each(pe_OBJECT, function(key, value){
                        $.each(dx, function(key1, value1) {
                            if(key == value1) {
                                $.each(value, function(key2, value2) {
                                    header_data += "<tr>";
                                    header_data += "<td>" + title_array[key1] + "</td>";
                                    for(j = 0; j < 12; j++) {
                                        for(i = 0; i < json.rows.length; i++) {
                                            if(json.rows[i][0] == key) {
                                                if(json.rows[i][1] == pe[j]) {
                                                    if(json.rows[i][2] >= 1) {
                                                        header_data += "<td>" + "Yes" + "</td>";
                                                    } else if(json.rows[i][2] <= 0){
                                                        header_data += "<td>" + "No" + "</td>";
                                                    }else if(json.rows[i][2] == "") {
                                                        header_data += "<td>" + "No" + "</td>";
                                                    }
                                                    // header_data += "<td>" + Math.ceil(json.rows[i][2]) + "</td>";
                                                    var index = total.indexOf(total[j]);
                                                    total[index] = parseInt(total[index]) + parseInt(json.rows[i][2]);
                                                }
                                            }
                                        }
                                    }
                                    header_data += "</tr>";
                                });
                            }
                        });
                    });
                    header_data += "</tbody>";
                    $("#commoditiesTable").append(header_data);

                    var header_data = "<tfoot>";
                    header_data += "<td><strong>Total</strong></td>";
                    $.each(total, function(key, value){
                        header_data += "<td>" + Math.ceil(value) + "</td>";
                    });
                    header_data += "</tfoot>";
                    $("#commoditiesTable").append(header_data);
                }else {
                    console.log("Please Select Facility Level");
                    $("#notification").show();
                    $("#notification").html("Please Select Facility Level");
                }
            });
        }
        function service_and_intergrations() {
            var orgUnit = $scope.data['outRegistrationOrganisationUnits'][0];
            $.get( $scope.serverLink+"analytics.json?dimension=dx:GQ3JD2MeTIp;KLiLjLEQDrh;X52ysvNZ7q4;Xs33A99SoMs;qEWJizgHHot;r5gmWoT3ywf;rJPeim9h6qY;twBzX6Uja4u;udebdxs4kt0;wCLnMe5fRFu&dimension=pe:" + sanitizedPeriods($scope.selectedPeriods) + "&filter=ou:" + orgUnit.id + "&displayProperty=NAME&skipMeta=false", function( json ) {
                var pe = json.metaData.dimensions.pe;
                var dx = json.metaData.dimensions.dx;
                var datas = json.rows;
                var pe_OBJECT =  json.metaData.items;

                if(orgUnit.name) {
                    console.log("Data Available");
                    var header_data = "<thead>";
                    header_data += "<tr>";
                    header_data += "<td>" + "Service and Intergrations" + "</td>";
                    header_data += "</tr>";

                    header_data += "<th>Service</th>";
                    $.each(pe_OBJECT, function(key, value){
                        $.each(value, function(key2, value2){
                            $.each(pe, function(key3, value3){
                                if(value3 == key) {
                                    var final = get_first_three_letters(get_first_string(value2)) + " " + get_last_string(value2);
                                    header_data += "<th>" + final + "</th>";
                                }
                            });
                        });
                    });
                    header_data += "</thead>";
                    $("#service_and_intergrationsTable").append(header_data);

                    var header_data = "<tbody>";
                    var total = [0,0.0,0,0,0,0,0,0,0,0,0,0];
                    var title_array = [
                        "Huduma nyingine za uzazi wa mpango baada ya mimba kuharibika",
                        "Waliopata Njia za Uzazi wa Mpango Baada ya Mimba Kuharibika",
                        "Waliopata Njia za Uzazi wa Mpango Siku 42 Baada ya Kujifungua",
                        "Waliochunguzwa Matiti wakati wa Huduma ya Uzazi wa Mpango",
                        "Waliochunguzwa Shingo ya Mfuko wa Kizazi wakati wa Huduma ya Uzazi wa Mpang",
                        "Wateja Waliopima VVU",
                        "X FP Wateja waliochukua kondomu (Kituoni na CBD)",
                        "X FP wateja waliopatiwa huduma outreach jumla",
                        "X FP wateja waliopatiwa huduma na CBD jumla",
                        "X FP wateja waliopatiwa huduma kituoni Marudio",
                    ];
                    $.each(pe_OBJECT, function(key, value){
                        $.each(dx, function(key1, value1) {
                            if(key == value1) {
                                $.each(value, function(key2, value2) {
                                    header_data += "<tr>";
                                    header_data += "<td>" + title_array[key1] + "</td>";
                                    for(j = 0; j < 12; j++) {
                                        for(i = 0; i < json.rows.length; i++) {
                                            if(json.rows[i][0] == key) {
                                                if(json.rows[i][1] == pe[j]) {
                                                    header_data += "<td>" + Math.ceil(json.rows[i][2]) + "</td>";
                                                    var index = total.indexOf(total[j]);
                                                    total[index] = parseInt(total[index]) + parseInt(json.rows[i][2]);
                                                }
                                            }
                                        }
                                    }
                                    header_data += "</tr>";
                                });
                            }
                        });
                    });
                    header_data += "</tbody>";
                    $("#service_and_intergrationsTable").append(header_data);

                    var header_data = "<tfoot>";
                    header_data += "<td><strong>Total</strong></td>";
                    $.each(total, function(key, value){
                        header_data += "<td>" + Math.ceil(value) + "</td>";
                    });
                    header_data += "</tfoot>";
                    $("#service_and_intergrationsTable").append(header_data);
                }else {
                    console.log("Please Select Facility Level");
                    $("#notification").show();
                    $("#notification").html("Please Select Facility Level");
                }
                $("#loadingMessage").hide();
                // $scope.apply();
            });
            $scope.showLoaderImage = false;
        }
        // END OF FACILITY DATA CODE REPORTS





    });
