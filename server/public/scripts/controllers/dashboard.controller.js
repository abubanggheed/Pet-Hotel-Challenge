app.controller('DashboardController', ['$http', function($http) {
    let vm = this;
    vm.pets = [];

    vm.getPets = function() {
        $http({
            method: 'GET',
            url: '/pet'
        }).then(function(response){
            vm.pets = response.data;
            vm.refinePets();
        }).catch(function(error){
            console.log('error:', error);
            alert('failed to connect with server');
        });
    }//emd getPets

    vm.refinePets = function(){
        for(let pet of vm.pets) {
            if(pet.checked_in) {
                pet.status = moment(pet.last_checkin, 'YYYY/MM/DD').format('l');
                let l = pet.status.length;
                pet.status = pet.status.substring(0, l-4) + pet.status.substring(l-2);
            } else {
                pet.status = 'no';
            }
        }
    }//end refinePets

    vm.getPets();
}]);//end dbController