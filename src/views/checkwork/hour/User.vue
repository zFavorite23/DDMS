<template>
    <div id="divID" style="width: 100%; color: #1f2d3d;">
        <el-form :inline="true" :model="query">
            <el-form-item label="开始日期：">
                <el-date-picker v-model="query.startDay" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item label="结束日期：">
                <el-date-picker v-model="query.endDay" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item><el-button type="primary" size="medium" v-on:click="getHourRadix()" icon="el-icon-search">搜索</el-button></el-form-item>
        </el-form>

        <div id="userBar" class="bar"></div>

        <div style="margin-top: 650px; position: relative;">
            <el-button type="primary" size="medium" style="position: absolute;top: -50px;right: 50px;" @click="exportExcel()">导出</el-button>
            <el-row>
                <el-table :data="list" id="out-table" stripe border v-loading="listLoading" style="width: 100%;" :default-sort="{ prop: 'workTotalNum', order: 'ascending' }">
                    <el-table-column prop="userName" min-width="100" label="姓名"></el-table-column>
                    <el-table-column prop="workTotalNum" sortable min-width="100" label="应上班天数"></el-table-column>
                    <el-table-column prop="restTotalNum" sortable min-width="100" label="假期上班天数"></el-table-column>
                    <el-table-column prop="totalNum" sortable min-width="100" label="总上班天数"></el-table-column>
                    <el-table-column prop="integralNum" sortable min-width="100" label="总评分"></el-table-column>
                    <el-table-column prop="avgIntegral" sortable min-width="100" label="平均评分"></el-table-column>
                    <el-table-column prop="sumNum" sortable min-width="100" label="总工时"></el-table-column>
                    <el-table-column prop="avgNum" sortable min-width="100" label="平均工时"></el-table-column>
                    <el-table-column prop="radix" sortable min-width="100" label="基数"></el-table-column>
                </el-table>
            </el-row>
        </div>
    </div>
</template>

<script>
// 表格导出
import FileSaver from 'file-saver';
import XLSX from 'xlsx';
import { getHourRadixUser } from '../../../api/checkwork/hour.js';
import { dateFormat } from '../../../utils/date.js';
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            query: {
                startDay: dateFormat(new Date()).substr(0, 7) + '-01',
                endDay: dateFormat(new Date()),
                sortType: '1'
            },
            listLoading: false,
            list: [],
            optionBar: {
                title: {
                    text: '个人工时系数'
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
                        name: '个人系数',
                        type: 'bar',
                        barWidth: '40%',
                        data: [],
                        markLine: {
                            data: [
                                {
                                    type: 'average',
                                    name: '平均值',
                                    itemStyle: { normal: { color: '#dc143c' } }
                                },
                                {
                                    name: '标线起点',
                                    value: 1.0,
                                    xAxis: 0,
                                    yAxis: 1.0,
                                    itemStyle: { normal: { color: '#dc143c' } }
                                }
                            ]
                        }
                    }
                ]
            }
        };
    },
    computed: {
        ...mapGetters(['permissions'])
    },
    created() {
        //const pageWidth = document.getElementById("divID").offsetWidth;
        //document.getElementById("bar").style =
        this.$nextTick(function() {
            this.getHourRadix();
        });
    },
    mounted() {},
    methods: {
        getHourRadix() {
            this.listLoading = true;
            getHourRadixUser(this.query)
                .then(response => {
                    console.log(response);
                    this.listLoading = false;
                    this.list = response.data.data;
                    this.list.forEach((item, index) => {
                        console.log(item.workTotalNum);
                        this.optionBar.xAxis[0].data[index] = item.userName;
                        this.optionBar.series[0].data[index] = item.radix;
                    });
                    this.drawBar();
                })
                .catch(() => {
                    this.listLoading = false;
                });
        },

        drawBar() {
            let bar = this.$echarts.init(document.getElementById('userBar'));

            bar.setOption(this.optionBar, (window.onresize = bar.resize));
            bar.resize();
            window.addEventListener('resize', function() {
                bar.resize();
            });
        },
        exportExcel() {
            /* out-table关联导出的dom节点  */
            var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'));
            /* get binary string as output */
            var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
            try {
                FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '个人工时统计.xlsx');
            } catch (e) {
                if (typeof console !== 'undefined') console.log(e, wbout);
            }
            return wbout;
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
