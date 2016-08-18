var app = app || {};

app.MainView = Backbone.View.extend({
    el: '.planer-app',

    events: {
        'click #add': 'createEvent'
    },

    initialize: function() {
        //cache dom element
        this.$list = $('.event-list');
        this.$inputs = {
            eventName: $('#event-name'),
            eventType: $('#event-type'),
            eventHost: $('#event-host'),
            startTime: $('#start-time'),
            endTime: $('#end-time'),
            eventLocation: $('#event-location'),
            guestList: $('#guest-list'),
            extraInfo: $('#extra-info')
        };
        this.$form = $('#add-event');

        app.events.fetch();
        //listen to collection event
        this.listenTo(app.events, 'add', this.appendItem);
    },

    render: function() {

    },

    appendItem: function(event) {
        //create a view for the event
        var view = new app.EventView({model: event});
        //append it to teh list
        this.$list.append(view.render().el);
    },

    createEvent: function() {
        app.events.create({
            name: this.$inputs.eventName.val(),
            type: this.$inputs.eventType.val(),
            host: this.$inputs.eventType.val(),
            startTime: this.$inputs.eventType.val(),
            endTime: this.$inputs.eventType.val(),
            guestList: this.$inputs.eventType.val(),
            location: this.$inputs.eventType.val(),
            extraInfo: this.$inputs.eventType.val()
        });
        //prevent page refresh
        return false;
    }
});