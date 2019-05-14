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

//Passport
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;


app.use(express.static(path.join('public')));
app.use(bodyParser.urlencoded({ extended: false }))
// app.engine('handlebars', exphbs({defaultLayout: 'index' }));

//Set up Session for User authentication
app.use(expressSession({
    secret: 'thisRealSecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false}
}));

app.engine('handlebars', hb({defaultLayout:'main'}));
app.set('view engine', 'handlebars');
app.set("views", "./views")
// app.set('view engine', exphbs);

var config = {
    user: 'Ann',
    database: 'social_media',
    password: '', //whatever your password is, the default is postgres or password, try both
    host: 'localhost',
    port: 5432,
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
}

var client = new pg.Client(config);
client.connect();

app.use(passport.initialize());
app.use(passport.session());

passport.use('local-login', new LocalStrategy(
    async (username, password, done) => {
        try{
            let query = 'select * from users where username = $1'

            let users = await client.query(query, [username], function (err, results){
                if(err) {
                    console.log(err);
                }
        
                if(results.length == 0){
                return done(null, false, {message: 'No user exists'})
            }

            // console.log(results)
            let user = results.rows[0];
            // console.log(user)
            if(user.password === password){
                return done(null, user)
            } else {
                return done(null, false, {message: 'Incorrect credentials'})
            }
            })
            ;
           
        } catch(err){
            return done(err);
        }
    }
));

passport.use('local-signup', new LocalStrategy(
    async (username, password, done) => {
        try{
            let query = 'select * from users where username = $1';
            let users = await client.query(query, [username], async function(err, results){
                if (results.rows.length > 0) {
            return done(null, false, { message: 'Email already taken' });
            }
            // const newUser = {
            //     username: username,
            //     password: password,
            //     email: email
            // };
            let query1 = 'insert into users (username, password) values ($1, $2) RETURNING id';
            let newUser = await client.query(query1, [username, password], function(err, results){
                if (err) {
                    console.log(err)
                }                
                // console.log(results.rows[0])

                // console.log(results)  
                return done(null, results.rows[0]);
                // return newUser
            })
            // let userId = await client.query1('users').insert(newUser).returning('id');
            // newUser.id = userId[0];
          
            })
            
        }catch(err){
            return done(err);
        }

    })
);

passport.serializeUser((user, done) => {
    // console.log(user.id)
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    let query = 'select * from users where id = $1'
    let users = await client.query(query, [id], function(err, results){
        
        if(err) {
            console.log(err);
        }
        if (results.rows.length == 0) {
        return done(new Error(`Wrong user id ${id}`));
        }
        let user = results.rows[0];
        // console.log(user)
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

app.get('/',isLoggedIn, (req, res)=>{
    res.render('index', {
        user: req.user.id
        //  addUserToNavbar(user)
    });
    console.log(req.user.id);
});

app.get('/login', (req, res)=>{
    res.render('login', {layout: false})
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
    res.render('signupSuccess', {layout: false});
});

app.get('/error', (req, res)=>{
    res.send('You have failed...')
});

app.get('/logout', function(req, res){
 
    console.log(req.isAuthenticated());
    req.logout();
    console.log(req.isAuthenticated());
    res.redirect('/');
    });



app.use('/home', homeRouter)
app.use('/profile', profileRouter)
app.use('/community', communityRouter)
app.use('/administration', administrationRouter)


// elvis upload
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
            res.render('ji_post', {
                user: req.user.id
            })
            // // console.log(req.body.comment)
            async function insertPic(name) {
                var query = `INSERT INTO POST (CONTENT,USER_ID,PERSONAL,TXT,PHOTO)VALUES  ($1, $2, $3, $4, $5) RETURNING id`;
                await client.query(query, [name, req.body.comment], function (err, results) {
                    if (err) {
                        console.log(err);
                    }
                })
            }

            let captionImg = '' +  req.body.comment + '/' + req.file.filename ;
            console.log(captionImg);
            // insertPic(req.file.filename)
        }
    })
})

app.listen(3000);