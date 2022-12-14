if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const mongoSanitize = require('express-mongo-sanitize');
const MongoStore = require('connect-mongo');

const playersRoutes = require('./routes/players');
const userRoutes = require('./routes/users');
const standingRoutes = require('./routes/standings');

const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/prode';

mongoose
    .connect(dbUrl)
    .then(() => {
        console.log('Database connected');
    })
    .catch((err) => {
        console.log('Oh no! Mongo connection error');
        console.log(err);
    });

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    mongoSanitize({
        allowDots: true,
        replaceWith: '_'
    })
);

app.use(
    mongoSanitize({
        onSanitize: ({ req, key }) => {
            console.warn(`This request[${key}] is sanitized`, req);
        }
    })
);

const secret = process.env.SECRET || 'thisshouldbeabettersecret';

const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
      secret
    }
});
  
store.on('error', function (err) {
    console.log('SESSION STORE ERROR', err)
});

const sessionConfig = {
    store,
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.use('/participantes', playersRoutes);
app.use('/', userRoutes);
app.use('/', standingRoutes)

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/reglamento', (req, res) => {
    res.render('rules');
});

app.all('*', (req, res, next) => {
    next(new ExpressError('P??gina no encontrada', 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err
    if (!err.message) err.message = 'Oh no, algo sali?? mal';
    res.status(statusCode).render('error', { err });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Serving on port ${port}`);
});