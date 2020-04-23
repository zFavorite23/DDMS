<template>
    <div>
        <div>
            <span class="tit">员工等级</span>
            <el-form :inline="true" :model="query">
<!--                <el-form-item>-->
<!--                    <el-select v-model="query.userId" placeholder="请选择">-->
<!--                        <el-option-->
<!--                            v-for="item in userOptions"-->
<!--                            :key="item.value"-->
<!--                            :label="item.label"-->
<!--                            :value="item.value"-->
<!--                            :disabled="item.disabled"-->
<!--                        >-->
<!--                        </el-option>-->
<!--                    </el-select>-->
<!--                </el-form-item>-->
                <el-form-item>
                    <el-button
                        type="primary"
                        size="medium"
                        v-on:click="getClockList()"
                        icon="el-icon-search"
                    >搜索</el-button
                    >
                </el-form-item>
                <el-form-item>
                    <router-link to="/ability/grade/form">
                        <el-button type="primary" size="medium"
                        >添加</el-button
                        >
                    </router-link>
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
                    prop="time"
                    min-width="80"
                    label="时间"
                ></el-table-column>
                <el-table-column
                    prop="createTime"
                    min-width="160"
                    label="创建时间"
                ></el-table-column>
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
    import { getPageList } from "../../../api/ability/grade.js";
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
                pages: 0,
                total: 0,
                listLoading: false,
                list: [],
                number: "",
                userStatisticsInfo: {
                    userName: ""
                }
            };
        },
        created() {
            this.query.userId = this.userId;
            this.getGradePage();

        },
        computed: {
            ...mapGetters(["permissions", "userId"])
        },
        methods: {
            getGradePage() {
                this.listLoading = true;
                getPageList(this.query)
                    .then(response => {
                        this.listLoading = false;
                        this.total = response.data.data.total;
                        this.query.current = response.data.data.current;
                        this.query.size = response.data.data.size;
                        this.list = response.data.data.records;
                        console.log(this.list);
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
