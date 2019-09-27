const Router = require('koa-router')
const router = new Router({ prefix: '/v1/book' });
const { Auth } = require('../../middleware/auth')
const { HotBook } = require('./../../module/hot-book')
const { Book } = require('./../../module/book')
const { BookComment } = require('./../../module/book-comment')
const { Validators, SearchValidators, CommentValidator } = require('./../../validators/validators')
router.get('/favor/count', new Auth().m, async (ctx, next) => {
    let all = await HotBook.getAll();
    ctx.body = all
})

router.get('/:id/detail', new Auth().m, async (ctx, next) => {
    const v = await new Validators().validate(ctx);
    const id = v.get('path.id')
    const res = await Book.getDetail(id)
    ctx.body = res.data
})
router.get('/search/book', new Auth().m, async (ctx, next) => {
    const v = await new SearchValidators().validate(ctx);
    const res = await Book.getSearchBook(v.get('query.q'), v.get('query.start'), v.get('query.count'))
    ctx.body = res.data;
})
router.post('/addComment', new Auth().m, async (ctx, next) => {
    const v = await new CommentValidator().validate(ctx, {
        id: 'book_id'
    });
    const res = await BookComment.addComment(v.get('body.book_id'), v.get('body.content'))
    ctx.body = res;
})
module.exports = router 