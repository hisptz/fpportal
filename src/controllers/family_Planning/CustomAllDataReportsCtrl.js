
angular.module("hmisPortal")
    .config(function($httpProvider) {

    })
    .controller("customReportsCtrl",function ($rootScope,$scope,$http,$location,$timeout,olData,olHelpers,shared,portalService,FPManager) {
        //displaying loading during page change
        $scope.showstaffedOptions = false;
        $scope.showclientsOptions = false;
        $scope.showfacilityOptions = false;
        $scope.showserviceIntegrationOptions = false;
        $scope.showstockOptions = false;
        $scope.currentOptionLabel = '';
        $scope.selectedAggregagtionType = '';
        $scope.endDate = '';
        $scope.selectedReport = {};
        $scope.outreachData = [];
        $scope.tableHeaderOptions = [];
        $scope.tableHeader = [];
        $scope.tableContents = [];
        $scope.reportOptions = [];
        $scope.startDate = '';
        $scope.showReportSection = false;
        $scope.customDate = false;
        $scope.periodType = 'monthly';
        $scope.reportHeader = 'Aggregate data view';
        $scope.aggregateDataViewHeader = [{name: 'S/N', id:''}, {name: 'Zone', id: ''},
            {name: 'Region', id: ''}, {name: 'District', id: ''}, {name: 'Period', id: ''}, {name: 'Total FP facilities', id: ''},
            {name: 'FP facilities reporting the FP template', id: ''}];
        $scope.facilityDataViewHeader = [{name: 'S/N', id:''}, {name: 'Zone', id: ''},
            {name: 'Region', id: ''}, {name: 'District', id: ''}, {name: 'Facility', id: ''},
            {name: 'Facility type', id: ''}, {name: 'Period', id: ''}, {name: 'Reporting the FP template ', id: ''}];
        $scope.trainingDataAggregateDataViewHeader = [{name: 'S/N', id:''}, {name: 'Zone', id: ''},
            {name: 'Region', id: ''}, {name: 'District', id: ''}, {name: 'Period', id: ''}, {name: 'Total FP Facilities', id: ''},
            {name: 'Total FP facilities reporting the FP template', id: ''}, {name: 'Facilities staffed with HWs trained in IUCD services', id: ''},
            {name: 'Facilities staffed with 2 or more HWs trained in IUCD services', id: ''}, {name: 'Total HWs trained in IUCD services', id: ''}];
        $scope.trainingDataFacilityDataViewHeader = [{name: 'S/N', id:''}, {name: 'Zone', id: ''},
            {name: 'Region', id: ''}, {name: 'District', id: ''}, {name: 'Facility', id: ''},
            {name: 'Facility type', id: ''}, {name: 'Period', id: ''}, {name: 'Total FP Facilities', id: ''},
            {name: 'Reporting the FP template', id: ''},{name: 'Total HWs trained in IUCD services', id: ''}];
        $scope.clientsServiceAggeregateDataViewHeader = [{name: 'S/N', id:''}, {name: 'Zone', id: ''},
            {name: 'Region', id: ''}, {name: 'District', id: ''}, {name: 'Period', id: ''}, {name: 'Total FP Facilities', id: ''},{name: 'Total FP facilities reporting the FP template', id: ''},
            {name: 'Total clients of injectables facility based', id: ''},{name: 'Reporting the FP template', id: ''},{name: 'Total HWs trained in IUCD services', id: ''}];
        $scope.staffedHWstrained = [
            {name: 'Short Acting',active: '',
                aggregateIndicator: [{name: 'Total Short acting', id:''}],
                facilityIndicator: [{name: 'Total Short acting', id:''}]
               },
            {name: 'Implants',active: '',
                aggregateIndicator: [{name: 'Facility staffed with HWs on implants service', id:''}],
                facilityIndicator: [{name: 'Total facilities staffed with HWs on implants servic', id:''}]},
            {name: 'UICDs',active: '',
                aggregateIndicator: [{name: 'Facilities staffed with HWs trained in IUCD services', id: ''},
                    {name: 'Facilities staffed with 2 or more HWs trained in IUCD services', id: ''}, {name: 'Total HWs trained in IUCD services', id: ''}],
                facilityIndicator: [{name: 'Total HWs trained in IUCD services', id: ''}],
            },
            {name:'NSV', active:'',
                aggregateIndicator:[],
                facilityIndicator:[]
            },
            {name:'Minilap', active:'',
                aggregateIndicator:[],
                facilityIndicator:[]
            }
            ];
        $scope.reportTypes = [
            {name:'Facility data report', id:'1'},
            {name:'Training data report', id:'2' },
            {name:'Clients & services data report', id:'3'},
            {name:'History of provision data report', id:'4'},
            {name:'Commodities data report', id:'5' },
            {name:'Service integration data report', id:'6' },
        ];
        $scope.aggregationTypes = [{name:'Aggregate data',id:'1'}, {name:'Facility data',id:'2'}];
        $scope.outreachData =[
            {name:'Short Acting',active: '',indicator: {name: 'Total Short acting outreach', id:''}},
            {name: 'Implants insertions',active: '', indicator: {name: 'Total Implants insertions outreach', id:''}},
            {name: 'Implants removal',active: '', indicator: {name: 'Total Implants removals outreach', id:''}},
            {name: 'UICDs insertion',active: '', indicator: {name: 'Total UICDs insertions outreach', id:''}},
            {name: 'UICDs removal',active: '', indicator: {name: 'Total UICDs removals outreach', id:''}}
        ];
        $scope.cbdServiceData =[
            {name:'Male condoms',active: '',indicator: {name: 'Total male condoms CBD', id:''}},
            {name: 'Female condoms',active: '', indicator: {name: 'Total female condoms CBD', id:''}},
            {name: 'Oral pills',active: '', indicator: {name: 'Total oral pills CBD', id:''}},
        ];
        $scope.routineFacilityData =[
            {name:'Male condoms',active: '',indicator: {name: 'Total clients of male condoms Facility based', id:''}},
            {name: 'Female condoms',active: '', indicator: {name: 'Total clients of  female condoms Facility based', id:''}},
            {name: 'Oral pills',active: '', indicator: {name: 'Total clients of  oral pills Facility based', id:''}},
            {name: 'Injectables',active: '', indicator: {name: 'Total clients of injectables Facility based', id:''}},
            {name: 'Implants insertions',active: '', indicator: {name: 'Total clients of Implants insertions Facility based', id:''}},
            {name: 'Implants removal',active: '', indicator: {name: 'Total clients of Implants removals Facility based', id:''}},
            {name: 'UICDs insertion',active: '', indicator: {name: 'Total clients of UICDs insertions Facility based', id:''}},
            {name: 'UICDs removal',active: '', indicator: {name: 'Total clients of UICDs removals Facility based', id:''}},
            {name: 'NSV',active: '', indicator: {name: 'Total clients of NSV Facility based', id:''}},
            {name: 'Minilap',active: '', indicator: {name: 'Total clients of Minilap Facility based', id:''}}
        ];

        $scope.selectedReportType = function (reportType) {
            angular.forEach($scope.reportTypes, function (report) {
                if(report.id === '1' && reportType === '1'){

                    // $scope.reportOptions = report.options;
                } else if (report.id === '2' && reportType === '2'){
                    console.log(report.id)
                    $scope.showstaffedOptions = true;
                    $scope.showfacilityOptions = false;
                    $scope.showclientsOptions = false;
                    $scope.showserviceIntegrationOptions = false;
                    $scope.showstockOptions = false;
                } else if (report.id === '3' && reportType === '3'){
                    $scope.showstaffedOptions = false;
                    $scope.showfacilityOptions = false;
                    $scope.showclientsOptions = true;
                    $scope.showserviceIntegrationOptions = false;
                    $scope.showstockOptions = false;
                } else if (report.id === '4' && reportType === '4'){
                    $scope.showstaffedOptions = false;
                    $scope.showfacilityOptions = true;
                    $scope.showclientsOptions = false;
                    $scope.showserviceIntegrationOptions = false;
                    $scope.showstockOptions = false;
                } else if (report.id === '5' && reportType === '5'){
                    $scope.showstaffedOptions = false;
                    $scope.showfacilityOptions = false;
                    $scope.showclientsOptions = false;
                    $scope.showserviceIntegrationOptions = false;
                    $scope.showstockOptions = true;
                } else if (report.id === '6' && reportType === '6'){
                    $scope.showstaffedOptions = false;
                    $scope.showfacilityOptions = false;
                    $scope.showclientsOptions = false;
                    $scope.showserviceIntegrationOptions = true;
                    $scope.showstockOptions = false;
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
                        $scope.tableHeaderOptions = $scope.itemsOnTableHeaderRemoval($scope.tableHeaderOptions, staffed.indicator, 'name');
                    } else {
                        // hence add its contents to other list groups
                        item.active = 'actived';
                        $scope.tableHeaderOptions = $scope.tableHeaderOptions.concat(staffed.aggregateIndicator)
                    }

                }
            });
        };
        $scope.updatingsOutreachOptionsToTable = function (data){
            angular.forEach( $scope.outreachData, function (item) {
                if (item.name === data.name) {
                    if (item.active === 'actived') {
                        item.active = '';
                        $scope.tableHeaderOptions = $scope.itemsOnTableHeaderRemoval($scope.tableHeaderOptions, data.indicator, 'name')
                    } else {
                        item.active = 'actived';
                        $scope.tableHeaderOptions.push(data.indicator)
                    }
                }
            });
        };
        $scope.updatingsCBDtoTable = function (data){
            angular.forEach( $scope.cbdServiceData, function (item) {
                if (item.name === data.name) {
                    if (item.active === 'actived') {
                        item.active = '';
                        $scope.tableHeaderOptions = $scope.itemsOnTableHeaderRemoval($scope.tableHeaderOptions, data.indicator, 'name')
                    } else {
                        item.active = 'actived';
                        $scope.tableHeaderOptions.push(data.indicator)
                    }
                }
            });
        }
        $scope.updatingsRoutineDatatoTable = function (data){
            angular.forEach( $scope.routineFacilityData, function (item) {
                if (item.name === data.name) {
                    if (item.active === 'actived') {
                        item.active = '';
                        $scope.tableHeaderOptions = $scope.itemsOnTableHeaderRemoval($scope.tableHeaderOptions, data.indicator, 'name')
                    } else {
                        item.active = 'actived';
                        $scope.tableHeaderOptions.push(data.indicator)
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
        $scope.itemsOnTableHeaderRemoval = function(collection, removal, key){
            angular.forEach(collection, function (collectedItem, index) {
                    if(collectedItem[key] === removal[key]){
                        collection.splice(index, 1);
                    }
            });
            return collection;
        }
        $scope.previewReport = function() {

            if ($scope.reportHeader === 'Aggregate data'){ // this makes decision on table header visibility type
                $scope.tableHeader = $scope.aggregateDataViewHeader.concat($scope.tableHeaderOptions)
                var orgUnit = $scope.data['outRegistrationOrganisationUnits'];

              angular.forEach(orgUnit, function (orgUnitCollection) {
                  angular.forEach(orgUnitCollection['children'], function (childOrgunit) {
                  $scope.tableContents.push({
                      zone: '', region: orgUnitCollection['name'], district: childOrgunit['name'], period: $scope.data.selectedMonth,
                      fpFacilities: Math.floor((Math.random() * 100) + 95) , indicatorItems: $scope.getIndicatorItemsValues()
                  })
              })
              })
            } else {
                $scope.tableHeader = $scope.facilityDataViewHeader.concat($scope.tableHeaderOptions)
            }
            $scope.showReportSection = !$scope.showReportSection;
            console.log($scope.data['outRegistrationOrganisationUnits']);
        }
        $scope.toggleCustomdate = function (event) {
            $scope.customDate = !$scope.customDate;
        }
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

    });
