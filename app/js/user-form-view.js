(function (App) {
    'use strict';

    function UserFormView(options) {
        this.el = document.createElement('DIV');
        this.el.className = 'userPopup';
        this.collection = options.collection;
        this.loadingSettings = options.loadingSettings || {};
        this.model = options.model;
        this.table = options.table;
        this.addFormListeners(this.el);
        var self = this;
        this.orderFields = ['header', 'labelName', 'inputName', 'labelEmail', 'inputEmail', 'labelDate','inputDate','btnGroup'];
        this.fields = {
            header: function () {
                var header = document.createElement('H3');
                header.textContent = 'Add New Client';
                return header;
            },
            labelName: function () {
                var labelElement = document.createElement('LABEL');
                labelElement.setAttribute('for', 'name-input');
                labelElement.textContent = 'Enter Name';
                return labelElement;
            },
            inputName: function () {
                var inputElement = document.createElement('INPUT');
                inputElement.setAttribute('type', 'text');
                inputElement.value = self.model.name || '';
                inputElement.id = 'name-input';
                return inputElement;
            },
            labelEmail: function () {
                var labelElement = document.createElement('LABEL');
                labelElement.setAttribute('for', 'email-input');
                labelElement.textContent = 'Enter Email';
                return labelElement;
            },
            inputEmail: function () {
                var inputElement = document.createElement('INPUT');
                inputElement.setAttribute('type', 'email');
                inputElement.value = self.model.email || '';
                inputElement.id = 'email-input';
                return inputElement;
            },
            labelDate: function () {
                var labelElement = document.createElement('LABEL');
                labelElement.setAttribute('for', 'date-input');
                labelElement.textContent = 'Enter estimated time';
                return labelElement;
            },
            inputDate: function () {
                var inputElement = document.createElement('INPUT');
                inputElement.setAttribute('type', 'date');
                inputElement.value = self.model.date || '';
                inputElement.id = 'date-input';
                return inputElement;
            },
            btnGroup: function () {
                var groupElement = document.createElement('DIV');
                groupElement.className = 'button-group';

                var saveBtn = document.createElement('BUTTON');
                saveBtn.className = 'add-btn';
                saveBtn.textContent = 'Add';
                groupElement.appendChild(saveBtn);

                var editBtn = document.createElement('BUTTON');
                editBtn.className = 'edit-btn';
                editBtn.textContent = 'Save';
                editBtn.style.display = 'none';
                groupElement.appendChild(editBtn);

                var cancelBtn = document.createElement('BUTTON');
                cancelBtn.className = 'cancel-btn';
                cancelBtn.textContent = 'Cancel';
                groupElement.appendChild(cancelBtn);

                return groupElement;
            }
        };
    }

    UserFormView.prototype.createTemplate = function () {
        var form = document.createElement('DIV');
        form.className = 'form';
        var arr =  this.orderFields;
        for (var i = 0; i <arr.length; i++) {
            var field = arr[i];
            form.appendChild(this.fields[field]());
        }
        return form;
    };

    UserFormView.prototype.render = function () {
        this.el.appendChild(this.createTemplate());
        this.cacheSelectors();
        return this.el;
    };

    UserFormView.prototype.addFormListeners = function (element) {
        element.addEventListener('click', this.formEventHandler.bind(this));
    };

    UserFormView.prototype.formEventHandler = function (e) {
        this.cacheSelectors();
        if (e.target.className === 'add-btn') {
            this.addNewClient();
        }
        if (e.target.className === 'cancel-btn') {
            this.clearForm();
        }
        if (e.target.className === 'edit-btn') {
            this.saveEdit();
        }
    };

    UserFormView.prototype.cacheSelectors = function () {
        this.name = document.getElementById('name-input');
        this.phone = document.getElementById('phone-input');
        this.email = document.getElementById('email-input');
        this.date = document.getElementById('date-input');
    };

    UserFormView.prototype.saveEdit = function () {
        var model = {
            admin: false,
            id: this.model.id,
            name: this.name.value,
            email: this.email.value,
            date: this.date.value || '2030'
        };
        var self = this;
        App.Request.editUser({
            success: self.onEditSuccess.bind(self),
            error: self.onEditError.bind(self)
        }, {model: model});
    };

    UserFormView.prototype.onEditSuccess = function (model) {
        var colIndex;
        this.collection.forEach(function (item, index) {
            if (+model.id === item.id) {
                colIndex = index;
            }
        });
        model = new App.Models.User(model);
        this.collection.splice(colIndex, 1, model);
        this.table.tBody.render();
        this.clearForm();
        console.log('The model with id: ' + model.id + 'was edited');
    };

    UserFormView.prototype.onEditError = function (model) {
        var id = model.id;
        console.log('Error with editing model whith id:' + id);
    };

    UserFormView.prototype.addNewClient = function () {

        var id = this.collection.length + 1;
        var model = {
            id: id,
            name: this.name.value,
            email: this.email.value,
            date: this.date.value || '2030'
        };
        var self = this;
        App.Request.addUser({
            success: self.onSuccessLoad.bind(self),
            error: self.onErrorLoad
        }, {model: model});
    };

    UserFormView.prototype.onSuccessLoad = function (model) {
        this.collection.length = 0;
        this.table.tBody.el.scrollTop = 0;
        this.loadingSettings.page = 0;
        this.loadingSettings.allPagesLoaded = false;
        console.log(model);
        this.collection.length = 0;
        this.table.tBody.triggerEvent('loadingStart');
        this.clearForm();
    };

    UserFormView.prototype.onErrorLoad = function (response) {
        console.log(response);
    };

    UserFormView.prototype.clearForm = function () {
        this.name.value = '';
        this.email.value = '';
        this.date.value = '';
        this.removePopup();
    };

    UserFormView.prototype.removePopup = function () {
        var popup = document.querySelector('.userPopup');
        document.body.removeChild(popup);
    };

    App.Views.UserFormView = UserFormView;
})(App);
