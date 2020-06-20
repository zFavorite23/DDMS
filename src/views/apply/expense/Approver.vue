<template>
    <div>
        <div class="">
            <span class="tit">我审批的支出申请 / 总数 : {{ total }}</span>
            <el-form :inline="true" :model="query">
                <el-form-item><el-input style="width:120px"v-model="query.likeKeyWords" placeholder="关键字" clearable></el-input></el-form-item>
                <el-form-item>
                    <el-select style="width:120px" clearable v-model="query.status" placeholder="请选择">
                        <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item><el-button type="primary" size="medium" v-on:click="getExpenseApproverPage()" icon="el-icon-search">搜索</el-button></el-form-item>
                <el-form-item>
                    <router-link to="/apply/expense/form"><el-button type="primary" size="medium">添加申请</el-button></router-link>
                </el-form-item>
            </el-form>
            <el-radio-group v-model="listType" style="float: right;" @change="openList">
                <el-radio-button label="1">我申请的</el-radio-button>
                <el-radio-button label="2">我审批的</el-radio-button>
            </el-radio-group>
        </div>
        <el-table :data="list" stripe border v-loading="listLoading" style="width: 100%;" :default-sort="{ prop: 'priceYuan', order: 'descending' }">
            <el-table-column width="50" label="序号">
                <template scope="scope">
                    <span>{{ scope.$index + (query.current - 1) * query.size + 1 }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="name" min-width="120" label="名称" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column min-width="120" label="项目" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <span v-if="scope.row.alias == null || scope.row.alias == ''">与项目无关</span>
                    <span v-else>{{ scope.row.alias }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="applyUserName" min-width="120" label="申请人"></el-table-column>
            <el-table-column min-width="140" label="支出信息" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <p>公司名称：{{ scope.row.companyName }}</p>
                    <p>银行：{{ scope.row.bankName }}</p>
                </template>
            </el-table-column>
            <!--            <el-table-column min-width="80" label="发票类型">-->
            <!--                <template slot-scope="scope">-->
            <!--                    <el-tag v-if="scope.row.invoiceType == 1" type="">专票</el-tag>-->
            <!--                    <el-tag v-else-if="scope.row.invoiceType == 2" type="success">普票</el-tag>-->
            <!--                    <el-tag v-else>未识别</el-tag>-->
            <!--                </template>-->
            <!--            </el-table-column>-->
            <el-table-column min-width="80" label="金额" prop="priceYuan" sortable>
                <template slot-scope="scope">
                    <span>{{ scope.row.priceYuan }} 元</span>
                </template>
            </el-table-column>
            <!--            <el-table-column min-width="80" label="发票张数">-->
            <!--                <template slot-scope="scope">-->
            <!--                    <span>{{scope.row.invoiceNum}} 张</span>-->
            <!--                </template>-->
            <!--            </el-table-column>-->
            <el-table-column prop="detailed" min-width="80" label="用途明细" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="status" min-width="100" label="状态">
                <template slot-scope="scope">
                    <p><el-tag v-if="scope.row.status == 0" type="warning" size="small">审批中</el-tag></p>
                    <p><el-tag v-if="scope.row.status == 1" type="success" size="small">同意</el-tag></p>
                    <p><el-tag v-if="scope.row.status == 2" type="danger" size="small">拒绝</el-tag></p>
                    <p><el-tag v-if="scope.row.purchaseStatus == 0" type="warning" size="small">未支付</el-tag></p>
                    <p><el-tag v-if="scope.row.purchaseStatus == 1" type="warning" size="small">已支付未发货</el-tag></p>
                    <p><el-tag v-if="scope.row.purchaseStatus == 2" type="warning" size="small">已发货</el-tag></p>
                    <p><el-tag v-if="scope.row.purchaseStatus == 3" type="success" size="small">已签收</el-tag></p>
                    <p><el-tag v-if="scope.row.purchaseStatus == 4" type="success" size="small">已支付无需发货</el-tag></p>
                </template>
            </el-table-column>
            <el-table-column label="操作" min-width="110" fixed="right">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click.native="handInfo(scope.row)">查看&审批</el-button>
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
        ></el-pagination>
    </div>
</template>
<script>
import { getExpenseApproverPage } from '../../../api/apply/expense.js';
// import {getUserInfo} from "../../../api/admin/user.js";
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            query: {
                userId: null,
                likeKeyWords: '',
                status: '',
                current: 1,
                size: 10
            },
            statusOptions: [
                {
                    value: '',
                    label: '全部'
                },
                {
                    value: '0',
                    label: '审批中'
                },
                {
                    value: '1',
                    label: '同意'
                },
                {
                    value: '2',
                    label: '拒绝'
                }
            ],
            pages: 0,
            total: 0,
            listLoading: false,
            list: [],
            number: '',
            listType: '2'
        };
    },
    created() {
        window.localStorage.removeItem('editExpenseInfo');
        this.query.status = this.$route.query.status;
        if (!this.query.status) {
            this.query.status = '';
        }
        this.query.userId = this.userId;
        this.getExpenseApproverPage();
    },
    computed: {
        ...mapGetters(['permissions', 'userId'])
    },
    methods: {
        getExpenseApproverPage() {
            this.listLoading = true;
            getExpenseApproverPage(this.query)
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
        handleSizeChange(val) {
            this.query.size = val;
            this.getExpenseApproverPage();
        },
        handleCurrentChange(val) {
            this.query.current = val;
            this.getExpenseApproverPage();
        },
        handInfo(data) {
            console.log(data);
            this.$router.push({
                path: '/apply/expense/info/' + data.expenseId
            });
        },
        openList(val) {
            if (val == 1) {
                this.$router.push({
                    path: '/apply/expense'
                });
            }
        }
    },
    mounted() {}
};
</script>
<style type="text/scss" scope lang="scss"></style>
