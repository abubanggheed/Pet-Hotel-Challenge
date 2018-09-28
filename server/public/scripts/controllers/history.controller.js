app.controller('HistoryController', ['$http', function($http) {
    let vm = this;
    vm.visits = [];

    vm.getHistory = function() {
        $http({
            method: 'GET',
            url: '/history'
        }).then(function(response) {
            vm.visits = response.data;
            vm.refineTimes(vm.visits);
        }).catch(function(error){
            console.log('error:', error);
            alert('failed to connect with server');
        });
    }//end getHistory

    vm.deleteItem = function(item) {
        $http({
            method: 'DELETE',
            url: '/history',
            params: {id: item.id}
        }).then( function (response){
            vm.getHistory();
        }).catch( function(error) {
            console.log('error:', error);
            alert('failed to delete item');
        });
    }//end deleteItem

    vm.refineTimes = function () {
        for (let visit of vm.visits) {
            visit.in = moment(visit.check_in, 'YYYY/MM/DD').format('l');
            let l = visit.in.length;
            visit.in = visit.in.substring(0, l - 4) + visit.in.substring(l - 2);
            if (visit.checkout !== null) {
                visit.out = moment(visit.checkout, 'YYYY/MM/DD').format('l');
                let l = visit.out.length;
                visit.out = visit.out.substring(0, l - 4) + visit.out.substring(l - 2);
            } else {
                visit.out = 'ongoing';
            }
        }
    }//end refineTimes
    
    vm.getHistory();
}]);