var app = app || {};

app.MainView = Backbone.View.extend({
    el: '.planer-app',

    events: {
        'click #add': 'validate',
        'submit #add-event': 'createEvent'
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
        this.eventName =  $('#event-name');
        this.eventType = $('#event-type');
        this.startTime = $('#start-time');
        this.eventLocation = $('#event-location');

        this.requiredInputs = [this.eventName, this.eventType, this.startTime, this.eventLocation];
        this.eventName.validator = new app.CustomValidator($('#event-name'));
        this.eventName.validator.requirements = [app.FormErrorChecker.required];

        this.eventType.validator = new app.CustomValidator($('#event-type'));
        this.eventType.validator.requirements = [app.FormErrorChecker.required];

        this.startTime.validator = new app.CustomValidator($('#start-time'));
        this.startTime.validator.requirements = [app.FormErrorChecker.required];

        this.eventLocation.validator = new app.CustomValidator($('#event-location'));
        this.eventLocation.validator.requirements = [app.FormErrorChecker.required];

        validateOnEdit(this.requiredInputs);

        this.$form = $('#add-event');
        $('#event-color').val('#FECE00');

        this.appHeight = this.$eventForm[0].offsetHeight;
        //listen to collection event
        this.listenTo(app.events, 'add', this.appendItem);
        //fetch data from localstorage
        app.events.fetch();
        this.render();
    },

    render: function() {
        //drag the events view to the right place
        this.$eventsView.css('margin-top', -this.appHeight);
        this.$eventsView.css('height', this.appHeight);
    },

    appendItem: function(event) {
        //create a view for the event
        var view = new app.EventView({model: event});
        //append it to teh list
        this.$list.append(view.render().el);
    },

    validate: function() {
        validateOnSubmit(this.requiredInputs);
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
        this.$form[0].reset();

        return false;
    }
});
