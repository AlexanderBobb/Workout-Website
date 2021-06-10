const {Workout} = require('../db');

// add new workout
function add(userId, category, title, time, difficulty, content, errorCallback, successCallback) {
    if (!title || title.length === 0) return errorCallback({message: 'TITLE AND URL EMPTY'});
    var workout = new Workout({userId, category, title, time, difficulty, content});
    workout.save()
        .then(function(data) {
            successCallback(data);
        })
        .catch(function(error) {
            console.log(error);
            errorCallback({message: 'WORKOUT SAVE ERROR'});
        });
}

// find workout by username
function findByCategory(category, callback) {
    Workout.find({category: category})
        .then(function(data) {
            callback(data);
        })
        .catch(function(error) {
            callback(null);
        });
}

// find workout by username
function findById(_id, callback) {
    Workout.findOne({_id: _id})
        .then(function(data) {
            callback(data);
        })
        .catch(function(error) {
            callback(null);
        });
}

module.exports = {add, findByCategory, findById};
