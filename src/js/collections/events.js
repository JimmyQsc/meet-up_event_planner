var app = app || {};

app.EventsCollection = Backbone.Collection.extend({
    //reference to its model
    model: app.Event,

    localStorage: new Backbone.LocalStorage('events'),


});

app.events = new app.EventsCollection();