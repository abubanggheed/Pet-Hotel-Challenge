app.controller('OwnersController', ['$http', function ($http) {
    let vm = this;
    vm.owners = [];

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

    vm.addOwner = function (name) {
        $http({
            method: 'POST',
            url: '/owner',
            data: { name: name }
        }).then(function (response) {
            vm.getOwners();
        }).catch(function (error) {
            console.log('error:', error);
            alert('failed to reach database');
        });
    }//end addOwner

    vm.removeOwner = function (owner) {
        if (owner.count > 0) {
            alert('you cannot delete an owner with registered pets');
        } else {
            $http({
                method: 'DELETE',
                url: '/owner',
                params: { id: owner.id }
            }).then(function (response) {
                vm.getOwners();
            }).catch(function (error) {
                console.log('error:', error);
                alert('failed to remove owner');
            });
        }
    }//end removeOwner

    vm.editOwner = function (owner) {
        let newName = prompt('Enter new name', owner.name);
        if (newName) {
            $http({
                method: 'PUT',
                url: '/owner',
                params: { name: newName, id: owner.id }
            }).then(function (response) {
                vm.getOwners();
            }).catch(function (error) {
                console.log('error:', error);
                alert('edit failed');
            });
        }
    }//end editOwner

    vm.getOwners();
}]);//end ownersController