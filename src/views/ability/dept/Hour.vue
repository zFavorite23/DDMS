<template>
    <div id="divID" style="width: 100%; color: #1f2d3d;">
        <el-form :inline="true" :model="query1" v-show="isShow">
            <el-form-item label="开始日期：">
                <el-date-picker v-model="query1.startDay" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item label="结束日期：">
                <el-date-picker v-model="query1.endDay" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item><el-button type="primary" size="medium" v-on:click="getHourRadix()" icon="el-icon-search">搜索</el-button></el-form-item>
        </el-form>

        <el-form :inline="true" :model="query2" v-show="isShow2">
            <el-form-item label="开始日期：">
                <el-date-picker v-model="query2.startDay" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item label="结束日期：">
                <el-date-picker v-model="query2.endDay" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item><el-button type="primary" size="medium" v-on:click="getHourRadix2()" icon="el-icon-search">搜索</el-button></el-form-item>
        </el-form>

        <el-form :inline="true" :model="query3" v-show="isShow3">
            <el-form-item label="开始日期：">
                <el-date-picker v-model="query3.startDay" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item label="结束日期：">
                <el-date-picker v-model="query3.endDay" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item><el-button type="primary" size="medium" v-on:click="getHourRadix3()" icon="el-icon-search">搜索</el-button></el-form-item>
        </el-form>
        <div style="float: right;">
            <el-button type="primary" size="medium" style="padding-top: 0.4rem;" v-on:click="getHourRadix">部门成员排名</el-button>
            <el-button type="primary" size="medium" style="padding-top: 0.4rem;" v-on:click="getHourRadix3">公司部门排名</el-button>
            <el-button type="primary" size="medium" style="padding-top: 0.4rem;" v-on:click="getHourRadix2">公司个人排名</el-button>
            <el-button type="primary" size="medium" style="padding-top: 0.4rem;" v-on:click="getHourRadix4">昨日个人排名</el-button>
        </div>

        <div id="userBar" class="bar" v-show="isShow"></div>
        <div id="userBar2" class="bar" v-show="isShow2"></div>
        <div id="userBar3" class="bar" v-show="isShow3"></div>
        <div id="userBar4" class="bar" v-show="isShow4" style="margin-top: 29px;"></div>
    </div>
</template>

