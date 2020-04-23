<template>
    <div>
        <div>
            <span class="tit">粉丝管理 / 总数 : {{ total }}</span>
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
                <!--                <el-form-item>-->
                <!--                    <el-button type="primary" size="medium" @click="handleModal()" v-if="wx_fans_btn_add">新增</el-button>-->
                <!--                </el-form-item>-->
                <el-form-item>
                    <el-button
                        type="primary"
                        size="medium"
                        @click="syncFans()"
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
                prop="id"
                min-width="120"
                label="主键"
                :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
                prop="wxAccountName"
                min-width="120"
                label="公众号"
                :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
                prop="nickname"
                min-width="120"
                label="昵称"
                :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
                prop="openid"
                min-width="120"
                label="用户标识"
                :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
                prop="gender"
                min-width="120"
                label="性别"
                :show-overflow-tooltip="true"
            >
                <template slot-scope="scope">
                    <span v-if="scope.row.gender == '1'">男</span>
                    <span v-if="scope.row.gender == '2'">女</span>
                    <span v-if="scope.row.gender == '0'">未知</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="city"
                min-width="120"
                label="城市"
                :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
                prop="subscribeStatus"
                min-width="120"
                label="订阅状态"
                :show-overflow-tooltip="true"
            >
                <template slot-scope="scope">
                    <span v-if="scope.row.subscribeStatus == '0'">未关注</span>
                    <span v-if="scope.row.subscribeStatus == '1'">已关注</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="subscribeTime"
                min-width="120"
                label="订阅时间"
                :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
                scope="headimgUrl"
                min-width="120"
                label="头像地址"
                class="hidden-phone hidden-xs"
            >
                <template slot-scope="scope">
                    <el-image
                        :src="scope.row.headimgUrl"
                        style="width: 3rem;"
                    />
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

        <!--编辑界面-->
        <el-dialog
            :title="dialogTitle"
            @click="dialogVisible = true"
            :visible.sync="dialogVisible"
            :width="'80%'"
        >
            <el-form
                label-width="80px"
                :model="formData"
                :rules="rules"
                ref="formData"
            >
                <el-form-item label="名称" prop="name">
                    <el-input
                        type="text"
                        placeholder="请输入 名称"
                        v-model="formData.name"
                        auto-complete="off"
                        maxlength="10"
                        show-word-limit
                    ></el-input>
                </el-form-item>
                <el-form-item label="微信号" prop="account">
                    <el-input
                        type="text"
                        placeholder="公众号设置->最下边原生ID"
                        v-model="formData.account"
                        auto-complete="off"
                        maxlength="100"
                        show-word-limit
                    ></el-input>
                </el-form-item>
                <el-form-item label="appid" prop="appid">
                    <el-input
                        type="text"
                        placeholder="请输入  appid"
                        v-model="formData.appid"
                        auto-complete="off"
                        maxlength="100"
                        show-word-limit
                    ></el-input>
                </el-form-item>
                <el-form-item label="密钥" prop="appsecret">
                    <el-input
                        type="text"
                        placeholder="请输入 密钥"
                        v-model="formData.appsecret"
                        auto-complete="off"
                        maxlength="100"
                        show-word-limit
                    ></el-input>
                </el-form-item>
                <el-form-item label="协议域名" prop="url">
                    <el-input
                        type="text"
                        placeholder="scheme://domain"
                        v-model="formData.url"
                        auto-complete="off"
                        maxlength="200"
                        show-word-limit
                    ></el-input>
                </el-form-item>
                <el-form-item label="token" prop="token">
                    <el-input
                        type="text"
                        placeholder="请输入 token"
                        v-model="formData.token"
                        auto-complete="off"
                        maxlength="20"
                        show-word-limit
                    ></el-input>
                </el-form-item>
                <el-form-item label="加密密钥" prop="aeskey">
                    <el-input
                        type="text"
                        placeholder="请输入 加密密钥"
                        v-model="formData.aeskey"
                        auto-complete="off"
                        maxlength="20"
                        show-word-limit
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="dialogVisible = false"
                    >取消</el-button
                >
                <el-button
                    type="primary"
                    @click="handleSubmit"
                    :loading="saving"
                    >提交</el-button
                >
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {
    getPageList,
    addFans,
    updateFans,
    deleteFans,
    syncFans
} from "../../api/weixin/fans.js";
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
            formData: {
                newData: true,
                id: null,
                name: "",
                account: "",
                appid: "",
                appsecret: "",
                url: "",
                token: "",
                aeskey: ""
            },
            rules: {
                name: [{ required: true, message: "请输入名称" }],
                account: [{ required: true, message: "请输入账号" }],
                appid: [{ required: true, message: "请输入appid" }],
                appsecret: [{ required: true, message: "请输入密钥" }],
                url: [{ required: true, message: "请输入协议域名" }],
                token: [{ required: true, message: "请输入token" }],
                aeskey: [{ required: true, message: "请输入加密密钥" }]
            },
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
        handleModal(data) {
            if (data) {
                this.dialogTitle = "编辑 - " + data.name;
                this.formData.newData = false;
                this.formData.id = data.id;
                this.formData.name = data.name;
                this.formData.account = data.account;
                this.formData.appid = data.appid;
                this.formData.appsecret = data.appsecret;
                this.formData.url = data.url;
                this.formData.token = data.token;
                this.formData.aeskey = data.aeskey;
            } else {
                this.dialogTitle = "添加";
                this.formData.newData = true;
                this.formData.id = null;
                this.formData.name = "";
                this.formData.account = "";
                this.formData.appid = "";
                this.formData.appsecret = "";
                this.formData.url = "";
                this.formData.token = "";
                this.formData.aeskey = "";
            }
            this.dialogVisible = true;
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
        handleSubmit() {
            this.$refs["formData"].validate(valid => {
                if (valid) {
                    this.saving = true;
                    if (!this.formData.newData) {
                        updateAccount(this.formData)
                            .then(res => {
                                if (res.data.data) {
                                    this.dialogVisible = false;
                                    this.getPageList();
                                }
                            })
                            .finally(() => {
                                this.saving = false;
                            });
                    } else {
                        addAccount(this.formData)
                            .then(res => {
                                if (res.data.data) {
                                    this.dialogVisible = false;
                                    this.getPageList();
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
                this.$confirm("确认删除 " + row.name + " 吗?", "提示", {
                    type: "warning"
                }).then(() => {
                    deleteAccount(row.userId).then(res => {
                        if (res.data.data) {
                            this.getPageList();
                        }
                    });
                });
            }
        },
        syncFans() {
            if (!this.query.appid) {
                this.$message.error("请选择账号");
                return false;
            }
            this.$confirm("确认 同步 吗?", "提示", {
                type: "warning"
            }).then(() => {
                syncFans(this.query.appid).then(res => {
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
