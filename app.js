var express = require('express');

var app = express();

var port = process.env.PORT || 5000;
var bookRouter = express.Router();

app.use(express.static('public'));

//template engine
app.set('views', './src/view');
app.set('view engine', 'ejs');

bookRouter.route('/')
    .get(function (req, res) {
        res.send('Hello Books...!');
    });

bookRouter.route('/single')
    .get(function (req, res) {
        res.send('Hello Single Book...!');
    });

app.use('/Books' , bookRouter);

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