const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
// const models = require('./models')
// import sequelize connection
const sequelize = require('./config/connection');
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./config/passport');

const app = express();
const PORT = process.env.PORT || 3001;
const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// configure session storage
app.use(cookieSession({
  name: 'session-name',
  keys: ['key1', 'key2']
}));
// configure passport
app.use(passport.initialize());
app.use(passport.session());
//

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'))
});
