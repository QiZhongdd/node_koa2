const Router = require('koa-router')
const { Auth } = require('../../middleware/auth')
const { likeValidators } = require('./../../validators/validators')
const resultHandle = require('./../../../lib/helper')
const router = new Router({
    prefix: "/v1/like"
})
const { Favor } = require('../../module/favor');
router.post('/', new Auth().m, async (ctx, next) => {
    const v = await new likeValidators().validate(ctx, {
        id: 'art_id'
    })
    await Favor.like(v.get('body.art_id'), v.get('body.type'), ctx.auth.uid)
    resultHandle()
})

router.post('/cancel', new Auth().m, async (ctx, next) => {
    const v = await new likeValidators().validate(ctx, {
        id: 'art_id'
    })
    await Favor.dislike(v.get('body.art_id'), v.get('body.type'), ctx.auth.uid)
    resultHandle()
})
module.exports = router