;(function (App) {
    'use strict';
    function AdminTableView(options){
        App.Views.UserTableView.call(this,options);
        this.el.className = 'admins-list';
        this.header = new App.Views.AdminHeaderItem({
            collection: this.collection,
            table: this
        });
        this.tBody = new App.Views.TableBody({
            collection: this.collection,
            settings:  this.loadingSettings,
            table: this
        });       
    }
    AdminTableView.prototype = Object.create(App.Views.UserTableView.prototype);

    AdminTableView.prototype.addAdmin = function (client) {
        this.collection.push(client);
        this.tBody.render();
    };

    AdminTableView.prototype.createCaption = function () {
        var captionElement = document.createElement('CAPTION');
        captionElement.textContent = 'Admins List';
        this.el.appendChild(captionElement);
    };

    App.Views.AdminTableView = AdminTableView;
})(App);