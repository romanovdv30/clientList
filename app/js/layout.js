;(function (App,w) {
    'use strict';

    function AppLayout(options) {
        this.collection = options.collection;
        this.table = new App.Views.TableView({
            collection: this.collection
        });
        this.tBody = this.table.tBody;
        this.button = document.createElement('BUTTON');
        this.tBody.addEventListener('edit', this.editModel.bind(this));
        this.tBody.el.addEventListener('scroll', this.scrollHandler.bind(this));
        this.loadingSettings = {
            loadingInProgress: false,
            page: 0,
            pageSize: 5,
            totalItems: 12,
            allPagesLoaded: false
        };
    }

    AppLayout.prototype.scrollHandler = function () {
        clearTimeout(this.scrollTimerId);
        var self = this;
        this.scrollTimerId = setTimeout(function () {
            if (!self.loadingSettings.loadingInProgress) {
                if (self.tBody.el.scrollHeight - (self.tBody.el.scrollTop + self.tBody.el.offsetHeight) <= 336) {
                    if (!self.loadingSettings.totalItems ||
                        (self.loadingSettings.totalItems > (self.loadingSettings.page + 1) * self.loadingSettings.pageSize)) {
                        self.loadingSettings.page++;
                        self.loadClients(self.loadingSettings); //послать запрос на сервер
                    } else {
                        self.loadingSettings.allPagesLoaded = true;
                    }
                }
            }
        }, 200);
    };

    AppLayout.prototype.loadClients = function (settings) {
        var self = this;
        function statusHandler() {
            /*jshint validthis:true */
            if (this.readyState !== 4) {
                return;
            }
            if (this.status >= 200 && this.status < 300) {
                var clients = JSON.parse(this.responseText);
                clients = clients.splice((settings.pageSize*settings.page) + 1, 5);
                self.addAjaxClients(clients);
            } else {
                w.alert('error: ' + (this.status ? this.statusText : 'problems with request'));
            }
        }

        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:4000/listUsers', true);
        xhr.send();
        xhr.onreadystatechange = statusHandler.bind(xhr);

    };

    AppLayout.prototype.addAjaxClients = function (clients) {
        var self = this;
        clients.forEach(function(item){
            self.collection.push(item);
        });

        this.tBody.render();
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