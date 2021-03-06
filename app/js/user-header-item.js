;(function (App) {
    'use strict';
    function UserHeaderItem(options) {
        this.el = document.createElement('THEAD');
        this.el.className = 'tableHeader';
        this.collection = options.collection;
        this.sortBy = options.sortBy;
        this.reverse = options.reverse;
        this.table = options.table;
        this.renderOrder = ['id', 'name', 'email', 'date', 'del', 'edit'];
        this.fields = {
            id: function () {
                var idElement = document.createElement('TH');
                idElement.className= 'id';
                idElement.dataset.sortBy = 'id';
                idElement.textContent = 'ID';
                return idElement;
            },
            name: function () {
                var nameElement = document.createElement('TH');
                nameElement.className = 'name';
                nameElement.dataset.sortBy = 'name';
                nameElement.textContent = 'Name';
                return nameElement;
            },
            email: function () {
                var emailElement = document.createElement('TH');
                emailElement.className = 'email';
                emailElement.dataset.sortBy = 'email';
                emailElement.textContent = 'Email';
                return emailElement;
            },
            date: function () {
                var dateElement = document.createElement('TH');
                dateElement.className = 'date';
                dateElement.dataset.sortBy = 'date';
                dateElement.textContent = 'Estimated time';
                return dateElement;
            },
            del: function () {
                var delElement = document.createElement('TH');
                delElement.className = 'delete';
                delElement.textContent = 'Delete';
                return delElement;
            },
            edit: function () {
                var editElement = document.createElement('TH');
                editElement.className = 'edit';
                editElement.textContent = 'Edit';
                return editElement;
            }
        };
        this.addHeaderListeners.call(this);

    }

    UserHeaderItem.prototype.render = function () {
        var tr = document.createElement('TR');
        var fragment = document.createDocumentFragment();
        var arr = this.renderOrder;

        for (var i = 0; i < arr.length; i++) {
            var field = arr[i];
            fragment.appendChild(this.fields[field]());
        }
        tr.appendChild(fragment);
        this.el.appendChild(tr);
        return this.el;
    };

    UserHeaderItem.prototype.addHeaderListeners = function () {
        this.el.addEventListener('click', this.headerFilterHandler.bind(this));
    };

    UserHeaderItem.prototype.headerFilterHandler = function (e) {
        function removeActive() {
            var ths = e.target.parentElement.children;
            for (var i = 0; i < ths.length; i++) {
                ths[i].classList.remove('active');
            }
        }

        if (e.target.tagName !== 'TH' || e.target.id === 'delete' || e.target.id === 'edit') {
            return false;
        } else if (e.target.className === 'active') {
            this.table.tBody.triggerEvent('reverse');
        } else {
            removeActive();
            e.target.classList.add('active');
            this.table.tBody.triggerEvent('columnSort', e.target.dataset.sortBy); //repacewith dispatch event
        }
    };
    App.Views.UserHeaderItem = UserHeaderItem;
})(App);
