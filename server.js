const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models.js');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();
server.use(bodyParser.json());

server.get('/users', (req, res) => {
  User.find( {}, (err, data) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      res.json({ error: 'Internal Server Error while reading data' });
      return;
    }
    res.json(data);
  });
});

server.get('/users/:id', (req, res) => {
  const { id } = req.params;
  User.findById(id, (err, user) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      res.json({ error: 'Internal Server Error while reading data' });
      return;
    }
    res.json(user);
  });
})

server.post('/users', (req, res) => {
  const { userName } = req.body;
  if (!userName) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Missing required userName' });
    return;
  }
  const newUser = new User({ userName });
  newUser.save((err) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      res.json({ error: 'Internal Server Error while writing data' });
      return;
    }
    res.json(newUser);
  });
});

server.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  User.findById(id, (err, userToDelete) => {
    if (err) {
      res.status(STATUS_USER_ERROR);
      res.json({ error: 'Missing required id for delete' });
      return;
    }

    User.deleteOne({ _id: id }, (err) => {
      if (err) {
        res.status(STATUS_SERVER_ERROR);
        res.json({ error: 'Internal Server Error on delete' });
        return;
      }
      res.json({userToDelete});
    });
  });
});

mongoose.Promise = global.Promise;
const connect = mongoose.connect(
  'mongodb://localhost/users',
  { useMongoClient: true }
);

connect.then(() => {
  const port = 3000;
  server.listen(port);
  console.log(`Server Listening on ${port}`);
}, (err) => {
  console.log('\n********************');
  console.log("ERROR: Couldn't connect to MongoDB.  Do you have it running?");
  console.log('\n********************');
});

