angular.module('sportsStoreAdmin')
	.constant('authUrl','http://localhost:9999/login')
	.controller('authCtrl', function($scope, $http, $location, authUrl) {
		
		$scope.authenticate = function(user, pass) {
			$http.post(authUrl, {username: user, password: pass})
				.success(function(data) {
					if(data.result == 'OK')
						$location.path('/main');
					else
						$scope.authenticationError = 'Incorrect username and / or password';
				})
				.error(function(error) {
					$scope.authenticationError = error;
				});
		}
		
	})
	.controller('mainCtrl',function($scope) {
		
		$scope.screens = ['Products', 'Orders'];
		$scope.current = $scope.screens[0];
		
		$scope.setScreen = function(index) {
			$scope.current = $scope.screens[index];
		};
		
		$scope.getScreen = function() {
			return $scope.current == 'Products'
				? 'views/adminProducts.html'
						: 'views/adminOrders.html';
		}
		
	});