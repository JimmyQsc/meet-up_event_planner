var app = app || {};

app.RegisterView = Backbone.View.extend({
    el: '#user',
    //template for the user
    template: _.template($('#user-template').html()),

    initialize: function() {
        this.form = $('.regist');
        this.registBtn = $('#regist-btn');
        this.container = $('.user-state');

        //remove the dom element
        this.listenTo(this.model, 'register', this.showRegist);
        this.listenTo(this.model, 'change', this.render);
        //fetch data from localstorage
        this.model.fetch();
        //render the view for the first time
        this.render();
    },

    render: function() {
        //if no user loged in open teh register form
        if (!this.model.get('login')) {
            this.form.show();
            this.registBtn.show();
        } else {
            this.form.hide();
            this.registBtn.hide();
            this.$el.html(this.template({name: this.model.get('userName')}));
        }
    },
    //show the register form
    showRegist: function() {
        this.render();
    }
});