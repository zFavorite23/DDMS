<template>
    <div>
        <div class="">
            <span class="tit">报销 / 总数 : {{ total }}</span>
            <el-form :inline="true" :model="query">
                <el-form-item>
                    <el-select style="width:120px" v-model="query.userId" filterable placeholder="请选择">
                        <el-option v-for="item in userOptions" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item><el-input style="width:120px" v-model="query.likeKeyWords" placeholder="关键字" clearable></el-input></el-form-item>

                <el-form-item><el-date-picker style="width:180px" v-model="query.data" type="date" placeholder="申请日期"></el-date-picker></el-form-item>
                <el-form-item>
                    <el-date-picker style="width:180px" v-model="query.month" value-format="yyyy-MM" format="yyyy 年 MM 月" type="month" placeholder="归档月份"></el-date-picker>
                </el-form-item>

                <el-form-item><el-button type="primary" size="medium" v-on:click="getStatisticsPage()" icon="el-icon-search">搜索</el-button></el-form-item>
            </el-form>
        </div>
        <el-table :data="list" stripe border v-loading="listLoading" style="width: 100%;">
            <el-table-column width="70" label="序号">
                <template scope="scope">
                    <span>{{ scope.$index + (query.current - 1) * query.size + 1 }}</span>
                </template>
            </el-table-column>
            <el-table-column width="100" label="申请人" prop="applyUserName"></el-table-column>
            <el-table-column min-width="100" label="申请时间" prop="invoiceTime"></el-table-column>
            <el-table-column min-width="120" label="项目" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <span v-if="scope.row.alias == null || scope.row.alias == ''">与项目无关</span>
                    <span v-else>{{ scope.row.alias }}</span>
                </template>
            </el-table-column>
            <el-table-column min-width="120" label="总分类" prop="type1Name"></el-table-column>
            <el-table-column min-width="100" label="明细分类" prop="type2Name"></el-table-column>
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
            <el-table-column min-width="110" label="智慧银行报销" prop="windomMoneyYuan"></el-table-column>
            <el-table-column min-width="110" label="数字银行报销" prop="numberMoneyYuan"></el-table-column>
            <el-table-column min-width="100" label="智实际报销支付金额"></el-table-column>
            <el-table-column min-width="120" label="无发票报销金额" prop="ncMoneyYuan"></el-table-column>
            <el-table-column min-width="110" label="抵扣工资差额"></el-table-column>
            <el-table-column min-width="110" label="单纯找票金额" prop="pureMoneyYuan"></el-table-column>
            <el-table-column min-width="100" label="归档月份" prop="backMonth"></el-table-column>
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
import { getStatisticsPage } from '../../../api/apply/invoice.js';
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            query: {
                userId: null,
                month: '2020-08',
                likeKeyWords: '',
                orderBy: 'create_time_desc',
                current: 1,
                size: 10
            },
            pages: 0,
            total: 0,
            listLoading: false,
            userOptions: [],
            list: []
        };
    },
    created() {
        this.getUserList();
        this.getStatisticsPage();
    },
    computed: {
        ...mapGetters(['permissions', 'userId'])
    },

    methods: {
        // 公司人员列表
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

        // 获取报销统计
        getStatisticsPage() {
            this.listLoading = true;
            getStatisticsPage(this.query).then(res => {
                this.listLoading = false;
                this.total = res.data.data.total;
                this.query.current = res.data.data.current;
                this.query.size = res.data.data.size;
                this.list = res.data.data.records;
            });
        },

        // 分页
        handleSizeChange(val) {
            this.query.size = val;
            this.getStatisticsPage();
        },
        handleCurrentChange(val) {
            this.query.current = val;
            sessionStorage.setItem('page2', val);
            this.getStatisticsPage();
        }
    }
};
</script>

<style></style>
