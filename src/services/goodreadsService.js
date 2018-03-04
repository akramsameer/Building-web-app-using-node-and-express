var http = require('http');
var xml2js = require('xml2js');
var parser = xml2js.Parser({
    explicitArray: false
});

var goodreadsService = function () {
    var getBookById = function (id, cb) {
        var options = {
            host : 'www.goodreads.com',
            path : ''
        };
        cb(null, {
            description: 'Our Description'
        });

        http.request(options, callback).end();
    };

    return {
        getBookById: getBookById
    };
};
module.exports = goodreadsService;