/**
 * Created by kelvin on 10/20/15.
 */

angular.module("hmisPortal")
    .config(function($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    })
    .controller("malariaCtrl",function ($rootScope,$scope,$http,$location,$timeout,olData,olHelpers,shared,portalService) {
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

        $scope.cards.malaria = [
            {
                title:'ANC IPT2 COVERAGE',
                description:'Maelezo ya ANC IPT2 COVERAGE',
                cardClass:"col s12 m6",
                data:'i47jm4Pkkq6',
                icons:portalService.icons,
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:portalService.chartObject
            },
            {
                title:'ANC MALARIA PREVELANCE',
                description:'Maelezo ya ANC MALARIA PREVELANCE',
                cardClass:"col m6 s12",
                cardSize:"medium",
                data:'vfaY7k6TINl',
                icons:portalService.icons,
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:portalService.chartObject

            },
            {
                title:'ANC Proportion  of pregnant women receiving ITN Voucher',
                description:'Maelezo ya ANC Proportion  of pregnant women receiving ITN Voucher',
                cardClass:"col m12 s12",
                data:'tit1C1VPIV7',
                icons:portalService.icons,
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:portalService.chartObject

            },
            {
                title:'Proportional of Malaria cases in OPD',
                description:'Proportional of Malaria cases in OPD',
                cardClass:"col m6 s12",
                data:'xrYmEc4LCCo',
                icons:portalService.icons,
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:portalService.chartObject

            },
            {
                title:'Proportional of Malaria cases in IPD',
                description:'Proportional of Malaria cases in OPD',
                cardClass:"col m6 s12",
                data:'CaPhxP3hIHD',
                icons:portalService.icons,
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:portalService.chartObject
            }
        ]


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
            $scope.loadingImage=true;
            var base = "https://dhis.moh.go.tz/";
            $.post( base + "dhis-web-commons-security/login.action?authOnly=true", {
                j_username: "portal", j_password: "Portal123"
            },function(){
            if($scope.selectedOrgUnit == "m0frOspS7JY"){
                var lastUrl="https://dhis.moh.go.tz/api/analytics.json?dimension=dx:Y6cNfApg9Kf;rB0DvqiPEVA;vfaY7k6TINl;tIs7rshvixe;qN1zFaX9mVe;i47jm4Pkkq6;tit1C1VPIV7;vYXCiIEJTwU;CaPhxP3hIHD;xrYmEc4LCCo&dimension=ou:LEVEL-2;m0frOspS7JY&filter=pe:"+$scope.selectedPeriod+"&displayProperty=NAME";
            }else{
                var lastUrl="https://dhis.moh.go.tz/api/analytics.json?dimension=dx:Y6cNfApg9Kf;rB0DvqiPEVA;vfaY7k6TINl;tIs7rshvixe;qN1zFaX9mVe;i47jm4Pkkq6;tit1C1VPIV7;vYXCiIEJTwU;CaPhxP3hIHD;xrYmEc4LCCo&dimension=ou:LEVEL-3;"+$scope.selectedOrgUnit+"&filter=pe:"+$scope.selectedPeriod+"&displayProperty=NAME";
            }
            $http.get(lastUrl).success(function(dataTable){
                //setTimeout(function(){
                var generalArray=[];
                var underOne="Wajawazito Maliopima Malaria";
                var undertwo="Waliogundulika Kuwa na Malaria";
                var underMaralia="ANC Malaria prevalence";
                var underthree="Wajawazito Waliopewa IPT2";
                var underfour="Jumla Hudhurio la Kwanza";
                var underIPT2="ANC IPT 2 coverage";
                var underITN="ANC Proportion of pregnant women receiving ITN Voucher";
                var underITNOne="Wajawazito Waliopewa Hati Punguzo za Vyandaruwa";
                var underIPD="NMCP Proportion of confirmed Malaria cases in IPD";
                var underOPD="NMCP Proportion of confirmed Malaria cases in OPD";
                $scope.arrayed=[{'underOne':'ANC Pregnant women tested for Malaria','undertwo':'ANC Pregnant wowmen having Malaria Positive after test','underMaralia':'ANC Malaria prevalence',
                    'underthree':'Pregnant women receiving two dose of SP','underfour':'ANC First Visit Attendances',
                    'underIPT2': 'ANC IPT 2 coverage','underITN':'ANC Proportion  of pregnant women receiving ITN Voucher','underITNOne':'pregnant women received ITN Voucher',
                    'underIPD':'Proportional of Malaria cases in  IPD','underOPD':'Proportional of Malaria cases in  OPD'
                }];
                angular.forEach(dataTable.metaData.ou,function(region){
                    generalArray.push({"orgUnit":dataTable.metaData.names[region],underOne:ogUnitsObjectConstruct(underOne,dataTable,dataTable.rows,region),
                        undertwo:undertwoObject(undertwo,dataTable,dataTable.rows,region),underMaralia:underMaraliaObject(underMaralia,dataTable,dataTable.rows,region),
                        underthree:underthreeObject(underthree,dataTable,dataTable.rows,region),underfour:underfourObject(underfour,dataTable,dataTable.rows,region),
                        underIPT2:underIPT2Object(underIPT2,dataTable,dataTable.rows,region),underITN:underITNObject(underITN,dataTable,dataTable.rows,region),
                        underITNOne:underITNOneObject(underITNOne,dataTable,dataTable.rows,region),underOPD:underOPDObject(underOPD,dataTable,dataTable.rows,region),
                        underIPD:underIPDObject(underIPD,dataTable,dataTable.rows,region)
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
        $scope.downloadExcelTotal = function(){
            var base = "https://dhis.moh.go.tz/";
            $.post( base + "dhis-web-commons-security/login.action?authOnly=true", {
                j_username: "portal", j_password: "Portal123"
            },function(){
                if($scope.selectedOrgUnit == "m0frOspS7JY"){
                    var lastUrl="https://dhis.moh.go.tz/api/analytics.csv?dimension=dx:Y6cNfApg9Kf;rB0DvqiPEVA;vfaY7k6TINl;tIs7rshvixe;qN1zFaX9mVe;i47jm4Pkkq6;tit1C1VPIV7;vYXCiIEJTwU;CaPhxP3hIHD;xrYmEc4LCCo&dimension=ou:LEVEL-2;m0frOspS7JY&filter=pe:"+$scope.selectedPeriod+"&displayProperty=NAME&tableLayout=true&columns=dx&rows=ou";
                    //var lastUrl="https://dhis.moh.go.tz/api/analytics.csv?dimension=dx:i47jm4Pkkq6;vfaY7k6TINl;tit1C1VPIV7;aw1jQ1tJTmE&dimension=ou:LEVEL-2;m0frOspS7JY&filter=pe:"+$scope.selectedPeriod+"&displayProperty=NAME";
                }else{
                    var lastUrl="https://dhis.moh.go.tz/api/analytics.csv?dimension=dx:Y6cNfApg9Kf;rB0DvqiPEVA;vfaY7k6TINl;tIs7rshvixe;qN1zFaX9mVe;i47jm4Pkkq6;tit1C1VPIV7;vYXCiIEJTwU;CaPhxP3hIHD;xrYmEc4LCCo&dimension=ou:LEVEL-3;"+$scope.selectedOrgUnit+"&filter=pe:"+$scope.selectedPeriod+"&displayProperty=NAME&tableLayout=true&columns=dx&rows=ou"
                    //var lastUrl="https://dhis.moh.go.tz/api/analytics.csv?dimension=dx:i47jm4Pkkq6;vfaY7k6TINl;tit1C1VPIV7;aw1jQ1tJTmE&dimension=ou:LEVEL-3;"+$scope.selectedOrgUnit+"&filter=pe:"+$scope.selectedPeriod+"&displayProperty=NAME";
                }
                $http.get(lastUrl,{'Content-Type': 'application/octet-stream'}).success(function(data){
                    var a = document.createElement('a');
                    var blob = new Blob([data]);
                    a.href = window.URL.createObjectURL(blob);
                    a.download = "data.xls";
                    a.click();
                }).error(function(error){
                    alert("Aunthentification Failed " +error);
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
            $http.get(url,{withCredentials: true, params : {
                j_username: "portal",
                j_password: "Portal123"

            }}).success(
                function(data) {
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
                                    var url1 = "https://dhis.moh.go.tz/api/analytics.json?dimension=dx:"+card.data+"&dimension=pe:"+$scope.thisyear+"&filter=ou:"+feature.getId()+"&displayProperty=NAME";
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

var underMaraliaObject=function(underMaralia,ObjectNames,ObectData,orgUnits){
    var num='';
    angular.forEach(ObectData,function(value) {
        if(value[1]==orgUnits) {
            if (ObjectNames.metaData.names[value[0]].indexOf(underMaralia) >= 0) {
                num = value[2];
            }
        }
    });
    return num;
}
var underITNObject=function(underITN,ObjectNames,ObectData,orgUnits){
    var num='';
    angular.forEach(ObectData,function(value) {
        if(value[1]==orgUnits) {
            if (ObjectNames.metaData.names[value[0]].indexOf(underITN) >= 0) {
                num = value[2];
            }
        }
    });
  return num;
}
var underIPT2Object=function(underIPT2,ObjectNames,ObectData,orgUnits){
    var num='';
    angular.forEach(ObectData,function(value) {
        if(value[1]==orgUnits) {
            if (ObjectNames.metaData.names[value[0]].indexOf(underIPT2) >= 0) {
                num = value[2];
            }
        }
    });
    return num;
}
var underITNOneObject=function(underITNOne,ObjectNames,ObectData,orgUnits){
    var num='';
    angular.forEach(ObectData,function(value) {
        if(value[1]==orgUnits) {
            if (ObjectNames.metaData.names[value[0]].indexOf(underITNOne) >= 0) {
                num = value[2];
            }
        }
    });
    return num;
}
var underOPDObject=function(underOPD,ObjectNames,ObectData,orgUnits){
    var num='';
    angular.forEach(ObectData,function(value) {
        if(value[1]==orgUnits) {
            if (ObjectNames.metaData.names[value[0]].indexOf(underOPD) >= 0) {
                num = value[2];
            }
        }
    });
    return num;
}
var underIPDObject=function(underIPD,ObjectNames,ObectData,orgUnits){
    var num='';
    angular.forEach(ObectData,function(value) {
        if(value[1]==orgUnits) {
            if (ObjectNames.metaData.names[value[0]].indexOf(underIPD) >= 0) {
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