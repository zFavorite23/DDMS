<template>
    <div>
        <el-form ref="formData" :rules="rules" :model="formData" class="form" label-width="135px">
            <el-form-item label="名称：" prop="name">
                <el-input v-model="formData.name" placeholder="请填写采购名称或支出名称" maxlength="50" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="总分类：" prop="classify">
                <el-radio-group v-model="formData.classify" @change="classifyChange">
                    <el-radio label="1">项目</el-radio>
                    <el-radio label="2">产品</el-radio>
                    <el-radio label="3">库存</el-radio>
                    <el-radio label="4">其他</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="明细分类：" prop="type" v-if="formData.classify == '3' || formData.classify == '4'">
                <el-radio-group v-model="formData.type">
                    <el-radio v-if="formData.classify == 3" label="1">研发库存</el-radio>
                    <el-radio v-if="formData.classify == 3" label="2">产品库存</el-radio>

                    <el-radio v-if="formData.classify == 4" label="1">工具采购</el-radio>
                    <el-radio v-if="formData.classify == 4" label="2">办公用品</el-radio>
                    <el-radio v-if="formData.classify == 4" label="3">办公家具</el-radio>
                    <el-radio v-if="formData.classify == 4" label="4">税款</el-radio>
                    <el-radio v-if="formData.classify == 4" label="5">会议服务费</el-radio>
                    <el-radio v-if="formData.classify == 4" label="6">管理费</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="项目：" prop="itemId" v-if="formData.classify == '1'">
                <el-select v-model="formData.itemId" placeholder="请选择" filterable @change="selectItem">
                    <el-option v-for="(item, index) in itemOptions1" :value="item.value" :key="index" :label="item.label"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="产品：" prop="itemId" v-if="formData.classify == '2'">
                <el-select v-model="formData.itemId" placeholder="请选择" filterable @change="selectItem">
                    <el-option v-for="(item, index) in itemOptions2" :value="item.value" :key="index" :label="item.label"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否对公：" prop="isPublic">
                <el-radio-group v-model="formData.isPublic" class="box" @change="selectIsPublic">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <!--            <el-form-item label="选项：" prop="isTackInvoice">-->
            <!--                <el-radio-group v-model="formData.isTackInvoice" class="box">-->
            <!--                    <el-radio label="1">供应商已开票未收到纸质发票</el-radio>-->
            <!--                    <el-radio label="2">供应商未开票</el-radio>-->
            <!--                    <el-radio label="3">供应商已开票收到纸质发票</el-radio>-->
            <!--                </el-radio-group>-->
            <!--            </el-form-item>-->

            <!--            <el-form-item label="发票类型：" prop="invoiceType">-->
            <!--                <el-radio-group v-model="formData.invoiceType" class="box">-->
            <!--                    <el-radio label="1">专票</el-radio>-->
            <!--                    <el-radio label="2">普票</el-radio>-->
            <!--                </el-radio-group>-->
            <!--            </el-form-item>-->

            <!--            <el-form-item label="供应商：" prop="supplierId">-->
            <!--                <el-select clearable v-model="formData.supplierId" placeholder="请选择" @change="selectSupplier">-->
            <!--                    <el-option v-for="(item, index) in supplierOptions" :value="item.supplierId" :key="index" :label="item.name">-->
            <!--                    </el-option>-->
            <!--                </el-select>-->
            <!--            </el-form-item>-->
            <el-form-item :label="companyNameLable" prop="companyName">
                <el-input v-model="formData.companyName" placeholder="请填写公司名称" maxlength="50" show-word-limit></el-input>
            </el-form-item>
            <div v-if="formData.isPublic == '1'">
                <el-form-item label="开户行名称：" prop="bankName">
                    <el-input v-model="formData.bankName" placeholder="请填写开户行名称" maxlength="50" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="开户行账号：" prop="bankAccount">
                    <el-input v-model="formData.bankAccount" placeholder="请填写开户行账号" maxlength="50" show-word-limit></el-input>
                </el-form-item>
            </div>
            <div v-if="formData.isPublic == '0'">
                <el-form-item label="联系方式："><el-input v-model="formData.contact" placeholder="请填写联系方式" maxlength="100" show-word-limit></el-input></el-form-item>
                <el-form-item label="购买链接：">
                    <el-input type="textarea" v-model="formData.buyUrl" placeholder="请填写提供链接" maxlength="200" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="型号参数：" prop="model">
                    <el-input type="textarea" v-model="formData.model" placeholder="请填写型号参数" maxlength="200" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="数量：" prop="num"><el-input type="number" v-model="formData.num" placeholder="请填写数量"></el-input></el-form-item>
                <el-form-item label="单位：" prop="unit"><el-input v-model="formData.unit" placeholder="请填写单位" maxlength="20" show-word-limit></el-input></el-form-item>
            </div>
            <div v-if="formData.isPublic == '1'">
                <el-form-item label="金额：" prop="isLarge">
                    <el-radio-group v-model="formData.isLarge" class="box">
                        <el-radio label="1">大于10W</el-radio>
                        <el-radio label="0">小于10W</el-radio>
                    </el-radio-group>
                    <br />
                    <el-tag v-if="formData.isLarge == '0'" size="mini" type="danger">打款日期审批通过后的下一个周一、周三、周五</el-tag>
                    <el-tag v-if="formData.isLarge == '1'" size="mini" type="danger">打款日期审批通过后的（加7天）下一个周一、周三、周五</el-tag>
                </el-form-item>
            </div>
            <el-form-item :label="priceYuanLabel" prop="priceYuan">
                <el-input type="number" placeholder="请填写金额" v-model="formData.priceYuan" @blur="getApplyUser" show-word-limit></el-input>
            </el-form-item>
            <div v-if="formData.isPublic == '1'">
                <el-form-item label="打款备注：" prop="remark">
                    <el-input v-model="formData.remark" placeholder="请填写备注信息" maxlength="20" show-word-limit></el-input>
                    <el-tag size="mini" type="danger">请填写打款时的备注信息</el-tag>
                </el-form-item>
                <el-form-item label="用途及明细：" prop="detailed">
                    <el-input type="textarea" placeholder="请填写用途及明细" v-model="formData.detailed" maxlength="100" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="合同及附件图片：">
                    <el-upload
                        class="upload-demo box"
                        :action="uploadUrl"
                        name="file"
                        :on-preview="handlePreview2"
                        :on-remove="handleRemove2"
                        :on-success="handSuccess2"
                        :file-list="fileList2"
                        accept=".png,.jpg,.jpeg,.JPEG,.PNG,.JPG"
                        :before-upload="beforeAvatarUpload"
                        :auto-upload="true"
                        list-type="picture"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5MB</div>
                    </el-upload>
                </el-form-item>
            </div>

            <div v-if="formData.isPublic == '0'">
                <el-form-item label="要求到货时间：" prop="arrivalTime">
                    <el-date-picker v-model="formData.arrivalTime" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
                </el-form-item>
            </div>

            <!--            <el-form-item label="发票张数：" prop="invoiceNum">-->
            <!--                <el-input type="text" placeholder="请填写发票张数" v-model="formData.invoiceNum" maxlength="10" show-word-limit></el-input>-->
            <!--            </el-form-item>-->

            <!--            <el-form-item label="发票图片：" v-if="formData.isTackInvoice == '1' || formData.isTackInvoice == '3'" prop="invoiceImg">-->
            <!--                <el-upload-->
            <!--                    class="upload-demo box"-->
            <!--                    :action="uploadUrl"-->
            <!--                    name="file"-->
            <!--                    :on-preview="handlePreview1"-->
            <!--                    :on-remove="handleRemove1"-->
            <!--                    :on-success="handSuccess1"-->
            <!--                    :file-list="fileList1"-->
            <!--                    accept=".png,.jpg,.jpeg,.JPEG,.PNG,.JPG"-->
            <!--                    :auto-upload="true"-->
            <!--                    :before-upload = "beforeAvatarUpload"-->
            <!--                    list-type="picture">-->
            <!--                    <el-button size="small" type="primary">点击上传</el-button>-->
            <!--                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
            <!--                </el-upload>-->
            <!--            </el-form-item>-->

            <el-form-item label="审批人：">
                <div class="apply-user-list" v-for="user in applyUserList">
                    <el-avatar :size="60" :src="user.avatar"></el-avatar>
                    <span class="username">{{ user.username }}</span>
                </div>
            </el-form-item>
            <el-form-item style="text-align: center" class="save">
                <el-button type="primary" @click="onSubmit" :loading="saving">保存</el-button>
                <el-button @click="backHistory">取消</el-button>
            </el-form-item>
        </el-form>
        <el-button type="primary" class="invoiceRules" @click="open">支出规范</el-button>
    </div>
