var app=app||{};app.MainView=Backbone.View.extend({el:".planer-app",events:{"click #add":"validate","submit #add-event":"createEvent"},initialize:function(){this.$list=$(".event-list"),this.$eventsView=$(".events-view"),this.$eventForm=$(".event-form"),this.eventHost=$("#event-host"),this.endTime=$("#end-time"),this.guestList=$("#guest-list"),this.extraInfo=$("#extra-info"),this.eventColor=$("#event-color"),this.eventName=$("#event-name"),this.eventType=$("#event-type"),this.startTime=$("#start-time"),this.eventLocation=$("#event-location"),this.$form=$("#add-event"),$("#event-color").val("#FECE00"),this.appHeight=this.$eventForm[0].offsetHeight,this.listenTo(app.events,"add",this.appendItem),app.events.fetch(),this.render()},render:function(){this.$eventsView.css("margin-top",-this.appHeight),this.$eventsView.css("height",this.appHeight)},appendItem:function(e){var t=new app.EventView({model:e});this.$list.append(t.render().el)},validate:function(){validateOnSubmit(this.requiredInputs)},createEvent:function(){return app.events.create({name:this.eventName.val(),type:this.eventType.val(),host:this.eventHost.val(),startTime:this.startTime.val(),endTime:this.endTime.val(),guestList:this.eventLocation.val(),location:this.guestList.val(),extraInfo:this.extraInfo.val(),color:this.eventColor.val()}),this.resetForm(),!1},resetForm:function(){this.$form[0].reset(),$("#event-color").val("#FECE00")}});