var app = app || {};

(function() {
    app.EventsCollection = Backbone.Collection.extend({
        //reference to its model
        model: app.Event,
        localStorage: new Backbone.LocalStorage('events'),
    });
    
    app.events = new app.EventsCollection();
})();
