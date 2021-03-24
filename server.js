const path = require('path')
const express = require('express');
const exhbs = require('express-handlebars');
// const routes = require('./routes');
// import sequelize connection
const sequelize = require('./config/connection')


const app = express();
const PORT = process.env.PORT || 3001;

// app.engine('handlebars')
// app.set('view engine', 'handlbars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

// app.use(routes);


// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'))
})