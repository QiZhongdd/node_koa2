const axios = require('axios')
const util = require('util')
const { User } = require('./../module/user')
const { Auth } = require('./../middleware/auth')
const { generateToken } = require('./../core/util')
class wx {
    static async codeToToken(code) {
        let url = util.format(global.config.wx.loginUrl,
            global.config.wx.appId,
            global.config.wx.appSecret,
            code)
        let res = await axios.get(url)
        if (res.status !== 200) {
            throw new global.errs.AuthFailed("openid获取失败")
        }
        const errCode = res.data.errcode
        const errMsg = res.data.errmsg
        if (errCode) {
            throw new global.errs.AuthFailed("openid获取失败: " + errMsg)
        }
        let user = await User.findUserByOpenid(res.data.openid);
        if (!user) {
            user = await User.regesterOpenId(res.data.openid)
        }
        let token = generateToken(user.id, Auth.AUSE)
        return token;
    }
}
module.exports = { wx }