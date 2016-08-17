;(function (App) {
    'use strict';
   
    function TableBody(options) {
        App.Views.EventCollection.call(this);
        this.el = document.createElement('TBODY');
        this.el.className = 'tableBody';
        this.collection = options.collection;
        this.table = options.table;
        this.rowItems = [];
        this.el.addEventListener('click', this.delEditHandlers.bind(this));
        this.addEventListener('reverse', this.reverse.bind(this));
        this.addEventListener('columnSort', this.sort.bind(this));
        this.render();
    }

    TableBody.prototype = Object.create(App.Views.EventCollection.prototype);

    TableBody.prototype.clearTBody = function () {
        this.el.innerHTML = '';
        this.rowItems.length = 0;
    };

    TableBody.prototype.render = function () {
        this.clearTBody();
        if (this.collection.length === 0) {
            this.el.innerHTML = '<tr class="dummy">' +
                '<td colspan ="7">There is no more clients</td>' +
                '</tr>';
        } else {
            var self = this;
            var fragment = document.createDocumentFragment();
            this.collection.forEach(function (item) {
                var rowItem = new App.Views.RowItem({
                    model: item,
                    collection: self.collection
                });
                self.rowItems.push(rowItem);
                fragment.appendChild(rowItem.el);
            });
            this.el.appendChild(fragment);
        }
        return this.el;
    };

    TableBody.prototype.reverse = function () {
        this.collection.reverse();
        this.render();
    };

    TableBody.prototype.sort = function (sortBy) {
        switch (sortBy) {
            case 'id' :
                this.collection.sort(function (obj1, obj2) {
                    return +obj1[sortBy] - +obj2[sortBy];
                });
                break;
            case 'date':
                this.collection.sort(function (obj1, obj2) {
                    var dateOne = Date.parse(obj1[sortBy]);
                    var dateTwo = Date.parse(obj2[sortBy]);
                    return dateOne - dateTwo;
                });
                break;
            default  :
                this.collection.sort(function (obj1, obj2) {
                    return obj1[sortBy] > obj2[sortBy] ? 1 : -1;
                });
        }
        this.render();
    };


    TableBody.prototype.delEditHandlers = function (e) {
        if (e.target.className === 'delClient') {
            this.deleteRow(e);
        }
        if (e.target.className === 'editClient') {
            var row = e.target.closest('TR');
            var colIndex = this.findColIndex(row);
            var model = this.collection[colIndex];
            this.triggerEvent('edit', model);
        }
    };


    TableBody.prototype.deleteRow = function (e) {
        var row = e.target.closest('TR');
        if (e.target.className !== 'delClient') {
            return false;
        }
        var colIndex = this.findColIndex(row);
        this.collection.splice(colIndex, 1);
        if (this.collection.length === 0) {
            this.render();
        } else {
            var rowIndex = this.findRowIndex(row);
            this.rowItems[rowIndex].destroy();
            this.rowItems.splice(rowIndex, 1);
        }
    };

    TableBody.prototype.findRowIndex = function (row) {
        var rowIndex;
        this.rowItems.forEach(function (item, index) {
            if (+row.dataset.id === item.model.id) {
                rowIndex = index;
            }
        });
        return rowIndex;
    };

    TableBody.prototype.findColIndex = function (row) {
        var colIndex;
        this.collection.forEach(function (item, index) {
            if (+row.dataset.id === item.id) {
                colIndex = index;
            }
        });
        return colIndex;
    };
    
    App.Views.TableBody = TableBody;
})(App);


