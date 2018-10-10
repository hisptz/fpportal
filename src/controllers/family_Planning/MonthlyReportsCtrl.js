
angular.module("hmisPortal")
    .config(function($httpProvider) {
        // $httpProvider.defaults.withCredentials = true;
    })
    .controller("monthlyReportsCtrl",function ($rootScope,$scope,$sce,$http,$location,$timeout,FPManager,olData,olHelpers,shared,portalService) {
        //displaying loading during page change
        $scope.data = {};
        $scope.facilityType = '';
        $scope.link = '';
        $scope.selectedOrgunitId = '';
        $scope.selectedYear = FPManager.latestYear;
        $scope.monthList = [{value:12,name:"December"}];
        $scope.data.selectedMonth = FPManager.latestMonth;
        $scope.showReportSection = false;

        $scope.addSubscriber = function(){
            $rootScope.progressMessage = "Adding you to the list of subscribers, Please wait ...";
            $rootScope.showProgressMessage = true;

            var authdata = Base64.encode('portal:Portal123');
            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
            $http.get(portalService.base +"api/userGroups.json?filter=name:eq:Portal Subscription").then(function(result){
                console.log(result);
                console.log(result.data.userGroups[0]);
                var organisationUnits = [];
                $scope.data.outRegistrationOrganisationUnits.forEach(function(orgUnit){
                    organisationUnits.push({id:orgUnit.id});
                });
                var max = 1000,min = 1;
                var userPayload = {
                    firstName: $scope.newUser.name,
                    surname: $scope.newUser.name,
                    email: $scope.newUser.email,
                    userCredentials: {
                        username: $scope.newUser.name.replace(/ /g,'') + Math.floor(Math.random() * (max - min + 1)) + min,
                        password: "DHIS2016"/*,
                         userRoles: [ {
                         id: "Euq3XfEIEbx"
                         } ]*/
                    },
                    organisationUnits:organisationUnits,
                    userGroups: [ {
                        id: result.data.userGroups[0].id
                    } ]
                }
                $http.post(portalService.base +"api/users",userPayload).then(function(result){
                    console.log(result);
                    $scope.newUser.name = "";
                    $scope.newUser.email = "";
                    $rootScope.progressMessage = "You have been subscribed Successfully.";
                    $rootScope.showProgressMessage = true;
                    $timeout(function(){
                        $rootScope.showProgressMessage = false;
                    },2000)
                },function(){
                    $rootScope.progressMessage = "Error Subscribing. Please try again.";
                    $rootScope.showProgressMessage = true;
                    $timeout(function(){
                        $rootScope.showProgressMessage = false;
                    },2000)
                });
            });
            return false;
        }
        $scope.updatePeriod = function(year){
            $scope.data.selectedMonth = year+"12";
        };

        $scope.updateMonth = function(month){
            $scope.data.selectedMonth = month;
        };

        $scope.clearAllOrgunits = function(){
            $scope.updateTreeWithNone();
        };
        $scope.clearAllMethods = function(){
            $scope.clearMethods();
        };
        $scope.updateTreeWithNone = function(){
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
            $scope.data.orgUnitTree.push({name:"Tanzania",id:'m0frOspS7JY',children:$scope.data.orgUnitTree1 });
        };
        $scope.selectOnly1Or2 = function(item, selectedItems) {
            if (selectedItems  !== undefined && selectedItems.length >= 7) {
                return false;
            } else {
                return true;
            }
        };
        $scope.previewReport = function() {
            $scope.showReportSection = !$scope.showReportSection;
            $scope.selectedOrgunitId = $scope.data['outRegistrationOrganisationUnits'][0].id;

            if($scope.data['outRegistrationOrganisationUnits'][0].name.indexOf('Council') > -1){
                $scope.facilityType = 'districtPDF';
            }else if($scope.data['outRegistrationOrganisationUnits'][0].name.indexOf('Region') > -1){
                $scope.facilityType = 'regionPDF';
            }else if($scope.data['outRegistrationOrganisationUnits'][0].name.indexOf('Tanzania') > -1){
                $scope.facilityType = 'nationalPDF';
            }
            $scope.link = ''+$scope.facilityType+'.html#/home?uid='+$scope.selectedOrgunitId
            $scope.link = $sce.trustAsResourceUrl($scope.link);
            console.log($scope.data['outRegistrationOrganisationUnits'], $scope.data.selectedMonth);
        }

        $scope.printReport = function (){

            // var w =window.open();
            // var htmlPrinted =  document.getElementById('reportFrame');
            // var htmlToPrint = '' +
            //     '<style type="text/css">' +
            //     'table th, table td {' +
            //     'border:1px solid #000;' +
            //     'padding:1em;' +
            //     '}' + 'table {' +
            //     'border-collapse: collapse;' +
            //     '}' +
            //     '</style>';
            //
            // htmlToPrint += htmlPrinted.outerHTML;
            // w.document.write(htmlToPrint);
            // // w.document.write(htmlPrinted);
            // w.print();

            // window.frames["monthlyReportFrame"].focus();
            // window.frames["monthlyReportFrame"].print();
            // document.getElementById("reportFrame").contentWindow.print()​​​​​​;

            window.print();



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
    });


