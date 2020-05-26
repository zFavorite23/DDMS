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
                startTime: dateFormat(new Date()).substr(0, 7) + '-01',
                endTime: dateFormat(new Date()),
                itemId: ''
            },
            query2: {
                startTime: dateFormat(new Date()).substr(0, 7) + '-01',
                endTime: dateFormat(new Date()),
                itemId: ''
            },
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
    },
    mounted() {},
    methods: {
        // 折线
        drawLine() {
            let line = this.$echarts.init(document.getElementById('line'));
            let optionLine = {
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
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: '差旅费',
                        type: 'line',
                        stack: '总量',
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: '业务招待费',
                        type: 'line',
                        stack: '总量',
                        data: [220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name: '外协',
                        type: 'line',
                        stack: '总量',
                        data: [150, 232, 201, 154, 190, 330, 410]
                    },
                    {
                        name: '设备采购',
                        type: 'line',
                        stack: '总量',
                        data: [320, 332, 301, 334, 390, 330, 320]
                    },
                    {
                        name: '办公费',
                        type: 'line',
                        stack: '总量',
                        data: [820, 932, 901, 934, 1290, 1330, 1320]
                    },
                    {
                        name: '市内交通',
                        type: 'line',
                        stack: '总量',
                        data: [520, 432, 701, 734, 1090, 1130, 1120]
                    },
                    {
                        name: '会议费',
                        type: 'line',
                        stack: '总量',
                        data: [620, 632, 501, 534, 990, 1030, 1020]
                    }
                ]
            };
            line.setOption(optionLine, (window.onresize = line.resize));
        },

        // 饼状
        drawPie() {
            let pie = this.$echarts.init(document.getElementById('pie'));
            let optionPie = {
                title: {
                    text: '报销分类占比',
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
                    data: ['差旅费', '业务招待费', '外协', '设备采购', '办公费', '市内交通', '会议费']
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [
                            { value: 335, name: '差旅费' },
                            { value: 310, name: '业务招待费' },
                            { value: 234, name: '外协' },
                            { value: 135, name: '设备采购' },
                            { value: 158, name: '办公费' },
                            { value: 735, name: '市内交通' },
                            { value: 535, name: '会议费' }
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            pie.setOption(optionPie, (window.onresize = pie.resize));
            // pie.setOption(optionPie)
        },

        getHourRadix() {
            this.optionBar.yAxis[0].data = [];
            this.optionBar.series[0].data = [];
            this.optionBar.series[1].data = [];
            this.getItemPayBack(this.query1);
        },
        getHourRadix2() {
            this.getItemPayBack(this.query2);
        },

        getItemPayBack(query) {
            getItemPay(query).then(res => {
                console.log(res);
                res.data.data.forEach((item, index) => {
                    this.optionBar.yAxis[0].data[index] = item.createTime;
                    if (item.type === "1") {
                        this.optionBar.series[0].data.push(item.invoicePriceYuan);
                    } else if (item.type === "4") {
                        this.optionBar.series[1].data.push(item.invoicePriceYuan);
                    } else if (item.type === "6") {
                        this.optionBar.series[2].data.push(item.invoicePriceYuan);
                    }
                });
                this.drawBar();
            });
            this.$nextTick(function() {
                this.drawPie();
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
