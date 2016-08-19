var app = app || {};

app.Event = Backbone.Model.extend({
    defaults: {
        name: '',
        type: '',
        host: '',
        startTime: '',
        endTime: '',
        guestList: 'You will see them',
        location: '',
        extraInfo:'No additional information',
        color: '#fec000'
    }
});