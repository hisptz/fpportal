/**
 * Created by kelvin on 11/26/15.
 */

angular.module("hmisPortal")
    .config(function($httpProvider) {

    })
    .controller("FamilyPlanningCtrl",function ($rootScope,$scope,$http,portalService) {
       var url = "https://dhis.moh.go.tz/api/analytics.json?dimension=dx:ZnTi99UdGCS;lMFKZN3UaYp&dimension=ou:LEVEL-2;m0frOspS7JY&dimension=pe:2014Q1;2014Q2;2014Q3;2014Q4&displayProperty=NAME";

        $scope.prepareData = function(jsonObject){
            var data = [];
            data.push({'name':jsonObject.metaData.names[$rootScope.selectedOrgUnit],'id':$rootScope.selectedOrgUnit,'value':getDataFromUrl(jsonObject.rows,$rootScope.selectedOrgUnit)});

            angular.forEach(jsonObject.metaData.ou,function(region){
                if(region != $rootScope.selectedOrgUnit ){
                    data.push({'name':jsonObject.metaData.names[region],'id':region,'value':getDataFromUrl(jsonObject.rows,region)});
                }
            });
            return data;

        };




        $scope.data.chartType = 'column';
        $scope.displayTable = false;
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

        $scope.downloadExcel = function(id){
            var base = "https://dhis.moh.go.tz/";
            $.post( base + "dhis-web-commons-security/login.action?authOnly=true", {
                j_username: "portal", j_password: "Portal123"
            },function(){
                var url = "";
                if($scope.selectedOrgUnit == "m0frOspS7JY"){
                    url = "https://dhis.moh.go.tz/api/analytics.csv?dimension=dx:"+id+"&dimension=pe:"+$scope.selectedPeriod+"&dimension=ou:LEVEL-1;LEVEL-2;"+$scope.selectedOrgUnit+"&displayProperty=NAME&tableLayout=true&columns=dx&rows=pe;ou";
                }else{

                    url = "https://dhis.moh.go.tz/api/analytics.csv?dimension=dx:"+id+"&dimension=pe:"+$scope.selectedPeriod+"&dimension=ou:LEVEL-2;LEVEL-3;"+$scope.selectedOrgUnit+"&displayProperty=NAME&tableLayout=true&columns=dx&rows=pe;ou";
                }
                $http.get(url,{'Content-Type': 'application/csv;charset=UTF-8'}).success(function(data){
                    var a = document.createElement('a');
                    var blob = new Blob([data]);
                    a.href = window.URL.createObjectURL(blob);
                    a.download = "data.xls";
                    a.click();
                });
            });
        };

        $scope.fpCards = [
            {
                title:'OPD STI Genital Ulcer Diseases (GUD) < 5',
                description:'OPD STI Genital Ulcer Diseases',
                cardClass:"col s12 m6",
                data:'grtxKHUL0dh',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)

            }];
        $scope.prepareSeries = function(cardObject,chart){
            cardObject.chartObject.loading = true;
            var base = "https://dhis.moh.go.tz/";
            $.post( base + "dhis-web-commons-security/login.action?authOnly=true", {
                j_username: "portal", j_password: "Portal123"
            },function(){
                if(chart == 'table'){
                    cardObject.displayTable = true;
                    cardObject.displayMap = false;
                }else if(chart == 'map'){
                    cardObject.displayMap = true;
                    cardObject.displayTable = false;
                }
                else{
                    cardObject.displayMap = false;
                    cardObject.displayTable = false;
                }
                cardObject.chartObject.title.text = cardObject.title;
                cardObject.chartObject.yAxis.title.text = cardObject.title.toLowerCase();

                if($scope.selectedOrgUnit == "m0frOspS7JY"){
                    $scope.url = "https://dhis.moh.go.tz/api/analytics.json?dimension=dx:"+cardObject.data+"&dimension=ou:LEVEL-1;LEVEL-2;m0frOspS7JY&filter=pe:"+$scope.selectedPeriod+"&displayProperty=NAME";
                }else{
                    $scope.url = "https://dhis.moh.go.tz/api/analytics.json?dimension=dx:"+cardObject.data+"&dimension=ou:LEVEL-2;LEVEL-3;"+$scope.selectedOrgUnit+"&filter=pe:"+$scope.selectedPeriod+"&displayProperty=NAME";
                }
                cardObject.chartObject.loading = true;
                $http.get($scope.url).success(function(data){
                    $scope.area = [];
                    cardObject.chartObject.xAxis.categories = [];
                    //
                    var dataToUse = $scope.prepareData(data);
                    //
                    angular.forEach(dataToUse,function(val){
                        cardObject.chartObject.xAxis.categories.push(val.name);
                    });
                    $scope.normalseries = [];
                    if(chart == "pie"){
                        delete cardObject.chartObject.chart;
                        var serie = [];
                        angular.forEach(dataToUse,function(val){
                            serie.push({name: val.name, y: parseInt(val.value)})
                        });
                        $scope.normalseries.push({type: chart, name:cardObject.title , data: serie,showInLegend: true,
                            dataLabels: {
                                enabled: false
                            } });
                        cardObject.chartObject.series = $scope.normalseries;
                    }
                    else if(chart == "combined"){
                        delete cardObject.chartObject.chart;
                        var serie1 = [];
                        var serie = [];

                        angular.forEach(dataToUse,function(val){
                            serie.push(parseInt(val.value));
                            serie1.push({name: val.name , y: parseInt(val.value) })
                        });
                        $scope.normalseries.push({type: 'column', name: cardObject.title, data: serie});
                        $scope.normalseries.push({type: 'spline', name: cardObject.title, data: serie});
                        $scope.normalseries.push({type: 'pie', name: cardObject.title, data: serie1,center: [100, 80],size: 150,showInLegend: false,
                            dataLabels: {
                                enabled: false
                            }})
                        cardObject.chartObject.series = $scope.normalseries;
                    }
                    else if(chart == 'table'){
                        cardObject.table = {};
                        cardObject.table.colums =[];
                        angular.forEach(dataToUse,function(val){
                            cardObject.table.colums.push({name:val.name,value:parseInt(val.value)});
                        });
                    }
                    else if(chart == 'map'){
                        if($scope.selectedOrgUnit == "m0frOspS7JY"){
                            $scope.drawMap($scope.selectedOrgUnit,2,cardObject);
                        }else{
                            $scope.drawMap($scope.selectedOrgUnit,3,cardObject);
                        }
                    }
                    else{
                        delete cardObject.chartObject.chart;
                        var serie = [];
                        angular.forEach(dataToUse,function(val){
                            serie.push(val.value);
                        });
                        cardObject.chartObject.chart={};
                        cardObject.chartObject.chart.type=chart;
                        $scope.normalseries.push({type: chart, name: cardObject.title, data: serie})
                        cardObject.chartObject.series = $scope.normalseries;
                    }
                    cardObject.chartObject.loading = false
                });
            });

        };
    });