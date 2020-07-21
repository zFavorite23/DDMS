<template>
    <div>
        <div class="">
            <span class="tit">我审批的采购审批 / 总数 : {{ total }}</span>
            <el-form :inline="true" :model="query">
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
                <el-form-item><el-button type="primary" size="medium" @click="getPurchaseApprover()"  icon="el-icon-search">搜索</el-button></el-form-item>
                <el-form-item>
                    <router-link to="/purchase/purchaseApply/form"><el-button type="primary" size="medium">添加申请</el-button></router-link>
                </el-form-item>
            </el-form>
            <el-radio-group v-model="listType" style="float: right;" @change="openList">
                <el-radio-button label="1">我申请的</el-radio-button>
                <el-radio-button label="2">我审批的</el-radio-button>
            </el-radio-group>
        </div>

        <el-table :data="list" stripe border v-loading="listLoading" style="width: 100%;" :default-sort="{ prop: 'createTime', order: 'descending' }">
            <el-table-column width="50" label="序号">
                <template scope="scope">
                    <span>{{ scope.$index + (query.current - 1) * query.size + 1 }}</span>
                </template>
            </el-table-column>
            <el-table-column width="80" label="申请人">
                <template scope="scope">
                    <span>{{ scope.row.applyUserName }}</span>
                </template>
            </el-table-column>
            <el-table-column width="110" label="采购物品名称">
                <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column width="130" label="分类" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <p>{{ scope.row.type1Name }}</p>
                    <p>{{ scope.row.type2Name }}</p>
                </template>
            </el-table-column>
            <el-table-column width="120" label="申请时间" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <span>{{ scope.row.createTime }}</span>
                </template>
            </el-table-column>
            <el-table-column width="80" label="淘宝链接">
                <template slot-scope="scope">
                    <el-link type="primary" :href="scope.row.buyUrl" target="_blank">链接</el-link>
                    <el-link type="primary" @click="copyCode(scope.row)">复制链接</el-link>
                </template>
            </el-table-column>
            <el-table-column width="160" label="型号参数">
                <template slot-scope="scope">
                    <span>{{ scope.row.model }}</span>
                </template>
            </el-table-column>
            <el-table-column width="50" label="数量">
                <template slot-scope="scope">
                    <span>{{ scope.row.num }}</span>
                </template>
            </el-table-column>
            <el-table-column width="50" label="单位">
                <template slot-scope="scope">
                    <span>{{ scope.row.unit }}</span>
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
            <el-table-column width="150" label="收货地址,联系方式" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <span>{{ scope.row.contact }}</span>
                </template>
            </el-table-column>

            <el-table-column prop="status" width="80" label="审批状态">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.status == 0" type="warning">审批中</el-tag>
                    <el-tag v-if="scope.row.status == 1" type="success">同意</el-tag>
                    <el-tag v-if="scope.row.status == 2" type="danger">拒绝</el-tag>
                </template>
            </el-table-column>
            <el-table-column width="100" label="采购负责人">
                <template slot-scope="scope">
                    <span>{{ scope.row.principalName }}</span>
                </template>
            </el-table-column>
            <el-table-column width="120" label="物流信息">
                <template slot-scope="scope">
                    <p>{{ scope.row.expressName }}</p>
                    <p>{{ scope.row.expressNum }}</p>
                </template>
            </el-table-column>
            <el-table-column label="操作" min-width="180" fixed="right">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click.native="handInfo(scope.row)">查看&审批</el-button>
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
import { getPurchaseApprover, getPurchasePage, getPurchase } from '../../../api/purchase/purchase.js';
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            query: {
                userId: null,
                status: '',
                likeKeyWords: '',
                orderBy: 'create_time_desc',
                current: 1,
                size: 10,
                type1: ''
            },
            list: [],
            listType: '2',
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
            ]
        };
    },
    created() {
        this.query.userId = this.userId;
        this.getPurchaseApprover();
        this.getPurchase('100000');
        let page = sessionStorage.getItem('page2');
        if (page != null) {
            this.query.current = Number(page);
        }
        this.query.status = this.$route.query.status;
        if (!this.query.status) {
            this.query.status = '';
        }
    },
    computed: {
        ...mapGetters(['permissions', 'userId'])
    },
    methods: {
        openList(val) {
            if (val == 1) {
                this.$router.push({
                    path: '/purchase/form'
                });
            }
        },
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
        getPurchaseApprover() {
            getPurchaseApprover(this.query).then(res => {
                this.total = res.data.data.total;
                this.query.current = res.data.data.current;
                this.query.size = res.data.data.size;
                this.list = res.data.data.records;
                console.log(this.list)
            });
        },
        handInfo(data) {
            console.log(data);
            this.$router.push({
                path: 'info/' + data.purchaseId
            });
        },
        handleSizeChange(val) {
            this.query.size = val;
            this.getPurchaseApprover();
        },
        handleCurrentChange(val) {
            this.query.current = val;
            sessionStorage.setItem('page2', val);
            this.getPurchaseApprover();
        },
        copyCode(row) {
            this.$message({
                message: '已成功复制到粘贴板！',
                type: 'success'
            });
            this.$copyText(`${row.buyUrl}`).then(res => {
                console.log(res);
                // this.$toast("已成功复制，可直接去粘贴");
            });
        }
    }
};
</script>

<style></style>
