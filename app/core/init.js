const requireDirectory = require('require-directory')
const Router = require('koa-router')
class Init {
    static initCore(app) {
        Init.initManager(app)
        Init.loadConfig()
        Init.loadHttpException()
    }
    static loadConfig(path = '') {
        const configPath = path || `${process.cwd()}/config/config.js`;
        const config = require(configPath)
        global.config = config;
    }
    static initManager(app) {
        //process.cwd()获取到当前项目的目录
        const path = `${process.cwd()}/app/api`
        requireDirectory(module, path, { visit: whenLoadModule })
        function whenLoadModule(obj) {
            if (obj instanceof Router) {
                app.use(obj.routes())
            }
        }
    }
    static loadHttpException() {
        const errors = require('./HttpExcetion')
        global.errs = errors
    }
}
module.exports = Init