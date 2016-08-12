function EventCollection () {
    var eventCollection = [];

    this.addEventListener = function (eventType, eventHandler) {
        eventCollection.push({
            eventType: eventType,
            eventHandler: eventHandler
        })
    };

    this.triggerEvent = function(eventType,arg) {
        eventCollection.forEach(function(event){
            if(eventType == event.eventType){
               event.eventHandler(arg);
            }
        });
    }
}

