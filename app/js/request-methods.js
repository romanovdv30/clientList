;(function (App) {
    'use strict';

    var baseUrl = 'http://localhost:4000/';
    var userModelsName = 'users';
    var userModelName = 'user';
    var adminModelsName = 'admins';
    var adminModelName = 'admin';

    App.Request = {
        loadUsers: function (settings, loadingSettings) {
            loadingSettings = loadingSettings || {};
            return new App.Request.ServerRequest(
                {
                    method: 'POST',
                    URL: baseUrl + userModelsName,
                    params: loadingSettings,
                    settings: settings
                });
        },
        addUser: function (settings, params) {
            return new App.Request.ServerRequest(
                {
                    method: 'POST',
                    URL: baseUrl + userModelName,
                    settings: settings,
                    params: params
                });
        },
        deleteUser: function (settings, params) {
            return new App.Request.ServerRequest(
                {
                    method: 'DELETE',
                    URL: baseUrl + userModelName,
                    settings: settings,
                    params: params
                });
        },
        getUser: function (settings, params) {
            return new App.Request.ServerRequest(
                {
                    method: 'GET',
                    URL: baseUrl + userModelName,
                    settings: settings,
                    params: params
                });
        },
        editUser: function (settings, params) {
            return new App.Request.ServerRequest(
                {
                    method: 'PUT',
                    URL: baseUrl + userModelName,
                    settings: settings,
                    params: params
                });
        },
        loadAdmins: function (settings, loadingSettings) {
            loadingSettings = loadingSettings || {};
            return new App.Request.ServerRequest(
                {
                    method: 'POST',
                    URL: baseUrl + adminModelsName,
                    params: loadingSettings,
                    settings: settings
                });
        },
        addAdmin: function (settings, params) {
            return new App.Request.ServerRequest(
                {
                    method: 'POST',
                    URL: baseUrl + adminModelName,
                    settings: settings,
                    params: params
                });
        },
        deleteAdmin: function (settings, params) {
            return new App.Request.ServerRequest(
                {
                    method: 'DELETE',
                    URL: baseUrl + adminModelName,
                    settings: settings,
                    params: params
                });
        },
        getAdmin: function (settings, params) {
            return new App.Request.ServerRequest(
                {
                    method: 'GET',
                    URL: baseUrl + adminModelName,
                    settings: settings,
                    params: params
                });
        },
        editAdmin: function (settings, params) {
            return new App.Request.ServerRequest(
                {
                    method: 'PUT',
                    URL: baseUrl + adminModelName,
                    settings: settings,
                    params: params
                });
        }
    };
})(App);