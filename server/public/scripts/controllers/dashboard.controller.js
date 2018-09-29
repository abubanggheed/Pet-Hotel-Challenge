app.controller('DashboardController', ['$http', '$mdDialog', function ($http, $mdDialog) {
    let vm = this;
    vm.pets = [];
    vm.owners = [];

    vm.getPets = function () {
        $http({
            method: 'GET',
            url: '/pet'
        }).then(function (response) {
            vm.pets = response.data;
            vm.refinePets();
        }).catch(function (error) {
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
        }).catch(function (error) {
            console.log('error:', error);
            alert('failed to retrieve owner data');
        });
    }//end getOwners

    vm.refinePets = function () {
        for (let pet of vm.pets) {
            if (pet.checked_in) {
                pet.status = moment(pet.last_checkin, 'YYYY/MM/DD').format('l');
                let l = pet.status.length;
                pet.status = pet.status.substring(0, l - 4) + pet.status.substring(l - 2);
            } else {
                pet.status = 'no';
            }
            pet.editMode = false;
        }
    }//end refinePets

    vm.addPet = function () {
        vm.newPet.last_checkin = moment().format('L');
        $http({
            method: 'POST',
            url: '/pet',
            data: vm.newPet
        }).then(function (response) {
            vm.getPets();
        }).catch(function (error) {
            console.log('error:', error);
            alert('failed to reach database');
        });
    }//end addPet

    vm.removePet = function (id) {
        $http({
            method: 'DELETE',
            url: '/pet',
            params: { id: id }
        }).then(function (response) {
            vm.getPets();
        }).catch(function (error) {
            console.log('error:', error);
            alert('delete failed');
        });
    }//end removePet

    vm.resubmitPet = function (pet) {
        $http({
            method: 'PUT',
            url: '/pet',
            params: pet
        }).then(function (response) {
            vm.getPets();
        }).catch(function (error) {
            console.log('error:', error);
            alert('failed to reach database');
        });
    }//end resubmitPet

    vm.checkPet = function (pet) {
        pet.checked_in = !pet.checked_in;
        if (pet.checked_in) {
            pet.last_checkin = moment().format('L');
        } else {
            vm.checkOut(pet);
        }
        vm.resubmitPet(pet);
    }//end checkPet

    vm.editPet = function (pet, value, property) {
        $mdDialog.show($mdDialog.prompt({
            title: 'enter new value',
            initialValue: value,
            ok: 'submit',
            cancel: 'never mind'
        })).then(function(result) {
            switch (property) {
                case 'name':
                    pet.name = result;
                    break;
                case 'breed':
                    pet.breed = result;
                    break;
                case 'color':
                    pet.color = result;
                    break;
                default:
                    break;
            }//end switch
            vm.resubmitPet(pet);
        });
    }//end editPet

    vm.checkOut = function(pet) {
        $http({
            method: 'POST',
            url: '/history',
            data: {
                pet: pet.name,
                owner: pet.owner_id,
                check_in: pet.last_checkin,
                checkout: moment().format('L')
            }
        }).then( function(response) {
            vm.resubmitPet(pet);
        }).catch( function(error) {
            console.log('error:', error);
            alert('error in checkout');
        });
    }//end checkOut

    vm.toggleEdit = function (pet) {
        pet.editMode = !pet.editMode;
        
    }//end editOwner


    vm.getPets();
    vm.getOwners();

}]);//end dbController