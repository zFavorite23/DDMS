<template>
    <div>
        <el-form ref="formData" :rules="rules" :model="formData" class="form" :label-position="labelPosition" label-width="150px">
            <el-form-item label="公司：" prop="companyId">
                <el-select v-model="formData.companyId" placeholder="请选择">
                    <el-option v-for="(item, index) in companyOptions" :value="item.value" :key="index" :label="item.label" :disabled="item.disabled"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="总分类：" prop="type1">
                <el-radio-group v-model="formData.type1" @change="classifyChange">
                    <el-radio v-for="(item, index) in sumClassifyOptions" :label="item.id" :key="index">{{ item.name }}</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="主分类：" prop="type2">
                <el-cascader
                    v-model="formData.type2"
                    :options="mainClassifyOptions"
                    :props="{ expandTrigger: 'hover' }"
                    :show-all-levels="false"
                    filterable
                    size="mini"
                    @change="classifyChange2"
                ></el-cascader>
            </el-form-item>

            <el-form-item label="明细分类：" prop="type3">
                <el-radio-group v-model="formData.type3">
                    <el-radio v-for="(item, index) in subClassifyOptions" :label="item.id" :key="index">{{ item.name }}</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="是否找的票：" prop="isFull">
                <el-radio-group v-model="formData.isFull">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0" :disabled="isDisabled">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="发票类型：" prop="invoiceType">
                <el-radio-group v-model="formData.invoiceType">
                    <el-radio label="1">专票</el-radio>
                    <el-radio label="2">普票</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="真实报销描述：" prop="payDesc">
                <el-input
                    type="text"
                    v-model="formData.payDesc"
                    placeholder="请详细说明支付实际描述。例：因xx项目，xx时间xx地点和谁xx发生了xx报销"
                    maxlength="50"
                    show-word-limit
                ></el-input>
            </el-form-item>
            <div v-if="formData.isFull == '1' && formData.type1 != 22">
                <div style="">
                    <el-form-item label="支付时间：" prop="payTime" style="margin-right:20px;float: left">
                        <el-date-picker v-model="formData.payTime" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="支付金额：" prop="payPriceYuan" style="margin-right:20px;float: left">
                        <el-input type="text" placeholder="请输入支付金额" v-model="formData.payPriceYuan" @blur="getApplyUser" show-word-limit></el-input>
                    </el-form-item>
                    <el-form-item label="支付图片张数：" prop="payImgNum" style="margin-right:20px;float: left">
                        <el-input type="text" placeholder="请输入支付图片张数" v-model="formData.payImgNum" show-word-limit></el-input>
                    </el-form-item>
                    <div style="clear: both"></div>
                </div>
                <el-form-item label="支付截图：" prop="payImg">
                    <el-upload
                        class="upload-demo"
                        :action="uploadUrl"
                        name="file"
                        :on-preview="handlePreview1"
                        :on-remove="handleRemove1"
                        :on-success="handSuccess1"
                        :file-list="fileList1"
                        accept=".png,.jpg,.jpeg,.JPEG,.PNG,.JPG"
                        :before-upload="beforeAvatarUpload"
                        list-type="picture"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5MB</div>
                    </el-upload>
                    <!-- <input type="file" name="pic" id="pic" accept="image/gif, image/jpeg" />-->
                </el-form-item>
            </div>

            <el-form-item label="发票上内容的描述：" prop="invoiceDesc">
                <el-input type="text" v-model="formData.invoiceDesc" placeholder="请填写发票上的信息或描述" maxlength="50" show-word-limit></el-input>
            </el-form-item>

            <div style="">
                <el-form-item label="发票时间：" prop="invoiceTime" style="margin-right:20px;float: left">
                    <!--                    <el-input type="text" placeholder="请输入发票日期" v-model="formData.invoiceData" show-word-limit></el-input>-->
                    <el-date-picker
                        v-model="formData.invoiceTime"
                        :picker-options="pickerOptions1"
                        type="date"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="发票金额：" prop="invoicePriceYuan" style="margin-right:20px;float: left">
                    <el-input type="text" placeholder="请输入发票金额" v-model="formData.invoicePriceYuan" @blur="getApplyUser" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="发票张数：" prop="invoiceImgNum" style="margin-right:20px;float: left">
                    <el-input type="text" placeholder="请输入发票图片张数" v-model="formData.invoiceImgNum" show-word-limit></el-input>
                </el-form-item>
                <div style="clear: both"></div>
            </div>

            <el-form-item label="发票图片：" prop="invoiceImg">
                <el-upload
                    class="upload-demo"
                    :action="uploadUrl"
                    name="file"
                    :on-preview="handlePreview2"
                    :on-remove="handleRemove2"
                    :on-success="handSuccess2"
                    :before-upload="beforeAvatarUpload"
                    :file-list="fileList2"
                    accept=".png,.jpg,.jpeg,.JPEG,.PNG,.JPG"
                    list-type="picture"
                >
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5MB</div>
                </el-upload>
            </el-form-item>

            <el-form-item label="审批人：">
                <div class="apply-user-list" v-for="user in applyUserList">
                    <el-avatar :size="60" :src="user.avatar"></el-avatar>
                    <span class="username">{{ user.username }}</span>
                </div>
            </el-form-item>
            <el-form-item v-if="isSave" style="text-align: center" class="save">
                <el-button v-if="query.companyId == 1" type="primary" disabled>保存</el-button>
                <el-button v-else type="primary" @click="onSubmit" :loading="saving">保存</el-button>
                <el-button @click="backHistory">取消</el-button>
            </el-form-item>
        </el-form>
        <el-button type="primary" class="invoiceRules" @click="open">报销规范</el-button>
    </div>
