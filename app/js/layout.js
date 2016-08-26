;(function (App) {
    'use strict';

    function AppLayout() {
        this.collection = [];
        this.loadingSettings = {
            loadingInProgress: false,
            page: 0,
            pageSize: 10,
            allPagesLoaded: false
        };
        this.usersTable = new App.Views.TableView({
            collection: this.collection,
            settings: this.loadingSettings
        });
        this.tBody = this.usersTable.tBody;
        this.button = document.createElement('BUTTON');
        this.tBody.addEventListener('get', this.getUser.bind(this));
        this.tBody.addEventListener('delete', this.deleteTableRow.bind(this));
        this.tBody.addEventListener('loadingStart', this.loadUsers.bind(this));
    }

    AppLayout.prototype.deleteTableRow = function (index) {
        if (this.collection.length === 0) {
            this.tBody.render();
        } else {
            App.Request.deleteUser({
                success: this.eraseRow.bind(this),
                error: this.onError.bind(this)
            }, {id: index});
        }
    };
    
    AppLayout.prototype.eraseRow = function (result) {
        this.tBody.triggerEvent('eraseRow',result);
    };
    
    AppLayout.prototype.getUser = function (row) {
        var index = +row.dataset.id;
        App.Request.getUser({
            success: this.editModel.bind(this),
            error: this.onError.bind(this)
        }, {id: index});
    };

    AppLayout.prototype.loadUsers = function () {
        var self = this;
        App.Request.loadUsers({
            success: self.onLoad.bind(self),
            error: self.onError.bind(self)
        }, self.loadingSettings);
    };

    AppLayout.prototype.onLoad = function (result) {
        var self = this;
        self.loadingSettings.totalItems = result.totalItems;
        var users = result.result;
        var modelsCollection = users.map(function (user) {
            return new App.Models.User(user);
        });
        this.usersTable.tBody.triggerEvent('loadFinished', modelsCollection);
    };

    AppLayout.prototype.onError = function (errorText) {
        console.log(errorText);
    };

    AppLayout.prototype.createButton = function () {
        this.button.className = 'addClient';
        this.button.textContent = 'Add Client';
        this.button.addEventListener('click', this.addClient.bind(this));
        return this.button;
    };

    AppLayout.prototype.addClient = function () {
        var popup = document.querySelector('.popup');
        if (popup) {
            return false;
        }

        var form = new App.Views.FormView({
            collection: this.collection,
            table: this.usersTable,
            loadingSettings: this.loadingSettings,
            model: {}
        });
        document.body.appendChild(form.render());
    };

    AppLayout.prototype.render = function () {
        document.body.appendChild(this.usersTable.render());
        document.body.appendChild(this.createButton());
    };

    AppLayout.prototype.editModel = function (model) {
        var popup = document.querySelector('.popup');

        function changeForm() {
            var popup = document.querySelector('.popup');
            popup.querySelector('h3').textContent = 'Edit';
            popup.querySelector('.add-btn').style.display = 'none';
            popup.querySelector('.edit-btn').style.display = 'inline';
        }

        if (popup) {
            return false;
        }
        var form = new App.Views.FormView({
            collection: this.collection,
            table: this.usersTable,
            model: model
        });

        document.body.appendChild(form.render());
        changeForm();
    };

    App.Views.AppLayout = AppLayout;
})(App, window);