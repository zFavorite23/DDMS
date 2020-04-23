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
            <el-form-item label="头像：">
                <el-upload
                    class="avatar-uploader"
                    :action="uploadUrl"
                    name="file"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                >
                    <img
                        v-if="formData.avatar"
                        :src="formData.avatar"
                        class="avatar"
                    />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>

            <el-form-item label="姓名：" prop="username">
                <el-input
                    v-model="formData.username"
                    placeholder="请姓入姓名"
                    :disabled="true"
                ></el-input>
            </el-form-item>

            <el-form-item label="手机号：" prop="phone">
                <el-input
                    v-model="formData.phone"
                    placeholder="请姓入姓名"
                    :disabled="true"
                ></el-input>
            </el-form-item>

            <el-form-item label="密码：" prop="password">
                <el-input
                    v-model="formData.newpassword1"
                    placeholder="请输入密码"
                    minlength="6"
                    maxlength="50"
                    show-word-limit
                ></el-input>
            </el-form-item>

            <el-form-item label="入职时间：" prop="joinedTime">
                <el-input
                    v-model="formData.joinedTime"
                    placeholder="请选择入职时间"
                    :disabled="true"
                ></el-input>
            </el-form-item>
            <el-form-item label="绑定微信：">
                <!--                <el-link v-if="formData.wxOpenid" type="success">已绑定</el-link>-->
                <!--                <el-link v-else type="danger">未绑定</el-link>-->
                <el-button v-if="formData.wxOpenid" type="success" size="mini"
                    >已绑定</el-button
                >
                <el-button v-else type="danger" size="mini">去绑定</el-button>

                <el-button v-if="formData.wxOpenid" type="primary" size="mini" @click="getWeixinAvatar">获取微信头像</el-button>
            </el-form-item>
            <el-form-item style="text-align: center" class="save">
                <el-button type="primary" @click="onSubmit" :loading="saving"
                    >保存</el-button
                >
                <el-button @click="backHistory">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { getUserInfo, editUser, getWeixinAvatar} from "../../api/admin/user.js";
import { mapGetters } from "vuex";
export default {
    data() {
        let validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else {
                if (!/^[0-9A-Za-z]{6,15}$/.test(value)) {
                    callback(new Error("密码少于6位"));
                }
                callback();
            }
        };
        return {
            formData: {
                userId: "",
                username: "",
                avatar: "",
                phone: "",
                newpassword1: "",
                joinedTime: "",
                wxOpenid: ""
            },
            saving: false,
            rules: {
                password: [
                    {
                        required: true,
                        message: "请输入新密码",
                        trigger: "blur"
                    },
                    { validator: validatePass, trigger: "blur" }
                ]
            },
            uploadUrl: "",
        };
    },
    created() {
        this.formData.userId = this.userId;
        this.getUserInfo();
        this.uploadUrl = `${window.location.origin}/admin/user/file/upload`;
    },
    computed: {
        ...mapGetters(["permissions", "userId"])
    },
    methods: {
        getUserInfo() {
            getUserInfo(this.formData.userId).then(response => {
                if (response.data.data) {
                    const userInfo = response.data.data;
                    this.formData.username = userInfo.username;
                    this.formData.avatar = userInfo.avatar;
                    this.formData.phone = userInfo.phone;
                    this.formData.joinedTime = userInfo.joinedTime;
                    this.formData.wxOpenid = userInfo.wxOpenid;
                }
            });
        },
        backHistory() {
            this.$router.go(-1);
        },
        handleAvatarSuccess(res, file) {
            var avatarUrl = `${window.location.origin}/admin/user/file/` + res.data.bucketName + "-" + res.data.fileName;
            this.formData.avatar = avatarUrl;
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === "image/jpeg";
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error("上传头像图片只能是 JPG 格式!");
            }
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            return isJPG && isLt2M;
        },
        onSubmit() {
            if (this.formData.phone.indexOf("*") != -1) {
                this.formData.phone = "";
            }
            editUser(this.formData)
                .then(res => {
                    if (res.data.data) {
                        this.$message({
                            message: "修改成功",
                            type: "success"
                        });
                        // 刷新表单
                        this.$store.dispatch("loginOut").then(() => {
                            location.reload(); // 为了重新实例化vue-router对象 避免bug
                        });
                    }
                })
                .finally(() => {
                    this.saving = false;
                });
        },
        getWeixinAvatar() {
            getWeixinAvatar(this.formData.userId).then(response => {
                if (response.data.data) {
                    this.formData.avatar = response.data.data;
                    //console.log(response.data.data)
                }
            })
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
@media screen and (min-width: 1300px) {
    .el-input {
        width: 300%;
    }
    .el-textarea {
        width: 400% !important;
    }
}
@media screen and (max-width: 320px) {
    .el-input {
        width: 85% !important;
    }
    .save {
        margin-left: -45%;
    }
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
