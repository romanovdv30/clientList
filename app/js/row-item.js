;(function (App) {
    'use strict';
   
    function RowItem(options) {
        this.el = document.createElement('TR');
        this.el.className = 'client';
        this.model = options.model;
        this.el.dataset.id = this.model.id;
        this.id = this.model.id;
        this.collection = options.collection;
        this.render();
    }

    RowItem.prototype.templ = function (elem, model) {
        var fragment = document.createDocumentFragment();

        var idElement = document.createElement('TD');
        idElement.className = 'client-id';
        idElement.textContent = model.id;
        fragment.appendChild(idElement);

        var nameElement = document.createElement('TD');
        nameElement.className = 'client-name';
        nameElement.textContent = model.name;
        fragment.appendChild(nameElement);

        var phoneElement = document.createElement('TD');
        phoneElement.className = 'client-phone';
        phoneElement.textContent = model.phone;
        fragment.appendChild(phoneElement);

        var emailElement = document.createElement('TD');
        emailElement.className = 'client-email';
        emailElement.textContent = model.email;
        fragment.appendChild(emailElement);

        var dateElement = document.createElement('TD');
        dateElement.className = 'client-date';
        this.date = new App.Views.EstimatedDateElement(this.model.date, dateElement);
        fragment.appendChild(this.date.el);

        var delElement = document.createElement('TD');
        delElement.className = 'client-delete';

        var buttonElement = document.createElement('BUTTON');
        buttonElement.className = 'delClient';
        buttonElement.textContent = 'Delete client';

        delElement.appendChild(buttonElement);
        fragment.appendChild(delElement);

        var editElement = document.createElement('TD');
        editElement.className = 'edit-element';

        var editButton = document.createElement('BUTTON');
        editButton.className = 'editClient';
        editButton.textContent = 'Edit client';

        editElement.appendChild(editButton);
        fragment.appendChild(editElement);

        elem.appendChild(fragment);
    };

    RowItem.prototype.render = function () {
        this.templ(this.el, this.model);
        return this;
    };

    RowItem.prototype.destroy = function () {
        this.date.stop();
        this.el.parentElement.removeChild(this.el);
    };
    
    App.Views.RowItem = RowItem;
})(App);
