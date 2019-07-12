const express = require('express')
const expressSession = require('express-session');
const app = express();
const hb = require('express-handlebars')
const homeRouter = require('./routers/homeRouter.js')
const profileRouter = require('./routers/profileRouter.js')
const communityRouter = require('./routers/communityRouter.js')
const administrationRouter = require('./routers/administrationRouter.js')
const basicAuth = require('basic-auth')
const bodyParser = require('body-parser');
var pg = require('pg');
const path = require('path');


const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;


app.use(express.static(path.join('public')));
app.use(bodyParser.urlencoded({ extended: false }))



app.use(expressSession({
    secret: 'thisRealSecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.engine('handlebars', hb({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set("views", "./views")


var config = {
    user: 'Ann',
    database: 'social_media',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000,
}

var client = new pg.Client(config);
client.connect();

app.use(passport.initialize());
app.use(passport.session());

passport.use('local-login', new LocalStrategy(
    async (username, password, done) => {
        try {
            let query = 'select * from users where username = $1'

            let users = await client.query(query, [username], function (err, results) {
                if (err) {
                    console.log(err);
                }

                if (results.length == 0) {
                    return done(null, false, { message: 'No user exists' })
                }


                let user = results.rows[0];

                if (user.password === password) {
                    return done(null, user)
                } else {
                    return done(null, false, { message: 'Incorrect credentials' })
                }
            })
                ;

        } catch (err) {
            return done(err);
        }
    }
));

passport.use('local-signup', new LocalStrategy(
    async (username, password, done) => {
        try {
            let query = 'select * from users where username = $1';
            let users = await client.query(query, [username], async function (err, results) {
                if (results.rows.length > 0) {
                    return done(null, false, { message: 'Email already taken' });
                }





                let query1 = 'insert into users (username, password) values ($1, $2) RETURNING id';
                let newUser = await client.query(query1, [username, password], function (err, results) {
                    if (err) {
                        console.log(err)
                    }



                    return done(null, results.rows[0]);

                })



            })

        } catch (err) {
            return done(err);
        }

    })
);

passport.serializeUser((user, done) => {

    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    let query = 'select * from users where id = $1'
    let users = await client.query(query, [id], function (err, results) {

        if (err) {
            console.log(err);
        }
        if (results.rows.length == 0) {
            return done(new Error(`Wrong user id ${id}`));
        }
        let user = results.rows[0];

        return done(null, user);
    })
        ;

});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

app.get('/user', isLoggedIn, (req, res) => {
    let user = req.user.username
    res.json(user)

})

app.get('/user/:id', isLoggedIn, (req, res) => {
    let userID = req.params.id
    let user = req.user.username
    res.json(userID)

})

app.get('/', isLoggedIn, (req, res) => {
    res.redirect('/home');
    console.log(req.user.id);
});

app.get('/login', (req, res) => {
    res.render('login', { layout: false })
});

app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/error'
}));

app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/signupSuccess',
    failureRedirect: '/error'
}));

app.get('/signupSuccess', (req, res) => {
    res.render('signupSuccess', { layout: false });
});

app.get('/error', (req, res) => {
    res.send('You have failed...')
});

app.get('/logout', function (req, res) {

    console.log(req.isAuthenticated());
    req.logout();
    console.log(req.isAuthenticated());
    res.redirect('/');
});

app.use('/home', homeRouter)
app.use('/profile', profileRouter)
app.use('/community', communityRouter)
app.use('/administration', administrationRouter)



const multer = require('multer');

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});



app.post('/upload', (req, res) => {
    const upload = multer({
        storage: storage,
    }).single('myImage');

    upload(req, res, (err) => {
        if (err) {
            console.log(err)
        }
        else {



            res.redirect('/profile')

            async function insertPic(name) {
                var query = `INSERT INTO POST (CONTENT,USER_ID,PERSONAL,TXT,PHOTO)VALUES  ($1, $2, $3, $4, $5) RETURNING id`;
                await client.query(query, [name, req.user.id, 'TRUE', 'FALSE', 'TRUE'], function (err, results) {
                    if (err) {
                        console.log(err);
                    }
                })
            }

            let captionImg = `<img src="/uploads/${req.file.filename}" style="width:500px; height:auto;">`

            insertPic(captionImg)
        }
    })
})

app.post('/communityUpload/:id', (req, res) => {
    const upload = multer({
        storage: storage,
    }).single('myImage');

    upload(req, res, (err) => {
        if (err) {
            console.log(err)
        }
        else {



            res.redirect('/community/' + req.params.id)

            async function insertPic(name) {
                var query = `INSERT INTO POST (CONTENT,USER_ID,PERSONAL,TXT,PHOTO,CATEGORY_ID)VALUES  ($1, $2, $3, $4, $5,$6) RETURNING id`;
                await client.query(query, [name, req.user.id, 'FALSE', 'FALSE', 'TRUE', req.params.id], function (err, results) {
                    if (err) {
                        console.log(err);
                    }
                })
            }

            let captionImg = `<img src="/uploads/${req.file.filename}" style="width:500px; height:auto;">`

            insertPic(captionImg)
        }
    })
})


app.post('/uploadprofileimg', (req, res) => {
    const upload = multer({
        storage: storage,
    }).single('myImage');

    upload(req, res, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log("file uploaded")
            console.log(req.file.filename)
            console.log(req.user.id)
            res.redirect('/profile')
            async function insertPic(name) {
                var query = `update users set profilepic =$1 where id = ${req.user.id}`;

                await client.query(query, [name], function (err, results) {
                    if (err) {
                        console.log(err);
                    }
                })
            }


            let captionImg = `/uploads/${req.file.filename}`

            insertPic(captionImg);
        }
    })
})


app.listen(3000);