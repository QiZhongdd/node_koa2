const { sequelize } = require('../../app/core/db')
const { Sequelize, Model, Op } = require('sequelize')
const { Art } = require('./art')
class Favor extends Model {
    //业务表 ACID 保持数据的一致性  采用数据库事务
    static async like(art_id, type, uid) {
        const favor = await Favor.findOne({
            where: {
                art_id, type, uid
            }
        })
        if (favor) {
            throw new global.errs.LinkError();
        }
        return sequelize.transaction(async t => {
            await Favor.create({
                art_id,
                type,
                uid
            }, { transaction: t })

            const art = await Art.getData(art_id, type, false);
            await art.increment('fav_nums', { by: 1, transaction: t });
        })

    }
    static async dislike(art_id, type, uid) {
        const favor = await Favor.findOne({
            where: {
                art_id,
                type,
                uid
            }
        })
        if (!favor) {
            throw new global.errs.DislikeError();
        }

        return sequelize.transaction(async t => {
            // 删除分为软删除和硬删除，软删除记录还会保存在数据库中，只是会在delete_time加上删除时间，获取不到。硬删除是会
            await favor.destroy({
                force: false,
                transaction: t
            })

            const art = await Art.getData(art_id, type, false);
            await art.decrement('fav_nums', { by: 1, transaction: t });
        })
    }

    static async userLikeIt(art_id, type, uid) {
        let res = await Favor.findOne({
            where: {
                art_id, type, uid
            }
        })
        return res
    }
    static async getMYlike(uid) {
        let res = await Favor.findAll({
            where: {
                uid,
                type: {
                    [Op.not]: 400
                }
            }
        })
        if (!res) {
            throw new global.errs.NotFound('查询数据为空')
        }
        let favorList = await Art.getFavorList(res)
        return favorList
    }
}

Favor.init({
    uid: Sequelize.INTEGER,
    art_id: Sequelize.INTEGER,
    type: Sequelize.INTEGER
}, {
    sequelize,
    tableName: 'favor'
})

module.exports = {
    Favor
}