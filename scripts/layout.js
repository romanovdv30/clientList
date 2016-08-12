function Layout(options) {
    this.collection = options.collection;
    this.table = new TableView({
        collection: this.collection
    });
    this.button = document.createElement("BUTTON");
    this.table.tBody.addEventListener("edit",this.editModel.bind(this));
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

Layout.prototype.editModel = function (model) {
    var popup = document.querySelector(".popup");
    if (popup) {
        return false
    }

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