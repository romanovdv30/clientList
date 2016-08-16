(function (App) {
    'use strict';

    function FormView(options) {
        this.el = document.createElement('DIV');
        this.el.className = 'popup';
        this.collection = options.collection;
        this.model = options.model;
        this.table = options.table;
        this.addFormListeners(this.el);
    }

    FormView.prototype.template = function (element, model) {
        var form = document.createElement('DIV');
        form.className = 'form';

        var header = document.createElement('H3');
        header.textContent = 'Add New Client';
        form.appendChild(header);

        var labelName = document.createElement('LABEL');
        labelName.setAttribute('for', 'name-input');
        labelName.textContent = 'Enter client Name';
        form.appendChild(labelName);

        var inputName = document.createElement('INPUT');
        inputName.setAttribute('type', 'text');
        inputName.value = model.name || '';
        inputName.id = 'name-input';
        form.appendChild(inputName);

        var labelPhone = document.createElement('LABEL');
        labelPhone.setAttribute('for', 'phone-input');
        labelPhone.textContent = 'Enter client Phone';
        form.appendChild(labelPhone);

        var inputPhone = document.createElement('INPUT');
        inputPhone.setAttribute('type', 'text');
        inputPhone.value = model.phone || '';
        inputPhone.id = 'phone-input';
        form.appendChild(inputPhone);

        var labelEmail = document.createElement('LABEL');
        labelEmail.setAttribute('for', 'email-input');
        labelEmail.textContent = 'Enter client Email';
        form.appendChild(labelEmail);

        var inputEmail = document.createElement('INPUT');
        inputEmail.setAttribute('type', 'email');
        inputEmail.value = model.email || '';
        inputEmail.id = 'email-input';
        form.appendChild(inputEmail);

        var labelDate = document.createElement('LABEL');
        labelDate.setAttribute('for', 'date-input');
        labelDate.textContent = 'Enter estimated time';
        form.appendChild(labelDate);

        var inputDate = document.createElement('INPUT');
        inputDate.setAttribute('type', 'date');
        inputDate.value = model.date || '';
        inputDate.id = 'date-input';
        form.appendChild(inputDate);

        var btnGroup = document.createElement('DIV');
        btnGroup.className = 'button-group';

        var saveBtn = document.createElement('BUTTON');
        saveBtn.className = 'add-btn';
        saveBtn.textContent = 'Add';
        btnGroup.appendChild(saveBtn);

        var editBtn = document.createElement('BUTTON');
        editBtn.className = 'edit-btn';
        editBtn.textContent = 'Save';
        editBtn.style.display = 'none';
        btnGroup.appendChild(editBtn);

        var cancelBtn = document.createElement('BUTTON');
        cancelBtn.className = 'cancel-btn';
        cancelBtn.textContent = 'Cancel';
        btnGroup.appendChild(cancelBtn);
        form.appendChild(btnGroup);

        element.appendChild(form);
    };

    FormView.prototype.render = function () {
        this.template(this.el, this.model);
        this.cacheSelectors();
        return this.el;
    };

    FormView.prototype.addFormListeners = function (element) {
        element.addEventListener('click', this.formEventHandler.bind(this));
    };

    FormView.prototype.formEventHandler = function (e) {
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

    FormView.prototype.cacheSelectors = function () {
        this.name = document.getElementById('name-input');
        this.phone = document.getElementById('phone-input');
        this.email = document.getElementById('email-input');
        this.date = document.getElementById('date-input');
    };

    FormView.prototype.saveEdit = function () {
        this.model.name = this.name.value;
        this.model.phone = this.phone.value;
        this.model.email = this.email.value;
        this.model.date = this.date.value || this.model.date;
        this.table.tBody.render();
        this.clearForm();
    };

    FormView.prototype.addNewClient = function () {
        var id = this.collection.length + 1;
        var rowItem = {
            id: id,
            name: this.name.value,
            phone: this.phone.value,
            email: this.email.value,
            date: this.date.value || '2030'
        };
        this.table.addClient(rowItem);
        this.clearForm();
    };

    FormView.prototype.clearForm = function () {
        this.name.value = '';
        this.phone.value = '';
        this.email.value = '';
        this.date.value = '';
        this.removePopup();
    };

    FormView.prototype.removePopup = function () {
        var popup = document.querySelector('.popup');
        document.body.removeChild(popup);
    };

    App.Views.FormView = FormView;
})(App);