<script>
import { getHourRadixUserBySum,getHourRadixUserYesterday } from '../../../api/checkwork/hour.js';
import { getHourRadixDept } from '../../../api/checkwork/hour.js';
import { dateFormat } from '../../../utils/date.js';
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            query1: {
                startDay: dateFormat(new Date()).substr(0, 7) + '-01',
                endDay: dateFormat(new Date()),
                deptId: null
            },
            query2: {
                startDay: dateFormat(new Date()).substr(0, 7) + '-01',
                endDay: dateFormat(new Date())
            },
            query3: {
                startDay: dateFormat(new Date()).substr(0, 7) + '-01',
                endDay: dateFormat(new Date())
            },
            isShow: false,
            isShow2: false,
            isShow3: false,
            isShow4: false,
            optionBar: {
                title: {
                    text: '部门成员工时排行'
                    //subtext: '纯属虚构'
                },
                toolbox: {
                    show: true,
                    feature: {
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: [],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '总工时',
                        type: 'bar',
                        barWidth: '40%',
                        data: [],
                        markLine: {
                            data: [
                               {
                                   type: 'average',
                                   name: '平均值',
                                   itemStyle: { normal: { color: 'green' } },
                                   label: {
                                       formatter: "平均线"
                               
                                   }
                               }
                            ]
                        },
                        label: {
                            show: true,
                            position: 'top',
                            color: 'black',
                            formatter: function(params) {
                                return params.value;
                            }
                        }
                    }
                ]
            },
            optionBar2: {
                title: {
                    text: '公司个人工时排行'
                    //subtext: '纯属虚构'
                },
                toolbox: {
                    show: true,
                    feature: {
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: [],
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLabel: {
                            //底部文字倾斜
                            interval: 0,
                            rotate: 25
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '总工时',
                        type: 'bar',
                        barWidth: '40%',
                        data: [],
                        markLine: {
                            data: [
                                 {
                                    type: 'average',
                                    name: '平均值',
                                    itemStyle: { normal: { color: 'green' } },
                                    label: {
                                        formatter: "平均线"

                                    },
                                },
                                {
                                    name: '达标线',
                                    itemStyle: { normal: { color: 'red' } },
                                    label: {
                                        formatter: "达标线"

                                    },
                                    yAxis: '',

                                },
                                {
                                    name: '劳模线',
                                    itemStyle: { normal: { color: 'blue' } },
                                    label: {
                                        formatter: "劳模线"

                                    },
                                    yAxis: '',
                                },
                            ]
                        },
                        label: {
                            show: true,
                            position: 'top',
                            color: 'black',
                            formatter: function(params) {
                                return params.value;
                            }
                        }
                    }
                ]
            },
            optionBar3: {
                title: {
                    text: '公司部门工时排行'
                    //subtext: '纯属虚构'
                },
                toolbox: {
                    show: true,
                    feature: {
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: [],
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLabel: {
                            //底部文字倾斜
                            interval: 0,
                            rotate: 25
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '总工时',
                        type: 'bar',
                        barWidth: '40%',
                        data: [],
                        markLine: {
                            data: [
                                {
                                    type: 'average',
                                    name: '平均值',
                                    itemStyle: { normal: { color: 'green' } },
                                    label: {
                                        formatter: "平均线"

                                    }
                                }
                            ]
                        },
                        label: {
                            show: true,
                            position: 'top',
                            color: 'black',
                            formatter: function(params) {
                                return params.value;
                            }
                        }
                    }
                ]
            },

            optionBar4: {
                title: {
                    text: '昨日个人工时排行'
                    //subtext: '纯属虚构'
                },
                toolbox: {
                    show: true,
                    feature: {
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: [],
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLabel: {
                            //底部文字倾斜
                            interval: 0,
                            rotate: 25
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '总工时',
                        type: 'bar',
                        barWidth: '40%',
                        data: [],
                        markLine: {
                            data: [
                                 {
                                    type: 'average',
                                    name: '平均值',
                                    itemStyle: { normal: { color: 'green' } },
                                    label: {
                                        formatter: "平均线"

                                    },
                                },
                                {
                                    name: '达标线',
                                    itemStyle: { normal: { color: 'red' } },
                                    label: {
                                        formatter: "达标线"

                                    },
                                    yAxis: 9,

                                },
                                {
                                    name: '劳模线',
                                    itemStyle: { normal: { color: 'blue' } },
                                    label: {
                                        formatter: "劳模线"

                                    },
                                    yAxis: 11,
                                },
                            ]
                        },
                        label: {
                            show: true,
                            position: 'top',
                            color: 'black',
                            formatter: function(params) {
                                return params.value;
                            }
                        }
                    }
                ]
            },
        };
    },
    computed: {
        ...mapGetters(['permissions', 'deptId'])
    },
    created() {
        this.query1.deptId = this.deptId;
        this.getHourRadix();
    },
    mounted() {},
    methods: {
        getHourRadix() {
            this.isShow = true;
            this.isShow2 = false;
            this.isShow3 = false;
            this.isShow4 = false;
            getHourRadixUserBySum(this.query1).then(response => {
                response.data.data.forEach((item, index) => {
                    //console.log(item);
                    this.optionBar.xAxis[0].data[index] = item.userName;
                    this.optionBar.series[0].data[index] = item.sumNum;
                });
                this.drawBar1();
            });
        },
        getHourRadix2() {
            this.isShow2 = true;
            this.isShow = false;
            this.isShow3 = false;
            this.isShow4 = false;
            getHourRadixUserBySum(this.query2).then(response => {
                var workTotalNum = response.data.data[1].workTotalNum - 1
                this.optionBar2.series[0].markLine.data[1].yAxis = workTotalNum * 9
                this.optionBar2.series[0].markLine.data[2].yAxis = workTotalNum * 11
                response.data.data.forEach((item, index) => {
                    //console.log(item);
                    this.optionBar2.xAxis[0].data[index] = item.userName;
                    this.optionBar2.series[0].data[index] = item.sumNum;
                });
                this.drawBar2();
            });
        },
        getHourRadix3() {
            this.isShow3 = true;
            this.isShow = false;
            this.isShow2 = false;
            this.isShow4 = false;
            getHourRadixDept(this.query3).then(response => {
                response.data.data.forEach((item, index) => {
                    // console.log(item);
                    this.optionBar3.xAxis[0].data[index] = item.deptName;
                    this.optionBar3.series[0].data[index] = item.avgNum;
                });
                this.drawBar3();
            });
        },
        getHourRadix4(){
            this.isShow = false;
            this.isShow2 = false;
            this.isShow3 = false;
            this.isShow4 = true;
            getHourRadixUserYesterday().then(res=>{
                res.data.data.forEach((item, index) => {
                    // console.log(item);
                    this.optionBar4.xAxis[0].data[index] = item.userName;
                    this.optionBar4.series[0].data[index] = item.sumNum;
                });
                this.drawBar4();
            })
        },

        drawBar1() {
            let bar1 = this.$echarts.init(document.getElementById('userBar'));

            bar1.setOption(this.optionBar, (window.onresize = bar1.resize));
            bar1.resize();
            window.addEventListener('resize', function() {
                bar1.resize();
            });
        },
        drawBar2() {
            let bar2 = this.$echarts.init(document.getElementById('userBar2'));

            bar2.setOption(this.optionBar2, (window.onresize = bar2.resize));
            bar2.resize();
            window.addEventListener('resize', function() {
                bar2.resize();
            });
        },
        drawBar3() {
            let bar3 = this.$echarts.init(document.getElementById('userBar3'));

            bar3.setOption(this.optionBar3, (window.onresize = bar3.resize));
            bar3.resize();
            window.addEventListener('resize', function() {
                bar3.resize();
            });
        },
        drawBar4() {
            let bar4 = this.$echarts.init(document.getElementById('userBar4'));

            bar4.setOption(this.optionBar4, (window.onresize = bar4.resize));
            bar4.resize();
            window.addEventListener('resize', function() {
                bar4.resize();
            });
        },
    }
};
</script>

<style type="text/scss" scoped lang="scss">
.bar {
    margin-top: 0px;
    width: 100%;
    height: 600px;
    float: left;
}
</style>
