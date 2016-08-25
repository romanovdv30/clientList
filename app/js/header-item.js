;(function (App) {
    'use strict';
    
    function HeaderItem(options) {
        this.el = document.createElement('THEAD');
        this.el.className = 'tableHeader';
        this.collection = options.collection;
        this.sortBy = options.sortBy;
        this.reverse = options.reverse;
        this.table = options.table;
        this.render();
        this.addHeaderListeners.call(this);
    }

    HeaderItem.prototype.templ = function (element) {
        var tr = document.createElement('TR');

        var fragment = document.createDocumentFragment();
        var idElement = document.createElement('TH');
        idElement.id = 'id';
        idElement.dataset.sortBy = 'id';
        idElement.textContent = 'ID';
        fragment.appendChild(idElement);

        var nameElement = document.createElement('TH');
        nameElement.id = 'name';
        nameElement.dataset.sortBy = 'name';
        nameElement.textContent = 'Name';
        fragment.appendChild(nameElement);
       
        var emailElement = document.createElement('TH');
        emailElement.id = 'email';
        emailElement.dataset.sortBy = 'email';
        emailElement.textContent = 'Email';
        fragment.appendChild(emailElement);

        var dateElement = document.createElement('TH');
        dateElement.id = 'date';
        dateElement.dataset.sortBy = 'date';
        dateElement.textContent = 'Estimated time';
        fragment.appendChild(dateElement);

        var delElement = document.createElement('TH');
        delElement.id = 'delete';
        delElement.textContent = 'Delete';
        fragment.appendChild(delElement);

        var editElement = document.createElement('TH');
        editElement.id = 'edit';
        editElement.textContent = 'Edit';
        fragment.appendChild(editElement);

        tr.appendChild(fragment);
        element.appendChild(tr);
    };

    HeaderItem.prototype.render = function () {
        this.templ(this.el);
        return this;
    };

    HeaderItem.prototype.addHeaderListeners = function () {
        this.el.addEventListener('click', this.headerFilterHandler.bind(this));
    };

    HeaderItem.prototype.headerFilterHandler = function (e) {
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
    
    App.Views.HeaderItem = HeaderItem;
})(App);