function TableBody(options) {
    EventCollection.call(this);
    this.el = document.createElement("TBODY");
    this.el.className = "tableBody";
    this.collection = options.collection;
    this.table = options.table;
    this.rowItems = [];
    this.addHandlers.call(this);
    this.addEventListener('reverse', this.reverse.bind(this));
    this.addEventListener('columnSort', this.sort.bind(this));
    this.render();
    var self= this;
    this.id = setInterval(function tickTack(){
            self.render();
        }
        , 1000);
}

TableBody.prototype.clearTBody = function () {
    this.el.innerHTML = '';
    this.rowItems.length = 0;
};

TableBody.prototype.render = function () {
    this.clearTBody();
    if (this.collection.length == 0) {
        this.el.innerHTML = '<tr class="dummy">' +
            '<td colspan ="7">There is no more clients</td>' +
            '</tr>';
    } else {
        var self = this;
        var fragment = document.createDocumentFragment();
        this.collection.forEach(function (item) {
            var rowItem = new RowItem({
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
        case "id" :
            this.collection.sort(function (obj1, obj2) {
                return +obj1[sortBy] - +obj2[sortBy];
            });
            break;
        case "date":
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

TableBody.prototype.addHandlers = function () {
    this.el.addEventListener("click", this.deleteRow.bind(this));
    this.el.addEventListener("click", this.editModel.bind(this));
};

TableBody.prototype.editModel = function (e) {
    var popup = document.querySelector(".popup");
    if (e.target.className != "editClient" || popup) {
        return false
    }

    var row = e.target.closest("TR");
    var colIndex = this.findColIndex(row);
    var model = this.collection[colIndex];

    var form = new FormView({
        collection: this.collection,
        table: this.table,
        model: model
    });
    document.body.appendChild(form.render());
    changeForm();
    function changeForm(){
        var popup = document.querySelector(".popup");
        popup.querySelector("h3").textContent = "Edit Client";
        popup.querySelector(".add-btn").style.display = "none";
        popup.querySelector(".edit-btn").style.display = "inline";
    }
};

TableBody.prototype.deleteRow = function (e) {
    var row = e.target.closest("TR");
    if (e.target.className !== "delClient") {
        return false;
    }
    var colIndex = this.findColIndex(row);

    this.collection.splice(colIndex, 1);
    if (this.collection.length == 0) {
        this.render();
    } else {
        //remove rowItem and destroy timer
        row.parentElement.removeChild(row);
    }
};

TableBody.prototype.findColIndex = function (row) {
    var colIndex;
    this.collection.forEach(function (item, index) {
        if (+row.dataset.id == item.id) {
            colIndex = index;
        }
    });

    return colIndex;
};




