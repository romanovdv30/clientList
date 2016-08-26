;(function (App) {
    'use strict';

    function TableBody(options) {
        App.Views.EventCollection.call(this);
        this.el = document.createElement('TBODY');
        this.el.className = 'tableBody';
        this.collection = options.collection;
        this.loadingSettings = options.settings;
        this.table = options.table;
        this.rowItems = [];
        this.el.addEventListener('click', this.delEditHandlers.bind(this));
        this.el.addEventListener('scroll', this.scrollHandler.bind(this));
        this.addEventListener('loadFinished', this.updateTable.bind(this));
        this.addEventListener('reverse', this.reverse.bind(this));
        this.addEventListener('columnSort', this.sort.bind(this));
        this.addEventListener('eraseRow', this.eraseRow.bind(this));
        this.render();
    }

    TableBody.prototype = Object.create(App.Views.EventCollection.prototype);

    TableBody.prototype.scrollHandler = function () {
        clearTimeout(this.scrollTimerId);
        var self = this;
        this.scrollTimerId = setTimeout(function () {
            if (!self.loadingSettings.loadingInProgress) {
                if (self.el.scrollHeight - (self.el.scrollTop + self.el.offsetHeight) <= 500) {
                    if (!self.loadingSettings.totalItems ||
                        (self.loadingSettings.totalItems > (self.loadingSettings.page + 1) * self.loadingSettings.pageSize)) {
                        self.loadingSettings.page++;
                        self.triggerEvent('loadingStart'); //send query on server handler
                    } else {
                        self.loadingSettings.allPagesLoaded = true;
                    }
                }
            }
        }, 200);
    };

    TableBody.prototype.updateTable = function (clients) {
        var self = this;
        clients.forEach(function (item) {
            self.collection.push(item);
        });
        this.render();
    };

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
       this.row = e.target.closest('TR');
        var index = +this.row.dataset.id;
        if (e.target.className === 'delClient') {
            this.triggerEvent('delete',index);
        }
        if (e.target.className === 'editClient') {
            this.triggerEvent('get',this.row);
        }
    };

    TableBody.prototype.eraseRow = function (result) {
        var self = this;
        var colIndex = this.findColIndex();
        if (this.collection.length === 10) {
            self.scrollHandler();
        }
        var rowIndex = this.findRowIndex();
        console.log('model with id: ' + result.id + 'was deleted');
        this.collection.splice(colIndex, 1);
        this.rowItems[rowIndex].destroy();
        this.rowItems.splice(rowIndex, 1);
    };

    TableBody.prototype.findRowIndex = function () {
        var rowIndex;
        var self = this;
        this.rowItems.forEach(function (item, index) {
            if (+self.row.dataset.id === item.model.id) {
                rowIndex = index;
            }
        });
        return rowIndex;
    };

    TableBody.prototype.findColIndex = function () {
        var colIndex;
        var self = this;
        this.collection.forEach(function (item, index) {
            if (+self.row.dataset.id === item.id) {
                colIndex = index;
            }
        });
        return colIndex;
    };

    App.Views.TableBody = TableBody;
})(App);


