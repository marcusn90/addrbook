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
    EDIT:'Edit',
    CONTACT_LIST_IS_EMPTY:'Your contact list is empty.',
    SAVE:'Save',
    CLOSE:'Close',
    CANCEL:'Cancel',
    SAMPLE_NAME:'John',
    SAMPLE_SURNAME:'Doe',
    SAMPLE_PHONE:'555222333',
    SAMPLE_GROUP:'friends',
    FILTER_:'Filter ...',
    TOTAL:'Total',
    REQUIRED:'Required',
    NAME_FIELD_IS_REQUIRED:'\'Name\' field is required.',
    PHONE_FIEILD_IS_REQUIRED_AND_NUMBER:'\'Phone\' field is required and should contain digits only.'
  })
  .translations('ua', {
    CONTACTS: 'Контакти',
    ADD_NEW_CONTACT: 'Додати новий контакт',
    ADD_CONTACT: 'Додати контакт',
    NAME:"Ім'я",
    SURNAME:'Прізвище',
    PHONE:'Телефон',
    GROUP:'Група',
    EDIT:'Редагувати',
    CONTACT_LIST_IS_EMPTY:'Ваш список контактів пустий.',
    SAVE:'Зберегти',
    CLOSE:'Закрити',
    CANCEL:'Відмінити',
    SAMPLE_NAME:'Іван',
    SAMPLE_SURNAME:'Іванів',
    SAMPLE_PHONE:'555222333',
    SAMPLE_GROUP:'друзі',
    FILTER_:'Фільтр ...',
    TOTAL:'Всього',
    REQUIRED:'Обов\'язково',
    NAME_FIELD_IS_REQUIRED:'\'Ім\'я\' є обов\'язковим.',
    PHONE_FIEILD_IS_REQUIRED_AND_NUMBER:'\'Телефон\' є обов\'язковим і повинно містити тільки цифри.'
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
  var contacts = []; //saved contacts
  return {
    getCurrentContact: function(){
      return currentContact;
    },
    setCurrentContact: function(cObj){
      if(!arguments.length || !cObj){
        return this.resetCurrentContact();
      }
      //currentContact = cObj; //changes saved by angular databinding,changes not reverted on form close
      currentContact.id = cObj.id;
      currentContact.data.name = cObj.data.name;
      currentContact.data.surname = cObj.data.surname;
      currentContact.data.phone = cObj.data.phone;
      currentContact.data.group = cObj.data.group;
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
    },
    load: function(){ //load from storage
      
      contacts = [];
      return contacts;
    },
    synch:function(contactsList){ // sycnh with storage
      contacts = contactsList;
    }
  }
}])
.controller('MainCtrl',['$scope','$translate','Contact',function($scope,$translate,Contact){
  $scope.contacts = Contact.load();
  
  $scope.langs = ['en','ua'];
  $scope.isLangActive = function(code){
    return code == $translate.use();
  }
  $scope.setLang = function(code){
    // console.log($translate.use());
    if($scope.langs.indexOf(code) != -1){
      $translate.use(code);
    }
  };
  $scope.getUserFormLabel = function(){
    return 'ADD_NEW_CONTACT';
  };
  $scope.ordAsc = 0;
  $scope.formErrors = [];
  $scope.changeOrder = function(){
    $scope.ordAsc = !$scope.ordAsc;
  }
  $scope.validateContactData = function(cObj){
    var err = [];
    if( !cObj.name ){
      err.push('NAME_FIELD_IS_REQUIRED');
    }
    if( !cObj.phone || isNaN(cObj.phone) ){
      err.push('PHONE_FIEILD_IS_REQUIRED_AND_NUMBER');
    }
    return err;
  }
  $scope.saveContact = function(){
    console.log('TO SAVE:',$scope.currCont.id,$scope.currCont.data);
    var c_id = $scope.currCont.id || (1*$scope.contacts.length + 1);
    var c_data = $scope.currCont.data;
    var fErr = $scope.validateContactData(c_data);
    if( fErr.length ){
      $scope.formErrors = fErr;
      return false;
    }else{
      $scope.formErrors = [];
    }
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
    Contact.resetCurrentContact();
    Contact.synch($scope.contacts);
    angular.element('#contact_form').modal('hide');
  };
  $scope.closeCF = function(){
    console.debug(Contact.getCurrentContact());
    $scope.currCont = Contact.getCurrentContact();
  }
  $scope.findById = function(id){
    var c = $scope.contacts.filter(function(c){return c.id == id;});
    return c[0];
  }
  $scope.prepareContactForm = function(id){
    var c = null;
    $scope.formErrors = [];
    if( id ){ // edit contact
      c = $scope.findById(id);
    }
    $scope.currCont = Contact.setCurrentContact(c).getCurrentContact();
    angular.element('#contact_form').modal('show');
  }
  
}]);


  