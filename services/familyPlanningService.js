var FPServices = angular.module('hmisPortal');
FPServices.factory('FPManager',function($http,$q){
    var FPManager = {
        zones:{"name":"FP Geographical Zones","id":"eVyUn5tE93t","organisationUnitGroups":[{"name":"Southern Highlands Zone","id":"kcE3vG4Eq3Q","organisationUnits":[{"name":"Katavi Region","id":"DWSo42hunXH","children":[{"name":"Mpanda Town Council","id":"jupsOTyKi1W"},{"name":"Mpanda District Council","id":"aVLidCZ2RYk"},{"name":"Mlele District Council","id":"cjlkhW8VMDO"},{"name":"Nsimbo District Council","id":"PKl52zU7vuH"}]},{"name":"Iringa Region","id":"sWOWPBvwNY2","children":[{"name":"Mafinga Town Council","id":"chzBato6xed"},{"name":"Iringa District Council","id":"tcZz4Bh4mqc"},{"name":"Kilolo District Council","id":"xBWOfftpkLT"},{"name":"Mufindi District Council","id":"ppnbxB0TxjG"},{"name":"Iringa Municipal Council","id":"vo788oc0NEn"}]},{"name":"Rukwa Region","id":"vAtZ8a924Lx","children":[{"name":"Sumbawanga District Council","id":"cb9rqgLXFeh"},{"name":"Sumbawanga Municipal Council","id":"cZMveFzVrXh"},{"name":"Nkasi District Council","id":"iEIdCVxSJct"},{"name":"Kalambo District Council","id":"QeMjl7Ld0Vj"}]},{"name":"Njombe Region","id":"qarQhOt2OEh","children":[{"name":"Wanging'ombe District Council","id":"m4ow47nd3DC"},{"name":"Makambako Town Council","id":"cirtJ7KuNU0"},{"name":"Makete District Council","id":"NzvekEmEzUG"},{"name":"Njombe Town Council","id":"QUTWca9YxNb"},{"name":"Njombe District Council","id":"GOmwoDIGL98"},{"name":"Ludewa District Council","id":"aa5sxEFiAwN"}]},{"name":"Mbeya Region","id":"A3b5mw8DJYC","children":[{"name":"Mbarali District Council","id":"AvfNRAIsvhg"},{"name":"Momba District Council","id":"d07Wtk7brGz"},{"name":"Chunya District Council","id":"L9scGbK6d61"},{"name":"Rungwe District Council","id":"dPzNEI2Cxqj"},{"name":"Tunduma Town Council","id":"fqlNpTvqMw4"},{"name":"Mbeya District Council","id":"N5FKtARi6dB"},{"name":"Ileje District Council","id":"wsCWwNbLJNY"},{"name":"Mbozi District Council","id":"aouUIozrc7I"},{"name":"Mbeya City Council","id":"e3ATlebHNrD"},{"name":"Kyela District Council","id":"dWfRpHKykpk"},{"name":"Busokelo District Council","id":"xVzeWrXHf81"}]}]},{"name":"Northern Zone","id":"nvKJnetaMxk","organisationUnits":[{"name":"Kilimanjaro Region","id":"lnOyHhoLzre","children":[{"name":"Same District Council","id":"WCTbfnMiNF3"},{"name":"Hai District Council","id":"MiLb81EwC7j"},{"name":"Moshi Municipal Council","id":"Y8sOGpb4AFE"},{"name":"Mwanga District Council","id":"OHu1VHzyA0x"},{"name":"Rombo District Council","id":"Hob4dzCAW2W"},{"name":"Siha District Council","id":"aMnC7MINXlM"},{"name":"Moshi District Council","id":"VMTJLxcFH9o"}]},{"name":"Tanga Region","id":"vU0Qt1A5IDz","children":[{"name":"Bumbuli District Council","id":"gu92DYtO3ii"},{"name":"Pangani District Council","id":"rQS2cX4JH88"},{"name":"Lushoto District Council","id":"ilY7TEjviqa"},{"name":"Handeni District Council","id":"DkxlFk8MuM7"},{"name":"Korogwe District Council","id":"QBC1po2JaJW"},{"name":"Mkinga District Council","id":"B9idcF4fOIW"},{"name":"Muheza District Council","id":"H2LvCkw2bCO"},{"name":"Kilindi District Council","id":"mKI72g04l0D"},{"name":"Korogwe Town Council","id":"qHJkyM0bG8U"},{"name":"Tanga City Council","id":"ySuyuvNNFp8"}]},{"name":"Arusha Region","id":"YtVMnut7Foe","children":[{"name":"Longido District Council","id":"aQEZnk4RzKv"},{"name":"Karatu District Council","id":"QKEr8DFutO8"},{"name":"Arusha City Council","id":"lgZ6HfZaj3f"},{"name":"Ngorongoro District Council","id":"PHWaJvzTmL8"},{"name":"Meru District Council","id":"uafqZbOYpVL"},{"name":"Arusha District Council","id":"zHa2ohFrpPM"},{"name":"Monduli District Council","id":"D21VsjNL2LB"}]}]},{"name":"Central Zone","id":"gzWRK9qFFVp","organisationUnits":[{"name":"Singida Region","id":"LGTVRhKSn1V","children":[{"name":"Ikungi District Council","id":"dFCrIa5paz7"},{"name":"Singida Municipal Council","id":"V60DkMrlQ5Q"},{"name":"Singida District Council","id":"RHLUbsrsFoE"},{"name":"Manyoni District Council","id":"uHp3aLKA6Tn"},{"name":"Iramba District Council","id":"tNFOa31xGhu"},{"name":"Mkalama District Council","id":"Qyg5jjxGeQD"}]},{"name":"Manyara Region","id":"qg5ySBw9X5l","children":[{"name":"Mbulu Town Council","id":"k4ijpiPRc3R"},{"name":"Babati Town Council","id":"cnsiTXSJqqF"},{"name":"Hanang District Council","id":"xRx7W86ElUH"},{"name":"Babati District Council","id":"L5AfyN2zxns"},{"name":"Kiteto District Council","id":"P1TuGaaZ981"},{"name":"Mbulu District Council","id":"C96DDKK03pu"},{"name":"Simanjiro District Council","id":"A54bflEH57w"}]},{"name":"Dodoma Region","id":"Cpd5l15XxwA","children":[{"name":"Dodoma Municipal Council","id":"OzGGHqXQn5p"},{"name":"Chamwino District Council","id":"yiR1QdOwPqP"},{"name":"Chemba District Council","id":"Fez1Dp8bXSk"},{"name":"Mpwapwa District Council","id":"P5H056daq2I"},{"name":"Kondoa District Council","id":"yTTjcYh4xqa"},{"name":"Kongwa District Council","id":"DTc1rxSmlde"},{"name":"Bahi District Council","id":"Ak1TMj0oYc7"}]}]},{"name":"Eastern Zone","id":"gb4r7CSrT7U","organisationUnits":[{"name":"Dar Es Salaam Region","id":"acZHYslyJLt","children":[{"name":"Ilala Municipal Council","id":"xe93MrFXOYV"},{"name":"Temeke Municipal Council","id":"HIOQoi1aeL8"},{"name":"Kinondoni Municipal Council","id":"ts6eEeUjcfO"}]},{"name":"Morogoro Region","id":"Sj50oz9EHvD","children":[{"name":"Morogoro Municipal Council","id":"nUFAmN93pH4"},{"name":"Malinyi District Council","id":"TDqOYlV0O1a"},{"name":"Kilosa District Council","id":"GbVBjR8A7aK"},{"name":"Mvomero District Council","id":"BVBmQDCexxG"},{"name":"Morogoro District Council","id":"G2obPNftMUt"},{"name":"Ulanga District Council","id":"Le7ysFRJrMk"},{"name":"Kilombero District Council","id":"oMao5qA3DBy"},{"name":"Gairo District Council","id":"yh0b4OAgg8z"}]},{"name":"Pwani Region","id":"yyW17iCz9As","children":[{"name":"Bagamoyo District Council","id":"uPphu8kRXoZ"},{"name":"Rufiji District Council","id":"gncV3iPt6Sk"},{"name":"Mkuranga District Council","id":"Srvx9L1LGZM"},{"name":"Kisarawe District Council","id":"SnczTnCrk6d"},{"name":"Kibaha Town Council","id":"QekURU8eIU0"},{"name":"Mafia District Council","id":"GI57B0uNPOX"},{"name":"Kibaha District Council","id":"N8oGVhuoUcK"}]}]},{"name":"Southern Zone","id":"hiqGDmNAFJz","organisationUnits":[{"name":"Lindi Region","id":"VMgrQWSVIYn","children":[{"name":"Lindi District Council","id":"sjKfO239rjD"},{"name":"Nachingwea District Council","id":"W884lMlfpca"},{"name":"Lindi Municipal Council","id":"aiZstwpkrny"},{"name":"Liwale District Council","id":"ZszYGa2Vnyc"},{"name":"Kilwa District Council","id":"dGtH1WiNUrP"},{"name":"Ruangwa District Council","id":"OOplITY83ud"}]},{"name":"Mtwara Region","id":"bN5q5k5DgLA","children":[{"name":"Mtwara District Council","id":"xOJxkz079Ek"},{"name":"Masasi Town Council","id":"tLzrq5IZ23W"},{"name":"Tandahimba District Council","id":"gOcZSwBmijY"},{"name":"Nanyumbu District Council","id":"PvqxGEssig9"},{"name":"Nanyamba Town Council","id":"QRjyrYOr2vh"},{"name":"Newala Town Council","id":"tCJrHeEyDkg"},{"name":"Newala District Council","id":"IYqT1Xik8Bj"},{"name":"Masasi District Council","id":"rrHtwyYjprs"},{"name":"Mtwara Municipal Council","id":"PHGm198Hcil"}]},{"name":"Ruvuma Region","id":"ZYYX8Q9SGoV","children":[{"name":"Nyasa District Council","id":"TO89Eu9qoSX"},{"name":"Tunduru District Council","id":"r9NgS2Jsu9I"},{"name":"Songea District Council","id":"LbM25p7KBDP"},{"name":"Songea Municipal Council","id":"VdIZ0pAYfBK"},{"name":"Namtumbo District Council","id":"XL0luikY9oG"},{"name":"Mbinga District Council","id":"WB7EAwS3F8N"}]}]},{"name":"Lake Zone","id":"RRGOg1GyLsd","organisationUnits":[{"name":"Geita Region","id":"MAL4cfZoFhJ","children":[{"name":"Geita District Council","id":"saOGTLvMX4F"},{"name":"Chato District Council","id":"IZAkMaffRh8"},{"name":"Bukombe District Council","id":"plSLZJGUHZb"},{"name":"Nyang'hwale District Council","id":"G9VxK1Dmkpc"},{"name":"Mbogwe District Council","id":"RCDM6DotMZw"},{"name":"Geita Town council","id":"fSZfOuCkmAb"}]},{"name":"Mwanza Region","id":"hAFRrgDK0fy","children":[{"name":"Buchosa District Council","id":"tq4bMQkHDbC"},{"name":"Ilemela Municipal Council","id":"et6lWc8GDHy"},{"name":"Kwimba District Council","id":"O8O3HQdJWHX"},{"name":"Magu District Council","id":"Kug5uWxs0mu"},{"name":"Nyamagana Municipal Council","id":"f7UPzYMgzVH"},{"name":"Sengerema District Council","id":"IGSrsG5I54W"},{"name":"Misungwi District Council","id":"jAI2fd8kK1z"},{"name":"Ukerewe District Council","id":"QE0OH5162nV"}]},{"name":"Simiyu Region","id":"IgTAEKMqKRe","children":[{"name":"Meatu District Council","id":"vJY7WRfb5Hc"},{"name":"Busega District Council","id":"I58Bh8dN2sO"},{"name":"Itilima District Council","id":"bDteRg6tH0A"},{"name":"Maswa District Council","id":"mbXn83McbCh"},{"name":"Bariadi District Council","id":"Q16E1rzDnVD"},{"name":"Bariadi Town Council","id":"Yb483pDzzWj"}]},{"name":"Mara Region","id":"vYT08q7Wo33","children":[{"name":"Bunda Town Council","id":"SoXc0vm0JrY"},{"name":"Bunda District Council","id":"ouZ5YpZ4T3a"},{"name":"Serengeti District Council","id":"X5MzEu84hUN"},{"name":"Rorya District Council","id":"bRz3nu8rSWS"},{"name":"Tarime District Council","id":"NzVLQOcSJJU"},{"name":"Butiama District Council","id":"btLScg6XCBN"},{"name":"Musoma District Council","id":"z4dfv9EOq3c"},{"name":"Musoma Municipal Council","id":"bKA4yc2NUxA"},{"name":"Tarime Town Council","id":"Qp6ocX9ESSa"}]},{"name":"Kagera Region","id":"Crkg9BoUo5w","children":[{"name":"Kyerwa District Council","id":"LdzOZ9hNTwH"},{"name":"Biharamulo District Council","id":"yz7jPBCDXlX"},{"name":"Ngara District Council","id":"XLrownkhsKI"},{"name":"Bukoba Municipal Council","id":"PM74xoecSpJ"},{"name":"Bukoba District Council","id":"LoPF5WqswyW"},{"name":"Missenyi District Council","id":"F8NIzb16wVU"},{"name":"Karagwe District Council","id":"YFPElmUhUok"},{"name":"Muleba District Council","id":"wIjscdPZF3N"}]},{"name":"Shinyanga Region","id":"EO3Ps3ny0Nr","children":[{"name":"Ushetu District Council","id":"WgQHWeMx6Zl"},{"name":"Msalala District Council","id":"vQvBfxn7Cjs"},{"name":"Shinyanga District Council","id":"FylvwNXCTAQ"},{"name":"Kishapu District Council","id":"kISvf8gGZMm"},{"name":"Shinyanga Municipal Council","id":"PF4defRibDi"},{"name":"Kahama Town Council","id":"AiyppObGUqI"}]}]},{"name":"Western Zone","id":"zITJeBfrJ4J","organisationUnits":[{"name":"Kigoma Region","id":"RD96nI1JXVV","children":[{"name":"Buhigwe District Council","id":"yPCs2xE66we"},{"name":"Kigoma Municipal Council","id":"dIiTyLaZAEb"},{"name":"Kasulu District Council","id":"zfwo4rq1XC3"},{"name":"Kasulu Town Council","id":"IfQ2Sjbfdme"},{"name":"Uvinza District Council","id":"dt0Q0NhyPty"},{"name":"Kigoma District Council","id":"lQOxGNRaklm"},{"name":"Kakonko District Council","id":"T3A9X81ABG3"},{"name":"Kibondo District Council","id":"duES2Gfgvpw"}]},{"name":"Tabora Region","id":"kZ6RlMnt2bp","children":[{"name":"Sikonge District Council","id":"mOqc3ajETpA"},{"name":"Nzega Town Council","id":"uvsgHtPzLSo"},{"name":"Kaliua District Council","id":"PEIzWSzWQ7S"},{"name":"Tabora Municipal Council","id":"Nc1C12TG69d"},{"name":"Nzega District Council","id":"WAwWjYYzdkS"},{"name":"Uyui District Council","id":"m2ux1UEElNB"},{"name":"Igunga District Council","id":"fogigwn9cW7"},{"name":"Urambo District Council","id":"K8HUKJUZ7aj"}]}]}]},
        lastMonthWithData :'201512',
        defaultChartObject: {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Stacked column chart'
            },
            xAxis: {
                categories: []
            },
            yAxis: {
                min: 0,
                title: {

                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },

            legend: {
                align: 'right',
                x: -30,
                verticalAlign: 'top',
                y: 25,
                floating: true,
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.x + '</b><br/>' +
                        this.series.name + ': ' + this.y + '<br/>' +
                        'Total: ' + this.point.stackTotal;
                }
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                        style: {
                            textShadow: '0 0 3px black'
                        },
                    formatter: function() {
                        if (this.y != 0) {
                            return this.y;
                        } else {
                            return null;
                        }
                    }
                    }
                }
            },
            series: []
        },
        //determine the position of metadata using prefix [dx,de,co,pe,ou]
        getTitleIndex: function(analyticsObjectHeaders,name){
            var index = 0;
            var counter = 0;
            angular.forEach(analyticsObjectHeaders,function(header){
                if(header.name == name){
                    index = counter;
                }
                counter++;
            });
            return index;
        },

        preparePeriod : function(period){

            return ""+period+"01;"+period+"02;"+period+"03;"+period+"04;"+period+"05;"+period+"06;"+period+"07;"+period+"08;"+period+"09;"+period+"10;"+period+"11;"+period+"12;"+period+"Q1;"+period+"Q2;"+period+"Q3;"+period+"Q4";
         },

        //return a list of fomated organisation units to send to analytics
        getUniqueOrgUnits: function(orgunitsListFromTree){
          var orgUnits = [];

            angular.forEach(orgunitsListFromTree,function(orgUnit){
                var name = orgUnit.name;
                if(name.indexOf("Zone") > -1){
                    angular.forEach(orgUnit.children,function(regions){
                        if(orgUnits.indexOf(regions.id) == -1){
                            orgUnits.push(regions.id);
                        }
                    });
                }else{
                    if(orgUnits.indexOf(orgUnit.id) == -1){
                        orgUnits.push(orgUnit.id);
                    }

                }
            });
            return orgUnits.join(";");
        },

        //determine the position of data value,(Expected to be the last one)
        getValueIndex: function(analyticsObjectHeaders){
            var counter = -1;
            angular.forEach(analyticsObjectHeaders,function(header){
                counter++;
            });
            return counter;
        },

        //get an array of items from analyticsObject[metadataType == dx,co,ou,pe,value]
        getMetadataArray : function (analyticsObject,metadataType,defaultArr) {
            //determine the position of metadata in rows of values
            var metadataArray = [];
            var checkArr = [];
            if(metadataType == 'dx' || metadataType == 'value'){
                angular.forEach(analyticsObject.metaData.dx,function(val){
                    metadataArray.push({'name':analyticsObject.metaData.names[val],'uid':val})
                });
            }else if(metadataType == 'ou'){
                if(typeof defaultArr !== 'undefined' && defaultArr.length !== 0){
                    metadataArray = defaultArr;
                }else{
                    angular.forEach(analyticsObject.metaData.ou,function(val){
                        metadataArray.push({'name':analyticsObject.metaData.names[val],'uid':val})
                    });
                }
            }else if(metadataType == 'co'){
                angular.forEach(analyticsObject.metaData.co,function(val){
                    metadataArray.push({'name':analyticsObject.metaData.names[val],'uid':val})
                });            }
            else if(metadataType == 'pe'){
                angular.forEach(analyticsObject.metaData.pe,function(val){
                    metadataArray.push({'name':analyticsObject.metaData.names[val],'uid':val})
                });
            }else{
                angular.forEach(analyticsObject.metaData[metadataType],function(val){
                    metadataArray.push({'name':analyticsObject.metaData.names[val],'uid':val})
                });
            }

            return metadataArray;
        },

        //preparing categories depending on selections
        //return the meaningfull array of xAxis and yAxis Items
        prepareCategories : function(analyticsObject,xAxis,yAxis){
            var structure = {'xAxisItems':[],'yAxisItems':[]};
            angular.forEach(this.getMetadataArray(analyticsObject,yAxis),function(val){
                structure.yAxisItems.push({'name':val.name,'uid':val.uid})
            });
            angular.forEach(this.getMetadataArray(analyticsObject,xAxis),function(val){
                structure.xAxisItems.push({'name':val.name,'uid':val.uid})
            });
            return structure;

        },

        //try to find data from the rows of analytics object
        getDataValue : function(analyticsObject,xAxisType,xAxisUid,yAxisType,yAxisUid,filterType,filterUid){
            var num = 0;
            var currentService = this;
            $.each(analyticsObject.rows,function(key,value){
                if(filterType == 'none'){
                    if(value[currentService.getTitleIndex(analyticsObject.headers,yAxisType)] == yAxisUid && value[currentService.getTitleIndex(analyticsObject.headers,xAxisType)] == xAxisUid ){
                        num = parseFloat(value[currentService.getTitleIndex(analyticsObject.headers,'value')]);
                    }
                }else{
                    if(value[currentService.getTitleIndex(analyticsObject.headers,yAxisType)] == yAxisUid && value[currentService.getTitleIndex(analyticsObject.headers,xAxisType)] == xAxisUid && value[currentService.getTitleIndex(analyticsObject.headers,filterType)] == filterUid ){
                        num = parseFloat(value[currentService.getTitleIndex(analyticsObject.headers,'value')]);
                    }
                }

            });
            return num;
        },

        //drawing some charts
        drawChart : function(type){

        },

        //hacks for pie chart
        drawPieChart : function(analyticsObject,xAxisType,yAxisType,filterType,filterUid,title){
            var chartObject = angular.copy(this.defaultChartObject);
            chartObject.title.text = title;
            //chartObject.yAxis.title.text = title.toLowerCase();
            var pieSeries = [];
            var metaDataObject = this.prepareCategories(analyticsObject,xAxisType,yAxisType);
            var currentService = this;
            angular.forEach(metaDataObject.yAxisItems,function(yAxis){
                angular.forEach(metaDataObject.xAxisItems,function(xAxis){
                    console.log(analyticsObject+'--'+xAxisType+'----'+xAxis.uid+'----'+yAxisType+'---'+yAxis.uid+'----'+filterType+'-----'+filterUid)
                    var number = currentService.getDataValue(analyticsObject,xAxisType,xAxis.uid,yAxisType,yAxis.uid,filterType,filterUid);
                    pieSeries.push({name: yAxis.name+" - "+ xAxis.name , y: parseFloat(number)})
                });
            });

            chartObject.series = {type: 'pie', name:title , data: pieSeries,showInLegend: true,
                dataLabels: {
                    enabled: false
                }
            };
            return chartObject;
        },

        //hack for combined charts
        drawCombinedChart : function(analyticsObject,xAxisType,yAxisType,filterType,filterUid,title){
            var chartObject = angular.copy(this.defaultChartObject);
            chartObject.title.text = title;
            //chartObject.yAxis.title.text = title.toLowerCase();
            var pieSeries = [];
            var metaDataObject = this.prepareCategories(analyticsObject,xAxisType,yAxisType);
            var currentService = this;
            angular.forEach(metaDataObject.yAxisItems,function(yAxis){
                var barSeries = [];
                angular.forEach(metaDataObject.xAxisItems,function(xAxis){
                    var number = currentService.getDataValue(analyticsObject,xAxisType,xAxis.uid,yAxisType,yAxis.uid,filterType,filterUid);
                    barSeries.push(parseFloat(number));
                    pieSeries.push({name: yAxis.name+" - "+ xAxis.name , y: parseFloat(number) })
                });
                chartObject.series.push({type: 'column', name: yAxis.name, data: barSeries});
                chartObject.series.push({type: 'spline', name: yAxis.name, data: barSeries});
            });
            chartObject.series.push({type: 'pie', name: title, data: pieSeries,center: [100, 80],size: 150,showInLegend: false,
                dataLabels: {
                    enabled: false
                }
            });

            return chartObject;
        },

        //draw all other types of chart[bar,line,area]
        drawOtherCharts : function(analyticsObject, xAxisType,xAxisItems,yAxisType,yAxisItems,filterType,filterUid,title,chartType){
            var chartObject = angular.copy(this.defaultChartObject);
            chartObject.title.text = title;
            var metaDataObject = this.prepareCategories(analyticsObject, xAxisType,xAxisItems,yAxisType,yAxisItems);
            var currentService = this;
            angular.forEach(metaDataObject.xAxisItems, function (val) {
                chartObject.xAxis.categories.push(val.name);
            });
            angular.forEach(metaDataObject.yAxisItems,function(yAxis){
                var chartSeries = [];
                angular.forEach(metaDataObject.xAxisItems,function(xAxis){
                    var number = currentService.getDataValue(analyticsObject,xAxisType,xAxis.uid,yAxisType,yAxis.uid,filterType,filterUid);
                    //console.log(xAxis.name+"("+xAxis.uid+")"+"---"+yAxis.name+"("+yAxis.uid+")"+" value is " + number);
                    chartSeries.push(parseFloat(number));
                });
                chartObject.series.push({type: chartType, name: yAxis.name, data: chartSeries});
            });
            return chartObject;
        }



    };
    return FPManager;
});
