;(function (App) {
    'use strict';
   
    function RowItem(options) {
        this.el = document.createElement('TR');
        this.el.className = 'client';
        this.model = options.model;
        this.el.dataset.id = this.model.id;
        this.id = this.model.id;
        this.render();
    }
   
    RowItem.prototype.templ = function (elem, model) {
        var fragment = model.createTemplate();
        elem.appendChild(fragment);
    };

    RowItem.prototype.render = function () {
        this.templ(this.el, this.model);
        return this;
    };

    RowItem.prototype.destroy = function () {
        this.model.timeView.stop();
        this.el.parentElement.removeChild(this.el);
    };
    
    App.Views.RowItem = RowItem;
})(App);
