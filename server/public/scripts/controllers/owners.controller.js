app.controller('OwnersController', ['$http', '$mdDialog', function ($http, $mdDialog) {
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
            vm.newName = '';
        }).catch(function (error) {
            console.log('error:', error);
            alert('failed to reach database');
        });
    }//end addOwner

    vm.removeOwner = function (owner) {
        if (owner.count > 0) {
            $mdDialog.show($mdDialog.alert({
                title: 'Notice',
                textContent: 'you cannot delete an owner with registed pets',
                ok: 'grumble'
            }));
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
        $mdDialog.show($mdDialog.prompt({
            title: 'Enter new name',
            initialValue: owner.name,
            ok: 'submit',
            cancel: 'never mind'
        })).then(function (result) {
            owner.name = result;
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
        });
    }//end editOwner

    vm.getOwners();
}]);//end ownersController