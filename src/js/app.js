$(function() {
    //create a user instance
    var user = new app.User({id: 1});

    //vreate a user view
    var register = new app.RegisterView({model: user});

    //Instantiate the main view of the app
    new app.MainView();

    //submit button
    var submitBtn = $('#submit');

    //Validate when clicking the submit button
    submitBtn.click(function() {
        validateOnSubmit(register.formInputs);
    });
});
