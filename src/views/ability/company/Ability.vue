<template>
    <div id="divID" style="width: 100%; color: #1f2d3d;">
        <div id="companyBomb" class="companyBomb"></div>

    </div>
</template>

<script>
    import { getBombDropStatistics } from "../../../api/ability/bomb.js";
    import { dateFormat } from "../../../utils/date.js";
    import { mapGetters } from "vuex";
    export default {
        data() {
            return {
                query: {

                },
                list: [],
                optionBar: {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ['领导力', '通用能力', '价值观', '业务能力']
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
                    yAxis: {
                        type: 'category',
                        data: []
                    },
                    series: [
                        {
                            name: '领导力',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                show: true,
                                position: 'insideRight'
                            },
                            data: []
                        },
                        {
                            name: '通用能力',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                show: true,
                                position: 'insideRight'
                            },
                            data: []
                        },
                        {
                            name: '价值观',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                show: true,
                                position: 'insideRight'
                            },
                            data: []
                        },
                        {
                            name: '业务能力',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                show: true,
                                position: 'insideRight'
                            },
                            data: []
                        },
                    ]
                }
            };
        },
        computed: {
            ...mapGetters(["permissions"])
        },
        created() {
            this.getBombDropStatistics();
            this.$nextTick(function() {
                this.drawBar();
            });
        },
        mounted() {},
        methods: {
            getBombDropStatistics() {
                getBombDropStatistics(this.query)
                    .then(response => {
                        this.list = response.data.data;
                        this.list.forEach((item, index) => {
                            this.optionBar.yAxis.data.push(item.userName);

                            this.optionBar.series[0].data.push(item.leaderNum);
                            this.optionBar.series[1].data.push(item.currencyNum);
                            this.optionBar.series[2].data.push(item.worthNum);
                            this.optionBar.series[3].data.push(item.businessNum);
                        });
                        this.drawBar();
                    })
            },

            drawBar() {
                let companyBomb = this.$echarts.init(document.getElementById("companyBomb"));

                companyBomb.setOption(this.optionBar, (window.onresize = companyBomb.resize));
                companyBomb.resize();
                window.addEventListener("resize", function() {
                    companyBomb.resize();
                });
            }
        }
    };
</script>

<style type="text/scss" scoped lang="scss">
    .companyBomb {
        margin-top: 0px;
        width: 100%;
        height: 600px;
        float: left;
    }
</style>
