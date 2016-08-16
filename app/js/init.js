;(function (w) {
    'use strict';
    
    function createLayout(clients) {
        var layout = new App.Views.AppLayout ({
            collection: clients
        });
        layout.render();
    }

    function getClientsData() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'data/clients.json', true);
        xhr.send();

        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) {
                return;
            } 
            if (this.status >= 200 && this.status <300) {
                App.Collections.clients = JSON.parse(xhr.responseText);
                createLayout(App.Collections.clients);
            } else {
                w.alert('error: ' + (this.status ? this.statusText : 'problems with request'));
            }
        };
    }

    function init() {
        getClientsData();
    }

    document.addEventListener('DOMContentLoaded', init);
})(window);