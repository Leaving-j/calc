//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        // 输入参数
        current: 'tab1',
        price: 0.00,
        price2: 0.00,
        rate: 4.90,
        rate2: 3.25,
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
    handleChange ({ detail }) {
        if (detail.key == 'tab2') {
            this.setData({
                rate: 3.25
            })
        } else {
            this.setData({
                rate: 4.90
            })
        }
        this.setData({
            current: detail.key,
            calcClick: true
        });
    },
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
    bindInputPrice2: function (e) {
        this.setData({
            price2: e.detail.value
        })
    },
    bindInputRate2: function (e) {
        this.setData({
            rate2: e.detail.value
        })
    },
    changeNum: function (e) {
        this.setData({
            value: e.detail.value
        })
        this.bindTapCalc()
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
        if (this.data.current == "tab3" && this.data.rate == "" && this.data.rate2 == "") {
            wx.showToast({
                title: '请输入贷款利率',
                icon: 'none'
            })
            return
        }

        if (this.data.current == 'tab3') {
            if (this.data.value == 1) {
                const map = this.calc(this.data.rate, this.data.price)
                const map2 = this.calc(this.data.rate2, this.data.price2)
                let monthPay = parseFloat(map.get("monthPay")) + parseFloat(map2.get("monthPay"))
                let loanMoney = parseFloat(map.get("loanMoney")) + parseFloat(map2.get("loanMoney"))
                let interestPay = parseFloat(map.get("interestPay")) + parseFloat(map2.get("interestPay"))
                let totalPay = parseFloat(map.get("totalPay")) + parseFloat(map2.get("totalPay"))
                this.setData({
                    loanMoney: loanMoney.toFixed(2),
                    monthPay: monthPay.toFixed(2),
                    interestPay: interestPay.toFixed(2),
                    totalPay: totalPay.toFixed(2)
                })
            } else {
                const map = this.calc2(this.data.rate, this.data.price)
                const map2 = this.calc2(this.data.rate2, this.data.price2)
                let minus = parseFloat(map.get("minus")) + parseFloat(map2.get("minus"))
                let loanMoney = parseFloat(map.get("loanMoney")) + parseFloat(map2.get("loanMoney"))
                let monthPay = parseFloat(map.get("monthPay")) + parseFloat(map2.get("monthPay"))
                let interestPay = parseFloat(map.get("interestPay")) + parseFloat(map2.get("interestPay"))
                let totalPay = parseFloat(map.get("totalPay")) + parseFloat(map2.get("totalPay"))
                this.setData({
                    minus: minus.toFixed(2),
                    loanMoney: loanMoney.toFixed(2),
                    monthPay: monthPay.toFixed(2),
                    interestPay: interestPay.toFixed(2),
                    totalPay: totalPay.toFixed(2)
                })
            }
        } else {
            if (this.data.value == 1) {
                const map = this.calc(this.data.rate, this.data.price)
                this.setData({
                    loanMoney: map.get("loanMoney").toFixed(2),
                    monthPay: map.get("monthPay").toFixed(2),
                    interestPay: map.get("interestPay").toFixed(2),
                    totalPay: map.get("totalPay").toFixed(2)
                })
            } else {
                const map = this.calc2(this.data.rate, this.data.price)
                this.setData({
                    minus: map.get("minus").toFixed(2),
                    loanMoney: map.get("loanMoney").toFixed(2),
                    monthPay: map.get("monthPay").toFixed(2),
                    interestPay: map.get("interestPay").toFixed(2),
                    totalPay: map.get("totalPay").toFixed(2)
                })
            }
        }
        this.setData({
            calcClick: false
        })
    },
    // 计算
    calc: function (rate, price) {
        // 等额本息公式：月还款额=[贷款本金*月利率*(1+月利率)^还款月数]÷[(1+月利率)^还款月数-1]
        let monthRate = parseFloat(rate / 12 / 100)
        let loanMoney = parseFloat(price)
        let x = parseFloat(1.00 + monthRate)
        let pow = Math.pow(x, this.data.arrayValue)
        let monthPay = parseFloat((loanMoney * monthRate * pow) / (pow - 1))
        let interestPay = parseFloat(this.data.arrayValue * monthPay - loanMoney)
        let totalPay = parseFloat(this.data.arrayValue * monthPay)
        let map = new Map()
        map.set("loanMoney", loanMoney)
        map.set("monthPay", monthPay)
        map.set("interestPay", interestPay)
        map.set("totalPay", totalPay)
        return map
    },
    calc2: function (rate, price) {
        // 1.每月月供额=(贷款本金÷还款月数)+(贷款本金-已归还本金累计额)×月利率
        // 2.每月应还本金=贷款本金÷还款月数
        // 3.每月应还利息=剩余本金×月利率=(贷款本金-已归还本金累计额)×月利率
        // 4.每月月供递减额=每月应还本金×月利率=贷款本金÷还款月数×月利率
        // 5.总利息=〔(总贷版款额÷权还款月数+总贷款额×月利率)+总贷款额÷还款月数×(1+月利率)〕÷2×还款月数-总贷款额
        let monthRate = parseFloat(rate / 12 / 100)
        let loanMoney = parseFloat(price)
        let x = parseFloat(1.00 + monthRate)
        let monthPay = parseFloat((loanMoney / this.data.arrayValue) + (loanMoney * monthRate))
        let minus = parseFloat((loanMoney / this.data.arrayValue) * monthRate)
        let interestPay = parseFloat(((loanMoney / this.data.arrayValue + loanMoney * monthRate) + loanMoney / this.data.arrayValue * x) / 2 * this.data.arrayValue - loanMoney)
        let totalPay = parseFloat(loanMoney + interestPay)
        let map = new Map()
        map.set("minus", minus)
        map.set("loanMoney", loanMoney)
        map.set("monthPay", monthPay)
        map.set("interestPay", interestPay)
        map.set("totalPay", totalPay)
        return map
    }
})