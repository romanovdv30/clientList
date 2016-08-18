;(function () {
    'use strict';
    
    function createLayout() {
        var layout = new App.Views.AppLayout ();
        layout.loadClients();
        layout.render();
    }
    document.addEventListener('DOMContentLoaded', createLayout);
})();