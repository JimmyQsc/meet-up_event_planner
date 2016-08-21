var app = app || {};

//global regular expressions
var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    alphaRegex = /^[a-z]+$/i,
    alphaNumericRegex = /^[a-z0-9]+$/i,
    spaceRegex = /^\s+$/,
    nameRegex = /^[a-zA-Z ]*$/;

//messages when requirement doesn't pass
app.FormErrorMessages = {
    required: 'This field is required.',
    validEmail: 'This field must contain a valid email address.',
    minLength: 'This field must be at least %s characters in length.',
    maxLength: 'This field must not exceed %s characters in length.',
    alpha: 'This field must only contain alphabetical characters.',
    alphaNumeric: 'This field must only contain alpha-numeric characters.',
    hasNumber: 'This field must contain at least a number.',
    hasLetter: 'This field must contain at least a letter.',
    nameWithSpace: 'This field must only contain alphabetical characters and space between.'
};

//methods to validate the input value
app.FormErrorChecker = {
    required: function(value) {
        //check if the value only cotains spaces
        if (spaceRegex.test(value)) {
            return app.FormErrorMessages.required;
        }
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
    },
    nameWithSpace: function(value) {
        if (!nameRegex.test(value)) {
            return app.FormErrorMessages.nameWithSpace;
        }
        return '';
    }
};

/**
 * Make a input to a SuperInput to validate its value
 */
var SuperInput = function(input) {
    this.input = input;
    this.requirements = [];
    this.isValid = false;
    this.alertEl = input.parent().find('p.alert');
}

SuperInput.prototype = {
    getInputValue: function() {
        return this.input.val();
    },

    addMessage : function(message) {
        this.messages.push(message);
    },

    getMessage: function() {
        var message = '';
        if(this.messages.length > 0) {
            message = this.messages.join('. \n');
        }
        return message;
    },

    validateInput: function() {
        var value = this.getInputValue();
        this.messages = [];

        _.each(this.requirements, function(requirement) {
            var msg = requirement(value);
            if(msg){
                this.addMessage(msg);
            }
        }, this);

        if (this.messages.length) {
            this.isValid = false;
        } else {
            this.isValid = true;
        }
    },

    checkOnEdit: function() {
        var self = this;
        this.input.on('change blur', function() {
            self.validateInput();
            self.alert();
        });
    },

    alert: function() {
        if (!this.isValid) {
            this.alertEl.html(this.getMessage());
            this.input.addClass('invalid');
        } else {
            this.alertEl.html('');
            this.input.removeClass('invalid');
        }
    }
};

//validate when submitting the form
function validateOnSubmit(sInputs) {
    _.each(sInputs, function(sInput) {
        sInput.validateInput();
        sInput.input[0].setCustomValidity(sInput.getMessage());
    });
}