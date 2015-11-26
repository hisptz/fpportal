/**
 * Created by kelvin on 11/26/15.
 */

angular.module("hmisPortal")
    .config(function($httpProvider) {

    })
    .controller("FamilyPlanningCtrl",function ($rootScope,$scope,$http,$location,$timeout,olData,olHelpers,shared) {
       var url = "https://dhis.moh.go.tz/api/analytics.json?dimension=dx:ZnTi99UdGCS;lMFKZN3UaYp&dimension=ou:LEVEL-2;m0frOspS7JY&dimension=pe:2014Q1;2014Q2;2014Q3;2014Q4&displayProperty=NAME";

    });