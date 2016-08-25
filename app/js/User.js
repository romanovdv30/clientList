;(function () {
    'use strict';    
    function User(model) {
        this.id = model.id;
        this.name = model.name;
        this.admin = model.admin;
        this.email = model.email;
        this.date = model.date;
    }
    
    User.prototype.createTemplate = function createTemplate () {
        var template = new App.Models.Template(this);
        return template.createTemplate();
    };
    
    App.Models.User = User;
})();