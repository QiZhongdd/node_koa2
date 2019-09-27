const axios = require('axios')
const util = require('util')
const { yushu } = require('../../config/config')
const { sequelize } = require('../../app/core/db')
const { Sequelize, Model } = require('sequelize')
class Book extends Model {
    static async getDetail(id) {
        let url = util.format(yushu.detailUrl, id)
        let res = await axios.get(url)
        return res
    }
    static async getSearchBook(q, start, count, summary = 1) {
        let url = util.format(yushu.keywordUrl, encodeURI(q), count, start, summary);
        let res = await axios.get(url);
        return res;
    }
}

Book.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    fav_nums: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize,
    tableName: 'book'
})
module.exports = {
    Book
}