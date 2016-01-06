/**
 * Created by kelvin on 12/10/15.
 */
/**
 * Created by kelvin on 11/26/15.
 */

angular.module("hmisPortal")
    .config(function($httpProvider) {

    })
    .controller("ClientsByDemographicsCtrl",function ($rootScope,$scope,$http,portalService,FPManager) {
        var url = "https://dhis.moh.go.tz/api/analytics.json?dimension=dx:GGpsoh0DX6T;IFxhP0O4k0W;JMmqv0tyVr7;Nt8M08bJKXl;OQpasUg1Tse;btKkJROB2gP;epPM7fO8CnH;mlfh4fgiFhd;pqpVKzE951Y&dimension=ou:LEVEL-2;m0frOspS7JY&dimension=pe:201501;201502;201503;201504;201505;201506;201507;201508;201509;201510;201511;201512;2015Q1;2015Q2;2015Q3;2015Q4&displayProperty=NAME";
        var geoZonesUrl = "https://dhis.moh.go.tz/api/organisationUnitGroupSets/eVyUn5tE93t.json?fields=id,name,organisationUnitGroups[id,name,organisationUnits[id,name]]";
        var data = {"headers":[{"name":"dx","column":"Data","type":"java.lang.String","hidden":false,"meta":true},{"name":"ou","column":"Organisation unit","type":"java.lang.String","hidden":false,"meta":true},{"name":"pe","column":"Period","type":"java.lang.String","hidden":false,"meta":true},{"name":"value","column":"Value","type":"java.lang.Double","hidden":false,"meta":false}],"metaData":{"names":{"201401":"January 2014","201402":"February 2014","201403":"March 2014","201404":"April 2014","201405":"May 2014","201406":"June 2014","201407":"July 2014","201408":"August 2014","201409":"September 2014","201410":"October 2014","201411":"November 2014","201412":"December 2014","QRCRjFreECE":"FP_<20 Natural FP","LGTVRhKSn1V":"Singida Region","A3b5mw8DJYC":"Mbeya Region","DWSo42hunXH":"Katavi Region","LpkdcaLc4I9":"FP_<20 Injectables","dx":"Data","vAtZ8a924Lx":"Rukwa Region","sWOWPBvwNY2":"Iringa Region","p14JdJaG2aC":"FP_<20 Implants","qg5ySBw9X5l":"Manyara Region","GvbkEo6sfSd":"FP_<20 IUCDs","ou":"Organisation unit","aSJKs4oPZAf":"FP_<20 Oral Pills","2014Q4":"Oct to Dec 2014","2014Q1":"Jan to Mar 2014","qarQhOt2OEh":"Njombe Region","2014Q3":"Jul to Sep 2014","2014Q2":"Apr to Jun 2014","vU0Qt1A5IDz":"Tanga Region","YtVMnut7Foe":"Arusha Region","W74wyMy1mp0":"FP_<20 yrs Male Condoms","pe":"Period","p8cgxI3yPx8":"FP_<20 yrs Female Condoms"},"dx":["W74wyMy1mp0","p8cgxI3yPx8","aSJKs4oPZAf","LpkdcaLc4I9","p14JdJaG2aC","GvbkEo6sfSd","QRCRjFreECE"],"pe":["201401","201402","201403","2014Q1","201404","201405","201406","2014Q2","201407","201408","201409","2014Q3","201410","201411","201412","2014Q4"],"ou":["DWSo42hunXH","sWOWPBvwNY2","vAtZ8a924Lx","qarQhOt2OEh","A3b5mw8DJYC","vU0Qt1A5IDz","YtVMnut7Foe","LGTVRhKSn1V","qg5ySBw9X5l"],"co":[]},"rows":[["W74wyMy1mp0","DWSo42hunXH","201401","16.0"],["W74wyMy1mp0","DWSo42hunXH","201402","29.0"],["W74wyMy1mp0","DWSo42hunXH","201403","26.0"],["W74wyMy1mp0","DWSo42hunXH","2014Q1","71.0"],["W74wyMy1mp0","DWSo42hunXH","201404","29.0"],["W74wyMy1mp0","DWSo42hunXH","201405","42.0"],["W74wyMy1mp0","DWSo42hunXH","201406","29.0"],["W74wyMy1mp0","DWSo42hunXH","2014Q2","100.0"],["W74wyMy1mp0","DWSo42hunXH","201407","21.0"],["W74wyMy1mp0","DWSo42hunXH","201408","25.0"],["W74wyMy1mp0","DWSo42hunXH","201409","23.0"],["W74wyMy1mp0","DWSo42hunXH","2014Q3","69.0"],["W74wyMy1mp0","DWSo42hunXH","201410","23.0"],["W74wyMy1mp0","DWSo42hunXH","201411","33.0"],["W74wyMy1mp0","DWSo42hunXH","201412","31.0"],["W74wyMy1mp0","DWSo42hunXH","2014Q4","87.0"],["W74wyMy1mp0","sWOWPBvwNY2","201401","24.0"],["W74wyMy1mp0","sWOWPBvwNY2","201402","44.0"],["W74wyMy1mp0","sWOWPBvwNY2","201403","113.0"],["W74wyMy1mp0","sWOWPBvwNY2","2014Q1","181.0"],["W74wyMy1mp0","sWOWPBvwNY2","201404","42.0"],["W74wyMy1mp0","sWOWPBvwNY2","201405","50.0"],["W74wyMy1mp0","sWOWPBvwNY2","201406","31.0"],["W74wyMy1mp0","sWOWPBvwNY2","2014Q2","123.0"],["W74wyMy1mp0","sWOWPBvwNY2","201407","65.0"],["W74wyMy1mp0","sWOWPBvwNY2","201408","22.0"],["W74wyMy1mp0","sWOWPBvwNY2","201409","99.0"],["W74wyMy1mp0","sWOWPBvwNY2","2014Q3","186.0"],["W74wyMy1mp0","sWOWPBvwNY2","201410","58.0"],["W74wyMy1mp0","sWOWPBvwNY2","201411","75.0"],["W74wyMy1mp0","sWOWPBvwNY2","201412","51.0"],["W74wyMy1mp0","sWOWPBvwNY2","2014Q4","184.0"],["W74wyMy1mp0","vAtZ8a924Lx","201401","145.0"],["W74wyMy1mp0","vAtZ8a924Lx","201402","31.0"],["W74wyMy1mp0","vAtZ8a924Lx","201403","32.0"],["W74wyMy1mp0","vAtZ8a924Lx","2014Q1","208.0"],["W74wyMy1mp0","vAtZ8a924Lx","201404","36.0"],["W74wyMy1mp0","vAtZ8a924Lx","201405","14.0"],["W74wyMy1mp0","vAtZ8a924Lx","201406","56.0"],["W74wyMy1mp0","vAtZ8a924Lx","2014Q2","106.0"],["W74wyMy1mp0","vAtZ8a924Lx","201407","41.0"],["W74wyMy1mp0","vAtZ8a924Lx","201408","100.0"],["W74wyMy1mp0","vAtZ8a924Lx","201409","131.0"],["W74wyMy1mp0","vAtZ8a924Lx","2014Q3","272.0"],["W74wyMy1mp0","vAtZ8a924Lx","201410","84.0"],["W74wyMy1mp0","vAtZ8a924Lx","201411","95.0"],["W74wyMy1mp0","vAtZ8a924Lx","201412","83.0"],["W74wyMy1mp0","vAtZ8a924Lx","2014Q4","262.0"],["W74wyMy1mp0","qarQhOt2OEh","201401","20.0"],["W74wyMy1mp0","qarQhOt2OEh","201402","72.0"],["W74wyMy1mp0","qarQhOt2OEh","201403","40.0"],["W74wyMy1mp0","qarQhOt2OEh","2014Q1","132.0"],["W74wyMy1mp0","qarQhOt2OEh","201404","30.0"],["W74wyMy1mp0","qarQhOt2OEh","201405","24.0"],["W74wyMy1mp0","qarQhOt2OEh","201406","31.0"],["W74wyMy1mp0","qarQhOt2OEh","2014Q2","85.0"],["W74wyMy1mp0","qarQhOt2OEh","201407","46.0"],["W74wyMy1mp0","qarQhOt2OEh","201408","33.0"],["W74wyMy1mp0","qarQhOt2OEh","201409","28.0"],["W74wyMy1mp0","qarQhOt2OEh","2014Q3","107.0"],["W74wyMy1mp0","qarQhOt2OEh","201410","26.0"],["W74wyMy1mp0","qarQhOt2OEh","201411","51.0"],["W74wyMy1mp0","qarQhOt2OEh","201412","48.0"],["W74wyMy1mp0","qarQhOt2OEh","2014Q4","125.0"],["W74wyMy1mp0","A3b5mw8DJYC","201401","104.0"],["W74wyMy1mp0","A3b5mw8DJYC","201402","153.0"],["W74wyMy1mp0","A3b5mw8DJYC","201403","87.0"],["W74wyMy1mp0","A3b5mw8DJYC","2014Q1","344.0"],["W74wyMy1mp0","A3b5mw8DJYC","201404","118.0"],["W74wyMy1mp0","A3b5mw8DJYC","201405","98.0"],["W74wyMy1mp0","A3b5mw8DJYC","201406","160.0"],["W74wyMy1mp0","A3b5mw8DJYC","2014Q2","376.0"],["W74wyMy1mp0","A3b5mw8DJYC","201407","202.0"],["W74wyMy1mp0","A3b5mw8DJYC","201408","99.0"],["W74wyMy1mp0","A3b5mw8DJYC","201409","133.0"],["W74wyMy1mp0","A3b5mw8DJYC","2014Q3","434.0"],["W74wyMy1mp0","A3b5mw8DJYC","201410","111.0"],["W74wyMy1mp0","A3b5mw8DJYC","201411","207.0"],["W74wyMy1mp0","A3b5mw8DJYC","201412","223.0"],["W74wyMy1mp0","A3b5mw8DJYC","2014Q4","541.0"],["W74wyMy1mp0","vU0Qt1A5IDz","201401","241.0"],["W74wyMy1mp0","vU0Qt1A5IDz","201402","163.0"],["W74wyMy1mp0","vU0Qt1A5IDz","201403","229.0"],["W74wyMy1mp0","vU0Qt1A5IDz","2014Q1","633.0"],["W74wyMy1mp0","vU0Qt1A5IDz","201404","129.0"],["W74wyMy1mp0","vU0Qt1A5IDz","201405","194.0"],["W74wyMy1mp0","vU0Qt1A5IDz","201406","349.0"],["W74wyMy1mp0","vU0Qt1A5IDz","2014Q2","672.0"],["W74wyMy1mp0","vU0Qt1A5IDz","201407","707.0"],["W74wyMy1mp0","vU0Qt1A5IDz","201408","200.0"],["W74wyMy1mp0","vU0Qt1A5IDz","201409","122.0"],["W74wyMy1mp0","vU0Qt1A5IDz","2014Q3","1029.0"],["W74wyMy1mp0","vU0Qt1A5IDz","201410","108.0"],["W74wyMy1mp0","vU0Qt1A5IDz","201411","152.0"],["W74wyMy1mp0","vU0Qt1A5IDz","201412","128.0"],["W74wyMy1mp0","vU0Qt1A5IDz","2014Q4","388.0"],["W74wyMy1mp0","YtVMnut7Foe","201401","30.0"],["W74wyMy1mp0","YtVMnut7Foe","201402","50.0"],["W74wyMy1mp0","YtVMnut7Foe","201403","20.0"],["W74wyMy1mp0","YtVMnut7Foe","2014Q1","100.0"],["W74wyMy1mp0","YtVMnut7Foe","201404","112.0"],["W74wyMy1mp0","YtVMnut7Foe","201405","108.0"],["W74wyMy1mp0","YtVMnut7Foe","201406","76.0"],["W74wyMy1mp0","YtVMnut7Foe","2014Q2","296.0"],["W74wyMy1mp0","YtVMnut7Foe","201407","102.0"],["W74wyMy1mp0","YtVMnut7Foe","201408","54.0"],["W74wyMy1mp0","YtVMnut7Foe","201409","20.0"],["W74wyMy1mp0","YtVMnut7Foe","2014Q3","176.0"],["W74wyMy1mp0","YtVMnut7Foe","201410","31.0"],["W74wyMy1mp0","YtVMnut7Foe","201411","30.0"],["W74wyMy1mp0","YtVMnut7Foe","201412","57.0"],["W74wyMy1mp0","YtVMnut7Foe","2014Q4","118.0"],["W74wyMy1mp0","LGTVRhKSn1V","201401","62.0"],["W74wyMy1mp0","LGTVRhKSn1V","201402","91.0"],["W74wyMy1mp0","LGTVRhKSn1V","201403","149.0"],["W74wyMy1mp0","LGTVRhKSn1V","2014Q1","302.0"],["W74wyMy1mp0","LGTVRhKSn1V","201404","138.0"],["W74wyMy1mp0","LGTVRhKSn1V","201405","62.0"],["W74wyMy1mp0","LGTVRhKSn1V","201406","83.0"],["W74wyMy1mp0","LGTVRhKSn1V","2014Q2","283.0"],["W74wyMy1mp0","LGTVRhKSn1V","201407","63.0"],["W74wyMy1mp0","LGTVRhKSn1V","201408","74.0"],["W74wyMy1mp0","LGTVRhKSn1V","201409","89.0"],["W74wyMy1mp0","LGTVRhKSn1V","2014Q3","226.0"],["W74wyMy1mp0","LGTVRhKSn1V","201410","58.0"],["W74wyMy1mp0","LGTVRhKSn1V","201411","41.0"],["W74wyMy1mp0","LGTVRhKSn1V","201412","68.0"],["W74wyMy1mp0","LGTVRhKSn1V","2014Q4","167.0"],["W74wyMy1mp0","qg5ySBw9X5l","201401","47.0"],["W74wyMy1mp0","qg5ySBw9X5l","201402","132.0"],["W74wyMy1mp0","qg5ySBw9X5l","201403","23.0"],["W74wyMy1mp0","qg5ySBw9X5l","2014Q1","202.0"],["W74wyMy1mp0","qg5ySBw9X5l","201404","66.0"],["W74wyMy1mp0","qg5ySBw9X5l","201405","27.0"],["W74wyMy1mp0","qg5ySBw9X5l","201406","43.0"],["W74wyMy1mp0","qg5ySBw9X5l","2014Q2","136.0"],["W74wyMy1mp0","qg5ySBw9X5l","201407","38.0"],["W74wyMy1mp0","qg5ySBw9X5l","201408","37.0"],["W74wyMy1mp0","qg5ySBw9X5l","201409","51.0"],["W74wyMy1mp0","qg5ySBw9X5l","2014Q3","126.0"],["W74wyMy1mp0","qg5ySBw9X5l","201410","40.0"],["W74wyMy1mp0","qg5ySBw9X5l","201411","39.0"],["W74wyMy1mp0","qg5ySBw9X5l","201412","24.0"],["W74wyMy1mp0","qg5ySBw9X5l","2014Q4","103.0"],["p8cgxI3yPx8","DWSo42hunXH","201401","9.0"],["p8cgxI3yPx8","DWSo42hunXH","201402","17.0"],["p8cgxI3yPx8","DWSo42hunXH","201403","21.0"],["p8cgxI3yPx8","DWSo42hunXH","2014Q1","47.0"],["p8cgxI3yPx8","DWSo42hunXH","201404","23.0"],["p8cgxI3yPx8","DWSo42hunXH","201405","25.0"],["p8cgxI3yPx8","DWSo42hunXH","201406","30.0"],["p8cgxI3yPx8","DWSo42hunXH","2014Q2","78.0"],["p8cgxI3yPx8","DWSo42hunXH","201407","17.0"],["p8cgxI3yPx8","DWSo42hunXH","201408","8.0"],["p8cgxI3yPx8","DWSo42hunXH","201409","8.0"],["p8cgxI3yPx8","DWSo42hunXH","2014Q3","33.0"],["p8cgxI3yPx8","DWSo42hunXH","201410","5.0"],["p8cgxI3yPx8","DWSo42hunXH","201411","3.0"],["p8cgxI3yPx8","DWSo42hunXH","201412","6.0"],["p8cgxI3yPx8","DWSo42hunXH","2014Q4","14.0"],["p8cgxI3yPx8","sWOWPBvwNY2","201401","10.0"],["p8cgxI3yPx8","sWOWPBvwNY2","201402","8.0"],["p8cgxI3yPx8","sWOWPBvwNY2","201403","11.0"],["p8cgxI3yPx8","sWOWPBvwNY2","2014Q1","29.0"],["p8cgxI3yPx8","sWOWPBvwNY2","201404","16.0"],["p8cgxI3yPx8","sWOWPBvwNY2","201405","28.0"],["p8cgxI3yPx8","sWOWPBvwNY2","201406","16.0"],["p8cgxI3yPx8","sWOWPBvwNY2","2014Q2","60.0"],["p8cgxI3yPx8","sWOWPBvwNY2","201407","18.0"],["p8cgxI3yPx8","sWOWPBvwNY2","201408","16.0"],["p8cgxI3yPx8","sWOWPBvwNY2","201409","30.0"],["p8cgxI3yPx8","sWOWPBvwNY2","2014Q3","64.0"],["p8cgxI3yPx8","sWOWPBvwNY2","201410","19.0"],["p8cgxI3yPx8","sWOWPBvwNY2","201411","18.0"],["p8cgxI3yPx8","sWOWPBvwNY2","201412","17.0"],["p8cgxI3yPx8","sWOWPBvwNY2","2014Q4","54.0"],["p8cgxI3yPx8","vAtZ8a924Lx","201401","5.0"],["p8cgxI3yPx8","vAtZ8a924Lx","201402","0.0"],["p8cgxI3yPx8","vAtZ8a924Lx","201403","2.0"],["p8cgxI3yPx8","vAtZ8a924Lx","2014Q1","7.0"],["p8cgxI3yPx8","vAtZ8a924Lx","201404","7.0"],["p8cgxI3yPx8","vAtZ8a924Lx","201405","1.0"],["p8cgxI3yPx8","vAtZ8a924Lx","201406","7.0"],["p8cgxI3yPx8","vAtZ8a924Lx","2014Q2","15.0"],["p8cgxI3yPx8","vAtZ8a924Lx","201407","0.0"],["p8cgxI3yPx8","vAtZ8a924Lx","201408","13.0"],["p8cgxI3yPx8","vAtZ8a924Lx","201409","7.0"],["p8cgxI3yPx8","vAtZ8a924Lx","2014Q3","20.0"],["p8cgxI3yPx8","vAtZ8a924Lx","201410","2.0"],["p8cgxI3yPx8","vAtZ8a924Lx","201411","17.0"],["p8cgxI3yPx8","vAtZ8a924Lx","201412","5.0"],["p8cgxI3yPx8","vAtZ8a924Lx","2014Q4","24.0"],["p8cgxI3yPx8","qarQhOt2OEh","201401","16.0"],["p8cgxI3yPx8","qarQhOt2OEh","201402","4.0"],["p8cgxI3yPx8","qarQhOt2OEh","201403","30.0"],["p8cgxI3yPx8","qarQhOt2OEh","2014Q1","50.0"],["p8cgxI3yPx8","qarQhOt2OEh","201404","7.0"],["p8cgxI3yPx8","qarQhOt2OEh","201405","7.0"],["p8cgxI3yPx8","qarQhOt2OEh","201406","4.0"],["p8cgxI3yPx8","qarQhOt2OEh","2014Q2","18.0"],["p8cgxI3yPx8","qarQhOt2OEh","201407","2.0"],["p8cgxI3yPx8","qarQhOt2OEh","201408","14.0"],["p8cgxI3yPx8","qarQhOt2OEh","201409","5.0"],["p8cgxI3yPx8","qarQhOt2OEh","2014Q3","21.0"],["p8cgxI3yPx8","qarQhOt2OEh","201410","10.0"],["p8cgxI3yPx8","qarQhOt2OEh","201411","4.0"],["p8cgxI3yPx8","qarQhOt2OEh","201412","6.0"],["p8cgxI3yPx8","qarQhOt2OEh","2014Q4","20.0"],["p8cgxI3yPx8","A3b5mw8DJYC","201401","31.0"],["p8cgxI3yPx8","A3b5mw8DJYC","201402","90.0"],["p8cgxI3yPx8","A3b5mw8DJYC","201403","32.0"],["p8cgxI3yPx8","A3b5mw8DJYC","2014Q1","153.0"],["p8cgxI3yPx8","A3b5mw8DJYC","201404","16.0"],["p8cgxI3yPx8","A3b5mw8DJYC","201405","39.0"],["p8cgxI3yPx8","A3b5mw8DJYC","201406","43.0"],["p8cgxI3yPx8","A3b5mw8DJYC","2014Q2","98.0"],["p8cgxI3yPx8","A3b5mw8DJYC","201407","37.0"],["p8cgxI3yPx8","A3b5mw8DJYC","201408","18.0"],["p8cgxI3yPx8","A3b5mw8DJYC","201409","38.0"],["p8cgxI3yPx8","A3b5mw8DJYC","2014Q3","93.0"],["p8cgxI3yPx8","A3b5mw8DJYC","201410","18.0"],["p8cgxI3yPx8","A3b5mw8DJYC","201411","51.0"],["p8cgxI3yPx8","A3b5mw8DJYC","201412","25.0"],["p8cgxI3yPx8","A3b5mw8DJYC","2014Q4","94.0"],["p8cgxI3yPx8","vU0Qt1A5IDz","201401","104.0"],["p8cgxI3yPx8","vU0Qt1A5IDz","201402","110.0"],["p8cgxI3yPx8","vU0Qt1A5IDz","201403","65.0"],["p8cgxI3yPx8","vU0Qt1A5IDz","2014Q1","279.0"],["p8cgxI3yPx8","vU0Qt1A5IDz","201404","33.0"],["p8cgxI3yPx8","vU0Qt1A5IDz","201405","23.0"],["p8cgxI3yPx8","vU0Qt1A5IDz","201406","30.0"],["p8cgxI3yPx8","vU0Qt1A5IDz","2014Q2","86.0"],["p8cgxI3yPx8","vU0Qt1A5IDz","201407","58.0"],["p8cgxI3yPx8","vU0Qt1A5IDz","201408","28.0"],["p8cgxI3yPx8","vU0Qt1A5IDz","201409","54.0"],["p8cgxI3yPx8","vU0Qt1A5IDz","2014Q3","140.0"],["p8cgxI3yPx8","vU0Qt1A5IDz","201410","66.0"],["p8cgxI3yPx8","vU0Qt1A5IDz","201411","79.0"],["p8cgxI3yPx8","vU0Qt1A5IDz","201412","72.0"],["p8cgxI3yPx8","vU0Qt1A5IDz","2014Q4","217.0"],["p8cgxI3yPx8","YtVMnut7Foe","201401","7.0"],["p8cgxI3yPx8","YtVMnut7Foe","201402","1.0"],["p8cgxI3yPx8","YtVMnut7Foe","201403","4.0"],["p8cgxI3yPx8","YtVMnut7Foe","2014Q1","12.0"],["p8cgxI3yPx8","YtVMnut7Foe","201404","8.0"],["p8cgxI3yPx8","YtVMnut7Foe","201405","22.0"],["p8cgxI3yPx8","YtVMnut7Foe","201406","4.0"],["p8cgxI3yPx8","YtVMnut7Foe","2014Q2","34.0"],["p8cgxI3yPx8","YtVMnut7Foe","201407","4.0"],["p8cgxI3yPx8","YtVMnut7Foe","201408","38.0"],["p8cgxI3yPx8","YtVMnut7Foe","201409","1.0"],["p8cgxI3yPx8","YtVMnut7Foe","2014Q3","43.0"],["p8cgxI3yPx8","YtVMnut7Foe","201410","37.0"],["p8cgxI3yPx8","YtVMnut7Foe","201411","5.0"],["p8cgxI3yPx8","YtVMnut7Foe","201412","6.0"],["p8cgxI3yPx8","YtVMnut7Foe","2014Q4","48.0"],["p8cgxI3yPx8","LGTVRhKSn1V","201401","8.0"],["p8cgxI3yPx8","LGTVRhKSn1V","201402","9.0"],["p8cgxI3yPx8","LGTVRhKSn1V","201403","30.0"],["p8cgxI3yPx8","LGTVRhKSn1V","2014Q1","47.0"],["p8cgxI3yPx8","LGTVRhKSn1V","201404","23.0"],["p8cgxI3yPx8","LGTVRhKSn1V","201405","3.0"],["p8cgxI3yPx8","LGTVRhKSn1V","201406","16.0"],["p8cgxI3yPx8","LGTVRhKSn1V","2014Q2","42.0"],["p8cgxI3yPx8","LGTVRhKSn1V","201407","19.0"],["p8cgxI3yPx8","LGTVRhKSn1V","201408","34.0"],["p8cgxI3yPx8","LGTVRhKSn1V","201409","2.0"],["p8cgxI3yPx8","LGTVRhKSn1V","2014Q3","55.0"],["p8cgxI3yPx8","LGTVRhKSn1V","201410","10.0"],["p8cgxI3yPx8","LGTVRhKSn1V","201411","3.0"],["p8cgxI3yPx8","LGTVRhKSn1V","201412","13.0"],["p8cgxI3yPx8","LGTVRhKSn1V","2014Q4","26.0"],["p8cgxI3yPx8","qg5ySBw9X5l","201401","5.0"],["p8cgxI3yPx8","qg5ySBw9X5l","201402","28.0"],["p8cgxI3yPx8","qg5ySBw9X5l","201403","0.0"],["p8cgxI3yPx8","qg5ySBw9X5l","2014Q1","33.0"],["p8cgxI3yPx8","qg5ySBw9X5l","201404","28.0"],["p8cgxI3yPx8","qg5ySBw9X5l","201405","8.0"],["p8cgxI3yPx8","qg5ySBw9X5l","201406","16.0"],["p8cgxI3yPx8","qg5ySBw9X5l","2014Q2","52.0"],["p8cgxI3yPx8","qg5ySBw9X5l","201407","19.0"],["p8cgxI3yPx8","qg5ySBw9X5l","201408","11.0"],["p8cgxI3yPx8","qg5ySBw9X5l","201409","11.0"],["p8cgxI3yPx8","qg5ySBw9X5l","2014Q3","41.0"],["p8cgxI3yPx8","qg5ySBw9X5l","201410","30.0"],["p8cgxI3yPx8","qg5ySBw9X5l","201411","17.0"],["p8cgxI3yPx8","qg5ySBw9X5l","201412","13.0"],["p8cgxI3yPx8","qg5ySBw9X5l","2014Q4","60.0"],["aSJKs4oPZAf","DWSo42hunXH","201401","35.0"],["aSJKs4oPZAf","DWSo42hunXH","201402","19.0"],["aSJKs4oPZAf","DWSo42hunXH","201403","24.0"],["aSJKs4oPZAf","DWSo42hunXH","2014Q1","78.0"],["aSJKs4oPZAf","DWSo42hunXH","201404","23.0"],["aSJKs4oPZAf","DWSo42hunXH","201405","16.0"],["aSJKs4oPZAf","DWSo42hunXH","201406","22.0"],["aSJKs4oPZAf","DWSo42hunXH","2014Q2","61.0"],["aSJKs4oPZAf","DWSo42hunXH","201407","14.0"],["aSJKs4oPZAf","DWSo42hunXH","201408","19.0"],["aSJKs4oPZAf","DWSo42hunXH","201409","18.0"],["aSJKs4oPZAf","DWSo42hunXH","2014Q3","51.0"],["aSJKs4oPZAf","DWSo42hunXH","201410","35.0"],["aSJKs4oPZAf","DWSo42hunXH","201411","36.0"],["aSJKs4oPZAf","DWSo42hunXH","201412","21.0"],["aSJKs4oPZAf","DWSo42hunXH","2014Q4","92.0"],["aSJKs4oPZAf","sWOWPBvwNY2","201401","28.0"],["aSJKs4oPZAf","sWOWPBvwNY2","201402","18.0"],["aSJKs4oPZAf","sWOWPBvwNY2","201403","26.0"],["aSJKs4oPZAf","sWOWPBvwNY2","2014Q1","72.0"],["aSJKs4oPZAf","sWOWPBvwNY2","201404","25.0"],["aSJKs4oPZAf","sWOWPBvwNY2","201405","29.0"],["aSJKs4oPZAf","sWOWPBvwNY2","201406","35.0"],["aSJKs4oPZAf","sWOWPBvwNY2","2014Q2","89.0"],["aSJKs4oPZAf","sWOWPBvwNY2","201407","19.0"],["aSJKs4oPZAf","sWOWPBvwNY2","201408","23.0"],["aSJKs4oPZAf","sWOWPBvwNY2","201409","21.0"],["aSJKs4oPZAf","sWOWPBvwNY2","2014Q3","63.0"],["aSJKs4oPZAf","sWOWPBvwNY2","201410","31.0"],["aSJKs4oPZAf","sWOWPBvwNY2","201411","27.0"],["aSJKs4oPZAf","sWOWPBvwNY2","201412","22.0"],["aSJKs4oPZAf","sWOWPBvwNY2","2014Q4","80.0"],["aSJKs4oPZAf","vAtZ8a924Lx","201401","68.0"],["aSJKs4oPZAf","vAtZ8a924Lx","201402","69.0"],["aSJKs4oPZAf","vAtZ8a924Lx","201403","35.0"],["aSJKs4oPZAf","vAtZ8a924Lx","2014Q1","172.0"],["aSJKs4oPZAf","vAtZ8a924Lx","201404","55.0"],["aSJKs4oPZAf","vAtZ8a924Lx","201405","38.0"],["aSJKs4oPZAf","vAtZ8a924Lx","201406","58.0"],["aSJKs4oPZAf","vAtZ8a924Lx","2014Q2","151.0"],["aSJKs4oPZAf","vAtZ8a924Lx","201407","38.0"],["aSJKs4oPZAf","vAtZ8a924Lx","201408","68.0"],["aSJKs4oPZAf","vAtZ8a924Lx","201409","81.0"],["aSJKs4oPZAf","vAtZ8a924Lx","2014Q3","187.0"],["aSJKs4oPZAf","vAtZ8a924Lx","201410","74.0"],["aSJKs4oPZAf","vAtZ8a924Lx","201411","87.0"],["aSJKs4oPZAf","vAtZ8a924Lx","201412","87.0"],["aSJKs4oPZAf","vAtZ8a924Lx","2014Q4","248.0"],["aSJKs4oPZAf","qarQhOt2OEh","201401","39.0"],["aSJKs4oPZAf","qarQhOt2OEh","201402","20.0"],["aSJKs4oPZAf","qarQhOt2OEh","201403","35.0"],["aSJKs4oPZAf","qarQhOt2OEh","2014Q1","94.0"],["aSJKs4oPZAf","qarQhOt2OEh","201404","273.0"],["aSJKs4oPZAf","qarQhOt2OEh","201405","23.0"],["aSJKs4oPZAf","qarQhOt2OEh","201406","12.0"],["aSJKs4oPZAf","qarQhOt2OEh","2014Q2","308.0"],["aSJKs4oPZAf","qarQhOt2OEh","201407","11.0"],["aSJKs4oPZAf","qarQhOt2OEh","201408","39.0"],["aSJKs4oPZAf","qarQhOt2OEh","201409","21.0"],["aSJKs4oPZAf","qarQhOt2OEh","2014Q3","71.0"],["aSJKs4oPZAf","qarQhOt2OEh","201410","10.0"],["aSJKs4oPZAf","qarQhOt2OEh","201411","58.0"],["aSJKs4oPZAf","qarQhOt2OEh","201412","26.0"],["aSJKs4oPZAf","qarQhOt2OEh","2014Q4","94.0"],["aSJKs4oPZAf","A3b5mw8DJYC","201401","360.0"],["aSJKs4oPZAf","A3b5mw8DJYC","201402","265.0"],["aSJKs4oPZAf","A3b5mw8DJYC","201403","322.0"],["aSJKs4oPZAf","A3b5mw8DJYC","2014Q1","947.0"],["aSJKs4oPZAf","A3b5mw8DJYC","201404","162.0"],["aSJKs4oPZAf","A3b5mw8DJYC","201405","133.0"],["aSJKs4oPZAf","A3b5mw8DJYC","201406","140.0"],["aSJKs4oPZAf","A3b5mw8DJYC","2014Q2","435.0"],["aSJKs4oPZAf","A3b5mw8DJYC","201407","222.0"],["aSJKs4oPZAf","A3b5mw8DJYC","201408","125.0"],["aSJKs4oPZAf","A3b5mw8DJYC","201409","138.0"],["aSJKs4oPZAf","A3b5mw8DJYC","2014Q3","485.0"],["aSJKs4oPZAf","A3b5mw8DJYC","201410","131.0"],["aSJKs4oPZAf","A3b5mw8DJYC","201411","158.0"],["aSJKs4oPZAf","A3b5mw8DJYC","201412","196.0"],["aSJKs4oPZAf","A3b5mw8DJYC","2014Q4","485.0"],["aSJKs4oPZAf","vU0Qt1A5IDz","201401","202.0"],["aSJKs4oPZAf","vU0Qt1A5IDz","201402","126.0"],["aSJKs4oPZAf","vU0Qt1A5IDz","201403","124.0"],["aSJKs4oPZAf","vU0Qt1A5IDz","2014Q1","452.0"],["aSJKs4oPZAf","vU0Qt1A5IDz","201404","122.0"],["aSJKs4oPZAf","vU0Qt1A5IDz","201405","83.0"],["aSJKs4oPZAf","vU0Qt1A5IDz","201406","107.0"],["aSJKs4oPZAf","vU0Qt1A5IDz","2014Q2","312.0"],["aSJKs4oPZAf","vU0Qt1A5IDz","201407","89.0"],["aSJKs4oPZAf","vU0Qt1A5IDz","201408","106.0"],["aSJKs4oPZAf","vU0Qt1A5IDz","201409","180.0"],["aSJKs4oPZAf","vU0Qt1A5IDz","2014Q3","375.0"],["aSJKs4oPZAf","vU0Qt1A5IDz","201410","63.0"],["aSJKs4oPZAf","vU0Qt1A5IDz","201411","84.0"],["aSJKs4oPZAf","vU0Qt1A5IDz","201412","89.0"],["aSJKs4oPZAf","vU0Qt1A5IDz","2014Q4","236.0"],["aSJKs4oPZAf","YtVMnut7Foe","201401","23.0"],["aSJKs4oPZAf","YtVMnut7Foe","201402","39.0"],["aSJKs4oPZAf","YtVMnut7Foe","201403","32.0"],["aSJKs4oPZAf","YtVMnut7Foe","2014Q1","94.0"],["aSJKs4oPZAf","YtVMnut7Foe","201404","46.0"],["aSJKs4oPZAf","YtVMnut7Foe","201405","35.0"],["aSJKs4oPZAf","YtVMnut7Foe","201406","63.0"],["aSJKs4oPZAf","YtVMnut7Foe","2014Q2","144.0"],["aSJKs4oPZAf","YtVMnut7Foe","201407","55.0"],["aSJKs4oPZAf","YtVMnut7Foe","201408","43.0"],["aSJKs4oPZAf","YtVMnut7Foe","201409","39.0"],["aSJKs4oPZAf","YtVMnut7Foe","2014Q3","137.0"],["aSJKs4oPZAf","YtVMnut7Foe","201410","42.0"],["aSJKs4oPZAf","YtVMnut7Foe","201411","41.0"],["aSJKs4oPZAf","YtVMnut7Foe","201412","41.0"],["aSJKs4oPZAf","YtVMnut7Foe","2014Q4","124.0"],["aSJKs4oPZAf","LGTVRhKSn1V","201401","77.0"],["aSJKs4oPZAf","LGTVRhKSn1V","201402","75.0"],["aSJKs4oPZAf","LGTVRhKSn1V","201403","75.0"],["aSJKs4oPZAf","LGTVRhKSn1V","2014Q1","227.0"],["aSJKs4oPZAf","LGTVRhKSn1V","201404","123.0"],["aSJKs4oPZAf","LGTVRhKSn1V","201405","78.0"],["aSJKs4oPZAf","LGTVRhKSn1V","201406","133.0"],["aSJKs4oPZAf","LGTVRhKSn1V","2014Q2","334.0"],["aSJKs4oPZAf","LGTVRhKSn1V","201407","71.0"],["aSJKs4oPZAf","LGTVRhKSn1V","201408","143.0"],["aSJKs4oPZAf","LGTVRhKSn1V","201409","104.0"],["aSJKs4oPZAf","LGTVRhKSn1V","2014Q3","318.0"],["aSJKs4oPZAf","LGTVRhKSn1V","201410","131.0"],["aSJKs4oPZAf","LGTVRhKSn1V","201411","120.0"],["aSJKs4oPZAf","LGTVRhKSn1V","201412","103.0"],["aSJKs4oPZAf","LGTVRhKSn1V","2014Q4","354.0"],["aSJKs4oPZAf","qg5ySBw9X5l","201401","15.0"],["aSJKs4oPZAf","qg5ySBw9X5l","201402","28.0"],["aSJKs4oPZAf","qg5ySBw9X5l","201403","18.0"],["aSJKs4oPZAf","qg5ySBw9X5l","2014Q1","61.0"],["aSJKs4oPZAf","qg5ySBw9X5l","201404","43.0"],["aSJKs4oPZAf","qg5ySBw9X5l","201405","19.0"],["aSJKs4oPZAf","qg5ySBw9X5l","201406","31.0"],["aSJKs4oPZAf","qg5ySBw9X5l","2014Q2","93.0"],["aSJKs4oPZAf","qg5ySBw9X5l","201407","49.0"],["aSJKs4oPZAf","qg5ySBw9X5l","201408","29.0"],["aSJKs4oPZAf","qg5ySBw9X5l","201409","23.0"],["aSJKs4oPZAf","qg5ySBw9X5l","2014Q3","101.0"],["aSJKs4oPZAf","qg5ySBw9X5l","201410","21.0"],["aSJKs4oPZAf","qg5ySBw9X5l","201411","39.0"],["aSJKs4oPZAf","qg5ySBw9X5l","201412","48.0"],["aSJKs4oPZAf","qg5ySBw9X5l","2014Q4","108.0"],["LpkdcaLc4I9","DWSo42hunXH","201401","108.0"],["LpkdcaLc4I9","DWSo42hunXH","201402","90.0"],["LpkdcaLc4I9","DWSo42hunXH","201403","135.0"],["LpkdcaLc4I9","DWSo42hunXH","2014Q1","333.0"],["LpkdcaLc4I9","DWSo42hunXH","201404","121.0"],["LpkdcaLc4I9","DWSo42hunXH","201405","137.0"],["LpkdcaLc4I9","DWSo42hunXH","201406","129.0"],["LpkdcaLc4I9","DWSo42hunXH","2014Q2","387.0"],["LpkdcaLc4I9","DWSo42hunXH","201407","139.0"],["LpkdcaLc4I9","DWSo42hunXH","201408","141.0"],["LpkdcaLc4I9","DWSo42hunXH","201409","142.0"],["LpkdcaLc4I9","DWSo42hunXH","2014Q3","422.0"],["LpkdcaLc4I9","DWSo42hunXH","201410","127.0"],["LpkdcaLc4I9","DWSo42hunXH","201411","123.0"],["LpkdcaLc4I9","DWSo42hunXH","201412","127.0"],["LpkdcaLc4I9","DWSo42hunXH","2014Q4","377.0"],["LpkdcaLc4I9","sWOWPBvwNY2","201401","89.0"],["LpkdcaLc4I9","sWOWPBvwNY2","201402","73.0"],["LpkdcaLc4I9","sWOWPBvwNY2","201403","90.0"],["LpkdcaLc4I9","sWOWPBvwNY2","2014Q1","252.0"],["LpkdcaLc4I9","sWOWPBvwNY2","201404","70.0"],["LpkdcaLc4I9","sWOWPBvwNY2","201405","89.0"],["LpkdcaLc4I9","sWOWPBvwNY2","201406","96.0"],["LpkdcaLc4I9","sWOWPBvwNY2","2014Q2","255.0"],["LpkdcaLc4I9","sWOWPBvwNY2","201407","96.0"],["LpkdcaLc4I9","sWOWPBvwNY2","201408","90.0"],["LpkdcaLc4I9","sWOWPBvwNY2","201409","96.0"],["LpkdcaLc4I9","sWOWPBvwNY2","2014Q3","282.0"],["LpkdcaLc4I9","sWOWPBvwNY2","201410","153.0"],["LpkdcaLc4I9","sWOWPBvwNY2","201411","124.0"],["LpkdcaLc4I9","sWOWPBvwNY2","201412","120.0"],["LpkdcaLc4I9","sWOWPBvwNY2","2014Q4","397.0"],["LpkdcaLc4I9","vAtZ8a924Lx","201401","284.0"],["LpkdcaLc4I9","vAtZ8a924Lx","201402","210.0"],["LpkdcaLc4I9","vAtZ8a924Lx","201403","218.0"],["LpkdcaLc4I9","vAtZ8a924Lx","2014Q1","712.0"],["LpkdcaLc4I9","vAtZ8a924Lx","201404","201.0"],["LpkdcaLc4I9","vAtZ8a924Lx","201405","198.0"],["LpkdcaLc4I9","vAtZ8a924Lx","201406","234.0"],["LpkdcaLc4I9","vAtZ8a924Lx","2014Q2","633.0"],["LpkdcaLc4I9","vAtZ8a924Lx","201407","228.0"],["LpkdcaLc4I9","vAtZ8a924Lx","201408","316.0"],["LpkdcaLc4I9","vAtZ8a924Lx","201409","273.0"],["LpkdcaLc4I9","vAtZ8a924Lx","2014Q3","817.0"],["LpkdcaLc4I9","vAtZ8a924Lx","201410","229.0"],["LpkdcaLc4I9","vAtZ8a924Lx","201411","251.0"],["LpkdcaLc4I9","vAtZ8a924Lx","201412","268.0"],["LpkdcaLc4I9","vAtZ8a924Lx","2014Q4","748.0"],["LpkdcaLc4I9","qarQhOt2OEh","201401","120.0"],["LpkdcaLc4I9","qarQhOt2OEh","201402","107.0"],["LpkdcaLc4I9","qarQhOt2OEh","201403","110.0"],["LpkdcaLc4I9","qarQhOt2OEh","2014Q1","337.0"],["LpkdcaLc4I9","qarQhOt2OEh","201404","84.0"],["LpkdcaLc4I9","qarQhOt2OEh","201405","100.0"],["LpkdcaLc4I9","qarQhOt2OEh","201406","98.0"],["LpkdcaLc4I9","qarQhOt2OEh","2014Q2","282.0"],["LpkdcaLc4I9","qarQhOt2OEh","201407","94.0"],["LpkdcaLc4I9","qarQhOt2OEh","201408","101.0"],["LpkdcaLc4I9","qarQhOt2OEh","201409","76.0"],["LpkdcaLc4I9","qarQhOt2OEh","2014Q3","271.0"],["LpkdcaLc4I9","qarQhOt2OEh","201410","104.0"],["LpkdcaLc4I9","qarQhOt2OEh","201411","96.0"],["LpkdcaLc4I9","qarQhOt2OEh","201412","151.0"],["LpkdcaLc4I9","qarQhOt2OEh","2014Q4","351.0"],["LpkdcaLc4I9","A3b5mw8DJYC","201401","341.0"],["LpkdcaLc4I9","A3b5mw8DJYC","201402","374.0"],["LpkdcaLc4I9","A3b5mw8DJYC","201403","427.0"],["LpkdcaLc4I9","A3b5mw8DJYC","2014Q1","1142.0"],["LpkdcaLc4I9","A3b5mw8DJYC","201404","480.0"],["LpkdcaLc4I9","A3b5mw8DJYC","201405","523.0"],["LpkdcaLc4I9","A3b5mw8DJYC","201406","733.0"],["LpkdcaLc4I9","A3b5mw8DJYC","2014Q2","1736.0"],["LpkdcaLc4I9","A3b5mw8DJYC","201407","520.0"],["LpkdcaLc4I9","A3b5mw8DJYC","201408","656.0"],["LpkdcaLc4I9","A3b5mw8DJYC","201409","525.0"],["LpkdcaLc4I9","A3b5mw8DJYC","2014Q3","1701.0"],["LpkdcaLc4I9","A3b5mw8DJYC","201410","531.0"],["LpkdcaLc4I9","A3b5mw8DJYC","201411","629.0"],["LpkdcaLc4I9","A3b5mw8DJYC","201412","594.0"],["LpkdcaLc4I9","A3b5mw8DJYC","2014Q4","1754.0"],["LpkdcaLc4I9","vU0Qt1A5IDz","201401","451.0"],["LpkdcaLc4I9","vU0Qt1A5IDz","201402","401.0"],["LpkdcaLc4I9","vU0Qt1A5IDz","201403","406.0"],["LpkdcaLc4I9","vU0Qt1A5IDz","2014Q1","1258.0"],["LpkdcaLc4I9","vU0Qt1A5IDz","201404","413.0"],["LpkdcaLc4I9","vU0Qt1A5IDz","201405","411.0"],["LpkdcaLc4I9","vU0Qt1A5IDz","201406","470.0"],["LpkdcaLc4I9","vU0Qt1A5IDz","2014Q2","1294.0"],["LpkdcaLc4I9","vU0Qt1A5IDz","201407","449.0"],["LpkdcaLc4I9","vU0Qt1A5IDz","201408","431.0"],["LpkdcaLc4I9","vU0Qt1A5IDz","201409","364.0"],["LpkdcaLc4I9","vU0Qt1A5IDz","2014Q3","1244.0"],["LpkdcaLc4I9","vU0Qt1A5IDz","201410","339.0"],["LpkdcaLc4I9","vU0Qt1A5IDz","201411","266.0"],["LpkdcaLc4I9","vU0Qt1A5IDz","201412","365.0"],["LpkdcaLc4I9","vU0Qt1A5IDz","2014Q4","970.0"],["LpkdcaLc4I9","YtVMnut7Foe","201401","135.0"],["LpkdcaLc4I9","YtVMnut7Foe","201402","107.0"],["LpkdcaLc4I9","YtVMnut7Foe","201403","126.0"],["LpkdcaLc4I9","YtVMnut7Foe","2014Q1","368.0"],["LpkdcaLc4I9","YtVMnut7Foe","201404","125.0"],["LpkdcaLc4I9","YtVMnut7Foe","201405","133.0"],["LpkdcaLc4I9","YtVMnut7Foe","201406","155.0"],["LpkdcaLc4I9","YtVMnut7Foe","2014Q2","413.0"],["LpkdcaLc4I9","YtVMnut7Foe","201407","133.0"],["LpkdcaLc4I9","YtVMnut7Foe","201408","137.0"],["LpkdcaLc4I9","YtVMnut7Foe","201409","144.0"],["LpkdcaLc4I9","YtVMnut7Foe","2014Q3","414.0"],["LpkdcaLc4I9","YtVMnut7Foe","201410","120.0"],["LpkdcaLc4I9","YtVMnut7Foe","201411","121.0"],["LpkdcaLc4I9","YtVMnut7Foe","201412","136.0"],["LpkdcaLc4I9","YtVMnut7Foe","2014Q4","377.0"],["LpkdcaLc4I9","LGTVRhKSn1V","201401","151.0"],["LpkdcaLc4I9","LGTVRhKSn1V","201402","165.0"],["LpkdcaLc4I9","LGTVRhKSn1V","201403","244.0"],["LpkdcaLc4I9","LGTVRhKSn1V","2014Q1","560.0"],["LpkdcaLc4I9","LGTVRhKSn1V","201404","173.0"],["LpkdcaLc4I9","LGTVRhKSn1V","201405","142.0"],["LpkdcaLc4I9","LGTVRhKSn1V","201406","137.0"],["LpkdcaLc4I9","LGTVRhKSn1V","2014Q2","452.0"],["LpkdcaLc4I9","LGTVRhKSn1V","201407","138.0"],["LpkdcaLc4I9","LGTVRhKSn1V","201408","133.0"],["LpkdcaLc4I9","LGTVRhKSn1V","201409","119.0"],["LpkdcaLc4I9","LGTVRhKSn1V","2014Q3","390.0"],["LpkdcaLc4I9","LGTVRhKSn1V","201410","85.0"],["LpkdcaLc4I9","LGTVRhKSn1V","201411","179.0"],["LpkdcaLc4I9","LGTVRhKSn1V","201412","81.0"],["LpkdcaLc4I9","LGTVRhKSn1V","2014Q4","345.0"],["LpkdcaLc4I9","qg5ySBw9X5l","201401","106.0"],["LpkdcaLc4I9","qg5ySBw9X5l","201402","101.0"],["LpkdcaLc4I9","qg5ySBw9X5l","201403","94.0"],["LpkdcaLc4I9","qg5ySBw9X5l","2014Q1","301.0"],["LpkdcaLc4I9","qg5ySBw9X5l","201404","86.0"],["LpkdcaLc4I9","qg5ySBw9X5l","201405","89.0"],["LpkdcaLc4I9","qg5ySBw9X5l","201406","145.0"],["LpkdcaLc4I9","qg5ySBw9X5l","2014Q2","320.0"],["LpkdcaLc4I9","qg5ySBw9X5l","201407","114.0"],["LpkdcaLc4I9","qg5ySBw9X5l","201408","122.0"],["LpkdcaLc4I9","qg5ySBw9X5l","201409","117.0"],["LpkdcaLc4I9","qg5ySBw9X5l","2014Q3","353.0"],["LpkdcaLc4I9","qg5ySBw9X5l","201410","87.0"],["LpkdcaLc4I9","qg5ySBw9X5l","201411","107.0"],["LpkdcaLc4I9","qg5ySBw9X5l","201412","180.0"],["LpkdcaLc4I9","qg5ySBw9X5l","2014Q4","374.0"],["p14JdJaG2aC","DWSo42hunXH","201401","0.0"],["p14JdJaG2aC","DWSo42hunXH","201402","25.0"],["p14JdJaG2aC","DWSo42hunXH","201403","5.0"],["p14JdJaG2aC","DWSo42hunXH","2014Q1","30.0"],["p14JdJaG2aC","DWSo42hunXH","201404","32.0"],["p14JdJaG2aC","DWSo42hunXH","201405","7.0"],["p14JdJaG2aC","DWSo42hunXH","201406","15.0"],["p14JdJaG2aC","DWSo42hunXH","2014Q2","54.0"],["p14JdJaG2aC","DWSo42hunXH","201407","1.0"],["p14JdJaG2aC","DWSo42hunXH","201408","19.0"],["p14JdJaG2aC","DWSo42hunXH","201409","4.0"],["p14JdJaG2aC","DWSo42hunXH","2014Q3","24.0"],["p14JdJaG2aC","DWSo42hunXH","201410","10.0"],["p14JdJaG2aC","DWSo42hunXH","201411","15.0"],["p14JdJaG2aC","DWSo42hunXH","201412","54.0"],["p14JdJaG2aC","DWSo42hunXH","2014Q4","79.0"],["p14JdJaG2aC","sWOWPBvwNY2","201401","17.0"],["p14JdJaG2aC","sWOWPBvwNY2","201402","16.0"],["p14JdJaG2aC","sWOWPBvwNY2","201403","16.0"],["p14JdJaG2aC","sWOWPBvwNY2","2014Q1","49.0"],["p14JdJaG2aC","sWOWPBvwNY2","201404","28.0"],["p14JdJaG2aC","sWOWPBvwNY2","201405","54.0"],["p14JdJaG2aC","sWOWPBvwNY2","201406","18.0"],["p14JdJaG2aC","sWOWPBvwNY2","2014Q2","100.0"],["p14JdJaG2aC","sWOWPBvwNY2","201407","42.0"],["p14JdJaG2aC","sWOWPBvwNY2","201408","34.0"],["p14JdJaG2aC","sWOWPBvwNY2","201409","71.0"],["p14JdJaG2aC","sWOWPBvwNY2","2014Q3","147.0"],["p14JdJaG2aC","sWOWPBvwNY2","201410","39.0"],["p14JdJaG2aC","sWOWPBvwNY2","201411","43.0"],["p14JdJaG2aC","sWOWPBvwNY2","201412","27.0"],["p14JdJaG2aC","sWOWPBvwNY2","2014Q4","109.0"],["p14JdJaG2aC","vAtZ8a924Lx","201401","11.0"],["p14JdJaG2aC","vAtZ8a924Lx","201402","8.0"],["p14JdJaG2aC","vAtZ8a924Lx","201403","33.0"],["p14JdJaG2aC","vAtZ8a924Lx","2014Q1","52.0"],["p14JdJaG2aC","vAtZ8a924Lx","201404","39.0"],["p14JdJaG2aC","vAtZ8a924Lx","201405","73.0"],["p14JdJaG2aC","vAtZ8a924Lx","201406","80.0"],["p14JdJaG2aC","vAtZ8a924Lx","2014Q2","192.0"],["p14JdJaG2aC","vAtZ8a924Lx","201407","45.0"],["p14JdJaG2aC","vAtZ8a924Lx","201408","105.0"],["p14JdJaG2aC","vAtZ8a924Lx","201409","106.0"],["p14JdJaG2aC","vAtZ8a924Lx","2014Q3","256.0"],["p14JdJaG2aC","vAtZ8a924Lx","201410","51.0"],["p14JdJaG2aC","vAtZ8a924Lx","201411","62.0"],["p14JdJaG2aC","vAtZ8a924Lx","201412","139.0"],["p14JdJaG2aC","vAtZ8a924Lx","2014Q4","252.0"],["p14JdJaG2aC","qarQhOt2OEh","201401","20.0"],["p14JdJaG2aC","qarQhOt2OEh","201402","105.0"],["p14JdJaG2aC","qarQhOt2OEh","201403","42.0"],["p14JdJaG2aC","qarQhOt2OEh","2014Q1","167.0"],["p14JdJaG2aC","qarQhOt2OEh","201404","39.0"],["p14JdJaG2aC","qarQhOt2OEh","201405","31.0"],["p14JdJaG2aC","qarQhOt2OEh","201406","34.0"],["p14JdJaG2aC","qarQhOt2OEh","2014Q2","104.0"],["p14JdJaG2aC","qarQhOt2OEh","201407","20.0"],["p14JdJaG2aC","qarQhOt2OEh","201408","46.0"],["p14JdJaG2aC","qarQhOt2OEh","201409","25.0"],["p14JdJaG2aC","qarQhOt2OEh","2014Q3","91.0"],["p14JdJaG2aC","qarQhOt2OEh","201410","31.0"],["p14JdJaG2aC","qarQhOt2OEh","201411","57.0"],["p14JdJaG2aC","qarQhOt2OEh","201412","19.0"],["p14JdJaG2aC","qarQhOt2OEh","2014Q4","107.0"],["p14JdJaG2aC","A3b5mw8DJYC","201401","131.0"],["p14JdJaG2aC","A3b5mw8DJYC","201402","141.0"],["p14JdJaG2aC","A3b5mw8DJYC","201403","112.0"],["p14JdJaG2aC","A3b5mw8DJYC","2014Q1","384.0"],["p14JdJaG2aC","A3b5mw8DJYC","201404","97.0"],["p14JdJaG2aC","A3b5mw8DJYC","201405","136.0"],["p14JdJaG2aC","A3b5mw8DJYC","201406","212.0"],["p14JdJaG2aC","A3b5mw8DJYC","2014Q2","445.0"],["p14JdJaG2aC","A3b5mw8DJYC","201407","179.0"],["p14JdJaG2aC","A3b5mw8DJYC","201408","201.0"],["p14JdJaG2aC","A3b5mw8DJYC","201409","173.0"],["p14JdJaG2aC","A3b5mw8DJYC","2014Q3","553.0"],["p14JdJaG2aC","A3b5mw8DJYC","201410","203.0"],["p14JdJaG2aC","A3b5mw8DJYC","201411","234.0"],["p14JdJaG2aC","A3b5mw8DJYC","201412","170.0"],["p14JdJaG2aC","A3b5mw8DJYC","2014Q4","607.0"],["p14JdJaG2aC","vU0Qt1A5IDz","201401","88.0"],["p14JdJaG2aC","vU0Qt1A5IDz","201402","66.0"],["p14JdJaG2aC","vU0Qt1A5IDz","201403","75.0"],["p14JdJaG2aC","vU0Qt1A5IDz","2014Q1","229.0"],["p14JdJaG2aC","vU0Qt1A5IDz","201404","69.0"],["p14JdJaG2aC","vU0Qt1A5IDz","201405","72.0"],["p14JdJaG2aC","vU0Qt1A5IDz","201406","118.0"],["p14JdJaG2aC","vU0Qt1A5IDz","2014Q2","259.0"],["p14JdJaG2aC","vU0Qt1A5IDz","201407","87.0"],["p14JdJaG2aC","vU0Qt1A5IDz","201408","136.0"],["p14JdJaG2aC","vU0Qt1A5IDz","201409","156.0"],["p14JdJaG2aC","vU0Qt1A5IDz","2014Q3","379.0"],["p14JdJaG2aC","vU0Qt1A5IDz","201410","107.0"],["p14JdJaG2aC","vU0Qt1A5IDz","201411","140.0"],["p14JdJaG2aC","vU0Qt1A5IDz","201412","80.0"],["p14JdJaG2aC","vU0Qt1A5IDz","2014Q4","327.0"],["p14JdJaG2aC","YtVMnut7Foe","201401","29.0"],["p14JdJaG2aC","YtVMnut7Foe","201402","22.0"],["p14JdJaG2aC","YtVMnut7Foe","201403","28.0"],["p14JdJaG2aC","YtVMnut7Foe","2014Q1","79.0"],["p14JdJaG2aC","YtVMnut7Foe","201404","26.0"],["p14JdJaG2aC","YtVMnut7Foe","201405","43.0"],["p14JdJaG2aC","YtVMnut7Foe","201406","48.0"],["p14JdJaG2aC","YtVMnut7Foe","2014Q2","117.0"],["p14JdJaG2aC","YtVMnut7Foe","201407","24.0"],["p14JdJaG2aC","YtVMnut7Foe","201408","131.0"],["p14JdJaG2aC","YtVMnut7Foe","201409","39.0"],["p14JdJaG2aC","YtVMnut7Foe","2014Q3","194.0"],["p14JdJaG2aC","YtVMnut7Foe","201410","32.0"],["p14JdJaG2aC","YtVMnut7Foe","201411","54.0"],["p14JdJaG2aC","YtVMnut7Foe","201412","76.0"],["p14JdJaG2aC","YtVMnut7Foe","2014Q4","162.0"],["p14JdJaG2aC","LGTVRhKSn1V","201401","45.0"],["p14JdJaG2aC","LGTVRhKSn1V","201402","42.0"],["p14JdJaG2aC","LGTVRhKSn1V","201403","80.0"],["p14JdJaG2aC","LGTVRhKSn1V","2014Q1","167.0"],["p14JdJaG2aC","LGTVRhKSn1V","201404","34.0"],["p14JdJaG2aC","LGTVRhKSn1V","201405","116.0"],["p14JdJaG2aC","LGTVRhKSn1V","201406","107.0"],["p14JdJaG2aC","LGTVRhKSn1V","2014Q2","257.0"],["p14JdJaG2aC","LGTVRhKSn1V","201407","82.0"],["p14JdJaG2aC","LGTVRhKSn1V","201408","62.0"],["p14JdJaG2aC","LGTVRhKSn1V","201409","132.0"],["p14JdJaG2aC","LGTVRhKSn1V","2014Q3","276.0"],["p14JdJaG2aC","LGTVRhKSn1V","201410","43.0"],["p14JdJaG2aC","LGTVRhKSn1V","201411","49.0"],["p14JdJaG2aC","LGTVRhKSn1V","201412","69.0"],["p14JdJaG2aC","LGTVRhKSn1V","2014Q4","161.0"],["p14JdJaG2aC","qg5ySBw9X5l","201401","25.0"],["p14JdJaG2aC","qg5ySBw9X5l","201402","34.0"],["p14JdJaG2aC","qg5ySBw9X5l","201403","29.0"],["p14JdJaG2aC","qg5ySBw9X5l","2014Q1","88.0"],["p14JdJaG2aC","qg5ySBw9X5l","201404","36.0"],["p14JdJaG2aC","qg5ySBw9X5l","201405","39.0"],["p14JdJaG2aC","qg5ySBw9X5l","201406","48.0"],["p14JdJaG2aC","qg5ySBw9X5l","2014Q2","123.0"],["p14JdJaG2aC","qg5ySBw9X5l","201407","79.0"],["p14JdJaG2aC","qg5ySBw9X5l","201408","48.0"],["p14JdJaG2aC","qg5ySBw9X5l","201409","85.0"],["p14JdJaG2aC","qg5ySBw9X5l","2014Q3","212.0"],["p14JdJaG2aC","qg5ySBw9X5l","201410","23.0"],["p14JdJaG2aC","qg5ySBw9X5l","201411","41.0"],["p14JdJaG2aC","qg5ySBw9X5l","201412","56.0"],["p14JdJaG2aC","qg5ySBw9X5l","2014Q4","120.0"],["GvbkEo6sfSd","DWSo42hunXH","201401","0.0"],["GvbkEo6sfSd","DWSo42hunXH","201402","10.0"],["GvbkEo6sfSd","DWSo42hunXH","201403","4.0"],["GvbkEo6sfSd","DWSo42hunXH","2014Q1","14.0"],["GvbkEo6sfSd","DWSo42hunXH","201404","13.0"],["GvbkEo6sfSd","DWSo42hunXH","201405","1.0"],["GvbkEo6sfSd","DWSo42hunXH","201406","2.0"],["GvbkEo6sfSd","DWSo42hunXH","2014Q2","16.0"],["GvbkEo6sfSd","DWSo42hunXH","201407","1.0"],["GvbkEo6sfSd","DWSo42hunXH","201408","0.0"],["GvbkEo6sfSd","DWSo42hunXH","201409","0.0"],["GvbkEo6sfSd","DWSo42hunXH","2014Q3","1.0"],["GvbkEo6sfSd","DWSo42hunXH","201410","4.0"],["GvbkEo6sfSd","DWSo42hunXH","201411","6.0"],["GvbkEo6sfSd","DWSo42hunXH","201412","9.0"],["GvbkEo6sfSd","DWSo42hunXH","2014Q4","19.0"],["GvbkEo6sfSd","sWOWPBvwNY2","201401","8.0"],["GvbkEo6sfSd","sWOWPBvwNY2","201402","1.0"],["GvbkEo6sfSd","sWOWPBvwNY2","201403","5.0"],["GvbkEo6sfSd","sWOWPBvwNY2","2014Q1","14.0"],["GvbkEo6sfSd","sWOWPBvwNY2","201404","6.0"],["GvbkEo6sfSd","sWOWPBvwNY2","201405","22.0"],["GvbkEo6sfSd","sWOWPBvwNY2","201406","3.0"],["GvbkEo6sfSd","sWOWPBvwNY2","2014Q2","31.0"],["GvbkEo6sfSd","sWOWPBvwNY2","201407","12.0"],["GvbkEo6sfSd","sWOWPBvwNY2","201408","6.0"],["GvbkEo6sfSd","sWOWPBvwNY2","201409","19.0"],["GvbkEo6sfSd","sWOWPBvwNY2","2014Q3","37.0"],["GvbkEo6sfSd","sWOWPBvwNY2","201410","11.0"],["GvbkEo6sfSd","sWOWPBvwNY2","201411","6.0"],["GvbkEo6sfSd","sWOWPBvwNY2","201412","7.0"],["GvbkEo6sfSd","sWOWPBvwNY2","2014Q4","24.0"],["GvbkEo6sfSd","vAtZ8a924Lx","201401","5.0"],["GvbkEo6sfSd","vAtZ8a924Lx","201402","3.0"],["GvbkEo6sfSd","vAtZ8a924Lx","201403","7.0"],["GvbkEo6sfSd","vAtZ8a924Lx","2014Q1","15.0"],["GvbkEo6sfSd","vAtZ8a924Lx","201404","13.0"],["GvbkEo6sfSd","vAtZ8a924Lx","201405","8.0"],["GvbkEo6sfSd","vAtZ8a924Lx","201406","0.0"],["GvbkEo6sfSd","vAtZ8a924Lx","2014Q2","21.0"],["GvbkEo6sfSd","vAtZ8a924Lx","201407","5.0"],["GvbkEo6sfSd","vAtZ8a924Lx","201408","26.0"],["GvbkEo6sfSd","vAtZ8a924Lx","201409","24.0"],["GvbkEo6sfSd","vAtZ8a924Lx","2014Q3","55.0"],["GvbkEo6sfSd","vAtZ8a924Lx","201410","5.0"],["GvbkEo6sfSd","vAtZ8a924Lx","201411","9.0"],["GvbkEo6sfSd","vAtZ8a924Lx","201412","18.0"],["GvbkEo6sfSd","vAtZ8a924Lx","2014Q4","32.0"],["GvbkEo6sfSd","qarQhOt2OEh","201401","10.0"],["GvbkEo6sfSd","qarQhOt2OEh","201402","4.0"],["GvbkEo6sfSd","qarQhOt2OEh","201403","22.0"],["GvbkEo6sfSd","qarQhOt2OEh","2014Q1","36.0"],["GvbkEo6sfSd","qarQhOt2OEh","201404","10.0"],["GvbkEo6sfSd","qarQhOt2OEh","201405","4.0"],["GvbkEo6sfSd","qarQhOt2OEh","201406","33.0"],["GvbkEo6sfSd","qarQhOt2OEh","2014Q2","47.0"],["GvbkEo6sfSd","qarQhOt2OEh","201407","5.0"],["GvbkEo6sfSd","qarQhOt2OEh","201408","5.0"],["GvbkEo6sfSd","qarQhOt2OEh","201409","1.0"],["GvbkEo6sfSd","qarQhOt2OEh","2014Q3","11.0"],["GvbkEo6sfSd","qarQhOt2OEh","201410","12.0"],["GvbkEo6sfSd","qarQhOt2OEh","201411","10.0"],["GvbkEo6sfSd","qarQhOt2OEh","201412","5.0"],["GvbkEo6sfSd","qarQhOt2OEh","2014Q4","27.0"],["GvbkEo6sfSd","A3b5mw8DJYC","201401","14.0"],["GvbkEo6sfSd","A3b5mw8DJYC","201402","30.0"],["GvbkEo6sfSd","A3b5mw8DJYC","201403","30.0"],["GvbkEo6sfSd","A3b5mw8DJYC","2014Q1","74.0"],["GvbkEo6sfSd","A3b5mw8DJYC","201404","10.0"],["GvbkEo6sfSd","A3b5mw8DJYC","201405","10.0"],["GvbkEo6sfSd","A3b5mw8DJYC","201406","52.0"],["GvbkEo6sfSd","A3b5mw8DJYC","2014Q2","72.0"],["GvbkEo6sfSd","A3b5mw8DJYC","201407","24.0"],["GvbkEo6sfSd","A3b5mw8DJYC","201408","29.0"],["GvbkEo6sfSd","A3b5mw8DJYC","201409","34.0"],["GvbkEo6sfSd","A3b5mw8DJYC","2014Q3","87.0"],["GvbkEo6sfSd","A3b5mw8DJYC","201410","13.0"],["GvbkEo6sfSd","A3b5mw8DJYC","201411","20.0"],["GvbkEo6sfSd","A3b5mw8DJYC","201412","21.0"],["GvbkEo6sfSd","A3b5mw8DJYC","2014Q4","54.0"],["GvbkEo6sfSd","vU0Qt1A5IDz","201401","4.0"],["GvbkEo6sfSd","vU0Qt1A5IDz","201402","1.0"],["GvbkEo6sfSd","vU0Qt1A5IDz","201403","4.0"],["GvbkEo6sfSd","vU0Qt1A5IDz","2014Q1","9.0"],["GvbkEo6sfSd","vU0Qt1A5IDz","201404","7.0"],["GvbkEo6sfSd","vU0Qt1A5IDz","201405","2.0"],["GvbkEo6sfSd","vU0Qt1A5IDz","201406","17.0"],["GvbkEo6sfSd","vU0Qt1A5IDz","2014Q2","26.0"],["GvbkEo6sfSd","vU0Qt1A5IDz","201407","15.0"],["GvbkEo6sfSd","vU0Qt1A5IDz","201408","33.0"],["GvbkEo6sfSd","vU0Qt1A5IDz","201409","8.0"],["GvbkEo6sfSd","vU0Qt1A5IDz","2014Q3","56.0"],["GvbkEo6sfSd","vU0Qt1A5IDz","201410","12.0"],["GvbkEo6sfSd","vU0Qt1A5IDz","201411","16.0"],["GvbkEo6sfSd","vU0Qt1A5IDz","201412","12.0"],["GvbkEo6sfSd","vU0Qt1A5IDz","2014Q4","40.0"],["GvbkEo6sfSd","YtVMnut7Foe","201401","10.0"],["GvbkEo6sfSd","YtVMnut7Foe","201402","12.0"],["GvbkEo6sfSd","YtVMnut7Foe","201403","12.0"],["GvbkEo6sfSd","YtVMnut7Foe","2014Q1","34.0"],["GvbkEo6sfSd","YtVMnut7Foe","201404","8.0"],["GvbkEo6sfSd","YtVMnut7Foe","201405","29.0"],["GvbkEo6sfSd","YtVMnut7Foe","201406","19.0"],["GvbkEo6sfSd","YtVMnut7Foe","2014Q2","56.0"],["GvbkEo6sfSd","YtVMnut7Foe","201407","13.0"],["GvbkEo6sfSd","YtVMnut7Foe","201408","32.0"],["GvbkEo6sfSd","YtVMnut7Foe","201409","9.0"],["GvbkEo6sfSd","YtVMnut7Foe","2014Q3","54.0"],["GvbkEo6sfSd","YtVMnut7Foe","201410","13.0"],["GvbkEo6sfSd","YtVMnut7Foe","201411","13.0"],["GvbkEo6sfSd","YtVMnut7Foe","201412","21.0"],["GvbkEo6sfSd","YtVMnut7Foe","2014Q4","47.0"],["GvbkEo6sfSd","LGTVRhKSn1V","201401","13.0"],["GvbkEo6sfSd","LGTVRhKSn1V","201402","48.0"],["GvbkEo6sfSd","LGTVRhKSn1V","201403","2349.0"],["GvbkEo6sfSd","LGTVRhKSn1V","2014Q1","2410.0"],["GvbkEo6sfSd","LGTVRhKSn1V","201404","14.0"],["GvbkEo6sfSd","LGTVRhKSn1V","201405","29.0"],["GvbkEo6sfSd","LGTVRhKSn1V","201406","21.0"],["GvbkEo6sfSd","LGTVRhKSn1V","2014Q2","64.0"],["GvbkEo6sfSd","LGTVRhKSn1V","201407","19.0"],["GvbkEo6sfSd","LGTVRhKSn1V","201408","21.0"],["GvbkEo6sfSd","LGTVRhKSn1V","201409","16.0"],["GvbkEo6sfSd","LGTVRhKSn1V","2014Q3","56.0"],["GvbkEo6sfSd","LGTVRhKSn1V","201410","6.0"],["GvbkEo6sfSd","LGTVRhKSn1V","201411","7.0"],["GvbkEo6sfSd","LGTVRhKSn1V","201412","7.0"],["GvbkEo6sfSd","LGTVRhKSn1V","2014Q4","20.0"],["GvbkEo6sfSd","qg5ySBw9X5l","201401","6.0"],["GvbkEo6sfSd","qg5ySBw9X5l","201402","6.0"],["GvbkEo6sfSd","qg5ySBw9X5l","201403","7.0"],["GvbkEo6sfSd","qg5ySBw9X5l","2014Q1","19.0"],["GvbkEo6sfSd","qg5ySBw9X5l","201404","7.0"],["GvbkEo6sfSd","qg5ySBw9X5l","201405","9.0"],["GvbkEo6sfSd","qg5ySBw9X5l","201406","4.0"],["GvbkEo6sfSd","qg5ySBw9X5l","2014Q2","20.0"],["GvbkEo6sfSd","qg5ySBw9X5l","201407","6.0"],["GvbkEo6sfSd","qg5ySBw9X5l","201408","12.0"],["GvbkEo6sfSd","qg5ySBw9X5l","201409","13.0"],["GvbkEo6sfSd","qg5ySBw9X5l","2014Q3","31.0"],["GvbkEo6sfSd","qg5ySBw9X5l","201410","2.0"],["GvbkEo6sfSd","qg5ySBw9X5l","201411","2.0"],["GvbkEo6sfSd","qg5ySBw9X5l","201412","9.0"],["GvbkEo6sfSd","qg5ySBw9X5l","2014Q4","13.0"],["QRCRjFreECE","DWSo42hunXH","201401","0.0"],["QRCRjFreECE","DWSo42hunXH","201402","0.0"],["QRCRjFreECE","DWSo42hunXH","201403","0.0"],["QRCRjFreECE","DWSo42hunXH","2014Q1","0.0"],["QRCRjFreECE","DWSo42hunXH","201404","0.0"],["QRCRjFreECE","DWSo42hunXH","201405","0.0"],["QRCRjFreECE","DWSo42hunXH","201406","0.0"],["QRCRjFreECE","DWSo42hunXH","2014Q2","0.0"],["QRCRjFreECE","DWSo42hunXH","201407","0.0"],["QRCRjFreECE","DWSo42hunXH","201408","4.0"],["QRCRjFreECE","DWSo42hunXH","201409","0.0"],["QRCRjFreECE","DWSo42hunXH","2014Q3","4.0"],["QRCRjFreECE","DWSo42hunXH","201410","0.0"],["QRCRjFreECE","DWSo42hunXH","201411","0.0"],["QRCRjFreECE","DWSo42hunXH","201412","0.0"],["QRCRjFreECE","DWSo42hunXH","2014Q4","0.0"],["QRCRjFreECE","sWOWPBvwNY2","201401","2.0"],["QRCRjFreECE","sWOWPBvwNY2","201402","5.0"],["QRCRjFreECE","sWOWPBvwNY2","201403","0.0"],["QRCRjFreECE","sWOWPBvwNY2","2014Q1","7.0"],["QRCRjFreECE","sWOWPBvwNY2","201404","0.0"],["QRCRjFreECE","sWOWPBvwNY2","201405","3.0"],["QRCRjFreECE","sWOWPBvwNY2","201406","0.0"],["QRCRjFreECE","sWOWPBvwNY2","2014Q2","3.0"],["QRCRjFreECE","sWOWPBvwNY2","201407","1.0"],["QRCRjFreECE","sWOWPBvwNY2","201408","2.0"],["QRCRjFreECE","sWOWPBvwNY2","201409","1.0"],["QRCRjFreECE","sWOWPBvwNY2","2014Q3","4.0"],["QRCRjFreECE","sWOWPBvwNY2","201410","3.0"],["QRCRjFreECE","sWOWPBvwNY2","201411","4.0"],["QRCRjFreECE","sWOWPBvwNY2","201412","2.0"],["QRCRjFreECE","sWOWPBvwNY2","2014Q4","9.0"],["QRCRjFreECE","vAtZ8a924Lx","201401","7.0"],["QRCRjFreECE","vAtZ8a924Lx","201402","0.0"],["QRCRjFreECE","vAtZ8a924Lx","201403","1.0"],["QRCRjFreECE","vAtZ8a924Lx","2014Q1","8.0"],["QRCRjFreECE","vAtZ8a924Lx","201404","0.0"],["QRCRjFreECE","vAtZ8a924Lx","201405","1.0"],["QRCRjFreECE","vAtZ8a924Lx","201406","0.0"],["QRCRjFreECE","vAtZ8a924Lx","2014Q2","1.0"],["QRCRjFreECE","vAtZ8a924Lx","201407","0.0"],["QRCRjFreECE","vAtZ8a924Lx","201408","0.0"],["QRCRjFreECE","vAtZ8a924Lx","201409","4.0"],["QRCRjFreECE","vAtZ8a924Lx","2014Q3","4.0"],["QRCRjFreECE","vAtZ8a924Lx","201410","0.0"],["QRCRjFreECE","vAtZ8a924Lx","201411","11.0"],["QRCRjFreECE","vAtZ8a924Lx","201412","3.0"],["QRCRjFreECE","vAtZ8a924Lx","2014Q4","14.0"],["QRCRjFreECE","qarQhOt2OEh","201401","0.0"],["QRCRjFreECE","qarQhOt2OEh","201402","0.0"],["QRCRjFreECE","qarQhOt2OEh","201403","0.0"],["QRCRjFreECE","qarQhOt2OEh","2014Q1","0.0"],["QRCRjFreECE","qarQhOt2OEh","201404","2.0"],["QRCRjFreECE","qarQhOt2OEh","201405","0.0"],["QRCRjFreECE","qarQhOt2OEh","201406","6.0"],["QRCRjFreECE","qarQhOt2OEh","2014Q2","8.0"],["QRCRjFreECE","qarQhOt2OEh","201407","3.0"],["QRCRjFreECE","qarQhOt2OEh","201408","0.0"],["QRCRjFreECE","qarQhOt2OEh","201409","0.0"],["QRCRjFreECE","qarQhOt2OEh","2014Q3","3.0"],["QRCRjFreECE","qarQhOt2OEh","201410","0.0"],["QRCRjFreECE","qarQhOt2OEh","201411","0.0"],["QRCRjFreECE","qarQhOt2OEh","201412","0.0"],["QRCRjFreECE","qarQhOt2OEh","2014Q4","0.0"],["QRCRjFreECE","A3b5mw8DJYC","201401","0.0"],["QRCRjFreECE","A3b5mw8DJYC","201402","0.0"],["QRCRjFreECE","A3b5mw8DJYC","201403","17.0"],["QRCRjFreECE","A3b5mw8DJYC","2014Q1","17.0"],["QRCRjFreECE","A3b5mw8DJYC","201404","3.0"],["QRCRjFreECE","A3b5mw8DJYC","201405","0.0"],["QRCRjFreECE","A3b5mw8DJYC","201406","3.0"],["QRCRjFreECE","A3b5mw8DJYC","2014Q2","6.0"],["QRCRjFreECE","A3b5mw8DJYC","201407","6.0"],["QRCRjFreECE","A3b5mw8DJYC","201408","6.0"],["QRCRjFreECE","A3b5mw8DJYC","201409","28.0"],["QRCRjFreECE","A3b5mw8DJYC","2014Q3","40.0"],["QRCRjFreECE","A3b5mw8DJYC","201410","0.0"],["QRCRjFreECE","A3b5mw8DJYC","201411","7.0"],["QRCRjFreECE","A3b5mw8DJYC","201412","6.0"],["QRCRjFreECE","A3b5mw8DJYC","2014Q4","13.0"],["QRCRjFreECE","vU0Qt1A5IDz","201401","2.0"],["QRCRjFreECE","vU0Qt1A5IDz","201402","4.0"],["QRCRjFreECE","vU0Qt1A5IDz","201403","0.0"],["QRCRjFreECE","vU0Qt1A5IDz","2014Q1","6.0"],["QRCRjFreECE","vU0Qt1A5IDz","201404","0.0"],["QRCRjFreECE","vU0Qt1A5IDz","201405","0.0"],["QRCRjFreECE","vU0Qt1A5IDz","201406","13.0"],["QRCRjFreECE","vU0Qt1A5IDz","2014Q2","13.0"],["QRCRjFreECE","vU0Qt1A5IDz","201407","3.0"],["QRCRjFreECE","vU0Qt1A5IDz","201408","0.0"],["QRCRjFreECE","vU0Qt1A5IDz","201409","0.0"],["QRCRjFreECE","vU0Qt1A5IDz","2014Q3","3.0"],["QRCRjFreECE","vU0Qt1A5IDz","201410","4.0"],["QRCRjFreECE","vU0Qt1A5IDz","201411","0.0"],["QRCRjFreECE","vU0Qt1A5IDz","201412","37.0"],["QRCRjFreECE","vU0Qt1A5IDz","2014Q4","41.0"],["QRCRjFreECE","YtVMnut7Foe","201401","8.0"],["QRCRjFreECE","YtVMnut7Foe","201402","2.0"],["QRCRjFreECE","YtVMnut7Foe","201403","4.0"],["QRCRjFreECE","YtVMnut7Foe","2014Q1","14.0"],["QRCRjFreECE","YtVMnut7Foe","201404","0.0"],["QRCRjFreECE","YtVMnut7Foe","201405","17.0"],["QRCRjFreECE","YtVMnut7Foe","201406","0.0"],["QRCRjFreECE","YtVMnut7Foe","2014Q2","17.0"],["QRCRjFreECE","YtVMnut7Foe","201407","1.0"],["QRCRjFreECE","YtVMnut7Foe","201408","0.0"],["QRCRjFreECE","YtVMnut7Foe","201409","0.0"],["QRCRjFreECE","YtVMnut7Foe","2014Q3","1.0"],["QRCRjFreECE","YtVMnut7Foe","201410","2.0"],["QRCRjFreECE","YtVMnut7Foe","201411","0.0"],["QRCRjFreECE","YtVMnut7Foe","201412","0.0"],["QRCRjFreECE","YtVMnut7Foe","2014Q4","2.0"],["QRCRjFreECE","LGTVRhKSn1V","201401","0.0"],["QRCRjFreECE","LGTVRhKSn1V","201402","0.0"],["QRCRjFreECE","LGTVRhKSn1V","201403","2.0"],["QRCRjFreECE","LGTVRhKSn1V","2014Q1","2.0"],["QRCRjFreECE","LGTVRhKSn1V","201404","5.0"],["QRCRjFreECE","LGTVRhKSn1V","201405","2.0"],["QRCRjFreECE","LGTVRhKSn1V","201406","0.0"],["QRCRjFreECE","LGTVRhKSn1V","2014Q2","7.0"],["QRCRjFreECE","LGTVRhKSn1V","201407","0.0"],["QRCRjFreECE","LGTVRhKSn1V","201408","0.0"],["QRCRjFreECE","LGTVRhKSn1V","201409","1.0"],["QRCRjFreECE","LGTVRhKSn1V","2014Q3","1.0"],["QRCRjFreECE","LGTVRhKSn1V","201410","0.0"],["QRCRjFreECE","LGTVRhKSn1V","201411","1.0"],["QRCRjFreECE","LGTVRhKSn1V","201412","1.0"],["QRCRjFreECE","LGTVRhKSn1V","2014Q4","2.0"],["QRCRjFreECE","qg5ySBw9X5l","201401","0.0"],["QRCRjFreECE","qg5ySBw9X5l","201402","2.0"],["QRCRjFreECE","qg5ySBw9X5l","201403","204.0"],["QRCRjFreECE","qg5ySBw9X5l","2014Q1","206.0"],["QRCRjFreECE","qg5ySBw9X5l","201404","5.0"],["QRCRjFreECE","qg5ySBw9X5l","201405","7.0"],["QRCRjFreECE","qg5ySBw9X5l","201406","7.0"],["QRCRjFreECE","qg5ySBw9X5l","2014Q2","19.0"],["QRCRjFreECE","qg5ySBw9X5l","201407","0.0"],["QRCRjFreECE","qg5ySBw9X5l","201408","5.0"],["QRCRjFreECE","qg5ySBw9X5l","201409","0.0"],["QRCRjFreECE","qg5ySBw9X5l","2014Q3","5.0"],["QRCRjFreECE","qg5ySBw9X5l","201410","1.0"],["QRCRjFreECE","qg5ySBw9X5l","201411","1.0"],["QRCRjFreECE","qg5ySBw9X5l","201412","0.0"],["QRCRjFreECE","qg5ySBw9X5l","2014Q4","2.0"]],"width":4,"height":1008};

        $scope.geographicalZones = {"name":"FP Geographical Zones","id":"eVyUn5tE93t","organisationUnitGroups":[{"name":"Southern Highlands Zone","id":"kcE3vG4Eq3Q","organisationUnits":[{"name":"Katavi Region","id":"DWSo42hunXH","children":[{"name":"Mpanda Town Council","id":"jupsOTyKi1W"},{"name":"Mpanda District Council","id":"aVLidCZ2RYk"},{"name":"Mlele District Council","id":"cjlkhW8VMDO"},{"name":"Nsimbo District Council","id":"PKl52zU7vuH"}]},{"name":"Iringa Region","id":"sWOWPBvwNY2","children":[{"name":"Mafinga Town Council","id":"chzBato6xed"},{"name":"Iringa District Council","id":"tcZz4Bh4mqc"},{"name":"Kilolo District Council","id":"xBWOfftpkLT"},{"name":"Mufindi District Council","id":"ppnbxB0TxjG"},{"name":"Iringa Municipal Council","id":"vo788oc0NEn"}]},{"name":"Rukwa Region","id":"vAtZ8a924Lx","children":[{"name":"Sumbawanga District Council","id":"cb9rqgLXFeh"},{"name":"Sumbawanga Municipal Council","id":"cZMveFzVrXh"},{"name":"Nkasi District Council","id":"iEIdCVxSJct"},{"name":"Kalambo District Council","id":"QeMjl7Ld0Vj"}]},{"name":"Njombe Region","id":"qarQhOt2OEh","children":[{"name":"Wanging'ombe District Council","id":"m4ow47nd3DC"},{"name":"Makambako Town Council","id":"cirtJ7KuNU0"},{"name":"Makete District Council","id":"NzvekEmEzUG"},{"name":"Njombe Town Council","id":"QUTWca9YxNb"},{"name":"Njombe District Council","id":"GOmwoDIGL98"},{"name":"Ludewa District Council","id":"aa5sxEFiAwN"}]},{"name":"Mbeya Region","id":"A3b5mw8DJYC","children":[{"name":"Mbarali District Council","id":"AvfNRAIsvhg"},{"name":"Momba District Council","id":"d07Wtk7brGz"},{"name":"Chunya District Council","id":"L9scGbK6d61"},{"name":"Rungwe District Council","id":"dPzNEI2Cxqj"},{"name":"Tunduma Town Council","id":"fqlNpTvqMw4"},{"name":"Mbeya District Council","id":"N5FKtARi6dB"},{"name":"Ileje District Council","id":"wsCWwNbLJNY"},{"name":"Mbozi District Council","id":"aouUIozrc7I"},{"name":"Mbeya City Council","id":"e3ATlebHNrD"},{"name":"Kyela District Council","id":"dWfRpHKykpk"},{"name":"Busokelo District Council","id":"xVzeWrXHf81"}]}]},{"name":"Northern Zone","id":"nvKJnetaMxk","organisationUnits":[{"name":"Tanga Region","id":"vU0Qt1A5IDz","children":[{"name":"Bumbuli District Council","id":"gu92DYtO3ii"},{"name":"Pangani District Council","id":"rQS2cX4JH88"},{"name":"Lushoto District Council","id":"ilY7TEjviqa"},{"name":"Handeni District Council","id":"DkxlFk8MuM7"},{"name":"Korogwe District Council","id":"QBC1po2JaJW"},{"name":"Mkinga District Council","id":"B9idcF4fOIW"},{"name":"Muheza District Council","id":"H2LvCkw2bCO"},{"name":"Kilindi District Council","id":"mKI72g04l0D"},{"name":"Korogwe Town Council","id":"qHJkyM0bG8U"},{"name":"Tanga City Council","id":"ySuyuvNNFp8"}]},{"name":"Arusha Region","id":"YtVMnut7Foe","children":[{"name":"Longido District Council","id":"aQEZnk4RzKv"},{"name":"Karatu District Council","id":"QKEr8DFutO8"},{"name":"Arusha City Council","id":"lgZ6HfZaj3f"},{"name":"Ngorongoro District Council","id":"PHWaJvzTmL8"},{"name":"Meru District Council","id":"uafqZbOYpVL"},{"name":"Arusha District Council","id":"zHa2ohFrpPM"},{"name":"Monduli District Council","id":"D21VsjNL2LB"}]}]},{"name":"Central Zone","id":"gzWRK9qFFVp","organisationUnits":[{"name":"Singida Region","id":"LGTVRhKSn1V","children":[{"name":"Ikungi District Council","id":"dFCrIa5paz7"},{"name":"Singida Municipal Council","id":"V60DkMrlQ5Q"},{"name":"Singida District Council","id":"RHLUbsrsFoE"},{"name":"Manyoni District Council","id":"uHp3aLKA6Tn"},{"name":"Iramba District Council","id":"tNFOa31xGhu"},{"name":"Mkalama District Council","id":"Qyg5jjxGeQD"}]},{"name":"Manyara Region","id":"qg5ySBw9X5l","children":[{"name":"Babati Town Council","id":"cnsiTXSJqqF"},{"name":"Hanang District Council","id":"xRx7W86ElUH"},{"name":"Babati District Council","id":"L5AfyN2zxns"},{"name":"Kiteto District Council","id":"P1TuGaaZ981"},{"name":"Mbulu District Council","id":"C96DDKK03pu"},{"name":"Simanjiro District Council","id":"A54bflEH57w"}]},{"name":"Dodoma Region","id":"Cpd5l15XxwA","children":[{"name":"Dodoma Municipal Council","id":"OzGGHqXQn5p"},{"name":"Chamwino District Council","id":"yiR1QdOwPqP"},{"name":"Chemba District Council","id":"Fez1Dp8bXSk"},{"name":"Mpwapwa District Council","id":"P5H056daq2I"},{"name":"Kondoa District Council","id":"yTTjcYh4xqa"},{"name":"Kongwa District Council","id":"DTc1rxSmlde"},{"name":"Bahi District Council","id":"Ak1TMj0oYc7"}]}]},{"name":"Southern Zone","id":"hiqGDmNAFJz","organisationUnits":[{"name":"Mtwara Region","id":"bN5q5k5DgLA","children":[{"name":"Mtwara District Council","id":"xOJxkz079Ek"},{"name":"Tandahimba District Council","id":"gOcZSwBmijY"},{"name":"Masasi Town Council","id":"tLzrq5IZ23W"},{"name":"Nanyumbu District Council","id":"PvqxGEssig9"},{"name":"Newala District Council","id":"IYqT1Xik8Bj"},{"name":"Masasi District Council","id":"rrHtwyYjprs"},{"name":"Mtwara Municipal Council","id":"PHGm198Hcil"}]},{"name":"Lindi Region","id":"VMgrQWSVIYn","children":[{"name":"Lindi District Council","id":"sjKfO239rjD"},{"name":"Nachingwea District Council","id":"W884lMlfpca"},{"name":"Liwale District Council","id":"ZszYGa2Vnyc"},{"name":"Lindi Municipal Council","id":"aiZstwpkrny"},{"name":"Kilwa District Council","id":"dGtH1WiNUrP"},{"name":"Ruangwa District Council","id":"OOplITY83ud"}]}]},{"name":"Eastern Zone","id":"gb4r7CSrT7U","organisationUnits":[{"name":"Dar Es Salaam Region","id":"acZHYslyJLt","children":[{"name":"Ilala Municipal Council","id":"xe93MrFXOYV"},{"name":"Temeke Municipal Council","id":"HIOQoi1aeL8"},{"name":"Kinondoni Municipal Council","id":"ts6eEeUjcfO"}]},{"name":"Morogoro Region","id":"Sj50oz9EHvD","children":[{"name":"Morogoro Municipal Council","id":"nUFAmN93pH4"},{"name":"Kilosa District Council","id":"GbVBjR8A7aK"},{"name":"Mvomero District Council","id":"BVBmQDCexxG"},{"name":"Morogoro District Council","id":"G2obPNftMUt"},{"name":"Ulanga District Council","id":"Le7ysFRJrMk"},{"name":"Kilombero District Council","id":"oMao5qA3DBy"},{"name":"Gairo District Council","id":"yh0b4OAgg8z"}]},{"name":"Pwani Region","id":"yyW17iCz9As","children":[{"name":"Bagamoyo District Council","id":"uPphu8kRXoZ"},{"name":"Rufiji District Council","id":"gncV3iPt6Sk"},{"name":"Mkuranga District Council","id":"Srvx9L1LGZM"},{"name":"Kisarawe District Council","id":"SnczTnCrk6d"},{"name":"Kibaha Town Council","id":"QekURU8eIU0"},{"name":"Mafia District Council","id":"GI57B0uNPOX"},{"name":"Kibaha District Council","id":"N8oGVhuoUcK"}]}]},{"name":"Western Zone","id":"zITJeBfrJ4J","organisationUnits":[{"name":"Kigoma Region","id":"RD96nI1JXVV","children":[{"name":"Buhigwe District Council","id":"yPCs2xE66we"},{"name":"Kigoma Municipal Council","id":"dIiTyLaZAEb"},{"name":"Kasulu District Council","id":"zfwo4rq1XC3"},{"name":"Kasulu Town Council","id":"IfQ2Sjbfdme"},{"name":"Uvinza District Council","id":"dt0Q0NhyPty"},{"name":"Kigoma District Council","id":"lQOxGNRaklm"},{"name":"Kakonko District Council","id":"T3A9X81ABG3"},{"name":"Kibondo District Council","id":"duES2Gfgvpw"}]},{"name":"Tabora Region","id":"kZ6RlMnt2bp","children":[{"name":"Sikonge District Council","id":"mOqc3ajETpA"},{"name":"Nzega Town Council","id":"uvsgHtPzLSo"},{"name":"Kaliua District Council","id":"PEIzWSzWQ7S"},{"name":"Tabora Municipal Council","id":"Nc1C12TG69d"},{"name":"Nzega District Council","id":"WAwWjYYzdkS"},{"name":"Uyui District Council","id":"m2ux1UEElNB"},{"name":"Igunga District Council","id":"fogigwn9cW7"},{"name":"Urambo District Council","id":"K8HUKJUZ7aj"}]}]},{"name":"Lake Zone","id":"RRGOg1GyLsd","organisationUnits":[{"name":"Kilimanjaro Region","id":"lnOyHhoLzre","children":[{"name":"Same District Council","id":"WCTbfnMiNF3"},{"name":"Hai District Council","id":"MiLb81EwC7j"},{"name":"Moshi Municipal Council","id":"Y8sOGpb4AFE"},{"name":"Mwanga District Council","id":"OHu1VHzyA0x"},{"name":"Rombo District Council","id":"Hob4dzCAW2W"},{"name":"Siha District Council","id":"aMnC7MINXlM"},{"name":"Moshi District Council","id":"VMTJLxcFH9o"}]},{"name":"Geita Region","id":"MAL4cfZoFhJ","children":[{"name":"Geita District Council","id":"saOGTLvMX4F"},{"name":"Chato District Council","id":"IZAkMaffRh8"},{"name":"Bukombe District Council","id":"plSLZJGUHZb"},{"name":"Nyang'hwale District Council","id":"G9VxK1Dmkpc"},{"name":"Mbogwe District Council","id":"RCDM6DotMZw"},{"name":"Geita Town council","id":"fSZfOuCkmAb"}]},{"name":"Mwanza Region","id":"hAFRrgDK0fy","children":[{"name":"Ilemela Municipal Council","id":"et6lWc8GDHy"},{"name":"Kwimba District Council","id":"O8O3HQdJWHX"},{"name":"Magu District Council","id":"Kug5uWxs0mu"},{"name":"Sengerema District Council","id":"IGSrsG5I54W"},{"name":"Nyamagana Municipal Council","id":"f7UPzYMgzVH"},{"name":"Misungwi District Council","id":"jAI2fd8kK1z"},{"name":"Ukerewe District Council","id":"QE0OH5162nV"}]},{"name":"Simiyu Region","id":"IgTAEKMqKRe","children":[{"name":"Meatu District Council","id":"vJY7WRfb5Hc"},{"name":"Itilima District Council","id":"bDteRg6tH0A"},{"name":"Busega District Council","id":"I58Bh8dN2sO"},{"name":"Maswa District Council","id":"mbXn83McbCh"},{"name":"Bariadi District Council","id":"Q16E1rzDnVD"},{"name":"Bariadi Town Council","id":"Yb483pDzzWj"}]},{"name":"Mara Region","id":"vYT08q7Wo33","children":[{"name":"Bunda District Council","id":"ouZ5YpZ4T3a"},{"name":"Serengeti District Council","id":"X5MzEu84hUN"},{"name":"Rorya District Council","id":"bRz3nu8rSWS"},{"name":"Tarime District Council","id":"NzVLQOcSJJU"},{"name":"Butiama District Council","id":"btLScg6XCBN"},{"name":"Musoma Municipal Council","id":"bKA4yc2NUxA"},{"name":"Musoma District Council","id":"z4dfv9EOq3c"},{"name":"Tarime Town Council","id":"Qp6ocX9ESSa"}]},{"name":"Kagera Region","id":"Crkg9BoUo5w","children":[{"name":"Kyerwa District Council","id":"LdzOZ9hNTwH"},{"name":"Biharamulo District Council","id":"yz7jPBCDXlX"},{"name":"Ngara District Council","id":"XLrownkhsKI"},{"name":"Bukoba Municipal Council","id":"PM74xoecSpJ"},{"name":"Bukoba District Council","id":"LoPF5WqswyW"},{"name":"Missenyi District Council","id":"F8NIzb16wVU"},{"name":"Karagwe District Council","id":"YFPElmUhUok"},{"name":"Muleba District Council","id":"wIjscdPZF3N"}]},{"name":"Shinyanga Region","id":"EO3Ps3ny0Nr","children":[{"name":"Ushetu District Council","id":"WgQHWeMx6Zl"},{"name":"Msalala District Council","id":"vQvBfxn7Cjs"},{"name":"Shinyanga District Council","id":"FylvwNXCTAQ"},{"name":"Kishapu District Council","id":"kISvf8gGZMm"},{"name":"Shinyanga Municipal Council","id":"PF4defRibDi"},{"name":"Kahama Town Council","id":"AiyppObGUqI"}]}]}]};
        $scope.geoToUse = [];
        $scope.zones = "";
        angular.forEach($scope.geographicalZones.organisationUnitGroups,function(value){
//            console.log(value.name)
            $scope.zones += value.id+";";
            $scope.geoToUse.push({name:value.name,id:value.id, ticked: true });
        });
        $scope.data = {};
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
            $scope.data.orgUnitTree.push({ name:value.name,id:value.id, children:zoneRegions });
        });

        $scope.selectOnly1Or2 = function(item, selectedItems) {
            if (selectedItems  !== undefined && selectedItems.length >= 7) {
                return false;
            } else {
                return true;
            }
        };


        $scope.changeMethod = function(){
//            $scope.currentOrgUnit = "m0frOspS7JY";
//            angular.forEach($scope.geoToUse,function(value){
//                value.ticked = true;
//            });
//            $('#orgunitss option[value="m0frOspS7JY"]').prop('selected', true);
           // $scope.firstClick();
//            console.log(FPManager.getUniqueOrgUnits($scope.data.outOrganisationUnits));
            //console.log($scope.prepareCategory('zones'));
            //FPManager.getUniqueOrgUnits($scope.data.outOrganisationUnits);
        };

        $scope.changeZone = function(){
            $scope.zones = "";
            angular.forEach($scope.selectedRegions,function(value){
                $scope.zones += value.id+";";
            });
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
            {'name':'Male Condoms','uid':'W74wyMy1mp0'},
            {'name':'Female Condoms','uid':'p8cgxI3yPx8'},
            {'name':'Oral Pills','uid':'aSJKs4oPZAf'},
            {'name':'Injectables','uid':'LpkdcaLc4I9'},
            {'name':'Implants','uid':'p14JdJaG2aC'},
            {'name':'IUCDs','uid':'GvbkEo6sfSd'},
            {'name':'Natural FP','uid':'QRCRjFreECE'},
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
            {'name':'Male Condoms','id':'W74wyMy1mp0'},
            {'name':'Female Condoms','id':'p8cgxI3yPx8'},
            {'name':'Oral Pills','id':'aSJKs4oPZAf'},
            {'name':'Injectables','id':'LpkdcaLc4I9'},
            {'name':'Implants','id':'p14JdJaG2aC'},
            {'name':'IUCDs','id':'GvbkEo6sfSd'},
            {'name':'Natural FP','id':'QRCRjFreECE'}];

        $scope.fpCards = [{
                title:'Clients < 20 Years of Age Quarterly',
                description:'Total Clients Quarterly',
                cardClass:"col s12 m6",
                data:$scope.methods,
                category:'quarter',
                category1:'quarter',
                icons:angular.copy(portalService.minimalIcons),
                displayTable:false,
                displayMap:false,
                chart:'line',
                visible:'consumption by demographic',
                chartObject:angular.copy(portalService.chartObject)

            },{
                title:'Clients < 20 Years of Age Monthly',
                description:'Total Clients Monthly',
                cardClass:"col s12 m6",
                data:$scope.methods,
                category:'month',
                category1:'month',
                icons:angular.copy(portalService.minimalIcons),
                displayTable:false,
                displayMap:false,
                chart:'line',
                visible:'consumption by demographic',
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

            var peri = preparePeriod($scope.selectedPeriod);
            //$scope.url = "https://dhis.moh.go.tz/api/analytics.json?dimension=dx:W74wyMy1mp0;p8cgxI3yPx8;aSJKs4oPZAf;LpkdcaLc4I9;p14JdJaG2aC;GvbkEo6sfSd;QRCRjFreECE&dimension=ou:"+FPManager.getUniqueOrgUnits($scope.data.outOrganisationUnits)+"&dimension=pe:201401;201402;201403;201404;201405;201406;201407;201408;201409;201410;201411;201412;2014Q1;2014Q2;2014Q3;2014Q4&displayProperty=NAME";
            var area = [];
            cardObject.chartObject.loading = true;
            var datass = '';

//            if($scope.currentOrgUnit == "m0frOspS7JY"){
//                if(cardObject.category1 == 'zones'){
//                    cardObject.data = 'jvwTTzpWBD0';
//                    cardObject.category = 'zones';
//                }
//            }else{
//                if(cardObject.category1 == 'zones'){
//                    cardObject.category = 'methods';
//                    cardObject.data = $scope.currentOrgUnit;
////                    cardObject.data = 'JMmqv0tyVr7;Nt8M08bJKXl;IFxhP0O4k0W;epPM7fO8CnH;pqpVKzE951Y;OQpasUg1Tse;btKkJROB2gP;mlfh4fgiFhd;GGpsoh0DX6T';
//                }
//
//            }

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

            $scope.url = "https://dhis.moh.go.tz/api/analytics.json?dimension=dx:W74wyMy1mp0;p8cgxI3yPx8;aSJKs4oPZAf;LpkdcaLc4I9;p14JdJaG2aC;GvbkEo6sfSd;QRCRjFreECE&dimension=ou:"+FPManager.getUniqueOrgUnits($scope.data.outOrganisationUnits)+"&dimension=pe:201401;201402;201403;201404;201405;201406;201407;201408;201409;201410;201411;201412;2014Q1;2014Q2;2014Q3;2014Q4&displayProperty=NAME";
            $http.get($scope.url).success(function(data){
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
                                var number = $scope.getDataFromUrl(data.row,val.id,cardObject.category,value.uid);
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
                    console.log(cardObject.chartObject)
                }else{
                    cardObject.chartObject.loading = false
                }

            });
            });

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
//                if($scope.currentOrgUnit == 'm0frOspS7JY'){
                    if($scope.selectedMethod == "all"){
                        $.each(arr,function(k,v){
                            if(v[2] == ou && v[0] == de){
                                num = num+parseInt(v[3])
                            }
                        });
                    }else{
                        var orgArr = de.split(";");
                        $.each(orgArr,function(c,j){
                            $.each(arr,function(k,v){
                                if(v[2] == ou && v[1] == j && v[0] == $scope.selectedMethod){
                                    num = num+parseInt(v[3])
                                }
                            });
                        });

                    }
            }if(type == 'month'){
                if($scope.selectedMethod == "all"){
                    $.each(arr,function(k,v){
                        if(v[2] == ou && v[0] == de){
                            num = num+parseInt(v[3])
                        }
                    });
                }else{
                    var orgArr = de.split(";");
                    $.each(orgArr,function(c,j){
                        $.each(arr,function(k,v){
                            if(v[2] == ou && v[1] == j && v[0] == $scope.selectedMethod){
                                num = num+parseInt(v[3])
                            }
                        });
                    });

                }
//
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



