//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        salary: 0.00,
        deduction: 0.00,
        social: 0.00,
        month: 12,
        sub: 5000,
        totalRate: 0.00,
        rates: [],
        loading: false,
        calcClick: true
    },
    onLoad: function () {
    },
    bindInputSalary: function (e) {
        this.setData({
            salary: e.detail.value
        })
    },
    bindInputDeduction: function (e) {
        this.setData({
            deduction: e.detail.value
        })
    },
    bindInputSocial: function (e) {
        this.setData({
            social: e.detail.value
        })
    },
    bindTapCalc: function (e) {
        if (this.data.salary == "") {
            wx.showToast({
                title: '请输入每月薪资',
                icon: 'none'
            })
            return
        }
        if (this.data.deduction == "") {
            wx.showToast({
                title: '请输入每月专项附加扣除总计',
                icon: 'none'
            })
            return
        }
        if (this.data.social == "") {
            wx.showToast({
                title: '请输入每月社保公积金总计',
                icon: 'none'
            })
            return
        }
        var reg = /^[0-9]+(.[0-9]{2})?$/
        if (!reg.test(this.data.salary)) {
            wx.showToast({
                title: '请输入正确的薪资',
                icon: 'none'
            })
            return
        }

        if (!reg.test(this.data.deduction)) {
            wx.showToast({
                title: '请输入正确的专项附加扣除金额',
                icon: 'none'
            })
            return
        }

        if (!reg.test(this.data.social)) {
            wx.showToast({
                title: '请输入正确的社保公积金金额',
                icon: 'none'
            })
            return
        }

        let totalRate = 0.00
        let rates = []
        for (let i = 0; i < this.data.month; i++) {
            let rate = this.rateCalc((i + 1), totalRate)
            totalRate += parseFloat(rate)
            rates[i] = rate
        }
        totalRate = parseFloat(totalRate).toFixed(2)
        this.setData({
            calcClick: false,
            rates: rates,
            totalRate: totalRate
        })
    },
    // 税率计算
    rateCalc: function (month, totalRate) {
        let total = this.data.salary * month - this.data.sub * month - this.data.deduction * month - this.data.social * month
        if (total <= 36000) {
            return parseFloat(total * 0.03 - totalRate).toFixed(2)
        }
        if (total <= 144000) {
            return parseFloat(total * 0.1 - 2520 - totalRate).toFixed(2)
        }
        if (total <= 300000) {
            return parseFloat(total * 0.2 - 16920 - totalRate).toFixed(2)
        }
        if (total <= 420000) {
            return parseFloat(total * 0.25 - 31920 - totalRate).toFixed(2)
        }
        if (total <= 660000) {
            return parseFloat(total * 0.3 - 52920 - totalRate).toFixed(2)
        }
        if (total <= 960000) {
            return parseFloat(total * 0.35 - 85920 - totalRate).toFixed(2)
        }
        return parseFloat(total * 0.45 - 181920 - totalRate).toFixed(2)
    }
})
