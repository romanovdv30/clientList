(function (App) {
    'use strict';
    function AdminFormView(options) {
        App.Views.UserFormView.call(this,options);
        this.el.className = 'adminPopup';
        this.model = options.model;
        var self = this;
        this.fields.labelPhone = function () {
            var labelElement = document.createElement('LABEL');
            labelElement.setAttribute('for', 'phone-input');
            labelElement.textContent = 'Enter phone';
            return labelElement;
        };
        this.fields.inputPhone = function () {
            var inputElement = document.createElement('INPUT');
            inputElement.setAttribute('type', 'text');
            inputElement.value = self.model.phone || '';
            inputElement.id = 'phone-input';
            return inputElement;
        };
        this.fields.btnGroup =  function () {
            var groupElement = document.createElement('DIV');
            groupElement.className = 'button-group';

            var saveBtn = document.createElement('BUTTON');
            saveBtn.className = 'add-admin-btn';
            saveBtn.textContent = 'Add';
            groupElement.appendChild(saveBtn);

            var editBtn = document.createElement('BUTTON');
            editBtn.className = 'edit-admin-btn';
            editBtn.textContent = 'Save';
            editBtn.style.display = 'none';
            groupElement.appendChild(editBtn);

            var cancelBtn = document.createElement('BUTTON');
            cancelBtn.className = 'cancel-admin-btn';
            cancelBtn.textContent = 'Cancel';
            groupElement.appendChild(cancelBtn);
            return groupElement;
        };

        this.orderFields = ['header', 'labelName', 'inputName','labelPhone' ,'inputPhone','labelEmail', 'inputEmail', 'labelDate', 'inputDate', 'btnGroup'];
    }
    AdminFormView.prototype = Object.create(App.Views.UserFormView.prototype);
    AdminFormView.prototype.formEventHandler = function (e) {
        this.cacheSelectors();
        if (e.target.className === 'add-admin-btn') {
            this.addNewAdmin();
        }
        if (e.target.className === 'cancel-admin-btn') {
            this.clearForm();
        }
        if (e.target.className === 'edit-admin-btn') {
            this.saveEdit();
        }
    };
    
    AdminFormView.prototype.saveEdit = function () {
        var model = {
            admin: false,
            id: this.model.id,
            name: this.name.value,
            phone:this.phone.value,
            email: this.email.value,
            date: this.date.value || '2030'
        };
        var self = this;
        App.Request.editAdmin({
            success: self.onEditSuccess.bind(self),
            error: self.onEditError.bind(self)
        }, {model: model});
    };
    AdminFormView.prototype.onEditSuccess = function (model) {
        var colIndex;
        this.collection.forEach(function (item, index) {
            if (+model.id === item.id) {
                colIndex = index;
            }
        });
        model = new App.Models.Admin(model);
        this.collection.splice(colIndex, 1, model);
        this.table.tBody.render();
        this.clearForm();
        console.log('The model with id: ' + model.id + 'was edited');
    };
    AdminFormView.prototype.onEditError = function (model) {
        var id = model.id;
        console.log('Error with editing model whith id:' + id);
    };
    AdminFormView.prototype.addNewAdmin= function () {
        var id = this.collection.length + 1;
        var model = {
            id: id,
            name: this.name.value,
            phone:this.phone.value,
            email: this.email.value,
            date: this.date.value || '2030'
        };
        var self = this;
        App.Request.addAdmin({
            success: self.onSuccessLoad.bind(self),
            error: self.onErrorLoad
        }, {model: model});
    };
    AdminFormView.prototype.cacheSelectors = function () {
        this.name = document.getElementById('name-input');
        this.phone = document.getElementById('phone-input');
        this.email = document.getElementById('email-input');
        this.date = document.getElementById('date-input');
    };
    AdminFormView.prototype.removePopup = function () {
        var popup = document.querySelector('.adminPopup');
        document.body.removeChild(popup);
    };
    App.Views.AdminFormView = AdminFormView;
})(App);