<template>
    <div class="">
        <el-form :inline="true">
            <!-- <el-form-item><span class="tit">账户余额</span></el-form-item> -->
            <el-form-item><el-button type="primary" @click="dialogFormVisible = true" size="mini">账户余额录入</el-button></el-form-item>
        </el-form>

        <el-dialog title="账户余额录入" :visible.sync="dialogFormVisible">
            <el-form :model="formData">
                <el-form-item label="账户列表:" :label-width="formLabelWidth">
                    <el-select v-model="formData.name" clearable placeholder="请选择账户">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="期初金额:" :label-width="formLabelWidth"><el-input placeholder="请输入期初金额" v-model="formData.money" clearable></el-input></el-form-item>
                <el-form-item label="支出金额:" :label-width="formLabelWidth"><el-input placeholder="请输入支出金额" v-model="formData.money" clearable></el-input></el-form-item>
                <el-form-item label="收入金额:" :label-width="formLabelWidth"><el-input placeholder="请输入收入金额" v-model="formData.money" clearable></el-input></el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>

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
            dialogFormVisible: false,
            query: {
                userId: null,
                likeKeyWords: '',
                data: '',
                month: '',
                orderBy: 'create_time_desc',
                current: 1,
                size: 10
            },
            formData: {
                data: '',
                itemName: '',
                name: '',
                money: '',
                type: ''
            },
            formLabelWidth: '120px',
            pages: 0,
            total: 0,
            listLoading: false,
            options: [
                {
                    value: '1',
                    label: '北京甲板智慧科技有限公司'
                },
                {
                    value: '2',
                    label: '北京甲板数字科技有限公司'
                },
                {
                    value: '3',
                    label: '北京甲板瑞城科技有限公司'
                },
                {
                    value: '4',
                    label: '济宁市万城象限信息科技中心',
                    disabled: true
                },
                {
                    value: '5',
                    label: '济宁市数源矩阵信息科技中心',
                    disabled: true
                },
                {
                    value: '6',
                    label: '上海道趣信息技术中心'
                },
                {
                    value: '7',
                    label: '单保晔',
                    disabled: true
                },
                {
                    value: '8',
                    label: '单保勇'
                }
            ]
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
