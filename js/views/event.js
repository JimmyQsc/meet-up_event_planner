var app = app || {};

app.EventView = Backbone.View.extend({
    tagName: 'li',

    className: 'event',
    //template to render a event
    eventTpl: _.template($('#event-template').html()),

    //listen to model event in initialization
    intialize: function() {
        this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
        this.$el.html(this.eventTpl(this.model.attributes));
        return this;
    }
});