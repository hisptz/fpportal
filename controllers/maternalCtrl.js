/**
 * Created by kelvin on 10/20/15.
 */

angular.module("hmisPortal")
    .config(function($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    })
    .controller("maternalCtrl",function ($rootScope,$scope,$http,$location,$timeout,olData,olHelpers,shared,portalService) {
        //displaying loading during page change
        $rootScope.$on("$routeChangeStart",
            function (event, current, previous, rejection) {
                $rootScope.showLoader = true;
            });
        $rootScope.$on("$routeChangeSuccess",
            function (event, current, previous, rejection) {
                $rootScope.showLoader = false
            });
        $scope.cards = {};
        $scope.data = {};
        portalService.orgUnitId = "m0frOspS7JY";
        portalService.period = "2014";
        $scope.selectedOrgUnitLevel = "2";

        $scope.cards.malaria = [{
            title:'Antenatal Care Coverage',
            description:'Antenatal Care Coverage',
            cardClass:"col s12 m6",
            data:'XjbKrjgOFMp',
            icons:angular.copy(portalService.icons),
            displayTable:false,
            displayMap:false,
            chart:'bar',
            chartObject:angular.copy(portalService.chartObject)

        },
            {
                title:'ANC 4th Visit Coverage',
                description:'ANC 4th Visit Coverage',
                cardClass:"col m6 s12",
                cardSize:"medium",
                data:'QiA9L6tNHFy',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'line',
                chartObject:angular.copy(portalService.chartObject)

            },
            {
                title:' ANC 1st Visit before 12 weeks rate',
                description:' ANC 1st Visit before 12 weeks rate',
                cardClass:"col m12 s12",
                data:'TRoamv0YPt3',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'combined',
                chartObject:angular.copy(portalService.chartObject)

            },
            {
                title:'ANC De- worming rate',
                description:'ANC De- worming rate',
                cardClass:"col m6 s12",
                data:'ovRcOHNO7qZ',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'table',
                chartObject:angular.copy(portalService.chartObject)

            },
            {
                title:'ANC Syphilis prevelance',
                description:'ANC Syphilis prevelance',
                cardClass:"col m6 s12",
                data:'aEcdPpCOi3k',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'map',
                chartObject:angular.copy(portalService.chartObject)

            },
            {
                title:'ANC Coverage for women under 20 years',
                description:'ANC Coverage for women under 20 years',
                cardClass:"col m12 s12",
                data:'JeIe5FgaGTX',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'combined',
                chartObject:angular.copy(portalService.chartObject)

            },
            {
                title:'ANC HIV Prevelance ( 15 - 24)',
                description:'ANC HIV Prevelance ( 15 - 24)',
                cardClass:"col m6 s12",
                data:'TdxVgoa08tn',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'area',
                chartObject:angular.copy(portalService.chartObject)

            },
            {
                title:'Health Facility Delivery Rate',
                description:'Health Facility Delivery Rate',
                cardClass:"col m6 s12",
                data:'OLWz8aiTGYd',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)

            },
            {
                title:'Contraceptive  prevalence rate',
                description:'Contraceptive  prevalence rate',
                cardClass:"col m6 s12",
                data:'lcOiUC6RdPw',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'line',
                chartObject:angular.copy(portalService.chartObject)

            },
            {
                title:'Deliveries by skilled attendants',
                description:'Deliveries by skilled attendants',
                cardClass:"col m6 s12",
                data:'vVRVLjgU10c',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'pie',
                chartObject:angular.copy(portalService.chartObject)

            }
        ];

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
            portalService.prepareSeries(card,$scope.data.chartType);
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

        $scope.lastCard=function(){
            var base = "https://dhis.moh.go.tz/";
            $.post( base + "dhis-web-commons-security/login.action?authOnly=true", {
                j_username: "portal", j_password: "Portal123"
            },function(){
                if($scope.selectedOrgUnit == "m0frOspS7JY"){
                    var lastUrl="https://dhis.moh.go.tz/api/analytics.json?dimension=dx:TRoamv0YPt3;WAdaCligbNP;ykShMtNgDB1;XjbKrjgOFMp;QiA9L6tNHFy;yqA1CfsfBHQ;ovRcOHNO7qZ;m1PpRCnZF4l;JeIe5FgaGTX;aEcdPpCOi3k;VSXdXdsSUd3;PmSZNZHac3t;TdxVgoa08tn;F99dNfvn18N;s4zyCyJ7EjQ;OLWz8aiTGYd;kLI4iGDbN3p;vVRVLjgU10c;DPLR0aQemYC&dimension=ou:LEVEL-2;m0frOspS7JY&filter=pe:"+$scope.selectedPeriod+"&displayProperty=NAME";
                }else{
                    var lastUrl="https://dhis.moh.go.tz/api/analytics.json?dimension=dx:TRoamv0YPt3;WAdaCligbNP;ykShMtNgDB1;XjbKrjgOFMp;QiA9L6tNHFy;yqA1CfsfBHQ;ovRcOHNO7qZ;m1PpRCnZF4l;JeIe5FgaGTX;aEcdPpCOi3k;VSXdXdsSUd3;PmSZNZHac3t;TdxVgoa08tn;F99dNfvn18N;s4zyCyJ7EjQ;OLWz8aiTGYd;kLI4iGDbN3p;vVRVLjgU10c;DPLR0aQemYC&dimension=ou:LEVEL-3;"+$scope.selectedOrgUnit+"&filter=pe:"+$scope.selectedPeriod+"&displayProperty=NAME";
                }
                $http.get(lastUrl).success(function(dataTable){
                    var generalArray=[];
                    var underOne="ANC 1st Visit Before 12 weeks rate";
                    var undertwo="Hudhurio la Kwanza ANC Ujauzito chini ya Wiki 12";
                    var underpop="Idadi ya Watu";
                    var underthree="Antenatal care coverage";
                    var underfour="ANC 4th visits Coverage";
                    var underANC="Wajawazito Hudhurio la nne";
                    var underDe="ANC de-worming rate";
                    var underMeb="Wajawazito Waliopewa Dawa ya minyoo (Mebendazole / Albendazole )";
                    var underCov="ANC Coverage for Women of Under 20 years";
                    var underSy="ANC Syphilis Prevalance";
                    var underSyP="Wajawazito Wenye Maambukizi ya Kaswende";
                    var underSyT="Wajawazito Waliopima Kaswende";
                    var underHIV="ANC HIV prevalence (15-24 years)";
                    var underHIVTest="Waliokutwa na Maambukizi ya VVU-Umri Chini ya Miaka 25";
                    var underHIVTestDone="Wajawazito waliopimwa VVU kipimo cha kwanza chini ya umri wa miaka 25";
                    var underHIVTestRate="Health Facility Delivery Rate";
                    var underHIVTestDev="Waliojifungulia kituoni";
                    var underHIVTestDevS="Deliveries by skilled attendants";
                    var underHIVTestDevP="Waliozalishwa na Watoa Huduma Wenye Ujuzi";
                    $scope.arrayed=[{'underOne':'ANC 1st Visit Before 12 weeks rate','undertwo':'ANC First Visit Attendances','underpop':'Population',
                        'underthree':'Antenatal care coverage','underfour':'ANC 4th Visit Coverage',
                        'underANC': 'ANC 4th Visit','underDe':'ANC de-worming rate','underMeb':'ANC mebendazole tablets given',
                        'underCov':'ANC Coverage for Women of Under 20 years','underSy':'ANC Syphilis Prevalance',
                        'underSyP':'ANC Syphilis Positive','underSyT':'ANC Syphilis Tested','underHIV':'ANC HIV prevalence (15-24 years)',
                        'underHIVTest':'ANC HIV tests positive (15-24 years)','underHIVTestDone':'ANC HIV test done','underHIVTestRate':'Health Facility Delivery Rate',
                        'underHIVTestDev':'Deliveries at health facilities','underHIVTestDevS':'Deliveries by skilled attendants',
                        'underHIVTestDevP':'Deliveries by skilled personnel'
                    }];
                    angular.forEach(dataTable.metaData.ou,function(region){
                        generalArray.push({"orgUnit":dataTable.metaData.names[region],underOne:ogUnitsObjectConstruct(underOne,dataTable,dataTable.rows,region),
                            undertwo:undertwoObject(undertwo,dataTable,dataTable.rows,region),underpop:underpopObject(underpop,dataTable,dataTable.rows,region),
                            underthree:underthreeObject(underthree,dataTable,dataTable.rows,region),underfour:underfourObject(underfour,dataTable,dataTable.rows,region),
                            underANC:underANCObject(underANC,dataTable,dataTable.rows,region),
                            underDe:underDeObject(underDe,dataTable,dataTable.rows,region),underMeb:underMebObject(underMeb,dataTable,dataTable.rows,region),
                            underCov:underCovObject(underCov,dataTable,dataTable.rows,region),underSy:underSyObject(underSy,dataTable,dataTable.rows,region),
                            underSyP:underSyPObject(underSyP,dataTable,dataTable.rows,region),underSyT:underSyTObject(underSyT,dataTable,dataTable.rows,region),
                            underHIV:underHIVObject(underHIV,dataTable,dataTable.rows,region),underHIVTest:underHIVTestObject(underHIVTest,dataTable,dataTable.rows,region),
                            underHIVTestDone:underHIVTestDoneObject(underHIVTestDone,dataTable,dataTable.rows,region),underHIVTestRate:underHIVTestRateObject(underHIVTestRate,dataTable,dataTable.rows,region),
                            underHIVTestDev:underHIVTestDevObject(underHIVTestDev,dataTable,dataTable.rows,region),underHIVTestDevS:underHIVTestDevSObject(underHIVTestDevS,dataTable,dataTable.rows,region),
                            underHIVTestDevP:underHIVTestDevPObject(underHIVTestDevP,dataTable,dataTable.rows,region)
                        });

                    });
                    $scope.loadingImage=false;
                    $scope.tableContent=generalArray;
                    console.log($scope.tableContent);
                    //},2000);
                }).error(function(error){
                    //$scope.loadingImage=false;
                    $scope.authenticationFailed=error;
                    console.log($scope.authenticationFailed);
                });
            });

        }
        $scope.downloadExcelMaternalTotal = function(){
            var base = "https://dhis.moh.go.tz/";
            $.post( base + "dhis-web-commons-security/login.action?authOnly=true", {
                j_username: "portal", j_password: "Portal123"
            },function(){
                if($scope.selectedOrgUnit == "m0frOspS7JY"){
                    var lastUrl="https://dhis.moh.go.tz/api/analytics.csv?dimension=dx:i47jm4Pkkq6;vfaY7k6TINl;tit1C1VPIV7;aw1jQ1tJTmE&dimension=ou:LEVEL-2;m0frOspS7JY&filter=pe:"+$scope.selectedPeriod+"&displayProperty=NAME&tableLayout=true&columns=dx&rows=ou";
                }else{
                    var lastUrl="https://dhis.moh.go.tz/api/analytics.csv?dimension=dx:i47jm4Pkkq6;vfaY7k6TINl;tit1C1VPIV7;aw1jQ1tJTmE&dimension=ou:LEVEL-3;"+$scope.selectedOrgUnit+"&filter=pe:"+$scope.selectedPeriod+"&displayProperty=NAME&tableLayout=true&columns=dx&rows=ou";
                }
                $http.get(lastUrl,{'Content-Type': 'application/csv;charset=UTF-8'}).success(function(data){
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
                portalService.prepareSeries(value,value.chart);
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
var underpopObject=function(underpop,ObjectNames,ObectData,orgUnits){
    var num='';
    angular.forEach(ObectData,function(value) {
        if(value[1]==orgUnits) {
            if (ObjectNames.metaData.names[value[0]].indexOf(underpop) >= 0) {
                num = value[2];
            }
        }
    });
    return num;
}

var underANCObject=function(underANC,ObjectNames,ObectData,orgUnits){
    var num='';
    angular.forEach(ObectData,function(value) {
        if(value[1]==orgUnits) {
            if (ObjectNames.metaData.names[value[0]].indexOf(underANC) >= 0) {
                num = value[2];
            }
        }
    });
    return num;
}
var underDeObject=function(underDe,ObjectNames,ObectData,orgUnits){
    var num='';
    angular.forEach(ObectData,function(value) {
        if(value[1]==orgUnits) {
            if (ObjectNames.metaData.names[value[0]].indexOf(underDe) >= 0) {
                num = value[2];
            }
        }
    });
    return num;
}
var underMebObject=function(underMeb,ObjectNames,ObectData,orgUnits){
    var num='';
    angular.forEach(ObectData,function(value) {
        if(value[1]==orgUnits) {
            if (ObjectNames.metaData.names[value[0]].indexOf(underMeb) >= 0) {
                num = value[2];
            }
        }
    });
    return num;
}
var underCovObject=function(underCov,ObjectNames,ObectData,orgUnits){
    var num='';
    angular.forEach(ObectData,function(value) {
        if(value[1]==orgUnits) {
            if (ObjectNames.metaData.names[value[0]].indexOf(underCov) >= 0) {
                num = value[2];
            }
        }
    });
    return num;
}
var underSyObject=function(underSy,ObjectNames,ObectData,orgUnits){
    var num='';
    angular.forEach(ObectData,function(value) {
        if(value[1]==orgUnits) {
            if (ObjectNames.metaData.names[value[0]].indexOf(underSy) >= 0) {
                num = value[2];
            }
        }
    });
    return num;
}
var underSyPObject=function(underSyP,ObjectNames,ObectData,orgUnits){
    var num='';
    angular.forEach(ObectData,function(value) {
        if(value[1]==orgUnits) {
            if (ObjectNames.metaData.names[value[0]].indexOf(underSyP) >= 0) {
                num = value[2];
            }
        }
    });
    return num;
}
var underSyTObject=function(underSyT,ObjectNames,ObectData,orgUnits){
    var num='';
    angular.forEach(ObectData,function(value) {
        if(value[1]==orgUnits) {
            if (ObjectNames.metaData.names[value[0]].indexOf(underSyT) >= 0) {
                num = value[2];
            }
        }
    });
    return num;
}
var underHIVObject=function(underHIV,ObjectNames,ObectData,orgUnits){
    var num='';
    angular.forEach(ObectData,function(value) {
        if(value[1]==orgUnits) {
            if (ObjectNames.metaData.names[value[0]].indexOf(underHIV) >= 0) {
                num = value[2];
            }
        }
    });
    return num;
}
var underHIVTestObject=function(underHIVTest,ObjectNames,ObectData,orgUnits){
    var num='';
    angular.forEach(ObectData,function(value) {
        if(value[1]==orgUnits) {
            if (ObjectNames.metaData.names[value[0]].indexOf(underHIVTest) >= 0) {
                num = value[2];
            }
        }
    });
    return num;
}
var underHIVTestDoneObject=function(underHIVTestDone,ObjectNames,ObectData,orgUnits){
    var num='';
    angular.forEach(ObectData,function(value) {
        if(value[1]==orgUnits) {
            if (ObjectNames.metaData.names[value[0]].indexOf(underHIVTestDone) >= 0) {
                num = value[2];
            }
        }
    });
    return num;
}
var underHIVTestRateObject=function(underHIVTestRate,ObjectNames,ObectData,orgUnits){
    var num='';
    angular.forEach(ObectData,function(value) {
        if(value[1]==orgUnits) {
            if (ObjectNames.metaData.names[value[0]].indexOf(underHIVTestRate) >= 0) {
                num = value[2];
            }
        }
    });
    return num;
}
var underHIVTestDevObject=function(underHIVTestDev,ObjectNames,ObectData,orgUnits){
    var num='';
    angular.forEach(ObectData,function(value) {
        if(value[1]==orgUnits) {
            if (ObjectNames.metaData.names[value[0]].indexOf(underHIVTestDev) >= 0) {
                num = value[2];
            }
        }
    });
    return num;
}
var underHIVTestDevSObject=function(underHIVTestDevS,ObjectNames,ObectData,orgUnits){
    var num='';
    angular.forEach(ObectData,function(value) {
        if(value[1]==orgUnits) {
            if (ObjectNames.metaData.names[value[0]].indexOf(underHIVTestDevS) >= 0) {
                num = value[2];
            }
        }
    });
    return num;
}
var underHIVTestDevPObject=function(underHIVTestDevP,ObjectNames,ObectData,orgUnits){
    var num='';
    angular.forEach(ObectData,function(value) {
        if(value[1]==orgUnits) {
            if (ObjectNames.metaData.names[value[0]].indexOf(underHIVTestDevP) >= 0) {
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