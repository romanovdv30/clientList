;(function (w) {
    var clients;
    var layout;

    function getClientsData() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'data/clients.json', true);
        xhr.send();

        xhr.onreadystatechange = function () {
            if (this.readyState != 4) return;
            if (this.status != 200) {
                alert('ошибка: ' + (this.status ? this.statusText : 'запрос не удался'));
            } else {
                var clients = JSON.parse(xhr.responseText);
                createLayout(clients);
            }
        }
    }
    
    function createLayout(clients) {
        layout = new Layout({
            collection: clients
        });
        layout.render();
    }

    function init() {
        getClientsData();        
    }

    document.addEventListener("DOMContentLoaded", init);
})
(window);