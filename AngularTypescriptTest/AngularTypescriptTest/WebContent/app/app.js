var App;
(function (App) {
    var Services;
    (function (Services) {
        'use strict';
        var AppStorage = (function () {
            function AppStorage() {
            }
            AppStorage.prototype.get = function (key) {
                return JSON.parse(localStorage.getItem(key) || '""');
            };
            AppStorage.prototype.set = function (key, value) {
                localStorage.setItem(key, JSON.stringify(value));
            };
            return AppStorage;
        })();
        Services.AppStorage = AppStorage;
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Factories;
    (function (Factories) {
        'use strict';
        function AppStorageFactory() {
            var appStorage = {
                getKey: getKeyFunct,
                setKey: setKeyFunct
            };
            return appStorage;
            function getKeyFunct(key) {
                return JSON.parse(localStorage.getItem(key) || '""');
            }
            function setKeyFunct(key, value) {
                localStorage.setItem(key, JSON.stringify(value));
            }
        }
        Factories.AppStorageFactory = AppStorageFactory;
    })(Factories = App.Factories || (App.Factories = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        'use strict';
        var TestCtrl = (function () {
            function TestCtrl($scope, appStorageSvc) {
                var _this = this;
                this.$scope = $scope;
                this.appStorageSvc = appStorageSvc;
                $scope.testName = this.FormatTestName(appStorageSvc.get('TestName'));
                $scope.changeTestName = function (name) {
                    var factory = App.Factories.AppStorageFactory();
                    factory.setKey("TestName", name);
                    $scope.testName = _this.FormatTestName(appStorageSvc.get('TestName'));
                };
            }
            TestCtrl.prototype.FormatTestName = function (name) {
                return name !== '' ? 'Hello ' + name + ' !' : 'Hello you !';
            };
            TestCtrl.$inject = [
                '$scope',
                'appStorage',
                'appStorageFactory'
            ];
            return TestCtrl;
        })();
        Controllers.TestCtrl = TestCtrl;
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Filters;
    (function (Filters) {
        'use strict';
        function UCase() {
            return function (input) {
                return input.toUpperCase();
            };
        }
        Filters.UCase = UCase;
    })(Filters = App.Filters || (App.Filters = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Directives;
    (function (Directives) {
        'use strict';
        function PrintTestName() {
            return {
                restrict: 'E',
                scope: false,
                template: '<h2>{{testName}}</h2>'
            };
        }
        Directives.PrintTestName = PrintTestName;
    })(Directives = App.Directives || (App.Directives = {}));
})(App || (App = {}));
var App;
(function (App) {
    angular.module("angularTest", []).service("appStorage", App.Services.AppStorage).filter("ucase", App.Filters.UCase).factory("appStorageFactory", App.Factories.AppStorageFactory).directive("printTestName", App.Directives.PrintTestName).controller("testCtrl", App.Controllers.TestCtrl);
})(App || (App = {}));
