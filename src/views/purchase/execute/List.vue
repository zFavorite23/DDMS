<template>
    <div>
        <div class="">
            <span class="tit">采购 / 总数 : {{ total }}</span>
            <el-form :inline="true" :model="query">
                <el-form-item>
                    <el-select style="width:120px" :disabled="disabled" v-model="query.userId" filterable placeholder="请选择">
                        <el-option v-for="item in userOptions" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item><el-input style="width:120px" v-model="query.likeKeyWords" placeholder="关键字" clearable></el-input></el-form-item>
                <el-form-item>
                    <el-select style="width:120px" clearable v-model="query.status" placeholder="请选择">
                        <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select style="width:120px" clearable v-model="query.type1" placeholder="总分类">
                        <el-option v-for="item in classifyOptions" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item><el-button type="primary" size="medium" icon="el-icon-search" @click="getPurchasePage">搜索</el-button></el-form-item>
            </el-form>
        </div>

        <el-table :data="list" stripe border v-loading="listLoading" style="width: 100%;" :default-sort="{ prop: 'createTime', order: 'descending' }">
            <el-table-column width="50" label="序号">
                <template scope="scope">
                    <span>{{ scope.$index + (query.current - 1) * query.size + 1 }}</span>
                </template>
            </el-table-column>
            <el-table-column width="100" label="采购ID">
                <template slot-scope="scope">
                    <span>{{ scope.row.temporaryId }}</span>
                </template>
            </el-table-column>
            <el-table-column width="80" label="申请人">
                <template scope="scope">
                    <span>{{ scope.row.applyUserName }}</span>
                </template>
            </el-table-column>
            <el-table-column width="120" label="采购物品名称">
                <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column width="50" label="是否对公">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.isOpen == 1" size="mini" type="success">是</el-tag>
                    <el-tag v-if="scope.row.isOpen == 2" size="mini" type="danger">否</el-tag>
                </template>
            </el-table-column>
            <el-table-column width="110" label="分类" :show-overflow-tooltip="true">
                >
                <template slot-scope="scope">
                    <p>{{ scope.row.type1Name }}</p>
                    <p>{{ scope.row.type2Name }}</p>
                </template>
            </el-table-column>
            <el-table-column width="100" label="申请时间" :show-overflow-tooltip="true">
                >
                <template slot-scope="scope">
                    <span>{{ scope.row.createTime }}</span>
                </template>
            </el-table-column>
            <el-table-column width="50" label="数量">
                <template slot-scope="scope">
                    <span>{{ scope.row.num }}</span>
                </template>
            </el-table-column>
            <el-table-column width="80" label="单价">
                <template slot-scope="scope">
                    <span>{{ scope.row.priceYuan }}</span>
                </template>
            </el-table-column>
            <el-table-column width="80" label="总价">
                <template slot-scope="scope">
                    <span>{{ scope.row.guessPriceYuan }}</span>
                </template>
            </el-table-column>
            <el-table-column width="80" label="实付款">
                <template slot-scope="scope">
                    <span>{{ scope.row.relPriceYuan == 0.0 ? '' : scope.row.relPriceYuan }}</span>
                </template>
            </el-table-column>
            <el-table-column width="200" label="审批人">
                <template slot-scope="scope">
                    <div class="tag-group" v-for="item in scope.row.checkUserList">
                        <p>{{ item.checkUserName }}</p>
                        <el-tag v-if="item.check == 0 && item.isBeing == 1" size="mini" type="">审批中</el-tag>
                        <el-tag v-if="item.check == 0 && item.isBeing == 0" size="mini" type="warning">待审批</el-tag>
                        <el-tag v-if="item.check == 1" size="mini" type="success">已同意</el-tag>
                        <el-tag v-if="item.check == 2" size="mini" type="danger">已拒绝</el-tag>
                    </div>
                </template>
            </el-table-column>

            <el-table-column prop="status" width="100" label="审批状态">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.status == 0" type="warning">审批中</el-tag>
                    <el-tag v-if="scope.row.status == 1" type="success">同意</el-tag>
                    <el-tag v-if="scope.row.status == 2" type="danger">拒绝</el-tag>
                </template>
            </el-table-column>
            <el-table-column width="120" label="物流信息">
                <template slot-scope="scope">
                    <p>{{ scope.row.expressName }}</p>
                    <p>{{ scope.row.expressNum }}</p>
                </template>
            </el-table-column>
            <el-table-column width="100" label="采购进展">
                <template slot-scope="scope">
                    <span>{{ scope.row.purchaseStatus }}</span>
                </template>
            </el-table-column>
            <el-table-column width="100" label="采购状态">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.purchaseType == 1" size="mini" type="warning">进行中</el-tag>
                    <el-tag v-if="scope.row.purchaseType == 2" size="mini" type="success">已完成</el-tag>
                </template>
            </el-table-column>
            <el-table-column width="120" label="支付/报销状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.isOpen == 1">
                        <el-tag size="mini" type="warning">{{ scope.row.payStatus }}</el-tag>
                    </span>
                    <span v-if="scope.row.isOpen == 2">
                        <el-tag v-if="scope.row.applyId == 1" size="mini" type="success">已报销</el-tag>
                        <el-tag v-if="scope.row.applyId == 2" size="mini" type="warning">未报销</el-tag>
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="操作" min-width="180" fixed="right">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click.native="lookModal(scope.row)">查看</el-button>
                    <el-button size="mini" @click.native="handleModal(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            class="right"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="query.current"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="query.size"
            layout="total, sizes, prev, pager, next"
            :total="total"
        ></el-pagination>
    </div>
