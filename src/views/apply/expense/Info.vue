<template>
    <div style="max-width: 800px;">
        <el-button @click="backHistory" class="back">返回</el-button>
        <div class="title" style="margin-top: -40px;margin-bottom:20px;">
            <p class="name">支出申请单</p>
            <table border="0" cellspacing="0" cellpadding="0" v-if="expenseInfo">
                <tr v-if="expenseInfo.isPublic == 1">
                    <td>支出名称</td>
                    <td>{{ expenseInfo.name }}</td>
                </tr>
                <tr v-if="expenseInfo.isPublic == 0">
                    <td>采购名称</td>
                    <td>{{ expenseInfo.name }}</td>
                </tr>
                <tr>
                    <td>总分类</td>
                    <td v-if="expenseInfo.classify == 1">项目</td>
                    <td v-else-if="expenseInfo.classify == 2">产品</td>
                    <td v-else-if="expenseInfo.classify == 3">库存</td>
                    <td v-else-if="expenseInfo.classify == 4">其他</td>
                    <td v-else></td>
                </tr>

                <tr v-if="expenseInfo.classify == 1">
                    <td style="width: 35%;">项目</td>
                    <td v-if="expenseInfo.alias != null">{{ expenseInfo.alias }}</td>
                    <td v-else>与项目无关</td>
                </tr>
                <tr v-if="expenseInfo.classify == 2">
                    <td style="width: 35%;">产品</td>
                    <td v-if="expenseInfo.alias != null">{{ expenseInfo.alias }}</td>
                    <td v-else>与项目无关</td>
                </tr>
                <tr v-if="expenseInfo.classify == 3">
                    <td>明细分类</td>
                    <td v-if="expenseInfo.type == 1">研发库存</td>
                    <td v-else-if="expenseInfo.type == 2">产品库存</td>
                    <td v-else></td>
                </tr>
                <tr v-if="expenseInfo.classify == 4">
                    <td>明细分类</td>
                    <td v-if="expenseInfo.type == 1">工具采购</td>
                    <td v-else-if="expenseInfo.type == 2">办公用品</td>
                    <td v-else-if="expenseInfo.type == 3">办公家具</td>
                    <td v-else-if="expenseInfo.type == 4">税款</td>
                    <td v-else-if="expenseInfo.type == 5">会议服务费</td>
					<td v-else-if="expenseInfo.type == 6">管理费</td>
                    <td v-else></td>
                </tr>
                <tr>
                    <td>申请人</td>
                    <td>{{ expenseInfo.applyUserName }}</td>
                </tr>
                <tr>
                    <td>是否对外</td>
                    <td v-if="expenseInfo.isPublic == 0"><el-tag type="danger">否</el-tag></td>
                    <td v-if="expenseInfo.isPublic == 1"><el-tag type="success">是</el-tag></td>
                </tr>

                <tr v-if="expenseInfo.isPublic == 1">
                    <td>公司名称</td>
                    <td>{{ expenseInfo.companyName }}</td>
                </tr>
                <tr v-if="expenseInfo.isPublic == 1">
                    <td>银行名称</td>
                    <td>{{ expenseInfo.bankName }}</td>
                </tr>
                <tr v-if="expenseInfo.isPublic == 1">
                    <td>银行账号</td>
                    <td>{{ expenseInfo.bankAccount }}</td>
                </tr>
                <tr v-if="expenseInfo.isPublic == 1">
                    <td>支出金额</td>
                    <td>{{ expenseInfo.priceYuan }} 元</td>
                </tr>
                <tr v-if="expenseInfo.isPublic == 1">
                    <td>备注信息</td>
                    <td>{{ expenseInfo.remark }}</td>
                </tr>
                <tr v-if="expenseInfo.isPublic == 1">
                    <td>用途及明细</td>
                    <td>{{ expenseInfo.detailed }}</td>
                </tr>

                <tr v-if="expenseInfo.isPublic == 0">
                    <td>厂家名称</td>
                    <td>{{ expenseInfo.companyName }}</td>
                </tr>
                <tr v-if="expenseInfo.isPublic == 0">
                    <td>联系方式</td>
                    <td>{{ expenseInfo.contact }}</td>
                </tr>
                <tr v-if="expenseInfo.isPublic == 0">
                    <td>购买链接</td>
                    <td>{{ expenseInfo.buyUrl }}</td>
                </tr>
                <tr v-if="expenseInfo.isPublic == 0">
                    <td>型号参数</td>
                    <td>{{ expenseInfo.model }}</td>
                </tr>
                <tr v-if="expenseInfo.isPublic == 0">
                    <td>数量/单位</td>
                    <td>{{ expenseInfo.num }}&nbsp;{{ expenseInfo.unit }}</td>
                </tr>
                <tr v-if="expenseInfo.isPublic == 0">
                    <td>议定单价</td>
                    <td>{{ expenseInfo.priceYuan }} 元</td>
                </tr>

                <tr>
                    <td>合同及附件图片</td>
                    <td v-if="expenseInfo.contract">
                        <el-image v-for="(url, index) in urls2" :key="url" :src="url" lazy @click="onPreview2(index)"></el-image>
                        <el-image-viewer v-if="showViewer" :on-close="closeViewer" :url-list="[url]"></el-image-viewer>
                    </td>
                    <td v-else>无</td>
                </tr>
                <tr>
                    <td>审批状态</td>
                    <td>
                        <span v-if="expenseInfo.status == '0'"><el-tag type="warning">审批中</el-tag></span>
                        <span v-else-if="expenseInfo.status == '1'"><el-tag type="success">已同意</el-tag></span>
                        <span v-else-if="expenseInfo.status == '2'"><el-tag type="danger">已拒绝</el-tag></span>
                        <span v-else></span>
                    </td>
                </tr>
                <tr v-if="(formData.isPublic = '1')">
                    <td>确认状态</td>
                    <td>
                        <span v-if="expenseInfo.isAffirm == '1'"><el-tag type="success">已确认</el-tag></span>
                        <span v-else-if="expenseInfo.isAffirm == '0'"><el-tag type="danger">未确认</el-tag></span>
                        <span v-else></span>
                        &nbsp;&nbsp;
                        <el-button
                            size="mini"
                            type="danger"
                            @click.native="handleModalAffirm(expenseInfo)"
                            v-if="expenseInfo.status == 1 && expenseInfo.isAffirm == 0 && deptId == '7100'"
                        >
                            确认
                        </el-button>
                    </td>
                </tr>
                <tr v-if="expenseInfo.isPublic == 0">
                    <td>采购状态</td>
                    <td>
                        <el-tag v-if="expenseInfo.purchaseStatus == 0" type="warning">未支付</el-tag>
                        <el-tag v-else-if="expenseInfo.purchaseStatus == 1" type="warning">已支付未发货</el-tag>
                        <el-tag v-else-if="expenseInfo.purchaseStatus == 2" type="success">已发货</el-tag>
                        <el-tag v-else-if="expenseInfo.purchaseStatus == 3" type="success">已签收</el-tag>
                        <el-tag v-else-if="expenseInfo.purchaseStatus == 4" type="success">已支付无需发货</el-tag>
                        <el-tag v-else></el-tag>
                        <el-button size="mini" type="danger" @click.native="handleModal(expenseInfo)" v-if="deptId == '3000' || deptId == '3200'">编辑</el-button>
                    </td>
                </tr>
                <tr v-if="expenseInfo.isPublic == 0 && (expenseInfo.purchaseStatus == 2 || expenseInfo.purchaseStatus == 3)">
                    <td>物流信息</td>
                    <td>{{ expenseInfo.expressName }}：{{ expenseInfo.expressNum }}</td>
                </tr>
                <tr>
                    <td>发票信息</td>
                    <td>
                        <span v-if="expenseInfo.invoiceType == 0">无发票</span>
                        <span v-else-if="expenseInfo.invoiceType == 1">专票</span>
                        <span v-else-if="expenseInfo.invoiceType == 2">普票</span>
                        <span v-if="expenseInfo.invoiceType > 0">：{{ expenseInfo.taxRate }} %</span>
                        <el-button size="mini" type="danger" @click.native="handleModalInvoice(expenseInfo)" v-if="deptId == '3000' || deptId == '3200'">编辑</el-button>
                    </td>
                </tr>
                <tr v-if="expenseInfo.invoiceType > 0">
                    <td>发票图片</td>
                    <td v-if="expenseInfo.invoiceImg">
                        <el-image v-for="(url, index) in urls1" :key="url" :src="url" lazy @click="onPreview1(index)"></el-image>
                        <el-image-viewer v-if="showViewer" :on-close="closeViewer" :url-list="[url]"></el-image-viewer>
                    </td>
                    <td v-else>无</td>
                </tr>
                <tr>
                    <td>申请时间</td>
                    <td>{{ expenseInfo.createTime }}</td>
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

        <el-dialog title="修改采购状态" :visible.sync="dialogVisibleExpress" :width="'80%'">
            <el-form :model="editExpressData" :rules="rules" ref="editExpressData" label-width="80px">
                <el-form-item label="状态" prop="purchaseStatus">
                    <el-select v-model="editExpressData.purchaseStatus" placeholder="请选择" @change="selectPurchaseStatus">
                        <el-option v-for="(item, index) in purchaseStatusOptions" :value="item.value" :key="index" :label="item.label"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="快递公司" prop="expressName" v-if="editExpressData.purchaseStatus == 2 || editExpressData.purchaseStatus == 3">
                    <el-input v-model="editExpressData.expressName" placeholder="请填写快递公司"></el-input>
                </el-form-item>
                <el-form-item label="快递单号" prop="expressNum" v-if="editExpressData.purchaseStatus == 2 || editExpressData.purchaseStatus == 3">
                    <el-input v-model="editExpressData.expressNum" placeholder="请填写快递单号"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleSubmit">提 交</el-button>
                <el-button @click="dialogVisibleExpress = false">取 消</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改审批状态" :visible.sync="dialogVisibleInvoice" :width="'80%'">
            <el-form :model="editInvoiceData" :rules="rules" ref="editInvoiceData" label-width="135px">
                <el-form-item label="状态" prop="invoiceType">
                    <el-select v-model="editInvoiceData.invoiceType" placeholder="请选择" @change="selectInvoiceType">
                        <el-option v-for="(item, index) in invoiceTypeOptions" :value="item.value" :key="index" :label="item.label"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="税率" prop="taxRate" v-if="editInvoiceData.invoiceType > 0">
                    <el-input type="number" v-model="editInvoiceData.taxRate" placeholder="请填写税率"></el-input>
                </el-form-item>
                <el-form-item label="发票图片：" v-if="editInvoiceData.invoiceType > 0" prop="invoiceImg">
                    <el-upload
                        class="upload-demo box"
                        :action="uploadUrl"
                        name="file"
                        :on-preview="handlePreview1"
                        :on-remove="handleRemove1"
                        :on-success="handSuccess1"
                        :file-list="fileList1"
                        accept=".png,.jpg,.jpeg,.JPEG,.PNG,.JPG"
                        :auto-upload="true"
                        :before-upload="beforeAvatarUpload"
                        list-type="picture"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleSubmitInvoice">提 交</el-button>
                <el-button @click="dialogVisibleInvoice = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { getExpenseInfo, updateExpress, affirmExpense, getExpenseApproverList, updateExpenseApprover } from '../../../api/apply/expense.js';
