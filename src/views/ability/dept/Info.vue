<template>
    <div>
        <el-row :gutter="30">
            <el-col :span="8" style="color: #000000;font-size: 1.2rem;line-height: 2.2rem;text-align: right;">
                <p>部门名称：</p>
                <p>部门负责人：</p>
                <p>成员：</p>
                <p>部门平均工时率：</p>
                <p>部门平均工时率公司排行：</p>
                <p>部门人效kpi+趋势：</p>
            </el-col>
            <el-col :span="12" style="color: #000000;font-size: 1rem;line-height: 2.2rem;">
                <p>{{deptName}}</p>
                <p>{{userName}}</p>
                <p>
                    <span
                        v-for="item in userList"
                        :key="item.userId"
                        style="margin-right: 5px;">
                        {{item.username}}
                    </span>
                </p>
                <p>{{avgNum}} 小时</p>
                <p>第 {{ranking}} 名</p>
                <p></p>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import { getDeptInfo } from "../../../api/admin/dept.js";
    import { getDeptUserList } from "../../../api/admin/user.js";
    import { getHourRadixDeptBySum } from "../../../api/checkwork/hour.js";
    import { dateFormat } from "../../../utils/date.js";
    import { mapGetters } from "vuex";
    export default {
        data() {
            return {
                query: {
                    userId: null,
                    deptId: null
                },
                deptName: "",
                userName: "",
                userList: [],
                avgNum: "",
                ranking: "",
            }
        },
        computed: {
            ...mapGetters(["permissions", "userId", "deptId"])
        },
        created() {
            this.query.deptId = this.deptId;
            this.query.userId = this.userId;
            this.getDeptInfo();
            this.getDeptUserList();

            this.getHourRadixDeptBySum();

        },
        mounted() {},
        methods: {
            getDeptInfo() {
                getDeptInfo(this.query.deptId)
                    .then(response => {
                        this.deptName = response.data.data.deptName;
                        this.userName = response.data.data.userName;
                    })
            },
            getDeptUserList() {
                getDeptUserList(this.query.deptId)
                    .then(response => {
                        this.userList = response.data.data;
                    })
            },
            getHourRadixDeptBySum() {
                getHourRadixDeptBySum(this.query)
                    .then(response => {
                        response.data.data.forEach((item, index) => {
                            if (item.deptId == this.deptId){
                                console.log(item)
                                this.avgNum = item.avgNum;
                                this.ranking = index + 1;
                            }
                        })
                    })
            }

        }
    }
</script>

<style scoped>

</style>
