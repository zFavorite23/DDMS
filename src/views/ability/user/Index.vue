<template>
    <div>
        <el-row :gutter="24">
            <el-col :span="12">
                <fieldset>
                    <legend>个人信息</legend>
                    <el-row :gutter="24">
                        <el-col :span="1">
                            <p>&nbsp;</p>
                        </el-col>
                        <el-col :span="5">
                            <p style="color: #1f2d3d">姓名：{{ username }}</p>
                        </el-col>
                        <el-col :span="11">
                            <p style="color: #1f2d3d">所属部门：{{ deptName }}</p>
                        </el-col>
                        <el-col :span="6">
                            <p style="color: #1f2d3d">员工等级：<el-link type="primary" style="font-size: 1rem;">2级</el-link></p>
                        </el-col>
                    </el-row>
                </fieldset>
            </el-col>
            <el-col :span="12">
                <fieldset>
                    <legend>我的告警</legend>
                    <el-row :gutter="24">
                        <el-col :span="8">
                            <el-link type="danger" style="font-size: 1rem;">2020/3/12日工时未填报</el-link>
                        </el-col>
                        <el-col :span="8">
                            <el-link type="danger" style="font-size: 1rem;">2020/3/12日工时未填报</el-link>
                        </el-col>
                        <el-col :span="8">
                            <el-link type="danger" style="font-size: 1rem;">2020/3/12日工时未填报</el-link>
                        </el-col>

                    </el-row>

                </fieldset>
            </el-col>
        </el-row>

        <div style="border-bottom: 5px solid #777777;margin: 1.6rem 0;">
            <span style="font-size: 1.6rem;color: #777777;">我的炸弹</span>
        </div>
        <Bomb/>
        <div style="border-bottom: 5px solid #777777;margin: 1.6rem 0;">
            <span style="font-size: 1.6rem;color: #777777;">时间分配</span>
        </div>
        <Time/>
    </div>
</template>

<script>
    import { getDeptInfo } from "../../../api/admin/dept.js";
    import { mapGetters } from "vuex";
    import Bomb from "./Bomb";
    import Time from "./Time";
    export default {
        name: "User",
        components: {
            Bomb,
            Time
        },
        data() {
            return {
                userName: "",
                deptName: "",
                tags: [
                    { name: '标签一'},
                    { name: '标签二'},
                    { name: '标签三'},
                    { name: '标签四'},
                    { name: '标签五'}
                ]
            };
        },
        computed: {
            ...mapGetters(["permissions", "deptId"]),
            username() {
                let username = this.$store.state.admin.userName;
                return !username ? this.name : username;
            },
        },
        created() {
            //this.userName = this.userName;
            this.getDeptInfo(this.deptId);
        },
        mounted() {},
        methods: {
            getDeptInfo(deptId) {
                getDeptInfo(deptId)
                    .then(response => {
                        const dateInfo = response.data.data;
                        this.deptName = dateInfo.deptName;
                        this.getDeptParentInfo(dateInfo.parentId);
                    })
            },
            getDeptParentInfo(parentId) {
                getDeptInfo(parentId)
                    .then(response => {
                        const dateInfo = response.data.data;
                        this.deptName = dateInfo.deptName + "-" + this.deptName;
                    })
            }
        }
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
