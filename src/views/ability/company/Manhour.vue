<template>
    <div id="divID" style="width: 100%; color: #1f2d3d;">
        <el-form :inline="true" :model="query" style="width: 100%;">
            <el-form-item label="开始日期：">
                <el-date-picker
                    v-model="query.startDay"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item label="结束日期：">
                <el-date-picker
                    v-model="query.endDay"
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

        <div id="manhourBar1" class="bar1"></div>
        <div id="manhourBar2" class="bar2"></div>

    </div>
</template>

<script>
    import { getBarRefuse, getBarApproverids } from "../../../api/apply/manhour.js";
    import { dateFormat } from "../../../utils/date.js";
    import { mapGetters } from "vuex";
    export default {
        data() {
            return {
                query: {
                    startDay: dateFormat(new Date()).substr(0, 7) + "-01",
                    endDay: dateFormat(new Date()),
                    sortType: "1"
                },
                listLoading: false,
                list: [],
                optionBar1: {
                    title: {
                        text: '工时填报被拒次数统计图',
                        y: "bottom",
                        left: "center"
                    },
                    tooltip: {
                        trigger: 'axis'
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
                    color: ['#6495ED'],
                    series: [
                        {
                            name: '被拒次数',
                            type: 'bar',
                            barWidth: '60%',
                            data: []
                        }
                    ]
                },
                optionBar2: {
                    title: {
                        text: '工时填报有/无人验收统计图',
                        y: "bottom",
                        left: "center"
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        y: "top",
                        data: ['无人验收', '有人验收']
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
                            name: "无人验收",
                            type: "bar",
                            color: "#778899",
                            stack: "1",
                            data: []
                        },
                        {
                            name: "有人验收",
                            type: "bar",
                            color: "#32CD32",
                            stack: "1",
                            data: []
                        }
                    ]
                }
            };
        },
        computed: {
            ...mapGetters(["permissions"])
        },
        created() {
            this.getBarRefuse();
            this.$nextTick(function() {
                this.drawBar();
            });
        },
        mounted() {},
        methods: {
            getBarRefuse(){
                this.listLoading = true;
                getBarRefuse(this.query)
                    .then(response => {
                        this.listLoading = false;
                        this.list = response.data.data;
                        this.list.forEach((item, index) => {
                            //console.log(item)
                            this.optionBar1.xAxis[0].data.push(item.name);
                            this.optionBar1.series[0].data.push(item.totalNum);
                        });

                        this.getBarApproverids();
                    })
            },
            getBarApproverids() {
                this.listLoading = true;
                getBarApproverids(this.query)
                    .then(response => {
                        this.listLoading = false;
                        this.list = response.data.data;
                        this.list.forEach((item, index) => {
                            //console.log(item)
                            this.optionBar2.xAxis[0].data.push(item.name);
                            this.optionBar2.series[0].data.push(item.noHour);
                            this.optionBar2.series[1].data.push(item.yesHour);
                        });

                        this.drawBar();
                    })
            },
            drawBar() {
                let bar1 = this.$echarts.init(document.getElementById("manhourBar1"));
                let bar2 = this.$echarts.init(document.getElementById("manhourBar2"));

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
