/**
 * Created by kelvin on 11/16/15.
 */
angular.module("hmisPortal")
   .service('portalService',function($http){

        var self = this;
        //initializing shared data
        this.periodType = 'year';
        this.period = '';
        this.orgUnitId = '';
        this.orgUnitName = '';
        this.base = "https://dhis.moh.go.tz/";
        this.icons = [
            {name:'table',image:'table.jpg',action:''},
            {name:'bar',image:'bar.png',action:''},
            {name:'line',image:'line.png',action:''},
            {name:'combined',image:'combined.jpg',action:''},
            {name:'column',image:'column.png',action:''},
            {name:'area',image:'area.jpg',action:''},
            {name:'pie',image:'pie.png',action:''},
            {name:'map',image:'map.jpg',action:''}
        ];
        self.chartObject = {
            title: {
                text: ''
            },
            xAxis: {
                categories: [],
                    labels:{
                    rotation: -90,
                        style:{ "color": "#000000", "fontWeight": "normal" }
                }
            },
            yAxis: {
                min: 0,
                    title: {
                    text: ''
                },labels:{
                    style:{ "color": "#000000", "fontWeight": "bold" }
                }
            },
            labels: {
                items: [{
                    html: 'doses',
                    style: {
                        left: '50px',
                        top: '18px',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                    }
                }]
            },
            series: []
        };

        //set period
        this.setPeriod = function(period){
            self.period = period;
        }

        this.setOrgUnit = function(orgunitId){
            self.orgUnitId = orgunitId;
        }

        this.setOrgUnitName = function(orgUnitName){
            self.orgUnitName = orgUnitName;
        }

        this.updateCardContents = function(cards){
            angular.forEach(cards,function(value){
                $scope.prepareSeries(value,value.chart);
            });
        }

        this.authenticateDHIS = function(){
            var promise = $http.post( self.base + "dhis-web-commons-security/login.action?authOnly=true", {
                j_username: "portal", j_password: "Portal123"
            }).then(function (response) {
                // The then function here is an opportunity to modify the response
                console.log(response);
                // The return value gets picked up by the then in the controller.
            });
            // Return the promise to the controller
            return promise;
        }

        this.prepareData = function(jsonObject){
            var data = [];
            data.push({'name':jsonObject.metaData.names[self.orgUnitId],'id':self.orgUnitId,'value':getDataFromUrl(jsonObject.rows,self.orgUnitId)});

            angular.forEach(jsonObject.metaData.ou,function(region){
                if(region != self.orgUnitId ){
                    data.push({'name':jsonObject.metaData.names[region],'id':region,'value':getDataFromUrl(jsonObject.rows,region)});
                }
            });
            return data;
        };

        this.prepareSeries = function(cardObject,chart){
            cardObject.chartObject.loading = true;
            self.authenticateDHIS().then(function(){
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

                var url = '';
                if(self.orgUnitId == "m0frOspS7JY"){
                    url = "https://dhis.moh.go.tz/api/analytics.json?dimension=dx:"+cardObject.data+"&dimension=ou:LEVEL-1;LEVEL-2;m0frOspS7JY&filter=pe:"+self.period+"&displayProperty=NAME";
                }else{
                    url = "https://dhis.moh.go.tz/api/analytics.json?dimension=dx:"+cardObject.data+"&dimension=ou:LEVEL-2;LEVEL-3;"+self.orgUnitId+"&filter=pe:"+self.period+"&displayProperty=NAME";
                }
                cardObject.chartObject.loading = true;
                $http.get(url).success(function(data){
                    var area = [];
                    cardObject.chartObject.xAxis.categories = [];
                    //
                    if (typeof data === 'object') {
                        var dataToUse = self.prepareData(data);
                        console.log(dataToUse)
                        //
                        angular.forEach(dataToUse,function(val){
                            cardObject.chartObject.xAxis.categories.push(val.name);
                        });
                        var normalseries = [];
                        if(chart == "pie"){
                            delete cardObject.chartObject.chart;
                            var serie = [];
                            angular.forEach(dataToUse,function(val){
                                serie.push({name: val.name, y: parseInt(val.value)})
                            });
                            normalseries.push({type: chart, name:cardObject.title , data: serie,showInLegend: true,
                                dataLabels: {
                                    enabled: false
                                } });
                            cardObject.chartObject.series = normalseries;
                        }
                        else if(chart == "combined"){
                            delete cardObject.chartObject.chart;
                            var serie1 = [];
                            var serie = [];

                            angular.forEach(dataToUse,function(val){
                                serie.push(parseInt(val.value));
                                serie1.push({name: val.name , y: parseInt(val.value) })
                            });
                            normalseries.push({type: 'column', name: cardObject.title, data: serie});
                            normalseries.push({type: 'spline', name: cardObject.title, data: serie});
                            normalseries.push({type: 'pie', name: cardObject.title, data: serie1,center: [100, 80],size: 150,showInLegend: false,
                                dataLabels: {
                                    enabled: false
                                }});
                            cardObject.chartObject.series = normalseries;
                        }
                        else if(chart == 'table'){
                            cardObject.table = {};
                            cardObject.table.colums =[];
                            angular.forEach(dataToUse,function(val){
                                cardObject.table.colums.push({name:val.name,value:parseInt(val.value)});
                            });
                        }else if(chart == 'map'){
                            if(self.orgUnitId == "m0frOspS7JY"){
                                //$scope.drawMap($scope.selectedOrgUnit,2,cardObject);
                            }else{
                                //$scope.drawMap($scope.selectedOrgUnit,3,cardObject);
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
                            normalseries.push({type: chart, name: cardObject.title, data: serie})
                            cardObject.chartObject.series = normalseries;
                        }
                        cardObject.chartObject.loading = false
                    }

                });
            });

        };
    })