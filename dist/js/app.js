$(function(){var i=new app.User({id:1}),e=new app.RegisterView({model:i});new app.MainView;var n=$("#submit");n.click(function(){validateOnSubmit(e.formInputs)})}());