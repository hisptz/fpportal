/**
 * Created by kelvin on 11/16/15.
 */
angular.module("hmisPortal")
   .service('portalService',function($http,$resource,mapService,$q) {

        var self = this;
        //initializing shared data
        this.periodType = 'year';
        this.period = '';
        this.orgUnitId = '';
        this.orgUnitName = '';
        this.numerator='';
        this.denominator='';
        this.indicatorType='';
        this.header='';
        this.base = "https://hmisportal.moh.go.tz/dhis/";
        //this.base = "http://127.0.0.1:9000/";
        this.icons = [
            {name: 'table', image: 'table.jpg', action: ''},
            {name: 'bar', image: 'bar.png', action: ''},
            {name: 'line', image: 'line.png', action: ''},
            {name: 'combined', image: 'combined.jpg', action: ''},
            {name: 'column', image: 'column.png', action: ''},
            {name: 'area', image: 'area.jpg', action: ''},
            {name: 'pie', image: 'pie.png', action: ''},
            {name: 'map', image: 'map.jpg', action: ''}
        ];

        self.lineChartObject = {
            title: {
                text: ''
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            plotOptions: {
                line: {
                    marker: {
                        enabled: false
                    }
                }
            },

            series: [{
                data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
            }]
        };

        self.chartObject = {
            title: {
                text: ''
            },
            xAxis: {
                categories: [],
                labels: {
                    rotation: -90,
                    style: { "color": "#000000", "fontWeight": "normal" }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: ''
                }, labels: {
                    style: { "color": "#000000", "fontWeight": "bold" }
                }
            },
            plotOptions: {
                spline: {
                    marker: {
                        enabled: false
                    }
                }
            },
            series: []
        };

        this.authenticateDHIS = function () {
            var deferred = $q.defer();
            $.post( self.base + "dhis-web-commons-security/login.action?authOnly=true", {
                j_username: "portal", j_password: "Portal123"
            },function(response){
                deferred.resolve(response);
            },function(){
                deferred.reject();
            });

            //$http.post(self.base + "dhis-web-commons-security/login.action?authOnly=true", { j_username: "portal", j_password: "Portal123" })
            //    .success(function(response){
            //        deferred.resolve(response);
            //    })
            //    .error(function(errorMessageData){
            //        deferred.reject();
            //    });
            return deferred.promise;
        };

        this.getAnalyticsObject = function(dataElements,year,orgUnit){
            if(orgUnit === 'm0frOspS7JY'){
                var url = self.base+"api/analytics.json?dimension=dx:"+dataElements+"&dimension=ou:LEVEL-1;LEVEL-2;m0frOspS7JY&dimension=pe:"+year+"&displayProperty=NAME";
            }else{
                var url = self.base+"api/analytics.json?dimension=dx:"+dataElements+"&dimension=ou:LEVEL-2;LEVEL-3;"+orgUnit+"&dimension=pe:"+year+"&displayProperty=NAME";
            }
            //var url = 'data.json';
            var deferred = $q.defer();
            $http.get(url)
                .success(function (analyticsObject) {
                    deferred.resolve(analyticsObject);
                })
                .error(function (errorMessageData) {
                    deferred.reject();
                });
            return deferred.promise;
        };

        this.prepareData = function (jsonObject) {
            var data = [];
            data.push({'name': jsonObject.metaData.names[self.orgUnitId], 'id': self.orgUnitId, 'value': getDataFromUrl(jsonObject.rows, self.orgUnitId)});

            angular.forEach(jsonObject.metaData.ou, function (region) {
                if (region != self.orgUnitId) {
                    data.push({'name': jsonObject.metaData.names[region], 'id': region, 'value': getDataFromUrl(jsonObject.rows, region)});
                }
            });
            return data;
        };

        this.downloadExcel = function (id) {
            self.authenticateDHIS().then(function () {
                var url = "";
                if (self.selectedOrgUnit == "m0frOspS7JY") {
                    url = "https://139.162.204.124/dhis/api/analytics.csv?dimension=dx:" + id + "&dimension=pe:" + self.period + "&dimension=ou:LEVEL-1;LEVEL-2;" + self.orgUnitId + "&displayProperty=NAME&tableLayout=true&columns=dx&rows=pe;ou";
                } else {
                    url = "https://139.162.204.124/dhis/api/analytics.csv?dimension=dx:" + id + "&dimension=pe:" + self.period + "&dimension=ou:LEVEL-2;LEVEL-3;" + self.orgUnitId + "&displayProperty=NAME&tableLayout=true&columns=dx&rows=pe;ou";
                }
                $http.get(url,{'Content-Type': 'application/csv;charset=UTF-8'}).success(function (data) {
                    var a = document.createElement('a');
                    var blob = new Blob([data]);
                    a.href = window.URL.createObjectURL(blob);
                    a.download = "data.csv";
                    a.click();
                }
                );
            });
        };
        this.drawMap = function (baseUrl,orgUnit, level,card,cardtitle,valueTouseArray) {
            mapService.renderMap(baseUrl,orgUnit, level, card,cardtitle,valueTouseArray);

        };

        this.prepareSeries = function (cardObject, chart) {
            cardObject.chartObject.loading = true;
            self.authenticateDHIS().then(function () {
                if (chart == 'table') {
                    cardObject.displayTable = true;
                    cardObject.displayMap = false;
                } else if (chart == 'map') {
                    cardObject.displayMap = true;
                    cardObject.displayTable = false;
                }
                else {
                    cardObject.displayMap = false;
                    cardObject.displayTable = false;
                }
                cardObject.chartObject.title.text = cardObject.title;
                cardObject.chartObject.yAxis.title.text = cardObject.title.toLowerCase();

                var url = '';
//                var url = '/analytics.json';
                if (self.orgUnitId == "m0frOspS7JY") {
                    url = "https://139.162.204.124/dhis/api/analytics.json?dimension=dx:"+cardObject.data+"&dimension=ou:LEVEL-1;LEVEL-2;m0frOspS7JY&filter=pe:"+self.period+"&displayProperty=NAME";
                } else {
                    url = "https://139.162.204.124/dhis/api/analytics.json?dimension=dx:"+cardObject.data+"&dimension=ou:LEVEL-2;LEVEL-3;"+self.orgUnitId+"&filter=pe:"+self.period+"&displayProperty=NAME";
                }
                cardObject.chartObject.loading = true;
                $http.get(url).success(function (data) {
                       cardObject.header=data.metaData.names[cardObject.data];
                    var indicatorApi=
                        $resource("http://139.162.204.124/dhis/api/indicators/"+cardObject.data+".json");
                        var indicatorResult=indicatorApi.get(function(indicatorObject){
                            cardObject.indicatorType=indicatorObject.indicatorType.name;
                            var expApi=
                            $resource('http://139.162.204.124/dhis/api/expressions/description',{get:{method:"JSONP"}});
                             var numeratorExp=expApi.get({expression:indicatorObject.numerator},function(numeratorText){
                               cardObject.numerator=numeratorText.description;
                             });
                             var denominator=expApi.get({expression:indicatorObject.denominator},function(denominatorText){
                                 cardObject.denominator=denominatorText.description;
                             });
                        });
                    var area = [];
                    cardObject.chartObject.xAxis.categories = [];
                    //
                    if (typeof data === 'object') {
                        var dataToUse = self.prepareData(data);
                        //
                        angular.forEach(dataToUse, function (val) {
                            cardObject.chartObject.xAxis.categories.push(val.name);
                        });
                        var normalseries = [];
                        if (chart == "pie") {
                            delete cardObject.chartObject.chart;
                            var serie = [];
                            angular.forEach(dataToUse, function (val) {
                                serie.push({name: val.name, y: parseInt(val.value)})
                            });
                            normalseries.push({type: chart, name: cardObject.title, data: serie, showInLegend: true,
                                dataLabels: {
                                    enabled: false
                                } });
                            cardObject.chartObject.series = normalseries;
                        }
                        else if (chart == "combined") {
                            delete cardObject.chartObject.chart;
                            var serie1 = [];
                            var serie = [];

                            angular.forEach(dataToUse, function (val) {
                                serie.push(parseInt(val.value));
                                serie1.push({name: val.name, y: parseInt(val.value) })
                            });
                            normalseries.push({type: 'column', name: cardObject.title, data: serie});
                            normalseries.push({type: 'spline', name: cardObject.title, data: serie});
                            normalseries.push({type: 'pie', name: cardObject.title, data: serie1, center: [100, 80], size: 150, showInLegend: false,
                                dataLabels: {
                                    enabled: false
                                }});
                            cardObject.chartObject.series = normalseries;
                        }
                        else if (chart == 'table') {
                            cardObject.table = {};
                            cardObject.table.colums = [];
                            angular.forEach(dataToUse, function (val) {
                                cardObject.table.colums.push({name: val.name, value: parseInt(val.value)});
                            });
                        } else if (chart == 'map') {

                            if (self.orgUnitId == "m0frOspS7JY") {
                                self.drawMap(self.base,self.orgUnitId,2,cardObject,cardObject.title,dataToUse);
                            } else {
                                self.drawMap(self.base,self.orgUnitId, 3, cardObject,cardObject.title,dataToUse);
                            }
                        }
                        else {
                            delete cardObject.chartObject.chart;
                            var serie = [];
                            angular.forEach(dataToUse, function (val) {
                                serie.push(val.value);
                            });
                            cardObject.chartObject.chart = {};
                            cardObject.chartObject.chart.type = chart;
                            normalseries.push({type: chart, name: cardObject.title, data: serie});
                            cardObject.chartObject.series = normalseries;
                        }


                        cardObject.chartObject.loading = false
                    }

                });
            });

        };


    })