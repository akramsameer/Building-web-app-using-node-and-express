var express = require('express');
var bodyParser = require('body-parser');
var sql = require('mssql');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var app = express();

var port = process.env.PORT || 5000;
var nav = [{
        link: '/Books',
        Text: 'Books'
    },
    {
        link: 'Authors',
        Text: 'Authors'
    }
]; 
var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')();
var authRouter = require('./src/routes/authRoutes')();

app.use(express.static('public'));
//parse the body in the form of nice json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());   
app.use(cookieParser());
app.use(session({secret : 'library'}));
require('./src/config/passport')(app);

//template engine
app.set('views', './src/view');
app.set('view engine', 'ejs');

//Routes
app.use('/Books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth' , authRouter); 

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