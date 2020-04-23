<template>
    <div>
        <div>
            <el-form :inline="true" :model="query">
                <el-form-item>
                    <el-select v-model="query.userId" placeholder="请选择">
                        <el-option
                            v-for="item in userOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            :disabled="item.disabled"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
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
                        v-on:click="getClockList()"
                        icon="el-icon-search"
                        >搜索</el-button
                    >
                </el-form-item>
            </el-form>
        </div>

        <el-row>
            <el-table
                :data="list"
                stripe
                border
                v-loading="listLoading"
                style="width: 100%;"
            >
                <el-table-column
                    prop="userName"
                    min-width="100"
                    label="姓名"
                ></el-table-column>
                <el-table-column
                    prop="day"
                    min-width="100"
                    label="日期"
                ></el-table-column>
                <el-table-column
                    min-width="80"
                    label="考勤工时"
                >
                    <template slot-scope="scope">
                        <span>{{scope.row.hour}} 小时</span>
                    </template>
                </el-table-column>
                <el-table-column
                    min-width="80"
                    label="填报工时"
                >
                    <template slot-scope="scope">
                        <span>{{scope.row.useHour}} 小时</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="upTime"
                    min-width="80"
                    label="上班时间"
                ></el-table-column>
                <el-table-column
                    prop="downTime"
                    min-width="80"
                    label="下班时间"
                ></el-table-column>
                <el-table-column label="操作" min-width="80">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            @click.native="handUpdate(scope.row)"
                        >更新</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                class="right"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="query.current"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="query.size"
                layout="total, sizes, prev, pager, next"
                :total="total"
            >
            </el-pagination>
        </el-row>
    </div>
</template>
<script>
import { getPageList, loadClockDay } from "../../../api/checkwork/hour.js";
import { getUserList } from "../../../api/admin/user.js";
import { dateFormat } from "../../../utils/date.js";
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            query: {
                selectMonth: dateFormat(new Date()).substr(0, 7),
                userId: "",
                current: 1,
                size: 10
            },
            userOptions: [],
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
            pages: 0,
            total: 0,
            listLoading: false,
            list: [],
            number: "",
            checkTotal: [
                {
                    count: "1",
                    normal: "1",
                    late: "1",
                    early: "1",
                    no: "1",
                    over: "1",
                    business: "1",
                    leave: "1",
                    out: "1"
                }
            ],
            userStatisticsInfo: {
                userName: ""
            }
        };
    },
    created() {
        this.getUserList();
        this.getClockList();
        this.query.userId = this.userId;
    },
    computed: {
        ...mapGetters(["permissions", "userId"])
    },
    methods: {
        open() {},
        getClockList() {
            this.listLoading = true;
            getPageList(this.query)
                .then(response => {
                    this.listLoading = false;
                    this.total = response.data.data.total;
                    this.query.current = response.data.data.current;
                    this.query.size = response.data.data.size;
                    this.list = response.data.data.records;
                    console.log(this.list)
                })
                .catch(() => {
                    this.listLoading = false;
                });
        },
        getUserList() {
            getUserList().then(response => {
                response.data.data.forEach(element => {
                    //console.log(element)
                    this.userOptions.push({
                        value: element.userId,
                        label: element.username
                    });
                });
            });
        },
        handUpdate(row) {
            loadClockDay(row.userId, row.day).then(response => {
                this.getClockList();
            });
        },
        formatType: function(row) {
            return row.type == 1 ? "上班" : row.type == 2 ? "下班" : "未知";
        },
        // 单独处理时间的函数
        dealDisabledDate(time) {
            return time.getTime() >= Date.now();
        },
        handleSizeChange(val) {
            this.query.size = val;
            this.getClockList();
        },
        handleCurrentChange(val) {
            this.query.current = val;
            this.getClockList();
        }
    },
    mounted() {}
};
</script>
<style type="text/scss" lang="scss"></style>
