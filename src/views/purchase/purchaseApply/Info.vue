<template>
    <div>
        <el-button @click="backHistory" class="back">返回</el-button>

        <el-row :gutter="20">
            <el-col :xs="{ span: 24 }" :md="{ span: 12 }">
                <div class="title" style="margin-bottom:20px;">
                    <p class="name">采购申请单</p>
                    <table border="0" cellpadding="0" cellspacing="0">
                        <tr>
                            <td>申请人</td>
                            <td colspan="3">{{ purchaseInfo.applyUserName }}</td>
                        </tr>
                        <tr>
                            <td>项目名称</td>
                            <td colspan="3" v-if="purchaseInfo.alias != null && purchaseInfo.aliasNext == null">{{ purchaseInfo.alias }}</td>
                            <td colspan="3" v-else-if="purchaseInfo.alias != null && purchaseInfo.aliasNext != null">{{ purchaseInfo.aliasNext }} / {{ purchaseInfo.alias }}</td>
                            <td colspan="3" v-else>与项目无关</td>
                        </tr>
                        <tr>
                            <td width="100">总分类</td>
                            <td>{{ purchaseInfo.type1Name }}</td>

                            <td width="100">明细分类</td>
                            <td>{{ purchaseInfo.type3Name }}</td>
                        </tr>
                        <tr>
                            <td>采购物品名称</td>
                            <td colspan="3">{{ purchaseInfo.name }}</td>
                        </tr>
                        <tr>
                            <td>数量</td>
                            <td colspan="3">{{ purchaseInfo.num }}</td>
                        </tr>
                        <tr>
                            <td>单价</td>
                            <td colspan="3">{{ purchaseInfo.priceYuan }}</td>
                        </tr>
                        <tr>
                            <td>总价</td>
                            <td colspan="3">{{ purchaseInfo.guessPriceYuan }}</td>
                        </tr>
                        <tr>
                            <td>具体需求</td>
                            <td colspan="3">{{ purchaseInfo.demand }}</td>
                        </tr>
                        <tr>
                            <td>京东/淘宝链接</td>
                            <td colspan="3"><el-link type="primary" :href="purchaseInfo.buyUrl" target="_blank">链接</el-link></td>
                        </tr>
                        <tr>
                            <td>备注</td>
                            <td colspan="3">{{ purchaseInfo.remark }}</td>
                        </tr>
                        <tr>
                            <td>预计到货时间</td>
                            <td colspan="3">{{ purchaseInfo.guessTime }}</td>
                        </tr>
                        <tr>
                            <td>型号参数</td>
                            <td colspan="3">{{ purchaseInfo.model }}</td>
                        </tr>
                        <tr>
                            <td>型号参数图片</td>
                            <td colspan="3" v-if="purchaseInfo.purchaseImg">
                                <el-image v-for="(url, index) in urls2" :key="url" :src="url" lazy @click="onPreview2(index)"></el-image>
                                <el-image-viewer v-if="showViewer" :on-close="closeViewer" :url-list="[url]"></el-image-viewer>
                            </td>
                            <td colspan="3" v-else><span>无</span></td>
                        </tr>
                        <tr>
                            <td>状态</td>
                            <td colspan="3" v-if="purchaseInfo.status == 0"><el-tag type="warning">审批中</el-tag></td>
                            <td colspan="3" v-if="purchaseInfo.status == 1"><el-tag type="success">已同意</el-tag></td>
                            <td colspan="3" v-if="purchaseInfo.status == 2"><el-tag type="danger">已拒绝</el-tag></td>
                        </tr>
                    </table>
                </div>
                <div><p class="name">审批结果</p></div>
                <div class="result" v-for="approver in approverList">
                    <el-avatar size="medium" :src="approver.checkUserAvatar" class="avatar"></el-avatar>
                    <span class="username" style="color: #65CEA7;">
                        {{ approver.checkUserName }}
                        <i class="el-icon-time" style="color: #000;margin-left: 10px;margin-right: 5px" v-if="approver.check > 0"></i>
                        <span style="color: #000" v-if="approver.check > 0">{{ approver.updateTime }}</span>
                    </span>
                    <span style="color: #000000;margin-top: 45px;position: absolute;font-size: 12px">审批意见：{{ approver.summary }}</span>
                    <div>
                        <span v-if="approver.check == 0 && approver.isBeing == 1">
                            <el-tag class="checkSty" type="warning">
                                <i class="el-icon-loading" style="margin-right:5px"></i>
                                审批中
                            </el-tag>
                        </span>
                        <span v-if="approver.check == 0 && approver.isBeing == 0">
                            <el-tag class="checkSty" type="">
                                <i class="el-icon-loading" style="margin-right:5px"></i>
                                待审批
                            </el-tag>
                        </span>
                        <span v-if="approver.check == 1">
                            <el-tag class="checkSty" type="success">
                                <i class="el-icon-success" style="margin-right:5px"></i>
                                已同意
                            </el-tag>
                        </span>
                        <span v-if="approver.check == 2">
                            <el-tag class="checkSty" type="danger">
                                <i class="el-icon-error" style="margin-right:5px"></i>
                                已拒绝
                            </el-tag>
                        </span>
                    </div>
                </div>

                <div v-if="showCheck">
                    <div class="title left"><p class="name">审批</p></div>
                    <el-alert title="审批流程不可逆转" type="warning"></el-alert>
                    <el-form :model="formData" :rules="rules" ref="formData" label-width="100px" class="demo-ruleForm res" style="width: 100%">
                        <el-form-item label="采购负责人：" prop="principalId">
                            <el-select v-model="formData.principalId" placeholder="请选择">
                                <el-option v-for="item in BusinessList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-radio-group v-model="formData.check" @change="selectChcek" style="margin-top: 10px;margin-left: 20px">
                            <el-radio label="1">同意</el-radio>
                            <el-radio label="2">拒绝</el-radio>
                        </el-radio-group>
                        <el-form-item prop="summary" style="margin-left: -100px;margin-top: 10px">
                            <el-input type="textarea" v-model="formData.summary" placeholder="请填写原因" maxlength="30" show-word-limit></el-input>
                        </el-form-item>
                        <el-form-item><el-button type="success" class="submit" @click="onSubmit" :loading="saving">提交</el-button></el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { getPurchaseInfo, updatePurchaseApprover, getBusinessDept } from '../../../api/purchase/purchase.js';
