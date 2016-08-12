function Layout(options) {
    this.collection = options.collection;
    this.table = new TableView({
        collection: this.collection
    });
    this.button = document.createElement("BUTTON");
}

Layout.prototype.createButton = function () {
    this.button.className = "addClient";
    this.button.textContent = "Add Client";
    this.button.addEventListener("click", this.addClient.bind(this));
    return this.button;
};

Layout.prototype.addClient= function () {
    var popup = document.querySelector(".popup");
    if (popup) {
        return false;
    }
    var form = new FormView({
        collection: this.collection,
        table:this.table,
        model: {}
    });
    document.body.appendChild(form.render());
};

Layout.prototype.render = function () {
    document.body.appendChild(this.table.render());
    document.body.appendChild(this.createButton());
};
