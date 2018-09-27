app.controller('DashboardController', ['$http', function($http) {
    let vm = this;
    vm.pets = [];
    vm.owners = [];

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

    vm.getOwners = function () {
        $http({
            method: 'GET',
            url: '/owner'
        }).then(function (response) {
            vm.owners = response.data;
            if( vm.owners.length > 0){
                vm.newPet = {owner: vm.owners[0].id};
            }
        }).catch(function (error) {
            console.log('error:', error);
            alert('failed to retrieve owner data');
        });
    }//end getOwners

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

    vm.addPet = function() {
        vm.newPet.last_checkin = moment().format('L');
        $http({
            method: 'POST',
            url: '/pet',
            data: vm.newPet
        }).then( function(response){
            vm.getPets();
            if( vm.owners.length > 0){
                vm.newPet = {owner: vm.owners[0].id};
            }
        }).catch( function(error) {
            console.log('error:', error);
            alert('failed to reach database');
        });
    }//end addPet

    vm.removePet = function(id) {
        $http({
            method: 'DELETE',
            url: '/pet',
            params: {id: id}
        }).then(function(response){
            vm.getPets();
        }).catch(function(error){
            console.log('error:', error);
            alert('delete failed');
        });
    }//end removePet

    vm.getPets();
    vm.getOwners();

}]);//end dbController