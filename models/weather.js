const {Weather} = require('../db');

// add new workout
function add(userId, location, errorCallback, successCallback) {
    if (!location || location.length === 0) return errorCallback({message: 'LOCATION EMPTY'});
    var weather = new Weather({userId, location});
    weather.save()
        .then(function(data) {
            successCallback(data);
        })
        .catch(function(error) {
            console.log(error);
            errorCallback({message: 'WORKOUT SAVE ERROR'});
        });
}

// find workout by user id
function findByUserId(userId, callback) {
    Weather.find({userId: userId})
        .then(function(data) {
            callback(data);
        })
        .catch(function(error) {
            callback(null);
        });
}

module.exports = {add, findByUserId};
