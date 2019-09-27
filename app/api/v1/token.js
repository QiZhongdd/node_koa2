const Router = require('koa-router');
const router = new Router({ prefix: '/v1/token' })
const { tokenValidator, NotEmptyValidator } = require('./../../validators/validators')
const { User } = require('./../../module/user')
const { LoginType } = require('./../../../lib/enum')
const { generateToken } = require('./../../core/util')
const { Auth } = require('../../middleware/auth')
const { wx } = require('../../service/wxManger')
router.post('/', async (ctx) => {
    const v = await new tokenValidator().validate(ctx);
    var token;
    switch (v.get('body.type')) {
        case LoginType.USER_EMAIL:
            token = await emaileLogin(v.get('body.accont'), v.get('body.secret'))
            break;
        case LoginType.USER_WX:
            token = await wx.codeToToken(v.get('body.accont'))
            break
        default:
            throw new global.errs.ParameterException('没有相应的处理函数')
    }
    ctx.body = { token }
})
router.post('/vertify', async (ctx) => {
    const v = await new NotEmptyValidator().validate(ctx)
    let flag = Auth.vertifyToken(v.get('body.token'))
    ctx.body = { vertify: flag }
})
async function emaileLogin(accont, secret) {
    const user = await User.verifyEmailPassword(accont, secret)
    let token = generateToken(user.id, Auth.AUSE)
    return token
}

module.exports = router;