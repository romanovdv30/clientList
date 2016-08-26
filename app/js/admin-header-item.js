;(function (App) {
    'use strict';
    function AdminHeaderItem(options) {
        App.Views.UserHeaderItem.call(this,options);
        this.renderOrder = ['id', 'name','phone', 'email', 'date', 'del', 'edit'];
        this.fields.phone = function(){
            var phoneElement = document.createElement('TH');
            phoneElement.id = 'phone';
            phoneElement.dataset.sortBy = 'phone';
            phoneElement.textContent = 'Phone';
            return phoneElement;
        };
    }
    AdminHeaderItem.prototype = Object.create(App.Views.UserHeaderItem.prototype);
    
    App.Views.AdminHeaderItem = AdminHeaderItem;
})(App);