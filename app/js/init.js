;(function (document) {
    'use strict';
    
    function createLayout() {
        var layout = new App.Views.AppLayout ();
        layout.loadUsers();
        layout.render();
    }
    document.addEventListener('DOMContentLoaded', createLayout);
})(document);