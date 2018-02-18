var express = require('express');

var app = express();

var port = process.env.PORT || 5000;
var bookRouter = require('./src/routes/bookRoutes');

app.use(express.static('public'));

//template engine
app.set('views', './src/view');
app.set('view engine', 'ejs');

//Routes
app.use('/Books', bookRouter);

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Hello from render EJS',
        nav: [{
                link: '/Books',
                Text: 'Books'
            },
            {
                link: 'Authors',
                Text: 'Authors'
            }
        ]
    });
});

app.listen(port, function (err) {
    console.log('running server on port ' + port);
});