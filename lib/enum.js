//模拟枚举
function isType(val) {
    for (let key in this) {
        if (this[key] == val) {
            return true
        }
    }
    return false
}

const LoginType = {
    USER_MINI_PROGRAM: 100,
    USER_EMAIL: 101,
    USER_MOBILE: 102,
    USER_WX: 200,
    isType
}
module.exports = {
    LoginType
}