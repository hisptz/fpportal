
angular.module("hmisPortal")
    .config(function($httpProvider) {

    })
    .controller("customReportsCtrl",function ($rootScope,$scope,$http,$location,$timeout,olData,olHelpers,shared,portalService,FPManager) {
        //displaying loading during page change
        $scope.endDate = '';
        $scope.outreachData = [];
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
            {name: 'Short Acting',active: 'active', childrens: [{name: 'Short Acting',active: '', indicator: {name: '', id:''},children: []}]},
            {name: 'Implants',active: '',
                childrens: [{name: 'Implants insertions',active: '', indicator: {name: '', id:''},children: []},
                    {name: 'Implants removal',active: '', indicator: {name: '', id:''},children: []} ]},
            {name: 'UICDs',active: '',
                childrens: [{name: 'UICDs insertion',active: '', indicator: {name: '', id:''},children: []},
                    {name: 'UICDs removal',active: '', indicator: {name: '', id:''},children: []}]}
            ];


        $scope.updateOutreachCBD = function (staffed) {
            var currentNewOutreach = []
            angular.forEach( $scope.staffedHWstrained, function (item) {
                if (item.name === staffed.name) {
                    if (item.active === 'active') {
                        // hence remove its contents to other list groups
                        item.active = '';
                        $scope.outreachData = $scope.itemsOnArrayRemoval($scope.outreachData, staffed['childrens'], 'name');
                    } else {
                        // hence add its contents to other list groups
                        item.active = 'active';
                        $scope.outreachData = $scope.outreachData.concat(staffed['childrens'])
                    }

                }
            });
        };

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
                        console.log(collectedItem)
                        collection.splice(index, removals.length);
                    }
                });
            });
            return collection;
        }

        $scope.previewReport = function() {
            $scope.showReportSection = !$scope.showReportSection;
            console.log($scope.startDate, $scope.endDate);
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
    });
