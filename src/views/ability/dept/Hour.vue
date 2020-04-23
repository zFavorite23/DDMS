<template>
    <div id="divID" style="width: 100%; color: #1f2d3d;">
        <el-form :inline="true" :model="query1" v-show="isShow">
            <el-form-item label="开始日期：">
                <el-date-picker
                    v-model="query1.startDay"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item label="结束日期：">
                <el-date-picker
                    v-model="query1.endDay"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button
                    type="primary"
                    size="medium"
                    v-on:click="getHourRadix()"
                    icon="el-icon-search"
                >搜索</el-button
                >
            </el-form-item>
        </el-form>

        <el-form :inline="true" :model="query2" v-show="isShow2">
            <el-form-item label="开始日期：">
                <el-date-picker
                    v-model="query2.startDay"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item label="结束日期：">
                <el-date-picker
                    v-model="query2.endDay"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button
                    type="primary"
                    size="medium"
                    v-on:click="getHourRadix2()"
                    icon="el-icon-search"
                >搜索</el-button
                >
            </el-form-item>
        </el-form>
        <div style="float: right;">
            <el-button type="primary"size="medium" style="padding-top: 0.4rem;" v-on:click="getHourRadix">部门</el-button>
            <el-button type="primary"size="medium" style="padding-top: 0.4rem;" v-on:click="getHourRadix2">公司</el-button>
        </div>

        <div id="userBar" class="bar" v-show="isShow"></div>
        <div id="userBar2" class="bar" v-show="isShow2"></div>
    </div>
</template>

<script>
    import { getHourRadixUserBySum } from "../../../api/checkwork/hour.js";
    import { dateFormat } from "../../../utils/date.js";
    import { mapGetters } from "vuex";
    export default {
        data() {
            return {
                query1: {
                    startDay: dateFormat(new Date()).substr(0, 7) + "-01",
                    endDay: dateFormat(new Date()),
                    deptId: null

                },
                query2: {
                    startDay: dateFormat(new Date()).substr(0, 7) + "-01",
                    endDay: dateFormat(new Date())
                },
                isShow: false,
                isShow2: false,
                optionBar: {
                    title: {
                        text: "部门工时排行"
                        //subtext: '纯属虚构'
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            restore: { show: true },
                            saveAsImage: { show: true }
                        }
                    },
                    color: ["#3398DB"],
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            // 坐标轴指示器，坐标轴触发有效
                            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: "3%",
                        right: "4%",
                        bottom: "3%",
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: "category",
                            data: [],
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: "value"
                        }
                    ],
                    series: [
                        {
                            name: "总工时",
                            type: "bar",
                            barWidth: "40%",
                            data: [],
                            markLine: {
                                data: [
                                    {
                                        type: "average",
                                        name: "平均值",
                                        itemStyle: { normal: { color: "#dc143c" } }
                                    },
                                    {
                                        name: "标线起点",
                                        value: 1.0,
                                        xAxis: 0,
                                        yAxis: 1.0,
                                        itemStyle: { normal: { color: "#dc143c" } }
                                    }
                                ]
                            },
                            label: {
                                show: true,
                                position: 'top',
                                color: 'black',
                                formatter: function (params){
                                    return params.value
                                }
                            }
                        }
                    ]
                },
                optionBar2: {
                    title: {
                        text: "公司工时排行"
                        //subtext: '纯属虚构'
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            restore: { show: true },
                            saveAsImage: { show: true }
                        }
                    },
                    color: ["#3398DB"],
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            // 坐标轴指示器，坐标轴触发有效
                            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: "3%",
                        right: "4%",
                        bottom: "3%",
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: "category",
                            data: [],
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: "value"
                        }
                    ],
                    series: [
                        {
                            name: "总工时",
                            type: "bar",
                            barWidth: "40%",
                            data: [],
                            markLine: {
                                data: [
                                    {
                                        type: "average",
                                        name: "平均值",
                                        itemStyle: { normal: { color: "#dc143c" } }
                                    },
                                    {
                                        name: "标线起点",
                                        value: 1.0,
                                        xAxis: 0,
                                        yAxis: 1.0,
                                        itemStyle: { normal: { color: "#dc143c" } }
                                    }
                                ]
                            },
                            label: {
                                show: true,
                                position: 'top',
                                color: 'black',
                                formatter: function (params){
                                    return params.value
                                }
                            }
                        }
                    ]
                }
            };
        },
        computed: {
            ...mapGetters(["permissions", "deptId"])
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
                getHourRadixUserBySum(this.query1)
                    .then(response => {
                        response.data.data.forEach((item, index) => {
                            //console.log(item);
                            this.optionBar.xAxis[0].data[index] = item.userName;
                            this.optionBar.series[0].data[index] = item.sumNum;
                        });
                        this.drawBar1();
                    })
            },
            getHourRadix2() {
                this.isShow2 = true;
                this.isShow = false;
                getHourRadixUserBySum(this.query2)
                    .then(response => {
                        response.data.data.forEach((item, index) => {
                            //console.log(item);
                            this.optionBar2.xAxis[0].data[index] = item.userName;
                            this.optionBar2.series[0].data[index] = item.sumNum;
                        });
                        this.drawBar2();
                    })
            },
            drawBar1() {
                let bar1 = this.$echarts.init(document.getElementById("userBar"));

                bar1.setOption(this.optionBar, (window.onresize = bar1.resize));
                bar1.resize();
                window.addEventListener("resize", function() {
                    bar1.resize();
                });
            },
            drawBar2() {
                let bar2 = this.$echarts.init(document.getElementById("userBar2"));

                bar2.setOption(this.optionBar2, (window.onresize = bar2.resize));
                bar2.resize();
                window.addEventListener("resize", function() {
                    bar2.resize();
                });
            }
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
