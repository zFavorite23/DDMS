<template>
    <div>
        <div>
            <span class="tit">模型管理 / 总数 : {{ total }}</span>
            <el-form :inline="true" :model="query">
                <el-form-item>
                    <el-input
                        clearable
                        v-model="query.username"
                        placeholder="关键字"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        size="medium"
                        v-on:click="getModelPage()"
                        icon="el-icon-search"
                        >搜索</el-button
                    >
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        size="medium"
                        @click="handleModal()"
                        >新增</el-button
                    >
                </el-form-item>
            </el-form>
            <el-radio-group v-model="listType" style="float: right;" @change="openList">
                <el-radio-button label="1">模型管理</el-radio-button>
                <el-radio-button label="2">流程管理</el-radio-button>
            </el-radio-group>
        </div>
        <el-table
            :data="list"
            stripe
            border
            v-loading="listLoading"
            style="width: 100%;"
        >
            <el-table-column
                prop="id"
                min-width="120"
                label="模型ID"
            ></el-table-column>
            <el-table-column
                prop="key"
                min-width="120"
                label="模型标识"
            ></el-table-column>
            <el-table-column
                prop="category"
                min-width="120"
                label="流程分类"
            ></el-table-column>
            <el-table-column
                prop="name"
                min-width="120"
                label="模型名称"
            ></el-table-column>
            <el-table-column
                prop="version"
                min-width="120"
                label="版本号"
            ></el-table-column>
            <el-table-column
                prop="createTime"
                min-width="180"
                label="创建时间"
            ></el-table-column>
            <el-table-column label="操作" min-width="240" fixed="right">
                <template slot-scope="scope">
                    <el-button
                        type="success"
                        size="mini"
                        @click.native="handleModalDesign(scope.row)">模型图</el-button >
                    <el-button
                        type="primary"
                        size="mini"
                        @click.native="handleModalDeploy(scope.row)">部署</el-button >
                    <el-button
                        size="mini"
                        type="danger"
                        @click.native="handleDel(scope.$index, scope.row)">删除</el-button>
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
        >
            <el-form
                label-width="120px"
                :model="formData"
                :rules="rules"
                ref="formData"
            >
                <el-form-item label="模型标识" prop="key">
                    <el-input
                        type="text"
                        placeholder="请输入模型标识"
                        v-model="formData.key"
                        auto-complete="off"
                        maxlength="20"
                        show-word-limit
                    ></el-input>
                </el-form-item>
                <el-form-item label="流程分类" prop="category">
                    <el-input
                        type="text"
                        placeholder="请输入流程分类"
                        v-model="formData.category"
                        auto-complete="off"
                        maxlength="20"
                        show-word-limit
                    ></el-input>
                </el-form-item>
                <el-form-item label="模型名称" prop="name">
                    <el-input
                        type="text"
                        placeholder="请输入模型名称"
                        v-model="formData.name"
                        auto-complete="off"
                        maxlength="20"
                        show-word-limit
                    ></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="desc">
                    <el-input
                        type="text"
                        placeholder="请输入描述"
                        v-model="formData.desc"
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
import { getModelPage, insertModel, deployModel, delModel } from "../../api/other/act.js";
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            query: {
                current: 1,
                size: 10
            },
            listType: '1',
            pages: 0,
            total: 0,
            dialogTitle: "",
            listLoading: false,
            dialogVisible: false,
            saving: false,
            list: [],
            formData: {
                newData: true,
                name: "",
                key: "",
                category: "",
                desc: ""
            },
            rules: {
                key: [{ required: true, message: "请输入模型标识" }],
                category: [{ required: true, message: "请输入流程分类" }],
                name: [{ required: true, message: "请输入模型名称" }],
                desc: [{ required: true, message: "请输入描述" }]
            }
        };
    },
    created() {
        this.getModelPage();
    },
    computed: {
        ...mapGetters(["permissions"])
    },
    methods: {
        getModelPage() {
            this.loading = true;
            getModelPage(this.query)
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
        handleSizeChange(val) {
            this.query.size = val;
            this.getModelPage();
        },
        handleCurrentChange(val) {
            this.query.current = val;
            this.getModelPage();
        },
        handleModal(data) {
            if (data) {
                this.dialogTitle = "编辑模型 - " + data.name;
                this.formData.newData = false;
                this.formData.key = data.key;
                this.formData.category = data.category;
                this.formData.name = data.name;
                this.formData.desc = data.desc;
            } else {
                this.dialogTitle = "添加模型";
                this.formData.newData = true;
                this.formData.key = "";
                this.formData.category = "";
                this.formData.name = "";
                this.formData.desc = "";
            }
            this.dialogVisible = true;
        },
        handleSubmit() {
            this.$refs["formData"].validate(valid => {
                if (valid) {
                    this.saving = true;
                    if (!this.formData.newData) {
                        console.log(this.formData);
                        // putObj(this.formData)
                        //     .then(res => {
                        //         if (res.data.data) {
                        //             this.dialogVisible = false;
                        //             this.getJobList();
                        //         }
                        //     })
                        //     .finally(() => {
                        //         this.saving = false;
                        //     });
                    } else {
                        insertModel(this.formData)
                            .then(res => {
                                if (res.data.data) {
                                    this.dialogVisible = false;
                                    this.getModelPage();
                                }
                            })
                            .finally(() => {
                                this.saving = false;
                            });
                    }
                }
            });
        },
        handleModalDesign(data) {
            console.log(data)
            this.$router.push({
                path: "/other/act_design/" + data.id
            });
        },
        handleModalDeploy(row){
            if (row.id) {
                this.$confirm("确认部署 " + row.name + " 吗?", "提示", {
                    type: "warning"
                }).then(() => {
                    deployModel(row.id).then(res => {
                        console.log(res)
                        this.getModelPage();
                    });
                });
            }
        },
        // 删除
        handleDel(index, row) {
            if (row.id) {
                this.$confirm("确认删除 " + row.name + " 吗?", "提示", {
                    type: "warning"
                }).then(() => {
                    delModel(row.id).then(res => {
                        console.log(res)
                        this.getModelPage();
                    });
                });
            }
        },
        openList(val) {
            if (val == 2) {
                this.$router.push({
                    path: '/other/process'
                });
            }
        },
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
