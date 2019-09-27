const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')
class Auth {
    constructor(level) {
        this.level = level || 1;
        Auth.AUSE = 8
        Auth.ADMIN = 16
        Auth.SPUSER_ADMIN = 32
    }
    get m() {
        // token 检测
        // token 开发者 传递令牌
        // token body header
        // HTTP 规定 身份验证机制 HttpBasicAuth
        return async (ctx, next) => {
            let errMsg
            const token = basicAuth(ctx.req)
            if (!token || !token.name) {
                throw new global.errs.Forbidden('token不合法')
            }
            try {
                var decode = jwt.decode(token.name, global.config.security.secretKey)
            } catch (error) {
                // token 不合法 过期
                if (error.name === 'TokenExpiredError') {
                    errMsg = "token已过期"
                }
                throw new global.errs.Forbidden(errMsg)
            }
            if (decode.scope < this.level) {
                errMsg = "权限不足"
                throw new global.errs.Forbidden(errMsg)
            }
            ctx.auth = {
                uid: decode.id,
                scope: decode.scope
            }
            await next()
        }
    }
    static vertifyToken(token) {
        try {
            jwt.decode(token, global.config.security.secretKey)
            return true
        } catch (error) {
            return false
        }
    }
}
module.exports = {
    Auth
}