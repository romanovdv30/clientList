;(function (App) {
    'use strict';

    function AppLayout(options) {
        this.collection = options.collection;
        this.table = new App.Views.TableView({
            collection: this.collection
        });
        this.button = document.createElement('BUTTON');
        this.table.tBody.addEventListener('edit', this.editModel.bind(this));
    }

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
        var form = new  App.Views.FormView ({
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
        var form = new  App.Views.FormView ({
            collection: this.collection,
            table: this.table,
            model: model
        });

        document.body.appendChild(form.render());
        changeForm();
    };
    
    App.Views.AppLayout = AppLayout;
})(App);