<template>
    <div>
        <el-form :inline="true" :model="query">
            <!-- <el-form-item><span class="tit">未经审批需填报--银行收入</span></el-form-item> -->
            <el-form-item><el-button type="primary" @click="dialogFormVisible = true" size="mini">收入录入</el-button></el-form-item>
        </el-form>
        <el-dialog title="收入录入" :visible.sync="dialogFormVisible">
            <el-form :model="formData">
                <el-form-item label="甲方公司名称:" :label-width="formLabelWidth">
                    <el-input placeholder="请输入甲方公司名称" v-model="formData.oppositeName" clearable></el-input>
                </el-form-item>
                <el-form-item label="银行发生时间:" :label-width="formLabelWidth">
                    <el-date-picker v-model="formData.data" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item label="项目名称:" :label-width="formLabelWidth">
                    <el-select v-model="formData.itemName" filterable clearable placeholder="请选择项目">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="我方公司名称:" :label-width="formLabelWidth">
                    <el-select v-model="formData.name" clearable placeholder="请选择我方公司">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="金额:" :label-width="formLabelWidth"><el-input placeholder="请输入金额" v-model="formData.money" clearable></el-input></el-form-item>
                <el-form-item label="收入类型:" :label-width="formLabelWidth">
                    <el-select v-model="formData.type" clearable placeholder="请选择收入类型">
                        <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
        <el-table stripe border style="width: 100%;">
            <el-table-column min-width="120" label="银行发生日期"></el-table-column>
            <el-table-column min-width="180" label="项目名称"></el-table-column>
            <el-table-column min-width="100" label="金额"></el-table-column>
            <el-table-column min-width="120" label="我方公司名称"></el-table-column>
            <el-table-column min-width="120" label="甲方公司名称"></el-table-column>
            <el-table-column min-width="120" label="收入类型"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            dialogFormVisible: false,
            query: {
                userId: null,
                type: 6
            },
            formData: {
                data: '',
                itemName: '',
                name: '',
                money: '',
                oppositeName: '',
                type: ''
            },
            saving: false,
            formLabelWidth: '120px',
            options: [
                {
                    value: '1',
                    label: '北京甲板智慧科技有限公司'
                },
                {
                    value: '2',
                    label: '北京甲板数字科技有限公司'
                },
                {
                    value: '3',
                    label: '北京甲板瑞城科技有限公司'
                },
                {
                    value: '4',
                    label: '济宁市万城象限信息科技中心'
                },
                {
                    value: '5',
                    label: '济宁市数源矩阵信息科技中心'
                },
                {
                    value: '6',
                    label: '上海道趣信息技术中心'
                },
                {
                    value: '7',
                    label: '单保晔'
                },
                {
                    value: '8',
                    label: '单保勇'
                }
            ],
            options2: [
                {
                    value: '1',
                    label: '银行利息'
                },
                {
                    value: '2',
                    label: '投资收益'
                },
                {
                    value: '3',
                    label: '政府补贴'
                },
                {
                    value: '4',
                    label: '内部走账'
                },
                {
                    value: '5',
                    label: '押金及保证金退回'
                },
                {
                    value: '6',
                    label: '理财'
                },
                {
                    value: '7',
                    label: '其它'
                }
            ]
        };
    },
    computed: {
        ...mapGetters(['userId'])
    },
    created() {
        this.query.userId = this.userId;
    },
    methods: {}
};
</script>

<style></style>
