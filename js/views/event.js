var app = app || {};

app.EventView = Backbone.View.extend({
    tagName: 'li',

    className: 'event',
    //template to render a event
    template: _.template($('#event-template').html()),

    //listen to model event in initialization
    intialize: function() {
        this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
        this.$el.html(this.template(this.model.attributes));
        return this;
    }
});