import { mapGetters } from 'vuex';
import ElImageViewer from 'element-ui/packages/image/src/image-viewer';

export default {
    components: { ElImageViewer },
    data() {
        return {
            purchaseId: null,
            purchaseInfo: '',
            approverList: [],
            url: '',
            urls2: [],
            showViewer: false, // 显示查看器
            formData: {
                userId: null,
                approverId: null,
                userId: null,
                check: '1',
                summary: '同意',
                principalId: ''
            },
            query: {
                deptId: 3100
            },
            rules: {
                summary: [{ required: true, message: '请填写原因' }],
                principalId: [{ required: true, message: '请选择采购负责人', trigger: 'change' }]
            },
            showCheck: false,
            saving: false,
            BusinessList: []
        };
    },
    computed: {
        ...mapGetters(['permissions', 'userId'])
    },
    created() {
        this.purchaseId = this.$route.params.purchaseId;
        this.getPurchaseInfo();
        this.formData.userId = this.userId;
        this.getBusinessDept(this.query);
    },
    methods: {
        backHistory() {
            this.$router.go(-1);
        },
        getPurchaseInfo() {
            getPurchaseInfo(this.purchaseId).then(res => {
                this.purchaseInfo = res.data.data;
                console.log(this.purchaseInfo);
                this.formData.principalId = this.purchaseInfo.principalId;
                this.approverList = res.data.data.checkUserList;
                this.approverList.forEach((item, index) => {
                    if (item.check == 0 && item.isBeing == 1 && item.userId == this.formData.userId) {
                        this.formData.approverId = item.approverId;
                        this.showCheck = true;
                    }
                });
                this.urls2 = [];
                if (this.purchaseInfo.purchaseImg) {
                    this.purchaseInfo.purchaseImg.split(',').forEach((item, index) => {
                        if (item) {
                            this.urls2.push(`${window.location.origin}/apply/purchase/` + item);
                        }
                    });
                }
            });
        },
        selectChcek() {
            if (this.formData.check == 1) {
                this.formData.summary = '同意';
            } else {
                this.formData.summary = '';
            }
        },
        onSubmit() {
            this.$refs['formData'].validate(valid => {
                console.log(this.formData);

                if (valid) {
                    updatePurchaseApprover(this.formData)
                        .then(res => {
                            // console.log(res);
                            if (res.data.data) {
                                this.backHistory();
                            }
                        })
                        .finally(() => {
                            this.saving = false;
                        });

                    // console.log(this.formData);
                }
            });
        },
        getBusinessDept(id) {
            getBusinessDept(id).then(res => {
                // console.log(res);
                res.data.data.forEach(item => {
                    this.BusinessList.push({
                        value: item.userId,
                        label: item.username
                    });
                });
            });
        },
        closeViewer() {
            this.showViewer = false;
            this.url = '';
        },
        onPreview2(val) {
            this.url = this.urls2[val];
            this.showViewer = true;
        }
    }
};
</script>

<style scoped>
.paste {
    display: none;
}
.line {
    display: none;
}
@page {
    size: auto; /* auto is the initial value */
    margin: 0mm; /* this affects the margin in the printer settings */
}
html {
    background-color: #ffffff;
    margin: 0px; /* this affects the margin on the html before sending to printer */
}
body {
    border: solid 1px blue;
    margin: 10mm 15mm 10mm 15mm; /* margin you want for the content */
}
table {
    margin-top: 20px;
    color: #1f2d3d;
    width: 100%;
    border-right: 1px solid #1f2d3d;
    border-bottom: 1px solid #1f2d3d;
}
table td {
    padding: 10px 0;
    border-left: 1px solid #1f2d3d;
    border-top: 1px solid #1f2d3d;
}
.el-tag {
    line-height: 16px;
    height: auto;
}
.el-image {
    width: 100px;
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
    text-align: center;
}
.time {
    font-size: 16px;
    color: #9d9e61;
    padding: 10px 0;
}
.result {
    max-width: 800px;
    height: 100px;
    border: 1px solid #f1f3f4;
    margin-bottom: 10px;
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
    height: 225px;
    border: 1px solid #f1f3f4;
    padding: 10px;
}
.submit {
    float: right;
    margin-top: -10px;
}

.checkSty {
    float: right;
    right: 10px;
    margin-top: -60px;
    position: relative;
    line-height: 32px;
    height: 32px;
}
.result {
    max-width: 800px;
    height: 100px;
    border: 1px solid #f1f3f4;
    margin-bottom: 10px;
}
.avatar {
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
    height: 45px;
    width: 45px;
}
.print {
    float: right;
    background-color: #65cea7;
    color: #ffffff;
    position: absolute;
    right: 3%;
}
</style>
