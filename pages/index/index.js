Page({
    data: {
  
    },
    waitpick: function(e) {
      wx.navigateTo({
        url: '/pages/incometax/incometax',
      })
    },
    havepick: function(e) {
      wx.navigateTo({
        url: '/pages/carloan/carloan',
      })
    },
    savepick: function(e) {
      wx.navigateTo({
        url: '/pages/homeloan/homeloan',
      })
    },
    onLoad: function(options) {
  
    },
    onShareAppMessage: function() {
    
    }
  })