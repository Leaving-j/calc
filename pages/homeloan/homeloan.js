//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        // 输入参数
        price: 0.00,
        rate: 4.90,
        index: 0,
        array: ['请选择贷款年限', '5年（60期）', '10年（120期）', '15年（180期）', '20年（240期）', '25年（300期）', '30年（360期）'],
        arrayValue: 0,
        numArr: [{
            name: '等额本息',
            value: 1,
            checked: true
        }, {
            name: '等额本金',
            value: 2,
            checked: false
        }],
        value: 1,
        calcClick: true,
        // 输出结果
        loanMoney: 0,
        monthPay: 0,
        interestPay: 0,
        totalPay: 0,
        minus: 0
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
    changeNum: function (e) {
        this.setData({
            value: e.detail.value
        })
    },
    bindPickerChange: function (e) {
        const value = e.detail.value
        let arrayValue = 0
        if (value == 1) {
            arrayValue = 60
        }
        if (value == 2) {
            arrayValue = 120
        }
        if (value == 3) {
            arrayValue = 180
        }
        if (value == 4) {
            arrayValue = 240
        }
        if (value == 5) {
            arrayValue = 300
        }
        if (value == 6) {
            arrayValue = 360
        }
        this.setData({
            arrayValue: arrayValue,
            index: value
        })
    },
    bindTapCalc: function (e) {
        if (this.data.price == "") {
            wx.showToast({
                title: '请输入贷款金额',
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
        if (this.data.index == 0) {
            wx.showToast({
                title: '请选择贷款期限',
                icon: 'none'
            })
            return
        }
        if (this.data.value == 1) {
            this.calc()
        } else {
            this.calc2()
        }
        this.setData({
            calcClick: false
        })
    },
    // 计算
    calc: function () {
        // 等额本息公式：月还款额=[贷款本金*月利率*(1+月利率)^还款月数]÷[(1+月利率)^还款月数-1]
        let monthRate = parseFloat(this.data.rate / 12 / 100)
        let loanMoney = parseFloat(this.data.price)
        let x = parseFloat(1.00 + monthRate)
        let pow = Math.pow(x, this.data.arrayValue)
        let monthPay = parseFloat((loanMoney * monthRate * pow) / (pow - 1)).toFixed(2)
        let interestPay = parseFloat(this.data.arrayValue * monthPay - loanMoney).toFixed(2)
        let totalPay = parseFloat(this.data.arrayValue * monthPay).toFixed(2)
        this.setData({
            loanMoney: loanMoney,
            monthPay: monthPay,
            interestPay: interestPay,
            totalPay: totalPay
        })
    },
    calc2: function () {
        // 1.每月月供额=(贷款本金÷还款月数)+(贷款本金-已归还本金累计额)×月利率
        // 2.每月应还本金=贷款本金÷还款月数
        // 3.每月应还利息=剩余本金×月利率=(贷款本金-已归还本金累计额)×月利率
        // 4.每月月供递减额=每月应还本金×月利率=贷款本金÷还款月数×月利率
        // 5.总利息=〔(总贷版款额÷权还款月数+总贷款额×月利率)+总贷款额÷还款月数×(1+月利率)〕÷2×还款月数-总贷款额
        let monthRate = parseFloat(this.data.rate / 12 / 100)
        let loanMoney = parseFloat(this.data.price)
        let x = parseFloat(1.00 + monthRate)
        let monthPay = parseFloat((loanMoney / this.data.arrayValue) + (loanMoney * monthRate)).toFixed(2)
        let minus = parseFloat((loanMoney / this.data.arrayValue) * monthRate).toFixed(2)
        let interestPay = parseFloat(((loanMoney / this.data.arrayValue + loanMoney * monthRate) + loanMoney / this.data.arrayValue * x) / 2 * this.data.arrayValue - loanMoney)
        let totalPay = parseFloat(loanMoney + interestPay).toFixed(2)
        this.setData({
            minus: minus,
            loanMoney: loanMoney,
            monthPay: monthPay,
            interestPay: interestPay.toFixed(2),
            totalPay: totalPay
        })
    }
})