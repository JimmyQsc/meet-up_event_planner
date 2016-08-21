var app = app || {};

//Model for a event
(function() {
    app.Event = Backbone.Model.extend({
        defaults: {
            name: '',
            type: '',
            host: '',
            startTime: '',
            endTime: '',
            guestList: 'Coolest people on earth',
            location: '',
            extraInfo:'No additional information',
            color: '#fec000'
        }
    });
})();
