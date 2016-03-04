/**
 * Created by kelvin on 1/9/15.
 */
angular.module("hmisPortal")
    .run( function($rootScope, $location) {
        // register listener to watch route changes
        $rootScope.$on( "$routeChangeStart", function(event, next, current) {
            Pace.restart()
        });
    })
    .config( function($routeProvider){
        $routeProvider.when("/home",{
            templateUrl: 'views/dashboard.html',
            controller: 'dashboardCtrl'
        });

        $routeProvider.when("/downloads",{
            templateUrl: 'views/downloads.html',
            controller: 'dashboardCtrl'
        });

        $routeProvider.when("/district_profiles",{
            templateUrl: 'views/district_profiles.html',
            controller: 'mainCtrl'
        });

        $routeProvider.when("/maternal",{
            templateUrl: 'views/maternal.html',
            controller: 'maternalCtrl'
        });

        $routeProvider.when("/dataset/:uid",{
            templateUrl: 'views/dataset.html',
            controller: 'dataCtrl'
        });

        $routeProvider.when("/morbidity",{
            templateUrl: 'views/morbidity.html',
            controller: 'morbidityCtrl'
        });

        $routeProvider.when("/mortality",{
            templateUrl: 'views/mortality.html',
            controller: 'mortalityCtrl'
        });
        $routeProvider.when("/hiv",{
            templateUrl: 'views/hiv.html',
            controller: 'mainCtrl'
        });
        $routeProvider.when("/updates",{
            templateUrl: 'views/updates.html',
            controller: 'mainCtrl'
        });
        $routeProvider.when("/antenatal",{
            templateUrl: 'views/antenatal.html',
            controller: 'antenatalCtrl'
        });
        $routeProvider.when("/labour",{
            templateUrl: 'views/labour.html',
            controller: 'labourCtrl'
        });
        $routeProvider.when("/child",{
            templateUrl: 'views/child.html',
            controller: 'childCtrl'
        });
        $routeProvider.when("/ipd",{
            templateUrl: 'views/ipd.html',
            controller: 'ipdCtrl'
        });
        $routeProvider.when("/opd",{
            templateUrl: 'views/opd.html',
            controller: 'opdCtrl'
        });
        $routeProvider.when("/postnatal",{
            templateUrl: 'views/postnatal.html',
            controller: 'postnatalCtrl'
        });
        $routeProvider.when("/planning",{
            templateUrl: 'views/planning.html',
            controller: 'planningCtrl'
        });
        $routeProvider.when("/mortalities",{
            templateUrl: 'views/indicatorsView.html',
            controller: 'indicatorsCtrl'
        });
        $routeProvider.when("/familyPlaning",{
            templateUrl: 'views/familyPlaning.html',
            controller: 'familyPlaningCtrl'
        });
        $routeProvider.when("/fpIntegration",{
            templateUrl: 'views/fpIntegration.html',
            controller: 'fpIntegrationCtrl'
        });
        $routeProvider.when("/antenatalCare",{
            templateUrl: 'views/indicatorsView.html',
            controller: 'indicatorsCtrl'
        });
        $routeProvider.when("/malaria",{
            templateUrl: 'views/indicatorsView.html',
            controller: 'indicatorsCtrl'
        });
        $routeProvider.when("/ivd",{
            templateUrl: 'views/indicatorsView.html',
            controller: 'indicatorsCtrl'
        });
        $routeProvider.when("/nutrition",{
            templateUrl: 'views/indicatorsView.html',
            controller: 'indicatorsCtrl'
        });
        $routeProvider.when("/hivaids",{
            templateUrl: 'views/indicatorsView.html',
            controller: 'indicatorsCtrl'
        });
        $routeProvider.when("/tracer_medicine",{
            templateUrl: 'views/indicatorsView.html',
            controller: 'indicatorsCtrl'
        });
        $routeProvider.when("/tb",{
            templateUrl: 'views/indicatorsView.html',
            controller: 'indicatorsCtrl'
        });
        $routeProvider.when("/ancIntegration",{
            templateUrl: 'views/indicatorsView.html',
                controller: 'indicatorsCtrl'
        });
        $routeProvider.when("/laborDelivery",{
            templateUrl: 'views/indicatorsView.html',
            controller: 'indicatorsCtrl'
        });
        $routeProvider.when("/ldIntegration",{
            templateUrl: 'views/ldIntegration.html',
            controller: 'ldIntegrationCtrl'
        });
        $routeProvider.when("/newbornCare",{
            templateUrl: 'views/indicatorsView.html',
            controller: 'indicatorsCtrl'
        });
        $routeProvider.when("/postnatalCare",{
            templateUrl: 'views/indicatorsView.html',
            controller: 'indicatorsCtrl'
        });
        $routeProvider.when("/pncIntegration",{
            templateUrl: 'views/pncIntegration.html',
            controller: 'pncIntegrationCtrl'
        });
        $routeProvider.when("/gbvVac",{
            templateUrl: 'views/indicatorsView.html',
            controller: 'indicatorsCtrl'
        });
        $routeProvider.when("/cervicalCancer",{
            templateUrl: 'views/indicatorsView.html',
            controller: 'indicatorsCtrl'
        });

        /**
         * Family planning routes
         * Used by family planning portal.
         */
        $routeProvider.when("/family_planning",{
            templateUrl: 'views/family_planning/survilience.html',
            controller: 'survilienceCtrl'
        });

        $routeProvider.when("/hw_trained",{
            templateUrl: 'views/family_planning/coverage1.html',
            controller: 'HWTrainedCtrl'
        });

        $routeProvider.when("/facilities_hw_trained",{
            templateUrl: 'views/family_planning/coverage2.html',
            controller: 'HWParcentageCtrl'
        });

        $routeProvider.when("/facilities_providing_FP",{
            templateUrl: 'views/family_planning/coverage3.html',
            controller: 'parcentageCtrl'
        });

        $routeProvider.when("/facilities_providing_CBD",{
            templateUrl: 'views/family_planning/coverage4.html',
            controller: 'parcentage1Ctrl'
        });

        $routeProvider.when("/facilities_with_trained_hw",{
            templateUrl: 'views/family_planning/coverage5.html',
            controller: 'familyPlanningCtrl'
        });

        $routeProvider.when("/consumption_by_method",{
            templateUrl: 'views/family_planning/client_by_methods.html',
            controller: 'clientMethodsCtrl'
        });

        $routeProvider.when("/consumption_by_demographic",{
            templateUrl: 'views/family_planning/client_by_demographics.html',
            controller: 'clientDemographicsCtrl'
        });

        $routeProvider.when("/sos_at_facilities",{
            templateUrl: 'views/family_planning/stock_out1.html',
            controller: 'stockoutCtrl'
        });

        $routeProvider.when("/sos_at_facilities_trained_hw",{
            templateUrl: 'views/family_planning/stock_out2.html',
            controller: 'familyPlanningCtrl'
        });

        $routeProvider.when("/service_intergration",{
            templateUrl: 'views/family_planning/survilience.html',
            controller: 'survilienceCtrl'
        });

        $routeProvider.when("/familyPlanningHome",{
            templateUrl: 'views/family_planning/home.html',
            controller: 'FPHomeController'
        });


        //default route
        $routeProvider.otherwise({
            redirectTo: '/home'
        });



    });
