<template>
    <el-tabs v-model="activeName">
        <!--        <el-tab-pane label="项目详情" name="info">-->
        <!--            <div>-->
        <!--                <span>青春是一个短暂的美梦, 当你醒来时, 它早已消失无踪</span>-->
        <!--                <el-divider></el-divider>-->
        <!--                <span>少量的邪恶足以抵消全部高贵的品质, 害得人声名狼藉</span>-->
        <!--            </div>-->
        <!--        </el-tab-pane>-->
        <el-tab-pane label="账户余额" name="Balance"><Balance  v-if="'Balance' === activeName" /></el-tab-pane>
        <el-tab-pane label="资金理财汇总" name="manageMoney"><manageMoney  v-if="'manageMoney' === activeName" /></el-tab-pane>
        <el-tab-pane label="未经审批银行录入" name="bankIncome"><bankIncome  v-if="'bankIncome' === activeName" /></el-tab-pane>
        <el-tab-pane label="未经审批银行支出" name="bankExpend"><bankExpend  v-if="'bankExpend' === activeName" /></el-tab-pane>
        <el-tab-pane label="批量确认支付" name="batchApprove"><batchApprove  v-if="'batchApprove' === activeName" /></el-tab-pane>
        <el-tab-pane label="收支明细" name="Detail"><Detail  v-if="'Detail' === activeName" /></el-tab-pane>
    </el-tabs>
</template>

<script>
import Detail from './Detail.vue';
import bankIncome from './bankIncome.vue';
import bankExpend from './bankExpend.vue';
import manageMoney from './manageMoney.vue';
import Balance from './Balance.vue';
import batchApprove from './batchApprove.vue';
export default {
    components: {
        bankIncome,
        bankExpend,
        manageMoney,
        Balance,
        batchApprove,
        Detail
    },
    data() {
        return {
            activeName: 'Balance',
        };
    },

    methods: {},

};
</script>

<style></style>
