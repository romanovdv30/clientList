;(function (App) {
    'use strict';

    function AppLayout() {
        this.usersCollection = [];
        this.adminsCollection = [];
        
        this.usersLoadingSettings = {
            loadingInProgress: false,
            page: 0,
            pageSize: 10,
            allPagesLoaded: false
        };
        this.adminsLoadingSettings = {
            loadingInProgress: false,
            page: 0,
            pageSize: 10,
            allPagesLoaded: false
        };
        
        this.usersTable = new App.Views.UserTableView({
            collection: this.usersCollection,
            settings: this.usersLoadingSettings
        });
        this.adminsTable = new App.Views.AdminTableView({
            collection: this.adminsCollection,
            settings: this.adminsLoadingSettings
        });

        this.usersTBody = this.usersTable.tBody;
        this.adminsTBody = this.adminsTable.tBody;

        this.usersTBody.addEventListener('get', this.getUser.bind(this));
        this.usersTBody.addEventListener('delete', this.deleteUserTableRow.bind(this));
        this.usersTBody.addEventListener('loadingStart', this.loadUsers.bind(this));

        this.adminsTBody.addEventListener('get', this.getAdmin.bind(this));
        this.adminsTBody.addEventListener('delete', this.deleteAdminTableRow.bind(this));
        this.adminsTBody.addEventListener('loadingStart', this.loadAdmins.bind(this));
    }

    AppLayout.prototype.render = function () {
        document.body.appendChild(this.usersTable.render());
        document.body.appendChild(this.createAddUserButton());
        document.body.appendChild(this.adminsTable.render());
        document.body.appendChild(this.createAddAdminButton());
    };

    AppLayout.prototype.deleteUserTableRow = function (index) {
        if (this.usersCollection.length === 0) {
            this.usersTBody.render();
        } else {
            App.Request.deleteUser({
                success: this.eraseUserRow.bind(this),
                error: this.onError.bind(this)
            }, {id: index});
        }
    };

    AppLayout.prototype.deleteAdminTableRow = function (index) {
        if (this.usersCollection.length === 0) {
            this.usersTBody.render();
        } else {
            App.Request.deleteAdmin({
                success: this.eraseAdminRow.bind(this),
                error: this.onError.bind(this)
            }, {id: index});
        }
    };
    
    AppLayout.prototype.eraseUserRow = function (result) {
        this.usersTBody.triggerEvent('eraseRow',result);
    };
    AppLayout.prototype.eraseAdminRow = function (result) {
        this.adminsTBody.triggerEvent('eraseRow',result);
    };

    AppLayout.prototype.getUser = function (row) {
        var index = +row.dataset.id;
        App.Request.getUser({
            success: this.editUserModel.bind(this),
            error: this.onError.bind(this)
        }, {id: index});
    };
    AppLayout.prototype.getAdmin = function (row) {
        var index = +row.dataset.id;

        App.Request.getAdmin({
            success: this.editAdminModel.bind(this),
            error: this.onError.bind(this)
        }, {id: index});
    };

    AppLayout.prototype.loadUsers = function () {
        var self = this;
        App.Request.loadUsers({
            success: self.onUserLoad.bind(self),
            error: self.onError.bind(self)
        }, self.usersLoadingSettings);
    };
    AppLayout.prototype.loadAdmins = function () {
        var self = this;
        App.Request.loadAdmins({
            success: self.onAdminLoad.bind(self),
            error: self.onError.bind(self)
        }, self.adminsLoadingSettings);
    };

    AppLayout.prototype.onUserLoad = function (result) {
        var self = this;
        self.usersLoadingSettings.totalItems = result.totalItems;
        var users = result.result;
        var modelsCollection = users.map(function (user) {
            return new App.Models.User(user);
        });
        this.usersTBody.triggerEvent('loadFinished', modelsCollection);
    };
    AppLayout.prototype.onAdminLoad = function (result) {
        var self = this;
        self.adminsLoadingSettings.totalItems = result.totalItems;
        var users = result.result;
        var modelsCollection = users.map(function (user) {
            return new App.Models.Admin(user);
        });
        this.adminsTBody.triggerEvent('loadFinished', modelsCollection);
    };

    AppLayout.prototype.onError = function (errorText) {
        console.log(errorText);
    };

    AppLayout.prototype.createAddUserButton = function () {
        this.button = document.createElement('BUTTON');
        this.button.className = 'addUser';
        this.button.textContent = 'Add User';
        this.button.addEventListener('click', this.addUser.bind(this));
        return this.button;
    };
    AppLayout.prototype.createAddAdminButton = function () {
        this.button = document.createElement('BUTTON');
        this.button.className = 'addAdmin';
        this.button.textContent = 'Add Admin';
        this.button.addEventListener('click', this.addAdmin.bind(this));
        return this.button;
    };

    AppLayout.prototype.addUser = function () {
        var popup = document.querySelector('.userPopup');
        if (popup) {
            return false;
        }

        var form = new App.Views.UserFormView({
            collection: this.usersCollection,
            table: this.usersTable,
            loadingSettings: this.usersLoadingSettings,
            model: {}
        });
        document.body.appendChild(form.render());
    };
    AppLayout.prototype.addAdmin = function () {
        var popup = document.querySelector('.adminPopup');
        if (popup) {
            return false;
        }

        var form = new App.Views.AdminFormView({
            collection: this.adminsCollection,
            table: this.adminsTable,
            loadingSettings: this.adminsLoadingSettings,
            model: {}
        });
        document.body.appendChild(form.render());
    };

    AppLayout.prototype.editUserModel = function (model) {
        var popup = document.querySelector('.userPopup');

        function changeForm() {
            var popup = document.querySelector('.userPopup');
            popup.querySelector('h3').textContent = 'Edit';
            popup.querySelector('.add-btn').style.display = 'none';
            popup.querySelector('.edit-btn').style.display = 'inline';
        }

        if (popup) {
            return false;
        }
        var form = new App.Views.UserFormView({
            collection: this.usersCollection,
            table: this.usersTable,
            model: model
        });

        document.body.appendChild(form.render());
        changeForm();
    };
    AppLayout.prototype.editAdminModel = function (model) {
        var popup = document.querySelector('.adminPopup');
        function changeForm() {
            var popup = document.querySelector('.adminPopup');
            popup.querySelector('h3').textContent = 'Edit';
            popup.querySelector('.add-admin-btn').style.display = 'none';
            popup.querySelector('.edit-admin-btn').style.display = 'inline';
        }

        if (popup) {
            return false;
        }
        var form = new App.Views.AdminFormView({
            collection: this.adminsCollection,
            table: this.adminsTable,
            model: model
        });

        document.body.appendChild(form.render());
        changeForm();
    };

    App.Views.AppLayout = AppLayout;
})(App, window);