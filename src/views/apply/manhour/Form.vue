<template>
    <div>
        <el-form
            label-position="right"
            :model="formData"
            :rules="rules"
            ref="formData"
            class="form"
            label-width="135px"
        >
            <el-form-item label="填报日期：" prop="hourId">
                <el-select
                    v-model="formData.hourId"
                    placeholder="请选择填报日期"
                    @change="selectWorkDay"
                >
                    <el-option
                        v-for="(item, index) in dayOptions"
                        :value="item.value"
                        :key="index"
                        :label="item.label"
                    >
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="鸡腿数量：" v-if="dayHourInt > 0">
                <p>
                    <el-rate
                        disabled
                        show-score
                        text-color="#ff9900"
                        v-model="dayHourFloat"
                        :max="dayHourInt"
                        :icon-classes="[
                            'icon iconfont iconjitui',
                            'icon iconfont iconjitui',
                            'icon iconfont iconjitui'
                        ]"
                        disabled-void-icon-class="icon iconfont iconjitui"
                        :colors="['#FF9900', '#FF9900', '#FF9900']"
                    >
                    </el-rate>
                </p>
            </el-form-item>

            <el-form-item label="自评积分：" prop="integral">
                <el-select v-model="formData.integral" placeholder="请选择">
                    <el-option
                        v-for="(item, index) in integralOptions"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                    >
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="工作类别：" prop="category">
                <el-radio-group
                    v-model="formData.category"
                    @change="selectcCategory"
                >
                    <el-radio label="1">管理</el-radio>
                    <el-radio label="2">项目</el-radio>
                    <el-radio label="3">产品</el-radio>
                    <el-radio label="4">长身体</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item
                label="主分类："
                prop="mainClassify"
                v-if="formData.category == '1'"
            >
                <el-radio-group v-model="formData.mainClassify">
                    <el-radio label="1">公司管理</el-radio>
                    <el-radio label="2">财务管理</el-radio>
                    <el-radio label="3">人事管理</el-radio>
                    <el-radio label="4">部门管理</el-radio>
                    <el-radio label="5">工厂管理</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item
                label="项目："
                prop="itemId"
                v-if="formData.category == '2'"
            >
                <el-select
                    v-model="formData.itemId"
                    placeholder="请选择"
                    style="width: 230px;"
                    @change="selectcItem"
                >
                    <el-option
                        v-for="(item, index) in itemOptions"
                        :value="item.value"
                        :key="index"
                        :label="item.label"
                    >
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item
                label="产品："
                prop="itemId"
                v-if="formData.category == '3'"
            >
                <el-select
                    v-model="formData.itemId"
                    placeholder="请选择"
                    style="width: 230px;"
                    @change="selectcItem"
                >
                    <el-option
                        v-for="(item, index) in productOptions"
                        :value="item.value"
                        :key="index"
                        :label="item.label"
                    >
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item
                label="子分类："
                prop="subClassify"
                v-if="
                    (formData.category == '1' && formData.mainClassify != '') ||
                        formData.category == '2' ||
                        formData.category == '3' ||
                        formData.category == '4'
                "
            >
                <el-radio-group v-model="formData.subClassify">
                    <el-radio
                        v-if="
                            formData.category == '1' &&
                                formData.mainClassify == '1'
                        "
                        label="1"
                        >公司战略规划</el-radio
                    >
                    <el-radio
                        v-if="
                            formData.category == '1' &&
                                formData.mainClassify == '1'
                        "
                        label="2"
                        >客户对接</el-radio
                    >
                    <el-radio
                        v-if="
                            formData.category == '1' &&
                                formData.mainClassify == '1'
                        "
                        label="3"
                        >项目对接</el-radio
                    >
                    <el-radio
                        v-if="
                            formData.category == '1' &&
                                formData.mainClassify == '1'
                        "
                        label="4"
                        >人员管理及招聘</el-radio
                    >
                    <el-radio
                        v-if="
                            formData.category == '1' &&
                                formData.mainClassify == '1'
                        "
                        label="5"
                        >其他事务</el-radio
                    >

                    <el-radio
                        v-if="
                            formData.category == '1' &&
                                formData.mainClassify == '2'
                        "
                        label="1"
                        >开票</el-radio
                    >
                    <el-radio
                        v-if="
                            formData.category == '1' &&
                                formData.mainClassify == '2'
                        "
                        label="2"
                        >支付</el-radio
                    >
                    <el-radio
                        v-if="
                            formData.category == '1' &&
                                formData.mainClassify == '2'
                        "
                        label="3"
                        >税筹</el-radio
                    >
                    <el-radio
                        v-if="
                            formData.category == '1' &&
                                formData.mainClassify == '2'
                        "
                        label="4"
                        >账务处理</el-radio
                    >
                    <el-radio
                        v-if="
                            formData.category == '1' &&
                                formData.mainClassify == '2'
                        "
                        label="5"
                        >预算</el-radio
                    >
                    <el-radio
                        v-if="
                            formData.category == '1' &&
                                formData.mainClassify == '2'
                        "
                        label="6"
                        >补贴申报</el-radio
                    >
                    <el-radio
                        v-if="
                            formData.category == '1' &&
                                formData.mainClassify == '2'
                        "
                        label="7"
                        >其他事务</el-radio
                    >

                    <el-radio
                        v-if="
                            formData.category == '1' &&
                                formData.mainClassify == '3'
                        "
                        label="1"
                        >薪酬福利管理</el-radio
                    >
                    <el-radio
                        v-if="
                            formData.category == '1' &&
                                formData.mainClassify == '3'
                        "
                        label="2"
                        >考勤管理</el-radio
                    >
                    <el-radio
                        v-if="
                            formData.category == '1' &&
                                formData.mainClassify == '3'
                        "
                        label="3"
                        >员工入职手续办理</el-radio
                    >
                    <el-radio
                        v-if="
                            formData.category == '1' &&
                                formData.mainClassify == '3'
                        "
                        label="4"
                        >招聘</el-radio
                    >
                    <el-radio
                        v-if="
                            formData.category == '1' &&
                                formData.mainClassify == '3'
                        "
                        label="5"
                        >培训</el-radio
                    >
                    <el-radio
                        v-if="
                            formData.category == '1' &&
                                formData.mainClassify == '3'
                        "
                        label="6"
                        >员工关系管理</el-radio
                    >
                    <el-radio
                        v-if="
                            formData.category == '1' &&
                                formData.mainClassify == '3'
                        "
                        label="7"
                        >其他事务</el-radio
                    >

                    <el-radio
                        v-if="
                            formData.category == '1' &&
                                formData.mainClassify == '4'
                        "
                        label="1"
                        >人员招聘</el-radio
                    >
                    <el-radio
                        v-if="
                            formData.category == '1' &&
                                formData.mainClassify == '4'
                        "
                        label="2"
                        >人员管理及培训</el-radio
                    >
                    <el-radio
                        v-if="
                            formData.category == '1' &&
                                formData.mainClassify == '4'
                        "
                        label="3"
                        >部门发展计划</el-radio
                    >
                    <el-radio
                        v-if="
                            formData.category == '1' &&
                                formData.mainClassify == '4'
                        "
                        label="4"
                        >工作流程</el-radio
                    >
                    <el-radio
                        v-if="
                            formData.category == '1' &&
                                formData.mainClassify == '4'
                        "
                        label="5"
                        >其他日常事务</el-radio
                    >

                    <el-radio
                        v-if="
                            formData.category == '1' &&
                                formData.mainClassify == '5'
                        "
                        label="1"
                        >工厂备料</el-radio
                    >
                    <el-radio
                        v-if="
                            formData.category == '1' &&
                                formData.mainClassify == '5'
                        "
                        label="2"
                        >环境卫生</el-radio
                    >
                    <el-radio
                        v-if="
                            formData.category == '1' &&
                                formData.mainClassify == '5'
                        "
                        label="3"
                        >房租水电</el-radio
                    >
                    <el-radio
                        v-if="
                            formData.category == '1' &&
                                formData.mainClassify == '5'
                        "
                        label="4"
                        >其他事务</el-radio
                    >

                    <el-radio v-if="formData.category == '2'" label="1"
                        >管理</el-radio
                    >
                    <el-radio v-if="formData.category == '2'" label="2"
                        >销售</el-radio
                    >
                    <el-radio v-if="formData.category == '2'" label="3"
                        >售前</el-radio
                    >
                    <el-radio v-if="formData.category == '2'" label="4"
                        >交付</el-radio
                    >
                    <el-radio v-if="formData.category == '2'" label="5"
                        >产品</el-radio
                    >

                    <el-radio v-if="formData.category == '3'" label="1"
                        >管理</el-radio
                    >
                    <el-radio v-if="formData.category == '3'" label="2"
                        >交付</el-radio
                    >

                    <el-radio v-if="formData.category == '4'" label="1"
                        >学习</el-radio
                    >
                    <el-radio v-if="formData.category == '4'" label="2"
                        >吃饭</el-radio
                    >
                    <el-radio v-if="formData.category == '4'" label="3"
                        >睡觉</el-radio
                    >
                </el-radio-group>
            </el-form-item>

            <el-form-item label="工作内容：" prop="reason">
                <el-input
                    type="textarea"
                    v-model="formData.reason"
                    placeholder="请填写工作内容"
                    maxlength="100"
                    show-word-limit
                ></el-input>
            </el-form-item>

            <el-form-item label="验收人：" prop="approverids">
                <el-select v-model="formData.approverids" placeholder="请选择">
                    <el-option
                        v-for="(item, index) in applyUserList"
                        :label="item.label"
                        :key="index"
                        :value="item.value"
                    >
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="工时(小时)：" prop="useHour">
                <el-input-number
                    v-model="useHour"
                    size="small"
                    controls-position="right"
                    :precision="1"
                    :step="0.5"
                    :min="0.0"
                    :max="maxUseHour"
                >
                </el-input-number>
            </el-form-item>

            <el-form-item label="完成情况：" prop="complete">
                <el-select v-model="formData.complete" placeholder="请选择">
                    <el-option
                        v-for="(item, index) in completeOptions"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                    >
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item
                label="预计完成时间："
                prop="completeTime"
                v-if="formData.complete != 100"
            >
                <el-date-picker
                    v-model="formData.completeTime"
                    :picker-options="pickerOptions"
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                >
                </el-date-picker>
            </el-form-item>

            <el-form-item
                label="保存为草稿："
            >
                <el-radio v-model="formData.isDraft" label="0">否</el-radio>
                <el-radio v-model="formData.isDraft" label="1">是</el-radio>
            </el-form-item>

            <el-form-item style="text-align: left" class="save">
                <el-button type="primary" @click="onSubmit" :loading="saving">保存</el-button>
                <el-button @click="backHistory">取消</el-button>
            </el-form-item>
        </el-form>
        <el-button type="primary" class="invoiceRules" @click="open"
            >工时规范</el-button
        >
    </div>
