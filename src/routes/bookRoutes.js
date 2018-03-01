var express = require('express');
var mongodb = require('mongodb');
var bookRouter = express.Router();
var ObjectId = require('mongodb').ObjectID;

var router = function (nav) {

    bookRouter.use(function (req, res, next) {
        if (!req.user) {
            res.redirect('/');
        }
        next();
    });

    bookRouter.route('/')
        .get(function (req, res) {
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (err, client) {
                var db = client.db('libraryApp');
                var collection = db.collection('books');

                collection.find({}).toArray(function (err, results) {
                    res.render('bookListView', {
                        title: 'Books',
                        nav: nav,
                        books: results
                    });
                });
                client.close();
            });
        });

    bookRouter.route('/:id')
        .get(function (req, res) {

            var id = new ObjectId(req.params.id);
            var url = 'mongodb://localhost:27017/libraryApp';

            mongodb.connect(url, function (err, client) {
                var db = client.db('libraryApp');
                var collection = db.collection('books');

                collection.findOne({
                    _id: id
                }, function (err, results) {
                    res.render('bookView', {
                        title: 'Books',
                        nav: nav,
                        book: results
                    });
                });
            });
        });

    return bookRouter;
};

module.exports = router;