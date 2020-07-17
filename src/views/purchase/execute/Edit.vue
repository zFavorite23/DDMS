<template>
    <div>
        <div style="border-bottom: 5px solid #777777;margin: 1.6rem 0;"><span style="font-size: 1.2rem;color: #777777;">采购信息</span></div>
        <el-form :model="formData" class="form" label-width="150px">
            <el-form-item label="采购物品名称：" prop="name">
                <el-input disabled v-model="formData.name" placeholder="请填写采购名称" maxlength="50" show-word-limit></el-input>
            </el-form-item>

            <el-form-item label="总分类：" prop="name">
                <el-radio-group v-model="formData.type1">
                    <el-radio disabled v-for="(item, index) in sumClassifyOptions" :label="item.id" :key="index">{{ item.name }}</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="主分类：" prop="name">
                <el-cascader
                    disabled
                    v-model="formData.type2"
                    :options="mainClassifyOptions"
                    :props="{ expandTrigger: 'hover' }"
                    :show-all-levels="false"
                    filterable
                    size="mini"
                ></el-cascader>
            </el-form-item>

            <el-form-item label="明细分类：" prop="name">
                <el-radio-group v-model="formData.type3">
                    <el-radio disabled v-for="(item, index) in subClassifyOptions" :label="item.id" :key="index">{{ item.name }}</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="具体需求描述：">
                        <el-input v-model="formData.demand" disabled placeholder="请填写采购名称" maxlength="50" show-word-limit></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="推荐厂家/联系方式：">
                        <el-input v-model="formData.factoryName" disabled placeholder="请填写采购名称" maxlength="50" show-word-limit></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="推荐淘宝/京东链接："><el-input v-model="formData.buyUrl" disabled placeholder="请输入链接"></el-input></el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="需求数量："><el-input v-model.number="formData.num" disabled placeholder="请输入数量"></el-input></el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="单位："><el-input v-model="formData.unit" disabled placeholder="请输入单位"></el-input></el-form-item>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="型号参数："><el-input v-model="formData.model" disabled placeholder="请填写采购名称"></el-input></el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="预估单价："><el-input v-model.number="formData.priceYuan" disabled placeholder="请输入单价"></el-input></el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="预估总价："><el-input v-model.number="formData.guessPriceYuan" disabled placeholder="请输入总价"></el-input></el-form-item>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>

            <el-form-item label="备注："><el-input type="textarea" v-model="formData.remark" disabled :rows="2"></el-input></el-form-item>

            <el-row>
                <el-col :span="16">
                    <el-form-item label="收货信息："><el-input v-model="formData.contact" disabled></el-input></el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="预计到货时间：">
                        <el-date-picker
                            disabled
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            type="date"
                            v-model="formData.guessTime"
                            placeholder="选择日期"
                        ></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-form-item label="审批人：">
                <div class="apply-user-list" v-for="user in applyUserList">
                    <el-avatar :size="60" :src="user.avatar"></el-avatar>
                    <span class="username">{{ user.username }}</span>
                </div>
            </el-form-item>
        </el-form>

        <div style="border-bottom: 5px solid #777777;margin: 1.6rem 0;"><span style="font-size: 1.2rem;color: #777777;">采购执行</span></div>
        <el-form ref="formData" :model="formData" :rules="rules" class="form" label-width="150px">
            <el-form-item label="是否对公：" prop="isOpen">
                <el-radio-group v-model="formData.isOpen" @change="isOpen">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="2">否</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item v-if="formData.isOpen != 2" label="公司名称：" prop="companyName"><el-input v-model="formData.companyName" show-word-limit></el-input></el-form-item>

            <el-form-item v-if="formData.isOpen != 2" label="开户行名称：" prop="bankName"><el-input v-model="formData.bankName" show-word-limit></el-input></el-form-item>

            <el-form-item v-if="formData.isOpen != 2" label="开户行账号：" prop="bankAccount"><el-input v-model="formData.bankAccount" show-word-limit></el-input></el-form-item>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="采购进展：" v-if="formData.isOpen == 1">
                        <el-select filterable placeholder="请选择" v-model="formData.purchaseStatus">
                            <el-option v-for="item in userOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="采购进展：" v-if="formData.isOpen == 2">
                        <el-select filterable placeholder="请选择" v-model="formData.purchaseStatus">
                            <el-option v-for="item in userOptions2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12" v-if="formData.isOpen != 2">
                    <el-form-item label="合同金额：" prop="name"><el-input show-word-limit v-model="formData.pactPriceYuan"></el-input></el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="物流公司："><el-input show-word-limit v-model="formData.expressName"></el-input></el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="单号：" prop="name"><el-input show-word-limit v-model="formData.expressNum"></el-input></el-form-item>
                </el-col>
            </el-row>

            <el-form-item label="合同附件图片：" prop="invoiceImg" v-if="formData.isOpen != 2">
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
            <el-row>
                <el-col :span="12">
                    <el-form-item label="发票进展：">
                        <el-select filterable placeholder="请选择" v-model="formData.invoiceStatus">
                            <el-option v-for="item in invoice" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-form-item v-if="formData.isOpen == 1" label="支出状态：">
                <el-input v-model="formData.payStatus" show-word-limit></el-input>
                <el-button type="primary" size="mini" @click="goExpense">去支出</el-button>
            </el-form-item>

            <el-form-item label="实际支付金额：" v-if="formData.isOpen == 2"><el-input v-model="formData.relPriceYuan" show-word-limit></el-input></el-form-item>
            <el-form-item label="采购状态：">
                <el-radio-group v-model="formData.purchaseType">
                    <el-radio label="1">进行中</el-radio>
                    <el-radio label="2">已完成</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="备注信息："><el-input type="textarea" v-model="formData.performNote" :rows="2"></el-input></el-form-item>

            <el-form-item v-if="formData.isOpen == 2" label="报销状态：">
                <el-radio-group v-model="formData.applyId">
                    <el-radio label="1">已报销</el-radio>
                    <el-radio label="2">未报销</el-radio>
                    <el-button type="primary" size="mini" @click="$router.push({ path: `/apply/invoice/form` })">去报销</el-button>
                </el-radio-group>
            </el-form-item>

            <el-form-item style="text-align: center" class="save">
                <el-button type="primary" @click="onSubmit" :loading="saving">保存</el-button>
                <el-button @click="backHistory">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { getApplyUserInfo } from '../../../api/admin/user.js';
