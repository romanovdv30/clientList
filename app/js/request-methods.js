;(function (App) {
    'use strict';

    var baseUrl = 'http://localhost:4000/';
    var modelsName = 'users';
    var modelName = 'user';

    App.Request = {    
        loadUsers: function (settings,  loadingSettings) {
            loadingSettings = loadingSettings || {};
            return new App.Request.ServerRequest(
                {
                    method: 'POST',
                    URL: baseUrl + modelsName,
                    params: loadingSettings,
                    settings: settings
                });
        },
        addUser: function (settings,params) {
            return new App.Request.ServerRequest(
                {
                    method: 'POST',
                    URL: baseUrl + modelName,
                    settings: settings,
                    params:params
                });
        },
        deleteUser: function (settings,params) {
            return new App.Request.ServerRequest(
                {
                    method: 'DELETE',
                    URL: baseUrl + modelName,
                    settings: settings,
                    params: params
                });
        },
        getUser: function (settings,params) {
            return new App.Request.ServerRequest(
                {
                    method: 'GET',
                    URL: baseUrl + modelName,
                    settings: settings,
                    params: params
                });
        },
        editUser: function(settings,params){
            return new App.Request.ServerRequest(
                {
                    method: 'PUT',
                    URL: baseUrl + modelName,
                    settings: settings,
                    params: params
                });
        }
    };
})(App);