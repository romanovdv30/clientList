;(function () {
    'use strict';
    function Admin(model) {
        App.Models.User.call(this, model);
        this.phone = model.phone;
    }
    Admin.prototype = Object.create( App.Models.User.prototype);
    
    Admin.prototype.createTemplate = function createTemplate() {
        var template = new App.Models.AdminTemplate(this);
        return template.createTemplate();
    };
        App.Models.Admin = Admin;
})();
