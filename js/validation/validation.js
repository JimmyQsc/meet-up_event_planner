var app = app || {};
//global regular expressions
var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    alphaRegex = /^[a-z]+$/i,
    alphaNumericRegex = /^[a-z0-9]+$/i;

//messages when requirement doesn't pass
app.FormErrorMessages = {
    required: 'This field is required.',
    validEmail: 'This field must contain a valid email address.',
    minLength: 'This field must be at least %s characters in length.',
    maxLength: 'This field must not exceed %s characters in length.',
    alpha: 'This field must only contain alphabetical characters.',
    alphaNumeric: 'This field must only contain alpha-numeric characters.',
    hasNumber: 'This field must contain at least a number.',
    hasLetter: 'This field must contain at least a letter.'
};

//methods to validate the input value
app.FormErrorChecker = {
    required: function(value) {
        if (value.length<1) {
            return app.FormErrorMessages.required;
        }
        return '';
    },
    validEmail: function(value) {
        if (!emailRegex.test(value)) {
            return app.FormErrorMessages.validEmail;
        }
        return '';
    },
    minLength: function(value) {
        if (value.length < 6) {
            return app.FormErrorMessages.minLength.replace('%s', 6);
        }
        return '';
    },
    maxLength: function(value) {
        if (value.length > 16) {
            return app.FormErrorMessages.maxLength.replace('%s', 16);
        }
        return '';
    },
    alpha: function(value) {
        if (!alphaRegex.test(value)) {
            return app.FormErrorMessages.alpha;
        }
        return '';
    },
    alphaNumeric: function(value) {
        if (!alphaNumericRegex.test(value)) {
            return app.FormErrorMessages.alphaNumeric;
        }
        return '';
    },
    hasNumber: function(value) {
        if (!value.match(/\d/g)) {
            return app.FormErrorMessages.hasNumber;
        }
        return '';
    },
    hasLetter: function(value) {
        if (!value.match(/[a-z,A-z]/g)) {
            return app.FormErrorMessages.hasLetter;
        }
        return '';
    }
};

/**
 * Constructor for the validator
 * @param {[type]} input [description]
 */
app.CustomValidator = function(input) {
    this.input = input;
    this.messages = [];
    this.requirements = [];
};

app.CustomValidator.prototype.addMessage = function(message) {
    this.messages.push(message);
};

app.CustomValidator.prototype.getMessage = function() {
    var message = '';
    if (this.messages.length > 0) {
        message = this.messages.join('. \n');
    }
    return message;
};

//go through the requirements to validate input value
app.CustomValidator.prototype.validate = function() {
    //reset the messages array before validate
    this.messages = [];
    //get input value
    var inputValue = this.input.val();
    //fo through the requirements
    _.each(this.requirements, function(requirement) {
        var msg = requirement(inputValue);
        if (msg) {
            this.addMessage(msg);
        }
    }, this);
};