</template>
<script>
import { addObj, editObj, getInvoices } from '../../../api/apply/invoice.js';
import { getApplyUserInfo } from '../../../api/admin/user.js';
import { getItemVosWithUserId } from '../../../api/project/team.js';
import { getStandardApplyInfoById } from '../../../api/standard/apply.js';
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            query: {
                companyId: null,
                userId: null,
                deptId: null,
                itemId: null,
                type1: '',
                type2: '',
                itemNextId: null,
                type: 6,
                priceYuan: 0
            },
            labelPosition: 'right',
            fileList1: [],
            fileList2: [],
            formData: {
                newData: true,
                invoiceId: null,
                companyId: null,
                itemId: null,
                userId: null,
                type1: '',
                type2: '',
                type3: '',
                isFull: '0',
                invoiceType: '2',
                invoiceDesc: '',
                invoiceTime: '',
                invoicePriceYuan: null,
                invoiceImg: '',
                invoiceImgNum: null,
                payDesc: '',
                payTime: '',
                payPriceYuan: null,
                payImg: '',
                payImgNum: null,
                approverids: '',
                aliasNext: '',
                itemNextId: null
            },
            isSave: true,
            uploadUrl: '',
            companyOptions: [
                {
                    value: 1,
                    label: '未转正不可提交',
                    disabled: true
                },
                {
                    value: 2,
                    label: '北京甲板智慧科技有限公司',
                    disabled: true
                },
                {
                    value: 3,
                    label: '北京甲板数字科技有限公司',
                    disabled: true
                }
            ],
            itemOptions: [],
            productOptions: [],
            rules: {
                companyId: [{ required: true, message: '请选择公司', trigger: 'change' }],
                itemId: [{ required: true, message: '请选择项目', trigger: 'change' }],
                type1: [
                    {
                        required: true,
                        message: '请选择总分类',
                        trigger: 'change'
                    }
                ],
                type2: [
                    {
                        required: true,
                        message: '请选择主分类',
                        trigger: 'change'
                    }
                ],
                type3: [
                    {
                        required: true,
                        message: '请选择明细分类',
                        trigger: 'change'
                    }
                ],
                isFull: [
                    {
                        required: true,
                        message: '请选择是否找的票',
                        trigger: 'change'
                    }
                ],
                invoiceType: [
                    {
                        required: true,
                        message: '请选择发票类型',
                        trigger: 'change'
                    }
                ],
                payDesc: [{ required: true, message: '请填写支付描述' }],
                payTime: [
                    {
                        required: true,
                        message: '请选择支付时间',
                        trigger: 'change'
                    }
                ],
                payPriceYuan: [{ required: true, message: '请填写支付金额' }],
                payImg: [
                    {
                        required: true,
                        message: '请上传支付图片',
                        trigger: 'change'
                    }
                ],
                payImgNum: [{ required: true, message: '请填写支付图片数量' }],
                invoiceDesc: [{ required: true, message: '请填写发票描述' }],
                invoiceTime: [
                    {
                        required: true,
                        message: '请选择发票时间',
                        trigger: 'change'
                    }
                ],
                invoicePriceYuan: [{ required: true, message: '请填写发票金额' }],
                // invoiceImg: [
                //     {
                //         required: true,
                //         message: '请上传发票图片',
                //         trigger: 'change'
                //     }
                // ],
                invoiceImgNum: [{ required: true, message: '请填写发票图片数量' }]
            },
            saving: false,
            applyUserList: [],
            isDisabled: false,
            sumClassifyOptions: [],
            mainClassifyOptions: [],
            subClassifyOptions: [],
            pickerOptions1: {
                disabledDate(time) {
                    return time.getTime() < new Date().getTime() - 3600 * 1000 * 24 * 94 || time.getTime() > new Date().getTime() + 3600 * 1000 * 24 * 0;
                }
            }
        };
    },
    created() {
        const editInvoiceInfo = JSON.parse(window.localStorage.getItem('editInvoiceInfo'));
        console.log(editInvoiceInfo);
        if (editInvoiceInfo) {
            this.formData.newData = false;
            this.query.type1 = editInvoiceInfo.type1;
            this.query.companyId = editInvoiceInfo.companyId;
            this.query.itemId = editInvoiceInfo.itemId;
            this.query.itemNextId = editInvoiceInfo.itemNextId;
            this.query.type2 = editInvoiceInfo.type2;
            if (editInvoiceInfo.itemId != null && editInvoiceInfo.itemNextId == null) {
                this.formData.type2 = [editInvoiceInfo.type2, editInvoiceInfo.itemId];
            } else if (editInvoiceInfo.itemNextId != null) {
                this.formData.type2 = [editInvoiceInfo.type2, editInvoiceInfo.itemNextId, editInvoiceInfo.itemId];
            } else {
                this.formData.type2 = [editInvoiceInfo.type2];
            }

            this.formData.invoiceId = editInvoiceInfo.invoiceId;
            this.formData.companyId = editInvoiceInfo.companyId;
            this.formData.itemId = editInvoiceInfo.itemId;
            this.formData.type1 = editInvoiceInfo.type1;
            this.formData.type3 = editInvoiceInfo.type3;
            this.formData.isFull = editInvoiceInfo.isFull;
            this.formData.invoiceType = editInvoiceInfo.invoiceType;
            this.formData.invoiceDesc = editInvoiceInfo.invoiceDesc;
            this.formData.invoiceTime = editInvoiceInfo.invoiceTime;
            this.formData.invoicePriceYuan = editInvoiceInfo.invoicePriceYuan;
            this.formData.invoiceImgNum = editInvoiceInfo.invoiceImgNum;
            this.formData.invoiceImg = editInvoiceInfo.invoiceImg;
            this.formData.payDesc = editInvoiceInfo.payDesc;
            this.formData.payTime = editInvoiceInfo.payTime;
            this.formData.payPriceYuan = editInvoiceInfo.payPriceYuan;
            this.formData.payImgNum = editInvoiceInfo.payImgNum;
            this.formData.payImg = editInvoiceInfo.payImg;
            this.applyUserList = editInvoiceInfo.checkUserList;
            //console.log(editInvoiceInfo.invoiceImg)
            getInvoices(this.formData.type1, this.userId).then(res => {
                res.data.data.invoiceType.forEach(item => {
                    this.mainClassifyOptions.push({
                        value: item.id,
                        label: item.name,
                        children: item.children
                    });
                });
            });
            getInvoices(this.formData.type2[0], this.userId).then(res => {
                this.subClassifyOptions = res.data.data.invoiceType;
            });
            if (editInvoiceInfo.payImg) {
                editInvoiceInfo.payImg.split(',').forEach((item, index) => {
                    if (item) {
                        //console.log(item)
                        this.fileList1.push({
                            url: `${window.location.origin}/apply/invoice/` + item
                        });
                    }
                });
            }
            if (editInvoiceInfo.invoiceImg) {
                editInvoiceInfo.invoiceImg.split(',').forEach((item, index) => {
                    if (item) {
                        this.fileList2.push({
                            url: `${window.location.origin}/apply/invoice/` + item
                        });
                    }
                });
                console.log(this.fileList2);
            }
        }
        this.getItemVosWithUserId(this.userId);

        if (!this.companyId) {
            this.isSave = false;
        } else {
            this.formData.companyId = this.companyId;
        }
        //console.log(this.formData.companyId);
        this.getStandardApplyInfo();
        this.getApplyUser(this.userId);
        this.formData.userId = this.userId;
        this.query.userId = this.userId;
        this.getInvoices('-1', this.query.userId);
        this.uploadUrl = `${window.location.origin}/apply/invoice/upload`;
        //this.open()
    },
    computed: {
        ...mapGetters(['permissions', 'userId', 'companyId'])
    },
    methods: {
        // 总分类
        getInvoices(id, userId) {
            getInvoices(id, userId).then(res => {
                // console.log(res)
                this.sumClassifyOptions = res.data.data.invoiceType;
            });
        },

        // 主分类
        classifyChange(val) {
            this.query.type1 = val;
            console.log(this.formData.type1);

            this.mainClassifyOptions = [];
            this.subClassifyOptions = [];

            getInvoices(val, this.userId).then(res => {
                // console.log(res)
                res.data.data.invoiceType.forEach(item => {
                    this.mainClassifyOptions.push({
                        value: item.id,
                        label: item.name,
                        children: item.children
                    });
                });
            });
            this.getApplyUser();
        },

        // 明细分类
        classifyChange2(val) {
            this.query.itemId = null;
            this.formData.itemId = null;
            this.formData.itemNextId = null;
            getInvoices(val[0], this.userId).then(res => {
                // console.log(res)
                this.subClassifyOptions = res.data.data.invoiceType;
            });

            // 获取项目id
            if (val.length > 1 && val.length < 3) {
                this.query.itemId = val[1];
                this.formData.itemId = val[1];
                this.query.type2 = val[0];
                this.query.itemNextId = null;
                this.getApplyUser();
            } else if (val.length == 3) {
                this.query.type2 = val[0];
                this.query.itemId = val[2];
                this.formData.itemId = val[2];
                this.query.itemNextId = val[1];
                this.getApplyUser();
            } else {
                this.query.itemId = null;
                this.query.itemNextId = null;
                this.query.type2 = val[0];
                this.formData.itemId = null;
                this.getApplyUser();
            }
        },

        getItemVosWithUserId(userId) {
            getItemVosWithUserId(userId).then(response => {
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
        getApplyUser() {
            console.log(this.query);
            if (this.formData.type1 != 22) {
                if (this.formData.isFull == '1') {
                    this.query.priceYuan = this.formData.payPriceYuan;
                } else {
                    this.query.priceYuan = this.formData.invoicePriceYuan;
                }

                getApplyUserInfo(this.query).then(response => {
                    this.applyUserList = [];
                    this.formData.approverids = null;
                    var newArr = response.data.data.filter(item => item.userId != this.query.userId);
                    // 去重
                    var newArr1 = [];
                    var obj = {};
                    for (var i = 0; i < newArr.length; i++) {
                        if (!obj[newArr[i].userId]) {
                            newArr1.push(newArr[i]);
                            obj[newArr[i].userId] = true;
                        }
                    }
                    console.log(newArr1);

                    newArr1.forEach(element => {
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
            } else {
                this.applyUserList = [];
                this.formData.approverids = 23;
                this.applyUserList.push({
                    userId: 23,
                    username: '王海清',
                    avatar: 'http://thirdwx.qlogo.cn/mmopen/vi_32/qZ3bvj9j1Kicjee8pBmwQUibV3pFRHRWZVHmIFj0CIFmMVtklCOKicU1f8KYdIKJkYGYSZmGaWqVu5iasmPH5ECkQw/132'
                });
            }
        },
        backHistory() {
            window.localStorage.removeItem('editInvoiceInfo');
            this.formData.newData = true;
            this.formData.invoiceId = null;
            this.formData.companyId = null;
            this.formData.itemId = null;
            this.formData.userId = null;
            this.formData.type1 = '';
            this.formData.type2 = '';
            this.formData.type3 = '';
            this.formData.isFull = '0';
            this.formData.invoiceType = '2';
            this.formData.invoiceDesc = '';
            this.formData.invoiceTime = '';
            this.formData.invoicePrice = null;
            this.formData.invoiceImgNum = null;

            this.formData.payDesc = '';
            this.formData.payTime = '';
            this.formData.payPrice = null;
            this.formData.payImgNum = null;

            this.$router.go(-1);
        },
        onSubmit() {
            if (this.formData.type2.length > 2) {
                this.formData.itemNextId = this.formData.type2[1];
            }
            this.formData.type2 = this.formData.type2[0];
            console.log(this.formData);
            this.$refs['formData'].validate(valid => {
                if (valid) {
                    this.saving = true;
                    console.log(this.formData.newData);
                    this.$confirm('请申请人复核发票信息、发票内容、发票金额后再提交，一经提交后流程不能逆转。', '温馨提示：', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        showClose: false
                    })
                        .then(() => {
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
                        })
                        .catch(() => {
                            this.saving = false;
                        });
                }
            });
        },
        handleRemove1(data) {
            var serverUrl = `${window.location.origin}/apply/invoice/`;
            const imgUrl = data.url.replace(serverUrl, '');
            this.formData.payImg = this.formData.payImg.replace(imgUrl + ',', '');
        },
        handlePreview1(file) {
            console.log(file);
        },
        handSuccess1(data) {
            const imgInfo = data.data;
            const imgUrl = imgInfo.bucketName + '-' + imgInfo.fileName;
            this.formData.payImg += imgUrl + ',';
        },
        handleRemove2(data) {
            var serverUrl = `${window.location.origin}/apply/invoice/`;
            const imgUrl = data.url.replace(serverUrl, '');
            this.formData.invoiceImg = this.formData.invoiceImg.replace(imgUrl + ',', '');
        },
        handlePreview2(file) {
            console.log(file);
        },
        handSuccess2(data) {
            const imgInfo = data.data;
            const imgUrl = imgInfo.bucketName + '-' + imgInfo.fileName;
            this.formData.invoiceImg += imgUrl + ',';
        },
        getStandardApplyInfo() {
            getStandardApplyInfoById(6).then(response => {
                if (response.data.data) {
                    const data = response.data.data;
                    this.content = data.content;
                    const invoiceStandardApply = JSON.parse(window.localStorage.getItem('invoiceStandardApply'));
                    if (invoiceStandardApply) {
                        if (invoiceStandardApply.version < data.version) {
                            this.open();
                        }
                    } else {
                        this.open();
                    }
                    window.localStorage.setItem('invoiceStandardApply', JSON.stringify(data));
                }
            });
        },
        open() {
            let content = this.content.split('\n\n');
            let newDatas = [];
            const h = this.$createElement;
            for (let i in content) {
                newDatas.push(h('p', null, content[i]));
            }
            this.$alert(h('div', null, newDatas), '报销规范');
        },
        beforeAvatarUpload: function(file) {
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            const isPG = isJPG || isPNG; //限制图片格式为jpg / png
            const isLt5M = file.size / 1024 / 1024 < 5; //限制图片大小
            if (!isPG) {
                this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
            }
            if (!isLt5M) {
                this.$message.error('上传头像图片大小不能超过 5MB!');
            }
            return isPG && isLt5M;
        }
    },
    mounted() {}
};
</script>
<style>
.el-radio-group {
    line-height: 30px !important;
}
</style>
<style type="text/scss" scoped lang="scss"></style>
