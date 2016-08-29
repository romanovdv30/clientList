;(function (App) {
    'use strict';
   
    function UserTableView(options) {
        this.el = document.createElement('TABLE');
        this.el.className = 'list';
        this.collection = options.collection;
        this.loadingSettings = options.settings;
        this.rowItems = [];
        this.tBody = new App.Views.TableBody({
            collection: this.collection,
            settings:  this.loadingSettings,
            table: this
        });
        this.header = new App.Views.UserHeaderItem({
            collection: this.collection,
            table: this
        });
    }

    UserTableView.prototype.addUser = function (client) {
        this.collection.push(client);
        this.tBody.render();
    };

    UserTableView.prototype.render = function () {
        this.createCaption();
        this.el.appendChild(this.header.render());
        this.el.appendChild(this.tBody.render());
        return this.el;
    };

    UserTableView.prototype.createCaption = function () {
        var captionElement = document.createElement('CAPTION');
        captionElement.textContent = 'Users List';
        this.el.appendChild(captionElement);
    };

    App.Views.UserTableView = UserTableView;
})(App);
