/**
 * Created by kelvin on 12/10/15.
 */
/**
 * Created by kelvin on 11/26/15.
 */

angular.module("hmisPortal")
    .config(function($httpProvider) {

    })
    .controller("clientMethodsCtrl",function ($rootScope,$scope,$http,portalService) {
        var url = "https://dhis.moh.go.tz/api/analytics.json?dimension=dx:GGpsoh0DX6T;IFxhP0O4k0W;JMmqv0tyVr7;Nt8M08bJKXl;OQpasUg1Tse;btKkJROB2gP;epPM7fO8CnH;mlfh4fgiFhd;pqpVKzE951Y&dimension=ou:LEVEL-2;m0frOspS7JY&dimension=pe:201501;201502;201503;201504;201505;201506;201507;201508;201509;201510;201511;201512;2015Q1;2015Q2;2015Q3;2015Q4&displayProperty=NAME";
        var geoZonesUrl = "https://dhis.moh.go.tz/api/organisationUnitGroupSets/eVyUn5tE93t.json?fields=id,name,organisationUnitGroups[id,name,organisationUnits[id,name]]";


        $scope.geographicalZones = {"name":"FP Geographical Zones","id":"eVyUn5tE93t","organisationUnitGroups":[{"name":"Southern Highlands Zone","id":"kcE3vG4Eq3Q","organisationUnits":[{"name":"Katavi Region","id":"DWSo42hunXH","children":[{"name":"Mpanda Town Council","id":"jupsOTyKi1W"},{"name":"Mpanda District Council","id":"aVLidCZ2RYk"},{"name":"Mlele District Council","id":"cjlkhW8VMDO"},{"name":"Nsimbo District Council","id":"PKl52zU7vuH"}]},{"name":"Iringa Region","id":"sWOWPBvwNY2","children":[{"name":"Mafinga Town Council","id":"chzBato6xed"},{"name":"Iringa District Council","id":"tcZz4Bh4mqc"},{"name":"Kilolo District Council","id":"xBWOfftpkLT"},{"name":"Mufindi District Council","id":"ppnbxB0TxjG"},{"name":"Iringa Municipal Council","id":"vo788oc0NEn"}]},{"name":"Rukwa Region","id":"vAtZ8a924Lx","children":[{"name":"Sumbawanga District Council","id":"cb9rqgLXFeh"},{"name":"Sumbawanga Municipal Council","id":"cZMveFzVrXh"},{"name":"Nkasi District Council","id":"iEIdCVxSJct"},{"name":"Kalambo District Council","id":"QeMjl7Ld0Vj"}]},{"name":"Njombe Region","id":"qarQhOt2OEh","children":[{"name":"Wanging'ombe District Council","id":"m4ow47nd3DC"},{"name":"Makambako Town Council","id":"cirtJ7KuNU0"},{"name":"Makete District Council","id":"NzvekEmEzUG"},{"name":"Njombe Town Council","id":"QUTWca9YxNb"},{"name":"Njombe District Council","id":"GOmwoDIGL98"},{"name":"Ludewa District Council","id":"aa5sxEFiAwN"}]},{"name":"Mbeya Region","id":"A3b5mw8DJYC","children":[{"name":"Mbarali District Council","id":"AvfNRAIsvhg"},{"name":"Momba District Council","id":"d07Wtk7brGz"},{"name":"Chunya District Council","id":"L9scGbK6d61"},{"name":"Rungwe District Council","id":"dPzNEI2Cxqj"},{"name":"Tunduma Town Council","id":"fqlNpTvqMw4"},{"name":"Mbeya District Council","id":"N5FKtARi6dB"},{"name":"Ileje District Council","id":"wsCWwNbLJNY"},{"name":"Mbozi District Council","id":"aouUIozrc7I"},{"name":"Mbeya City Council","id":"e3ATlebHNrD"},{"name":"Kyela District Council","id":"dWfRpHKykpk"},{"name":"Busokelo District Council","id":"xVzeWrXHf81"}]}]},{"name":"Northern Zone","id":"nvKJnetaMxk","organisationUnits":[{"name":"Tanga Region","id":"vU0Qt1A5IDz","children":[{"name":"Bumbuli District Council","id":"gu92DYtO3ii"},{"name":"Pangani District Council","id":"rQS2cX4JH88"},{"name":"Lushoto District Council","id":"ilY7TEjviqa"},{"name":"Handeni District Council","id":"DkxlFk8MuM7"},{"name":"Korogwe District Council","id":"QBC1po2JaJW"},{"name":"Mkinga District Council","id":"B9idcF4fOIW"},{"name":"Muheza District Council","id":"H2LvCkw2bCO"},{"name":"Kilindi District Council","id":"mKI72g04l0D"},{"name":"Korogwe Town Council","id":"qHJkyM0bG8U"},{"name":"Tanga City Council","id":"ySuyuvNNFp8"}]},{"name":"Arusha Region","id":"YtVMnut7Foe","children":[{"name":"Longido District Council","id":"aQEZnk4RzKv"},{"name":"Karatu District Council","id":"QKEr8DFutO8"},{"name":"Arusha City Council","id":"lgZ6HfZaj3f"},{"name":"Ngorongoro District Council","id":"PHWaJvzTmL8"},{"name":"Meru District Council","id":"uafqZbOYpVL"},{"name":"Arusha District Council","id":"zHa2ohFrpPM"},{"name":"Monduli District Council","id":"D21VsjNL2LB"}]}]},{"name":"Central Zone","id":"gzWRK9qFFVp","organisationUnits":[{"name":"Singida Region","id":"LGTVRhKSn1V","children":[{"name":"Ikungi District Council","id":"dFCrIa5paz7"},{"name":"Singida Municipal Council","id":"V60DkMrlQ5Q"},{"name":"Singida District Council","id":"RHLUbsrsFoE"},{"name":"Manyoni District Council","id":"uHp3aLKA6Tn"},{"name":"Iramba District Council","id":"tNFOa31xGhu"},{"name":"Mkalama District Council","id":"Qyg5jjxGeQD"}]},{"name":"Manyara Region","id":"qg5ySBw9X5l","children":[{"name":"Babati Town Council","id":"cnsiTXSJqqF"},{"name":"Hanang District Council","id":"xRx7W86ElUH"},{"name":"Babati District Council","id":"L5AfyN2zxns"},{"name":"Kiteto District Council","id":"P1TuGaaZ981"},{"name":"Mbulu District Council","id":"C96DDKK03pu"},{"name":"Simanjiro District Council","id":"A54bflEH57w"}]},{"name":"Dodoma Region","id":"Cpd5l15XxwA","children":[{"name":"Dodoma Municipal Council","id":"OzGGHqXQn5p"},{"name":"Chamwino District Council","id":"yiR1QdOwPqP"},{"name":"Chemba District Council","id":"Fez1Dp8bXSk"},{"name":"Mpwapwa District Council","id":"P5H056daq2I"},{"name":"Kondoa District Council","id":"yTTjcYh4xqa"},{"name":"Kongwa District Council","id":"DTc1rxSmlde"},{"name":"Bahi District Council","id":"Ak1TMj0oYc7"}]}]},{"name":"Southern Zone","id":"hiqGDmNAFJz","organisationUnits":[{"name":"Mtwara Region","id":"bN5q5k5DgLA","children":[{"name":"Mtwara District Council","id":"xOJxkz079Ek"},{"name":"Tandahimba District Council","id":"gOcZSwBmijY"},{"name":"Masasi Town Council","id":"tLzrq5IZ23W"},{"name":"Nanyumbu District Council","id":"PvqxGEssig9"},{"name":"Newala District Council","id":"IYqT1Xik8Bj"},{"name":"Masasi District Council","id":"rrHtwyYjprs"},{"name":"Mtwara Municipal Council","id":"PHGm198Hcil"}]},{"name":"Lindi Region","id":"VMgrQWSVIYn","children":[{"name":"Lindi District Council","id":"sjKfO239rjD"},{"name":"Nachingwea District Council","id":"W884lMlfpca"},{"name":"Liwale District Council","id":"ZszYGa2Vnyc"},{"name":"Lindi Municipal Council","id":"aiZstwpkrny"},{"name":"Kilwa District Council","id":"dGtH1WiNUrP"},{"name":"Ruangwa District Council","id":"OOplITY83ud"}]}]},{"name":"Eastern Zone","id":"gb4r7CSrT7U","organisationUnits":[{"name":"Dar Es Salaam Region","id":"acZHYslyJLt","children":[{"name":"Ilala Municipal Council","id":"xe93MrFXOYV"},{"name":"Temeke Municipal Council","id":"HIOQoi1aeL8"},{"name":"Kinondoni Municipal Council","id":"ts6eEeUjcfO"}]},{"name":"Morogoro Region","id":"Sj50oz9EHvD","children":[{"name":"Morogoro Municipal Council","id":"nUFAmN93pH4"},{"name":"Kilosa District Council","id":"GbVBjR8A7aK"},{"name":"Mvomero District Council","id":"BVBmQDCexxG"},{"name":"Morogoro District Council","id":"G2obPNftMUt"},{"name":"Ulanga District Council","id":"Le7ysFRJrMk"},{"name":"Kilombero District Council","id":"oMao5qA3DBy"},{"name":"Gairo District Council","id":"yh0b4OAgg8z"}]},{"name":"Pwani Region","id":"yyW17iCz9As","children":[{"name":"Bagamoyo District Council","id":"uPphu8kRXoZ"},{"name":"Rufiji District Council","id":"gncV3iPt6Sk"},{"name":"Mkuranga District Council","id":"Srvx9L1LGZM"},{"name":"Kisarawe District Council","id":"SnczTnCrk6d"},{"name":"Kibaha Town Council","id":"QekURU8eIU0"},{"name":"Mafia District Council","id":"GI57B0uNPOX"},{"name":"Kibaha District Council","id":"N8oGVhuoUcK"}]}]},{"name":"Western Zone","id":"zITJeBfrJ4J","organisationUnits":[{"name":"Kigoma Region","id":"RD96nI1JXVV","children":[{"name":"Buhigwe District Council","id":"yPCs2xE66we"},{"name":"Kigoma Municipal Council","id":"dIiTyLaZAEb"},{"name":"Kasulu District Council","id":"zfwo4rq1XC3"},{"name":"Kasulu Town Council","id":"IfQ2Sjbfdme"},{"name":"Uvinza District Council","id":"dt0Q0NhyPty"},{"name":"Kigoma District Council","id":"lQOxGNRaklm"},{"name":"Kakonko District Council","id":"T3A9X81ABG3"},{"name":"Kibondo District Council","id":"duES2Gfgvpw"}]},{"name":"Tabora Region","id":"kZ6RlMnt2bp","children":[{"name":"Sikonge District Council","id":"mOqc3ajETpA"},{"name":"Nzega Town Council","id":"uvsgHtPzLSo"},{"name":"Kaliua District Council","id":"PEIzWSzWQ7S"},{"name":"Tabora Municipal Council","id":"Nc1C12TG69d"},{"name":"Nzega District Council","id":"WAwWjYYzdkS"},{"name":"Uyui District Council","id":"m2ux1UEElNB"},{"name":"Igunga District Council","id":"fogigwn9cW7"},{"name":"Urambo District Council","id":"K8HUKJUZ7aj"}]}]},{"name":"Lake Zone","id":"RRGOg1GyLsd","organisationUnits":[{"name":"Kilimanjaro Region","id":"lnOyHhoLzre","children":[{"name":"Same District Council","id":"WCTbfnMiNF3"},{"name":"Hai District Council","id":"MiLb81EwC7j"},{"name":"Moshi Municipal Council","id":"Y8sOGpb4AFE"},{"name":"Mwanga District Council","id":"OHu1VHzyA0x"},{"name":"Rombo District Council","id":"Hob4dzCAW2W"},{"name":"Siha District Council","id":"aMnC7MINXlM"},{"name":"Moshi District Council","id":"VMTJLxcFH9o"}]},{"name":"Geita Region","id":"MAL4cfZoFhJ","children":[{"name":"Geita District Council","id":"saOGTLvMX4F"},{"name":"Chato District Council","id":"IZAkMaffRh8"},{"name":"Bukombe District Council","id":"plSLZJGUHZb"},{"name":"Nyang'hwale District Council","id":"G9VxK1Dmkpc"},{"name":"Mbogwe District Council","id":"RCDM6DotMZw"},{"name":"Geita Town council","id":"fSZfOuCkmAb"}]},{"name":"Mwanza Region","id":"hAFRrgDK0fy","children":[{"name":"Ilemela Municipal Council","id":"et6lWc8GDHy"},{"name":"Kwimba District Council","id":"O8O3HQdJWHX"},{"name":"Magu District Council","id":"Kug5uWxs0mu"},{"name":"Sengerema District Council","id":"IGSrsG5I54W"},{"name":"Nyamagana Municipal Council","id":"f7UPzYMgzVH"},{"name":"Misungwi District Council","id":"jAI2fd8kK1z"},{"name":"Ukerewe District Council","id":"QE0OH5162nV"}]},{"name":"Simiyu Region","id":"IgTAEKMqKRe","children":[{"name":"Meatu District Council","id":"vJY7WRfb5Hc"},{"name":"Itilima District Council","id":"bDteRg6tH0A"},{"name":"Busega District Council","id":"I58Bh8dN2sO"},{"name":"Maswa District Council","id":"mbXn83McbCh"},{"name":"Bariadi District Council","id":"Q16E1rzDnVD"},{"name":"Bariadi Town Council","id":"Yb483pDzzWj"}]},{"name":"Mara Region","id":"vYT08q7Wo33","children":[{"name":"Bunda District Council","id":"ouZ5YpZ4T3a"},{"name":"Serengeti District Council","id":"X5MzEu84hUN"},{"name":"Rorya District Council","id":"bRz3nu8rSWS"},{"name":"Tarime District Council","id":"NzVLQOcSJJU"},{"name":"Butiama District Council","id":"btLScg6XCBN"},{"name":"Musoma Municipal Council","id":"bKA4yc2NUxA"},{"name":"Musoma District Council","id":"z4dfv9EOq3c"},{"name":"Tarime Town Council","id":"Qp6ocX9ESSa"}]},{"name":"Kagera Region","id":"Crkg9BoUo5w","children":[{"name":"Kyerwa District Council","id":"LdzOZ9hNTwH"},{"name":"Biharamulo District Council","id":"yz7jPBCDXlX"},{"name":"Ngara District Council","id":"XLrownkhsKI"},{"name":"Bukoba Municipal Council","id":"PM74xoecSpJ"},{"name":"Bukoba District Council","id":"LoPF5WqswyW"},{"name":"Missenyi District Council","id":"F8NIzb16wVU"},{"name":"Karagwe District Council","id":"YFPElmUhUok"},{"name":"Muleba District Council","id":"wIjscdPZF3N"}]},{"name":"Shinyanga Region","id":"EO3Ps3ny0Nr","children":[{"name":"Ushetu District Council","id":"WgQHWeMx6Zl"},{"name":"Msalala District Council","id":"vQvBfxn7Cjs"},{"name":"Shinyanga District Council","id":"FylvwNXCTAQ"},{"name":"Kishapu District Council","id":"kISvf8gGZMm"},{"name":"Shinyanga Municipal Council","id":"PF4defRibDi"},{"name":"Kahama Town Council","id":"AiyppObGUqI"}]}]}]};
        $scope.geoToUse = [];
        $scope.zones = "";
        angular.forEach($scope.geographicalZones.organisationUnitGroups,function(value){
//            console.log(value.name)
            $scope.zones += value.id+";";
            $scope.geoToUse.push({name:value.name,id:value.id, ticked: true });
        });
        $scope.data = {};
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
                $scope.data.orgUnitTree1.push({ name:value.name,id:value.id, children:zoneRegions });
            });
            $scope.data.orgUnitTree.push({name:"Tanzania",id:'m0frOspS7JY',children:$scope.data.orgUnitTree1,selected:true});
        };
        $scope.updateTree();

        $scope.changeMethod = function(){
            $scope.currentOrgUnit = "m0frOspS7JY";
            angular.forEach($scope.geoToUse,function(value){
                value.ticked = true;
            });
//            $('#orgunitss option[value="m0frOspS7JY"]').prop('selected', true);
            $scope.firstClick();
        };

        $scope.changeZone = function(){
            $scope.zones = "";
            angular.forEach($scope.selectedRegions,function(value){
                $scope.zones += value.id+";";
            })
            $scope.firstClick();
        };

        $scope.selectedMethod = 'all';
        $scope.selectedPeriod = '2014';
        $scope.data.chartType = 'column';
        $scope.displayTable = false;
        $scope.currentOrgUnit = "m0frOspS7JY";
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

        $scope.FPmethods = [
            {'name':'Male Condoms','uid':'JMmqv0tyVr7'},
            {'name':'Female Condoms','uid':'Nt8M08bJKXl'},
            {'name':'Oral Pills','uid':'IFxhP0O4k0W'},
            {'name':'Injectables','uid':'epPM7fO8CnH'},
            {'name':'Implants','uid':'pqpVKzE951Y'},
            {'name':'IUCDs','uid':'OQpasUg1Tse'},
            {'name':'NSV','uid':'btKkJROB2gP'},
            {'name':'Min Lap','uid':'mlfh4fgiFhd'},
            {'name':'NSV','uid':'btKkJROB2gP'},
            {'name':'Min Lap','uid':'mlfh4fgiFhd'},
            {'name':'All Clients','uid':'jvwTTzpWBD0'},
            {'name':'Natural FP','uid':'GGpsoh0DX6T'},
            {'name':'Eastern Zone','uid':'gb4r7CSrT7U'},
            {'name':'Lake Zone','uid':'RRGOg1GyLsd'},
            {'name':'Northern Zone','uid':'nvKJnetaMxk'},
            {'name':'Southern Highlands Zone','uid':'kcE3vG4Eq3Q'},
            {'name':'Southern Zone','uid':'hiqGDmNAFJz'},
            {'name':'Western Zone','uid':'zITJeBfrJ4J'},
            {'name':'Central Zone','uid':'gzWRK9qFFVp'},
            {'name':'MOH Tanzania','uid':'m0frOspS7JY'}
        ];

        $scope.methods = [
            {'name':'Male Condoms','uid':'JMmqv0tyVr7'},
            {'name':'Female Condoms','uid':'Nt8M08bJKXl'},
            {'name':'Oral Pills','uid':'IFxhP0O4k0W'},
            {'name':'Injectables','uid':'epPM7fO8CnH'},
            {'name':'Implants','uid':'pqpVKzE951Y'},
            {'name':'IUCDs','uid':'OQpasUg1Tse'},
            {'name':'NSV','uid':'btKkJROB2gP'},
            {'name':'Min Lap','uid':'mlfh4fgiFhd'},
            {'name':'NSV','uid':'btKkJROB2gP'},
            {'name':'Min Lap','uid':'mlfh4fgiFhd'}
        ];



        $scope.fpCards = [
            //{
            //    title:'Total Clients of [IMPLANTS]',
            //    description:'Total Clients of [IMPLANTS]',
            //    cardClass:"col s12 m12",
            //    data:[{'name':'All Clients','id':'jvwTTzpWBD0'}],
            //    data1:$scope.currentOrgUnit,
            //    category:'zones',
            //    category1:'zones',
            //    icons:angular.copy(portalService.minimalIcons),
            //    displayTable:false,
            //    displayMap:false,
            //    chart:'bar',
            //    visible:'consumption by method',
            //    chartObject:angular.copy(portalService.chartObject)
            //
            //},{
            //    title:'Total Clients Quarterly',
            //    description:'Total Clients Quarterly',
            //    cardClass:"col s12 m6",
            //    data:$scope.methods,
            //    category:'quarter',
            //    category1:'quarter',
            //    icons:angular.copy(portalService.minimalIcons),
            //    displayTable:false,
            //    displayMap:false,
            //    chart:'line',
            //    visible:'consumption by method',
            //    chartObject:angular.copy(portalService.chartObject)
            //
            //},
            {
                title:'Clients by Method through Routine Facility-Based Service '+$scope.selectedPeriod,
                description:'Total Clients Monthly',
                cardClass:"col s12 m12",
                data:$scope.methods,
                category:'month',
                category1:'month',
                icons:angular.copy(portalService.minimalIcons),
                displayTable:false,
                displayMap:false,
                chart:'line',
                visible:'consumption by method',
                chartObject:angular.copy(portalService.chartObject)

            }];

        $scope.getSingleMethods = function(uid){
            var method = [];
            angular.forEach($scope.methods,function(value){
                if(value.id == uid){
                    method.push(value);
                }
            });
        };
        $scope.prepareSeries = function(cardObject,chart){
            cardObject.chartObject.loading = true;
            var base = "https://dhis.moh.go.tz/";
//            $.post( base + "dhis-web-commons-security/login.action?authOnly=true", {
//                j_username: "portal", j_password: "Portal123"
//            },function(){
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

            var peri = preparePeriod($scope.selectedPeriod);
            $scope.url = "https://dhis.moh.go.tz/api/analytics.json?dimension=dx:W74wyMy1mp0;p8cgxI3yPx8;aSJKs4oPZAf;LpkdcaLc4I9;p14JdJaG2aC;GvbkEo6sfSd;QRCRjFreECE;GGpsoh0DX6T;IFxhP0O4k0W;JMmqv0tyVr7;Nt8M08bJKXl;OQpasUg1Tse;btKkJROB2gP;epPM7fO8CnH;mlfh4fgiFhd;pqpVKzE951Y&dimension=ou:LEVEL-2;m0frOspS7JY&dimension=pe:201501;201502;201503;201504;201505;201506;201507;201508;201509;201510;201511;201512;2015Q1;2015Q2;2015Q3;2015Q4&displayProperty=NAME";
            var area = [];
            cardObject.chartObject.loading = true;
            var datass = '';

            if($scope.currentOrgUnit == "m0frOspS7JY"){
                if(cardObject.category1 == 'zones'){
                    cardObject.data = 'jvwTTzpWBD0';
                    cardObject.category = 'zones';
                }
            }else{
                if(cardObject.category1 == 'zones'){
                    cardObject.category = 'methods';
                    cardObject.data = $scope.currentOrgUnit;
                }

            }

            if($scope.selectedMethod == 'all'){
                if(cardObject.category1 == "month"){
                    cardObject.category = 'month';
                    cardObject.data =$scope.methods;
                }
                if(cardObject.category1 == "quarter"){
                    cardObject.category = 'quarter';
                    cardObject.data = $scope.methods;
                }
                if(cardObject.category1 == 'zones'){
                    cardObject.data = [{'name':'All Clients','id':'jvwTTzpWBD0'}];
                }
            }else{
                if(cardObject.category1 == "month"){
                    cardObject.category = 'month';
                    cardObject.data = $scope.prepareCategory('zones');
                }
                if(cardObject.category1 == "quarter"){
                    cardObject.category = 'quarter';
                    cardObject.data = $scope.prepareCategory('zones');
                }
                if(cardObject.category1 == 'zones'){
                    cardObject.data = $scope.getSingleMethods($scope.selectedMethod);
                }
            }
            $http.get('data1.json').success(function(data){
                if(data.hasOwnProperty('metaData')){
                    var useThisData = $scope.prepareData(data,$scope.prepareCategory(cardObject.category),cardObject.category,cardObject);
                    angular.forEach(useThisData.regions,function(value){
                        area.push(value.name);
                    });
                    $scope.subCategory = useThisData.elements;
                    cardObject.chartObject.xAxis.categories = area;

                    $scope.normalseries = [];
                    if($scope.data.chartType == "pie"){
                        delete cardObject.chartObject.chart;
                        var serie = [];
                        angular.forEach(useThisData.elements,function(value){
                            angular.forEach(useThisData.regions,function(val){
                                var number = $scope.getDataFromUrl(data.rows,val.id,cardObject.category,value.uid);

                                serie.push({name: value.name+" - "+ val.name , y: parseInt(number)})
                            });
                        });
                        $scope.normalseries.push({type: chart, name:$scope.UsedName , data: serie,showInLegend: true,
                            dataLabels: {
                                enabled: false
                            } })
                        cardObject.chartObject.series = $scope.normalseries;
                    }
                    else if(chart == "combined"){
                        delete cardObject.chartObject.chart;
                        var serie1 = [];
                        angular.forEach(useThisData.elements,function(value){
                            var serie = [];

                            angular.forEach(useThisData.regions,function(val){
                                var number = $scope.getDataFromUrl(data.rows,val.id,cardObject.category,value.uid);
                                serie.push(parseInt(number));
                                serie1.push({name: value.name+" - "+ val.name , y: parseInt(number) })
                            });
                            $scope.normalseries.push({type: 'column', name: value.name, data: serie});
                            $scope.normalseries.push({type: 'spline', name: value.name, data: serie});
                        });
                        $scope.normalseries.push({type: 'pie', name: $scope.UsedName, data: serie1,center: [100, 80],size: 150,showInLegend: false,
                            dataLabels: {
                                enabled: false
                            }})
                        cardObject.chartObject.series = $scope.normalseries;
                    }
                    else if(chart == 'table'){
                        cardObject.table ={}
                        cardObject.table.headers = [];
                        cardObject.table.colums =[];
                        angular.forEach(useThisData.elements,function(value){
                            var serie = [];
                            cardObject.table.headers.push(value.name);
                        });
                        angular.forEach(useThisData.regions,function(val){
                            var seri = [];
                            angular.forEach(useThisData.elements,function(value){
                                var number = $scope.getDataFromUrl(data.rows,val.id,cardObject.category,value.uid);
                                seri.push({name:value.name,value:parseInt(number)});
                            });
                            cardObject.table.colums.push({name:val.name,values:seri});
                        });
                    }
                    else{
                        delete cardObject.chartObject.chart;
                        angular.forEach(useThisData.elements,function(value){
                            var serie = [];
                            angular.forEach(useThisData.regions,function(val){
                                var number = $scope.getDataFromUrl(data.rows,val.id,cardObject.category,value.uid);
                                serie.push(number);
                            });
                            $scope.normalseries.push({type: chart, name: value.name, data: serie})
                        });
                        cardObject.chartObject.series = $scope.normalseries;
                    }
                    cardObject.chartObject.loading = false
                }else{
                    cardObject.chartObject.loading = false
                }

            });
//            });

        };

        $scope.prepareData = function(jsonObject,categories,type,card){
            var structure = {};
            var data = [];
            var elements = [];
            var arr = card.data;
            angular.forEach(arr,function(val){
                elements.push({'name':val.name,'uid':val.id})
            });
            angular.forEach(categories,function(region){
                data.push({'name':region.name,'id':region.id});
            });
            structure.regions = data;
            structure.elements = elements;

            return structure;
        };

        $scope.getDataFromUrl  = function(arr,ou,type,de){
            var num = 0;
            var k = 1;

            if(type == 'zones'){
                k =1
                num =0;
                var orgs = ou.substring(1, ou.length-1);
                var orgArr = orgs.split(";");
                $.each(orgArr,function(c,j){
                    $.each(arr,function(k,v){
                        if(v[1] == j && v[0] == de){
                            num += parseInt(v[3])
                        }
                    });
                });

            }if(type == 'quarter'){
                num =0;
                if($scope.currentOrgUnit == 'm0frOspS7JY'){
                    if($scope.selectedMethod == "all"){
                        $.each(arr,function(k,v){
                            if(v[2] == ou && v[0] == de){
                                num = num+parseInt(v[3])
                            }
                        });
                    }else{

                        var names= "";
                        angular.forEach($scope.geographicalZones.organisationUnitGroups,function(region){
                            if(region.id == de){
                                angular.forEach(region.organisationUnits,function(value){
                                    names += value.id+';';
                                });
                            }
                        });

                        var orgs = names.substring(1, names.length-1);
                        var orgArr = orgs.split(";");
                        $.each(orgArr,function(c,j){
                            $.each(arr,function(k,v){
                                if(v[2] == ou && v[1] == j && v[0] == $scope.selectedMethod){
                                    num = num+parseInt(v[3])
                                }
                            });
                        });

                    }
                }else{
                    var names= "";
                    angular.forEach($scope.geographicalZones.organisationUnitGroups,function(region){
                        if(region.id == $scope.currentOrgUnit){
                            angular.forEach(region.organisationUnits,function(value){
                                names += value.id+';';
                            });
                        }
                    });
                    var orgs = names.substring(1, names.length-1);
                    var orgArr = orgs.split(";");
                    $.each(orgArr,function(c,j){
                        $.each(arr,function(k,v){
                            if(v[1] == j && v[2] == ou && v[0] == de){
                                num = num+parseInt(v[3])
                            }
                        });
                    });
                }

            }if(type == 'month'){
                if($scope.currentOrgUnit == 'm0frOspS7JY'){
                    if($scope.selectedMethod == "all"){
                        $.each(arr,function(k,v){
                            if(v[2] == ou && v[0] == de){
                                num = num+parseInt(v[3])
                            }
                        });
                    }else{

                        var names= "";
                        angular.forEach($scope.geographicalZones.organisationUnitGroups,function(region){
                            if(region.id == de){
                                angular.forEach(region.organisationUnits,function(value){
                                    names += value.id+';';
                                });
                            }
                        });

                        var orgs = names.substring(1, names.length-1);
                        var orgArr = orgs.split(";");
                        $.each(orgArr,function(c,j){
                            $.each(arr,function(k,v){
                                if(v[2] == ou && v[1] == j && v[0] == $scope.selectedMethod){
                                    num = num+parseInt(v[3])
                                }
                            });
                        });

                    }
                }else{
                    var names= "";
                    angular.forEach($scope.geographicalZones.organisationUnitGroups,function(region){
                        if(region.id == $scope.currentOrgUnit){
                            angular.forEach(region.organisationUnits,function(value){
                                names += value.id+';';
                            });
                        }
                    });
                    var orgs = names.substring(1, names.length-1);
                    var orgArr = orgs.split(";");
                    $.each(orgArr,function(c,j){
                        $.each(arr,function(k,v){
                            if(v[1] == j && v[2] == ou && v[0] == de){
                                num = num+parseInt(v[3])
                            }
                        });
                    });
                }
            }if(type == 'methods'){

                num =0;
                var names= "";
                angular.forEach($scope.geographicalZones.organisationUnitGroups,function(region){

                    if(region.id == $scope.currentOrgUnit){
                        angular.forEach(region.organisationUnits,function(value){
                            names += value.id+';';
                        });
                    }
                });
                var orgs = names.substring(1, names.length-1);
                var orgArr = orgs.split(";");
                $.each(orgArr,function(c,j){
                    $.each(arr,function(k,v){
                        if(v[1] == j && v[0] == ou){
                            num += parseInt(v[3])
                        }
                    });
                });

            }

            return num;
        }

        $scope.prepareCategory = function(type){
            var data = [];
            var per = $scope.selectedPeriod;
            if(type == 'zones'){
                angular.forEach($scope.data.outOrganisationUnits,function(orgUnit){
                    var name = orgUnit.name;
                    if(name.indexOf("Zone") > -1){
                        var names = [];
                        angular.forEach(orgUnit.children,function(regions){
                            names.push(regions.id);
                        });
                        data.push({'name':orgUnit.name,'id':names.join(";")});
                    }else{
                        data.push({'name':orgUnit.name,'id':orgUnit.id});

                    }
                });
            }if(type == 'quarter'){
                data.push({'name':'Jan - Mar '+per,'id':per+'Q1'});
                data.push({'name':'Apr - Jun '+per,'id':per+'Q2'});
                data.push({'name':'Jul - Sep '+per,'id':per+'Q3'});
                data.push({'name':'Oct - Dec '+per,'id':per+'Q4'});
            }if(type == 'month'){
                data.push({'name':'Jan '+per,'id':per+'01'});
                data.push({'name':'Feb '+per,'id':per+'02'});
                data.push({'name':'Mar '+per,'id':per+'03'});
                data.push({'name':'Apr '+per,'id':per+'04'});
                data.push({'name':'May '+per,'id':per+'05'});
                data.push({'name':'Jun '+per,'id':per+'06'});
                data.push({'name':'Jul '+per,'id':per+'07'});
                data.push({'name':'Aug '+per,'id':per+'08'});
                data.push({'name':'Sep '+per,'id':per+'09'});
                data.push({'name':'Oct '+per,'id':per+'10'});
                data.push({'name':'Nov'+per,'id':per+'11'});
                data.push({'name':'Dec '+per,'id':per+'12'});
            }if(type == 'methods'){
                data.push({'name':'client <20 Male Condoms','id':'W74wyMy1mp0'},
                    {'name':'client <20 Female Condoms','id':'p8cgxI3yPx8'},
                    {'name':'Oral Pills','id':'aSJKs4oPZAf'},
                    {'name':'Injectables','id':'LpkdcaLc4I9'},
                    {'name':'Implants','id':'p14JdJaG2aC'},
                    {'name':'IUCDs','id':'GvbkEo6sfSd'},
                    {'name':'Natural FP','id':'QRCRjFreECE'});
            }if(type == 'method'){
                angular.forEach($scope.data.outOrganisationUnits,function(orgUnit){
                    var name = orgUnit.name;
                    if(name.indexOf("Zone") > -1){
                        var names = [];
                        angular.forEach(orgUnit.children,function(regions){
                            names.push(regions.id);
                        });
                        data.push({'name':orgUnit.name,'id':names.join(";")});
                    }else{
                        data.push({'name':orgUnit.name,'id':orgUnit.id});

                    }
                });
            }

            return data;
        };


        $rootScope.firstClick = function(){
            angular.forEach($scope.fpCards,function(value){
                $scope.prepareSeries(value,value.chart);
            });
        };
        $scope.firstClick();
    });

function preparePeriod(period){

    return ""+period+"01;"+period+"02;"+period+"03;"+period+"04;"+period+"05;"+period+"06;"+period+"07;"+period+"08;"+period+"09;"+period+"10;"+period+"11;"+period+"12;"+period+"Q1;"+period+"Q2;"+period+"Q3;"+period+"Q4";
}



