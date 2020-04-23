<template>
    <el-tabs v-model="activeName" @tab-click="handleClick" tab-position="top">
        <el-tab-pane label="个人分页" name="checkwork" lazy>
            <List />
        </el-tab-pane>
        <el-tab-pane label="个人统计" name="invoice" lazy>
            <User />
        </el-tab-pane>
        <el-tab-pane label="部门统计" name="expense" lazy>
            <Dept />
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import User from "./User";
import Dept from "./Dept";
import List from "./List";
export default {
    components: {
        List,
        User,
        Dept
        // ItemExpense,
        // ItemReceipt
    },
    data() {
        return {
            activeName: "checkwork"
        };
    },
    created() {
        console.log(this.$route.params.itemId);
    },
    methods: {
        handleClick(tab, event) {}
    }
};
</script>

<style scoped></style>
