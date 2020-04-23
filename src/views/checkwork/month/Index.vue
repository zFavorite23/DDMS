<template>
    <div>
        <div class="">
            <span class="tit">次数管理 / 总数 : {{ total }}</span>
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
                    <el-button
                        type="primary"
                        size="medium"
                        v-on:click="getMonthList()"
                        icon="el-icon-search"
                        >搜索</el-button
                    >
                </el-form-item>
            </el-form>
        </div>
        <el-table
            :data="list"
            stripe
            border
            v-loading="listLoading"
            style="width: 100%;"
        >
            <el-table-column width="50" label="序号">
                <template scope="scope">
                    <span
                        >{{
                            scope.$index + (query.current - 1) * query.size + 1
                        }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                prop="userName"
                min-width="120"
                label="姓名"
            ></el-table-column>
            <el-table-column
                prop="month"
                min-width="120"
                label="月份"
            ></el-table-column>
            <el-table-column min-width="120" label="未打卡次数">
                <template scope="scope">
                    <span>{{ scope.row.clockNum }} 次</span>
                </template>
            </el-table-column>
            <el-table-column min-width="120" label="5分钟迟到次数">
                <template scope="scope">
                    <span>{{ scope.row.lateNum }} 次</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" min-width="160">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        v-if="dd_month_edit"
                        @click.native="handleModal(scope.row)"
                        >编辑</el-button
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
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
            <el-form
                :model="formData"
                :rules="rules"
                ref="formData"
                label-width="120px"
            >
                <el-form-item label="姓名">
                    <el-input
                        type="text"
                        v-model="formData.userName"
                        disabled="disabled"
                        auto-complete="off"
                        maxlength="20"
                        show-word-limit
                    ></el-input>
                </el-form-item>
                <el-form-item label="月份">
                    <el-input
                        type="text"
                        v-model="formData.month"
                        disabled="disabled"
                        auto-complete="off"
                        maxlength="20"
                        show-word-limit
                    ></el-input>
                </el-form-item>
                <el-form-item label="未打卡次数">
                    <el-input
                        type="number"
                        v-model="formData.clockNum"
                    ></el-input>
                </el-form-item>
                <el-form-item label="5分钟迟到次数">
                    <el-input
                        type="number"
                        v-model="formData.lateNum"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button
                    type="primary"
                    @click="handleSubmit"
                    :loading="saving"
                    >提 交</el-button
                >
                <el-button @click="dialogVisible = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { fetchList, putObj } from "../../../api/checkwork/month.js";
import { getUserList } from "../../../api/admin/user.js";
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            query: {
                userId: "",
                current: 1,
                size: 10
            },
            total: 0,
            dialogTitle: "",
            listLoading: false,
            dialogVisible: false,
            saving: false,
            list: [],
            pickerOptions: {
                disabledDate: time => {
                    return this.dealDisabledDate(time);
                }
            },
            formData: {
                numId: null,
                userName: "",
                month: "",
                clockNum: 0,
                lateNum: 0
            },
            dd_month_edit: false,
            rules: {
                name: [{ required: true, message: "请输入名称" }],
                day: [
                    { required: true, message: "请选择日期", trigger: "change" }
                ],
                type: [
                    { required: true, message: "请选择类型", trigger: "change" }
                ]
            },
            userOptions: []
        };
    },
    created() {
        this.getUserList();
        this.getMonthList();
        this.query.userId = this.userId;
        this.dd_month_edit = this.permissions["dd_month_edit"];
    },
    computed: {
        ...mapGetters(["permissions", "userId"])
    },
    methods: {
        getMonthList() {
            this.listLoading = true;
            fetchList(this.query)
                .then(response => {
                    this.loading = false;
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
        handleModal(data) {
            if (data) {
                this.dialogTitle = "编辑假期 - " + data.day;
                this.formData.newData = false;
                this.formData.numId = data.numId;
                this.formData.userName = data.userName;
                this.formData.month = data.month;
                this.formData.clockNum = data.clockNum;
                this.formData.lateNum = data.lateNum;
                this.dialogVisible = true;
            }
        },
        handleSubmit() {
            this.$refs["formData"].validate(valid => {
                if (valid) {
                    this.saving = true;
                    if (!this.formData.newData) {
                        putObj(this.formData)
                            .then(res => {
                                if (res.data.data) {
                                    this.dialogVisible = false;
                                    this.getMonthList();
                                }
                            })
                            .finally(() => {
                                this.saving = false;
                            });
                    }
                }
            });
        },
        // 删除
        handleDel(index, row) {
            if (row.id) {
                this.$confirm("确认删除 " + row.day + " 吗?", "提示", {
                    type: "warning"
                }).then(() => {
                    delObj(row.id).then(res => {
                        if (res.data.data) {
                            this.getMonthList();
                        }
                    });
                });
            }
        },
        // 单独处理时间的函数
        dealDisabledDate(time) {
            return time.getTime() <= Date.now();
        },
        handleSizeChange(val) {
            this.query.size = val;
            this.getMonthList();
        },
        handleCurrentChange(val) {
            this.query.current = val;
            this.getMonthList();
        }
    },
    mounted() {}
};
</script>

<style type="text/scss" lang="scss" scoped>
.el-form {
    width: -webkit-fill-available;
}
</style>
