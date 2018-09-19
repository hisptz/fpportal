
angular.module("hmisPortal")
    .config(function($httpProvider) {
        // $httpProvider.defaults.withCredentials = true;
    })
    .controller("monthlyReportsCtrl",function ($rootScope,$scope,$http,$location,$timeout,olData,olHelpers,shared,portalService,FPManager) {
        //displaying loading during page change
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
    });


