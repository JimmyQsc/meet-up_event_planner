$(function() {
    //create a user instance
    var user = new app.User({id: 1});
    //vreate a user view
    new app.RegisterView({model: user});

    //Instantiate the main view of the app
    new app.MainView();

    //cache user registration form
    var form = $('#registration');
    var nameInput = $('#name');
    var emailInput = $('#email');
    var pwdInput = $('#password');
    var submitBtn = $('#submit');
    //click this button to regist
    var registBtn = $('#regist-btn');

    //set validator for diffrent input element
    nameInput.validator = new app.CustomValidator(nameInput);
    //set requirements for element
    nameInput.validator.requirements = [app.FormErrorChecker.required, app.FormErrorChecker.alpha];

    emailInput.validator = new app.CustomValidator(emailInput);
    emailInput.validator.requirements = [app.FormErrorChecker.required, app.FormErrorChecker.validEmail];

    pwdInput.validator = new app.CustomValidator(pwdInput);
    pwdInput.validator.requirements = [app.FormErrorChecker.required, app.FormErrorChecker.minLength, app.FormErrorChecker.maxLength, app.FormErrorChecker.alphaNumeric, app.FormErrorChecker.hasNumber, app.FormErrorChecker.hasLetter];

    var formInputs = [nameInput, emailInput, pwdInput];


    _.each(formInputs, function(input) {
        input.change(function() {
            input.validator.validate();
            input.parent().find('p').html(input.validator.getMessage());
        });
    });
    //Validate when clicking the submit button
    submitBtn.click(function() {
        _.each(formInputs, function(input) {
            input.validator.validate();
            input[0].setCustomValidity(input.validator.getMessage());
        });
    });

    //if user clicks the regist button, the trigger the user event 'register'
    registBtn.click(function() {
        user.trigger('register');
    });

    //save user info on submit and set user login state to true
    form.submit(function() {
        user.save({
            userName: nameInput.val(),
            userEmail: emailInput.val(),
            userPwd: pwdInput.val(),
            login: true
        });
    });

    //click outside the registration form close the form
    $('.regist-form').click(function(e) {
        e.stopPropagation();
    });

    $('.regist, .close-form').click(function() {
        $('.regist').hide();
    });

}());
