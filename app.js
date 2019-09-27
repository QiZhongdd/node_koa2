const Koa = require('koa')
var bodyParser = require('koa-bodyparser');
var static = require('koa-static')
const path = require('path')
const app = new Koa();
const InitManager = require('./app/core/init')
const catchError = require('./app/middleware/catchError')
//处理获取静态资源
app.use(static(path.join(__dirname, './static')))
app.use(catchError)
app.use(bodyParser());
InitManager.initCore(app)
app.listen('3000')