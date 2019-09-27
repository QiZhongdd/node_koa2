const Router = require('koa-router')
const router = new Router({
    prefix: "/v1/classic"
})
const { ClassicValidator } = require('../../validators/validators')
const { Auth } = require('../../middleware/auth')
const { Flow } = require('../../module/flow')
const { Art } = require('./../../module/art')
const { Favor } = require('../../module/favor')
//获取最新的期刊
router.get('/latest', new Auth().m, async (ctx, next) => {
    let flow = await Flow.findOne({
        order: [
            ['index', 'DESC']
        ]
    })
    let res = await Art.getData(flow.art_id, flow.type)
    //序列化是将对象转换为json,res是个model对象，所以此处要将res序列化
    res.setDataValue('index', flow.index)
    ctx.body = res
})
//获取期刊的点赞数量及用户是否点过赞
router.get('/:type/:id/favor', new Auth().m, async (ctx, next) => {
    const v = await new ClassicValidator().validate(ctx);
    const id = v.get('path.id')
    const type = parseInt(v.get('path.type'));
    const art = await Art.getData(id, type);
    if (!art) {
        throw new global.errs.NotFound();
    }
    const like = await Favor.userLikeIt(
        id, type, ctx.auth.uid
    )
    ctx.body = {
        fav_nums: art.fav_nums,
        like_status: like
    }
})
//获取用户所有喜欢的期刊
router.get('/favor', new Auth().m, async (ctx) => {
    const uid = ctx.auth.uid;
    const res = await Favor.getMYlike(uid);
    ctx.body = res;
})
module.exports = router