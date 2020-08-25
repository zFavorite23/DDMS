<template>
    <div>
        <div class="top">
            <el-form :inline="true" :model="query1">
                <el-form-item label="开始日期：">
                    <el-date-picker v-model="query1.startTime" type="month" placeholder="选择日期" format="yyyy 年 MM 月" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item label="结束日期：">
                    <el-date-picker v-model="query1.endTime" type="month" placeholder="选择日期" format="yyyy 年 MM 月" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item><el-button type="primary" size="medium" v-on:click="getHourRadix()" icon="el-icon-search">搜索</el-button></el-form-item>
            </el-form>
            <div class="echarts">
                <div id="pie" class="pie"></div>
                <div id="bar" class="bar"></div>
            </div>
        </div>
        <div class="bot">
            <el-form :inline="true" :model="query2">
                <el-form-item label="开始日期：">
                    <el-date-picker v-model="query2.startTime" type="month" placeholder="选择日期" format="yyyy 年 MM 月" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item label="结束日期：">
                    <el-date-picker v-model="query2.endTime" type="month" placeholder="选择日期" format="yyyy 年 MM 月" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item><el-button type="primary" size="medium" v-on:click="getHourRadix2()" icon="el-icon-search">搜索</el-button></el-form-item>
            </el-form>
            <div id="line" class="line"></div>
        </div>
    </div>
</template>

