<template>
    <div id="divID" style="width: 100%; color: #1f2d3d;">
        <el-form :inline="true" :model="query" style="width: 100%;">
            <el-form-item>
                <el-date-picker
                    v-model="query.selectMonth"
                    :picker-options="expireTimeOption"
                    type="month"
                    value-format="yyyy-MM"
                    format="yyyy 年 MM 月"
                    placeholder="选择月"
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

        <div id="userBar1" class="bar1"></div>
        <div id="userBar2" class="bar2"></div>

    </div>
</template>

<script>
    import { getStatisticsAbnormal } from "../../../api/checkwork/clock.js";
    import { getDecline } from "../../../api/checkwork/hour.js";
    import { dateFormat } from "../../../utils/date.js";
    import { mapGetters } from "vuex";
    export default {
        data() {
            return {
                query: {
                    selectMonth: dateFormat(new Date()).substr(0, 7)
                },
                expireTimeOption: {
                    disabledDate: time => {
                        var date = new Date();
                        var year = date.getFullYear();
                        var month = date.getMonth() + 1;
                        if (month >= 1 && month <= 9) {
                            month = "0" + month;
                        }
                        var currentdate = year.toString() + month.toString();
                        var timeyear = time.getFullYear();
                        var timemonth = time.getMonth() + 1;
                        if (timemonth >= 1 && timemonth <= 9) {
                            timemonth = "0" + timemonth;
                        }
                        var timedate = timeyear.toString() + timemonth.toString();
                        return currentdate < timedate;
                    }
                },
                listLoading: false,
                list: [],
                optionBar1: {
                    title: {
                        text: '迟到早退统计图',
                        y: "bottom",
                        left: "center"
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        y: "top",
                        data: ['旷工', '迟到', '早退']
                    },
                    xAxis: [
                        {
                            type: "category",
                            data: []
                        }
                    ],
                    yAxis: [
                        {
                            type: "value"
                        }
                    ],
                    series: [
                        {
                            name: "旷工",
                            type: "bar",
                            data: []
                        },
                        {
                            name: "迟到",
                            type: "bar",
                            stack: "1",
                            data: [],
                        },
                        {
                            name: "早退",
                            type: "bar",
                            stack: "1",
                            data: []
                        },

                    ]
                },
                optionBar2: {
                    title: {
                        text: '工时率下降统计图',
                        y: "bottom",
                        left: "center"
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: []
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['第一周', '第二周', '第三周', '第四周', '第五周', '第六周', '第七周']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        // {
                        //     name: '第一周',
                        //     type: 'line',
                        //     stack: '工时',
                        //     data: []
                        // }
                    ]
                }
            };
        },
        computed: {
            ...mapGetters(["permissions"])
        },
        created() {
            this.getStatisticsAbnormal();
            this.$nextTick(function() {
                this.drawBar();
            });
        },
        mounted() {},
        methods: {

            getStatisticsAbnormal() {
                getStatisticsAbnormal(this.query)
                    .then(response => {

                        this.list = response.data.data;
                        this.list.forEach((item, index) => {
                            this.optionBar1.xAxis[0].data.push(item.userName);
                            this.optionBar1.series[0].data.push(item.absenteeismNum);
                            this.optionBar1.series[1].data.push(item.lateNum);
                            this.optionBar1.series[2].data.push(item.leaveEarlyNum);

                        });
                        this.getDecline();
                    })
            },
            getDecline(){
                getDecline(this.query)
                    .then(response => {
                        this.list = response.data.data;
                        this.list.forEach((item, index) => {
                            this.optionBar2.legend.data.push(item.userName);
                            // this.optionBar1.series[0].data.push(item.absenteeismNum);
                            this.optionBar2.series.push(
                                {
                                    name: item.userName,
                                    type: 'line',
                                    stack: index,
                                    data: item.minList
                                }
                            );

                            // this.optionBar1.series[2].data.push(item.leaveEarlyNum);
                            console.log(item)
                        });
                        this.drawBar();
                    })
            },
            drawBar() {
                let bar1 = this.$echarts.init(document.getElementById("userBar1"));
                let bar2 = this.$echarts.init(document.getElementById("userBar2"));

                bar1.setOption(this.optionBar1, (window.onresize = bar1.resize));
                bar2.setOption(this.optionBar2, (window.onresize = bar2.resize));
                bar1.resize();
                bar2.resize();
                window.addEventListener("resize", function() {
                    bar1.resize();
                    bar2.resize();
                });
            }
        }
    };
</script>

<style type="text/scss" scoped lang="scss">
    .bar1 {
        margin-top: 0px;
        width: 50%;
        height: 400px;
        float: left;
    }
    .bar2 {
        margin-top: 0px;
        width: 50%;
        height: 400px;
        float: left;
    }
</style>
