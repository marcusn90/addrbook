console.log('Storage Service');
angular.module('app.service',[])
.constant('StorageConf',{
  name:'addressBookContacts'
})
.factory('ContactStorage',function(StorageConf){
  var loadAll = function(){
    var locData = localStorage.getItem(StorageConf.name);
    try{
      contacts = angular.fromJson(locData) || [];
    }catch(e){contacts = [];}
    console.log(StorageConf.name,contacts);
    return contacts;
  }
  var saveAll = function(data){
    localStorage.setItem('addressBookContacts',angular.toJson(data));
  }
  return {
    load:loadAll,
    save:saveAll
  }
});