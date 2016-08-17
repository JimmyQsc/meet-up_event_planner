var app = app || {};

app.UserView = Backbone.View.extend({

    el: '.user-state',

    events: {
        'click #user-btn': 'showMenu',
        'click .user-menu': 'logout'
    },


    initialize: function() {
        this.form = $('.regist');
        this.$userBtn = $('#user-btn');
        this.$userMenu = $('.user-menu');

        this.listenTo(this.model, 'change', this.render);

        this.model.fetch();

        this.render();
    },

    render: function() {
        if (!this.model.get('login')) {
            this.form.show();
            this.$userBtn.html('Register');
        } else {
            this.$userBtn.html(this.model.get('userName'));
            this.$userMenu.html('<button class="logout">logout</button>');
        }
    },

    showMenu: function() {
        this.render();
        this.$userMenu.toggleClass('show');
    },

    logout: function() {
        this.model.destroy();
        this.render();
    }

});