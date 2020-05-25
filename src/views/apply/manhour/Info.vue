<template>
    <div>
        <div class="" id="myCanvas">
            <span class="tit">工时 / 总数 : {{ total }}</span>
        </div>
        <el-table :data="list" stripe border v-loading="listLoading" style="width: 100%;" ref="imageTofile">
            <el-table-column width="50" label="序号">
                <template scope="scope">
                    <span>{{ scope.$index + (query.current - 1) * query.size + 1 }}</span>
                </template>
            </el-table-column>
            <el-table-column min-width="200" label="项目" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <span v-if="scope.row.alias == null || scope.row.alias == ''">与项目无关</span>
                    <span v-else>{{ scope.row.alias }}</span>
                </template>
            </el-table-column>
            <el-table-column min-width="100" label="验收人">
                <template slot-scope="scope">
                    <span v-if="scope.row.checkUserList != ''">
                        <div class="tag-group" v-for="item in scope.row.checkUserList">
                            <p>{{ item.checkUserName }}</p>
                        </div>
                    </span>
                    <span v-else><p>无人验收</p></span>
                </template>
            </el-table-column>
            <el-table-column prop="day" min-width="100" label="申请日期"></el-table-column>
            <el-table-column min-width="100" label="自评积分">
                <template slot-scope="scope">
                    <span>{{ scope.row.integral }} 分</span>
                </template>
            </el-table-column>

            <el-table-column min-width="80" label="工作类别">
                <template slot-scope="scope">
                    <p v-if="scope.row.category == 1">管理</p>
                    <p v-else-if="scope.row.category == 2">项目</p>
                    <p v-else-if="scope.row.category == 3">产品</p>
                    <p v-else-if="scope.row.category == 4">长身体</p>
                    <p v-else></p>
                </template>
            </el-table-column>
            <el-table-column min-width="120" label="分类" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <p v-if="scope.row.category == '1' && scope.row.mainClassify == 1">
                        公司管理
                        <br />
                        <span v-if="scope.row.subClassify == 1">公司战略规划</span>
                        <span v-if="scope.row.subClassify == 2">客户对接</span>
                        <span v-if="scope.row.subClassify == 3">项目对接</span>
                        <span v-if="scope.row.subClassify == 4">人员管理及招聘</span>
                        <span v-if="scope.row.subClassify == 5">其他事务</span>
                    </p>
                    <p v-if="scope.row.category == '1' && scope.row.mainClassify == 2">
                        财务管理
                        <br />
                        <span v-if="scope.row.subClassify == 1">开票</span>
                        <span v-if="scope.row.subClassify == 2">支付</span>
                        <span v-if="scope.row.subClassify == 3">税筹</span>
                        <span v-if="scope.row.subClassify == 4">账务处理</span>
                        <span v-if="scope.row.subClassify == 5">预算</span>
                        <span v-if="scope.row.subClassify == 6">补贴申报</span>
                        <span v-if="scope.row.subClassify == 7">v</span>
                    </p>
                    <p v-if="scope.row.category == '1' && scope.row.mainClassify == 3">
                        人事管理
                        <br />
                        <span v-if="scope.row.subClassify == 1">薪酬福利管理</span>
                        <span v-if="scope.row.subClassify == 2">考勤管理</span>
                        <span v-if="scope.row.subClassify == 3">员工入职手续办理</span>
                        <span v-if="scope.row.subClassify == 4">招聘</span>
                        <span v-if="scope.row.subClassify == 5">培训</span>
                        <span v-if="scope.row.subClassify == 6">员工关系管理</span>
                        <span v-if="scope.row.subClassify == 7">其他事务</span>
                    </p>
                    <p v-if="scope.row.category == '1' && scope.row.mainClassify == 4">
                        部门管理
                        <br />
                        <span v-if="scope.row.subClassify == 1">人员招聘</span>
                        <span v-if="scope.row.subClassify == 2">人员管理及培训</span>
                        <span v-if="scope.row.subClassify == 3">部门发展计划</span>
                        <span v-if="scope.row.subClassify == 4">工作流程</span>
                        <span v-if="scope.row.subClassify == 5">其他日常事务</span>
                    </p>
                    <p v-if="scope.row.category == '1' && scope.row.mainClassify == 5">
                        工厂管理
                        <br />
                        <span v-if="scope.row.subClassify == 1">工厂备料</span>
                        <span v-if="scope.row.subClassify == 2">环境卫生</span>
                        <span v-if="scope.row.subClassify == 3">房租水电</span>
                        <span v-if="scope.row.subClassify == 4">其他事务</span>
                    </p>

                    <p v-if="scope.row.category == '2'">
                        <span v-if="scope.row.subClassify == 1">管理</span>
                        <span v-if="scope.row.subClassify == 2">销售</span>
                        <span v-if="scope.row.subClassify == 3">售前</span>
                        <span v-if="scope.row.subClassify == 4">交付</span>
                        <span v-if="scope.row.subClassify == 5">产品</span>
                    </p>

                    <p v-if="scope.row.category == '3'">
                        <span v-if="scope.row.subClassify == 1">管理</span>
                        <span v-if="scope.row.subClassify == 2">交付</span>
                    </p>

                    <p v-if="scope.row.category == '4'">
                        <span v-if="scope.row.subClassify == 1">学习</span>
                        <span v-if="scope.row.subClassify == 2">吃饭</span>
                        <span v-if="scope.row.subClassify == 3">睡觉</span>
                    </p>
                </template>
            </el-table-column>
            <el-table-column prop="reason" min-width="150" label="工作内容" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column min-width="100" label="工时">
                <template slot-scope="scope">
                    <span>{{ scope.row.useHour }} 小时</span>
                </template>
            </el-table-column>
            <el-table-column min-width="120" label="审批工时">
                <template slot-scope="scope">
                    <p v-if="scope.row.checkMin!=null">{{ scope.row.checkMin }} 小时</p>
                    <p v-else>{{ scope.row.checkMin }}</p>
                </template>
            </el-table-column>
            <el-table-column min-width="100" label="反馈意见">
                <template slot-scope="scope">
                    <p>{{ scope.row.summary }}</p>
                </template>
            </el-table-column>
            <el-table-column prop="status" min-width="100" label="审批状态">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.status == 0" type="warning">审批中</el-tag>
                    <el-tag v-if="scope.row.status == 1 && scope.row.complete == '100'" type="success">同意</el-tag>
                    <el-tag v-if="scope.row.status == 1 && scope.row.complete != '100'" type="warning">同意(未完成)</el-tag>
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
</template>
<script>
import { getManhourPage, deleteObj, completeObj } from '../../../api/apply/manhour.js';
// import {getUserInfo} from "../../../api/admin/user.js";
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
            statusOptions: [
                {
                    value: '',
                    label: '全部'
                },
                {
                    value: '0',
                    label: '审批中'
                },
                {
                    value: '1',
                    label: '同意'
                },
                {
                    value: '2',
                    label: '拒绝'
                }
            ],
            pages: 0,
            total: 0,
            listLoading: false,
            list: [],
            number: '',
            listType: '1',
            htmlUrl: '',
            dialogVisible: false,
            completeOptions: [
                { value: '0', label: '未完成' },
                { value: '100', label: '已完成' },
                { value: '10', label: '完成10%' },
                { value: '20', label: '完成20%' },
                { value: '30', label: '完成30%' },
                { value: '40', label: '完成40%' },
                { value: '50', label: '完成50%' },
                { value: '60', label: '完成60%' },
                { value: '70', label: '完成70%' },
                { value: '80', label: '完成80%' },
                { value: '90', label: '完成90%' }
            ],
            formData: {
                manhourId: '',
                complete: '100',
                completeTime: ''
            },
            rules: {
                complete: [
                    {
                        required: true,
                        message: '请选择完成情况',
                        trigger: 'change'
                    }
                ],
                completeTime: [
                    {
                        required: true,
                        message: '请选择预计完成时间',
                        trigger: 'change'
                    }
                ]
            },
            saving: false,
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < new Date().getTime() - 3600 * 1000 * 24 * 10 || time.getTime() > new Date().getTime() + 3600 * 1000 * 24 * 20;
                }
            }
        };
    },
    created() {
        window.localStorage.removeItem('editManhourInfo');
        this.query.status = this.$route.query.status;
        if (!this.query.status) {
            this.query.status = '';
        }
        this.query.userId = this.userId;
        this.getManhourPage();
    },
    computed: {
        ...mapGetters(['permissions', 'userId'])
    },
    methods: {
        openList(val) {
            if (val == 2) {
                this.$router.push({
                    path: '/apply/manhour/approver'
                });
            }
        },
        handleSizeChange(val) {
            this.query.size = val;
            this.getManhourPage();
        },
        handleCurrentChange(val) {
            this.query.current = val;
            this.getManhourPage();
        },

        getManhourPage() {
            this.listLoading = true;
            getManhourPage(this.query)
                .then(response => {
                    this.listLoading = false;
                    this.total = response.data.data.total;
                    this.query.current = response.data.data.current;
                    this.query.size = response.data.data.size;
                    this.list = response.data.data.records;
                    console.log(this.list);
                    for (var i = 0; i < this.list.length; i++) {
                        if (this.list[i].alias == '' || this.list[i].alias == null || this.list[i].alias == undefined) {
                            this.list[i].alias = '与项目无关';
                        }
                    }
                })
                .catch(() => {
                    this.listLoading = false;
                });
        },
        handInfo(data) {
            this.$router.push({
                path: '/apply/manhour/info/' + data.manhourId
            });
        },
        handleModal(data) {
            window.localStorage.setItem('editManhourInfo', JSON.stringify(data));
            this.$router.push({
                path: '/apply/manhour/form'
            });
        },
        handleDel(index, row) {
            if (row.manhourId) {
                this.$confirm('确认删除吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    deleteObj(row.manhourId).then(res => {
                        if (res.data.data) {
                            this.getManhourPage();
                        }
                    });
                });
            }
        },
        handleComplete(index, row) {
            this.formData.manhourId = row.manhourId;
            this.formData.complete = row.complete;
            this.formData.completeTime = row.completeTime;

            this.dialogVisible = true;
        },
        handleSubmit() {
            this.$refs['formData'].validate(valid => {
                if (valid) {
                    this.saving = true;
                    completeObj(this.formData)
                        .then(res => {
                            if (res.data.data) {
                                this.dialogVisible = false;
                                this.getManhourPage();
                            }
                        })
                        .finally(() => {
                            this.saving = false;
                        });
                }
            });
        }
    },
    mounted() {}
};
</script>
<style type="text/scss" lang="scss"></style>
