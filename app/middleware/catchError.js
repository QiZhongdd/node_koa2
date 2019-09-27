const { HttpException } = require('../core/HttpExcetion')
const catchError = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        //错误有已知的错误和未知的错误
        let isDev = global.config.environment === 'dev';
        let isHttpError = error instanceof HttpException;
        if (isDev && !isHttpError) {
            throw error
        }
        if (isHttpError) {
            ctx.body = {
                message: error.message,
                error_code: error.errorCode,
                request: `${ctx.path} ${ctx.method}`
            }
            ctx.status = error.status
        }
    }
}
module.exports = catchError