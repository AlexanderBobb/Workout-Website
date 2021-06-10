require('dotenv').config();
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const fetch = require('node-fetch');
const path = require('path');
const app = express();


(async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    console.log('DB connected');

    // require('./db');

    const auth = require('./auth.js');
    const workout = require('./models/workout.js');
    const weather = require('./models/weather.js');

    app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
      next();
    });

    app.use(express.json()); // support json encoded bodies
    app.use(express.urlencoded({ extended: true }));
    app.use(session({
      secret: 'add session secret here!',
      resave: false,
      saveUninitialized: true,
    }));

    app.use(session({
      secret: 'add session secret here!',
      resave: false,
      saveUninitialized: true,
    }));

    app.post('/register', (req, res) => {
      // register new user
      console.log(req.body);
      auth.register(req.body.username, req.body.email, req.body.password,
        function (error) {
          var data = { code: 201, message: error.message };
          res.send(data);
        },
        function (data) {
          auth.startAuthenticatedSession(req, data, function (err) {
            var result = {};
            if (err) {
              result = { code: 201, message: err.message };
            } else {
              result = { code: 200, user_id: data._id };
            }
            res.send(result);
          });
        });
    });

    app.post('/login', (req, res) => {
      // login with username and password
      auth.login(req.body.username, req.body.password,
        function (error) {
          var data = { code: 201, message: error.message };
          res.send(data);
        },
        function (data) {
          auth.startAuthenticatedSession(req, data, function (err) {
            var result = {};
            if (err) {
              result = { code: 201, message: err.message };
            } else {
              result = { code: 200, user_id: data._id };
            }
            res.send(result);
          })
        });
    });

    app.post('/workout/add', (req, res) => {
      // add new workout, if user is not logged in, redirect into login page
      var data = req.body;

      var user_id = req.header('Authorization');

      if (user_id) {
        // add new article
        data.user_id = user_id;

        workout.add(user_id, data.category, data.title, data.time, data.difficulty, data.content,
          function (err) {
            res.send({ code: 201, message: err.message });
          },
          function (data) {
            res.send({ code: 200 });
          });
      } else {
        res.send({ code: 202, message: 'Unauthorized User' });
      }
    });

    app.post('/workout/category', (req, res) => {
      // add new workout, if user is not logged in, redirect into login page
      var data = req.body;

      var user_id = req.header('Authorization');

      if (user_id) {
        // add new article
        data.user_id = user_id;

        workout.findByCategory(data.category, function (data) {
          res.send({ code: 200, list: data });
        });
      } else {
        res.send({ code: 202, message: 'Unauthorized User' });
      }
    });

    app.post('/workout/detail', (req, res) => {
      // add new workout, if user is not logged in, redirect into login page
      var data = req.body;

      var user_id = req.header('Authorization');

      if (user_id) {
        // add new article
        data.id = user_id;

        workout.findById(data._id, function (data) {
          res.send({ code: 200, data: data });
        });
      } else {
        res.send({ code: 202, message: 'Unauthorized User' });
      }
    });


    app.post('/weather/add', (req, res) => {
      // add new workout, if user is not logged in, redirect into login page
      var data = req.body;

      var user_id = req.header('Authorization');

      if (user_id) {
        // add new article
        data.user_id = user_id;

        weather.add(user_id, data.location,
          function (err) {
            res.send({ code: 201, message: err.message });
          },
          function (data) {
            weather.findByUserId(user_id, async function (data) {
              var result = await getWeatherData(data);
              res.send({ code: 200, list: result });
            });
          });
      } else {
        res.send({ code: 202, message: 'Unauthorized User' });
      }
    });

    async function getWeatherData(list) {
      var API_KEY = 'eb8ba848f5d59614a31f13987ddf8e37';
      var BASE_URL = 'http://api.openweathermap.org/data/2.5/weather?appid=' + API_KEY;
      var result = [];
      for (var i = 0; i < list.length; i++) {
        var item = list[i];
        var url = BASE_URL + '&q=' + item.location;

        try {
          const response = await fetch(url);
          const json = await response.json();
          console.log(url, json);

          item['weather'] = json;
          result.push(json);
        }
        catch (error) {
          console.log(error);
        }
      }

      return result;
    }

    app.post('/weather/list', (req, res) => {
      // add new workout, if user is not logged in, redirect into login page
      var data = req.body;

      var user_id = req.header('Authorization');

      if (user_id) {
        // add new article
        data.user_id = user_id;

        weather.findByUserId(user_id, async function (data) {
          var result = await getWeatherData(data);
          res.send({ code: 200, list: result });
        });
      } else {
        res.send({ code: 202, message: 'Unauthorized User' });
      }
    });

    const port = process.env.PORT || 8080;

    if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, 'build')));
      app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
      });
    }

    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
    })


  } catch (err) {
    console.log('an error occurred==>>', err)
  }
})();
