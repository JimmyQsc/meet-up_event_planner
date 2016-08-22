var app = app || {};

(function() {
    /**
     * The router make sure the url change will change the app's view, the right url
     * always brings the right view
     */
    var Router = Backbone.Router.extend({
        routes: {
            '': 'defaultView',
            'list-events': 'listEvents'
        },

        //make sure the right view is open
        defaultView: function() {
            $('.event-form').addClass('open');
            $('.events-view').removeClass('open');
            $('.addEvent').addClass('current');
            $('.listEvent').removeClass('current');
            $('#event-name').focus();
        },

        listEvents: function() {
            $('.event-form').removeClass('open');
            $('.events-view').addClass('open');
            $('.addEvent').removeClass('current');
            $('.listEvent').addClass('current');
        }
    });

    app.router = new Router();
    Backbone.history.start();
})();
