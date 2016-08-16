;(function (App) {
    'use strict';

    function EventCollection() {
        this.eventCollection = [];
    }

    EventCollection.prototype.addEventListener = function (eventType, eventHandler) {
        this.eventCollection.push({
            eventType: eventType,
            eventHandler: eventHandler
        });
    };

    EventCollection.prototype.triggerEvent = function (eventType, arg) {
        this.eventCollection.forEach(function (event) {
            if (eventType === event.eventType) {
                event.eventHandler(arg);
            }
        });
    };

    App.Views.EventCollection = EventCollection;
})(App);