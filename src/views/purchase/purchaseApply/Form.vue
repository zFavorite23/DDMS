<template>
    <div>
        <el-form ref="formData" :rules="rules" :model="formData" class="form" label-width="150px">
            <el-form-item label="采购物品名称：" prop="name">
                <el-input v-model="formData.name" placeholder="请填写采购名称" maxlength="50" show-word-limit></el-input>
            </el-form-item>

            <el-form-item label="总分类：" prop="type1">
                <el-radio-group v-model="formData.classify">
                    <el-radio-group v-model="formData.type1" @change="classifyChange">
                        <el-radio v-for="(item, index) in sumClassifyOptions" :label="item.id" :key="index">{{ item.name }}</el-radio>
                    </el-radio-group>
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

            <el-row>
                <el-col :span="12">
                    <el-form-item label="具体需求描述：" prop="demand"><el-input v-model="formData.demand" maxlength="50" show-word-limit></el-input></el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="推荐厂家名称/联系方式："><el-input v-model="formData.factoryName" maxlength="50" show-word-limit></el-input></el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="推荐淘宝/京东链接：" prop="buyUrl"><el-input v-model="formData.buyUrl" placeholder="请输入链接"></el-input></el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="需求数量：" prop="num"><el-input v-model.number="formData.num" placeholder="请输入数量"></el-input></el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="单位：" prop="unit"><el-input v-model="formData.unit" placeholder="请输入单位"></el-input></el-form-item>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="型号参数：" prop="model"><el-input v-model="formData.model" placeholder="请填写型号参数"></el-input></el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="预估单价：" prop="price">
                                <el-input @blur="getApplyUserInfo" v-model.number="formData.price" placeholder="请输入单价"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="预估总价："><el-input v-model.number="totalPrice" disabled placeholder="请输入总价"></el-input></el-form-item>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>

            <el-form-item label="描述截图：" prop="invoiceImg">
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

            <el-form-item label="备注：">
                <el-input type="textarea" v-model="formData.remark" :rows="2" maxlength="80" show-word-limit placeholder="特殊要求(例如: 保质期, 定制尺寸和颜色等等)"></el-input>
            </el-form-item>

            <el-row>
                <el-col :span="16">
                    <el-form-item label="收货信息：" prop="contact">
                        <el-input v-model="formData.contact" placeholder="请填写收货地址" maxlength="50" show-word-limit></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="预计到货时间：">
                        <el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="date" v-model="formData.guessTime" placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>

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
        <el-button type="primary" class="invoiceRules">报销规范</el-button>
    </div>
</template>

