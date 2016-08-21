var app = app || {};

app.RegisterView = Backbone.View.extend({
    el: '.user-state',

    events: {
        'click #regist-btn': 'showRegist',
        'submit #registration': 'saveUser',
        'change input': 'updateProgress'
    },

    //template for the user
    template: _.template($('#user-template').html()),

    initialize: function() {
        this.formLayer = $('.regist');
        this.registBtn = $('#regist-btn');
        this.$userInfo = $('#user');

        //cache user registration form
        this.form = $('#registration');
        this.submitBtn = $('#submit');
        this.$progress = $('progress');
        this.formProgress = 0;

        this.sNameInput = new SuperInput($('#name'));
        //set requirements for element
        this.sNameInput.requirements = [app.FormErrorChecker.required, app.FormErrorChecker.nameWithSpace];

        this.sEmailInput = new SuperInput($('#email'));
        this.sEmailInput.requirements = [app.FormErrorChecker.required, app.FormErrorChecker.validEmail];

        this.sPwdInput = new SuperInput($('#password'));
        this.sPwdInput.requirements = [app.FormErrorChecker.required, app.FormErrorChecker.minLength, app.FormErrorChecker.maxLength, app.FormErrorChecker.alphaNumeric, app.FormErrorChecker.hasNumber, app.FormErrorChecker.hasLetter];

        this.formInputs = [this.sNameInput, this.sEmailInput, this.sPwdInput];

        this.sNameInput.checkOnEdit();
        this.sEmailInput.checkOnEdit();
        this.sPwdInput.checkOnEdit();

        //close the form when user click outside the form or user clicks the close button
        $('.regist-form').click(function(e) {
            e.stopPropagation();
        });

        $('.regist, .close-form').click(function() {
            $('.regist').hide();
        });

        //remove the dom element
        this.listenTo(this.model, 'change', this.render);
        //fetch data from localstorage
        this.model.fetch();
        //render the view for the first time
        this.render();
    },

    render: function() {
        //if no user loged in open teh register form
        if (!this.model.get('login')) {
            this.formLayer.show();
            this.registBtn.show();
        } else {
            this.formLayer.hide();
            this.registBtn.hide();
            this.$userInfo.html(this.template({name: this.model.get('userName')}));
        }
    },

    //show the register form
    showRegist: function() {
        this.render();
    },

    //save user data
    saveUser: function() {
        this.model.save({
            userName: this.sNameInput.getInputValue(),
            userEmail: this.sEmailInput.getInputValue(),
            userPwd: this.sPwdInput.getInputValue(),
            login: true
        });
    },

    updateProgress: function() {
        this.formProgress = 0;
        _.each(this.formInputs, function(input) {
            if(input.isValid)
                this.formProgress++;
        }, this);
        this.$progress.val(this.formProgress);
    }
});