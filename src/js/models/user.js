var app = app || {};

app.User = Backbone.Model.extend({
    defaults: {
        login: false,
        userName: '',
        userEmail: '',
        userPwd: ''
    },
    //saving user info to local storage
    localStorage: new Backbone.LocalStorage('user'),
});