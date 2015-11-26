/**
 * Created by kelvin on 11/26/15.
 */

angular.module("hmisPortal")
    .config(function($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    })
    .controller("FamilyPlanningCtrl",function ($rootScope,$scope,$http,$location,$timeout,olData,olHelpers,shared) {

    });