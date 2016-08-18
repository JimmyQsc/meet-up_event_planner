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

    var registBtn = $('#regist-btn');

    //store input values
    var name;
    var email;
    var password;

    //the regular expression for email validate
    var emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var alphanumeric = /^[a-z0-9\s\.]+$/i;
    var nameValidateMessage = '', emailValidateMessage = '', pwdValidateMessage = '';
    //the logic to validate register's data
    function validate() {
        name = nameInput.val();
        email = emailInput.val();
        password = pwdInput.val();
        //validate name
        if (!alphanumeric.test(name)) {
            nameValidateMessage += 'Only accept numbers and letters\n';
        }
        //validate email
        if (!emailRe.test(email)) {
            emailValidateMessage += 'Please use the right format\n';
        }

        //validate password
        if (password.length<6) {
            pwdValidateMessage += 'Password too short\n';
        }
        if (password.length>16) {
            pwdValidateMessage += 'Password too long\n';
        }
        if (!password.match(/\d/g)) {
            pwdValidateMessage += 'Missing a number\n';
        }
        if (!password.match(/\w/i)) {
            pwdValidateMessage += 'Missing a letter\n';
        }
        if (!alphanumeric.test(password)) {
            pwdValidateMessage += 'You can only use numbers and letters/n';
        }

        //set validity message
        nameInput[0].setCustomValidity(nameValidateMessage);
        emailInput[0].setCustomValidity(emailValidateMessage);
        pwdInput[0].setCustomValidity(pwdValidateMessage);
        //after check, reset them to '' to do the next check
        nameValidateMessage = '', emailValidateMessage = '', pwdValidateMessage = '';
    }

    //validate form on click the submit button
    submitBtn.click(validate);

    //if user clicks the regist button, the trigger the user event 'register'
    registBtn.click(function() {
        user.trigger('register');
    });

    //save user info on submit and set user login state to true
    form.submit(function(e) {
        user.save({
            userName: name,
            userEmail: email,
            userPwd: password,
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
