<template>
    <div>
        <div>
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
                        v-on:click="getFinanceUser()"
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
                <el-table-column width="50" label="序号">
                    <template scope="scope"
                        ><span
                            >{{
                                scope.$index +
                                    (query.current - 1) * query.size +
                                    1
                            }}
                        </span></template
                    >
                </el-table-column>
                <el-table-column
                    prop="userName"
                    min-width="100"
                    label="姓名"
                ></el-table-column>
                <el-table-column min-width="100" label="补助金额">
                    <template scope="scope">
                        <span>{{ scope.row.subsidyPriceYuan }} 元</span>
                    </template>
                </el-table-column>
                <el-table-column min-width="100" label="发票金额">
                    <template scope="scope">
                        <span>{{ scope.row.invoicePriceYuan }} 元</span>
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
import { getFinanceUser } from "../../../api/apply/invoice.js";
import { dateFormat } from "../../../utils/date.js";
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            query: {
                startDay: dateFormat(new Date()).substr(0, 7) + "-01",
                endDay: dateFormat(new Date()),
                userId: "",
                current: 1,
                size: 10
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
            pages: 0,
            total: 0,
            listLoading: false,
            list: [],
            number: ""
        };
    },
    created() {
        this.getFinanceUser();
        this.query.userId = this.userId;
    },
    computed: {
        ...mapGetters(["permissions", "userId"])
    },
    methods: {
        open() {},
        getFinanceUser() {
            this.listLoading = true;
            getFinanceUser(this.query)
                .then(response => {
                    this.listLoading = false;
                    this.total = response.data.data.total;
                    this.query.current = response.data.data.current;
                    this.query.size = response.data.data.size;
                    this.list = response.data.data.records;
                })
                .catch(() => {
                    this.listLoading = false;
                });
        },
        // 单独处理时间的函数
        dealDisabledDate(time) {
            return time.getTime() >= Date.now();
        },
        handleSizeChange(val) {
            this.query.size = val;
            this.getFinanceUser();
        },
        handleCurrentChange(val) {
            this.query.current = val;
            this.getFinanceUser();
        }
    },
    mounted() {}
};
</script>
<style type="text/scss" lang="scss"></style>
