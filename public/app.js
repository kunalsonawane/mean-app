
    angular.module('Ashwini', [])  
      
        .controller('MittensCtrl', function ($scope) {  
      
            // set the default theme   
            $scope.css = 'red';  
      
            // create the list of themes  
            $scope.bootstraps = [  
              { name: 'Red', url: 'red' },  
              { name: 'Blue', url: 'blue' },  
              { name: 'Green', url: 'green' }  
            ];          
      
        });  

