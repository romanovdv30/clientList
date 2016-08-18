;(function (App, w) {
    'use strict';

    function AppLayout() {
        this.collection = [];
        this.loadingSettings = {
            loadingInProgress: false,
            page: 0,
            pageSize: 10,
            allPagesLoaded: false
        };
        this.table = new App.Views.TableView({
            collection: this.collection,
            loadingSettings:  this.loadingSettings
        });
        this.tBody = this.table.tBody;
        this.button = document.createElement('BUTTON');
        this.tBody.addEventListener('edit', this.editModel.bind(this));
        this.tBody.addEventListener('loadingStart', this.loadClients.bind(this));
        
    }

    AppLayout.prototype.loadClients = function () {
        var self = this; 
        var xhr = new XMLHttpRequest();
        var body = 'page=' + encodeURIComponent(this.loadingSettings.page + '') +
        '&pageSize='+  encodeURIComponent(this.loadingSettings.pageSize + '');
        xhr.open('POST', 'http://localhost:4000/listUsers', true);
        xhr.send(body);
        function readyStateChangeHandler () {
            if (xhr.readyState !== 4) {
                return;
            }
            if (xhr.status >= 200 && xhr.status < 300) {
                var pageResult = JSON.parse(xhr.responseText);
                var clients = pageResult.result;
                self.loadingSettings.totalItems = pageResult.totalItems;
                self.tBody.triggerEvent('loadFinished', clients);
            } else {
                w.alert('error: ' + (xhr.status ? xhr.statusText : 'problems with request'));
            }
        }
        xhr.addEventListener('readystatechange', readyStateChangeHandler);
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
            table: this.table,
            model: {}
        });
        document.body.appendChild(form.render());
    };

    AppLayout.prototype.render = function () {
        document.body.appendChild(this.table.render());
        document.body.appendChild(this.createButton());
    };

    AppLayout.prototype.editModel = function (model) {
        var popup = document.querySelector('.popup');

        function changeForm() {
            var popup = document.querySelector('.popup');
            popup.querySelector('h3').textContent = 'Edit Client';
            popup.querySelector('.add-btn').style.display = 'none';
            popup.querySelector('.edit-btn').style.display = 'inline';
        }

        if (popup) {
            return false;
        }
        var form = new App.Views.FormView({
            collection: this.collection,
            table: this.table,
            model: model
        });

        document.body.appendChild(form.render());
        changeForm();
    };

    App.Views.AppLayout = AppLayout;
})(App, window);