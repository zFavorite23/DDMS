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
                        <span>{{ scope.row.itemName }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="proportion" min-width="80" label="开票比例">
                    <template slot-scope="scope">
                        <span>{{ scope.row.proportion == null ? '' : `${scope.row.proportion}%` }}</span>
                    </template>
                </el-table-column>
                <el-table-column min-width="80" label="开票金额">
                    <template slot-scope="scope">
                        <span>{{ scope.row.price == null ? '' : `${scope.row.price}元` }}</span>
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
                        <span v-if="scope.row.content == 25">*工程服务*</span>
                        <span v-if="scope.row.content == 26">*现代服务*</span>
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
import { getReceipt } from '../../api/project/item.js';
import { getSupplierPage, addObj, editObj, deleteObj } from '../../api/customer/supplier.js';
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            itemId: '',
            query: {
                userId: null,
                status: '',
                current: 1,
                size: 10
            },
            pages: 0,
            total: 0,
            listLoading: false,
            list: [],
            number: '',
            listType: '1',
            proportion: 0
        };
    },
    computed: {
        ...mapGetters(['permissions'])
    },
    created() {
        this.itemId = this.$route.params.itemId;
        // console.log(this.itemId);
        // 获取开票信息列表
        this.getReceiptList();
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

        // 获取开票信息列表
        getReceiptList() {
            getReceipt(this.itemId).then(res => {
                console.log(res);
                this.list = res.data.data;
                this.total = res.data.data.length;
                this.list.forEach(item => {
                    this.proportion += Number(item.proportion);
                });
                this.$nextTick(function() {
                    this.drawPie();
                });
            });
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
                                value: this.proportion,
                                name: `已开票 ${this.proportion}%`
                            },
                            {
                                name: ' ',
                                value: 100 - this.proportion,
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
                                value: 100 - this.proportion,
                                name: `未开票 ${100 - this.proportion}%`
                            },
                            {
                                name: ' ',
                                value: this.proportion,
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
