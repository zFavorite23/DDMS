<template>
    <div style="max-width: 800px;">
        <el-button @click="backHistory" class="back">返回</el-button>
        <div class="title" style="margin-top: -40px">
            <p class="name">工时单</p>
            <table border="0" cellspacing="0" cellpadding="0" v-if="manhourInfo">
                <tr>
                    <td>申请人</td>
                    <td>{{ manhourInfo.applyUserName }}</td>
                </tr>
                <tr>
                    <td>申请日期</td>
                    <td>{{ manhourInfo.day }}</td>
                </tr>
                <tr>
                    <td>自评积分</td>
                    <td>{{ manhourInfo.integral }} 分</td>
                </tr>
                <tr>
                    <td width="100">工作类别</td>
                    <td v-if="manhourInfo.category == 1">管理</td>
                    <td v-if="manhourInfo.category == 2">项目</td>
                    <td v-if="manhourInfo.category == 3">产品</td>
                    <td v-if="manhourInfo.category == 4">长身体</td>
                </tr>
                <tr v-if="manhourInfo.category == 2">
                    <td>项目</td>
                    <td v-if="manhourInfo.alias != null">
                        {{ manhourInfo.alias }}
                    </td>
                    <td v-else>与项目无关</td>
                </tr>
                <tr v-if="manhourInfo.category == 3">
                    <td>产品</td>
                    <td v-if="manhourInfo.alias != null">
                        {{ manhourInfo.alias }}
                    </td>
                    <td v-else>与产品无关</td>
                </tr>
                <tr v-if="manhourInfo.category == 1">
                    <td width="100">主分类</td>
                    <td v-if="manhourInfo.category == 1">
                        <span v-if="manhourInfo.mainClassify == 1">公司管理</span>
                        <span v-if="manhourInfo.mainClassify == 2">财务管理</span>
                        <span v-if="manhourInfo.mainClassify == 3">人事管理</span>
                        <span v-if="manhourInfo.mainClassify == 4">部门管理</span>
                        <span v-if="manhourInfo.mainClassify == 5">工厂管理</span>
                    </td>
                    <td v-if="manhourInfo.category == 4">
                        <span v-if="manhourInfo.mainClassify == 1">学习</span>
                        <span v-if="manhourInfo.mainClassify == 2">吃饭</span>
                        <span v-if="manhourInfo.mainClassify == 3">睡觉</span>
                    </td>
                </tr>
                <tr v-if="manhourInfo.category == 2 || manhourInfo.category == 3 || manhourInfo.category == 4">
                    <td width="100">子分类</td>
                    <td v-if="manhourInfo.category == 2">
                        <span v-if="manhourInfo.subClassify == 1">管理</span>
                        <span v-if="manhourInfo.subClassify == 2">销售</span>
                        <span v-if="manhourInfo.subClassify == 3">售前</span>
                        <span v-if="manhourInfo.subClassify == 4">交付</span>
                        <span v-if="manhourInfo.subClassify == 5">产品</span>
                    </td>
                    <td v-if="manhourInfo.category == 3">
                        <span v-if="manhourInfo.subClassify == 1">管理</span>
                        <span v-if="manhourInfo.subClassify == 2">交付</span>
                    </td>
                    <td v-if="manhourInfo.category == 4">
                        <span v-if="manhourInfo.subClassify == 1">学习</span>
                        <span v-if="manhourInfo.subClassify == 2">吃饭</span>
                        <span v-if="manhourInfo.subClassify == 3">睡觉</span>
                    </td>
                </tr>
                <tr>
                    <td>工作内容</td>
                    <td>{{ manhourInfo.reason }}</td>
                </tr>
                <tr>
                    <td>验收人</td>
                    <td v-if="manhourInfo.checkUserList.length > 0">{{ manhourInfo.checkUserList[0].checkUserName }}</td>
                    <td v-else>无人验收</td>
                </tr>
                <tr>
                    <td>工时(小时)</td>
                    <td>{{ manhourInfo.useHour }} 小时</td>
                </tr>
                <tr>
                    <td>完成情况</td>
                    <td v-if="manhourInfo.complete == '0'">未完成</td>
                    <td v-else-if="manhourInfo.complete == '100'">已完成</td>
                    <td v-else-if="manhourInfo.complete == '10'">完成10%</td>
                    <td v-else-if="manhourInfo.complete == '20'">完成20%</td>
                    <td v-else-if="manhourInfo.complete == '30'">完成30%</td>
                    <td v-else-if="manhourInfo.complete == '40'">完成40%</td>
                    <td v-else-if="manhourInfo.complete == '50'">完成50%</td>
                    <td v-else-if="manhourInfo.complete == '60'">完成60%</td>
                    <td v-else-if="manhourInfo.complete == '70'">完成70%</td>
                    <td v-else-if="manhourInfo.complete == '80'">完成80%</td>
                    <td v-else-if="manhourInfo.complete == '90'">完成90%</td>
                    <td v-else></td>
                </tr>
                <tr  v-if="manhourInfo.complete != '100'">
                    <td>预计完成时间</td>
                    <td>{{ manhourInfo.completeTime }}</td>
                </tr>
                <tr>
                    <td>状态</td>
                    <td v-if="manhourInfo.status == 0">
                        <el-tag type="warning">审批中</el-tag>
                    </td>
                    <td v-if="manhourInfo.status == 1">
                        <el-tag type="success">已同意</el-tag>
                    </td>
                    <td v-if="manhourInfo.status == 2">
                        <el-tag type="danger">已拒绝</el-tag>
                    </td>
                </tr>
                <tr>
                    <td>申请时间</td>
                    <td>{{ manhourInfo.createTime }}</td>
                </tr>
            </table>
        </div>
        <div class="title left" v-if="approverList.length > 0">
            <p class="name">审批结果</p>
        </div>
        <div class="result" v-for="approver in approverList">
            <el-avatar
                size="medium"
                :src="approver.checkUserAvatar"
                class="avatar"
            ></el-avatar>
            <span class="username" style="color: #65CEA7;">
                {{ approver.checkUserName }}
                <i
                    class="el-icon-time"
                    style="color: #000;margin-left: 10px;margin-right: 5px"
                    v-if="approver.check > 0"
                ></i>
                <span style="color: #000" v-if="approver.check > 0">{{
                    approver.createTime
                }}</span>
            </span>
            <span
                v-if="approver.check > 0"
                style="color: #000000;margin-top: 45px;position: absolute;font-size: 12px"
            >审批工时：{{ approver.checkHour }} 小时</span
            >
            <span
                style="color: #000000;margin-top: 70px;position: absolute;font-size: 12px"
                >审批意见：{{ approver.summary }}</span
            >
            <div>
                <span v-if="approver.check == 1">
                    <el-tag class="checkSty" type="success">已同意</el-tag>
                </span>
                <span v-if="approver.check == 2">
                    <el-tag class="checkSty" type="danger">已拒绝</el-tag>
                </span>
                <span v-if="approver.check == 0">
                    <el-tag class="checkSty" type="warning">审批中</el-tag>
                </span>
            </div>
        </div>

        <div v-if="showCheck">
            <div class="title left">
                <p class="name">审批</p>
            </div>
            <el-alert title="审批流程不可逆转" type="warning"> </el-alert>
            <el-form
                :model="formData"
                :rules="rules"
                ref="formData"
                label-width="100px"
                class="demo-ruleForm res"
                style="width: 100%"
            >
                <el-radio-group
                    v-model="formData.check"
                    @change="selectChcek"
                    style="margin-top: 10px;margin-left: 20px"
                >
                    <el-radio label="1">同意</el-radio>
                    <el-radio label="2">拒绝</el-radio>
                </el-radio-group>

                <el-form-item label="审批工时：" v-if="formData.check =='2'" style="padding: 15px 0 0 0;">
                    <el-input-number
                        v-model="checkHour"
                        size="small"
                        controls-position="right"
                        :precision="1"
                        :step="0.5"
                        :min="0.0"
                        :max="maxCheckHour"
                    >
                    </el-input-number>
                </el-form-item>


                <el-form-item
                    prop="summary"
                    style="margin-left: -100px;margin-top: 10px"
                >
                    <el-input
                        type="textarea"
                        v-model="formData.summary"
                        placeholder="请填写原因"
                        maxlength="30"
                        show-word-limit
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="success"
                        class="submit"
                        @click="onSubmit"
                        :loading="saving"
                        >提交</el-button
                    >
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import {
    getManhourInfo,
    getManhourApproverList,
    updateManhourApprover
} from "../../../api/apply/manhour.js";
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            formData: {
                approverId: null,
                checkUserId: null,
                check: "1",
                summary: "同意"
            },
            manhourId: null,
            manhourInfo: null,
            checkHour: 0.0,
            maxCheckHour: 0.0,
            listLoading: false,
            list: [],
            approverList: [],
            rules: {
                summary: [{ required: true, message: "请填写原因" }]
            },
            showCheck: false,
            saving: false
        };
    },
    created() {
        this.manhourId = this.$route.params.manhourId;
        this.formData.checkUserId = this.userId;
        this.getManhourInfo();
        this.getManhourApproverList();
    },
    computed: {
        ...mapGetters(["permissions", "userId"])
    },
    methods: {
        getManhourInfo() {
            getManhourInfo(this.manhourId).then(response => {
                this.manhourInfo = response.data.data;
                this.checkHour = parseFloat(this.manhourInfo.useHour);
                this.maxCheckHour = parseFloat(this.manhourInfo.useHour);
            });
        },
        getManhourApproverList() {
            getManhourApproverList(this.manhourId).then(response => {
                this.approverList = response.data.data;

                this.approverList.forEach((item, index) => {
                    if (
                        item.check == 0 &&
                        item.userId == this.formData.checkUserId
                    ) {
                        this.formData.approverId = item.approverId;
                        this.showCheck = true;
                    }
                });
            });
        },
        backHistory() {
            this.$router.go(-1);
        },
        selectChcek() {
            if (this.formData.check == 1) {
                this.formData.summary = "同意";
            } else {
                //this.checkHour = 0.5;
                this.formData.summary = "";
            }
        },
        onSubmit() {
            this.formData.checkMin = this.checkHour * 60;
            if (this.formData.checkMin <= 0){
                this.$message.error("请选择审批工时");
                this.saving = false;
                return;
            }
            updateManhourApprover(this.formData)
                .then(res => {
                    if (res.data.data) {
                        this.backHistory();
                    }
                })
                .finally(() => {
                    this.saving = false;
                });
        }
    }
};
</script>