</template>
<script>
import { addObj, editObj } from "../../../api/apply/manhour.js";
import { getApplyUserInfo } from "../../../api/admin/user.js";
import {
    getAbnormalSeven,
    getClockHourInfo
} from "../../../api/checkwork/hour.js";
import { getItemVosWithUserId } from "../../../api/project/team.js";
import { getStandardApplyInfoById } from "../../../api/standard/apply.js";
import { mapGetters } from "vuex";
export default {
    data() {
        var validateUseHour = (rule, value, callback) => {
            // if (!reg.test(value)) {
            //     callback(new Error('密码应是6-12位数字、字母或字符！'))
            // } else if (this.form.oldPasswd === value) {
            //     callback(new Error('新密码与旧密码不可一致！'))
            // } else {
            //     callback()
            // }
            if (parseFloat(value) <= 0){
                callback(new Error('请选择对应工时！'))
            } else {
                callback()
            }
        };
        return {
            query: {
                itemId: null,
                userId: null,
                deptId: null,
                type: 1
            },
            dayHourInt: 0.0,
            useHour: 0.0,
            maxUseHour: 0.0,

            formData: {
                newData: true,
                manhourId: null,
                userId: null,
                itemId: null,
                hourId: "",
                day: "",
                integral: 0,
                category: "",
                mainClassify: "",
                subClassify: "",
                reason: "",
                approverids: 0,
                useMin: 0,
                complete: "100",
                completeTime: "",
                isDraft: '0'
            },
            dayOptions: [
                // {
                //     label:"2020-01-08",
                //     value:"2020-01-08"
                // }
            ],
            integralOptions: [
                { value: 0, label: "0分" },
                { value: 1, label: "1分" },
                { value: 2, label: "2分" },
                { value: 3, label: "3分" },
                { value: 4, label: "4分" },
                { value: 5, label: "5分" }
            ],
            itemOptions: [],
            productOptions: [],
            completeOptions: [
                { value: "0", label: "未完成" },
                { value: "100", label: "已完成" },
                { value: "10", label: "完成10%" },
                { value: "20", label: "完成20%" },
                { value: "30", label: "完成30%" },
                { value: "40", label: "完成40%" },
                { value: "50", label: "完成50%" },
                { value: "60", label: "完成60%" },
                { value: "70", label: "完成70%" },
                { value: "80", label: "完成80%" },
                { value: "90", label: "完成90%" }
            ],
            saving: false,
            rules: {
                hourId: [
                    {
                        required: true,
                        message: "请选择填报日期",
                        trigger: "change"
                    }
                ],
                integral: [
                    {
                        required: true,
                        message: "请选择自评积分",
                        trigger: "change"
                    }
                ],
                category: [
                    {
                        required: true,
                        message: "请选择工作类别",
                        trigger: "change"
                    }
                ],
                mainClassify: [
                    {
                        required: true,
                        message: "请选择主分类",
                        trigger: "change"
                    }
                ],
                itemId: [
                    { required: true, message: "请选择", trigger: "change" }
                ],
                subClassify: [
                    {
                        required: true,
                        message: "请选择子分类",
                        trigger: "change"
                    }
                ],
                reason: [{ required: true, message: "请填写工作内容" }],
                approverids: [
                    {
                        required: true,
                        message: "请选择验收人",
                        trigger: "change"
                    }
                ],
                useHour: [{ validator: validateUseHour, trigger: 'blur' }],
                complete: [
                    {
                        required: true,
                        message: "请选择完成情况",
                        trigger: "change"
                    }
                ],
                completeTime: [
                    {
                        required: true,
                        message: "请选择预计完成时间",
                        trigger: "change"
                    }
                ]
            },
            applyUserList: [{ value: 0, label: "无人验收" }],
            applyClockInfo: "",
            pickerOptions: {
                disabledDate(time) {
                    return (
                        time.getTime() <
                        new Date().getTime() - 3600 * 1000 * 24 * 10 ||
                        time.getTime() >
                        new Date().getTime() + 3600 * 1000 * 24 * 20
                    );
                }
            }
        };
    },
    created() {
        this.getStandardApplyInfo();
        this.formData.userId = this.userId;
        this.query.userId = this.userId;
        this.getAbnormalSeven();
        this.getItemVosWithUserId();
        const editManhourInfo = JSON.parse(
            window.localStorage.getItem("editManhourInfo")
        );
        if (editManhourInfo) {
            this.formData.newData = false;
            this.formData.manhourId = editManhourInfo.manhourId;
            this.formData.userId = editManhourInfo.userId;
            this.formData.hourId = editManhourInfo.hourId;
            this.formData.day = editManhourInfo.day;
            this.formData.integral = editManhourInfo.integral;
            this.formData.category = editManhourInfo.category;
            this.formData.mainClassify = editManhourInfo.mainClassify;
            this.formData.subClassify = editManhourInfo.subClassify;
            this.formData.reason = editManhourInfo.reason;
            this.formData.approverids = editManhourInfo.approverids;
            this.formData.isDraft = editManhourInfo.isDraft;
            this.useHour = parseFloat(editManhourInfo.useHour);
            this.formData.complete = editManhourInfo.complete;
            this.formData.completeTime = editManhourInfo.completeTime;
            this.selectWorkDayByEdit(editManhourInfo);
        }
    },
    computed: {
        ...mapGetters(["permissions", "userId"])
    },
    methods: {

        selectWorkDayByEdit(data){
            getClockHourInfo(data.hourId).then(response => {
                const clockHourInfo = response.data.data;
                this.formData.day = clockHourInfo.day;
                this.dayHourInt = Math.ceil(clockHourInfo.hour);
                var hour = parseFloat((parseFloat(clockHourInfo.hour) - parseFloat(clockHourInfo.useHour)).toString()).toFixed(1);
                this.dayHourFloat = parseFloat(hour) + data.useMin / 60;
                this.maxUseHour = parseFloat(this.dayHourFloat);
                this.useHour = data.useHour;
            });
        },
        selectWorkDay(val) {
            getClockHourInfo(val).then(response => {
                const clockHourInfo = response.data.data;
                this.formData.day = clockHourInfo.day;
                this.formData.integral = clockHourInfo.integral;
                this.dayHourInt = Math.ceil(clockHourInfo.hour);
                var hour = parseFloat((parseFloat(clockHourInfo.hour) - parseFloat(clockHourInfo.useHour)).toString()).toFixed(1);
                this.dayHourFloat = parseFloat(hour);
                this.maxUseHour = parseFloat(hour)
            });
        },
        selectcCategory(val) {
            if (val == 2 || val == 3) {
                this.formData.itemId = null;
            }else {
                this.getApplyUser();
                // this.applyUserList = [{ value: 0, label: "无人验收" }];
                // this.formData.approverids = 0;
            }
        },

        selectcItem(val) {
            this.query.itemId = val;
            this.getApplyUser();
        },
        getApplyUser() {
            getApplyUserInfo(this.query).then(response => {
                this.applyUserList = [{ value: 0, label: "无人验收" }];
                this.formData.approverids = 0;
                response.data.data.forEach(element => {
                    this.applyUserList.push({
                        value: element.userId,
                        label: element.username
                    });
                });
            })
        },
        getAbnormalSeven() {
            getAbnormalSeven(this.query.userId).then(response => {
                response.data.data.forEach(element => {
                    if (element.min > 0) {
                        this.dayOptions.push({
                            value: element.hourId,
                            label:
                                element.day +
                                " " +
                                (element.min / 60).toFixed(1) +
                                "h"
                        });
                    }
                });
            });
        },
        getItemVosWithUserId() {
            getItemVosWithUserId(this.query.userId).then(response => {
                response.data.data.forEach(element => {
                    if (element.type == 1) {
                        this.itemOptions.push({
                            value: element.itemId,
                            label: element.alias
                        });
                    }
                    if (element.type == 2) {
                        this.productOptions.push({
                            value: element.itemId,
                            label: element.alias
                        });
                    }
                });
            });
        },
        backHistory() {
            window.localStorage.removeItem("editManhourInfo");
            this.formData.newData = true;
            this.formData.manhourId = null;
            this.formData.userId = null;
            this.formData.hourId = "";
            this.formData.day = "";
            this.formData.integral = 3;
            this.formData.category = "";
            this.formData.mainClassify = "";
            this.formData.subClassify = "";
            this.formData.reason = "";
            this.formData.approverids = 0;
            this.formData.useMin = 0;
            this.formData.complete = "100";
            this.formData.completeTime = "";

            this.$router.go(-1);
        },
        onSubmit() {
            this.$refs["formData"].validate(valid => {
                if (valid) {
                    this.saving = true;
                    if (this.useHour > 0) {
                        this.formData.useMin = this.useHour * 60;
                    }

                    if (this.formData.useMin <= 0){
                        this.$message.error("请选择对应工时");
                        this.saving = false;
                        return;
                    }

                    if (!this.formData.newData) {
                        editObj(this.formData)
                            .then(res => {
                                if (res.data.data) {
                                    this.backHistory();
                                }
                            })
                            .finally(() => {
                                this.saving = false;
                            });
                    } else {
                        addObj(this.formData)
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
            });
        },
        getStandardApplyInfo() {
            getStandardApplyInfoById(1).then(response => {
                if (response.data.data) {
                    const data = response.data.data;
                    this.content = data.content;
                    const workStandardApply = JSON.parse(
                        window.localStorage.getItem("workStandardApply")
                    );
                    if (workStandardApply) {
                        if (workStandardApply.version < data.version) {
                            this.open();
                        }
                    } else {
                        this.open();
                    }
                    window.localStorage.setItem(
                        "workStandardApply",
                        JSON.stringify(data)
                    );
                }
            });
        },
        open() {
            let content = this.content.split("\n\n");
            let newDatas = [];
            const h = this.$createElement;
            for (let i in content) {
                newDatas.push(h("p", null, content[i]));
            }
            this.$alert(h("div", null, newDatas), "工时规范");
        }
    },
    mounted() {}
};
</script>
<style type="text/scss" scoped lang="scss">
.el-input .el-input__count .el-input__count-inner {
    height: 50%;
}
.el-image img {
    border-radius: 50%;
}
.el-rate__icon {
    font-size: 2rem !important;
}
</style>
