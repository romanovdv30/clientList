;(function (App) {
    'use strict';

    var baseUrl = 'http://localhost:4000/';

    App.Request = {    
        loadUsers: function (settings,  loadingSettings) {
            loadingSettings = loadingSettings || {};
            return new App.Request.ServerRequest(
                {
                    method: 'POST',
                    URL: baseUrl + 'users',
                    params: loadingSettings,
                    settings: settings
                });
        },
        addUser: function (settings,params) {
            return new App.Request.ServerRequest(
                {
                    method: 'POST',
                    URL: baseUrl + 'user',
                    settings: settings,
                    params:params
                });
        },
        deleteUser: function (settings,params) {
            return new App.Request.ServerRequest(
                {
                    method: 'DELETE',
                    URL: baseUrl + 'user',
                    settings: settings,
                    params: params
                });
        },
        getUser: function (settings,params) {
            return new App.Request.ServerRequest(
                {
                    method: 'GET',
                    URL: baseUrl + 'user',
                    settings: settings,
                    params: params
                });
        },
        editUser: function(settings,params){
            return new App.Request.ServerRequest(
                {
                    method: 'PUT',
                    URL: baseUrl + 'user',
                    settings: settings,
                    params: params
                });
        }
    };
})(App);