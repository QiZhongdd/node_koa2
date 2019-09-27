const brcypt = require('bcryptjs')
const { Sequelize, Model } = require("sequelize")
const { sequelize } = require("../core/db")

const bcrypt = require('bcryptjs')
class User extends Model {
    static async verifyEmailPassword(account, password) {
        let user = await User.findOne({
            where: { email: account }
        })
        if (!user) {
            throw new global.errs.NotFound('没有该账号')
        } else {
            const correct = bcrypt.compareSync(password, user.password);
            if (!correct) {
                throw new global.errs.NotFound('密码不正确')
            }
        }
        return user
    }
    static async findUserByOpenid(openid) {
        const user = await User.findOne({
            where: { openid }
        })
        return user
    }
    static async regesterOpenId(openid) {
        const user = await User.create({ openid })
        return user
    }
}

const secma = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true, // 主键
        autoIncrement: true // 自增型
    },
    nickname: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        unique: true // 唯一
    },
    password: {
        type: Sequelize.STRING,
        set(val) {
            //数字10 代表着生成密码的成本，越大越安全也代表着耗费的服务器性能越大
            //密码的注意事项：不能明文，加密后的两个用户的密码不能相同。
            const salt = brcypt.genSaltSync(10)
            const pwd = brcypt.hashSync(val, salt)
            this.setDataValue("password", pwd)//model中的方法
        }
    },
    openid: {
        type: Sequelize.STRING(64),
        unique: true
    }
}

User.init(
    secma,
    { sequelize } // tableName: "user" 自定义表名为user
)

module.exports = { User }
