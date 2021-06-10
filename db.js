const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// add your schemas
const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'username is required']
    },
    email: {
        type: String,
        required: [true, 'email is required']
    },
    password: {
        type: String,
        unique: true,
        required: [true, 'password is required']
    }
});

const WorkoutSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'userId is required']
    },
    category: {
        type: String
    },
    title: {
        type: String
    },
    time: {
        type: String
    },
    difficulty: {
        type: String
    },
    content: {
        type: String
    }
});

const WeatherSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'userId is required']
    },
    location: {
        type: String
    },    
});



// register your model
const User = mongoose.model('User', UserSchema);
const Workout = mongoose.model('Workout', WorkoutSchema);
const Weather = mongoose.model('Weather', WeatherSchema);

module.exports = {User, Workout, Weather};
