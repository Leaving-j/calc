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
        url: '/pages/recordhave/recordhave',
      })
    },
    savepick: function(e) {
      wx.navigateTo({
        url: '/pages/recordsave/recordsave',
      })
    },
    onLoad: function(options) {
  
    },
    onShareAppMessage: function() {
    
    }
  })