import { getPurchase, getPurchaseInfo, applyEditpurchaseEs } from '../../../api/purchase/purchase.js';
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            query: {
                companyId: null,
                userId: null,
                deptId: null,
                itemId: null,
                type: 6,
                priceYuan: 0
            },
            formData: {
                userId: null,
                itemId: 0,
                // 数据id
                purchaseId: null,
                // 采购名称
                name: '',
                // 详细分类
                type1: '',
                type2: '',
                type3: '',
                // 链接
                buyUrl: '',
                // 推荐厂家
                factoryName: '',
                // 型号参数
                model: '',
                // 数量
                num: '',
                // 单位
                unit: '',
                // 单价
                price: '',
                // 预估总价
                guessPrice: '',
                // 备注
                remark: '',
                // 预计到货时间
                guessTime: '',
                // 需求描述
                demand: '',
                // 型号参数图片
                purchaseImg: '',
                // 收货地址联系方式
                contact: '',
                // 其它参数
                expressName: null,
                expressNum: null,
                isOpen: 1,
                purchaseType: 1,
                applyId: 1,
                pactImg: null,
                performNote: '',
                pactPrice: null,
                purchaseStatus: null,
                payStatus: null,
                invoiceStatus: null,
                companyName: null,
                bankName: null,
                bankAccount: null,
                guessPriceYuan: '',
                priceYuan: '',
                relPriceYuan: '',
                pactPriceYuan: '',
                aliasNext: '',
                itemNextId: null
            },

            userOptions: [
                {
                    value: '合同谈判中',
                    label: '合同谈判中'
                },
                {
                    value: '合同已签订',
                    label: '合同已签订'
                },
                {
                    value: '已打全款',
                    label: '已打全款'
                },
                {
                    value: '已打首付款',
                    label: '已打首付款'
                },
                {
                    value: '已收货',
                    label: '已收货'
                }
            ],
            invoice: [
                {
                    value: '未取得',
                    label: '未取得'
                },
                {
                    value: '未报销',
                    label: '未报销'
                },
                {
                    value: '已取得未报销',
                    label: '已取得未报销'
                },
                {
                    value: '已取得已报销',
                    label: '已取得已报销'
                },
                {
                    value: '无发票',
                    label: '无发票'
                },
                {
                    value: '已找票',
                    label: '已找票'
                }
            ],
            userOptions2: [
                {
                    value: '已下单',
                    label: '已下单'
                },
                {
                    value: '已发货',
                    label: '已发货'
                },
                {
                    value: '已收货',
                    label: '已收货'
                },
                {
                    value: '已退货',
                    label: '已退货'
                },
                {
                    value: '已退款',
                    label: '已退款'
                }
            ],

            fileList2: [],
            applyUserList: [],
            sumClassifyOptions: [],
            mainClassifyOptions: [],
            subClassifyOptions: [],
            purchaseId: null,
            uploadUrl: '',
            rules: {
                isOpen: [{ required: true, message: '请选择对公状态', trigger: 'change' }],
                companyName: [{ required: true, message: '请填写公司名称', trigger: 'change' }],
                bankName: [{ required: true, message: '请填写开户行名称' }],
                bankAccount: [{ required: true, message: '请填写开户行账号', trigger: 'change' }]
            },
            saving: false
        };
    },
    created() {
        // this.formData.userId = this.userId;
        this.query.userId = this.userId;
        this.getPurchase('100000', this.userId);
        this.uploadUrl = `${window.location.origin}/apply/purchase/upload`;
        this.purchaseId = this.$route.query.purchaseId;
        this.getPurchaseInfo();
    },
    computed: {
        ...mapGetters(['permissions', 'userId'])
    },
    methods: {
        // 获取总类
        getPurchase(id, userId) {
            getPurchase(id, userId).then(res => {
                this.sumClassifyOptions = res.data.data.purchaseType;
            });
        },

        getPurchaseInfo() {
            getPurchaseInfo(this.purchaseId).then(res => {
                const editPurchaseInfo = res.data.data;
                this.formData.name = editPurchaseInfo.name;
                this.formData.buyUrl = editPurchaseInfo.buyUrl;
                this.formData.itemId = editPurchaseInfo.itemId;
                this.formData.aliasNext = editPurchaseInfo.aliasNext;
                this.formData.itemNextId = editPurchaseInfo.itemNextId;
                this.formData.purchaseId = editPurchaseInfo.purchaseId;

                this.query.itemId = editPurchaseInfo.itemId;
                this.formData.type1 = editPurchaseInfo.type1;
                if (editPurchaseInfo.itemId != 0 && editPurchaseInfo.itemNextId == null) {
                    this.formData.type2 = [editPurchaseInfo.type2, editPurchaseInfo.itemId];
                } else if (editPurchaseInfo.itemNextId != null) {
                    this.formData.type2 = [editPurchaseInfo.type2, editPurchaseInfo.itemNextId, editPurchaseInfo.itemId];
                } else {
                    this.formData.type2 = [editPurchaseInfo.type2];
                }
                this.formData.type3 = editPurchaseInfo.type3;
                this.formData.factoryName = editPurchaseInfo.factoryName;
                this.formData.model = editPurchaseInfo.model;
                this.formData.demand = editPurchaseInfo.demand;
                this.formData.num = editPurchaseInfo.num;
                this.formData.unit = editPurchaseInfo.unit;
                this.formData.priceYuan = editPurchaseInfo.priceYuan;
                this.formData.pactPriceYuan = editPurchaseInfo.pactPriceYuan;
                this.formData.guessPriceYuan = editPurchaseInfo.guessPriceYuan;
                this.formData.remark = editPurchaseInfo.remark;
                this.formData.purchaseImg = editPurchaseInfo.purchaseImg;
                this.formData.contact = editPurchaseInfo.contact;
                this.formData.guessTime = editPurchaseInfo.guessTime;
                this.formData.expressName = editPurchaseInfo.expressName;
                this.formData.expressNum = editPurchaseInfo.expressNum;
                this.formData.isOpen = editPurchaseInfo.isOpen;
                this.formData.purchaseType = editPurchaseInfo.purchaseType;
                this.formData.applyId = editPurchaseInfo.applyId;
                if (editPurchaseInfo.pactImg == null) {
                    this.formData.pactImg = '';
                } else {
					this.formData.pactImg = editPurchaseInfo.pactImg;
                    editPurchaseInfo.pactImg.split(',').forEach((item, index) => {
                        if (item) {
                            this.fileList2.push({
                                url: `${window.location.origin}/apply/purchase/` + item
                            });
                        }
                    });
                }
                this.formData.pactPrice = editPurchaseInfo.pactPrice * 0.01;
                this.formData.purchaseStatus = editPurchaseInfo.purchaseStatus;
                this.formData.performNote = editPurchaseInfo.performNote;
                this.formData.payStatus = editPurchaseInfo.payStatus;
                this.formData.invoiceStatus = editPurchaseInfo.invoiceStatus;
                this.formData.companyName = editPurchaseInfo.companyName;
                this.formData.bankName = editPurchaseInfo.bankName;
                this.formData.bankAccount = editPurchaseInfo.bankAccount;
                this.formData.relPriceYuan = editPurchaseInfo.relPriceYuan;
                editPurchaseInfo.checkUserList.forEach(item => {
                    this.applyUserList.push({
                        userId: item.checkUserId,
                        username: item.checkUserName,
                        avatar: item.checkUserAvatar
                    });
                });

                //console.log(editPurchaseInfo.invoiceImg)
                getPurchase(this.formData.type1, this.userId).then(res => {
                    res.data.data.purchaseType.forEach(item => {
                        this.mainClassifyOptions.push({
                            value: item.id,
                            label: item.name,
                            children: item.children
                        });
                    });
                });
                getPurchase(this.formData.type2[0], this.userId).then(res => {
                    this.subClassifyOptions = res.data.data.purchaseType;
                });
            });
            console.log(this.formData)
        },

        // 提交
        onSubmit() {
            this.formData.type2 = this.formData.type2[0];
            console.log(this.formData);
            this.$refs['formData'].validate(valid => {
                if (valid) {
                    this.saving = true;

                    applyEditpurchaseEs(this.formData)
                        .then(res => {
                            console.log(res);
                            this.backHistory();
                        })
                        .finally(() => {
                            this.saving = false;
                        });
                }
            });
        },

        handlePreview2(file) {
            console.log(file);
        },
        handleRemove2(data) {
            var serverUrl = `${window.location.origin}/apply/purchase/`;
            const imgUrl = data.url.replace(serverUrl, '');
            this.formData.pactImg = this.formData.pactImg.replace(imgUrl + ',', '');
        },
        handSuccess2(data) {
            const imgInfo = data.data;
            const imgUrl = imgInfo.bucketName + '-' + imgInfo.fileName;
            this.formData.pactImg += imgUrl + ',';
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
        },

        // 取消
        backHistory() {
            this.$router.go(-1);
        },
        goExpense() {
            this.formData.type2 = this.formData.type2[0];
            window.localStorage.setItem('editPurchaseInfo', JSON.stringify(this.formData));
            this.$router.push({
                path: '/apply/expense/form'
            });
        },

        isOpen(val) {
            if (val == 2) {
                // console.log(132132132);

                this.formData.companyName = '';
                this.formData.bankName = '';
                this.formData.bankAccount = '';
                this.formData.pactPrice = '';
                this.formData.pactImg = null;
                this.formData.payStatus = '';
                this.formData.purchaseStatus = '';
            }
            console.log(this.formData);
        }
    }
};
</script>

<style></style>
