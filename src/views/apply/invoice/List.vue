<template>
    <div>
        <div class="">
            <span class="tit">报销 / 总数 : {{ total }}</span>
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
                <!-- <el-form-item>
                    <el-select style="width:140px" v-model="query.orderBy" placeholder="排序方式">
                        <el-option v-for="item in orderByOptions" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item><el-button type="primary" size="medium" v-on:click="getInvoicePage()" icon="el-icon-search">搜索</el-button></el-form-item>
                <el-form-item>
                    <router-link to="/apply/invoice/form"><el-button type="primary" size="medium" @change="clearCon">添加申请</el-button></router-link>
                </el-form-item>
            </el-form>
            <el-radio-group v-model="listType" style="float: right;" @change="openList">
                <el-radio-button label="1">我申请的</el-radio-button>
                <el-radio-button label="2">我审批的</el-radio-button>
            </el-radio-group>
        </div>
        <el-table :data="list" stripe border v-loading="listLoading" style="width: 100%;">
            <el-table-column width="60" label="序号">
                <template scope="scope">
                    <span>{{ scope.$index + (query.current - 1) * query.size + 1 }}</span>
                </template>
            </el-table-column>
            <el-table-column width="100" label="申请人">
                <template scope="scope">
                    <span>{{ scope.row.applyUserName }}</span>
                </template>
            </el-table-column>
            <el-table-column min-width="180" label="分类">
                <template slot-scope="scope">
                    <p v-if="scope.row.type1Name">{{ scope.row.type1Name }}</p>
                    <p v-if="scope.row.type2Name">{{ scope.row.type2Name }}</p>
                    <p v-if="scope.row.type3Name">{{ scope.row.type3Name }}</p>
                </template>
            </el-table-column>
            <el-table-column min-width="180" label="项目" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <span v-if="scope.row.alias == null || scope.row.alias == ''">与项目无关</span>
                    <span v-else>{{ scope.row.alias }}</span>
                </template>
            </el-table-column>
            <el-table-column min-width="140" label="时间" prop="invoiceTime">
                <template slot-scope="scope">
                    <p>支付：{{ scope.row.payTime }}</p>
                    <p>发票：{{ scope.row.invoiceTime }}</p>
                </template>
            </el-table-column>
            <el-table-column min-width="220" label="审批人">
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

            <el-table-column min-width="80" label="是否找票">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.isFull == 0" type="danger">否</el-tag>
                    <el-tag v-if="scope.row.isFull == 1" type="success">是</el-tag>
                </template>
            </el-table-column>
            <el-table-column min-width="80" label="是否确认">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.isAffirm == 0" type="danger">否</el-tag>
                    <el-tag v-if="scope.row.isAffirm == 1" type="success">是</el-tag>
                </template>
            </el-table-column>
            <el-table-column min-width="160" label="金额(元)" :show-overflow-tooltip="true" prop="invoicePriceYuan">
                <template slot-scope="scope">
                    <p>支付：{{ scope.row.payPriceYuan }} 元</p>
                    <p>发票：{{ scope.row.invoicePriceYuan }} 元</p>
                </template>
            </el-table-column>
            <el-table-column prop="status" min-width="100" label="审批状态">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.status == 0" type="warning">审批中</el-tag>
                    <el-tag v-if="scope.row.status == 1" type="success">同意</el-tag>
                    <el-tag v-if="scope.row.status == 2" type="danger">拒绝</el-tag>
                </template>
            </el-table-column>
            <el-table-column min-width="160" label="创建时间" :show-overflow-tooltip="true" prop="createTime" sortable>
                <template slot-scope="scope">
                    <span>{{ scope.row.createTime }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" min-width="220" fixed="right">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click.native="lookModal(scope.row)">查看</el-button>
                    <el-button size="mini" v-if="scope.row.status != 1" @click.native="handleModal(scope.row)">编辑</el-button>
                    <el-button size="mini" v-if="scope.row.status == 0" type="danger" @click.native="handleDel(scope.$index, scope.row)">删除</el-button>
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
import { getInvoicePage, deleteObj, invoiceMigration, getInvoices } from '../../../api/apply/invoice.js';
// import {getUserInfo} from "../../../api/admin/user.js";
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            query: {
                userId: null,
                likeKeyWords: '',
                status: '',
                type1: '',
                orderBy: 'create_time_desc',
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
            classifyOptions: [
                {
                    value: '',
                    label: '全部'
                }
            ],
            pages: 0,
            total: 0,
            listLoading: false,
            list: [],
            number: '',
            listType: '1',
            userOptions: [],
            disabled: false
        };
    },
    created() {
        let page = sessionStorage.getItem('page2');
        if (page != null) {
            this.query.current = Number(page);
        }
        window.localStorage.removeItem('editInvoiceInfo');
        this.query.status = this.$route.query.status;
        if (!this.query.status) {
            this.query.status = '';
        }
        if (this.userId != 1 && this.userId != 77) {
            this.disabled = true;
        }
        this.query.userId = this.userId;
        console.log(this.userId)
        this.getInvoicePage();
        this.getUserList();
        this.getInvoices('-1');
    },
    computed: {
        ...mapGetters(['permissions', 'userId'])
    },

    methods: {
        getInvoices(id) {
            getInvoices(id, this.userId).then(res => {
                res.data.data.invoiceType.forEach(item => {
                    this.classifyOptions.push({
                        value: item.id,
                        label: item.name
                    });
                });
            });
        },
        sortChange(a, b) {
            //排序
            return a.invoicePriceYuan - b.invoicePriceYuan;
        },
        openList(val) {
            if (val == 2) {
                this.$router.push({
                    path: '/apply/invoice/approver'
                });
            }
        },
        getInvoicePage() {
            this.listLoading = true;
            getInvoicePage(this.query)
                .then(response => {
                    console.log(response);

                    this.listLoading = false;
                    this.total = response.data.data.total;
                    this.query.current = response.data.data.current;
                    this.query.size = response.data.data.size;
                    this.list = response.data.data.records;
                    this.list.forEach((item, index) => {
                        const invoiceInfo = JSON.parse(item.clockList);
                        console.log(invoiceInfo.status);
                        this.list[index].clockDay = invoiceInfo.day;
                        this.list[index].clockTime = invoiceInfo.time;
                        this.list[index].clockStatus = invoiceInfo.status;
                    });
                })
                .catch(() => {
                    this.listLoading = false;
                });
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
        handleSizeChange(val) {
            this.query.size = val;
            this.getInvoicePage();
        },
        handleCurrentChange(val) {
            this.query.current = val;
            sessionStorage.setItem('page2', val);
            this.getInvoicePage();
        },
        handleModal(data) {
            window.localStorage.setItem('editInvoiceInfo', JSON.stringify(data));
            this.$router.push({
                path: '/apply/invoice/form'
            });
        },
        lookModal(data) {
            // window.localStorage.setItem("editClockInfo", JSON.stringify(data));
            console.log(data);
            console.log(data.invoiceId);
            this.$router.push({
                path: '/apply/invoice/info/' + data.invoiceId
            });
        },
        handleDel(index, row) {
            if (row.invoiceId) {
                this.$confirm('确认删除吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    deleteObj(row.invoiceId).then(res => {
                        if (res.data.data) {
                            this.getInvoicePage();
                        }
                    });
                });
            }
        },
        clearCon() {},
        getInvoiceMigration() {
            invoiceMigration().then(response => {});
        }
    },
    watch: {
        'query.likeKeyWords': {
            handler: function() {
                this.query.current = 1;
                this.getInvoicePage();
            }
        }
    }
};
</script>
<style type="text/scss" lang="scss"></style>
