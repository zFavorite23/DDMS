<template>
    <div>
        <span class="tit">未经审批需填报--银行收入</span>
        <el-table stripe border style="width: 100%;">
            <el-table-column min-width="120" label="银行发生日期"></el-table-column>
            <el-table-column min-width="180" label="项目名称"></el-table-column>
            <el-table-column min-width="100" label="金额"></el-table-column>
            <el-table-column min-width="120" label="我方公司名称"></el-table-column>
            <el-table-column min-width="120" label="甲方公司名称"></el-table-column>
            <el-table-column min-width="120" label="收入类型"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            query: {
                userId: null,
                type: 6
            },
            formData: {
                name: '',
                bankStartMoney: '',
                bankExpendMoney: '',
                bankIncomeMoney: '',
                bankTime1: '',
                bankTime2: '',
                bankTime3: '',
                manageStartMoney: '',
                manageExpendMoney: '',
                manageIncomeMoney: '',
                manageTime1: '',
                manageTime2: '',
                manageTime3: ''
            },
            saving: false,
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
                    label: '济宁市万城象限信息科技中心'
                },
                {
                    value: '5',
                    label: '济宁市数源矩阵信息科技中心'
                },
                {
                    value: '6',
                    label: '上海道趣信息技术中心'
                },
                {
                    value: '7',
                    label: '单保晔'
                },
                {
                    value: '8',
                    label: '单保勇'
                }
            ]
        };
    },
    computed: {
        ...mapGetters(['userId'])
    },
    created() {
        this.query.userId = this.userId;
    },
    methods: {
        onSubmit() {
            console.log(this.query.userId);
            console.log(this.formData);
        },
        backHistory() {
            this.formData.name = '';
            this.formData.bankStartMoney = '';
            this.formData.bankExpendMoney = '';
            this.formData.bankIncomeMoney = '';
            this.formData.bankTime1 = '';
            this.formData.bankTime2 = '';
            this.formData.bankTime3 = '';
            this.formData.manageStartMoney = '';
            this.formData.manageExpendMoney = '';
            this.formData.manageIncomeMoney = '';
            this.formData.manageTime1 = '';
            this.formData.manageTime2 = '';
            this.formData.manageTime3 = '';
            this.$router.go(-1);
        }
    }
};
</script>

<style></style>
