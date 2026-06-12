var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
const db = require('./config/db')

//mongoDB Connection
db();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const authRouter = require('./routes/auth')
const equipmentRouter = require("./routes/equipment");
const borrowerRouter = require("./routes/borrower");
const borrowTransactionRouter = require("./routes/borrowTransaction");
const returnRouter = require("./routes/return");
const dashboardRouter = require("./routes/dashboard");

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/auth', authRouter);
app.use("/api/equipments", equipmentRouter);
app.use("/api/borrowers", borrowerRouter);
app.use("/api/borrow-transactions", borrowTransactionRouter);
app.use("/api/returns", returnRouter);
app.use("/api/dashboard",dashboardRouter);

module.exports = app;
