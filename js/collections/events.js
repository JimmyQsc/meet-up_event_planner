var app = app || {};

app.Events = Backbone.Collection.extend({
    //reference to its model
    model: app.Event,

    localStorage: new Backbone.LocalStorage('events');


});