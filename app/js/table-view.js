;(function (App) {
    'use strict';
   
    function TableView(options) {
        this.el = document.createElement('TABLE');
        this.el.className = 'list';
        this.collection = options.collection;
        this.loadingSettings = options.settings;
        this.rowItems = [];// rename to rowItems
        this.tBody = new App.Views.TableBody({
            collection: this.collection,
            settings:  this.loadingSettings,
            table: this
        });
        this.header = new App.Views.HeaderItem({
            collection: this.collection,
            table: this
        });
    }

    TableView.prototype.addClient = function (client) {
        this.collection.push(client);
        this.tBody.render();
    };

    TableView.prototype.render = function () {
        this.createCaption();
        this.el.appendChild(this.header.el);
        this.el.appendChild(this.tBody.render());
        return this.el;
    };

    TableView.prototype.createCaption = function () {
        var captionElement = document.createElement('CAPTION');
        captionElement.textContent = 'Users List';
        this.el.appendChild(captionElement);
    };

    App.Views.TableView = TableView;
})(App);