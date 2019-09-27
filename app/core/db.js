const { Sequelize, Model } = require("sequelize")
const {
    dbName,
    host,
    port,
    user,
    password
} = require("../../config/config").dataBase
const { unset, clone } = require('lodash')
const sequelize = new Sequelize(dbName, user, password, {
    dialect: "mysql", // 链接的数据库类型
    host,
    port,
    logging: true,
    timezone: "+08:00",//时期，北京时期
    define: {
        timestamps: true,//是否打开时间戳记，及是否记录每个操作的时间戳，true时自动加上createdAt和updateAt
        paranoid: true,//当timestamps为true时才可以使用，代表是否加上deleteAt
        createdAt: "created_at", // 自定义自动生成的字段名
        updatedAt: "updated_at",
        deletedAt: "deleted_at"
    }
})
sequelize.sync({
    force: false // 同步更新字段,true时会删除数据库的数据然后再创建
})
Model.prototype.toJSON = function () {
    const data = clone(this.dataValue);
    unset(data, 'deletet_at')
    unset(data, 'update_at')
    unset(data, 'created_at')
    return data;
}
// 导出的名字可以用db代替,相当于es6中的as
module.exports = { sequelize }