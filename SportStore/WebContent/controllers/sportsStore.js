angular.module('sportsStore')
.constant('dataUrl','http://localhost:9999/products')
.constant('orderUrl', 'http://localhost:9999/orders')
.constant('localData',false)
.controller('sportsStoreCtrl', function($scope, $http, $location,
		dataUrl, cart, orderUrl, localData){
	
	var localDataArray =
		[{ id:1, name: 'Product #1', description: 'A product', category: 'Category #1', price: 100 },
		 { id:2, name: 'Product #2', description: 'A product', category: 'Category #1', price: 110 },
		 { id:3, name: 'Product #3', description: 'A product', category: 'Category #2', price: 210 },
		 { id:4, name: 'Product #4', description: 'A product', category: 'Category #2', price: 202 },
		 { id:5, name: 'Product #5', description: 'A product', category: 'Category #2', price: 150 },
		 { id:6, name: 'Product #6', description: 'A product', category: 'Category #3', price: 151 },
		 { id:7, name: 'Product #7', description: 'A product', category: 'Category #3', price: 211 },
		 { id:8, name: 'Product #8', description: 'A product', category: 'Category #4', price: 212 }];
	
	$scope.data = {};
	$scope.data.orders = [];
	
	if(localData)
		$scope.data.products = localDataArray;
	else 
	{
		$http.get(dataUrl)
			.success(function(data){
				$scope.data.products = data;
			})
			.error(function(error) {
				$scope.data.error = error;
			});
	}
	
	$scope.sendOrder = function (shippingDetails) {
		var order = angular.copy(shippingDetails);
		
		order.products = cart.getProducts();
		
		if(localData)
			$scope.data.orders.push(order);
		else
		{	
			var jsonOrderData = JSON.stringify(order);
			$http.post(orderUrl, jsonOrderData)
			.success(function (data) {
				$scope.data.orderId = data.id;
				cart.getProducts().length = 0;
			})
			.error(function (error) {
				$scope.data.orderError = error;
			})
			.finally(function () {
				$location.path("/complete");
			});
		}
	}
});