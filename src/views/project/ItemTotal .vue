<template>
    <div>
        <div class="top">
            <div class="echarts">
                <div id="Expense" class="Expense"></div>
                <div id="Plan" class="Plan"></div>
                <span class="title">项目进度</span>
            </div>
        </div>
        <div class="bot">
            <div id="Invoice" class="Invoice"></div>
            <div id="Checkwork" class="Checkwork"></div>
        </div>
    </div>
</template>

<script>
import { dateFormat } from '../../utils/date.js';
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            value: 95,
            value1: 5
        };
    },
    computed: {
        ...mapGetters(['permissions'])
    },
    created() {
        this.$nextTick(function() {
            this.drawCheckwork();
            this.drawInvoice();
            this.drawExpense();
            this.drawPlan();
        });
    },
    mounted() {},
    methods: {
        // 工时
        drawCheckwork() {
            let Checkwork = this.$echarts.init(document.getElementById('Checkwork'));
            let optionPie = {
                title: {
                    text: '考勤占比',
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
                    data: ['员工一', '员工二', '员工三', '员工四', '员工五']
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [
                            { value: 335, name: '员工一' },
                            { value: 310, name: '员工二' },
                            { value: 234, name: '员工三' },
                            { value: 135, name: '员工四' },
                            { value: 335, name: '员工五' }
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
            Checkwork.setOption(optionPie, (window.onresize = Checkwork.resize));
        },

        // 报销
        drawInvoice() {
            let Invoice = this.$echarts.init(document.getElementById('Invoice'));
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
            Invoice.setOption(optionPie, (window.onresize = Invoice.resize));
            // pie.setOption(optionPie)
        },

        // 支出
        drawExpense() {
            let Expense = this.$echarts.init(document.getElementById('Expense'));
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
            Expense.setOption(optionPie, (window.onresize = Expense.resize));
            // pie.setOption(optionPie)
        },

        // 进度
        drawPlan() {
            let Plan = this.$echarts.init(document.getElementById('Plan'));

            var data = [
                {
                    name: '项目进度',
                    value: 75
                },
                {
                    name: '回款进度',
                    value: 44
                }
            ];

            var titleArr = [],
                seriesArr = [];
            var colors = [['#389af4', '#dfeaff'], ['#ff8c37', '#ffdcc3']];
            data.forEach(function(item, index) {
                titleArr.push({
                    text: item.name,
                    left: index * 40 + 30 + '%',
                    top: '65%',
                    textAlign: 'center',
                    textStyle: {
                        fontWeight: 'normal',
                        fontSize: '16',
                        color: colors[index][0],
                        textAlign: 'center'
                    }
                });
                seriesArr.push({
                    name: item.name,
                    type: 'pie',
                    clockWise: false,
                    radius: [60, 70],
                    itemStyle: {
                        normal: {
                            color: colors[index][0],
                            shadowColor: colors[index][0],
                            shadowBlur: 0,
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            }
                        }
                    },
                    hoverAnimation: false,
                    center: [index * 40 + 30 + '%', '40%'],
                    data: [
                        {
                            value: item.value,
                            label: {
                                normal: {
                                    formatter: function(params) {
                                        return params.value + '%';
                                    },
                                    position: 'center',
                                    show: true,
                                    textStyle: {
                                        fontSize: '20',
                                        fontWeight: 'bold',
                                        color: colors[index][0]
                                    }
                                }
                            }
                        },
                        {
                            value: 100 - item.value,
                            name: 'invisible',
                            itemStyle: {
                                normal: {
                                    color: colors[index][1]
                                },
                                emphasis: {
                                    color: colors[index][1]
                                }
                            }
                        }
                    ]
                });
            });

            let optionPie = {
                backgroundColor: '#fff',
                title: titleArr,
                series: seriesArr
            };
            Plan.setOption(optionPie, (window.onresize = Plan.resize));
            // pie.setOption(optionPie)
        },

        getHourRadix() {
            console.log(this.query2);
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
    position: relative;
    .title {
        position: absolute;
        color: #000;
        left: 72.5%;
        top: 1%;
        font-size: 18px;
        font-weight: 700;
    }
}
.Expense {
    width: 800px;
    height: 400px;
}
.Plan {
    width: 800px;
    height: 400px;
    padding-left: 20px;
}

.Invoice {
    width: 800px;
    height: 400px;
}

.bot {
    margin-top: 15px;
    display: flex;
    justify-content: space-around;
    .Checkwork {
        width: 800px;
        height: 400px;
    }
}
</style>
