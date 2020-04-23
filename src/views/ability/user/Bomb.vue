<template>
    <div id="divID" style="width: 100%; color: #1f2d3d;">
        <el-row>
            <el-col :span="14">
                <el-tabs type="border-card">
                    <el-tab-pane label="今日收到">
                        <BombDay/>
                    </el-tab-pane>
                    <el-tab-pane label="累计收到">
                        <BombTotal/>
                    </el-tab-pane>
                </el-tabs>


            </el-col>
            <el-col :span="8" style="margin-left: 3rem;padding: 1rem;">
                <div id="userCircle" class="circle"></div>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import { getBombDropCircleByToUserId } from "../../../api/ability/bomb.js";
    import { dateFormat } from "../../../utils/date.js";
    import { mapGetters } from "vuex";
    import BombDay from "./BombDay";
    import BombTotal from "./BombTotal";
    export default {
        components: {
            BombDay,
            BombTotal
        },
        data() {
            return {
                query: {
                    toUserId: null,
                    selectMonth: dateFormat(new Date()).substr(0, 7),
                    selectDay: dateFormat(new Date()).substr(0, 9),
                },
                optionCircle: {
                    title: {
                        text: '个人能力成长图',
                        y: "bottom",
                        left: "center"
                    },
                    tooltip: {},
                    radar: {
                        name: {
                            textStyle: {
                                color: '#fff',
                                backgroundColor: '#999',
                                borderRadius: 3,
                                padding: [3, 5]
                            }
                        },
                        indicator: [
                            { name: '价值观', max: 10},
                            { name: '业务能力', max: 10},
                            { name: '领导力', max: 10},
                            { name: '通用能力', max: 10},
                            { name: '工时', max: 1.5}
                        ]
                    },
                    series: [{
                        name: '我的能力',
                        type: 'radar',
                        // areaStyle: {normal: {}},
                        data: [
                            {
                                value: [],
                            },
                        ]
                    }]
                }
            }
        },
        computed: {
            ...mapGetters(["permissions", "userId"])
        },
        created() {
            this.query.toUserId = this.userId;
            this.getBombDropCircleByToUserId();
            this.$nextTick(function() {
                this.drawBar();
            });
        },
        mounted() {},
        methods: {
            getBombDropCircleByToUserId() {
                getBombDropCircleByToUserId(this.query)
                    .then(response => {
                        const dateInfo = response.data.data;
                        console.log(dateInfo);
                        this.optionCircle.series[0].data[0].value[0] = dateInfo.worthGrade;
                        this.optionCircle.series[0].data[0].value[1] = dateInfo.businessGrade;
                        this.optionCircle.series[0].data[0].value[2] = dateInfo.leaderGrade;
                        this.optionCircle.series[0].data[0].value[3] = dateInfo.currencyGrade;
                        this.optionCircle.series[0].data[0].value[4] = dateInfo.radix;

                        this.drawBar();
                    })
            },
            drawBar() {
                let circle = this.$echarts.init(document.getElementById("userCircle"));

                circle.setOption(this.optionCircle, (window.onresize = circle.resize));
                circle.resize();
                window.addEventListener("resize", function() {
                    circle.resize();
                });
            }
        }
    }
</script>

<style type="text/scss" scoped lang="scss">
    .circle {
        margin-top: 0px;
        width: 100%;
        height: 400px;
        float: left;
    }
</style>
