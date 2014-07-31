/**
 * index.js
 */

var express = require('express');
var mongoose = require('mongoose');
var when = require('when');

// express
var app = express();
// static
var staticDir = __dirname + '/public/';
// views
var viewsDir = __dirname + '/views/';

// bodyParser
app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(express.query());
app.use(express.static(staticDir));

app.set('views', viewsDir);
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

// 设置mongoose
mongoose.connect('mongodb://localhost/ember_test');
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected'
              + 'through app termination');
    process.exit(0);
  });
});

var fixtures = [
    {
        id: 1,
        latitude: '1345',
        longitude: '897978',
        accuracy: 'asdasd'
    }, {
        id: 2,
        latitude: 'sdf',
        longitude: 'fghfhh',
        accuracy: '56756767'
    }
];

var Location = mongoose.model('Location', mongoose.Schema({
    latitude: 'String',
    longitude: 'String',
    accuracy: 'String'
}));

function findAll() {
    var deferred = when.defer();

    Location.find(function(err, docs) {
        if (err) {
            return deferred.reject(err);
        }

        deferred.resolve(docs);
    });

    return deferred.promise;
}

function findById(id) {
    var deferred = when.defer();

    Location.findById(id, function(err, doc) {
        if (err) {
            return deferred.reject(err);
        }

        deferred.resolve(doc);
    });

    return deferred.promise;
}

function save(location) {
    var deferred = when.defer();

    new Location(location).save(function(err, doc) {
        if (err) {
            return deferred.reject(err);
        }

        deferred.resolve(doc);
    });

    return deferred.promise;
}

function updateById(id, data) {
    var deferred = when.defer();

    Location.update({ _id: id }, data, function(err, numRows, raw) {
        if (err) {
            return deferred.reject(err);
        }

        deferred.resolve(raw);
    });

    return deferred.promise;
}

function deleteById(id) {
    var deferred = when.defer();

    Location.remove({ _id: id }, function(err, doc) {
        if (err) {
            return deferred.reject(err);
        }

        deferred.resolve(doc);
    });

    return deferred.promise;
}

// handle routes
app.get('/', function(req, res, next) {
    res.render('index');
});

app.get('/:id', function(req, res, next) {
    findById(req.params.id).then(function(doc) {
        res.jsonp(doc);
    });
});

// find all
app.get('/api/v1/locations', function(req, res, next) {
    findAll().then(function(docs) {
        res.jsonp({ locations: docs });
    }).otherwise(function(err) {
        res.jsonp({ locations: [] });
    });
});

// find by id
app.get('/api/v1/locations/:id', function(req, res, next) {
    findById(req.params.id).then(function(doc) {
        doc.id = doc._id;
        delete doc._id;

        res.jsonp({ location: doc });
    }).otherwise(function(err) {
        res.jsonp({ location: {} });
    });
});

// new
app.post('/api/v1/locations', function(req, res, next) {
    save(req.body.location).then(function(doc) {
        res.jsonp({ locations: doc });
    }).otherwise(function(err) {
        res.jsonp({ locations: {} });
    });
});

// update
app.put('/api/v1/locations/:id', function(req, res, next) {
    updateById(req.params.id, req.body.location).then(function(doc) {
        req.body.location._id = req.params.id;
        res.jsonp({ location: req.body.location });
    }).otherwise(function(err) {
        res.jsonp({ location: {} });
    });
});

// delete
app.delete('/api/v1/locations/:id', function(req, res, next) {
    deleteById(req.params.id).then(function(doc) {
        res.jsonp({});
    }).otherwise(function(err) {
        res.jsonp({});
    });
});

// bootstrap server
app.listen(3000, function() {
    console.log('Express server listening on port ' + 3000);
});
