<template>
    <div>
        <div class="" id="myCanvas">
            <span class="tit">工时 / 总数 : {{ total }}</span>
        </div>
        <el-form :inline="true" :model="query">
            <el-form-item>
                <el-select clearable v-model="query.status" placeholder="请选择">
                    <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item><el-button type="primary" size="medium" v-on:click="getManhourPage()" icon="el-icon-search">搜索</el-button></el-form-item>
        </el-form>
        <el-table :data="list" :span-method="objectSpanMethod" stripe border v-loading="listLoading" style="width: 100%;" ref="imageTofile">
            <el-table-column prop="day" min-width="100" label="申请日期"></el-table-column>
            <el-table-column label="自评积分">
                <template slot-scope="scope">
                    <span>{{ scope.row.integral }} 分</span>
                </template>
            </el-table-column>
            <el-table-column min-width="200" label="项目" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <span v-if="scope.row.alias == null || scope.row.alias == ''">与项目无关</span>
                    <span v-else>{{ scope.row.alias }}</span>
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
            <el-table-column min-width="100" label="工时">
                <template slot-scope="scope">
                    <span>{{ scope.row.useHour }} 小时</span>
                </template>
            </el-table-column>
            <el-table-column label="审批工时">
                <template slot-scope="scope">
                    <p v-if="scope.row.checkMin != null">{{ scope.row.checkMin }} 小时</p>
                    <p v-else>{{ scope.row.useHour }} 小时</p>
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
            <el-table-column min-width="120" label="反馈意见">
                <template slot-scope="scope">
                    <p>{{ scope.row.summary }}</p>
                </template>
            </el-table-column>
            <el-table-column min-width="180" label="完成进度">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.complete == '100'" type="success">已完成</el-tag>
                    <div v-else>
                        <el-tag type="warning">完成 {{ scope.row.complete }}%</el-tag>
                        <el-tag type="warning">预计{{ scope.row.completeTime }}完成</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="status" min-width="100" label="审批状态">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.status == 0" type="warning">审批中</el-tag>
                    <el-tag v-if="scope.row.status == 1 && scope.row.complete == '100'" type="success">同意</el-tag>
                    <el-tag v-if="scope.row.status == 1 && scope.row.complete != '100'" type="warning">同意(未完成)</el-tag>
                    <el-tag v-if="scope.row.status == 2" type="danger">已拒绝</el-tag>
                </template>
            </el-table-column>
            <el-table-column min-width="80" label="删除操作">
                <template slot-scope="scope">
                    <el-button class="delete" v-if="scope.row.status == 0" type="danger" icon="el-icon-delete" circle @click="handleDel(scope.row)"></el-button>
                </template>
            </el-table-column>
            <el-table-column min-width="80" label="复制操作">
                <template slot-scope="scope">
                    <el-button class="delete" type="info" icon="el-icon-document-copy" circle @click="copyCode(scope.row)"></el-button>
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
import { getUserInfo } from '../../../api/admin/user.js';
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
            userList: '',
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < new Date().getTime() - 3600 * 1000 * 24 * 10 || time.getTime() > new Date().getTime() + 3600 * 1000 * 24 * 20;
                }
            },
            categoryOptions: [{ value: '1', label: '管理' }, { value: '2', label: '项目' }, { value: '3', label: '产品' }, { value: '4', label: '长身体' }]
        };
    },
    props: ['status'],
    created() {
        window.localStorage.removeItem('editManhourInfo');
        this.query.status = this.status;
        if (!this.query.status) {
            this.query.status = '';
        }
        this.query.userId = this.userId;
        this.getManhourPage();
        // console.log(this.status)
        this.getUserInfo();
    },
    computed: {
        ...mapGetters(['permissions', 'userId'])
    },
    methods: {
        // 获取个人信息
        getUserInfo() {
            getUserInfo(this.query.userId).then(res => {
                console.log(res);
                this.userList = res.data.data;
            });
        },
        // 分页
        handleSizeChange(val) {
            this.query.size = val;
            this.getManhourPage();
        },
        handleCurrentChange(val) {
            this.query.current = val;
            this.getManhourPage();
        },

        // 列表
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

        // 删除
        handleDel(row) {
            // console.log(row.manhourId)
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

        // 复制
        copyCode(row) {
            var copyList = this.list.filter(item => item.hourId == row.hourId);
            // 总工时
            var Hour = 0;
            copyList.forEach(item => {
                Hour += Number(item.useHour);
            });
            // 日期
            var reg = /(\d{4})\-(\d{2})\-(\d{2})/;
            var day = copyList[0].day.replace(reg, '$1年$2月$3日');
            if (copyList.length == 1) {
                // 工作类别
                for (var i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[0].category) {
                        var category_1 = this.categoryOptions[i].label;
                    }
                }
                // 验收人
                if (copyList[0].checkUserList.length != 0) {
                    var name_1 = copyList[0].checkUserList[0].checkUserName;
                }
                this.$copyText(
                    `${day}---${this.userList.deptName}-${this.userList.username}---自评分${copyList[0].integral}分---总工时${Hour}小时
${category_1}---${copyList[0].alias}---${copyList[0].reason}---${copyList[0].complete == 100 ? '已完成' : '未完成'}${
                        copyList[0].complete != 100 ? `---预计 ${copyList[0].completeTime} 完成` : ''
                    }---${copyList[0].checkUserList.length == 0 ? '无人验收' : `${name_1}验收`}---${copyList[0].useHour}小时`
                ).then(res => {
                    console.log(res);
                    // this.$toast("已成功复制，可直接去粘贴");
                });
            }
            if (copyList.length == 2) {
                // 工作类别
                for (var i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[0].category) {
                        var category_1 = this.categoryOptions[i].label;
                    }
                }
                for (var i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[1].category) {
                        var category_2 = this.categoryOptions[i].label;
                    }
                }
                // 验收人
                if (copyList[0].checkUserList.length != 0) {
                    var name_1 = copyList[0].checkUserList[0].checkUserName;
                }
                if (copyList[1].checkUserList.length != 0) {
                    var name_2 = copyList[1].checkUserList[0].checkUserName;
                }
                this.$copyText(
                    `${day}---${this.userList.deptName}-${this.userList.username}---自评分${copyList[0].integral}分---总工时${Hour}小时
${category_1}---${copyList[0].alias}---${copyList[0].reason}---${copyList[0].complete == 100 ? '已完成' : '未完成'}${
                        copyList[0].complete != 100 ? `---预计 ${copyList[0].completeTime} 完成` : ''
                    }---${copyList[0].checkUserList.length == 0 ? '无人验收' : `${name_1}验收`}---${copyList[0].useHour}小时
${category_2}---${copyList[1].alias}---${copyList[1].reason}---${copyList[1].complete == 100 ? '已完成' : '未完成'}${
                        copyList[1].complete != 100 ? `---预计 ${copyList[1].completeTime} 完成` : ''
                    }---${copyList[1].checkUserList.length == 0 ? '无人验收' : `${name_2}验收`}---${copyList[1].useHour}小时`
                ).then(res => {
                    console.log(res);
                    // this.$toast("已成功复制，可直接去粘贴");
                });
            }

            if (copyList.length == 3) {
                // 工作类别
                for (var i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[0].category) {
                        var category_1 = this.categoryOptions[i].label;
                    }
                }
                for (var i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[1].category) {
                        var category_2 = this.categoryOptions[i].label;
                    }
                }
                for (var i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[2].category) {
                        var category_3 = this.categoryOptions[i].label;
                    }
                }
                // 验收人
                if (copyList[0].checkUserList.length != 0) {
                    var name_1 = copyList[0].checkUserList[0].checkUserName;
                }
                if (copyList[1].checkUserList.length != 0) {
                    var name_2 = copyList[1].checkUserList[0].checkUserName;
                }
                if (copyList[2].checkUserList.length != 0) {
                    var name_3 = copyList[2].checkUserList[0].checkUserName;
                }
                this.$copyText(
                    `${day}---${this.userList.deptName}-${this.userList.username}---自评分${copyList[0].integral}分---总工时${Hour}小时
${category_1}---${copyList[0].alias}---${copyList[0].reason}---${copyList[0].complete == 100 ? '已完成' : '未完成'}${
                        copyList[0].complete != 100 ? `---预计 ${copyList[0].completeTime} 完成` : ''
                    }---${copyList[0].checkUserList.length == 0 ? '无人验收' : `${name_1}验收`}---${copyList[0].useHour}小时
${category_2}---${copyList[1].alias}---${copyList[1].reason}---${copyList[1].complete == 100 ? '已完成' : '未完成'}${
                        copyList[1].complete != 100 ? `---预计 ${copyList[1].completeTime} 完成` : ''
                    }---${copyList[1].checkUserList.length == 0 ? '无人验收' : `${name_2}验收`}---${copyList[1].useHour}小时
${category_3}---${copyList[2].alias}---${copyList[2].reason}---${copyList[2].complete == 100 ? '已完成' : '未完成'}${
                        copyList[2].complete != 100 ? `---预计 ${copyList[2].completeTime} 完成` : ''
                    }---${copyList[2].checkUserList.length == 0 ? '无人验收' : `${name_3}验收`}---${copyList[2].useHour}小时`
                ).then(res => {
                    console.log(res);
                    // this.$toast("已成功复制，可直接去粘贴");
                });
            }
            if (copyList.length == 4) {
                // 工作类别
                for (let i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[0].category) {
                        var category_1 = this.categoryOptions[i].label;
                    }
                }
                for (let i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[1].category) {
                        var category_2 = this.categoryOptions[i].label;
                    }
                }
                for (let i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[2].category) {
                        var category_3 = this.categoryOptions[i].label;
                    }
                }
                for (let i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[3].category) {
                        var category_4 = this.categoryOptions[i].label;
                    }
                }
                // 验收人
                if (copyList[0].checkUserList.length != 0) {
                    var name_1 = copyList[0].checkUserList[0].checkUserName;
                }
                if (copyList[1].checkUserList.length != 0) {
                    var name_2 = copyList[1].checkUserList[0].checkUserName;
                }
                if (copyList[2].checkUserList.length != 0) {
                    var name_3 = copyList[2].checkUserList[0].checkUserName;
                }
                if (copyList[3].checkUserList.length != 0) {
                    var name_4 = copyList[3].checkUserList[0].checkUserName;
                }
                this.$copyText(
                    `${day}---${this.userList.deptName}-${this.userList.username}---自评分${copyList[0].integral}分---总工时${Hour}小时
${category_1}---${copyList[0].alias}---${copyList[0].reason}---${copyList[0].complete == 100 ? '已完成' : '未完成'}${
                        copyList[0].complete != 100 ? `---预计 ${copyList[0].completeTime} 完成` : ''
                    }---${copyList[0].checkUserList.length == 0 ? '无人验收' : `${name_1}验收`}---${copyList[0].useHour}小时
${category_2}---${copyList[1].alias}---${copyList[1].reason}---${copyList[1].complete == 100 ? '已完成' : '未完成'}${
                        copyList[1].complete != 100 ? `---预计 ${copyList[1].completeTime} 完成` : ''
                    }---${copyList[1].checkUserList.length == 0 ? '无人验收' : `${name_2}验收`}---${copyList[1].useHour}小时
${category_3}---${copyList[2].alias}---${copyList[2].reason}---${copyList[2].complete == 100 ? '已完成' : '未完成'}${
                        copyList[2].complete != 100 ? `---预计 ${copyList[2].completeTime} 完成` : ''
                    }---${copyList[2].checkUserList.length == 0 ? '无人验收' : `${name_3}验收`}---${copyList[2].useHour}小时
${category_4}---${copyList[3].alias}---${copyList[3].reason}---${copyList[3].complete == 100 ? '已完成' : '未完成'}${
                        copyList[3].complete != 100 ? `---预计 ${copyList[3].completeTime} 完成` : ''
                    }---${copyList[3].checkUserList.length == 0 ? '无人验收' : `${name_4}验收`}---${copyList[3].useHour}小时`
                ).then(res => {
                    console.log(res);
                    // this.$toast("已成功复制，可直接去粘贴");
                });
            }
            if (copyList.length == 5) {
                // 工作类别
                for (let i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[0].category) {
                        var category_1 = this.categoryOptions[i].label;
                    }
                }
                for (let i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[1].category) {
                        var category_2 = this.categoryOptions[i].label;
                    }
                }
                for (let i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[2].category) {
                        var category_3 = this.categoryOptions[i].label;
                    }
                }
                for (let i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[3].category) {
                        var category_4 = this.categoryOptions[i].label;
                    }
                }
                for (let i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[4].category) {
                        var category_5 = this.categoryOptions[i].label;
                    }
                }
                // 验收人
                if (copyList[0].checkUserList.length != 0) {
                    var name_1 = copyList[0].checkUserList[0].checkUserName;
                }
                if (copyList[1].checkUserList.length != 0) {
                    var name_2 = copyList[1].checkUserList[0].checkUserName;
                }
                if (copyList[2].checkUserList.length != 0) {
                    var name_3 = copyList[2].checkUserList[0].checkUserName;
                }
                if (copyList[3].checkUserList.length != 0) {
                    var name_4 = copyList[3].checkUserList[0].checkUserName;
                }
                if (copyList[4].checkUserList.length != 0) {
                    var name_5 = copyList[4].checkUserList[0].checkUserName;
                }
                this.$copyText(
                    `${day}---${this.userList.deptName}-${this.userList.username}---自评分${copyList[0].integral}分---总工时${Hour}小时
${category_1}---${copyList[0].alias}---${copyList[0].reason}---${copyList[0].complete == 100 ? '已完成' : '未完成'}${
                        copyList[0].complete != 100 ? `---预计 ${copyList[0].completeTime} 完成` : ''
                    }---${copyList[0].checkUserList.length == 0 ? '无人验收' : `${name_1}验收`}---${copyList[0].useHour}小时
${category_2}---${copyList[1].alias}---${copyList[1].reason}---${copyList[1].complete == 100 ? '已完成' : '未完成'}${
                        copyList[1].complete != 100 ? `---预计 ${copyList[1].completeTime} 完成` : ''
                    }---${copyList[1].checkUserList.length == 0 ? '无人验收' : `${name_2}验收`}---${copyList[1].useHour}小时
${category_3}---${copyList[2].alias}---${copyList[2].reason}---${copyList[2].complete == 100 ? '已完成' : '未完成'}${
                        copyList[2].complete != 100 ? `---预计 ${copyList[2].completeTime} 完成` : ''
                    }---${copyList[2].checkUserList.length == 0 ? '无人验收' : `${name_3}验收`}---${copyList[2].useHour}小时
${category_4}---${copyList[3].alias}---${copyList[3].reason}---${copyList[3].complete == 100 ? '已完成' : '未完成'}${
                        copyList[3].complete != 100 ? `---预计 ${copyList[3].completeTime} 完成` : ''
                    }---${copyList[3].checkUserList.length == 0 ? '无人验收' : `${name_4}验收`}---${copyList[3].useHour}小时
${category_5}---${copyList[4].alias}---${copyList[4].reason}---${copyList[4].complete == 100 ? '已完成' : '未完成'}${
                        copyList[4].complete != 100 ? `---预计 ${copyList[4].completeTime} 完成` : ''
                    }---${copyList[4].checkUserList.length == 0 ? '无人验收' : `${name_5}验收`}---${copyList[4].useHour}小时`
                ).then(res => {
                    console.log(res);
                    // this.$toast("已成功复制，可直接去粘贴");
                });
            }
            if (copyList.length == 6) {
                // 工作类别
                for (let i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[0].category) {
                        var category_1 = this.categoryOptions[i].label;
                    }
                }
                for (let i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[1].category) {
                        var category_2 = this.categoryOptions[i].label;
                    }
                }
                for (let i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[2].category) {
                        var category_3 = this.categoryOptions[i].label;
                    }
                }
                for (let i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[3].category) {
                        var category_4 = this.categoryOptions[i].label;
                    }
                }
                for (let i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[4].category) {
                        var category_5 = this.categoryOptions[i].label;
                    }
                }
                for (let i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[5].category) {
                        var category_6 = this.categoryOptions[i].label;
                    }
                }
                // 验收人
                if (copyList[0].checkUserList.length != 0) {
                    var name_1 = copyList[0].checkUserList[0].checkUserName;
                }
                if (copyList[1].checkUserList.length != 0) {
                    var name_2 = copyList[1].checkUserList[0].checkUserName;
                }
                if (copyList[2].checkUserList.length != 0) {
                    var name_3 = copyList[2].checkUserList[0].checkUserName;
                }
                if (copyList[3].checkUserList.length != 0) {
                    var name_4 = copyList[3].checkUserList[0].checkUserName;
                }
                if (copyList[4].checkUserList.length != 0) {
                    var name_5 = copyList[4].checkUserList[0].checkUserName;
                }
                if (copyList[5].checkUserList.length != 0) {
                    var name_6 = copyList[5].checkUserList[0].checkUserName;
                }
                this.$copyText(
                    `${day}---${this.userList.deptName}-${this.userList.username}---自评分${copyList[0].integral}分---总工时${Hour}小时
${category_1}---${copyList[0].alias}---${copyList[0].reason}---${copyList[0].complete == 100 ? '已完成' : '未完成'}${
                        copyList[0].complete != 100 ? `---预计 ${copyList[0].completeTime} 完成` : ''
                    }---${copyList[0].checkUserList.length == 0 ? '无人验收' : `${name_1}验收`}---${copyList[0].useHour}小时
${category_2}---${copyList[1].alias}---${copyList[1].reason}---${copyList[1].complete == 100 ? '已完成' : '未完成'}${
                        copyList[1].complete != 100 ? `---预计 ${copyList[1].completeTime} 完成` : ''
                    }---${copyList[1].checkUserList.length == 0 ? '无人验收' : `${name_2}验收`}---${copyList[1].useHour}小时
${category_3}---${copyList[2].alias}---${copyList[2].reason}---${copyList[2].complete == 100 ? '已完成' : '未完成'}${
                        copyList[2].complete != 100 ? `---预计 ${copyList[2].completeTime} 完成` : ''
                    }---${copyList[2].checkUserList.length == 0 ? '无人验收' : `${name_3}验收`}---${copyList[2].useHour}小时
${category_4}---${copyList[3].alias}---${copyList[3].reason}---${copyList[3].complete == 100 ? '已完成' : '未完成'}${
                        copyList[3].complete != 100 ? `---预计 ${copyList[3].completeTime} 完成` : ''
                    }---${copyList[3].checkUserList.length == 0 ? '无人验收' : `${name_4}验收`}---${copyList[3].useHour}小时
${category_5}---${copyList[4].alias}---${copyList[4].reason}---${copyList[4].complete == 100 ? '已完成' : '未完成'}${
                        copyList[4].complete != 100 ? `---预计 ${copyList[4].completeTime} 完成` : ''
                    }---${copyList[4].checkUserList.length == 0 ? '无人验收' : `${name_5}验收`}---${copyList[4].useHour}小时
${category_6}---${copyList[5].alias}---${copyList[5].reason}---${copyList[5].complete == 100 ? '已完成' : '未完成'}${
                        copyList[5].complete != 100 ? `---预计 ${copyList[5].completeTime} 完成` : ''
                    }---${copyList[5].checkUserList.length == 0 ? '无人验收' : `${name_6}验收`}---${copyList[5].useHour}小时`
                ).then(res => {
                    console.log(res);
                    // this.$toast("已成功复制，可直接去粘贴");
                });
            }
            if (copyList.length == 7) {
                // 工作类别
                for (let i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[0].category) {
                        var category_1 = this.categoryOptions[i].label;
                    }
                }
                for (let i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[1].category) {
                        var category_2 = this.categoryOptions[i].label;
                    }
                }
                for (let i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[2].category) {
                        var category_3 = this.categoryOptions[i].label;
                    }
                }
                for (let i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[3].category) {
                        var category_4 = this.categoryOptions[i].label;
                    }
                }
                for (let i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[4].category) {
                        var category_5 = this.categoryOptions[i].label;
                    }
                }
                for (let i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[5].category) {
                        var category_6 = this.categoryOptions[i].label;
                    }
                }
                for (let i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[6].category) {
                        var category_7 = this.categoryOptions[i].label;
                    }
                }
                // 验收人
                if (copyList[0].checkUserList.length != 0) {
                    var name_1 = copyList[0].checkUserList[0].checkUserName;
                }
                if (copyList[1].checkUserList.length != 0) {
                    var name_2 = copyList[1].checkUserList[0].checkUserName;
                }
                if (copyList[2].checkUserList.length != 0) {
                    var name_3 = copyList[2].checkUserList[0].checkUserName;
                }
                if (copyList[3].checkUserList.length != 0) {
                    var name_4 = copyList[3].checkUserList[0].checkUserName;
                }
                if (copyList[4].checkUserList.length != 0) {
                    var name_5 = copyList[4].checkUserList[0].checkUserName;
                }
                if (copyList[5].checkUserList.length != 0) {
                    var name_6 = copyList[5].checkUserList[0].checkUserName;
                }
                if (copyList[6].checkUserList.length != 0) {
                    var name_7 = copyList[6].checkUserList[0].checkUserName;
                }
                this.$copyText(
                    `${day}---${this.userList.deptName}-${this.userList.username}---自评分${copyList[0].integral}分---总工时${Hour}小时
${category_1}---${copyList[0].alias}---${copyList[0].reason}---${copyList[0].complete == 100 ? '已完成' : '未完成'}${
                        copyList[0].complete != 100 ? `---预计 ${copyList[0].completeTime} 完成` : ''
                    }---${copyList[0].checkUserList.length == 0 ? '无人验收' : `${name_1}验收`}---${copyList[0].useHour}小时
${category_2}---${copyList[1].alias}---${copyList[1].reason}---${copyList[1].complete == 100 ? '已完成' : '未完成'}${
                        copyList[1].complete != 100 ? `---预计 ${copyList[1].completeTime} 完成` : ''
                    }---${copyList[1].checkUserList.length == 0 ? '无人验收' : `${name_2}验收`}---${copyList[1].useHour}小时
${category_3}---${copyList[2].alias}---${copyList[2].reason}---${copyList[2].complete == 100 ? '已完成' : '未完成'}${
                        copyList[2].complete != 100 ? `---预计 ${copyList[2].completeTime} 完成` : ''
                    }---${copyList[2].checkUserList.length == 0 ? '无人验收' : `${name_3}验收`}---${copyList[2].useHour}小时
${category_4}---${copyList[3].alias}---${copyList[3].reason}---${copyList[3].complete == 100 ? '已完成' : '未完成'}${
                        copyList[3].complete != 100 ? `---预计 ${copyList[3].completeTime} 完成` : ''
                    }---${copyList[3].checkUserList.length == 0 ? '无人验收' : `${name_4}验收`}---${copyList[3].useHour}小时
${category_5}---${copyList[4].alias}---${copyList[4].reason}---${copyList[4].complete == 100 ? '已完成' : '未完成'}${
                        copyList[4].complete != 100 ? `---预计 ${copyList[4].completeTime} 完成` : ''
                    }---${copyList[4].checkUserList.length == 0 ? '无人验收' : `${name_5}验收`}---${copyList[4].useHour}小时
${category_6}---${copyList[5].alias}---${copyList[5].reason}---${copyList[5].complete == 100 ? '已完成' : '未完成'}${
                        copyList[5].complete != 100 ? `---预计 ${copyList[5].completeTime} 完成` : ''
                    }---${copyList[5].checkUserList.length == 0 ? '无人验收' : `${name_6}验收`}---${copyList[5].useHour}小时
${category_7}---${copyList[6].alias}---${copyList[6].reason}---${copyList[6].complete == 100 ? '已完成' : '未完成'}${
                        copyList[6].complete != 100 ? `---预计 ${copyList[6].completeTime} 完成` : ''
                    }---${copyList[6].checkUserList.length == 0 ? '无人验收' : `${name_7}验收`}---${copyList[6].useHour}小时`
                ).then(res => {
                    console.log(res);
                    // this.$toast("已成功复制，可直接去粘贴");
                });
            }
            if (copyList.length == 8) {
                // 工作类别
                for (let i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[0].category) {
                        var category_1 = this.categoryOptions[i].label;
                    }
                }
                for (let i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[1].category) {
                        var category_2 = this.categoryOptions[i].label;
                    }
                }
                for (let i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[2].category) {
                        var category_3 = this.categoryOptions[i].label;
                    }
                }
                for (let i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[3].category) {
                        var category_4 = this.categoryOptions[i].label;
                    }
                }
                for (let i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[4].category) {
                        var category_5 = this.categoryOptions[i].label;
                    }
                }
                for (let i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[5].category) {
                        var category_6 = this.categoryOptions[i].label;
                    }
                }
                for (let i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[6].category) {
                        var category_7 = this.categoryOptions[i].label;
                    }
                }
                for (let i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[7].category) {
                        var category_8 = this.categoryOptions[i].label;
                    }
                }
                // 验收人
                if (copyList[0].checkUserList.length != 0) {
                    var name_1 = copyList[0].checkUserList[0].checkUserName;
                }
                if (copyList[1].checkUserList.length != 0) {
                    var name_2 = copyList[1].checkUserList[0].checkUserName;
                }
                if (copyList[2].checkUserList.length != 0) {
                    var name_3 = copyList[2].checkUserList[0].checkUserName;
                }
                if (copyList[3].checkUserList.length != 0) {
                    var name_4 = copyList[3].checkUserList[0].checkUserName;
                }
                if (copyList[4].checkUserList.length != 0) {
                    var name_5 = copyList[4].checkUserList[0].checkUserName;
                }
                if (copyList[5].checkUserList.length != 0) {
                    var name_6 = copyList[5].checkUserList[0].checkUserName;
                }
                if (copyList[6].checkUserList.length != 0) {
                    var name_7 = copyList[6].checkUserList[0].checkUserName;
                }
                if (copyList[7].checkUserList.length != 0) {
                    var name_8 = copyList[7].checkUserList[0].checkUserName;
                }
                this.$copyText(
                    `${day}---${this.userList.deptName}-${this.userList.username}---自评分${copyList[0].integral}分---总工时${Hour}小时
${category_1}---${copyList[0].alias}---${copyList[0].reason}---${copyList[0].complete == 100 ? '已完成' : '未完成'}${
                        copyList[0].complete != 100 ? `---预计 ${copyList[0].completeTime} 完成` : ''
                    }---${copyList[0].checkUserList.length == 0 ? '无人验收' : `${name_1}验收`}---${copyList[0].useHour}小时
${category_2}---${copyList[1].alias}---${copyList[1].reason}---${copyList[1].complete == 100 ? '已完成' : '未完成'}${
                        copyList[1].complete != 100 ? `---预计 ${copyList[1].completeTime} 完成` : ''
                    }---${copyList[1].checkUserList.length == 0 ? '无人验收' : `${name_2}验收`}---${copyList[1].useHour}小时
${category_3}---${copyList[2].alias}---${copyList[2].reason}---${copyList[2].complete == 100 ? '已完成' : '未完成'}${
                        copyList[2].complete != 100 ? `---预计 ${copyList[2].completeTime} 完成` : ''
                    }---${copyList[2].checkUserList.length == 0 ? '无人验收' : `${name_3}验收`}---${copyList[2].useHour}小时
${category_4}---${copyList[3].alias}---${copyList[3].reason}---${copyList[3].complete == 100 ? '已完成' : '未完成'}${
                        copyList[3].complete != 100 ? `---预计 ${copyList[3].completeTime} 完成` : ''
                    }---${copyList[3].checkUserList.length == 0 ? '无人验收' : `${name_4}验收`}---${copyList[3].useHour}小时
${category_5}---${copyList[4].alias}---${copyList[4].reason}---${copyList[4].complete == 100 ? '已完成' : '未完成'}${
                        copyList[4].complete != 100 ? `---预计 ${copyList[4].completeTime} 完成` : ''
                    }---${copyList[4].checkUserList.length == 0 ? '无人验收' : `${name_5}验收`}---${copyList[4].useHour}小时
${category_6}---${copyList[5].alias}---${copyList[5].reason}---${copyList[5].complete == 100 ? '已完成' : '未完成'}${
                        copyList[5].complete != 100 ? `---预计 ${copyList[5].completeTime} 完成` : ''
                    }---${copyList[5].checkUserList.length == 0 ? '无人验收' : `${name_6}验收`}---${copyList[5].useHour}小时
${category_7}---${copyList[6].alias}---${copyList[6].reason}---${copyList[6].complete == 100 ? '已完成' : '未完成'}${
                        copyList[6].complete != 100 ? `---预计 ${copyList[6].completeTime} 完成` : ''
                    }---${copyList[6].checkUserList.length == 0 ? '无人验收' : `${name_7}验收`}---${copyList[6].useHour}小时
${category_8}---${copyList[7].alias}---${copyList[7].reason}---${copyList[7].complete == 100 ? '已完成' : '未完成'}${
                        copyList[7].complete != 100 ? `---预计 ${copyList[7].completeTime} 完成` : ''
                    }---${copyList[7].checkUserList.length == 0 ? '无人验收' : `${name_8}验收`}---${copyList[7].useHour}小时`
                ).then(res => {
                    console.log(res);
                    // this.$toast("已成功复制，可直接去粘贴");
                });
            }
            if (copyList.length == 9) {
                // 工作类别
                for (let i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[0].category) {
                        var category_1 = this.categoryOptions[i].label;
                    }
                }
                for (let i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[1].category) {
                        var category_2 = this.categoryOptions[i].label;
                    }
                }
                for (let i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[2].category) {
                        var category_3 = this.categoryOptions[i].label;
                    }
                }
                for (let i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[3].category) {
                        var category_4 = this.categoryOptions[i].label;
                    }
                }
                for (let i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[4].category) {
                        var category_5 = this.categoryOptions[i].label;
                    }
                }
                for (let i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[5].category) {
                        var category_6 = this.categoryOptions[i].label;
                    }
                }
                for (let i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[6].category) {
                        var category_7 = this.categoryOptions[i].label;
                    }
                }
                for (let i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[7].category) {
                        var category_8 = this.categoryOptions[i].label;
                    }
                }
                for (let i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[8].category) {
                        var category_9 = this.categoryOptions[i].label;
                    }
                }
                // 验收人
                if (copyList[0].checkUserList.length != 0) {
                    var name_1 = copyList[0].checkUserList[0].checkUserName;
                }
                if (copyList[1].checkUserList.length != 0) {
                    var name_2 = copyList[1].checkUserList[0].checkUserName;
                }
                if (copyList[2].checkUserList.length != 0) {
                    var name_3 = copyList[2].checkUserList[0].checkUserName;
                }
                if (copyList[3].checkUserList.length != 0) {
                    var name_4 = copyList[3].checkUserList[0].checkUserName;
                }
                if (copyList[4].checkUserList.length != 0) {
                    var name_5 = copyList[4].checkUserList[0].checkUserName;
                }
                if (copyList[5].checkUserList.length != 0) {
                    var name_6 = copyList[5].checkUserList[0].checkUserName;
                }
                if (copyList[6].checkUserList.length != 0) {
                    var name_7 = copyList[6].checkUserList[0].checkUserName;
                }
                if (copyList[7].checkUserList.length != 0) {
                    var name_8 = copyList[7].checkUserList[0].checkUserName;
                }
                if (copyList[8].checkUserList.length != 0) {
                    var name_9 = copyList[8].checkUserList[0].checkUserName;
                }
                this.$copyText(
                    `${day}---${this.userList.deptName}-${this.userList.username}---自评分${copyList[0].integral}分---总工时${Hour}小时
${category_1}---${copyList[0].alias}---${copyList[0].reason}---${copyList[0].complete == 100 ? '已完成' : '未完成'}${
                        copyList[0].complete != 100 ? `---预计 ${copyList[0].completeTime} 完成` : ''
                    }---${copyList[0].checkUserList.length == 0 ? '无人验收' : `${name_1}验收`}---${copyList[0].useHour}小时
${category_2}---${copyList[1].alias}---${copyList[1].reason}---${copyList[1].complete == 100 ? '已完成' : '未完成'}${
                        copyList[1].complete != 100 ? `---预计 ${copyList[1].completeTime} 完成` : ''
                    }---${copyList[1].checkUserList.length == 0 ? '无人验收' : `${name_2}验收`}---${copyList[1].useHour}小时
${category_3}---${copyList[2].alias}---${copyList[2].reason}---${copyList[2].complete == 100 ? '已完成' : '未完成'}${
                        copyList[2].complete != 100 ? `---预计 ${copyList[2].completeTime} 完成` : ''
                    }---${copyList[2].checkUserList.length == 0 ? '无人验收' : `${name_3}验收`}---${copyList[2].useHour}小时
${category_4}---${copyList[3].alias}---${copyList[3].reason}---${copyList[3].complete == 100 ? '已完成' : '未完成'}${
                        copyList[3].complete != 100 ? `---预计 ${copyList[3].completeTime} 完成` : ''
                    }---${copyList[3].checkUserList.length == 0 ? '无人验收' : `${name_4}验收`}---${copyList[3].useHour}小时
${category_5}---${copyList[4].alias}---${copyList[4].reason}---${copyList[4].complete == 100 ? '已完成' : '未完成'}${
                        copyList[4].complete != 100 ? `---预计 ${copyList[4].completeTime} 完成` : ''
                    }---${copyList[4].checkUserList.length == 0 ? '无人验收' : `${name_5}验收`}---${copyList[4].useHour}小时
${category_6}---${copyList[5].alias}---${copyList[5].reason}---${copyList[5].complete == 100 ? '已完成' : '未完成'}${
                        copyList[5].complete != 100 ? `---预计 ${copyList[5].completeTime} 完成` : ''
                    }---${copyList[5].checkUserList.length == 0 ? '无人验收' : `${name_6}验收`}---${copyList[5].useHour}小时
${category_7}---${copyList[6].alias}---${copyList[6].reason}---${copyList[6].complete == 100 ? '已完成' : '未完成'}${
                        copyList[6].complete != 100 ? `---预计 ${copyList[6].completeTime} 完成` : ''
                    }---${copyList[6].checkUserList.length == 0 ? '无人验收' : `${name_7}验收`}---${copyList[6].useHour}小时
${category_8}---${copyList[7].alias}---${copyList[7].reason}---${copyList[7].complete == 100 ? '已完成' : '未完成'}${
                        copyList[7].complete != 100 ? `---预计 ${copyList[7].completeTime} 完成` : ''
                    }---${copyList[7].checkUserList.length == 0 ? '无人验收' : `${name_8}验收`}---${copyList[7].useHour}小时
${category_9}---${copyList[8].alias}---${copyList[8].reason}---${copyList[8].complete == 100 ? '已完成' : '未完成'}${
                        copyList[8].complete != 100 ? `---预计 ${copyList[8].completeTime} 完成` : ''
                    }---${copyList[8].checkUserList.length == 0 ? '无人验收' : `${name_9}验收`}---${copyList[8].useHour}小时`
                ).then(res => {
                    console.log(res);
                    // this.$toast("已成功复制，可直接去粘贴");
                });
            }
            if (copyList.length == 10) {
                // 工作类别
                for (let i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[0].category) {
                        var category_1 = this.categoryOptions[i].label;
                    }
                }
                for (let i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[1].category) {
                        var category_2 = this.categoryOptions[i].label;
                    }
                }
                for (let i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[2].category) {
                        var category_3 = this.categoryOptions[i].label;
                    }
                }
                for (let i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[3].category) {
                        var category_4 = this.categoryOptions[i].label;
                    }
                }
                for (let i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[4].category) {
                        var category_5 = this.categoryOptions[i].label;
                    }
                }
                for (let i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[5].category) {
                        var category_6 = this.categoryOptions[i].label;
                    }
                }
                for (let i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[6].category) {
                        var category_7 = this.categoryOptions[i].label;
                    }
                }
                for (let i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[7].category) {
                        var category_8 = this.categoryOptions[i].label;
                    }
                }
                for (let i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[8].category) {
                        var category_9 = this.categoryOptions[i].label;
                    }
                }
                for (let i = 0; i < this.categoryOptions.length; i++) {
                    if (this.categoryOptions[i].value == copyList[9].category) {
                        var category_10 = this.categoryOptions[i].label;
                    }
                }
                // 验收人
                if (copyList[0].checkUserList.length != 0) {
                    var name_1 = copyList[0].checkUserList[0].checkUserName;
                }
                if (copyList[1].checkUserList.length != 0) {
                    var name_2 = copyList[1].checkUserList[0].checkUserName;
                }
                if (copyList[2].checkUserList.length != 0) {
                    var name_3 = copyList[2].checkUserList[0].checkUserName;
                }
                if (copyList[3].checkUserList.length != 0) {
                    var name_4 = copyList[3].checkUserList[0].checkUserName;
                }
                if (copyList[4].checkUserList.length != 0) {
                    var name_5 = copyList[4].checkUserList[0].checkUserName;
                }
                if (copyList[5].checkUserList.length != 0) {
                    var name_6 = copyList[5].checkUserList[0].checkUserName;
                }
                if (copyList[6].checkUserList.length != 0) {
                    var name_7 = copyList[6].checkUserList[0].checkUserName;
                }
                if (copyList[7].checkUserList.length != 0) {
                    var name_8 = copyList[7].checkUserList[0].checkUserName;
                }
                if (copyList[8].checkUserList.length != 0) {
                    var name_9 = copyList[8].checkUserList[0].checkUserName;
                }
                if (copyList[9].checkUserList.length != 0) {
                    var name_10 = copyList[9].checkUserList[0].checkUserName;
                }
                this.$copyText(
                    `${day}---${this.userList.deptName}-${this.userList.username}---自评分${copyList[0].integral}分---总工时${Hour}小时
${category_1}---${copyList[0].alias}---${copyList[0].reason}---${copyList[0].complete == 100 ? '已完成' : '未完成'}${
                        copyList[0].complete != 100 ? `---预计 ${copyList[0].completeTime} 完成` : ''
                    }---${copyList[0].checkUserList.length == 0 ? '无人验收' : `${name_1}验收`}---${copyList[0].useHour}小时
${category_2}---${copyList[1].alias}---${copyList[1].reason}---${copyList[1].complete == 100 ? '已完成' : '未完成'}${
                        copyList[1].complete != 100 ? `---预计 ${copyList[1].completeTime} 完成` : ''
                    }---${copyList[1].checkUserList.length == 0 ? '无人验收' : `${name_2}验收`}---${copyList[1].useHour}小时
${category_3}---${copyList[2].alias}---${copyList[2].reason}---${copyList[2].complete == 100 ? '已完成' : '未完成'}${
                        copyList[2].complete != 100 ? `---预计 ${copyList[2].completeTime} 完成` : ''
                    }---${copyList[2].checkUserList.length == 0 ? '无人验收' : `${name_3}验收`}---${copyList[2].useHour}小时
${category_4}---${copyList[3].alias}---${copyList[3].reason}---${copyList[3].complete == 100 ? '已完成' : '未完成'}${
                        copyList[3].complete != 100 ? `---预计 ${copyList[3].completeTime} 完成` : ''
                    }---${copyList[3].checkUserList.length == 0 ? '无人验收' : `${name_4}验收`}---${copyList[3].useHour}小时
${category_5}---${copyList[4].alias}---${copyList[4].reason}---${copyList[4].complete == 100 ? '已完成' : '未完成'}${
                        copyList[4].complete != 100 ? `---预计 ${copyList[4].completeTime} 完成` : ''
                    }---${copyList[4].checkUserList.length == 0 ? '无人验收' : `${name_5}验收`}---${copyList[4].useHour}小时
${category_6}---${copyList[5].alias}---${copyList[5].reason}---${copyList[5].complete == 100 ? '已完成' : '未完成'}${
                        copyList[5].complete != 100 ? `---预计 ${copyList[5].completeTime} 完成` : ''
                    }---${copyList[5].checkUserList.length == 0 ? '无人验收' : `${name_6}验收`}---${copyList[5].useHour}小时
${category_7}---${copyList[6].alias}---${copyList[6].reason}---${copyList[6].complete == 100 ? '已完成' : '未完成'}${
                        copyList[6].complete != 100 ? `---预计 ${copyList[6].completeTime} 完成` : ''
                    }---${copyList[6].checkUserList.length == 0 ? '无人验收' : `${name_7}验收`}---${copyList[6].useHour}小时
${category_8}---${copyList[7].alias}---${copyList[7].reason}---${copyList[7].complete == 100 ? '已完成' : '未完成'}${
                        copyList[7].complete != 100 ? `---预计 ${copyList[7].completeTime} 完成` : ''
                    }---${copyList[7].checkUserList.length == 0 ? '无人验收' : `${name_8}验收`}---${copyList[7].useHour}小时
${category_9}---${copyList[8].alias}---${copyList[8].reason}---${copyList[8].complete == 100 ? '已完成' : '未完成'}${
                        copyList[8].complete != 100 ? `---预计 ${copyList[8].completeTime} 完成` : ''
                    }---${copyList[8].checkUserList.length == 0 ? '无人验收' : `${name_9}验收`}---${copyList[8].useHour}小时
${category_10}---${copyList[9].alias}---${copyList[9].reason}---${copyList[9].complete == 100 ? '已完成' : '未完成'}${
                        copyList[9].complete != 100 ? `---预计 ${copyList[9].completeTime} 完成` : ''
                    }---${copyList[9].checkUserList.length == 0 ? '无人验收' : `${name_10}验收`}---${copyList[9].useHour}小时`
                ).then(res => {
                    console.log(res);
                    // this.$toast("已成功复制，可直接去粘贴");
                });
            }
        },

        //  合并
        flitterData(arr) {
            let spanOneArr = [],
                spanTwoArr = [],
                spanThreeArr = [],
                concatOne = 0,
                concatTwo = 0,
                concatThree = 0;
            arr.forEach((item, index) => {
                if (index === 0) {
                    spanOneArr.push(1);
                    spanTwoArr.push(1);
                    spanThreeArr.push(1);
                } else {
                    if (item.hourId === arr[index - 1].hourId) {
                        //第一列需合并相同内容的判断条件
                        spanOneArr[concatOne] += 1;
                        spanOneArr.push(0);
                    } else {
                        spanOneArr.push(1);
                        concatOne = index;
                    }
                    if (item.hourId === arr[index - 1].hourId && item.integral === arr[index - 1].integral) {
                        //第二列需合并相同内容的判断条件
                        spanTwoArr[concatTwo] += 1;
                        spanTwoArr.push(0);
                    } else {
                        spanTwoArr.push(1);
                        concatTwo = index;
                    }
                }
            });
            return {
                one: spanOneArr,
                two: spanTwoArr,
                three: spanThreeArr
            };
        },

        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0) {
                const _row = this.flitterData(this.list).one[rowIndex];
                const _col = _row > 0 ? 1 : 0;
                return {
                    rowspan: _row,
                    colspan: _col
                };
            }
            if (columnIndex === 1) {
                const _row = this.flitterData(this.list).two[rowIndex];
                const _col = _row > 0 ? 1 : 0;
                return {
                    rowspan: _row,
                    colspan: _col
                };
            }
            if (columnIndex === 13) {
                const _row = this.flitterData(this.list).two[rowIndex];
                const _col = _row > 0 ? 1 : 0;
                return {
                    rowspan: _row,
                    colspan: _col
                };
            }
        }
    },
    mounted() {}
};
</script>
<style type="text/scss" lang="scss">
.delete {
    margin-left: 10% !important;
}
</style>
