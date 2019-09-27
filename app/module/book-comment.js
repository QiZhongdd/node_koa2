const { sequelize } = require('../../app/core/db')
const { Sequelize, Model } = require('sequelize')
class BookComment extends Model {
    static async addComment(book_id, content) {
        const comment = await BookComment.findOne({
            where: {
                book_id, content
            }
        })
        if (comment) {
            return await comment.increment('nums', { by: 1 })
        } else {
            return await BookComment.create({
                book_id, content, nums: 1
            })
        }
    }
    toJSON() {
        return {
            book_id: this.getDataValue('nums'),
            content: this.getDataValue('content')
        }
    }
}
BookComment.init({
    book_id: {
        type: Sequelize.INTEGER
    },
    content: {
        type: Sequelize.STRING
    },
    nums: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize,
    tableName: 'book_comments'
})
module.exports = {
    BookComment
}