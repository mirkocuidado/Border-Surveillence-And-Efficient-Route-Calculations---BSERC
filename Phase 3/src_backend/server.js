const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Models
const User = require('./models/user');
const Request = require('./models/request');
const Border = require('./models/border');

const app = express();

const router = express.Router();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/');
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection established successfully!');
});

app.use('/', router);

app.listen(4000, () => console.log('Express server running on port 4000!'));

router.route('/users').get((req, res)=>{
    User.find( (err, users) => {
        if(err){
            console.log(err);
        }
        else{
            res.json(users);
        }
    });
});

router.route('/get-user-by-id/:id').get((req, res) => {
    User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(user);
        }
    });
});

router.route('/get-request-by-id/:id').get((req, res) => {
    Request.findOne({ _id: req.params.id }, (err, request) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(request);
        }
    });
});

router.route('/add-user').post((req, res) => {
    let user = new User(req.body);
    user.save()
        .then(user => {
            res.status(200).json({'user': 'User added successfully!'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record!');
        });
});

router.route('/edit-user/:id').post((req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, (err, res) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('User updated successfully!');
        }
    })
});

router.route('/delete-user').post((req, res) => {
    User.findByIdAndDelete(req.body.id, (err, res) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('User removed successfully!');
        }
    });
});

router.route('/requests').get((req, res)=>{
    Request.find((err, requests) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(requests);
        }
    });
});

router.route('/add-registration-request').post((req, res) => {
    let request = new Request(req.body);
    request.save()
        .then(request => {
            res.status(200).json({'request': 'Request added successfully!'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record!');
        });
});

router.route('/delete-registration-request').post((req, res) => {
    Request.findByIdAndDelete(req.body.id, (err, res) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('Request removed successfully!');
        }
    });
});

router.route('/get-borders').get((req, res)=>{
    Border.find((err, borders) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(borders);
        }
    });
});

router.route('/update-border').post((req, res) => {
    Border.findOneAndUpdate({name: req.body.name}, req.body, (err, res) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('Border updated successfully!');
        }
    })
})