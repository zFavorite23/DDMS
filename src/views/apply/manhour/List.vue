<template>
    <el-tabs v-model="activeName">
        <!--        <el-tab-pane label="项目详情" name="info">-->
        <!--            <div>-->
        <!--                <span>青春是一个短暂的美梦, 当你醒来时, 它早已消失无踪</span>-->
        <!--                <el-divider></el-divider>-->
        <!--                <span>少量的邪恶足以抵消全部高贵的品质, 害得人声名狼藉</span>-->
        <!--            </div>-->
        <!--        </el-tab-pane>-->
        <el-tab-pane label="工时填报" name="from"><From v-if="'from' === activeName" /></el-tab-pane>
        <el-tab-pane label="填报管理" name="info"><Info v-if="'info' === activeName" /><</el-tab-pane>
        <el-tab-pane label="我的审批" name="approver"><Approver v-if="'approver' === activeName" /></el-tab-pane>
    </el-tabs>
</template>

<script>
import From from './Form.vue';
import Info from './Info.vue'
import Approver from './Approver.vue';
export default {
    components: {
        From,
        Approver,
        Info
    },
    data() {
        return {
            activeName: 'from'
        };
    }
};
</script>
