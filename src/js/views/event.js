var app = app || {};

(function($) {
    app.EventView = Backbone.View.extend({
        tagName: 'li',

        className: 'event',
        //template to render a event
        template: _.template($('#event-template').html()),

        //listen to model event in initialization
        intialize: function() {
            this.listenTo(this.model, 'change', this.render);
        },
        //renber a single event's view
        render: function() {
            this.$el.html(this.template(this.model.attributes));
            var eventColor = this.model.get('color');
            this.$el.css({
                'background': eventColor,
                'border-color': eventColor,
            });
            return this;
        }
    });
})(jQuery);
