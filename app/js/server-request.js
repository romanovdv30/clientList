;(function (App) {
    'use strict';

    function ServerRequest(options) {
        this.xhr = new XMLHttpRequest();
        this.method = options.method;
        this.URL = options.URL;
        this.settings = options.settings;
        this.params = options.params;
        this.success = this.settings.success;
        this.error = this.settings.error;
        this.model = this.params.model;
        this.id = this.params.id;
        this.requestString = this.createRequestString(this.params);
        this.requestBody = '';
        var self = this;
        this.actions = {
            GET: function () {
                self.URL += '?' + self.requestString;
            },
            POST: function () {
                if (self.model) {
                    self.requestBody = self.createRequestString(self.model);
                } else {
                    self.requestBody = self.requestString;
                }
            },
            PUT: function () {
                self.requestBody = self.createRequestString(self.model);
            },
            DELETE: function () {
                self.requestBody = self.requestString;
            }
        };
        this.actions[this.method]();
        this.xhr.open(this.method, this.URL, true);
        this.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        this.xhr.addEventListener('readystatechange', this.readyStateChangeHandler.bind(this));
        this.xhr.send(this.requestBody);
    }

    ServerRequest.prototype.createRequestString = function (data) {
        var str = '';
        for (var key in data) {
            str += key + '=' + encodeURIComponent(data[key] + '') + '&';
        }
        return str;
    };

    ServerRequest.prototype.readyStateChangeHandler = function () {
        if (this.xhr.readyState !== 4) {
            return;
        }
        if (this.xhr.status >= 200 && this.xhr.status < 300) {
                var pageResult = JSON.parse(this.xhr.responseText);
                this.success(pageResult);
        } else {
            var errorText = 'error: ' + (this.xhr.status ? this.xhr.statusText : 'problems with request');
            return this.error(errorText);
        }
    };
    App.Request.ServerRequest = ServerRequest;
})(App);