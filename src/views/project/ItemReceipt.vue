<template>
    <div>
        <div class="top"><div id="pie" class="pie"></div></div>

        <div class="list">
            <div class="">
                <span class="tit">开票 / 总数 : {{ total }}</span>
            </div>
            <el-table :data="list" stripe border v-loading="listLoading" style="width: 100%;">
                <el-table-column width="50" label="序号">
                    <template scope="scope">
                        <span>{{ scope.$index + (query.current - 1) * query.size + 1 }}</span>
                    </template>
                </el-table-column>
                <el-table-column min-width="120" label="项目" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span v-if="scope.row.alias == null || scope.row.alias == ''">与项目无关</span>
                        <span v-else>{{ scope.row.alias }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="proportion" min-width="80" label="开票比例"></el-table-column>
                <el-table-column min-width="80" label="开票金额">
                    <template slot-scope="scope">
                        <span>{{ scope.row.priceYuan }} 元</span>
                    </template>
                </el-table-column>
                <el-table-column prop="type" min-width="80" label="开票类型">
                    <template slot-scope="scope">
                        <span v-if="scope.row.type == 1">专票</span>
                        <span v-if="scope.row.type == 2">普票</span>
                        <span v-else>未识别</span>
                    </template>
                </el-table-column>
                <el-table-column prop="name" min-width="200" label="开票公司名称" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column min-width="120" label="开票内容" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <span v-if="scope.row.content == 11">*研发和技术服务*专业技术服务</span>
                        <span v-if="scope.row.content == 12">*研发和技术服务*软件开发</span>
                        <span v-if="scope.row.content == 13">*设计服务*专业设计服务</span>
                        <span v-if="scope.row.content == 14">*其他咨询服务*其他咨询服务</span>
                        <span v-if="scope.row.content == 21">*印刷品*图片、设计图样及照片</span>
                        <span v-if="scope.row.content == 22">*软件*系统软件产品</span>
                        <span v-if="scope.row.content == 23">*硬件*</span>
                        <span v-if="scope.row.content == 24">*现代服务*服务费</span>
                        <span v-else>{{ scope.row.content }}</span>
                    </template>
                </el-table-column>
                <el-table-column min-width="100" label="审批状态">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.status == 0" type="warning">审批中</el-tag>
                        <el-tag v-if="scope.row.status == 1" type="success">同意</el-tag>
                        <el-tag v-if="scope.row.status == 2" type="danger">拒绝</el-tag>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                class="right"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="query.current"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="query.size"
                layout="total, sizes, prev, pager, next"
                :total="total"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
import { getSupplierPage, addObj, editObj, deleteObj } from '../../api/customer/supplier.js';
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            query: {
                userId: null,
                status: '',
                current: 1,
                size: 10
            },
            pages: 0,
            total: 6,
            listLoading: false,
            list: [
                {
                    proportion: '10%',
                    type: 2,
                    priceYuan: 999,
                    name: '测试',
                    content: '测试',
                    status: 1
                },
                {
                    proportion: '53%',
                    type: 2,
                    priceYuan: 1111,
                    name: '测试2',
                    content: '测试2',
                    status: 1
                },
                {
                    proportion: '19%',
                    type: 2,
                    priceYuan: 99,
                    name: '测试3',
                    content: '测试3',
                    status: 1
                },
                {
                    proportion: '19%',
                    type: 2,
                    priceYuan: 99,
                    name: '测试3',
                    content: '测试3',
                    status: 1
                },
                {
                    proportion: '19%',
                    type: 2,
                    priceYuan: 99,
                    name: '测试3',
                    content: '测试3',
                    status: 1
                },
                {
                    proportion: '19%',
                    type: 2,
                    priceYuan: 99,
                    name: '测试3',
                    content: '测试3',
                    status: 1
                }
            ],
            number: '',
            listType: '1'
        };
    },
    computed: {
        ...mapGetters(['permissions'])
    },
    created() {
        this.$nextTick(function() {
            this.drawPie();
        });
    },
    mounted() {},
    methods: {
        handleSizeChange(val) {
            this.query.size = val;
            this.getReceiptPage();
        },
        handleCurrentChange(val) {
            this.query.current = val;
            this.getReceiptPage();
        },
        drawPie() {
            let pie = this.$echarts.init(document.getElementById('pie'));
            let optionPie = {
                series: [
                    {
                        center: ['25.0%', '50%'],
                        radius: ['49%', '50%'],
                        clockWise: false,
                        hoverAnimation: false,
                        type: 'pie',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        fontSize: 15,
                                        fontWeight: 'bold'
                                    },
                                    position: 'center'
                                },
                                labelLine: {
                                    show: false
                                },
                                color: '#5886f0',
                                borderColor: '#5886f0',
                                borderWidth: 25
                            },
                            emphasis: {
                                label: {
                                    textStyle: {
                                        fontSize: 15,
                                        fontWeight: 'bold'
                                    }
                                },
                                color: '#5886f0',
                                borderColor: '#5886f0',
                                borderWidth: 25
                            }
                        },
                        data: [
                            {
                                value: 80,
                                name: '已开票 80%'
                            },
                            {
                                name: ' ',
                                value: 20,
                                itemStyle: {
                                    normal: {
                                        label: {
                                            show: false
                                        },
                                        labelLine: {
                                            show: false
                                        },
                                        color: '#5886f0',
                                        borderColor: '#5886f0',
                                        borderWidth: 0
                                    },
                                    emphasis: {
                                        color: '#5886f0',
                                        borderColor: '#5886f0',
                                        borderWidth: 0
                                    }
                                }
                            }
                        ]
                    },
                    {
                        center: ['75.0%', '50%'],
                        radius: ['49%', '50%'],
                        clockWise: false,
                        hoverAnimation: false,
                        type: 'pie',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        fontSize: 15,
                                        fontWeight: 'bold'
                                    },
                                    position: 'center'
                                },
                                labelLine: {
                                    show: false
                                },
                                color: '#ee3a3a',
                                borderColor: '#ee3a3a',
                                borderWidth: 25
                            },
                            emphasis: {
                                label: {
                                    textStyle: {
                                        fontSize: 15,
                                        fontWeight: 'bold'
                                    }
                                },
                                color: '#ee3a3a',
                                borderColor: '#ee3a3a',
                                borderWidth: 25
                            }
                        },
                        data: [
                            {
                                value: 20,
                                name: '未开票 20%'
                            },
                            {
                                name: ' ',
                                value: 80,
                                itemStyle: {
                                    normal: {
                                        label: {
                                            show: false
                                        },
                                        labelLine: {
                                            show: false
                                        },
                                        color: '#ee3a3a',
                                        borderColor: '#ee3a3a',
                                        borderWidth: 0
                                    },
                                    emphasis: {
                                        color: '#ee3a3a',
                                        borderColor: '#ee3a3a',
                                        borderWidth: 0
                                    }
                                }
                            }
                        ]
                    }
                ]
            };
            pie.setOption(optionPie, (window.onresize = pie.resize));
        }
    }
};
</script>

<style type="text/scss" scoped lang="scss">
.top {
    width: 100%;
    margin-top: 15px;
    padding-bottom: 15px;
    border-bottom: 5px solid #969696;
    display: flex;
    justify-content: center;
}
.list {
    margin-top: 15px;
}
.pie {
    width: 600px;
    height: 400px;
}
</style>
