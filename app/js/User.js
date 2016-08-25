;(function () {
    'use strict';
    
    function User(model) {
        var self = this;
        this.id = model.id;
        this.name = model.name;
        this.admin = model.admin;
        this.email = model.email;
        this.date = model.date;

        this.template = {
            idElement: function () {
                var idElement = document.createElement('TD');
                idElement.className = 'client-id';
                idElement.textContent = self.id;
                return idElement;
            },
            nameElement: function () {
                var nameElement = document.createElement('TD');
                nameElement.className = 'client-name';
                nameElement.textContent = self.name;
                return nameElement;
            },
            emailElement: function () {
                var emailElement = document.createElement('TD');
                emailElement.className = 'client-email';
                emailElement.textContent = self.email;
                return emailElement;
            },
            dateElement: function () {
                var dateElement = document.createElement('TD');
                dateElement.className = 'client-date';
                self.timeView = new App.Views.EstimatedDateElement(self.date, dateElement);
                return dateElement;
            },
            buttonElement: function () {
                var delElement = document.createElement('TD');
                delElement.className = 'client-delete';

                var buttonElement = document.createElement('BUTTON');
                buttonElement.className = 'delClient';
                buttonElement.textContent = 'Delete client';
                delElement.appendChild(buttonElement);
                return delElement;
            },
            delElement: function () {
                var editElement = document.createElement('TD');
                editElement.className = 'edit-element';

                var editButton = document.createElement('BUTTON');
                editButton.className = 'editClient';
                editButton.textContent = 'Edit client';
                editElement.appendChild(editButton);
                return editElement;
            }
        };
    }

    User.prototype.createTemplate = function () {
        var fragment = new DocumentFragment();

        for (var key in this.template) {
            fragment.appendChild(this.template[key]());
        }
        return fragment;
    };

    App.Models.User = User;
})();