app.controller('demoController', function ($scope, $http) {
$scope.Message = "Welcome to Products page";

//Data for page
$scope.Products=[
    {
        "fileLocation": "Images/shoe.jpg",
        "name": "RedTapeShoe",
        "Price": 10089
    },
    {
        "fileLocation": "images/watch.jpg",
        "name": "Fasttrack watch",
        "Price": 3900
    },
    {
        "fileLocation": "images/mobile.jpg",
        "name": "Oppo Mobile",
        "Price": 459000
    }];

//for resetting it to original values
$scope.orig = angular.copy($scope.Products);


//model of dropdown
$scope.data = {
singleSelect: null
};
 
//Drop down selected index changed
$scope.onChange = function()
{
//depending upon the selsction of data it changes the currency
switch ($scope.data.singleSelect) {
        case '1':
$scope.Products = angular.copy($scope.orig);
                break;
        case '2':                
            $http({
method : "GET",
url : "https://api.exchangeratesapi.io/latest?base=INR"
}).then(function mySuccess(response) {
    $scope.rate = response.data;
    $scope.neededMultipier=$scope.rate.rates.USD;
angular.forEach($scope.Products, function (value, prop, obj) {
	
    value.Price=value.Price * $scope.neededMultipier;
});
}, function myError(response) {
    $scope.rate = response.statusText;
});
                

            break;
        default:

    }

};

});

