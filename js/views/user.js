var app = app || {};

app.UserView = Backbone.View.extend({
    el: '#user',
    //template for the user
    template: _.template($('#user-template').html()),

    events: {
        'click #show-user-action': 'showAction'
    },


    initialize: function() {
        this.form = $('.regist');
        this.registBtn = $('#regist-btn');
        this.container = $('.user-state');

        this.listenTo(this.model, 'change', this.render);
        //remove the dom element
        this.listenTo(this.model, 'register', this.showRegist);
        //fetch data from localstorage
        this.model.fetch();
        //render the view for the first time
        this.render();
    },

    render: function() {
        if (!this.model.get('login')) {
            this.form.show();
            this.registBtn.show();
        } else {
            this.$el.html(this.template({name: this.model.get('userName')}));
        }
    },

    showRegist: function() {
        this.render();
    }
});