
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
        rangeLength : [6, 14],
        msg : 'Your password must be between 6 and 14 characters'
      }],
      confirmpassword : [{
        equalTo : 'password',
        msg : 'Your passwords should match'
      }]
    }
  });

  return RegisterModel;

});
