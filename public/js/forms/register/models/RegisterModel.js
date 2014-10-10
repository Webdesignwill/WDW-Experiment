
define([],

function () {

  "use strict";

  var RegisterModel = Backbone.Model.extend({

    validation : {
      email : [{
        required : true,
        msg : 'Please enter you email'
      },{
        pattern : 'email',
        msg : 'Please enter a valid email'
      }],
      displayname : [{
        required : true,
        msg : 'Please provide a display name'
      }],
      password : [{
        required : true,
        msg : 'Please enter your password'
      },{
        rangeLength : [5, 14],
        msg : 'Your password must be between 5 and 14 characters'
      }],
      confirmpassword : [{
        required : true,
        msg : 'Please confirm your password'
      },{
        equalTo : 'password',
        msg : 'This field should match the password field'
      }]
    }
  });

  return RegisterModel;

});
