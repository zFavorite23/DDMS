<template>
    <div>
        <div>
            <span class="tit">模板消息 / 总数 : {{ total }}</span>
            <el-form :inline="true" :model="query">
                <el-form-item>
                    <el-select
                        clearable
                        v-model="query.appid"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="item in accountOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        size="medium"
                        @click="syncTemplate()"
                        v-if="wx_fans_btn_add"
                        >同步</el-button
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
                <template scope="scope"
                    ><span
                        >{{
                            scope.$index + (query.current - 1) * query.size + 1
                        }}
                    </span></template
                >
            </el-table-column>
            <el-table-column
                prop="templateId"
                min-width="120"
                label="模板ID"
                :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
                prop="title"
                min-width="120"
                label="模板标题"
                :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
                prop="primaryIndustry"
                min-width="120"
                label="一级行业"
                :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
                prop="deputyIndustry"
                min-width="120"
                label="二级行业"
                :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
                prop="content"
                min-width="200"
                label="模板内容"
                :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
                prop="example"
                min-width="200"
                label="模板示例"
                :show-overflow-tooltip="true"
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
    </div>
</template>
<script>
import { getPageList, syncTemplate } from "../../api/weixin/template.js";
import { getAccountList } from "../../api/weixin/account.js";
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            query: {
                appid: null,
                current: 1,
                size: 10
            },
            pages: 0,
            total: 0,
            defaultImg: "",
            dialogTitle: "",
            listLoading: false,
            dialogVisible: false,
            saving: false,
            list: [],
            wx_fans_btn_add: false,
            wx_fans_btn_edit: false,
            wx_fans_btn_del: false,
            accountOptions: []
        };
    },
    created() {
        this.getAccountList();
        this.getPageList();
        this.wx_fans_btn_add = this.permissions["wx_fans_add"];
        this.wx_fans_btn_edit = this.permissions["wx_fans_edit"];
        this.wx_fans_btn_del = this.permissions["wx_fans_del"];
    },
    computed: {
        ...mapGetters(["permissions"])
    },
    methods: {
        getAccountList() {
            getAccountList().then(response => {
                response.data.data.forEach(element => {
                    this.accountOptions.push({
                        value: element.appid,
                        label: element.name
                    });
                });
            });
        },
        getPageList() {
            this.loading = true;
            getPageList(this.query)
                .then(response => {
                    this.loading = false;
                    //console.log(response.data.data)
                    this.total = response.data.data.total;
                    this.query.current = response.data.data.current;
                    this.query.size = response.data.data.size;
                    this.list = response.data.data.records;
                })
                .catch(() => {
                    this.loading = false;
                });
        },
        // 单独处理时间的函数
        dealDisabledDate(time) {
            return time.getTime() >= Date.now();
        },
        handleSizeChange(val) {
            this.query.size = val;
            this.getPageList();
        },
        handleCurrentChange(val) {
            this.query.current = val;
            this.getPageList();
        },
        formatSex: function(row) {
            return row.sex == 0 ? "男" : row.sex == 1 ? "女" : "未知";
        },
        selsChange: function(sels) {
            this.sels = sels;
        },

        syncTemplate() {
            if (!this.query.appid) {
                this.$message.error("请选择账号");
                return false;
            }
            this.$confirm("确认 同步 吗?", "提示", {
                type: "warning"
            }).then(() => {
                syncTemplate(this.query.appid).then(res => {
                    if (res.data.data) {
                        this.getPageList();
                    }
                });
            });
        }
    },
    mounted() {}
};
</script>
<style type="text/scss" lang="scss" scoped>
.el-input .el-input__count .el-input__count-inner {
    height: 50%;
}
@media (min-width: 600px) {
    .zzz {
        display: none;
    }
}
.el-image img {
    border-radius: 50%;
}
</style>
s
