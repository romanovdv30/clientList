;(function (App) {
    'use strict';
    function UserTemplate(model) {
        this.model = model;
        var self =this;
        this.fields = {
            id: function () {
                var idElement = document.createElement('TD');
                idElement.className = 'client-id';
                idElement.textContent = model.id;
                return idElement;
            },
            name: function () {
                var nameElement = document.createElement('TD');
                nameElement.className = 'client-name';
                nameElement.textContent = model.name;
                return nameElement;
            },
            email: function () {
                var emailElement = document.createElement('TD');
                emailElement.className = 'client-email';
                emailElement.textContent = model.email;
                return emailElement;
            },
            date: function () {
                var dateElement = document.createElement('TD');
                dateElement.className = 'client-date';
                self.model.timeView = new App.Views.EstimatedDateElement(model.date, dateElement);
                return dateElement;
            },
            del: function () {
                var delElement = document.createElement('TD');
                delElement.className = 'client-delete';

                var buttonElement = document.createElement('BUTTON');
                buttonElement.className = 'delClient';
                buttonElement.textContent = 'Delete';
                delElement.appendChild(buttonElement);
                return delElement;
            },
            edit: function () {
                var editElement = document.createElement('TD');
                editElement.className = 'edit-element';

                var editButton = document.createElement('BUTTON');
                editButton.className = 'editClient';
                editButton.textContent = 'Edit';
                editElement.appendChild(editButton);
                return editElement;
            }
        };
        this.orderFields = ['id', 'name', 'email', 'date', 'del', 'edit'];
    }

    UserTemplate.prototype.createTemplate = function () {
        var fragment = new DocumentFragment();
        var arr =  this.orderFields;
        for (var i = 0; i <arr.length; i++) {
            var field = arr[i];
            fragment.appendChild(this.fields[field]());
        }
        return fragment;
    };

    App.Models.UserTemplate = UserTemplate;
})(App);