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
        //all the inputs
        this.eventHost = $('#event-host');
        this.endTime = $('#end-time');
        this.guestList = $('#guest-list');
        this.extraInfo = $('#extra-info');
        this.eventColor = $('#event-color');

        this.eventName =  $('#event-name');
        this.eventType = $('#event-type');
        this.startTime = $('#start-time');
        this.eventLocation = $('#event-location');

        // //all the required inputs
        // this.requiredInputs = [this.eventName, this.eventType, this.startTime, this.eventLocation];
        // this.eventName.validator = new app.CustomValidator($('#event-name'));
        // this.eventName.validator.requirements = [app.FormErrorChecker.required];

        // this.eventType.validator = new app.CustomValidator($('#event-type'));
        // this.eventType.validator.requirements = [app.FormErrorChecker.required];

        // this.startTime.validator = new app.CustomValidator($('#start-time'));
        // this.startTime.validator.requirements = [app.FormErrorChecker.required];

        // this.eventLocation.validator = new app.CustomValidator($('#event-location'));
        // this.eventLocation.validator.requirements = [app.FormErrorChecker.required];

        // validateOnEdit(this.requiredInputs);

        this.$form = $('#add-event');
        //set the default color
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
        //append it to the list
        this.$list.append(view.render().el);
    },

    validate: function() {
        validateOnSubmit(this.requiredInputs);
    },

    createEvent: function() {
        //create an event model
        app.events.create({
            name: this.eventName.val(),
            type: this.eventType.val(),
            host: this.eventHost.val(),
            startTime: this.startTime.val(),
            endTime: this.endTime.val(),
            guestList: this.eventLocation.val(),
            location: this.guestList.val(),
            extraInfo: this.extraInfo.val(),
            color: this.eventColor.val()
        });
        this.resetForm();
        //prevent reload page
        return false;
    },

    //reset the form
    resetForm: function() {
        this.$form[0].reset();
        $('#event-color').val('#FECE00');
    }
});
