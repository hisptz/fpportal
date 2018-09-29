
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
            {name:'Training data report', id:'2' },
            {name:'Clients & services data report', id:'3'},
            {name:'History of provision data report', id:'4'},
            {name:'Commodities data report', id:'5' },
            {name:'Service integration data report', id:'6' },
            {name:'Facility data report', id:'1'}
        ];
        $scope.aggregationTypes = [ {name:'Facility data',id:'2',selected:'selected'},{name:'Aggregate data',id:'1', selected:''}];
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
                $scope.data.outOrganisationUnits.push({ name:value.name,id:value.id, children:zoneRegions,selected:true })
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
            $scope.tableContents = [];
            // if ($scope.reportHeader === 'Aggregate data'){ // this makes decision on table header visibility type
                $scope.tableHeader = $scope.aggregateDataViewHeader.concat($scope.tableHeaderOptions)
                var orgUnit = $scope.data['outRegistrationOrganisationUnits'];

              angular.forEach(orgUnit, function (orgUnitCollection) {
                  angular.forEach(orgUnitCollection['children'], function (childOrgunit) {
                  $scope.tableContents.push({
                      zone: '', region: orgUnitCollection['name'], district: childOrgunit['name'], period: $scope.data.selectedMonth,
                      fpFacilities: Math.floor((Math.random() * 100) + 95) , indicatorItems: $scope.getIndicatorItemsValues()
                  });
              })
              })
            // }
            // else {
            //     $scope.tableHeader = $scope.facilityDataViewHeader.concat($scope.tableHeaderOptions)
            // }
            $scope.showReportSection = !$scope.showReportSection;
            console.log($scope.data['outRegistrationOrganisationUnits']);


            client_served_by_healthy_facility();

            total_number_of_healthworkers();

            client_served_by_CBD();

            client_served_by_outreach();

            client_served_age_less_twenty();




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


        // FACILITY DATA CODE REPORTS
        // $( "#bcg1" ).html( orgUnit.name );
        // $( "#bcg2" ).html( orgUnitHierarchy[1].name );
        // $( "#bcg3" ).html( orgUnitHierarchy[2].name );
        // $( "#bcg4" ).html( "None" );
        //
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
            console.log("Data Available");
            $.get( "../api/analytics.json?dimension=dx:CAZJesl4va5;NHnXpXYblEM;OxxbMcRjVbt&dimension=pe:"+ sanitizedPeriods(periods) +"&filter=ou:" + orgUnit.id + "&displayProperty=NAME&skipMeta=false", function( json ) {
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
            $.get( "../api/analytics.json?dimension=dx:Eh1uMcVwxEY;GEjpz3mQo6E;JSmtnnW6WrR;LmbDl4YdYAn;UjGebiXNg0t;bjkeLqFDDjo;c3f9YMx29Bx;isK24MvwQmy;lMFKZN3UaYp;xhcaH3H3pdK&dimension=pe:" + sanitizedPeriods($scope.selectedPeriods) + "&dimension=ou:" + orgUnit.id + "&displayProperty=NAME&skipMeta=false", function( json ) {
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
            $.get( "../api/analytics.json?dimension=dx:O10liqQFwcI;PLfFV1fKVfQ;RfSsrHPGBXV;ZnTi99UdGCS;chmWn8ksICz;xip1SDutimh&dimension=pe:" + sanitizedPeriods(periods) + "&filter=ou:" + orgUnit.id + "&displayProperty=NAME&skipMeta=false", function( json ) {
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
            $.get( "../api/analytics.json?dimension=dx:GvbkEo6sfSd;LpkdcaLc4I9;W74wyMy1mp0;aSJKs4oPZAf;p14JdJaG2aC;p8cgxI3yPx8&dimension=pe:" + sanitizedPeriods(periods) + "&filter=ou:" + orgUnit.id + "&displayProperty=NAME&skipMeta=false", function( json ) {
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
            $.get( "../api/analytics.json?dimension=dx:BLqgpawRwGN;Igxe3yXGEoW;acbet8SSjCY;iWDh2fUbRTJ;t8vQoqdY0en&dimension=pe:" + sanitizedPeriods(periods) + "&filter=ou:" +orgUnit.id + "&displayProperty=NAME&skipMeta=false", function( json ) {
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
            $.get( "../api/analytics.json?dimension=dx:BLqgpawRwGN;Igxe3yXGEoW;acbet8SSjCY;iWDh2fUbRTJ;t8vQoqdY0en&dimension=pe:" + sanitizedPeriods(periods) + "&filter=ou:" +orgUnit.id + "&displayProperty=NAME&skipMeta=false", function( json ) {
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


        // END OF FACILITY DATA CODE REPORTS





    });