</template>

<script>
import { getUserList } from '../../../api/admin/user.js';
import { getPurchasePage, getPurchase } from '../../../api/purchase/purchase.js';
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            query: {
                userId: null,
                principalId: null,
                status: '',
                orderBy: 'create_time_desc',
                likeKeyWords: '',
                current: 1,
                size: 10,
                type1: ''
            },
            list: [],
            pages: 0,
            total: 0,
            disabled: false,
            listLoading: false,
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
            classifyOptions: [
                {
                    value: '',
                    label: '全部'
                }
            ],
            userOptions: []
        };
    },
    computed: {
        ...mapGetters(['permissions', 'userId'])
    },
    created() {
        this.query.principalId = this.userId;
        // this.query.userId=this.userId;
        this.getUserList();
        this.getPurchasePage();
        this.getPurchase('100000');
    },
    methods: {
        getPurchase(id) {
            getPurchase(id, this.userId).then(res => {
                res.data.data.purchaseType.forEach(item => {
                    this.classifyOptions.push({
                        value: item.id,
                        label: item.name
                    });
                });
            });
        },
        getPurchasePage() {
            getPurchasePage(this.query).then(res => {
                console.log(res);
                this.total = res.data.data.total;
                this.query.current = res.data.data.current;
                this.query.size = res.data.data.size;
                this.list = res.data.data.records;
            });
        },
        handleSizeChange(val) {
            this.query.size = val;
            this.getInvoicePage();
        },
        handleCurrentChange(val) {
            this.query.current = val;
            sessionStorage.setItem('page2', val);
            this.getInvoicePage();
        },

        getUserList() {
            getUserList().then(response => {
                console.log(response);
                response.data.data.forEach(element => {
                    //console.log(element)
                    this.userOptions.push({
                        value: element.userId,
                        label: element.username
                    });
                });
            });
        },

        lookModal(val) {
            this.$router.push({
                path: '/purchase/Info/' + val.purchaseId
            });
        },
        handleModal(val) {
            this.$router.push({
                path: '/purchase/Edit',
                query: {
                    purchaseId: val.purchaseId
                }
            });
        }
    }
};
</script>

<style></style>
