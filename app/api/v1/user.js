const Router = require('koa-router')
const router = new Router({ prefix: '/v1/user' })
const { RegesterValidator } = require('../../validators/validators')
const { User } = require('./../../module/user')
const resultHandle = require('../../../lib/helper')
router.post('/register', async (ctx, next) => {
    const v = await new RegesterValidator().validate(ctx)
    const user = {
        password: v.get('body.password2'),
        nickname: v.get('body.nickname'),
        email: v.get('body.email')
    }
    const r = await User.create(user)
    resultHandle()
})
module.exports = router;