const express = require('express')
const passport = require('passport')
const cookieSession = require('cookie-session')
require('./passport')

const app = express()

// configure session storage
app.use(cookieSession({
    name: 'session-name',
    keys: ['key1', 'key2']
}))

// configure passport
app.use(passport.initialize())
app.use(passport.session())

// unprotected routes
app.get('/', (req, res) => {
    // HOME PAGE GOES HERE
    // res.send()
})

app.get('/failed', (req, res) => {
    // LOG IN FAILED PAGE GOES HERE
    // res.send()
})

// middleware to check if user is logged in
const checkUserLoggedIn = (req, res, next) => {
    req.user ? next() : res.sendStatus(401)
}

// protected route
app.get('/profile', checkUserLoggedIn, (req, res) => {
    // LOGGED IN PROFILE PAGE GOES HERE
    // res.send('<h1>req.user.displayName</h1>)
})

// auth routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
    function (req, res) {
        res.redirect('/profile');
    }
)

// logout
app.get('/logout', (req, res) => {
    req.session = null
    req.logout()
    res.redirect('/')
})

app.listen(3000, () => console.log('App listening on port 3001'))