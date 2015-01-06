/// <reference path="angular.d.ts" />

module App.Services {
    'use strict';
    
    export class AppStorage {
        get(key: string): string {
            return JSON.parse(localStorage.getItem(key) || '""');
        }
        set(key: string, value: any): void {
            localStorage.setItem(key, JSON.stringify(value));
        }           
    }
}

module App.Factories {
    'use strict';
    
    export function AppStorageFactory() {
        var appStorage = {
            getKey: getKeyFunct,
            setKey: setKeyFunct
        };
        
        return appStorage; 
        
        function getKeyFunct(key: string): string {
            return JSON.parse(localStorage.getItem(key) || '""');
        }
    
        function setKeyFunct(key: string, value: any): void {
            localStorage.setItem(key, JSON.stringify(value));
        } 
    }
}

module App.Controllers {
    'use strict';
    
    export interface ITestCtrlScope extends ng.IScope {
        testName: string;
        changeTestName(name): void;
    }
    
    export class TestCtrl {
        public static $inject = [
            '$scope',
            'appStorage',
            'appStorageFactory'
        ];
        
        constructor(private $scope: ITestCtrlScope, private appStorageSvc: Services.AppStorage) {
            $scope.testName = this.FormatTestName(appStorageSvc.get('TestName'));
            
            $scope.changeTestName = (name) => {
                var factory = Factories.AppStorageFactory();
                factory.setKey("TestName", name);
                $scope.testName = this.FormatTestName(appStorageSvc.get('TestName'));
            };
        }
        
        private FormatTestName(name: string): string {
            return name !== '' ? 
                'Hello ' + name + ' !' : 
                'Hello you !';
        }
    }
}

module App.Filters {
    'use strict';
    
    export function UCase() {
        return function(input: string): string {
            return input.toUpperCase();
        }
    }
}

module App.Directives {
    'use strict';
    
    export function PrintTestName(): ng.IDirective {
        return {
            restrict:'E',
            scope: false,
            template: '<h2>{{testName}}</h2>'
        };
    }
}

module App {
    angular.module("angularTest", [])
        .service("appStorage", Services.AppStorage)
        .filter("ucase", Filters.UCase)
        .factory("appStorageFactory", Factories.AppStorageFactory)
        .directive("printTestName", Directives.PrintTestName)
        .controller("testCtrl", Controllers.TestCtrl);
}