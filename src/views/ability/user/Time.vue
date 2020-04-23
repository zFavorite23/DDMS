<template>
    <div id="divID" style="width: 100%; color: #1f2d3d;">
        <el-form :inline="true" :model="query">
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

        <div id="userBar" class="bar"></div>

    </div>
</template>

<script>
    import { getPieChartCainClassify, getPieChartItem } from "../../../api/apply/manhour.js";
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
                optionBar: {
                    title: [{
                        text: '时间分配',
                        left: '25%',
                        top: '10%',
                        textAlign: 'center'
                    },{
                        text: '项目时间分配图',
                        left: '75%',
                        top: '10%',
                        textAlign: 'center'
                    }],
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: [
                        {
                            orient: 'vertical',
                            left: '0%',
                            top: '10%',
                            data: []
                        },
                        {
                            orient: 'vertical',
                            left: '50%',
                            top: '10%',
                            data: []
                        }
                    ],
                    toolbox: {
                        show: true,
                        feature: {
                            mark: {show: true},
                            dataView: {show: true, readOnly: false},
                            magicType: {
                                show: true,
                                type: ['pie', 'funnel']
                            },
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    series: [
                        {
                            name: '时间分配',
                            type: 'pie',
                            radius: [20, 110],
                            center: ['25%', '50%'],
                            roseType: 'radius',
                            data: [
                                // {value: 10, name: 'rose1'},
                                // {value: 5, name: 'rose2'},
                                // {value: 15, name: 'rose3'},
                                // {value: 25, name: 'rose4'},
                                // {value: 20, name: 'rose5'},
                                // {value: 35, name: 'rose6'},
                                // {value: 30, name: 'rose7'},
                                // {value: 40, name: 'rose8'}
                            ]
                        },
                        {
                            name: '项目时间分配图',
                            type: 'pie',
                            radius: [30, 110],
                            center: ['75%', '50%'],
                            roseType: 'area',
                            data: [
                                // {value: 10, name: 'rose1'},
                                // {value: 5, name: 'rose2'},
                                // {value: 15, name: 'rose3'},
                                // {value: 25, name: 'rose4'},
                                // {value: 20, name: 'rose5'},
                                // {value: 35, name: 'rose6'},
                                // {value: 30, name: 'rose7'},
                                // {value: 40, name: 'rose8'}
                            ]
                        }
                    ]
                }
            };
        },
        computed: {
            ...mapGetters(["permissions"])
        },
        created() {
            this.getPieChart();
            this.$nextTick(function() {
                this.drawBar();
            });
        },
        mounted() {},
        methods: {
            getPieChart() {
                this.listLoading = true;
                getPieChartCainClassify(this.query)
                    .then(response => {
                        this.listLoading = false;
                        this.list = response.data.data;
                        this.list.forEach((item, index) => {
                            this.optionBar.legend[0].data.push(
                                item.name
                            );
                            this.optionBar.series[0].data.push({
                                value: item.useHour,
                                name: item.name
                            });
                        });
                        getPieChartItem(this.query)
                            .then(response => {
                                this.listLoading = false;
                                this.list = response.data.data;
                                this.list.forEach((item, index) => {
                                    this.optionBar.legend[1].data.push(
                                        item.name
                                    );
                                    this.optionBar.series[1].data.push({
                                        value: item.useHour,
                                        name: item.name
                                    });
                                });
                                this.drawBar();
                            });
                    });

            },

            drawBar() {
                let bar = this.$echarts.init(document.getElementById("userBar"));

                bar.setOption(this.optionBar, (window.onresize = bar.resize));
                bar.resize();
                window.addEventListener("resize", function() {
                    bar.resize();
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
