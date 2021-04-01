(function (window) {
    'use strict';
    var FORM_SELECTOR = '[data-payment="form"]';
    var App = window.App;
    var DataStore = App.DataStore;
    var FormHandler = App.FormHandler;

    var formHandler = new FormHandler(FORM_SELECTOR);

    formHandler.addSubmitHandlerForPayment(function (data) {
        console.log(formHandler);
        $("#myModal").modal('show');
    });
    
 
    console.log(formHandler);
})(window);
    