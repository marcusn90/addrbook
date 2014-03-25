console.log('Main Ctlr');
var MainCtrl = function($scope,Storage){
  this.contacts = Storage.load();
}
MainCtrl.$inject = ['$scope','ContactStorage'];
angular.module('app.ctrl',['app.service'])
.controller('MainCtrl',MainCtrl);