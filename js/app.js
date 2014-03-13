var addrBook = angular.module('addrBook',['pascalprecht.translate']);

addrBook.config(['$translateProvider',function($translateProvider) {
  $translateProvider.translations('en', {
    CONTACTS: 'Contacts',
    ADD_NEW_CONTACT: 'Add new person',
    ADD_CONTACT: 'Add contact',
    NAME:'Name',
    SURNAME:'Surname',
    PHONE:'Phone',
    GROUP:'Group',
    EDIT:'Edit'
  })
  .translations('ua', {
    CONTACTS: 'Контакти',
    ADD_NEW_CONTACT: 'Додати новий контакт',
    ADD_CONTACT: 'Додати контакт',
    NAME:"Ім'я",
    SURNAME:'Прізвище',
    PHONE:'Телефон',
    GROUP:'Група',
    EDIT:'Редагувати'
  });
  $translateProvider.preferredLanguage('en');
}])
.factory('Contact', [function(){
  var currentContact = {
    id:null,
    data:{
      name:'',
      surname:'',
      phone:'',
      group:''
    }
  };
  return {
    getCurrentContact: function(){
      return currentContact;
    },
    setCurrentContact: function(cObj){
      if(!arguments.length || !cObj){
        return this.resetCurrentContact();
      }
      currentContact = cObj;
      return this;
    },
    resetCurrentContact: function(){
      currentContact = {
        id:null,
        data:{
          name:'',
          surname:'',
          phone:'',
          group:''
        }
      };
      return this;
    }
  }
}])
.controller('MainCtrl',['$scope','$translate','Contact',function($scope,$translate,Contact){
  $scope.contacts = [];
  $scope.contacts.push({
    id:1,
    data:{
      name:"naz",
      surname:"mar",
      phone:"12312",
      group:"test"
    }
  });
  $scope.setLang = function(code){
    // console.log($translate.use());
    $translate.use(code);
  };
  $scope.getUserFormLabel = function(){
    return 'ADD_NEW_CONTACT';
  };
  $scope.saveContact = function(){
    console.log('TO SAVE:',$scope.currCont.id,$scope.currCont.data);
    var c_id = $scope.currCont.id || (1*$scope.contacts.length + 1);
    var c_data = $scope.currCont.data;
    var newCont = $scope.contacts.filter(function(c){
      if(c.id == c_id){
        c.data = c_data;
        return true;
      }
      return false;
    });
    console.log(newCont);
    if(!newCont[0]){
      $scope.contacts.push({id:c_id,data:c_data});
    }
    angular.element('#contact_form').modal('hide');
  };
  $scope.findById = function(id){
    var c = $scope.contacts.filter(function(c){return c.id == id;});
    return c[0];
  }
  $scope.prepareContactForm = function(id){
    var c = null;
    if( id ){ // edit contact
      c = $scope.findById(id);
    }
    $scope.currCont = Contact.setCurrentContact(c).getCurrentContact();
    angular.element('#contact_form').modal('show');
  }
  
}]);


  