//index.js
//获取应用实例
import {Base64} from "js-base64"
const app = getApp()

Page({
  getToken(){
    wx.login({
      success:(res)=>{
        wx.request({
          url: 'http://localhost:3000/v1/token',
          method:'post',
          data:{
            accont:res.code,
            type:200
          },success(res){
            let code=res.statusCode.toString();
            if(code.startsWith('2')){
              wx.setStorageSync('token', res.data.token)
            }
          }
        })
      }
    })
  },
    vertifyToken() {
    wx.login({
      success: (res) => {
        wx.request({
          url: 'http://localhost:3000/v1/token/vertify',
          method: 'post',
          data: {
            token:wx.getStorageSync('token')
          }, success(res) {
            console.log(res)
          }
        })
      }
    })
  }, 
  getLatest(){
    wx.request({
      url: 'http://localhost:3000/v1/classic/latest',
      method: 'GET',
      header:{
        Authorization:this._ecode()
      }, success(res) {
        console.log(res)
      }
    })
  },
  like() {
    wx.request({
      url: 'http://localhost:3000/v1/like',
      method: 'POST',
      data:{
        art_id:1,
        type:100
      },
      header: {
        Authorization: this._ecode()
      }, success(res) {
        console.log(res)
      }
    })
  },

    cancelLike() {
    wx.request({
      url: 'http://localhost:3000/v1/like/cancel',
      method: 'POST',
      data:{
        art_id:1,
        type:100
      },
      header: {
        Authorization: this._ecode()
      }, success(res) {
        console.log(res)
      }
    })
  },
  getLikeNum(){
    wx.request({
    url:'http://localhost:3000/v1/classic/100/1/favor',
      method: 'GET',
      header: {
        Authorization: this._ecode()
      }, success(res) {
        console.log(res)
      }
    })
  },
  getLikeList(){
    wx.request({
      url:'http://localhost:3000/v1/classic/favor',
      method: 'GET',
      header: {
        Authorization: this._ecode()
      }, success(res) {
        console.log(res)
      }
    })
  },
  getAll(){
    wx.request({
      url: 'http://localhost:3000/v1/book/favor/count',
      method: 'GET',
      header: {
        Authorization: this._ecode()
      }, success(res) {
        console.log(res)
      }
    })
   },
  getBookDetail(){
    wx.request({
      url: 'http://localhost:3000/v1/book/1120/detail',
      method: 'GET',
      header: {
        Authorization: this._ecode()
      }, success(res) {
        console.log(res)
      }
    })
  },
  searchBook(){
    wx.request({
      url: 'http://localhost:3000/v1/book/search/book',
      method: 'GET',
      data:{
        q:'[日]东野圭吾',
        count:10,
        start:1
      },
      header: {
        Authorization: this._ecode()
      }, success(res) {
        console.log(res)
      }
    })
  },
  commentBook() {
    wx.request({
      url: 'http://localhost:3000/v1/book/addComment',
      method: 'POST',
      data: {
        content: '[日]东野圭吾',
        book_id:1120
      },
      header: {
        Authorization: this._ecode()
      }, success(res) {
        console.log(res)
      }
    })
  },
  _ecode(){
    const token=wx.getStorageSync('token');
    const basic = Base64.encode(token+':')
    return "Basic " + basic;
  }
})
