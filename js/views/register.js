var app = app || {};

app.RegisterView = Backbone.View.extend({
    el: '.user-state',

    events: {
        'click #regist-btn': 'showRegist',
        'submit #registration': 'saveUser',
        //'click #submit': 'validate'
    },
    //template for the user
    template: _.template($('#user-template').html()),

    initialize: function() {
        this.formLayer = $('.regist');
        this.registBtn = $('#regist-btn');
        this.$userInfo = $('#user');

        //cache user registration form
        this.form = $('#registration');
        this.nameInput = $('#name');
        this.emailInput = $('#email');
        this.pwdInput = $('#password');
        this.submitBtn = $('#submit');

        //set validator for diffrent input element
        this.nameInput.validator = new app.CustomValidator($('#name'));
        //set requirements for element
        this.nameInput.validator.requirements = [app.FormErrorChecker.required, app.FormErrorChecker.nameWithSpace];

        this.emailInput.validator = new app.CustomValidator($('#email'));
        this.emailInput.validator.requirements = [app.FormErrorChecker.required, app.FormErrorChecker.validEmail];

        this.pwdInput.validator = new app.CustomValidator($('#password'));
        this.pwdInput.validator.requirements = [app.FormErrorChecker.required, app.FormErrorChecker.minLength, app.FormErrorChecker.maxLength, app.FormErrorChecker.alphaNumeric, app.FormErrorChecker.hasNumber, app.FormErrorChecker.hasLetter];

        this.formInputs = [this.nameInput, this.emailInput, this.pwdInput];

        //validate inputs whenever a change event is triggered
        validateOnEdit(this.formInputs);

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

    // validate: function() {
    //     _.each(this.formInputs, function(input) {
    //         input.validator.validate();
    //         input[0].setCustomValidity(input.validator.getMessage());
    //     });
    // },
    saveUser: function() {

        this.model.save({
            userName: this.nameInput.val(),
            userEmail: this.emailInput.val(),
            userPwd: this.pwdInput.val(),
            login: true
        });
    }
});