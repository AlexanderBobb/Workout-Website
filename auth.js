const bcrypt = require('bcryptjs');
const {User} = require('./db');

function register(username, email, password, errorCallback, successCallback) {
  // check the length of the username and password passed in; they should both be greater than or equal to 8
  if (!username || !password || username.length < 8 || password.length < 8) return errorCallback({message: 'USERNAME PASSWORD TOO SHORT'});

  // check if the user already exists (case sensitive check is ok)
  User.findOne({username: username}, function (err, result) {
    // if the user already exists, call the errorCallback function with an object containing a key called message with the value, USERNAME ALREADY EXISTS
    if (err) return errorCallback({message: 'USERNAME ALREADY EXISTS'});
    if (result) return errorCallback({message: 'USERNAME ALREADY EXISTS'});

    // if the user doesn't exist yet, then it's ok to go ahead and create a new user…
    // salt and hash the password using the bcryptjs module
    password = bcrypt.hash(password, 10, function(err, hash) {
      if (err) return errorCallback({message: 'PASSWORD HASH ERROR'});
      console.log('b');
      // now we have everything we need to create a new user
      var user = new User({username, email, password: hash});
      user.save()
        .then(function (user) {
          successCallback({_id: user._id, username: user.username, email: user.email, password: user.password});
        })
        .catch(function (error) {
          // otherwise call the errorCallback with an object that contains the key, message, and a generic error message, DOCUMENT SAVE ERROR, as the value
          // the error callback being called if a save issue occurred (DOCUMENT SAVE ERROR)
          console.log(error);
          return errorCallback({message: 'DOCUMENT SAVE ERROR'});
        });
    });
  });
}

function login(username, password, errorCallback, successCallback) {
  // check the length of the username and password passed in; they should both be greater than or equal to 8
  if (!username || !password || username.length < 8 || password.length < 8) return errorCallback({message: 'USERNAME PASSWORD TOO SHORT'});

  // find the user with username that was passed in
  User.findOne({username: username}, function(err, user, count) {
    if (!err && user) {
      bcrypt.compare(password, user.password, (err, passwordMatch) => {
        // regenerate session if passwordMatch is true
        if (passwordMatch) {
          // once the match is verified, call the successCallback function with the user that was found
          successCallback({_id: user._id, username: user.username, password: user.password});
        } else {
          // the following values for the message property on the error object passed to the
          errorCallback({message: 'PASSWORDS DO NOT MATCH'})
        }
      });
    } else {
      // if the user doesn't exist, call the errorCallback function with an object containing a message field that has the value USER NOT FOUND
      errorCallback({message: 'USER NOT FOUND'});
    }
  });
}

function startAuthenticatedSession(req, user, cb) {
  req.session.regenerate(function(err) {
    if (err) {
      cb({message: 'SESSION IS NOT GENERATED'});
    } else {
      req.session.user = {_id: user._id, username: user.username};
      cb(null);
    }
  });
}

module.exports = {
    startAuthenticatedSession: startAuthenticatedSession,
    register: register,
    login: login
};
