<template>
    <div>
        <div>
            <span class="tit">流程管理 / 总数 : {{ total }}</span>
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
                prop="deploymentId"
                min-width="120"
                label="流程ID"
            ></el-table-column>
            <el-table-column
                prop="key"
                min-width="120"
                label="流程标识"
            ></el-table-column>
            <el-table-column
                prop="category"
                min-width="120"
                label="流程分类"
            ></el-table-column>
            <el-table-column
                prop="name"
                min-width="120"
                label="流程名称"
            ></el-table-column>
            <el-table-column label="操作" min-width="240" fixed="right">
                <template slot-scope="scope">
                    <el-button
                        type="success"
                        size="mini"
                        @click.native="handleImage(scope.row)">流程图</el-button >
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

        <el-dialog
            title="流程图"
            @click="dialogVisible = true"
            :visible.sync="dialogVisible">
            <el-image :src="processImageUrl"></el-image>
        </el-dialog>
    </div>
</template>
<script>
    import { getProcessPage, delProcess } from "../../api/other/process.js";
    import { mapGetters } from "vuex";
    export default {
        data() {
            return {
                query: {
                    current: 1,
                    size: 10
                },
                listType: '2',
                dialogVisible: false,
                pages: 0,
                total: 0,
                listLoading: false,
                list: [],
                processImageUrl: null,
            };
        },
        created() {
            this.getProcessPage();
        },
        computed: {
            ...mapGetters(["permissions"])
        },
        methods: {
            getProcessPage() {
                this.loading = true;
                getProcessPage(this.query)
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
                this.getProcessPage();
            },
            handleCurrentChange(val) {
                this.query.current = val;
                this.getProcessPage();
            },
            handleImage(row) {
                this.dialogVisible = true;
                //this.processImageUrl = location.host + "/act/process/resource/"+row.deploymentId+"/"+row.processonDefinitionId+"/image"
                this.processImageUrl = "http://oa.dreamdeck.cn/act/process/resource/"+row.deploymentId+"/"+row.processonDefinitionId+"/image"
            },
            // 删除
            handleDel(index, row) {
                if (row.id) {
                    this.$confirm("确认删除 " + row.name + " 吗?", "提示", {
                        type: "warning"
                    }).then(() => {
                        delProcess(row.id).then(res => {
                            console.log(res)
                            this.getModelPage();
                        });
                    });
                }
            },
            openList(val) {
                if (val == 1) {
                    this.$router.push({
                        path: '/other/act'
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
