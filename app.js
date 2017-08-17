const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const error = require('common-errors').HttpStatusError;
const express = require('express');
const favicon = require('request-favicon');
const helmet = require('helmet');
const logger = require('morgan');
const vinfo = require('vinfo').default;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(favicon());
app.use(helmet());
app.use(logger('dev'));

app.param('vin', (req, res, next, vin) => {
    const ret = vinfo(vin).decode().result;

    if (!Object.keys(ret).length) {
        next(new error(400, `VIN is not valid`));
    } else {
        req.vin = ret;
        next();
    }
});

app.param('key', (req, res, next, key) => {
    const ret = (key in req.vin) && req.vin[key];

    if(!ret) {
        next(new error(400, `${key} is not defined`));
    } else {
        req.vin = ret.toString();
        next();
    }
});

app.get('/', (req, res, next) => {
    next(new error(400, `VIN is required`));
});

app.get('/:vin/:key?', (req, res) => {
    res.send(req.vin);
});

app.use((req, res, next) => {
    next(new error(404, `Not found`));
}, (err, req, res, next) => {
    const { status=500, message } = err;
    const error = { status, message };

    res.status(status).send({ error });
});

module.exports = app;
