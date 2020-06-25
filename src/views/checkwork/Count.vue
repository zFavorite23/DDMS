<template>
    <div>
        <div class="">
            <span class="tit">统计</span>
            <el-form :inline="true" :model="query">
                <el-form-item>
                    <el-date-picker
					style="width:160px"
                        v-model="query.selectMonth"
                        :picker-options="expireTimeOption"
                        type="month"
                        value-format="yyyy-MM"
                        format="yyyy 年 MM 月"
                        placeholder="选择月"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item><el-button type="primary" size="medium" v-on:click="getStatistics()" icon="el-icon-search">搜索</el-button></el-form-item>
                <el-form-item><el-button type="primary" size="medium" @click="exportExcel()">导出</el-button></el-form-item>
            </el-form>
        </div>
        <el-table id="out-table" :data="list" border stripe style="width: 100%" :default-sort="{ prop: 'fineNum', order: 'descending' }">
            <el-table-column label="姓名">
                <template slot-scope="scope">
                    <span>{{ scope.row.userName }}</span>
                </template>
            </el-table-column>
            <el-table-column label="正常">
                <template slot-scope="scope">
                    <span>{{ scope.row.normalNum }} 次</span>
                </template>
            </el-table-column>
            <el-table-column label="迟到" prop="lateNum" sortable>
                <template slot-scope="scope">
                    <span v-if="scope.row.lateNum > 0" style="color: red;">{{ scope.row.lateNum }} 次</span>
                    <span v-else>{{ scope.row.lateNum }} 次</span>
                </template>
            </el-table-column>
            <el-table-column label="早退" prop="earlyNum" sortable>
                <template slot-scope="scope">
                    <span v-if="scope.row.earlyNum > 0" style="color: red;">{{ scope.row.earlyNum }} 次</span>
                    <span v-else>{{ scope.row.earlyNum }} 次</span>
                </template>
            </el-table-column>
            <el-table-column label="旷工" prop="absenteeismNum" sortable>
                <template slot-scope="scope">
                    <span v-if="scope.row.absenteeismNum > 0" style="color: red;">{{ scope.row.absenteeismNum }} 次</span>
                    <span v-else>{{ scope.row.absenteeismNum }} 次</span>
                </template>
            </el-table-column>
            <el-table-column label="请假">
                <template slot-scope="scope">
                    <span v-if="scope.row.leaveNum == null">0 小时</span>
                    <span v-else>{{ scope.row.leaveNum }} 小时</span>
                </template>
            </el-table-column>
            <el-table-column label="外出">
                <template slot-scope="scope">
                    <span v-if="scope.row.gooutNum == null">0 小时</span>
                    <span v-else>{{ scope.row.gooutNum }} 小时</span>
                </template>
            </el-table-column>
            <el-table-column label="罚款" prop="fineNum" sortable>
                <template slot-scope="scope">
                    <span>{{ scope.row.fineNum }} 元</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
// 表格导出
import FileSaver from 'file-saver';
import XLSX from 'xlsx';

import { getStatistics } from '../../api/checkwork/clock.js';
import { dateFormat } from '../../utils/date.js';
import { mapGetters } from 'vuex';
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
                        month = '0' + month;
                    }
                    var currentdate = year.toString() + month.toString();
                    var timeyear = time.getFullYear();
                    var timemonth = time.getMonth() + 1;
                    if (timemonth >= 1 && timemonth <= 9) {
                        timemonth = '0' + timemonth;
                    }
                    var timedate = timeyear.toString() + timemonth.toString();
                    return currentdate < timedate;
                }
            },
            list: [],
            listLoading: false
        };
    },
    created() {
        this.getStatistics();
    },
    computed: {
        ...mapGetters(['permissions', 'userId'])
    },
    methods: {
        getStatistics() {
            this.listLoading = true;
            getStatistics(this.query)
                .then(response => {
                    console.log(response);
                    this.listLoading = false;
                    this.total = response.data.data.total;
                    this.list = response.data.data;
                    this.list.forEach(item => {
                        this.$set(item, 'fineNum', item.earlyNum *50 + item.lateNum * 50 + item.absenteeismNum * 100);
                    });
                    // console.log(this.list)
                })
                .catch(() => {
                    this.listLoading = false;
                });
        },
        exportExcel() {
            /* out-table关联导出的dom节点  */
            var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'));
            /* get binary string as output */
            var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
            try {
                FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '考勤统计.xlsx');
            } catch (e) {
                if (typeof console !== 'undefined') console.log(e, wbout);
            }
            return wbout;
        }
    }
};
</script>