</template>
<script>
import { addObj, editObj } from '../../../api/apply/expense.js';
import { getApplyUserInfo } from '../../../api/admin/user.js';
import { getItemVosWithUserId } from '../../../api/project/team.js';
import { getSupplierAll } from '../../../api/customer/supplier.js';
import { getStandardApplyInfoById } from '../../../api/standard/apply.js';
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            query: {
                itemId: null,
                userId: null,
                deptId: null,
                isPublic: '1',
                type: 7,
                priceYuan: 0
            },
            fileList1: [],
            fileList2: [],
            formData: {
                newData: true,
                expenseId: null,
                name: '',
                classify: '1',
                type: null,
                itemId: null,
                userId: '',
                isPublic: '1',
                isTackInvoice: '',
                invoiceType: '',
                supplierId: null,
                companyName: '',
                contact: '',
                buyUrl: '',
                model: '',
                bankName: '',
                bankAccount: '',
                num: null,
                unit: '',
                isLarge: '0',
                priceYuan: '',
                remark: '',
                invoiceNum: 1,
                detailed: '',
                invoiceImg: '',
                contract: '',
                arrivalTime: '',
                approverids: null
            },
            companyNameLable: '公司名称：',
            priceYuanLabel: '支出金额：',
            uploadUrl: '',
            itemOptions1: [],
            itemOptions2: [],
            supplierList: [],
            supplierOptions: [],
            rules: {
                name: [{ required: true, message: '请填写名称' }],
                classify: [
                    {
                        required: true,
                        message: '请选择总分类',
                        trigger: 'change'
                    }
                ],
                type: [
                    {
                        required: true,
                        message: '请选择明细分类',
                        trigger: 'change'
                    }
                ],
                itemId: [{ required: true, message: '请选择项目', trigger: 'change' }],
                isPublic: [
                    {
                        required: true,
                        message: '请选择是否对公',
                        trigger: 'change'
                    }
                ],
                companyName: [{ required: true, message: '请填写公司名称' }],
                contact: [{ required: true, message: '请填写联系方式' }],
                buyUrl: [{ required: true, message: '请填写购买链接' }],
                model: [{ required: true, message: '请填写型号参数' }],
                num: [{ required: true, message: '请填写购买数量' }],
                unit: [{ required: true, message: '请填写购买单位' }],
                bankName: [{ required: true, message: '请填写开户行名称' }],
                bankAccount: [{ required: true, message: '请填写开户行账号' }],
                isLarge: [
                    {
                        required: true,
                        message: '请选择金额比例',
                        trigger: 'change'
                    }
                ],
                priceYuan: [{ required: true, message: '请填写支出金额' }],
                remark: [{ required: true, message: '请填写备注信息' }],
                arrivalTime: [
                    {
                        required: true,
                        message: '请选择到货时间',
                        trigger: 'change'
                    }
                ],
                detailed: [{ required: true, message: '请填写用途及明细' }]
            },
            saving: false,
            applyUserList: []
        };
    },
    created() {
        this.getStandardApplyInfo();
        this.getItemVosWithUserId(this.userId);
        this.getSupplierAll();
        this.formData.userId = this.userId;
        this.query.userId = this.userId;
        this.uploadUrl = `${window.location.origin}/apply/expense/upload`;

        const editExpenseInfo = JSON.parse(window.localStorage.getItem('editExpenseInfo'));
        if (editExpenseInfo) {
            this.formData.newData = false;
            this.formData.expenseId = editExpenseInfo.expenseId;
            this.formData.name = editExpenseInfo.name;
            this.formData.classify = editExpenseInfo.classify;
            this.formData.type = editExpenseInfo.type;
            this.formData.itemId = editExpenseInfo.itemId;
            this.query.itemId = editExpenseInfo.itemId;
            this.formData.isPublic = editExpenseInfo.isPublic;
            this.formData.isTackInvoice = editExpenseInfo.isTackInvoice;
            this.formData.invoiceType = editExpenseInfo.invoiceType;
            this.formData.supplierId = editExpenseInfo.supplierId;

            this.formData.companyName = editExpenseInfo.companyName;
            this.formData.contact = editExpenseInfo.contact;
            this.formData.buyUrl = editExpenseInfo.buyUrl;
            this.formData.model = editExpenseInfo.model;
            this.formData.num = editExpenseInfo.num;
            this.formData.unit = editExpenseInfo.unit;
            this.formData.bankName = editExpenseInfo.bankName;
            this.formData.bankAccount = editExpenseInfo.bankAccount;
            this.formData.isLarge = editExpenseInfo.isLarge;
            this.formData.priceYuan = editExpenseInfo.priceYuan;
            this.query.priceYuan = editExpenseInfo.priceYuan;
            this.formData.remark = editExpenseInfo.remark;
            this.formData.invoiceNum = editExpenseInfo.invoiceNum;
            this.formData.detailed = editExpenseInfo.detailed;
            this.formData.invoiceImg = editExpenseInfo.invoiceImg;
            this.formData.contract = editExpenseInfo.contract;
            this.formData.arrivalTime = editExpenseInfo.arrivalTime;

            if (editExpenseInfo.invoiceImg) {
                editExpenseInfo.invoiceImg.split(',').forEach((item, index) => {
                    if (item) {
                        this.fileList1.push({
                            url: `${window.location.origin}/apply/expense/` + item
                        });
                    }
                });
            }
            if (editExpenseInfo.contract) {
                editExpenseInfo.contract.split(',').forEach((item, index) => {
                    if (item) {
                        this.fileList2.push({
                            url: `${window.location.origin}/apply/expense/` + item
                        });
                    }
                });
            }

            this.getApplyUser();
        } else {
            this.getApplyUser();
        }
    },
    computed: {
        ...mapGetters(['permissions', 'userId'])
    },
    methods: {
        classifyChange(val) {
            this.formData.itemId = '';
            this.query.itemId = '';
            this.getApplyUser();
        },
        selectIsPublic(val) {
            this.query.isPublic = val;
            if (val == 0) {
                this.companyNameLable = '厂家名称：';
                this.priceYuanLabel = '议定单价：';
            }
            if (val == 1) {
                this.companyNameLable = '公司名称：';
                this.priceYuanLabel = '支出金额：';
            }
            this.getApplyUser();
        },
        selectItem(val) {
            if (val == null || val == '') {
                this.query.itemId = null;
                this.formData.itemId = null;
                this.getApplyUser();
            } else {
                this.query.itemId = val;
                this.formData.itemId = val;
                this.getApplyUser();
            }
        },
        getApplyUser() {
            this.query.priceYuan = this.formData.priceYuan;
            getApplyUserInfo(this.query).then(response => {
                this.applyUserList = [];
                this.formData.approverids = null;
                response.data.data.forEach(element => {
                    this.applyUserList.push({
                        userId: element.userId,
                        username: element.username,
                        avatar: element.avatar
                    });
                    if (this.formData.approverids == null) {
                        this.formData.approverids += element.userId;
                    } else {
                        this.formData.approverids += ',' + element.userId;
                    }
                });
            });
        },
        getItemVosWithUserId(userId) {
            getItemVosWithUserId(userId).then(response => {
                response.data.data.forEach(element => {
                    if (element.type == '1') {
                        this.itemOptions1.push({
                            value: element.itemId,
                            label: element.alias
                        });
                    }
                    if (element.type == '2') {
                        this.itemOptions2.push({
                            value: element.itemId,
                            label: element.alias
                        });
                    }
                });
            });
        },
        getSupplierAll() {
            getSupplierAll().then(response => {
                this.supplierList = response.data.data;
                response.data.data.forEach(element => {
                    this.supplierOptions.push({
                        supplierId: element.supplierId,
                        name: element.name
                    });
                });
            });
        },
        selectSupplier(val) {
            console.log(val);
            if (val != null && val != '') {
                var that = this;
                this.supplierList.forEach(element => {
                    if (element.supplierId == val) {
                        that.formData.name = element.name;
                        that.formData.bankName = element.bankName;
                        that.formData.bankAccount = element.bankAccount;
                    }
                });
            } else {
                this.formData.name = '';
                this.formData.bankName = '';
                this.formData.bankAccount = '';
            }
        },
        backHistory() {
            window.localStorage.removeItem('editExpenseInfo');
            this.formData.newData = true;
            this.formData.expenseId = null;
            this.formData.itemId = null;
            this.formData.isPublic = '1';
            this.formData.isTackInvoice = '';
            this.formData.invoiceType = '';
            this.formData.supplierId = null;
            this.formData.name = '';
            this.formData.bankName = '';
            this.formData.bankAccount = '';
            this.formData.isLarge = '0';
            this.formData.priceYuan = '';
            this.formData.invoiceNum = 1;
            this.formData.detailed = '';
            this.formData.invoiceImg = '';
            this.formData.contract = '';
            this.$router.go(-1);
        },
        onSubmit() {
            this.$refs['formData'].validate(valid => {
                if (valid) {
                    //console.log(this.formData)
                    // this.fileData = new FormData();
                    // this.$refs.upload2.submit();
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
        handleRemove1(data) {
            var serverUrl = `${window.location.origin}/apply/expense/`;
            const imgUrl = data.url.replace(serverUrl, '');
            this.formData.invoiceImg = this.formData.invoiceImg.replace(imgUrl + ',', '');
            console.log(this.formData.invoiceImg);
        },
        handlePreview1(file) {
            console.log(file);
        },
        handSuccess1(data) {
            const imgInfo = data.data;
            const imgUrl = imgInfo.bucketName + '-' + imgInfo.fileName;
            this.formData.invoiceImg += imgUrl + ',';
            console.log(this.formData.invoiceImg);
        },
        handleRemove2(data) {
            var serverUrl = `${window.location.origin}/apply/expense/`;
            const imgUrl = data.url.replace(serverUrl, '');
            this.formData.content = this.formData.contract.replace(imgUrl + ',', '');
            console.log(this.formData.contract);
        },
        handlePreview2(file) {
            console.log(file);
        },
        handSuccess2(data) {
            const imgInfo = data.data;
            const imgUrl = imgInfo.bucketName + '-' + imgInfo.fileName;
            this.formData.contract += imgUrl + ',';
            console.log(this.formData.contract);
        },
        getStandardApplyInfo() {
            getStandardApplyInfoById(7).then(response => {
                if (response.data.data) {
                    const data = response.data.data;
                    this.content = data.content;
                    const expenseStandardApply = JSON.parse(window.localStorage.getItem('expenseStandardApply'));
                    if (expenseStandardApply) {
                        if (expenseStandardApply.version < data.version) {
                            this.open();
                        }
                    } else {
                        this.open();
                    }
                    window.localStorage.setItem('expenseStandardApply', JSON.stringify(data));
                }
            });
        },
        open() {
            console.log(this.content);
            let content = this.content.split('\n\n');
            let newDatas = [];
            const h = this.$createElement;
            for (let i in content) {
                newDatas.push(h('p', null, content[i]));
            }
            this.$alert(h('div', null, newDatas), '支出规范');
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
        }
    },
    mounted() {}
};
</script>
<style type="text/scss" scoped lang="scss">
.el-select {
    width: 100%;
}
</style>
