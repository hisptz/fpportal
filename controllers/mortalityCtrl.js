/**
 * Created by kelvin on 10/21/15.
 */

/**
 * Created by kelvin on 10/20/15.
 */

angular.module("hmisPortal")
    .config(function($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    })
    .controller("mortalityCtrl",function ($rootScope,$scope,$http,$location,$timeout,olData,olHelpers,shared) {
//displaying loading during page change
        $rootScope.$on("$routeChangeStart",
            function (event, current, previous, rejection) {
                $rootScope.showLoader = true;
            });
        $rootScope.$on("$routeChangeSuccess",
            function (event, current, previous, rejection) {
                $rootScope.showLoader = false;

            });
        $scope.cards = {};
        $scope.data = {};
        $rootScope.selectedOrgUnit = "m0frOspS7JY";
        $rootScope.selectedPeriod = "2014";
        $scope.selectedOrgUnitLevel = "2";
        $scope.chartConfig = {
            title: {
                text: 'Combination chart'
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

        $scope.cards.malaria = [{
            title:'Death Rate Neonatal',
            description:'Death Rate Neonatal',
            cardClass:"col s12 m6",
            data:'HkhBsvPXUqi',
            icons:[
                {name:'table',image:'table.jpg',action:''},
                {name:'bar',image:'bar.png',action:''},
                {name:'line',image:'line.png',action:''},
                {name:'combined',image:'combined.jpg',action:''},
                {name:'column',image:'column.png',action:''},
                {name:'area',image:'area.jpg',action:''},
                {name:'pie',image:'pie.png',action:''},
                {name:'map',image:'map.jpg',action:''}
            ],
            dataSource:'',
            size:'small',
            displayTable:false,
            displayMap:false,
            chart:'bar',
            chartObject:{
                title: {
                    text: 'Combination chart'
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
            }

        },
            {
                title:'Still birth rate',
                description:'Still birth rate',
                cardClass:"col m6 s12",
                cardSize:"medium",
                data:'ZJC0W54YqCf',
                icons:[
                    {name:'table',image:'table.jpg',action:''},
                    {name:'bar',image:'bar.png',action:''},
                    {name:'line',image:'line.png',action:''},
                    {name:'combined',image:'combined.jpg',action:''},
                    {name:'column',image:'column.png',action:''},
                    {name:'area',image:'area.jpg',action:''},
                    {name:'pie',image:'pie.png',action:''},
                    {name:'map',image:'map.jpg',action:''}
                ],
                dataSource:'',
                size:'small',
                displayTable:false,
                displayMap:false,
                chart:'line',
                chartObject:{
                    title: {
                        text: 'Combination chart'
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
                }

            },
            {
                title:'Death Rate Under 1 year',
                description:'Death Rate Under 1 year',
                cardClass:"col m12 s12",
                data:'nsil7hufT3F',
                icons:[
                    {name:'table',image:'table.jpg',action:''},
                    {name:'bar',image:'bar.png',action:''},
                    {name:'line',image:'line.png',action:''},
                    {name:'combined',image:'combined.jpg',action:''},
                    {name:'column',image:'column.png',action:''},
                    {name:'area',image:'area.jpg',action:''},
                    {name:'pie',image:'pie.png',action:''},
                    {name:'map',image:'map.jpg',action:''}
                ],
                dataSource:'',
                size:'large',
                displayTable:false,
                displayMap:false,
                chart:'combined',
                chartObject:{
                    title: {
                        text: 'Combination chart'
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
                }

            },
            {
                title:'Maternal Mortality Ratio (Institutional)',
                description:'Maternal Mortality Ratio (Institutional)',
                cardClass:"col m6 s12",
                data:'lLlgpLxI9x7',
                icons:[
                    {name:'table',image:'table.jpg',action:''},
                    {name:'bar',image:'bar.png',action:''},
                    {name:'line',image:'line.png',action:''},
                    {name:'combined',image:'combined.jpg',action:''},
                    {name:'column',image:'column.png',action:''},
                    {name:'area',image:'area.jpg',action:''},
                    {name:'pie',image:'pie.png',action:''},
                    {name:'map',image:'map.jpg',action:''}
                ],
                dataSource:'',
                size:'small',
                displayTable:false,
                displayMap:false,
                chart:'table',
                chartObject:{
                    title: {
                        text: 'Combination chart'
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
                }

            },
            {
                title:'Infant Mortality Rate',
                description:'Infant Mortality Rate',
                cardClass:"col m6 s12",
                data:'Y1pkrlq2hWi',
                icons:[
                    {name:'table',image:'table.jpg',action:''},
                    {name:'bar',image:'bar.png',action:''},
                    {name:'line',image:'line.png',action:''},
                    {name:'combined',image:'combined.jpg',action:''},
                    {name:'column',image:'column.png',action:''},
                    {name:'area',image:'area.jpg',action:''},
                    {name:'pie',image:'pie.png',action:''},
                    {name:'map',image:'map.jpg',action:''}
                ],
                dataSource:'',
                size:'small',
                displayTable:false,
                displayMap:false,
                chart:'map',
                chartObject:{
                    title: {
                        text: 'Combination chart'
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
                }

            },
            {
                title:'Severe Anaemia Death',
                description:'Severe Anaemia Death',
                cardClass:"col m12 s12",
                data:'OlpU3IjbACM',
                icons:[
                    {name:'table',image:'table.jpg',action:''},
                    {name:'bar',image:'bar.png',action:''},
                    {name:'line',image:'line.png',action:''},
                    {name:'combined',image:'combined.jpg',action:''},
                    {name:'column',image:'column.png',action:''},
                    {name:'area',image:'area.jpg',action:''},
                    {name:'pie',image:'pie.png',action:''},
                    {name:'map',image:'map.jpg',action:''}
                ],
                dataSource:'',
                size:'large',
                displayTable:false,
                displayMap:false,
                chart:'combined',
                chartObject:{
                    title: {
                        text: 'Combination chart'
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
                }

            },
            {
                title:'Cholera Death Cases',
                description:'Cholera Death Cases',
                cardClass:"col m6 s12",
                data:'VQH4juyUveN',
                icons:[
                    {name:'table',image:'table.jpg',action:''},
                    {name:'bar',image:'bar.png',action:''},
                    {name:'line',image:'line.png',action:''},
                    {name:'combined',image:'combined.jpg',action:''},
                    {name:'column',image:'column.png',action:''},
                    {name:'area',image:'area.jpg',action:''},
                    {name:'pie',image:'pie.png',action:''},
                    {name:'map',image:'map.jpg',action:''}
                ],
                dataSource:'',
                size:'small',
                displayTable:false,
                displayMap:false,
                chart:'area',
                chartObject:{
                    title: {
                        text: 'Combination chart'
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
                }

            },
            {
                title:'Death Rate Perinatal',
                description:'Death Rate Perinatal',
                cardClass:"col m6 s12",
                data:'FumHFC1J66L',
                icons:[
                    {name:'table',image:'table.jpg',action:''},
                    {name:'bar',image:'bar.png',action:''},
                    {name:'line',image:'line.png',action:''},
                    {name:'combined',image:'combined.jpg',action:''},
                    {name:'column',image:'column.png',action:''},
                    {name:'area',image:'area.jpg',action:''},
                    {name:'pie',image:'pie.png',action:''},
                    {name:'map',image:'map.jpg',action:''}
                ],
                dataSource:'',
                size:'small',
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:{
                    title: {
                        text: 'Combination chart'
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
                }

            }
        ]

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


        //var datads = {"headers":[{"name":"dx","column":"Data","type":"java.lang.String","hidden":false,"meta":true},{"name":"ou","column":"Organisation unit","type":"java.lang.String","hidden":false,"meta":true},{"name":"value","column":"Value","type":"java.lang.Double","hidden":false,"meta":false}],"metaData":{"pe":["2014"],"co":[],"ou":["lnOyHhoLzre","Cpd5l15XxwA","yyW17iCz9As","qg5ySBw9X5l","LGTVRhKSn1V","Crkg9BoUo5w","qarQhOt2OEh","DWSo42hunXH","vYT08q7Wo33","EO3Ps3ny0Nr","vU0Qt1A5IDz","RD96nI1JXVV","ZYYX8Q9SGoV","acZHYslyJLt","MAL4cfZoFhJ","VMgrQWSVIYn","bN5q5k5DgLA","Sj50oz9EHvD","IgTAEKMqKRe","YtVMnut7Foe","sWOWPBvwNY2","hAFRrgDK0fy","kZ6RlMnt2bp","A3b5mw8DJYC","vAtZ8a924Lx"],"names":{"2014":"2014","yyW17iCz9As":"Pwani Region","vU0Qt1A5IDz":"Tanga Region","dx":"Data","vYT08q7Wo33":"Mara Region","ZYYX8Q9SGoV":"Ruvuma Region","vAtZ8a924Lx":"Rukwa Region","RD96nI1JXVV":"Kigoma Region","Crkg9BoUo5w":"Kagera Region","Cpd5l15XxwA":"Dodoma Region","MAL4cfZoFhJ":"Geita Region","kZ6RlMnt2bp":"Tabora Region","hAFRrgDK0fy":"Mwanza Region","tit1C1VPIV7":"ANC Proportion of pregnant women receiving ITN Voucher","acZHYslyJLt":"Dar Es Salaam Region","ou":"Organisation unit","qg5ySBw9X5l":"Manyara Region","A3b5mw8DJYC":"Mbeya Region","sWOWPBvwNY2":"Iringa Region","EO3Ps3ny0Nr":"Shinyanga Region","lnOyHhoLzre":"Kilimanjaro Region","pe":"Period","bN5q5k5DgLA":"Mtwara Region","Sj50oz9EHvD":"Morogoro Region","VMgrQWSVIYn":"Lindi Region","YtVMnut7Foe":"Arusha Region","DWSo42hunXH":"Katavi Region","IgTAEKMqKRe":"Simiyu Region","LGTVRhKSn1V":"Singida Region","qarQhOt2OEh":"Njombe Region"}},"rows":[["tit1C1VPIV7","lnOyHhoLzre","38.3"],["tit1C1VPIV7","Cpd5l15XxwA","32.9"],["tit1C1VPIV7","yyW17iCz9As","40.0"],["tit1C1VPIV7","qg5ySBw9X5l","27.6"],["tit1C1VPIV7","LGTVRhKSn1V","42.6"],["tit1C1VPIV7","Crkg9BoUo5w","38.0"],["tit1C1VPIV7","qarQhOt2OEh","34.0"],["tit1C1VPIV7","DWSo42hunXH","21.9"],["tit1C1VPIV7","vYT08q7Wo33","30.8"],["tit1C1VPIV7","EO3Ps3ny0Nr","19.6"],["tit1C1VPIV7","vU0Qt1A5IDz","37.9"],["tit1C1VPIV7","RD96nI1JXVV","36.4"],["tit1C1VPIV7","ZYYX8Q9SGoV","36.9"],["tit1C1VPIV7","acZHYslyJLt","20.8"],["tit1C1VPIV7","MAL4cfZoFhJ","21.4"],["tit1C1VPIV7","VMgrQWSVIYn","41.7"],["tit1C1VPIV7","bN5q5k5DgLA","33.9"],["tit1C1VPIV7","Sj50oz9EHvD","35.4"],["tit1C1VPIV7","IgTAEKMqKRe","23.1"],["tit1C1VPIV7","YtVMnut7Foe","33.9"],["tit1C1VPIV7","sWOWPBvwNY2","32.4"],["tit1C1VPIV7","hAFRrgDK0fy","25.5"],["tit1C1VPIV7","kZ6RlMnt2bp","26.3"],["tit1C1VPIV7","A3b5mw8DJYC","27.9"],["tit1C1VPIV7","vAtZ8a924Lx","25.3"]],"width":3,"height":25};
//       var datads = {"headers":[{"name":"dx","column":"Data","type":"java.lang.String","hidden":false,"meta":true},{"name":"ou","column":"Organisation unit","type":"java.lang.String","hidden":false,"meta":true},{"name":"value","column":"Value","type":"java.lang.Double","hidden":false,"meta":false}],"metaData":{"pe":["2014"],"co":[],"ou":["QKEr8DFutO8","lgZ6HfZaj3f","aQEZnk4RzKv","uafqZbOYpVL","zHa2ohFrpPM","PHWaJvzTmL8","D21VsjNL2LB"],"names":{"2014":"2014","pe":"Period","lgZ6HfZaj3f":"Arusha City Council","ou":"Organisation unit","dx":"Data","uafqZbOYpVL":"Meru District Council","D21VsjNL2LB":"Monduli District Council","QKEr8DFutO8":"Karatu District Council","zHa2ohFrpPM":"Arusha District Council","tit1C1VPIV7":"ANC Proportion of pregnant women receiving ITN Voucher","aQEZnk4RzKv":"Longido District Council","PHWaJvzTmL8":"Ngorongoro District Council"}},"rows":[["tit1C1VPIV7","QKEr8DFutO8","35.3"],["tit1C1VPIV7","lgZ6HfZaj3f","32.6"],["tit1C1VPIV7","aQEZnk4RzKv","33.6"],["tit1C1VPIV7","uafqZbOYpVL","42.1"],["tit1C1VPIV7","zHa2ohFrpPM","30.7"],["tit1C1VPIV7","PHWaJvzTmL8","27.7"],["tit1C1VPIV7","D21VsjNL2LB","36.8"]],"width":3,"height":7};


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
        }

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
                    }else if(chart == 'map'){
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
        $scope.lastCard=function(){
            var base = "https://dhis.moh.go.tz/";
            $.post( base + "dhis-web-commons-security/login.action?authOnly=true", {
                j_username: "portal", j_password: "Portal123"
            },function(){
                if($scope.selectedOrgUnit == "m0frOspS7JY"){
                    var lastUrl="https://dhis.moh.go.tz/api/analytics.json?dimension=dx:i47jm4Pkkq6;vfaY7k6TINl;tit1C1VPIV7;aw1jQ1tJTmE&dimension=ou:LEVEL-2;m0frOspS7JY&filter=pe:"+$scope.selectedPeriod+"&displayProperty=NAME";
                }else{
                    var lastUrl="https://dhis.moh.go.tz/api/analytics.json?dimension=dx:i47jm4Pkkq6;vfaY7k6TINl;tit1C1VPIV7;aw1jQ1tJTmE&dimension=ou:LEVEL-3;"+$scope.selectedOrgUnit+"&filter=pe:"+$scope.selectedPeriod+"&displayProperty=NAME";
                }
                $http.get(lastUrl).success(function(dataTable){
                    var generalArray=[];

                    var underOne="ANC IPT 2 coverage";
                    var undertwo="ANC Malaria prevalence";
                    var underthree="ANC Proportion of pregnant women receiving ITN Voucher";
                    var underfour="ANC IPT 1 coverage";
                    $scope.arrayed=[{'one':underOne,'two':undertwo,'three':underthree,'four':underfour}];
                    angular.forEach(dataTable.metaData.ou,function(region){
                        generalArray.push({"orgUnit":dataTable.metaData.names[region],underOne:ogUnitsObjectConstruct(underOne,dataTable,dataTable.rows,region),undertwo:undertwoObject(undertwo,dataTable,dataTable.rows,region),underthree:underthreeObject(underthree,dataTable,dataTable.rows,region),underfour:underfourObject(underfour,dataTable,dataTable.rows,region)});

                    });
                    $scope.tableContent=generalArray;
                    console.log($scope.tableContent);

                });
            });
        }
        $scope.downloadExcelTotal = function(){
            var base = "https://dhis.moh.go.tz/";
            $.post( base + "dhis-web-commons-security/login.action?authOnly=true", {
                j_username: "portal", j_password: "Portal123"
            },function(){
                if($scope.selectedOrgUnit == "m0frOspS7JY"){
                    var lastUrl="https://dhis.moh.go.tz/api/analytics.csv?dimension=dx:i47jm4Pkkq6;vfaY7k6TINl;tit1C1VPIV7;aw1jQ1tJTmE&dimension=ou:LEVEL-2;m0frOspS7JY&filter=pe:"+$scope.selectedPeriod+"&displayProperty=NAME";
                }else{
                    var lastUrl="https://dhis.moh.go.tz/api/analytics.csv?dimension=dx:i47jm4Pkkq6;vfaY7k6TINl;tit1C1VPIV7;aw1jQ1tJTmE&dimension=ou:LEVEL-3;"+$scope.selectedOrgUnit+"&filter=pe:"+$scope.selectedPeriod+"&displayProperty=NAME";
                }
                $http.get(lastUrl,{'Content-Type': 'application/octet-stream'}).success(function(data){
                    var a = document.createElement('a');
                    var blob = new Blob([data]);
                    a.href = window.URL.createObjectURL(blob);
                    a.download = "data.xls";
                    a.click();
                });
            });
        }


        $rootScope.firstClick = function(){
            angular.forEach($scope.cards.malaria,function(value){
//              $scope.data.chartType = value.chart;
                $scope.prepareSeries(value,value.chart);
            });
            $scope.lastCard();
        }
        $scope.firstClick();




        /**
         *
         * DRAW MAP
         * */
        $scope.drawMap = function(parentUid,level,card){
            $scope.shared = shared;
            shared.facility =3029;
            var url = 'https://dhis.moh.go.tz/api/organisationUnits.geojson?parent='+parentUid+'&level='+level;
            card.chartObject.loading = true;
            $http.get(url,{withCredentials: true, params : {
                j_username: "portal",
                j_password: "Portal123"

            }}).success(
                function(data) {
                    card.chartObject.loading = false;
                    var TotalGeo = {
                        "type":"FeatureCollection",
                        "features":[]
                    };
                    var districtProperties = [];

                    var dateObject = new Date();
                    $scope.thisyear = dateObject.getFullYear();
                    $scope.districts = {};
                    $scope.DistrictFreeObject = [];
                    angular.forEach(data.features, function (value, index) {

                        var hue = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
                        // creating dynamic colors for district
                        $scope.saveColorInlocalStorage(value.id,hue);

                        // prepare objects of district for properties to display on tooltip
                        districtProperties[value.id] = {
                            district_id:value.id,
                            year:$scope.thisyear,
                            name:value.properties.name,
                            "color":hue,
                            "facility":Math.floor(Math.random() * 256),
                            "anc_12":0,
                            "anc_fisrt":0,
                            "inst":0,
                            "post":0,
                            "measle":0,
                            "penta3":0,
                            "vitaminA":0,
                            "child":0,
                            "cervical":0,
                            "doctor":0,
                            "nurse":0,
                            "complete":0

                        };

                        $scope.DistrictFreeObject.push(districtProperties[value.id]);
                        $scope.districts[value.id]= districtProperties;

                        // creating geojson object
                        var Object =
                        {
                            "type":"Feature",
                            "id":value.id,
                            "properties":{
                                "name":value.properties
                            },
                            "geometry":{
                                "type":value.geometry.type,
                                "coordinates":value.geometry.coordinates
                            },
                            "style":{
                                fill:{
                                    color:$scope.getColorFromLocalStorage(value.id),
                                    opacity:5
                                },
                                stroke:{
                                    color:'white',
                                    width:2
                                }
                            }
                        };
                        TotalGeo.features.push(Object);

                    });

                    // function getter for district object
                    var getColor = function(district){
                        if(!district || !district['district_id']){
                            return "#FFF";
                        }
                        var color = districtProperties[district['district_id']].color;
                        return color;
                    }
                    var getStyle = function(feature){

                        var style = olHelpers.createStyle({
                            fill:{
                                color:getColor($scope.districts[feature.getId()]),
                                opacity:0.4
                            },
                            stroke:{
                                color:'white',
                                width:2
                            }
                        });
                        return [ style ];

                    }

                    angular.extend($scope, {
                        Africa: {
                            lat: -6.45,
                            lon: 35,
                            zoom: 5.6
                        },
                        layers:[
                            {
                                name:'mapbox',
                                source: {
                                    type: 'TileJSON',
                                    url:'http://api.tiles.mapbox.com/v3/mapbox.geography-class.jsonp'
                                }
                            } ,
                            {
                                name:'geojson',
                                source: {
                                    type: 'GeoJSON',
                                    geojson: {
                                        object: TotalGeo
                                    }
                                },
                                style: getStyle
                            }
                        ],defaults: {
                            events: {
                                layers: [ 'mousemove', 'click']
                            }
                        }
                    });

                    $scope.districts = {};
                    angular.forEach($scope.DistrictFreeObject,function(data,index){
                        var district = data;
                        $scope.districts[district['district_id']] = district;
                    });


                    olData.getMap().then(function(map) {
                        var previousFeature;
                        var overlay = new ol.Overlay({
                            element: document.getElementById('districtbox'),
                            positioning: 'top-right',
                            offset: [100, -100],
                            position: [100, -100]
                        });
                        var overlayHidden = true;
                        // Mouse over function, called from the Leaflet Map Events
                        $scope.$on('openlayers.layers.geojson.mousemove', function(event, feature, olEvent) {
                            $scope.$apply(function(scope) {
                                scope.selectedDistrict = feature ? $scope.districts[feature.getId()] : '';
                                if(feature) {
                                    // looping throught indicator types
                                    var url1 = "http://dhis.moh.go.tz/api/analytics.json?dimension=dx:"+card.data+"&dimension=pe:"+$scope.thisyear+"&filter=ou:"+feature.getId()+"&displayProperty=NAME";
                                    $http.get(url1,{withCredentials: true, params : {
                                        j_username: "portal",
                                        j_password: "Portal123"
                                    }}).success(
                                        function(data) {
                                            var currentDistrict = $scope.districts[feature.getId()];
                                            if(data.rows[0]){
                                                if(value==data.rows[0][0]){

                                                    currentDistrict[index] = data.rows[0][2];
                                                }
                                            }

                                            $scope.districts[feature.getId()] = currentDistrict;
                                        });

                                    scope.selectedDistrict = feature ? $scope.districts[feature.getId()] : '';
                                }
                            });

                            if (!feature) {
                                map.removeOverlay(overlay);
                                overlayHidden = true;
                                return;
                            } else if (overlayHidden) {
                                map.addOverlay(overlay);
                                overlayHidden = false;
                            }
                            overlay.setPosition(map.getEventCoordinate(olEvent));
                            if (feature) {
                                feature.setStyle(olHelpers.createStyle({
                                    fill: {
                                        color: '#FFF'
                                    }
                                }));
                                if (previousFeature && feature !== previousFeature) {
                                    previousFeature.setStyle(getStyle(previousFeature));
                                }
                                previousFeature = feature;
                            }
                        });
                        $scope.$on('openlayers.layers.geojson.featuresadded', function(event, feature, olEvent) {
                            $scope.$apply(function(scope) {
                                if(feature) {
                                    $scope.id = feature.getId();
                                    scope.selectedDistrict = feature ? $scope.districts[feature.getId()]: '';
                                }
                            });

                        });
                    });


                });
            $scope.saveColorInlocalStorage  = function(id,value){

                if(!$scope.getColorFromLocalStorage(id)){
                    localStorage.setItem(id , value);
                }
            }

            $scope.getColorFromLocalStorage = function(id){
                var Item = localStorage.getItem( id );
                if(!Item){
                    return false;
                }else{
                    return Item;
                }

            }
        }


    })
    .factory('shared', function() {
        var shared = {
            "facility":0
        };
        return shared;
    });
var ogUnitsObjectConstruct=function(underOne,ObjectNames,ObectData,orgUnits){
    var num='';
    angular.forEach(ObectData,function(value) {
        if(value[1]==orgUnits) {
            if (ObjectNames.metaData.names[value[0]].indexOf(underOne) >= 0) {
                num = value[2];
            }
        }
    });
    return num;
}
var undertwoObject=function(undertwo,ObjectNames,ObectData,orgUnits){
    var num='';
    angular.forEach(ObectData,function(value) {
        if(value[1]==orgUnits) {
            if (ObjectNames.metaData.names[value[0]].indexOf(undertwo) >= 0) {
                num = value[2];
            }
        }
    });
    return num;
}
var underthreeObject=function(underthree,ObjectNames,ObectData,orgUnits){
    var num='';
    angular.forEach(ObectData,function(value) {
        if(value[1]==orgUnits) {
            if (ObjectNames.metaData.names[value[0]].indexOf(underthree) >= 0) {
                num = value[2];
            }
        }
    });
    return num;
}
var underfourObject=function(underfour,ObjectNames,ObectData,orgUnits){
    var num='';
    angular.forEach(ObectData,function(value) {
        if(value[1]==orgUnits) {
            if (ObjectNames.metaData.names[value[0]].indexOf(underfour) >= 0) {
                num = value[2];
            }
        }
    });
    return num;
}
function getDataFromUrl(arr,ou){
    var num = 0
    $.each(arr,function(k,v){
        if(v[1] == ou){
            num = parseInt(v[2])
        }
    });
    return num;
}