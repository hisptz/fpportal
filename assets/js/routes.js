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

        $routeProvider.when("/malaria",{
            templateUrl: 'views/malaria.html',
            controller: 'malariaCtrl'
        });

        $routeProvider.when("/maternal",{
            templateUrl: 'views/maternal.html',
            controller: 'maternalCtrl'
        });

        $routeProvider.when("/ivd",{
            templateUrl: 'views/ivd.html',
            controller: 'ivdCtrl'
        });

        $routeProvider.when("/nutrition",{
            templateUrl: 'views/nutrition.html',
            controller: 'nutritionCtrl'
        });

        $routeProvider.when("/morbidity",{
            templateUrl: 'views/morbidity.html',
            controller: 'mainCtrl'
        });

        $routeProvider.when("/mortality",{
            templateUrl: 'views/mortality.html',
            controller: 'mortalityCtrl'
        });

        $routeProvider.when("/tracer_medicine",{
            templateUrl: 'views/tracer_medicine.html',
            controller: 'tracermedicineCtrl'
        });

        $routeProvider.when("/hiv",{
            templateUrl: 'views/hiv.html',
            controller: 'mainCtrl'
        });

        $routeProvider.when("/tb",{
            templateUrl: 'views/tb.html',
            controller: 'mainCtrl'
        });
        $routeProvider.when("/family_planning",{
            templateUrl: 'views/family_planning.html',
            controller: 'ClientsByMethodsCtrl'
        });
        $routeProvider.when("/clients_by_demographics",{
            templateUrl: 'views/familyPlaning/client_by_demographics.html',
            controller: 'ClientsByDemographicsCtrl'
        });


        $routeProvider.otherwise({
            redirectTo: '/home'
        });



});