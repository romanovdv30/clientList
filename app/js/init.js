;(function (App,document) {
    'use strict';
    
    function createLayout() {
        var layout = new App.Views.AppLayout ();
        layout.loadUsers();
        layout.loadAdmins();        
        layout.render();
    }
    document.addEventListener('DOMContentLoaded', createLayout);
})(App,document)