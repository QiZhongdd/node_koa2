module.exports = {
    environment: 'dev',
    dataBase: {
        hose: 'localhost',
        dbName: 'node',
        port: 3306,
        user: 'root',
        password: '123456'
    },
    security: { secretKey: '123456', expiresIn: 60 * 60 * 24 * 30 },
    wx: {
        appId: 'wx86c65dfdab473da0',
        appSecret: 'e879195ec713a90d5817b9adb3e5fb1d',
        loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    },
    yushu: {
        detailUrl: 'http://t.yushu.im/v2/book/id/%s',
        keywordUrl: 'http://t.yushu.im/v2/book/search?q=%s&count=%s&start=%s&summary=%s'
    }
}