<style scoped>
table {
    margin-top: 20px;
    color: #1f2d3d;
    width: 100%;
    border-right: 1px solid #c8cbce;
    border-bottom: 1px solid #c8cbce;
}
table td {
    padding: 10px 0;
    border-left: 1px solid #c8cbce;
    border-top: 1px solid #c8cbce;
}
.el-tag {
    line-height: 16px;
    height: auto;
}
.submit {
    float: right;
    margin-top: -10px;
}
.back {
    margin-top: 10px;
}
.title {
    text-align: center;
}
.name {
    font-size: 21px;
    color: #1f2d3d;
    padding: 10px 0 5px 0;
}
.result {
    max-width: 800px;
    height: 100px;
    border: 1px solid #f1f3f4;
    margin-top: 50px;
}
.avatar {
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
    height: 45px;
    width: 45px;
}
.username {
    margin-top: 22px;
    position: absolute;
}
.res {
    max-width: 800px;
    height: 200px;
    border: 1px solid #f1f3f4;
    padding: 10px;
}
.commit {
    float: right;
    margin-top: -20px;
    right: 10px;
    position: relative;
    border: 0;
    padding: 5px 8px;
    border-radius: 10%;
    color: #ffffff;
}
.checkSty {
    float: right;
    right: 10px;
    margin-top: -60px;
    position: relative;
    line-height: 32px;
    height: 32px;
}
</style>
