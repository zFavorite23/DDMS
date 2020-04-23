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
            <el-form-item label="级别：">
                <el-select
                    v-model="formData.level"
                    placeholder="请选择"
                    style="width: 230px;"
                >
                    <el-option
                        v-for="(item, index) in levelptions"
                        :value="item.value"
                        :key="index"
                        :label="item.label"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="工种类型：" prop="type">
                <el-radio-group
                    v-model="formData.type">
                    <el-radio label="1">行政工种</el-radio>
                    <el-radio label="2">销售工种</el-radio>
                    <el-radio label="3">技术工种</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="工种名称：" prop="name">
                <el-input
                    type="text"
                    placeholder="请填写工种名称"
                    v-model="formData.name"
                    maxlength="20"
                    show-word-limit
                    class="elInput"
                ></el-input>
            </el-form-item>

            <el-form-item label="最低到手月薪：" prop="minSalary">
                <el-input
                    type="number"
                    placeholder="请填写最低到手月薪"
                    v-model="formData.minSalary"
                    :max="50000"
                    class="elInput"
                ></el-input>
            </el-form-item>
            <el-form-item label="最高到手月薪：" prop="maxSalary">
                <el-input
                    type="number"
                    placeholder="请填写最高到手月薪"
                    v-model="formData.maxSalary"
                    :max="50000"
                    class="elInput"
                ></el-input>
            </el-form-item>
            <el-form-item label="最低预估绩效：" prop="minBonus">
                <el-input
                    type="number"
                    placeholder="请填写最低预估绩效"
                    v-model="formData.minBonus"
                    :max="50000"
                    class="elInput"
                ></el-input>
            </el-form-item>
            <el-form-item label="最高预估绩效：" prop="maxBonus">
                <el-input
                    type="number"
                    placeholder="请填写最高预估绩效"
                    v-model="formData.maxBonus"
                    :max="50000"
                    class="elInput"
                ></el-input>
            </el-form-item>


            <el-form-item label="岗位要求：" prop="require">
                <el-input
                    type="textarea"
                    v-model="formData.require"
                    placeholder="请输入岗位要求"
                    maxlength="1000"
                    show-word-limit
                ></el-input>
            </el-form-item>
            <el-form-item style="text-align: center" class="save">
                <el-button
                    type="primary"
                    @click="onSubmit"
                    :loading="saving"
                    >保存</el-button
                >
                <el-button @click="backHistory">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { getApplyUserInfo } from "../../../api/admin/user.js";
import {
    getAbnormalSeven,
    getClockInfo
} from "../../../api/checkwork/clock.js";
import { addObj, editObj } from "../../../api/apply/clock.js";
import { getClockNum } from "../../../api/checkwork/month.js";
import { getStandardApplyInfoById } from "../../../api/standard/apply.js";
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            query: {
                itemId: null,
                userId: null,
                deptId: null
            },
            formData: {
                newData: true,
                require: "",
            },
            saving: false,
            rules: {
                require: [{ required: true, message: "请填写事由" }]
            },
            levelptions: [
                {
                    label: "1级",
                    value: "1"
                },
                {
                    label: "2级",
                    value: "2"
                },
                {
                    label: "3级",
                    value: "3"
                },
                {
                    label: "4级",
                    value: "4"
                },
                {
                    label: "5级",
                    value: "5"
                },
                {
                    label: "6级",
                    value: "6"
                },
                {
                    label: "7级",
                    value: "7"
                },
                {
                    label: "8级",
                    value: "8"
                }
            ]
        };
    },
    created() {

    },
    computed: {
        ...mapGetters(["permissions", "userId"])
    },
    methods: {
        backHistory() {
            this.$router.go(-1);
        },
        onSubmit() {
            this.$refs["formData"].validate(valid => {
                if (valid) {
                    this.saving = true;
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

</style>