<script>
import { dateFormat } from '../../utils/date.js';
import { getItemPay } from '../../api/project/item.js';
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            query1: {
                startTime: '2020-01-01',
                endTime: dateFormat(new Date()),
                itemId: ''
            },
            query2: {
                startTime: '2020-01-01',
                endTime: dateFormat(new Date()),
                itemId: ''
            },
            othernNum: 0, // 其它
            travelNum: 0, // 差旅费
            serveNum: 0, // 业务招待费
            outsourceNum: 0, // 外协
            deviceNum: 0, // 设备采购
            workNum: 0, // 办公费
            trafficNum: 0, // 市内交通
            meetingNum: 0, // 会议费
            // 饼图
            optionPie: {
                title: {
                    text: '支出占比',
                    // subtext: '纯属虚构',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: []
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            },
            // 柱状图
            optionBar: {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data: ['差旅费', '业务招待费', '外协', '设备采购', '办公费', '市内交通', '会议费']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value'
                },
                yAxis: [
                    {
                        type: 'category',
                        data: []
                    }
                ],
                series: [
                    {
                        name: '差旅费',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            show: true,
                            position: 'inside'
                        },
                        data: []
                    },
                    {
                        name: '业务招待费',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            show: true,
                            position: 'inside'
                        },
                        data: []
                    },
                    {
                        name: '外协',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            show: true,
                            position: 'inside'
                        },
                        data: []
                    }
                ]
            },
            // 折线图
            optionLin: {
                title: {
                    text: '报销分类趋势'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['差旅费', '业务招待费', '外协', '设备采购', '办公费', '市内交通', '会议费']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: []
                    }
                ],
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: '差旅费',
                        type: 'line',
                        stack: '总量',
                        data: []
                    },
                    {
                        name: '业务招待费',
                        type: 'line',
                        stack: '总量',
                        data: []
                    },
                    {
                        name: '外协',
                        type: 'line',
                        stack: '总量',
                        data: []
                    },
                    {
                        name: '设备采购',
                        type: 'line',
                        stack: '总量',
                        data: []
                    },
                    {
                        name: '办公费',
                        type: 'line',
                        stack: '总量',
                        data: []
                    },
                    {
                        name: '市内交通',
                        type: 'line',
                        stack: '总量',
                        data: []
                    },
                    {
                        name: '会议费',
                        type: 'line',
                        stack: '总量',
                        data: []
                    }
                ]
            }
        };
    },
    computed: {
        ...mapGetters(['permissions'])
    },
    created() {
        this.query1.itemId = this.$route.params.itemId;
        this.query2.itemId = this.$route.params.itemId;

        this.getItemPayBack(this.query1);
        this.getItemPayBack2(this.query1);
        this.getItemPayBack3(this.query2);
    },
    mounted() {},
    methods: {
        // 查询
        getHourRadix() {
            this.othernNum = 0;
            this.travelNum = 0;
            this.serveNum = 0;
            this.outsourceNum = 0;
            this.deviceNum = 0;
            this.workNum = 0;
            this.trafficNum = 0;
            this.meetingNum = 0;
            this.optionBar.yAxis[0].data = [];
            this.optionBar.series[0].data = [];
            this.optionBar.series[1].data = [];
            this.getItemPayBack(this.query1);
            this.optionPie.series[0].data = [];
            this.getItemPayBack2(this.query1);
        },
        getHourRadix2() {
            this.optionLin.series.forEach(item => {
                item.data = [];
            });
            this.getItemPayBack3(this.query2);
        },

        // 柱状图
        getItemPayBack(query) {
            getItemPay(query).then(res => {
                // console.log(res);
                res.data.data.forEach((item, index) => {
                    this.optionBar.yAxis[0].data[index] = item.createTime;
                    if (item.type === '1') {
                        this.optionBar.series[0].data.push(item.invoicePriceYuan);
                    } else if (item.type === '4') {
                        this.optionBar.series[1].data.push(item.invoicePriceYuan);
                    } else if (item.type === '6') {
                        this.optionBar.series[2].data.push(item.invoicePriceYuan);
                    }
                });
                this.drawBar();
            });
        },
        // 柱状
        drawBar() {
            let bar = this.$echarts.init(document.getElementById('bar'));
            bar.setOption(this.optionBar, (window.onresize = bar.resize));
            bar.resize();
            window.addEventListener('resize', function() {
                bar.resize();
            });
        },

        // 饼图
        getItemPayBack2(query) {
            getItemPay(query).then(res => {
                // console.log(res);
                res.data.data.forEach((item, index) => {
                    if (item.type == null) {
                        this.othernNum += item.invoicePrice;
                        this.optionPie.legend.data[0] = '其它';
                        this.optionPie.series[0].data[0] = {
                            value: this.othernNum,
                            name: '其它'
                        };
                    }
                    if (item.type == '1') {
                        this.travelNum += item.invoicePrice;
                        this.optionPie.legend.data[1] = '差旅费';
                        this.optionPie.series[0].data[1] = {
                            value: this.travelNum,
                            name: '差旅费'
                        };
                    }
                    if (item.type == '2') {
                        this.serveNum += item.invoicePrice;
                        this.optionPie.legend.data[2] = '业务招待费';
                        this.optionPie.series[0].data[2] = {
                            value: this.serveNum,
                            name: '业务招待费'
                        };
                    }
                    if (item.type == '3') {
                        this.outsourceNum += item.invoicePrice;
                        this.optionPie.legend.data[3] = '外协';
                        this.optionPie.series[0].data[3] = {
                            value: this.outsourceNum,
                            name: '外协'
                        };
                    }
                    if (item.type == '4') {
                        this.deviceNum += item.invoicePrice;
                        this.optionPie.legend.data[4] = '设备采购';
                        this.optionPie.series[0].data[4] = {
                            value: this.deviceNum,
                            name: '设备采购'
                        };
                    }
                    if (item.type == '5') {
                        this.workNum += item.invoicePrice;
                        this.optionPie.legend.data[5] = '办公费';
                        this.optionPie.series[0].data[5] = {
                            value: this.workNum,
                            name: '办公费'
                        };
                    }
                    if (item.type == '6') {
                        this.trafficNum += item.invoicePrice;
                        this.optionPie.legend.data[6] = '市内交通';
                        this.optionPie.series[0].data[6] = {
                            value: this.trafficNum,
                            name: '市内交通'
                        };
                    }
                    if (item.type == '7') {
                        this.meetingNum += item.invoicePrice;
                        this.optionPie.legend.data[7] = '会议费';
                        this.optionPie.series[0].data[7] = {
                            value: this.meetingNum,
                            name: '会议费'
                        };
                    }
                });
                this.drawPie();
            });
        },
        // 饼状
        drawPie() {
            let pie = this.$echarts.init(document.getElementById('pie'));
            pie.setOption(this.optionPie, (window.onresize = pie.resize));
            pie.resize();
            window.addEventListener('resize', function() {
                pie.resize();
            });
        },

        // 折线
        getItemPayBack3(query) {
            getItemPay(query).then(res => {
                var beforeData = res.data.data;
                // console.log(res.data.data);
                // var afterData = [];
                // let tempArr = [];
                // for (let i = 0; i < beforeData.length; i++) {
                //     if (tempArr.indexOf(beforeData[i].createTime) === -1) {
                //         afterData.push({
                //             createTime: beforeData[i].createTime,
                //             origin: [beforeData[i]]
                //         });
                //         tempArr.push(beforeData[i].createTime);
                //     } else {
                //         for (let j = 0; j < afterData.length; j++) {
                //             if (afterData[j].createTime == beforeData[i].createTime) {
                //                 afterData[j].origin.push(beforeData[i]);
                //                 break;
                //             }
                //         }
                //     }
                // }
                // console.log(afterData);
                console.log(beforeData)

                // afterData.forEach((item, index) => {
                beforeData.forEach((i, index) => {
                    this.optionLin.xAxis[0].data.push(i.createTime);
                    // this.optionLin.xAxis[0].data=[...new Set(this.optionLin.xAxis[0].data)]
                    if (i.type == '1') {
                        this.optionLin.series[0].data.push(i.invoicePrice);
                    } else {
                        this.optionLin.series[0].data.push(0);
                    }
                    if (i.type == '2') {
                        this.optionLin.series[1].data.push(i.invoicePrice);
                    } else {
                        this.optionLin.series[1].data.push(0);
                    }
                    if (i.type == '3') {
                        this.optionLin.series[2].data.push(i.invoicePrice);
                    } else {
                        this.optionLin.series[2].data.push(0);
                    }
                    if (i.type == '4') {
                        this.optionLin.series[3].data.push(i.invoicePrice);
                    } else {
                        this.optionLin.series[3].data.push(0);
                    }
                    if (i.type == '5') {
                        this.optionLin.series[4].data.push(i.invoicePrice);
                    } else {
                        this.optionLin.series[4].data.push(0);
                    }
                    if (i.type == '6') {
                        this.optionLin.series[5].data.push(i.invoicePrice);
                    } else {
                        this.optionLin.series[5].data.push(0);
                    }
                    if (i.type == '7') {
                        this.optionLin.series[6].data.push(i.invoicePrice);
                    } else {
                        this.optionLin.series[6].data.push(0);
                    }
                });
                this.drawLine();
                // });
                console.log(this.optionLin.series);
            });
        },
        // 折线
        drawLine() {
            let line = this.$echarts.init(document.getElementById('line'));
            line.setOption(this.optionLin, (window.onresize = line.resize));
            line.resize();
            window.addEventListener('resize', function() {
                line.resize();
            });
        }
    }
};
</script>

<style type="text/scss" scoped lang="scss">
.top {
    margin-top: 15px;
    padding-bottom: 15px;
    border-bottom: 5px solid #969696;
}
.echarts {
    margin-top: 30px;
    display: flex;
    justify-content: space-around;
}
.pie {
    width: 600px;
    height: 400px;
}

.bar {
    width: 800px;
    height: 400px;
}

.bot {
    margin-top: 15px;
    .line {
        margin-top: 30px;
        margin-left: 15%;
        width: 1200px;
        height: 400px;
    }
}
</style>
