const express = require('express')
const db = require('./config/database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const cors = require('cors');
const publicRoute = require('./routes/public.route');
const userRoute = require('./routes/user.route');


const app = express()
app.use(cors())
app.use(express.json())
app.use('',publicRoute)
app.use('/users',userRoute)
db.sequelize.sync()

const port = process.env.PORT || 3306;
app.listen(port, () => {
    console.log('listening from port', port);
  });
  