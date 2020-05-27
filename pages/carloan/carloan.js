//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        // 输入参数
        price: 0.00,
        rate: 4.90,
        proportion: 30,
        numArr: [{
                name: '12期',
                value: 12,
                checked: true
            }, {
                name: '24期',
                value: 24,
                checked: false
            },
            {
                name: '36期',
                value: 36,
                checked: false
            }
        ],
        value: 12,
        calcClick: true,
        // 输出结果
        firstMoney: 0,
        loanMoney: 0,
        monthPay: 0,
        interestPay: 0,
        totalPay: 0
    },
    onLoad: function () {},
    bindInputPrice: function (e) {
        this.setData({
            price: e.detail.value
        })
    },
    bindInputRate: function (e) {
        this.setData({
            rate: e.detail.value
        })
    },
    bindInputProportionl: function (e) {
        this.setData({
            proportion: e.detail.value
        })
    },
    changeNum: function (e) {
        this.setData({
            value: e.detail.value
        })
    },
    bindTapCalc: function (e) {
        if (this.data.price == "") {
            wx.showToast({
                title: '请输入车辆售价',
                icon: 'none'
            })
            return
        }
        if (this.data.rate == "") {
            wx.showToast({
                title: '请输入贷款利率',
                icon: 'none'
            })
            return
        }
        if (this.data.proportion == "") {
            wx.showToast({
                title: '请输入首付比列',
                icon: 'none'
            })
            return
        }
        this.calc()
        this.setData({
            calcClick: false
        })
    },
    // 计算
    calc: function () {
        // 等额本息公式：月还款额=[贷款本金*月利率*(1+月利率)^还款月数]÷[(1+月利率)^还款月数-1]

        let monthRate = parseFloat(this.data.rate / 12 / 100)
        let firstMoney = parseFloat(this.data.price * this.data.proportion / 100).toFixed(2)
        let loanMoney = parseFloat(this.data.price - firstMoney).toFixed(2)
        let x = parseFloat(1.00 + monthRate)
        let pow = Math.pow(x, this.data.value)
        let monthPay = parseFloat((loanMoney * monthRate * pow) / (pow - 1)).toFixed(2)
        let interestPay = parseFloat(this.data.value * monthPay - loanMoney).toFixed(2)
        let totalPay = parseFloat(this.data.value * monthPay).toFixed(2)
        this.setData({
            firstMoney: firstMoney,
            loanMoney: loanMoney,
            monthPay: monthPay,
            interestPay: interestPay,
            totalPay: totalPay
        })
    }
})