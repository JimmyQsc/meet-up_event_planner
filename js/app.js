$(function() {
    //validate user registration form
    var form = $('#registration');
    var nameInput = $('#name');
    var emailInput = $('#email');
    var pwdInput = $('#password');
    var submitBtn = $('#submit');

    //store input values
    var name;
    var email;
    var password;

    //the regular expression for email validate
    var emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var alphanumeric = /^[a-z0-9]+$/i;
    var nameValidateMessage = '', emailValidateMessage = '', pwdValidateMessage = '';

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
        nameValidateMessage = '', emailValidateMessage = '', pwdValidateMessage = '';
    }

    submitBtn.click(validate);
    //click outside the registration form close the form
    $('.regist-form').click(function(e) {
        e.stopPropagation();
    });

    $('.regist, .close-form').click(function() {
        $('.regist').hide();
    });

}());



