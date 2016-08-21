var app = app || {};

(function($) {
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
            this.jobTitle = $('#jobTitle');
            this.submitBtn = $('#submit');
            this.$progress = $('#r-f-p');
            this.formProgress = 0;
            //Make input to SuperInput, use its method to validate input value
            this.sNameInput = new SuperInput($('#name'));
            //set requirements for element
            this.sNameInput.requirements = [app.FormErrorChecker.required, app.FormErrorChecker.nameWithSpace];

            this.sEmailInput = new SuperInput($('#email'));
            this.sEmailInput.requirements = [app.FormErrorChecker.required, app.FormErrorChecker.validEmail];

            this.sPwdInput = new SuperInput($('#password'));
            this.sPwdInput.requirements = [app.FormErrorChecker.required, app.FormErrorChecker.minLength(6), app.FormErrorChecker.maxLength(16), app.FormErrorChecker.alphaNumeric, app.FormErrorChecker.hasNumber, app.FormErrorChecker.hasLetter];

            this.formInputs = [this.sNameInput, this.sEmailInput, this.sPwdInput];
            //validate input when input value changes
            this.sNameInput.checkOnChange();
            this.sEmailInput.checkOnChange();
            //validate password on every keyup
            this.sPwdInput.checkOnChange().checkOnKeyup();

            //close the form when user click outside the form or user clicks the close button
            $('.regist-form').click(function(e) {
                e.stopPropagation();
            });

            $('.regist, .close-form').click(function() {
                $('.regist').hide();
                $('#event-name').focus();
            });

            //remove the dom element
            this.listenTo(this.model, 'change', this.render);
            //fetch data from localstorage
            this.model.fetch();
            //render the view for the first time
            this.render();
        },

        render: function() {
            this.updateProgress();
            //if no user loged in open teh register form
            if (!this.model.get('login')) {
                this.formLayer.show();
                this.sNameInput.input.focus();
                this.registBtn.show();
            } else {
                this.formLayer.hide();
                this.registBtn.hide();
                $('#event-name').focus();
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
                jboTitle: this.jobTitle.val(), 
                login: true
            });
        },
        //check progress and update progressbar value
        updateProgress: function() {
            this.formProgress = 0;
            _.each(this.formInputs, function(input) {
                if(input.isValid)
                    this.formProgress++;
            }, this);
            this.$progress.val(this.formProgress);
        }
    });
})(jQuery); 
