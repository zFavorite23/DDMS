<template>
    <div>
        <div style="display: flex; justify-content: space-between;margin-bottom: 1%;">
            <span class="tit">工时审批 / 总数 : {{ total }}</span>
            <el-button size="mini" type="primary" style="margin-right: 30px;" @click="updateManhourAll">一键通过</el-button>
        </div>
        <el-table :data="list" stripe border v-loading="listLoading" style="width: 100%;">
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
            <el-table-column prop="applyUserName" min-width="80" label="申请人"></el-table-column>
            <el-table-column prop="day" min-width="100" label="申请日期"></el-table-column>
            <el-table-column label="自评积分">
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
            <el-table-column label="分类" :show-overflow-tooltip="true">
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
            <el-table-column label="工时">
                <template slot-scope="scope">
                    <span>{{ scope.row.useHour }} 小时</span>
                </template>
            </el-table-column>
            <el-table-column min-width="120" label="审批工时">
                <template slot-scope="scope">
                    <p v-show="scope.row.show" v-if="scope.row.status == 1">{{ scope.row.checkMin }} 小时</p>
                    <p v-show="scope.row.show" v-else>{{ scope.row.useHour }} 小时</p>
                    <el-input-number
                        v-show="!scope.row.show"
                        v-model="scope.row.checkMin"
                        controls-position="right"
                        size="mini"
                        :max="Number(scope.row.useHour) + 2"
                        :min="Number(scope.row.useHour) - 2"
                    ></el-input-number>
                </template>
            </el-table-column>
            <el-table-column min-width="100" label="反馈意见">
                <template slot-scope="scope">
                    <p v-show="scope.row.show">{{ scope.row.summary }}</p>
                    <el-input v-show="!scope.row.show" v-model="scope.row.summary" size="mini" placeholder="请输入内容"></el-input>
                </template>
            </el-table-column>
            <el-table-column min-width="180" label="完成进度">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.complete == '100'" type="success">已完成</el-tag>
                    <el-tag v-else type="warning">完成 {{ scope.row.complete }}% 预计{{ scope.row.completeTime }}完成</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" min-width="140" fixed="right">
                <template slot-scope="scope">
                    <span v-if="scope.row.status == 0">
                        <span v-if="scope.row.show == true">
                            <el-button size="mini" type="primary" @click="updateManhourApprover(scope.$index)">通过</el-button>
                            <el-button size="mini" type="primary" @click="scope.row.show = false">不通过</el-button>
                        </span>
                        <span v-if="scope.row.show == false">
                            <el-button size="mini" type="primary" @click="updateManhourApprover(scope.$index)">确定</el-button>
                            <el-button size="mini" type="primary" @click="scope.row.show = true">返回</el-button>
                        </span>
                    </span>

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
import { getManhourApproverPage, updateManhourApprover, updateManhourApproverAll } from '../../../api/apply/manhour.js';
// import {getUserInfo} from "../../../api/admin/user.js";
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            show: '',
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
            listType: '2'
        };
    },
    created() {
        window.localStorage.removeItem('editManhourInfo');
        this.query.status = this.$route.query.status;
        if (!this.query.status) {
            this.query.status = '';
        }
        this.query.userId = this.userId;
        this.getManhourApproverPage();
    },
    computed: {
        ...mapGetters(['permissions', 'userId'])
    },
    methods: {
        getManhourApproverPage() {
            this.listLoading = true;
            getManhourApproverPage(this.query)
                .then(response => {
                    this.listLoading = false;
                    this.total = response.data.data.total;
                    this.query.current = response.data.data.current;
                    this.query.size = response.data.data.size;
                    this.list = response.data.data.records;
                    this.list.forEach(item => {
                        this.$set(item, 'show', true);
                    });
                    console.log(this.list);
                })
                .catch(() => {
                    this.listLoading = false;
                });
        },
        handleSizeChange(val) {
            this.query.size = val;
            this.getManhourApproverPage();
        },
        handleCurrentChange(val) {
            this.query.current = val;
            this.getManhourApproverPage();
        },
        // 单行审批
        updateManhourApprover(val) {
            if (this.list[val].checkMin == this.list[val].useHour - 2 || this.list[val].checkMin == 0) {
                this.list[val].checkMin = this.list[val].useHour;
            }
            this.list[val].checkMin = parseFloat(this.list[val].checkMin);
            console.log(typeof this.list[val].checkMin)
            console.log(this.list[val])
            // updateManhourApprover(this.list[val]).then(res => {
            //     console.log(res);
            //     this.getManhourApproverPage();
            // });
        },

        // 一键审批
        updateManhourAll() {
            var Newlist = this.list.filter(item => item.status == 0);
            for (var i = 0; i < Newlist.length; i++) {
                if (Newlist[i].checkMin == Newlist[i].useHour - 2 || this.list[val].checkMin == 0) {
                    Newlist[i].checkMin = Newlist[i].useHour;
                }
            }
            updateManhourApproverAll(Newlist).then(res => {
                console.log(res);
                this.getManhourApproverPage();
                this.show = true;
            });
        }
    },
    mounted() {}
};
</script>
<style type="text/scss" lang="scss"></style>
