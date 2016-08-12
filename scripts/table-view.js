function TableView(options) {
    this.el = document.createElement("TABLE");
    this.el.className = "list";
    this.collection = options.collection;
    this.rowItems = [];// rename to rowItems
    this.tBody = new TableBody({
        collection: this.collection,
        table: this
    });
    this.header = new HeaderItem({
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
    var captionElement = document.createElement("CAPTION");
    captionElement.textContent = "Clients List";
    this.el.appendChild(captionElement);
};