import { mapGetters } from 'vuex';
import ElImageViewer from 'element-ui/packages/image/src/image-viewer';
export default {
    components: { ElImageViewer },
    data() {
        return {
            dialogVisibleExpress: false,
            dialogVisibleInvoice: false,
            editExpressData: {
                expenseId: null,
                purchaseStatus: null,
                expressName: '',
                expressNum: ''
            },
            editInvoiceData: {
                expenseId: null,
                invoiceType: '',
                taxRate: '',
                invoiceImg: ''
            },
            purchaseStatusOptions: [
                {
                    value: '0',
                    label: '未支付'
                },
                {
                    value: '1',
                    label: '已支付未发货'
                },
                {
                    value: '2',
                    label: '已发货'
                },
                {
                    value: '3',
                    label: '已签收'
                },
                {
                    value: '4',
                    label: '已支付无需发货'
                }
            ],
            invoiceTypeOptions: [
                {
                    value: '0',
                    label: '无发票'
                },
                {
                    value: '1',
                    label: '专票'
                },
                {
                    value: '2',
                    label: '普票'
                }
            ],
            formData: {
                approverId: null,
                checkUserId: null,
                check: '1',
                summary: '同意'
            },
            expenseId: null,
            expenseInfo: null,
            listLoading: false,
            list: [],
            approverList: [],
            ruleForm: {
                check: '1',
                desc: '同意'
            },
            rules: {
                desc: [{ required: true, message: '请填写批注', trigger: 'blur' }],
                purchaseStatus: [
                    {
                        required: true,
                        message: '请选择采购状态',
                        trigger: 'change'
                    }
                ],
                expressName: [{ required: true, message: '请填写快递公司' }],
                expressNum: [{ required: true, message: '请填写快递单号' }],
                invoiceType: [
                    {
                        required: true,
                        message: '请选择发票状态',
                        trigger: 'change'
                    }
                ],
                taxRate: [{ required: true, message: '请填写税率' }]
            },
            showViewer: false, // 显示查看器
            url: '',
            urls1: [],
            urls2: [],
            showCheck: false,
            saving: false,
            uploadUrl: '',
            fileList1: []
        };
    },
    computed: {
        ...mapGetters(['permissions', 'userId', 'deptId'])
    },
    created() {
        this.expenseId = this.$route.params.expenseId;
        this.formData.checkUserId = this.userId;
        this.getExpenseInfo();
        this.getExpenseApproverList();
        this.uploadUrl = `${window.location.origin}/apply/expense/upload`;
    },
    methods: {
        getExpenseInfo() {
            getExpenseInfo(this.expenseId).then(response => {
                this.expenseInfo = response.data.data;
                if (this.expenseInfo.invoiceImg) {
                    this.expenseInfo.invoiceImg.split(',').forEach((item, index) => {
                        if (item) {
                            this.urls1.push(`${window.location.origin}/apply/expense/` + item);
                        }
                    });
                }
                if (this.expenseInfo.contract) {
                    this.expenseInfo.contract.split(',').forEach((item, index) => {
                        if (item) {
                            this.urls2.push(`${window.location.origin}/apply/expense/` + item);
                        }
                    });
                }
            });
        },
        getExpenseApproverList() {
            getExpenseApproverList(this.expenseId).then(response => {
                this.approverList = response.data.data;
                this.approverList.forEach((item, index) => {
                    if (item.check == '0' && item.isBeing == '1' && item.userId == this.formData.checkUserId) {
                        this.formData.approverId = item.approverId;
                        this.showCheck = true;
                    }
                });
            });
        },
        backHistory() {
            this.$router.go(-1);
        },
        onPreview1(val) {
            this.url = this.urls1[val];
            this.showViewer = true;
        },
        onPreview2(val) {
            this.url = this.urls2[val];
            this.showViewer = true;
        },
        closeViewer() {
            this.showViewer = false;
            this.url = '';
        },
        selectChcek() {
            if (this.formData.check == 1) {
                this.formData.summary = '同意';
            } else {
                this.formData.summary = '';
            }
        },
        onSubmit() {
            updateExpenseApprover(this.formData)
                .then(res => {
                    if (res.data.data) {
                        this.backHistory();
                    }
                })
                .finally(() => {
                    this.saving = false;
                });
        },
        selectPurchaseStatus(val) {
            // if (val == 2 || val == 3){
            //     console.log(val)
            // }
        },
        selectInvoiceType(val) {},
        handleModal(data) {
            this.editExpressData.expenseId = data.expenseId;
            this.editExpressData.purchaseStatus = data.purchaseStatus;
            this.editExpressData.expressName = data.expressName;
            this.editExpressData.expressNum = data.expressNum;
            this.dialogVisibleExpress = true;
        },
        handleModalInvoice(data) {
            this.editInvoiceData.expenseId = data.expenseId;
            this.editInvoiceData.invoiceType = data.invoiceType;
            this.editInvoiceData.taxRate = data.taxRate;
            this.editInvoiceData.invoiceImg = data.invoiceImg;
            if (data.invoiceImg) {
                data.invoiceImg.split(',').forEach((item, index) => {
                    if (item) {
                        this.fileList1.push({
                            url: `${window.location.origin}/apply/expense/` + item
                        });
                    }
                });
            }
            this.dialogVisibleInvoice = true;
        },
        handleSubmit() {
            this.$refs['editExpressData'].validate(valid => {
                if (valid) {
                    updateExpress(this.editExpressData)
                        .then(res => {
                            if (res.data.data) {
                                this.dialogVisibleExpress = false;
                                this.getExpenseInfo();
                            }
                        })
                        .finally(() => {});
                }
            });
        },
        handleSubmitInvoice() {
            this.$refs['editInvoiceData'].validate(valid => {
                if (valid) {
                    updateExpress(this.editInvoiceData)
                        .then(res => {
                            if (res.data.data) {
                                this.dialogVisibleInvoice = false;
                                this.getExpenseInfo();
                            }
                        })
                        .finally(() => {});
                }
            });
        },
        beforeAvatarUpload: function(file) {
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            const isPG = isJPG || isPNG; //限制图片格式为jpg / png
            const isLt5M = file.size / 1024 / 1024 < 5; //限制图片大小
            if (!isPG) {
                this.$message.error('图片只能是 JPG 或 PNG 格式!');
            }
            if (!isLt5M) {
                this.$message.error('图片大小不能超过 5MB!');
            }
            return isPG && isLt5M;
        },
        handleRemove1(data) {
            const imgInfo = data.response.data;
            const imgUrl = imgInfo.bucketName + '-' + imgInfo.fileName;
            this.editInvoiceData.invoiceImg = this.editInvoiceData.invoiceImg.replace(imgUrl + ',', '');
            //console.log(this.editInvoiceData.invoiceImg)
        },
        handlePreview1(file) {
            console.log(file);
        },
        handSuccess1(data) {
            const imgInfo = data.data;
            const imgUrl = imgInfo.bucketName + '-' + imgInfo.fileName;
            this.editInvoiceData.invoiceImg += imgUrl + ',';
            //console.log(this.editInvoiceData.invoiceImg)
        },
        handleModalAffirm(data) {
            //console.log(data)
            if (data.expenseId) {
                this.$confirm('确认收到发票了吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    const editData = {
                        expenseId: data.expenseId,
                        isAffirm: '1'
                    };
                    affirmExpense(editData).then(res => {
                        if (res.data.data) {
                            this.getExpenseInfo();
                        }
                    });
                });
            }
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
.el-image {
    width: 100px;
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
.time {
    font-size: 16px;
    color: #9d9e61;
    padding: 10px 0;
}
/*.result:first-child{*/
/*    margin-top: 50px;*/
/*}*/
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
    height: 200px;
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
</style>
