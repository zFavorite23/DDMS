<template>
    <el-tabs v-model="activeName" @tab-click="handleClick" tab-position="top">
        <el-tab-pane label="项目汇总" name="item" lazy>
            <Item />
        </el-tab-pane>
        <el-tab-pane label="个人汇总" name="user" lazy>
            <User />
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import Item from "./Item";
import User from "./User";
// import ItemExpense from './ItemExpense'
// import ItemReceipt from './ItemReceipt'
export default {
    components: {
        Item,
        User
        // ItemExpense,
        // ItemReceipt
    },
    data() {
        return {
            activeName: "item"
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
