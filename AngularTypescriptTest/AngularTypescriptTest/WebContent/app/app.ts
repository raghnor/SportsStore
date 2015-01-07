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

    ExampleController.$inject = ['$scope'];

    function ExampleController($scope) {
        // Injecting $scope just for comparison
        var vm = this;

        vm.min = 3;
        vm.max = $scope.max;
        console.log('CTRL: $scope.max = %i', $scope.max);
        console.log('CTRL: vm.min = %i', vm.min);
        console.log('CTRL: vm.max = %i', vm.max);
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
            restrict: 'E',
            scope: false,
            template: '<h2>{{testName}}</h2>'
        };
    }

    function myExample() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'example.directive.html',
            scope: {
                max: '='
            },
            link: linkFunc,
            controller: Controllers.ExampleController,
            controllerAs: 'vm'
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {
            console.log('LINK: scope.max = %i', scope.max);
            console.log('LINK: scope.vm.min = %i', scope.vm.min);
            console.log('LINK: scope.vm.max = %i', scope.vm.max);
        }
    }
}

module App {
    angular.module("angularTest", [])
        .service("appStorage", Services.AppStorage)
        .filter("ucase", Filters.UCase)
        .factory("appStorageFactory", Factories.AppStorageFactory)
        .directive("printTestName", Directives.PrintTestName)
        .directive('myExample', Directives.myExample)
        .controller("testCtrl", Controllers.TestCtrl);
}