/**
 * Created by kelvin on 1/14/16.
 */
/**
 * Created by kelvin on 1/14/16.
 */
/**
 * Created by kelvin on 1/14/16.
 */
/**
 * Created by kelvin on 1/11/16.
 */
angular.module("hmisPortal")
    .config(function($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    })
    .controller("survilienceCtrl",function ($rootScope,$scope,$http,$location,$timeout,olData,olHelpers,shared,portalService,FPManager) {
        $scope.geographicalZones = {"name":"FP Geographical Zones","id":"eVyUn5tE93t","organisationUnitGroups":[{"name":"Southern Highlands Zone","id":"kcE3vG4Eq3Q","organisationUnits":[{"name":"Katavi Region","id":"DWSo42hunXH","children":[{"name":"Mpanda Town Council","id":"jupsOTyKi1W"},{"name":"Mpanda District Council","id":"aVLidCZ2RYk"},{"name":"Mlele District Council","id":"cjlkhW8VMDO"},{"name":"Nsimbo District Council","id":"PKl52zU7vuH"}]},{"name":"Iringa Region","id":"sWOWPBvwNY2","children":[{"name":"Mafinga Town Council","id":"chzBato6xed"},{"name":"Iringa District Council","id":"tcZz4Bh4mqc"},{"name":"Kilolo District Council","id":"xBWOfftpkLT"},{"name":"Mufindi District Council","id":"ppnbxB0TxjG"},{"name":"Iringa Municipal Council","id":"vo788oc0NEn"}]},{"name":"Rukwa Region","id":"vAtZ8a924Lx","children":[{"name":"Sumbawanga District Council","id":"cb9rqgLXFeh"},{"name":"Sumbawanga Municipal Council","id":"cZMveFzVrXh"},{"name":"Nkasi District Council","id":"iEIdCVxSJct"},{"name":"Kalambo District Council","id":"QeMjl7Ld0Vj"}]},{"name":"Njombe Region","id":"qarQhOt2OEh","children":[{"name":"Wanging'ombe District Council","id":"m4ow47nd3DC"},{"name":"Makambako Town Council","id":"cirtJ7KuNU0"},{"name":"Makete District Council","id":"NzvekEmEzUG"},{"name":"Njombe Town Council","id":"QUTWca9YxNb"},{"name":"Njombe District Council","id":"GOmwoDIGL98"},{"name":"Ludewa District Council","id":"aa5sxEFiAwN"}]},{"name":"Mbeya Region","id":"A3b5mw8DJYC","children":[{"name":"Mbarali District Council","id":"AvfNRAIsvhg"},{"name":"Momba District Council","id":"d07Wtk7brGz"},{"name":"Chunya District Council","id":"L9scGbK6d61"},{"name":"Rungwe District Council","id":"dPzNEI2Cxqj"},{"name":"Tunduma Town Council","id":"fqlNpTvqMw4"},{"name":"Mbeya District Council","id":"N5FKtARi6dB"},{"name":"Ileje District Council","id":"wsCWwNbLJNY"},{"name":"Mbozi District Council","id":"aouUIozrc7I"},{"name":"Mbeya City Council","id":"e3ATlebHNrD"},{"name":"Kyela District Council","id":"dWfRpHKykpk"},{"name":"Busokelo District Council","id":"xVzeWrXHf81"}]}]},{"name":"Northern Zone","id":"nvKJnetaMxk","organisationUnits":[{"name":"Tanga Region","id":"vU0Qt1A5IDz","children":[{"name":"Bumbuli District Council","id":"gu92DYtO3ii"},{"name":"Pangani District Council","id":"rQS2cX4JH88"},{"name":"Lushoto District Council","id":"ilY7TEjviqa"},{"name":"Handeni District Council","id":"DkxlFk8MuM7"},{"name":"Korogwe District Council","id":"QBC1po2JaJW"},{"name":"Mkinga District Council","id":"B9idcF4fOIW"},{"name":"Muheza District Council","id":"H2LvCkw2bCO"},{"name":"Kilindi District Council","id":"mKI72g04l0D"},{"name":"Korogwe Town Council","id":"qHJkyM0bG8U"},{"name":"Tanga City Council","id":"ySuyuvNNFp8"}]},{"name":"Arusha Region","id":"YtVMnut7Foe","children":[{"name":"Longido District Council","id":"aQEZnk4RzKv"},{"name":"Karatu District Council","id":"QKEr8DFutO8"},{"name":"Arusha City Council","id":"lgZ6HfZaj3f"},{"name":"Ngorongoro District Council","id":"PHWaJvzTmL8"},{"name":"Meru District Council","id":"uafqZbOYpVL"},{"name":"Arusha District Council","id":"zHa2ohFrpPM"},{"name":"Monduli District Council","id":"D21VsjNL2LB"}]}]},{"name":"Central Zone","id":"gzWRK9qFFVp","organisationUnits":[{"name":"Singida Region","id":"LGTVRhKSn1V","children":[{"name":"Ikungi District Council","id":"dFCrIa5paz7"},{"name":"Singida Municipal Council","id":"V60DkMrlQ5Q"},{"name":"Singida District Council","id":"RHLUbsrsFoE"},{"name":"Manyoni District Council","id":"uHp3aLKA6Tn"},{"name":"Iramba District Council","id":"tNFOa31xGhu"},{"name":"Mkalama District Council","id":"Qyg5jjxGeQD"}]},{"name":"Manyara Region","id":"qg5ySBw9X5l","children":[{"name":"Babati Town Council","id":"cnsiTXSJqqF"},{"name":"Hanang District Council","id":"xRx7W86ElUH"},{"name":"Babati District Council","id":"L5AfyN2zxns"},{"name":"Kiteto District Council","id":"P1TuGaaZ981"},{"name":"Mbulu District Council","id":"C96DDKK03pu"},{"name":"Simanjiro District Council","id":"A54bflEH57w"}]},{"name":"Dodoma Region","id":"Cpd5l15XxwA","children":[{"name":"Dodoma Municipal Council","id":"OzGGHqXQn5p"},{"name":"Chamwino District Council","id":"yiR1QdOwPqP"},{"name":"Chemba District Council","id":"Fez1Dp8bXSk"},{"name":"Mpwapwa District Council","id":"P5H056daq2I"},{"name":"Kondoa District Council","id":"yTTjcYh4xqa"},{"name":"Kongwa District Council","id":"DTc1rxSmlde"},{"name":"Bahi District Council","id":"Ak1TMj0oYc7"}]}]},{"name":"Southern Zone","id":"hiqGDmNAFJz","organisationUnits":[{"name":"Mtwara Region","id":"bN5q5k5DgLA","children":[{"name":"Mtwara District Council","id":"xOJxkz079Ek"},{"name":"Tandahimba District Council","id":"gOcZSwBmijY"},{"name":"Masasi Town Council","id":"tLzrq5IZ23W"},{"name":"Nanyumbu District Council","id":"PvqxGEssig9"},{"name":"Newala District Council","id":"IYqT1Xik8Bj"},{"name":"Masasi District Council","id":"rrHtwyYjprs"},{"name":"Mtwara Municipal Council","id":"PHGm198Hcil"}]},{"name":"Lindi Region","id":"VMgrQWSVIYn","children":[{"name":"Lindi District Council","id":"sjKfO239rjD"},{"name":"Nachingwea District Council","id":"W884lMlfpca"},{"name":"Liwale District Council","id":"ZszYGa2Vnyc"},{"name":"Lindi Municipal Council","id":"aiZstwpkrny"},{"name":"Kilwa District Council","id":"dGtH1WiNUrP"},{"name":"Ruangwa District Council","id":"OOplITY83ud"}]}]},{"name":"Eastern Zone","id":"gb4r7CSrT7U","organisationUnits":[{"name":"Dar Es Salaam Region","id":"acZHYslyJLt","children":[{"name":"Ilala Municipal Council","id":"xe93MrFXOYV"},{"name":"Temeke Municipal Council","id":"HIOQoi1aeL8"},{"name":"Kinondoni Municipal Council","id":"ts6eEeUjcfO"}]},{"name":"Morogoro Region","id":"Sj50oz9EHvD","children":[{"name":"Morogoro Municipal Council","id":"nUFAmN93pH4"},{"name":"Kilosa District Council","id":"GbVBjR8A7aK"},{"name":"Mvomero District Council","id":"BVBmQDCexxG"},{"name":"Morogoro District Council","id":"G2obPNftMUt"},{"name":"Ulanga District Council","id":"Le7ysFRJrMk"},{"name":"Kilombero District Council","id":"oMao5qA3DBy"},{"name":"Gairo District Council","id":"yh0b4OAgg8z"}]},{"name":"Pwani Region","id":"yyW17iCz9As","children":[{"name":"Bagamoyo District Council","id":"uPphu8kRXoZ"},{"name":"Rufiji District Council","id":"gncV3iPt6Sk"},{"name":"Mkuranga District Council","id":"Srvx9L1LGZM"},{"name":"Kisarawe District Council","id":"SnczTnCrk6d"},{"name":"Kibaha Town Council","id":"QekURU8eIU0"},{"name":"Mafia District Council","id":"GI57B0uNPOX"},{"name":"Kibaha District Council","id":"N8oGVhuoUcK"}]}]},{"name":"Western Zone","id":"zITJeBfrJ4J","organisationUnits":[{"name":"Kigoma Region","id":"RD96nI1JXVV","children":[{"name":"Buhigwe District Council","id":"yPCs2xE66we"},{"name":"Kigoma Municipal Council","id":"dIiTyLaZAEb"},{"name":"Kasulu District Council","id":"zfwo4rq1XC3"},{"name":"Kasulu Town Council","id":"IfQ2Sjbfdme"},{"name":"Uvinza District Council","id":"dt0Q0NhyPty"},{"name":"Kigoma District Council","id":"lQOxGNRaklm"},{"name":"Kakonko District Council","id":"T3A9X81ABG3"},{"name":"Kibondo District Council","id":"duES2Gfgvpw"}]},{"name":"Tabora Region","id":"kZ6RlMnt2bp","children":[{"name":"Sikonge District Council","id":"mOqc3ajETpA"},{"name":"Nzega Town Council","id":"uvsgHtPzLSo"},{"name":"Kaliua District Council","id":"PEIzWSzWQ7S"},{"name":"Tabora Municipal Council","id":"Nc1C12TG69d"},{"name":"Nzega District Council","id":"WAwWjYYzdkS"},{"name":"Uyui District Council","id":"m2ux1UEElNB"},{"name":"Igunga District Council","id":"fogigwn9cW7"},{"name":"Urambo District Council","id":"K8HUKJUZ7aj"}]}]},{"name":"Lake Zone","id":"RRGOg1GyLsd","organisationUnits":[{"name":"Kilimanjaro Region","id":"lnOyHhoLzre","children":[{"name":"Same District Council","id":"WCTbfnMiNF3"},{"name":"Hai District Council","id":"MiLb81EwC7j"},{"name":"Moshi Municipal Council","id":"Y8sOGpb4AFE"},{"name":"Mwanga District Council","id":"OHu1VHzyA0x"},{"name":"Rombo District Council","id":"Hob4dzCAW2W"},{"name":"Siha District Council","id":"aMnC7MINXlM"},{"name":"Moshi District Council","id":"VMTJLxcFH9o"}]},{"name":"Geita Region","id":"MAL4cfZoFhJ","children":[{"name":"Geita District Council","id":"saOGTLvMX4F"},{"name":"Chato District Council","id":"IZAkMaffRh8"},{"name":"Bukombe District Council","id":"plSLZJGUHZb"},{"name":"Nyang'hwale District Council","id":"G9VxK1Dmkpc"},{"name":"Mbogwe District Council","id":"RCDM6DotMZw"},{"name":"Geita Town council","id":"fSZfOuCkmAb"}]},{"name":"Mwanza Region","id":"hAFRrgDK0fy","children":[{"name":"Ilemela Municipal Council","id":"et6lWc8GDHy"},{"name":"Kwimba District Council","id":"O8O3HQdJWHX"},{"name":"Magu District Council","id":"Kug5uWxs0mu"},{"name":"Sengerema District Council","id":"IGSrsG5I54W"},{"name":"Nyamagana Municipal Council","id":"f7UPzYMgzVH"},{"name":"Misungwi District Council","id":"jAI2fd8kK1z"},{"name":"Ukerewe District Council","id":"QE0OH5162nV"}]},{"name":"Simiyu Region","id":"IgTAEKMqKRe","children":[{"name":"Meatu District Council","id":"vJY7WRfb5Hc"},{"name":"Itilima District Council","id":"bDteRg6tH0A"},{"name":"Busega District Council","id":"I58Bh8dN2sO"},{"name":"Maswa District Council","id":"mbXn83McbCh"},{"name":"Bariadi District Council","id":"Q16E1rzDnVD"},{"name":"Bariadi Town Council","id":"Yb483pDzzWj"}]},{"name":"Mara Region","id":"vYT08q7Wo33","children":[{"name":"Bunda District Council","id":"ouZ5YpZ4T3a"},{"name":"Serengeti District Council","id":"X5MzEu84hUN"},{"name":"Rorya District Council","id":"bRz3nu8rSWS"},{"name":"Tarime District Council","id":"NzVLQOcSJJU"},{"name":"Butiama District Council","id":"btLScg6XCBN"},{"name":"Musoma Municipal Council","id":"bKA4yc2NUxA"},{"name":"Musoma District Council","id":"z4dfv9EOq3c"},{"name":"Tarime Town Council","id":"Qp6ocX9ESSa"}]},{"name":"Kagera Region","id":"Crkg9BoUo5w","children":[{"name":"Kyerwa District Council","id":"LdzOZ9hNTwH"},{"name":"Biharamulo District Council","id":"yz7jPBCDXlX"},{"name":"Ngara District Council","id":"XLrownkhsKI"},{"name":"Bukoba Municipal Council","id":"PM74xoecSpJ"},{"name":"Bukoba District Council","id":"LoPF5WqswyW"},{"name":"Missenyi District Council","id":"F8NIzb16wVU"},{"name":"Karagwe District Council","id":"YFPElmUhUok"},{"name":"Muleba District Council","id":"wIjscdPZF3N"}]},{"name":"Shinyanga Region","id":"EO3Ps3ny0Nr","children":[{"name":"Ushetu District Council","id":"WgQHWeMx6Zl"},{"name":"Msalala District Council","id":"vQvBfxn7Cjs"},{"name":"Shinyanga District Council","id":"FylvwNXCTAQ"},{"name":"Kishapu District Council","id":"kISvf8gGZMm"},{"name":"Shinyanga Municipal Council","id":"PF4defRibDi"},{"name":"Kahama Town Council","id":"AiyppObGUqI"}]}]}]};
        $scope.geoToUse = [];
        $scope.zones = "";
        angular.forEach($scope.geographicalZones.organisationUnitGroups,function(value){
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

        $scope.selectOnly1Or2 = function(item, selectedItems) {
            if (selectedItems  !== undefined && selectedItems.length >= 7) {
                return false;
            } else {
                return true;
            }
        };

        $scope.changeMethod = function(data){
            if(data == "all"){

            }else{
                $scope.updateTree();
            }
        };
        $scope.getSelectedValues = function(){
            if($scope.data.outOrganisationUnits.length === 0){
                alert("no orgunit selected")
            }else{
                var orgUnits = [];
                angular.forEach($scope.data.outOrganisationUnits,function(orgUnit){
                    var name = orgUnit.name;
                    if(name.indexOf("Zone") > -1){
                        var names = [];
                        angular.forEach(orgUnit.children,function(regions){
                            names.push(regions.id);
                        });
                        orgUnits.push({'name':orgUnit.name,'id':names.join(";")});
                    }else{
                        orgUnits.push({'name':orgUnit.name,'id':orgUnit.id});
                    }
                });

                var period = $scope.selectedPeriod;
                var method = "uid";
                var chartObject = angular.copy(portalService.chartObject);
                var chartObject1 = angular.copy(portalService.chartObject);
                var chartObject2 = angular.copy(portalService.chartObject);

                chartObject.loading = true;
                chartObject1.loading = true;
                chartObject2.loading = true;

                var url = portalService.base+"api/analytics.json?dimension=dx:cWMJ2HsNTtr;b6O7BaQ46R4;reywf66stpK&dimension=ou:"+FPManager.getUniqueOrgUnits($scope.data.outOrganisationUnits)+"&dimension=pe:201401;201402;201403;201404;201405;201406;201407;201408;201409;201410;201411;201412&displayProperty=NAME";
                var base = portalService.base;
                $.post( base + "dhis-web-commons-security/login.action?authOnly=true", {
                    j_username: "portal", j_password: "Portal123"
                },function(){
                    $http.get(url).success(function(data){
                        var period = ""
                        var orgUnits = $scope.prepareCategory('zones');
                        var periods = $scope.prepareCategory('month')



                        chartObject.title.text ="Clients Adopting FP Following MVA or D+C " +$scope.selectedPeriod;
                        chartObject1.title.text ="Clients Adopting FP in the Postpartum Period " +$scope.selectedPeriod;
                        chartObject2.title.text ="Clients Adopting HTC and FP " +$scope.selectedPeriod;
                        angular.forEach(periods, function (val) {
                            chartObject.xAxis.categories.push(val.name);
                            chartObject1.xAxis.categories.push(val.name);
                            chartObject2.xAxis.categories.push(val.name);
                        });

                        angular.forEach(orgUnits,function(yAxis){
                            var chartSeries = [];
                            var chartSeries1 = [];
                            var chartSeries2 = [];
                            angular.forEach(periods,function(xAxis){
                                var number = $scope.findValue(data.rows,yAxis.id,xAxis.id,'cWMJ2HsNTtr','percent');
                                var number1 = $scope.findValue(data.rows,yAxis.id,xAxis.id,'b6O7BaQ46R4','number');
                                var number2 = $scope.findValue(data.rows,yAxis.id,xAxis.id,'reywf66stpK','percent');
                                chartSeries.push(parseFloat(number));
                                chartSeries1.push(parseFloat(number1));
                                chartSeries2.push(parseFloat(number2));
                            });
                            chartObject.series.push({type: 'line', name: yAxis.name, data: chartSeries});
                            chartObject1.series.push({type: 'line', name: yAxis.name, data: chartSeries1});
                            chartObject2.series.push({type: 'line', name: yAxis.name, data: chartSeries2});
                        });
                        chartObject.loading = false;
                        chartObject1.loading = false;
                        chartObject2.loading = false;

                        $scope.chart = chartObject;
                        $scope.chart2 = chartObject1;
                        $scope.chart3 = chartObject2;

                    });

                });

            }

        };
        $scope.data.outOrganisationUnits = {};
        $scope.getSelectedValues();

        $scope.getMethodName = function(uid){
            angular.forEach()
        };

        $scope.findValue = function(arr,ou,pe,dx,type){

            var amount = 0;
            if((ou.indexOf(';') > -1)){

                var orgArr = ou.split(";");
                var i = 0;
                $.each(orgArr,function(c,j){
                    i++;
                    $.each(arr,function(k,v){
                        if( v[2] == pe){
                            if(v[0] == dx ){
                                if(v[1] == j ){
                                    amount += parseInt(v[3]);
                                }
                            }

                        }
                    });
                    if(type == 'percent'){
                        amount = (amount != 0)?parseInt(amount/i):0;
                    }

                });
            }else{
                $.each(arr,function(k,v){
                    if(v[0] == dx && v[1] == ou && v[2] == pe){
                        amount = v[3];
                    }
                });
            }


            return amount;
        }

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
                data.push({'name':'Nov '+per,'id':per+'11'});
                data.push({'name':'Dec '+per,'id':per+'12'});
            }if(type == 'methods'){
                data.push({'name':'client <20 Male Condoms','id':'W74wyMy1mp0'},
                    {'name':'client <20 Female Condoms','id':'p8cgxI3yPx8'},
                    {'name':'Oral Pills','id':'aSJKs4oPZAf'},
                    {'name':'Injectables','id':'LpkdcaLc4I9'},
                    {'name':'Implants','id':'p14JdJaG2aC'},
                    {'name':'IUCDs','id':'GvbkEo6sfSd'},
                    {'name':'Natural FP','id':'QRCRjFreECE'});
            }

            return data;
        };


    });





function preparePeriod(period){

    return ""+period+"01;"+period+"02;"+period+"03;"+period+"04;"+period+"05;"+period+"06;"+period+"07;"+period+"08;"+period+"09;"+period+"10;"+period+"11;"+period+"12;"+period+"Q1;"+period+"Q2;"+period+"Q3;"+period+"Q4";
}
