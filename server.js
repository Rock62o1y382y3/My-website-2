const express = require('express');
const session = require('express-session');
const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Configure session middleware
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));

// Configure passport
passport.use(new DiscordStrategy({
    clientID: 'YOUR_DISCORD_CLIENT_ID',
    clientSecret: 'YOUR_DISCORD_CLIENT_SECRET',
    callbackURL: 'http://localhost:3000/auth/discord/callback',
    scope: ['identify', 'guilds']
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/discord', passport.authenticate('discord'));

app.get('/auth/discord/callback',
    passport.authenticate('discord', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/dashboard');
    });

app.get('/dashboard', (req, res) => {
    if (!req.isAuthenticated()) return res.redirect('/auth/discord');
    res.sendFile(__dirname + '/index.html');
});

app.post('/server-settings', (req, res) => {
    // Handle server settings update
    console.log(req.body);
    res.send('Server settings updated');
});

app.post('/bot-settings', (req, res) => {
    // Handle bot settings update
    console.log(req.body);
    res.send('Bot settings updated');
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
