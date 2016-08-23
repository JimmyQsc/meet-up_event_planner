var app = app || {};

(function($) {
    app.MainView = Backbone.View.extend({
        el: '.planer-app',

        events: {
            'click #add': 'validate',
            'submit #add-event': 'createEvent',
            'change input, textarea': 'progress'
        },

        initialize: function() {
            //cache dom element
            this.$list = $('.event-list');
            this.$eventsView = $('.events-view');
            this.$eventForm = $('.event-form');
            this.$progress = $('#e-f-p');

            this.formProgress = 1;
            //all the inputs
            this.eventHost = new SuperInput($('#event-host'));
            this.endTime = new SuperInput($('#end-time'));
            this.guestList = new SuperInput($('#guest-list'));
            this.extraInfo = new SuperInput($('#extra-info'));
            this.eventColor = new SuperInput($('#event-color'));

            this.eventName =  new SuperInput($('#event-name'));
            this.eventType = new SuperInput($('#event-type'));
            this.startTime = new SuperInput($('#start-time'));
            this.eventLocation = new SuperInput($('#event-location'));
            this.requiredInputs = [this.eventName, this.eventType, this.eventHost, this.eventLocation, this.guestList, this.startTime, this.endTime];
            //for every required inputs add required to their requirements
            _.each(this.requiredInputs, function(input) {
                input.requirements.push(app.FormErrorChecker.required);
                input.checkOnChange();
            });
            //these two need to have a time check
            this.startTime.requirements.push(app.FormErrorChecker.laterThanNow);
            this.endTime.requirements.push(app.FormErrorChecker.laterThanNow, function(value) {
                var startTime = $('#start-time').val();
                if (value && startTime) {
                    if (Date.parse(value) <= Date.parse(startTime)) {
                        return 'This should happen later than start time';
                    }
                    return '';
                }
            });


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
                name: this.eventName.getInputValue(),
                type: this.eventType.getInputValue(),
                host: this.eventHost.getInputValue(),
                startTime: this.startTime.getInputValue(),
                endTime: this.endTime.getInputValue(),
                guestList: this.eventLocation.getInputValue(),
                location: this.guestList.getInputValue(),
                extraInfo: this.extraInfo.getInputValue(),
                color: this.eventColor.getInputValue()
            });

            this.resetForm();
            //prevent reload page
            return false;
        },

        //reset the form
        resetForm: function() {
            this.$form[0].reset();
            this.$progress.val(0);
            $('#event-color').val('#FECE00');
        },

        //update the progress bar
        progress: function() {
            this.formProgress = 0;
            _.each(this.requiredInputs, function(input) {
                if(input.isValid)
                    this.formProgress++;
            }, this);
            this.$progress.val(this.formProgress);
        }
    });
})(jQuery);
