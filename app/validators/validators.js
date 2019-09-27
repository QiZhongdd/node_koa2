const { LinValidator, Rule } = require('../core/lin-validator-v2')
const { User } = require('./../module/user')
const { LoginType } = require('./../../lib/enum')
class Validators extends LinValidator {
    constructor() {
        super()
        this.id = [
            new Rule('isInt', '必须是整数', { min: 1 })
        ];
    }
}
class CommentValidator extends Validators {
    constructor() {
        super()
        this.content = [
            new Rule('isLength', '长度4-10', { min: 4, max: 10 })
        ]
    }
}
class likeValidators extends Validators {
    constructor() {
        super()
        this.type = [
            new Rule('isInt', 'type必须是整数')
        ]
    }
}
class SearchValidators extends LinValidator {
    constructor() {
        super()
        this.q = [
            new Rule('isLength', '查询关键字4-16', { min: 4, max: 16 })
        ]
        this.count = [
            new Rule('isOptional'),
            new Rule('isInt', 'count必须是整数')
        ]
        this.summary = [
            new Rule('isOptional'),
            new Rule('isInt', 'summary必须是整数')
        ]
        this.start = [
            new Rule('isInt', 'summary必须是整数', { min: 0 })
        ]
    }
}
class ClassicValidator extends Validators {
    constructor() {
        super()
    }
    validateType(vals) {
        isValidateType(vals)
    }
}
class tokenValidator extends LinValidator {
    constructor() {
        super();
        this.accont = [new Rule('isLength', '密码最少4位，最多32位', { min: 4, max: 32 })]
        this.secrept = [new Rule('isOptional'), new Rule("isLength", "密码最少6位，最多32位", {
            min: 6,
            max: 32
        })]//isOptional代表可填可不填，如果填写了执行下面的rule
    }
    validateLoginType(vals) {
        isValidateType(vals)
    }
}
function isValidateType(vals) {
    var type = vals.body.type || vals.path.type;
    if (!type) {
        throw new Error('type是必须参数')
    }
    if (!LoginType.isType(type)) {
        throw new Error('type参数不合法')
    }
}
class NotEmptyValidator extends LinValidator {
    constructor() {
        super()
        this.token = [
            new Rule('isLength', '不允许为空', { min: 1 })
        ]
    }
}

class RegesterValidator extends LinValidator {
    constructor() {
        super()
        this.email = [new Rule("isEmail", "邮箱格式不正确不正确")];
        this.password = [
            new Rule("isLength", "密码最少6位，最多32位", {
                min: 6,
                max: 32
            }),
            new Rule(
                "matches",
                "密码必须包含数字、大写英文字母、小写英文字母",
                "^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]"
            )
        ];
        this.password2 = this.password;
        this.nickname = [
            new Rule("isOptional"),
            new Rule("isLength", "昵称最少6位，最多16位", {
                min: 6,
                max: 32,
                required: false
            })
        ]
    }
    validatePassword(vals) {
        let psw1 = vals.body.password;
        let psw2 = vals.body.password2;
        if (psw1 !== psw2) {
            throw new Error("两次密码必须相同")
        }
    }
    async validateEmail(vals) {
        let email = vals.body.email;
        const user = await User.findOne({
            where: {
                email
            }
        })
        if (user) {
            throw new Error('该邮箱账号已注册')
        }
    }
}
module.exports = { Validators, CommentValidator, RegesterValidator, tokenValidator, SearchValidators, NotEmptyValidator, likeValidators, ClassicValidator }