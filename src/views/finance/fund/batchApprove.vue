<template>
    
    <el-table stripe border style="width: 100%;">
        <el-table-column min-width="180" label="账户列表"></el-table-column>
        <el-table-column min-width="100" label="期初金额 ( A 手动录入一次,剩余结算)" prop="invoiceTime"></el-table-column>
        <el-table-column min-width="100" label="支出金额 ( B oa报销,支出数据,手动录入 )"></el-table-column>
        <el-table-column min-width="100" label="收入金额 ( C 手动录入 )"></el-table-column>
        <el-table-column min-width="180" label="银行账户余额 ( D = A - B + C )"></el-table-column>
        <el-table-column prop="status" min-width="120" label="理财期初金额 ( E 手动录入一次)"></el-table-column>
        <el-table-column prop="status" min-width="120" label="理财申购金额 ( F 手动录入)"></el-table-column>
        <el-table-column prop="status" min-width="120" label="理财赎回金额 ( G 手动录入)"></el-table-column>
        <el-table-column prop="status" min-width="200" label="理财账户剩余金额 ( H = E - F + G )"></el-table-column>
        <el-table-column prop="status" min-width="120" label="实际账户总余额 ( I = D + H )"></el-table-column>
    </el-table>
</template>

<script>
</script>

<style>
</style>
