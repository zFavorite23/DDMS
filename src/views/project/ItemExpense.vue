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
import { getExpend } from '../../api/project/item.js';
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            query1: {
                startTime: dateFormat(new Date()).substr(0, 7) + '-01',
                endTime: dateFormat(new Date()),
                itemId: null
            },
            query2: {
                startTime: dateFormat(new Date()).substr(0, 7) + '-01',
                endTime: dateFormat(new Date()),
                itemId: null
            },
            //  柱状图
            optionBar: {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data: []
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
                yAxis: [{ type: 'category', data: [] }],
                series: [
                    {
                        name: '',
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
                    text: '支出分类趋势'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: []
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
                        name: '',
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

        this.getItemExpend(this.query1);
        this.getItemExpend2(this.query2);
    },
    mounted() {},
    methods: {
        // 饼状
        drawPie() {
            let pie = this.$echarts.init(document.getElementById('pie'));
            let optionPie = {
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
                    data: ['设备', '售前', '交付', '管理', '外协']
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [
                            { value: 335, name: '设备' },
                            { value: 310, name: '售前' },
                            { value: 234, name: '交付' },
                            { value: 135, name: '管理' },
                            { value: 335, name: '外协' }
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
            this.getItemExpend(this.query1);
        },
        getHourRadix2() {
            this.optionLin.xAxis[0].data = [];
            this.optionLin.series[0].data = [];
            this.getItemExpend2(this.query2);
        },

        // 柱状图
        getItemExpend(query) {
            getExpend(query).then(res => {
                // console.log(res);
                res.data.data.forEach((item, index) => {
                    this.optionBar.yAxis[0].data[index] = item.createTime;
                    this.optionBar.series[0].data[index] = item.invoicePriceYuan;
                    if (item.type == null) {
                        this.optionBar.legend.data[index] = '其它';
                        this.optionBar.series[0].name = '其它';
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
        },

        // 折线图
        getItemExpend2(query) {
            getExpend(query).then(res => {
                // console.log(res);
                res.data.data.forEach((item, index) => {
                    this.optionLin.xAxis[0].data[index] = item.createTime;
                    this.optionLin.series[0].data[index] = item.invoicePriceYuan;
                    if (item.type == null) {
                        this.optionLin.legend.data[index] = '其它';
                        this.optionLin.series[0].name = '其它';
                    }
                });
                this.drawLine();
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
