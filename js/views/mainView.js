var app = app || {};

app.MainView = Backbone.View.extend({
    el: '.planer-app',

    events: {
        'click #add': 'createEvent'
    },

    initialize: function() {
        //cache dom element
        this.$list = $('.event-list');
        this.$eventsView = $('.events-view');
        this.$eventForm = $('.event-form');
        this.$inputs = {
            eventName: $('#event-name'),
            eventType: $('#event-type'),
            eventHost: $('#event-host'),
            startTime: $('#start-time'),
            endTime: $('#end-time'),
            eventLocation: $('#event-location'),
            guestList: $('#guest-list'),
            extraInfo: $('#extra-info'),
            eventColor: $('#event-color')
        };

        this.$form = $('#add-event');
        //listen to collection event
        this.listenTo(app.events, 'add', this.appendItem);
        //fetch data from localstorage
        app.events.fetch();
        this.render();
    },

    render: function() {
        //drag the events view to the right place
        var height = this.$eventForm[0].offsetHeight;
        this.$eventsView.css('margin-top', -height);
        this.$eventsView.css('height', height);
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
            host: this.$inputs.eventHost.val(),
            startTime: this.$inputs.startTime.val(),
            endTime: this.$inputs.endTime.val(),
            guestList: this.$inputs.eventLocation.val(),
            location: this.$inputs.guestList.val(),
            extraInfo: this.$inputs.extraInfo.val(),
            color: this.$inputs.eventColor.val()
        });

        //prevent page refresh
        return false;
    }
});
