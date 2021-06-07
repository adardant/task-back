const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
const app = express();
var mongoose = require('mongoose');


var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));

// make a connections
mongoose.connect('mongodb://localhost:27017/local', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    serverSelectionTimeoutMS: 20000, 
    socketTimeoutMS: 20000
}).then(() => {
        console.log("ok DB");
    },
    err => { 
        console.log('error: '+ err)
    }
);

const Task = mongoose.model('task', {
    date: String,
    description: String
});

// HTTPS strategy
// https.createServer({
//   key: fs.readFileSync('key.pem'),
//   cert: fs.readFileSync('cert.pem')
// }, app).listen(443);

//HTTP strategy
app.listen(3000, function () {
    console.log('App listening on port 3000!')
})

app.use('/assets', express.static('public')) // Gestion des fichiers statiques
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.get('/task/:id', async function (req, res) {
    await Task.findById(req.params.id, function (err, response) {
        if (err) {
            res.send(err);
        } else {
            res.send(response);
        }
    });
});

app.get('/task', async function (req, res) {
    await Task.find({}, function (err, tasks) {
        if (err) {
            res.send(err);
        } else {
            res.send(tasks);
        }
    });
})

app.post('/task', async function (req, res) {
    let task1 = new Task(req.body);
    // save model to database
    await task1.save(function (err, doc) {
        if (err) {
            res.send(err.message);
        } else {
            res.send(doc.description + " saved to task collection.");
        }
    });
});

app.get('/deleteTask/:id', async function (req, res) {
    await Task.findOneAndDelete({
        _id: req.params.id
    }, function (err) {
        if (err) {
            res.send(err);
        } else {
            res.send("Successful deletion");
        }
    });
});

module.exports = app;