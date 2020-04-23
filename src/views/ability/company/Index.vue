<template>
    <div>
        <el-row :gutter="24">
            <el-col :span="24">
                <fieldset>
                    <legend>信息栏</legend>
                    <el-row :gutter="24">
                        <el-col :span="6">
                            <el-link type="danger" style="font-size: 1rem;">截止至3月4日张楠迟到次数超过5次</el-link>
                        </el-col>
                        <el-col :span="6">
                            <el-link type="danger" style="font-size: 1rem;">张楠连续四周的公式率下降</el-link>
                        </el-col>
                        <el-col :span="6">
                            <el-link type="danger" style="font-size: 1rem;">张楠无人验收的工作内容超过70%</el-link>
                        </el-col>
                        <el-col :span="6">
                            <el-link type="danger" style="font-size: 1rem;">张楠收到的领导力炸弹超过10个</el-link>
                        </el-col>
                    </el-row>
                </fieldset>
            </el-col>
        </el-row>
        <div style="border-bottom: 5px solid #777777;margin: 1.6rem 0;">
            <span style="font-size: 1.6rem;color: #777777;">考勤管理</span>
        </div>
        <Clock/>
        <div style="border-bottom: 5px solid #777777;margin: 1.6rem 0;">
            <span style="font-size: 1.6rem;color: #777777;">工作效率</span>
        </div>
        <Manhour/>
        <div style="border-bottom: 5px solid #777777;margin: 1.6rem 0;">
            <span style="font-size: 1.6rem;color: #777777;">个人能力</span>
        </div>
        <Ability/>
    </div>
</template>

<script>
    import Clock from "./Clock";
    import Manhour from "./Manhour";
    import Ability from "./Ability";
    export default {
        name: "CompanyIndex",
        components: {
            Clock,
            Manhour,
            Ability
        },
    }
</script>

<style scoped>
    fieldset {
        padding: 20px;
        margin-top: 30px;
        font-size: 1rem;
        color: #2d8cf0;
        /* border:#06c dashed 1px; */
    }
    legend {
        width: 5rem;
        margin-left: 10px;
        padding-left: 5px;
    }
</style>
