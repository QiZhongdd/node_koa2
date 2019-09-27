const { sequelize } = require('../../app/core/db')
const { Sequelize, Model, Op } = require('sequelize')
const { Favor } = require('./favor')
class HotBook extends Model {
    //获取书籍的点赞数量
    static async getAll() {
        const book = await HotBook.findAll({
            order: ['index']
        })
        let ids = [];
        book.forEach(ele => {
            ids.push(ele.id)
        })
        const favor = await Favor.findAll({
            where: {
                art_id: {
                    [Op.in]: ids
                }
            },
            group: 'art_id',//根据art_id进行分组
            attributes: ['art_id', [Sequelize.fn('COUNT', '*'), 'count']]//根据art_id计算art_id出现过的总数
        })
        return favor
    }
}

HotBook.init({
    index: Sequelize.STRING,
    image: Sequelize.STRING,
    author: Sequelize.STRING,
    title: Sequelize.STRING,
}, {
    sequelize,
    tableName: 'hot_book'
})

module.exports = {
    HotBook
}