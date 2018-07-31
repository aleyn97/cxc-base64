import CardScanner from '../cardscanner/cardscanner.js'

Page({
  onLoad(options) {
    let that = this
    this.imgPath = options.imgPath
    this.cardScanner = new CardScanner(this)
      .on('ImageChanged', (imgPath) => {
        that.imgPath = imgPath
        console.log(imgPath)
      })
      .on('DecodeStart', (imgPath) => {
        wx.showLoading({
          title: '生成中',
          mask: true
        })
      })
      .on('DecodeComplete', (res) => {
        if (res.code == 1) {
          //这里返回转过的base64字符串，打印查看
          let base64 = 'data:image/jpeg;base64,' + res.data
          console.log(base64)
          //做你要做的操作
          // ....
          // ....

        } else {
          console.log('解析失败：' + res.reason)
        }
        wx.hideLoading()
      })
  },
  onReady() {
    this.cardScanner.setImage(this.imgPath)
  }
})