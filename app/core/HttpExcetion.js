class HttpException extends Error {
    constructor(msg = '服务器错误', status = 500, errorCode = 10001) {
        super()
        this.message = msg;
        this.status = status;
        this.errorCode = errorCode;
    }
}
class ParameterException extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.status = 400
        this.message = msg || "参数错误"
        this.errorCode = errorCode || 10000
    }
}
class SucessException extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.status = 200;
        this.message = msg || '成功';
        this.errorCode = errorCode || 0
    }
}

class NotFound extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 401;
        this.message = msg || '没有权限';
        this.errorCode = errorCode || 10005
    }
}
class AuthFailed extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 401;
        this.message = msg || '授权失败';
        this.errorCode = errorCode || 10009
    }
}
class Forbidden extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 403;
        this.message = msg || '没有权限';
        this.errorCode = errorCode || 10006
    }
}
class LinkError extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 400;
        this.message = msg || '已有该条收藏记录'
        this.errorCode = errorCode || 1004
    }
}
class DislikeError extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 400;
        this.message = msg || '没有该收藏记录'
        this.errorCode = errorCode || 1005
    }
}
module.exports = { HttpException, ParameterException, SucessException, NotFound, Forbidden, AuthFailed, LinkError, DislikeError }