<template>
    <div class="">
        <span class="tit">账户余额</span>
        <el-form :inline="true" :model="query">
            <el-form-item><el-input style="width:120px" v-model="query.likeKeyWords" placeholder="关键字" clearable></el-input></el-form-item>

            <el-form-item><el-date-picker style="width:180px" v-model="query.data" type="date" placeholder="申请日期"></el-date-picker></el-form-item>

            <el-form-item><el-button type="primary" size="medium" v-on:click="getInvoicePage()" icon="el-icon-search">搜索</el-button></el-form-item>
            <el-form-item>
                <router-link to="/finance/fund/form"><el-button type="primary" size="medium">信息录入</el-button></router-link>
            </el-form-item>
        </el-form>

        <el-table stripe border v-loading="listLoading" style="width: 100%;">
            <el-table-column min-width="180" label="账户列表"></el-table-column>
            <el-table-column min-width="100" label="期初金额 ( A 手动录入一次,剩余结算)" prop="invoiceTime"></el-table-column>
            <el-table-column min-width="100" label="支出金额 ( B oa报销,支出数据,手动录入 )"></el-table-column>
            <el-table-column min-width="100" label="收入金额 ( C 手动录入 )"></el-table-column>
            <el-table-column min-width="180" label="银行账户余额 ( D = A - B + C )"></el-table-column>
            <el-table-column prop="status" min-width="200" label="理财账户剩余金额 ( H = E - F + G )"></el-table-column>
            <el-table-column prop="status" min-width="120" label="实际账户总余额 ( I = D + H )"></el-table-column>
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
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            query: {
                userId: null,
                likeKeyWords: '',
                data: '',
                month: '',
                orderBy: 'create_time_desc',
                current: 1,
                size: 10
            },
            pages: 0,
            total: 0,
            listLoading: false
        };
    },
    created() {
        this.query.userId = this.userId;
    },
    computed: {
        ...mapGetters(['permissions', 'userId'])
    },
    methods: {
        // 分页
        handleSizeChange(val) {
            this.query.size = val;
            this.getInvoicePage();
        },
        handleCurrentChange(val) {
            this.query.current = val;
            sessionStorage.setItem('page2', val);
            this.getInvoicePage();
        }
    }
};
</script>

<style></style>
