;(function (App) {
    'use strict';
    function AdminTemplate(model){
        App.Models.UserTemplate.call(this, model);
        this.orderFields = ['id', 'name','phone', 'email', 'date', 'del', 'edit'];
        this.fields.phone =  function () {
            var phoneElement = document.createElement('TD');
            phoneElement.className = 'client-phone';
            phoneElement.textContent = model.phone;
            return phoneElement;
        };
        this.fields.phone =  function () {
            var phoneElement = document.createElement('TD');
            phoneElement.className = 'client-phone';
            phoneElement.textContent = model.phone;
            return phoneElement;
        };
    }
    AdminTemplate.prototype = Object.create( App.Models.UserTemplate.prototype);
    App.Models.AdminTemplate = AdminTemplate;
})(App);