<script>
import { getApplyUserInfo } from '../../../api/admin/user.js';
import { getPurchase, ApplyPurchase, getApprover, editApplyPurchase } from '../../../api/purchase/purchase.js';
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            query: {
                companyId: null,
                userId: null,
                deptId: null,
                itemId: null,
                type1: null,
                type: 6,
                price: 0
            },
            formData: {
                newData: true,
                userId: null,
                itemId: 0,
                // 采购负责人
                approverids: '',
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
                isOpen: null,
                pactImg: '',
                pactPrice: null,
                purchaseStatus: null,
                payStatus: null,
                invoiceStatus: null,
                companyName: null,
                bankName: null,
                bankAccount: null
            },

            rules: {
                name: [
                    {
                        required: true,
                        message: '请填写采购物品名称',
                        trigger: 'change'
                    }
                ],
                type1: [{ required: true, message: '请选择总分类', trigger: 'change' }],
                type2: [{ required: true, message: '请选择主分类', trigger: 'change' }],
                type3: [{ required: true, message: '请选择明细分类' }],
                demand: [{ required: true, message: '请填写具体需求描述' }],
                num: [{ required: true, message: '请填写数量', trigger: 'change' }],
                unit: [{ required: true, message: '请填写单位', trigger: 'change' }],
                model: [{ required: true, message: '请填写型号参数', trigger: 'change' }],
                price: [{ required: true, message: '请填写单价', trigger: 'change' }],
                contact: [{ required: true, message: '请选择收货地址', trigger: 'change' }]
            },
            saving: false,
            uploadUrl: '',
            fileList2: [],
            applyUserList: [],
            sumClassifyOptions: [],
            mainClassifyOptions: [],
            subClassifyOptions: []
        };
    },
    created() {
        this.formData.userId = this.userId;
        this.query.userId = this.userId;
        this.formData.userId = this.userId;
        this.getPurchase('100000', this.userId);
        this.uploadUrl = `${window.location.origin}/apply/purchase/upload`;

        const editPurchaseInfo = JSON.parse(window.localStorage.getItem('editPurchaseInfo'));
        if (editPurchaseInfo) {
            this.formData.newData = false;
            this.formData.name = editPurchaseInfo.name;
            this.formData.buyUrl = editPurchaseInfo.buyUrl;
            this.formData.itemId = editPurchaseInfo.itemId;
            this.formData.purchaseId = editPurchaseInfo.purchaseId;

            this.query.itemId = editPurchaseInfo.itemId;
            this.formData.type1 = editPurchaseInfo.type1;
            if (editPurchaseInfo.itemId != 0) {
                this.formData.type2 = [editPurchaseInfo.type2, editPurchaseInfo.itemId];
            } else {
                this.formData.type2 = [editPurchaseInfo.type2];
            }
            this.formData.type3 = editPurchaseInfo.type3;
            this.formData.factoryName = editPurchaseInfo.factoryName;
            this.formData.model = editPurchaseInfo.model;
            this.formData.demand = editPurchaseInfo.demand;
            this.formData.num = editPurchaseInfo.num;
            this.formData.unit = editPurchaseInfo.unit;
            this.formData.price = editPurchaseInfo.price * 0.01;
            this.formData.guessPrice = editPurchaseInfo.guessPrice * 0.01;
            this.formData.remark = editPurchaseInfo.remark;
            this.formData.purchaseImg = editPurchaseInfo.purchaseImg;
            this.formData.contact = editPurchaseInfo.contact;
            this.formData.guessTime = editPurchaseInfo.guessTime;
            this.formData.expressName = editPurchaseInfo.expressName;
            this.formData.expressNum = editPurchaseInfo.expressNum;
            this.formData.isOpen = editPurchaseInfo.isOpen;
            this.formData.pactImg = editPurchaseInfo.pactImg;
            this.formData.pactPrice = editPurchaseInfo.pactPrice;
            this.formData.purchaseStatus = editPurchaseInfo.purchaseStatus;
            this.formData.payStatus = editPurchaseInfo.payStatus;
            this.formData.invoiceStatus = editPurchaseInfo.invoiceStatus;
            this.formData.companyName = editPurchaseInfo.companyName;
            this.formData.bankName = editPurchaseInfo.bankName;
            this.formData.bankAccount = editPurchaseInfo.bankAccount;
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
            if (editPurchaseInfo.purchaseImg) {
                editPurchaseInfo.purchaseImg.split(',').forEach((item, index) => {
                    if (item) {
                        this.fileList2.push({
                            url: `${window.location.origin}/apply/purchase/` + item
                        });
                    }
                });
            }
        }
    },
    computed: {
        ...mapGetters(['permissions', 'userId']),

        // 计算总价
        totalPrice: {
            get() {
                this.formData.guessPrice = this.formData.num * this.formData.price;
                return this.formData.guessPrice;
            },
            set(value) {
                this.formData.guessPrice = value;
            }
        }
    },
    methods: {
        // 获取总类
        getPurchase(id, userId) {
            getPurchase(id, userId).then(res => {
                console.log(res);
                this.sumClassifyOptions = res.data.data.purchaseType;
            });
        },

        // 主分类
        classifyChange(val) {
            (this.mainClassifyOptions = []), (this.subClassifyOptions = []);
            getPurchase(val, this.query.userId).then(res => {
                res.data.data.purchaseType.forEach(item => {
                    this.mainClassifyOptions.push({
                        value: item.id,
                        label: item.name,
                        children: item.children
                    });
                });
            });
        },

        // 详情分类
        classifyChange2(val) {
            this.query.itemId = null;
            this.formData.itemId = 0;
            getPurchase(val[0], this.query.userId).then(res => {
                this.subClassifyOptions = res.data.data.purchaseType;
            });

            // 获取项目id
            if (val.length > 1 && val.length < 3) {
                this.query.itemId = val[1];
                this.formData.itemId = val[1];
                // this.getApplyUser();
            } else if (val.length == 3) {
                this.query.itemId = val[2];
                this.formData.itemId = val[2];
                // this.getApplyUser();
            } else {
                this.query.itemId = null;
                this.formData.itemId = 0;
            }
        },

        getApplyUserInfo() {
            this.query.guessPrice = this.formData.guessPrice;
            this.query.type1 = this.formData.type1;
            getApprover(this.query).then(response => {
                this.applyUserList = [];
                this.formData.approverids = null;
                console.log(response);
                response.data.data.forEach(element => {
                    this.applyUserList.push({
                        userId: element.checkUserId,
                        username: element.checkUserName,
                        avatar: element.checkUserAvatar
                    });
                    if (this.formData.approverids == null) {
                        this.formData.approverids += element.checkUserId;
                    } else {
                        this.formData.approverids += ',' + element.checkUserId;
                    }
                });
            });
        },

        handlePreview2(file) {
            console.log(file);
        },
        handleRemove2(data) {
            var serverUrl = `${window.location.origin}/apply/purchase/`;
            const imgUrl = data.url.replace(serverUrl, '');
            this.formData.purchaseImg = this.formData.purchaseImg.replace(imgUrl + ',', '');
        },
        handSuccess2(data) {
            const imgInfo = data.data;
            const imgUrl = imgInfo.bucketName + '-' + imgInfo.fileName;
            this.formData.purchaseImg += imgUrl + ',';
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

        // 提交
        onSubmit() {
            this.formData.type2 = this.formData.type2[0];
			console.log(this.formData)
            this.$refs['formData'].validate(valid => {
                if (valid) {
                    this.saving = true;

                    if (!this.formData.newData) {
                        console.log(this.formData);
                        editApplyPurchase(this.formData)
                            .then(res => {
                                console.log(res);
                                if (res.data.data) {
                                    this.backHistory();
                                }
                            })
                            .finally(() => {
                                this.saving = false;
                            });
                    } else {
                        ApplyPurchase(this.formData)
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

        // 取消
        backHistory() {
            window.localStorage.removeItem('editPurchaseInfo');
            this.formData.newData = true;
            this.formData.approverids = '';
            this.formData.name = '';
            this.formData.type1 = '';
            this.formData.type2 = '';
            this.formData.type3 = '';
            this.formData.buyUrl = '';
            this.formData.factoryName = '';
            this.formData.model = '';
            this.formData.num = '';
            this.formData.unit = '';
            this.formData.price = '';
            this.formData.guessPrice = '';
            this.formData.remark = '';
            this.formData.guessTime = '';
            this.formData.demand = '';
            this.formData.purchaseImg = '';
            this.formData.contact = '';
            this.formData.expressName = null;
            this.formData.expressNum = null;
            this.formData.isOpen = null;
            this.formData.pactImg = '';
            this.formData.pactPrice = null;
            this.formData.purchaseStatus = null;
            this.formData.payStatus = null;
            this.formData.invoiceStatus = null;
            this.formData.companyName = null;
            this.formData.bankName = null;
            this.formData.bankAccount = null;
            this.$router.push('/purchase/form');
        }
    }
};
</script>

<style></style>
