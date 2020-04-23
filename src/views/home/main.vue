<template>
    <div id="test" ref="lessonTableImg">
        <el-row :gutter="20">
            <el-col :xs="{ span: 24 }" :md="{ span: 12 }">
                <div class="grid-content bg-purple">
                    <el-row :gutter="12">
                        <el-col :span="6" v-for="item in navItems">
                            <div class="grid-contentL bg-purpleL">
                                <div
                                    class="navHead"
                                    v-on:click="applyAdd($event)"
                                    :id="item.id"
                                >
                                    {{ item.title }}
                                </div>
                            </div>
                            <div
                                style="border:2px solid #E6E6E6;padding-top: 10px;padding-bottom: 10px;height:50px"
                            >
                                <el-col class="left navBody" :span="8">
                                    <div
                                        class="nav1"
                                        v-on:click="apply0($event)"
                                        :id="item.id"
                                    >
                                        <p class="navTit">审核</p>
                                        <p class="navVal">{{ item.check }}</p>
                                    </div>
                                </el-col>
                                <el-col class="left navBody" :span="8">
                                    <div
                                        class="nav2"
                                        v-on:click="apply1($event)"
                                        :id="item.id"
                                    >
                                        <p class="navTit">同意</p>
                                        <p class="navVal">{{ item.agree }}</p>
                                    </div>
                                </el-col>
                                <el-col class="navBody" :span="8">
                                    <div
                                        class="nav3"
                                        v-on:click="apply2($event)"
                                        :id="item.id"
                                    >
                                        <p class="navTit">拒绝</p>
                                        <p class="navVal">
                                            {{ item.disagree }}
                                        </p>
                                    </div>
                                </el-col>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col :xs="{ span: 24 }" :md="{ span: 12 }">
                <div class="grid-content bg-purple">
                    <el-row :gutter="12">
                        <el-col :span="6" v-for="item in navTotal">
                            <div class="grid-contentL bg-purpleR">
                                <div
                                    class="navHead"
                                    v-on:click="checkList($event)"
                                    :id="item.id"
                                >
                                    {{ item.title }}
                                </div>
                            </div>
                            <div
                                style="border:2px solid #E6E6E6;padding-top: 10px;padding-bottom: 10px;height:50px"
                            >
                                <el-col class="left navBody" :span="8">
                                    <div
                                        class="nav1"
                                        v-on:click="check0($event)"
                                        :id="item.id"
                                    >
                                        <p class="navTit">审核</p>
                                        <p class="navVal">{{ item.check }}</p>
                                    </div>
                                </el-col>
                                <el-col class="left navBody" :span="8">
                                    <div
                                        class="nav2"
                                        v-on:click="check1($event)"
                                        :id="item.id"
                                    >
                                        <p class="navTit">同意</p>
                                        <p class="navVal">{{ item.agree }}</p>
                                    </div>
                                </el-col>
                                <el-col class="navBody" :span="8">
                                    <div
                                        class="nav3"
                                        v-on:click="check2($event)"
                                        :id="item.id"
                                    >
                                        <p class="navTit">拒绝</p>
                                        <p class="navVal">
                                            {{ item.disagree }}
                                        </p>
                                    </div>
                                </el-col>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>

        <el-row :gutter="20">
            <el-col :xs="{ span: 24 }" :md="{ span: 12 }">
                <div class="grid-content bg-purple">
                    <el-row :gutter="12">
                        <el-table :data="tableDataL" border stripe class="tab">
                            <el-table-column label="类型" :span="8">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.msgType == '1'"
                                        >工时</span
                                    >
                                    <span v-else-if="scope.row.msgType == '2'"
                                        >外出</span
                                    >
                                    <span v-else-if="scope.row.msgType == '3'"
                                        >出差</span
                                    >
                                    <span v-else-if="scope.row.msgType == '4'"
                                        >请假</span
                                    >
                                    <span v-else-if="scope.row.msgType == '5'"
                                        >未打卡</span
                                    >
                                    <span v-else-if="scope.row.msgType == '6'"
                                        >报销</span
                                    >
                                    <span v-else-if="scope.row.msgType == '7'"
                                        >支出</span
                                    >
                                    <span v-else-if="scope.row.msgType == '8'"
                                        >开票</span
                                    >
                                    <span v-else></span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="checkUserName"
                                label="审批人"
                                :span="8"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="status"
                                label="状态"
                                :span="8"
                            >
                                <template slot-scope="scope">
                                    <el-tag
                                        v-if="scope.row.status == '0'"
                                        type="warning"
                                        >审批中</el-tag
                                    >
                                    <el-tag
                                        v-else-if="scope.row.status == '1'"
                                        type="success"
                                        >已同意</el-tag
                                    >
                                    <el-tag
                                        v-else-if="scope.row.status == '2'"
                                        type="danger"
                                        >已拒绝</el-tag
                                    >
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-row>
                </div>
            </el-col>
            <el-col :xs="{ span: 24 }" :md="{ span: 12 }" class="tab2">
                <div class="grid-content bg-purple">
                    <el-row :gutter="12">
                        <el-table :data="tableDataR" border stripe class="tab">
                            <el-table-column label="类型" :span="8">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.msgType == '1'"
                                    >工时</span
                                    >
                                    <span v-else-if="scope.row.msgType == '2'"
                                        >外出</span
                                    >
                                    <span v-else-if="scope.row.msgType == '3'"
                                        >出差</span
                                    >
                                    <span v-else-if="scope.row.msgType == '4'"
                                        >请假</span
                                    >
                                    <span v-else-if="scope.row.msgType == '5'"
                                        >未打卡</span
                                    >
                                    <span v-else-if="scope.row.msgType == '6'"
                                        >报销</span
                                    >
                                    <span v-else-if="scope.row.msgType == '7'"
                                        >支出</span
                                    >
                                    <span v-else-if="scope.row.msgType == '8'"
                                        >开票</span
                                    >
                                    <span v-else></span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="applyUserName"
                                label="申请人"
                                :span="8"
                            ></el-table-column>
                            <el-table-column
                                prop="status"
                                label="操作"
                                :span="8"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                        type="warning"
                                        size="mini"
                                        v-if="scope.row.check == '0'"
                                        @click.native="
                                            checkApplyInfo(scope.row)
                                        "
                                        >去审批</el-button
                                    >
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-row>
                </div>
            </el-col>
        </el-row>

        <!--        <p @click="setImage" style="color: #000000">截取</p>-->

        <div id="nodeBox" class="content-body" slot="content"></div>
    </div>
</template>

<script>
import {
    getApplyStatistics,
    getCheckStatistics
} from "../../api/apply/statistics.js";
import { getApplyPage, getApproverPage } from "../../api/admin/msg.js";
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            query: {
                userId: null,
                toUserId: null,
                status: "",
                current: 1,
                size: 10
            },
            navItems: [
                {
                    title: "项目发布",
                    check: "0",
                    agree: "0",
                    disagree: "0",
                    id: 1
                },
                {
                    title: "工时填报",
                    check: "0",
                    agree: "0",
                    disagree: "0",
                    id: 2
                },
                {
                    title: "外出申请",
                    check: "0",
                    agree: "0",
                    disagree: "0",
                    id: 3
                },
                {
                    title: "出差申请",
                    check: "0",
                    agree: "0",
                    disagree: "0",
                    id: 4
                },
                {
                    title: "请假申请",
                    check: "0",
                    agree: "0",
                    disagree: "0",
                    id: 5
                },
                {
                    title: "未打卡申请",
                    check: "0",
                    agree: "0",
                    disagree: "0",
                    id: 6
                },
                {
                    title: "报销申请",
                    check: "0",
                    agree: "0",
                    disagree: "0",
                    id: 7
                },
                {
                    title: "支出申请",
                    check: "0",
                    agree: "0",
                    disagree: "0",
                    id: 8
                },
                {
                    title: "开票申请",
                    check: "0",
                    agree: "0",
                    disagree: "0",
                    id: 9
                }
            ],
            tableDataL: [
                //{name: '报销',type: 'TEST',project: 'TEST',approver:'TEST',status:'TEST',id:1}
            ],
            navTotal: [
                {
                    title: "项目审批",
                    check: "0",
                    agree: "0",
                    disagree: "0",
                    id: 1
                },
                {
                    title: "工时审批",
                    check: "0",
                    agree: "0",
                    disagree: "0",
                    id: 2
                },
                {
                    title: "外出审批",
                    check: "0",
                    agree: "0",
                    disagree: "0",
                    id: 3
                },
                {
                    title: "出差审批",
                    check: "0",
                    agree: "0",
                    disagree: "0",
                    id: 4
                },
                {
                    title: "请假审批",
                    check: "0",
                    agree: "0",
                    disagree: "0",
                    id: 5
                },
                {
                    title: "未打卡审批",
                    check: "0",
                    agree: "0",
                    disagree: "0",
                    id: 6
                },
                {
                    title: "报销审批",
                    check: "0",
                    agree: "0",
                    disagree: "0",
                    id: 7
                },
                {
                    title: "支出审批",
                    check: "0",
                    agree: "0",
                    disagree: "0",
                    id: 8
                },
                {
                    title: "开票审批",
                    check: "0",
                    agree: "0",
                    disagree: "0",
                    id: 9
                }
            ],
            tableDataR: [
                // {name: '报销',type: 'TEST',project: 'TEST',approver:'TEST',status:'TEST',id:1}
            ]
        };
    },
    created() {
        window.localStorage.removeItem("editManhourInfo");
        window.localStorage.removeItem("editGooutInfo");
        window.localStorage.removeItem("editBusinesstripInfo");
        window.localStorage.removeItem("editLeaveInfo");
        window.localStorage.removeItem("editClockInfo");
        window.localStorage.removeItem("editInvoiceInfo");
        window.localStorage.removeItem("editExpenseInfo");
        window.localStorage.removeItem("editReceiptInfo");
        this.query.userId = this.userId;
        this.query.toUserId = this.userId;
        this.getApplyStatistics();
        this.getCheckStatistics();
        this.getApplyPage();
        this.getApproverPage();
    },
    computed: {
        ...mapGetters(["permissions", "userId"])
    },
    methods: {
        getApplyStatistics() {
            getApplyStatistics(this.query.userId)
                .then(response => {
                    const list = response.data.data;
                    list.forEach((item, index) => {
                        this.navItems[index].title = item.name;
                        this.navItems[index].check = item.num0;
                        this.navItems[index].agree = item.num1;
                        this.navItems[index].disagree = item.num2;
                    });
                })
                .catch(() => {});
        },
        getCheckStatistics() {
            getCheckStatistics(this.query.userId)
                .then(response => {
                    const list = response.data.data;
                    list.forEach((item, index) => {
                        this.navTotal[index].title = item.name;
                        this.navTotal[index].check = item.num0;
                        this.navTotal[index].agree = item.num1;
                        this.navTotal[index].disagree = item.num2;
                    });
                })
                .catch(() => {});
        },
        getApplyPage() {
            getApplyPage(this.query)
                .then(response => {
                    const list = response.data.data.records;
                    list.forEach((item, index) => {
                        this.tableDataL.push({
                            msgType: item.msgType,
                            checkUserName: item.checkUserName,
                            status: item.status
                        });
                    });
                })
                .catch(() => {});
        },
        getApproverPage() {
            getApproverPage(this.query)
                .then(response => {
                    const list = response.data.data.records;
                    list.forEach((item, index) => {
                        this.tableDataR.push({
                            toId: item.toId,
                            msgType: item.msgType,
                            applyUserName: item.applyUserName,
                            status: item.status
                        });
                    });
                })
                .catch(() => {});
        },
        checkApplyInfo(row) {
            if (row.msgType == "1") {
                this.$router.push({
                    path: "/apply/manhour/info/" + row.toId
                });
            }
            if (row.msgType == "2") {
                this.$router.push({
                    path: "/apply/goout/info/" + row.toId
                });
            }
            if (row.msgType == "3") {
                this.$router.push({
                    path: "/apply/businesstrip/info/" + row.toId
                });
            }
            if (row.msgType == "4") {
                this.$router.push({
                    path: "/apply/leave/info/" + row.toId
                });
            }
            if (row.msgType == "5") {
                this.$router.push({
                    path: "/apply/clock/info/" + row.toId
                });
            }
            // 报销
            if (row.msgType == "6") {
                this.$router.push({
                    path: "/apply/invoice/info/" + row.toId
                });
            }
            //支出
            if (row.msgType == "7") {
                this.$router.push({
                    path: "/apply/expense/info/" + row.toId
                });
            }
            //开票
            if (row.msgType == "8") {
                this.$router.push({
                    path: "/apply/receipt/info/" + row.toId
                });
            }
        },
        applyAdd(event) {
            // var el = event.currentTarget.innerHTML;
            var id = event.currentTarget.id;
            if (id == 1) {
                this.$router.push({
                    path: "/project/itemForm"
                });
            } else if (id == 2) {
                this.$router.push({
                    path: "/apply/manhour/form"
                });
            } else if (id == 3) {
                this.$router.push({
                    path: "/apply/goout/form"
                });
            } else if (id == 4) {
                this.$router.push({
                    path: "/apply/businesstrip/form"
                });
            } else if (id == 5) {
                this.$router.push({
                    path: "/apply/leave/form"
                });
            } else if (id == 6) {
                this.$router.push({
                    path: "/apply/clock/form"
                });
            } else if (id == 7) {
                this.$router.push({
                    path: "/apply/invoice/form"
                });
            } else if (id == 8) {
                this.$router.push({
                    path: "/apply/expense/form"
                });
            } else if (id == 9) {
                this.$router.push({
                    path: "/apply/receipt/form"
                });
            }
        },
        apply0(event) {
            var id = event.currentTarget.id;
            console.log(id);
            if (id == 1) {
                this.$router.push({
                    path: "/project/itemApprover?status=0"
                });
            }else if (id == 2) {
                this.$router.push({
                    path: "/apply/manhour?status=0"
                });
            } else if (id == 3) {
                this.$router.push({
                    path: "/apply/goout?status=0"
                });
            } else if (id == 4) {
                this.$router.push({
                    path: "/apply/businesstrip?status=0"
                });
            } else if (id == 5) {
                this.$router.push({
                    path: "/apply/leave?status=0"
                });
            } else if (id == 6) {
                this.$router.push({
                    path: "/apply/clock?status=0"
                });
            } else if (id == 7) {
                this.$router.push({
                    path: "/apply/invoice?status=0"
                });
            } else if (id == 8) {
                this.$router.push({
                    path: "/apply/expense?status=0"
                });
            } else if (id == 9) {
                this.$router.push({
                    path: "/apply/receipt?status=0"
                });
            }
        },
        apply1(event) {
            var id = event.currentTarget.id;
            if (id == 1) {
                this.$router.push({
                    path: "/project/itemApprover?status=1"
                });
            } else if (id == 2) {
                this.$router.push({
                    path: "/apply/manhour?status=1"
                });
            } else if (id == 3) {
                this.$router.push({
                    path: "/apply/goout?status=1"
                });
            } else if (id == 4) {
                this.$router.push({
                    path: "/apply/businesstrip?status=1"
                });
            } else if (id == 5) {
                this.$router.push({
                    path: "/apply/leave?status=1"
                });
            } else if (id == 6) {
                this.$router.push({
                    path: "/apply/clock?status=1"
                });
            } else if (id == 7) {
                this.$router.push({
                    path: "/apply/invoice?status=1"
                });
            } else if (id == 8) {
                this.$router.push({
                    path: "/apply/expense?status=1"
                });
            } else if (id == 9) {
                this.$router.push({
                    path: "/apply/receipt?status=1"
                });
            }
        },
        apply2(event) {
            var id = event.currentTarget.id;
            console.log(id);
            if (id == 1) {
                this.$router.push({
                    path: "/project/itemApprover?status=2"
                });
            }else if (id == 2) {
                this.$router.push({
                    path: "/apply/manhour?status=2"
                });
            }  else if (id == 3) {
                this.$router.push({
                    path: "/apply/goout?status=2"
                });
            } else if (id == 4) {
                this.$router.push({
                    path: "/apply/businesstrip?status=2"
                });
            } else if (id == 5) {
                this.$router.push({
                    path: "/apply/leave?status=2"
                });
            } else if (id == 6) {
                this.$router.push({
                    path: "/apply/clock?status=2"
                });
            } else if (id == 7) {
                this.$router.push({
                    path: "/apply/invoice?status=2"
                });
            } else if (id == 8) {
                this.$router.push({
                    path: "/apply/expense?status=2"
                });
            } else if (id == 9) {
                this.$router.push({
                    path: "/apply/receipt?status=2"
                });
            }
        },
        checkList(event) {
            var id = event.currentTarget.id;
            console.log(id);
            if (id == 1) {
                this.$router.push({
                    path: "/project/itemApprover"
                });
            } else if (id == 2) {
                this.$router.push({
                    path: "/apply/manhour/approver"
                });
            } else if (id == 3) {
                this.$router.push({
                    path: "/apply/goout/approver"
                });
            } else if (id == 4) {
                this.$router.push({
                    path: "/apply/businesstrip/approver"
                });
            } else if (id == 5) {
                this.$router.push({
                    path: "/apply/leave/approver"
                });
            } else if (id == 6) {
                this.$router.push({
                    path: "/apply/clock/approver"
                });
            } else if (id == 7) {
                this.$router.push({
                    path: "/apply/invoice/approver"
                });
            } else if (id == 8) {
                this.$router.push({
                    path: "/apply/expense/approver"
                });
            } else if (id == 9) {
                this.$router.push({
                    path: "/apply/receipt/approver"
                });
            }
        },
        check0(event) {
            var id = event.currentTarget.id;
            console.log(id);
            if (id == 1) {
                this.$router.push({
                    path: "/project/itemApprover?status=0"
                });
            }  else if (id == 2) {
                this.$router.push({
                    path: "/apply/manhour/approver?status=0"
                });
            }else if (id == 3) {
                this.$router.push({
                    path: "/apply/goout/approver?status=0"
                });
            } else if (id == 4) {
                this.$router.push({
                    path: "/apply/businesstrip/approver?status=0"
                });
            } else if (id == 5) {
                this.$router.push({
                    path: "/apply/leave/approver?status=0"
                });
            } else if (id == 6) {
                this.$router.push({
                    path: "/apply/clock/approver?status=0"
                });
            } else if (id == 7) {
                this.$router.push({
                    path: "/apply/invoice/approver?status=0"
                });
            } else if (id == 8) {
                this.$router.push({
                    path: "/apply/expense/approver?status=0"
                });
            } else if (id == 9) {
                this.$router.push({
                    path: "/apply/receipt/approver?status=0"
                });
            }
        },
        check1(event) {
            var id = event.currentTarget.id;
            if (id == 1) {
                this.$router.push({
                    path: "/project/itemApprover?status=1"
                });
            } else if (id == 2) {
                this.$router.push({
                    path: "/apply/manhour/approver?status=1"
                });
            } else if (id == 3) {
                this.$router.push({
                    path: "/apply/goout/approver?status=1"
                });
            } else if (id == 4) {
                this.$router.push({
                    path: "/apply/businesstrip/approver?status=1"
                });
            } else if (id == 5) {
                this.$router.push({
                    path: "/apply/leave/approver?status=1"
                });
            } else if (id == 6) {
                this.$router.push({
                    path: "/apply/clock/approver?status=1"
                });
            } else if (id == 7) {
                this.$router.push({
                    path: "/apply/invoice/approver?status=1"
                });
            } else if (id == 8) {
                this.$router.push({
                    path: "/apply/expense/approver?status=1"
                });
            } else if (id == 9) {
                this.$router.push({
                    path: "/apply/receipt/approver?status=1"
                });
            }
        },
        check2(event) {
            var id = event.currentTarget.id;
            console.log(id);
            if (id == 1) {
                this.$router.push({
                    path: "/project/itemApprover?status=2"
                });
            }else if (id == 2) {
                this.$router.push({
                    path: "/apply/manhour/approver?status=2"
                });
            } else if (id == 3) {
                this.$router.push({
                    path: "/apply/goout/approver?status=2"
                });
            } else if (id == 4) {
                this.$router.push({
                    path: "/apply/businesstrip/approver?status=2"
                });
            } else if (id == 5) {
                this.$router.push({
                    path: "/apply/leave/approver?status=2"
                });
            } else if (id == 6) {
                this.$router.push({
                    path: "/apply/clock/approver?status=2"
                });
            } else if (id == 7) {
                this.$router.push({
                    path: "/apply/invoice/approver?status=2"
                });
            } else if (id == 8) {
                this.$router.push({
                    path: "/apply/expense/approver?status=2"
                });
            } else if (id == 9) {
                this.$router.push({
                    path: "/apply/receipt/approver?status=2"
                });
            }
        },

        //   截取图片
        setImage() {
            let that = this;
            //   event.preventDefault();
            var canvas2 = document.createElement("canvas");
            // let _canvas = document.getElementById('child');
            let _canvas = document.getElementById("nodeBox");
            var w = parseInt(window.getComputedStyle(_canvas).width);
            var h = parseInt(window.getComputedStyle(_canvas).height);
            //将canvas画布放大若干倍，然后盛放在较小的容器内，就显得不模糊了
            canvas2.width = w * 4;
            canvas2.height = h * 4;
            canvas2.style.width = w + "px";
            canvas2.style.height = h + "px";
            //可以按照自己的需求，对context的参数修改,translate指的是偏移量
            //  var context = canvas.getContext("2d");
            //  context.translate(0,0);
            var context = canvas2.getContext("2d");
            context.scale(2, 2);
            // html2canvas(document.getElementById('child'), {
            html2canvas(document.getElementById("nodeBox"), {
                canvas: canvas2
            }).then(function(canvas) {
                var blob = that.getBlob(canvas);
                var oMyForm = new FormData();
                var fileName = "mobile" + ".jpg";
                oMyForm.append("file", blob, fileName);
                //				oMyForm.append("fileName", fileName);
                oMyForm.append("fileType", "image");
                oMyForm.append("user_id", that);
            });
        },
        getBlob(canvas) {
            //获取blob对象
            var data = canvas.toDataURL("image/jpeg", 1);
            this.dataurl = data;
            console.log(this.dataurl);
            data = data.split(",")[1];
            data = window.atob(data);
            var ia = new Uint8Array(data.length);
            for (var i = 0; i < data.length; i++) {
                ia[i] = data.charCodeAt(i);
            }
            return new Blob([ia], {
                type: "image/jpeg"
            });
        }
    }
};
</script>

<style scoped>
.el-row {
    background-color: #ffffff;
}
@media screen and (max-width: 550px) {
    .el-col-8 {
        padding-left: 0 !important;
        padding-right: 0 !important;
        width: 30%;
        margin-right: 3.3%;
    }
    .tab2 {
        display: none;
    }
}
@media screen and (max-width: 350px) {
    .el-col-8 {
        padding-left: 0 !important;
        padding-right: 0 !important;
        width: 32%;
        margin-right: 1%;
    }
    .tab2 {
        display: none;
    }
}
.navTit {
    font-size: 12px;
    margin-top: -6px;
}
.navVal {
    margin-top: 2px;
}
.bg-purple {
    background: #f1f3f4;
}
.grid-content {
    border-radius: 4px;
}
.bg-purpleL {
    background: #46b8da;
}
.grid-contentL {
    margin-top: 5px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}
.navHead {
    text-align: center;
    padding-top: 6px;
    padding-bottom: 6px;
    font-size: 10px;
}
.navBody {
    background-color: #ffffff;
}
.nav1 {
    color: #8b83bb;
    text-align: center;
}
.nav2 {
    color: #6bb99c;
    text-align: center;
}
.nav3 {
    color: #fc8675;
    text-align: center;
}
.tab {
    width: 100%;
    margin-top: 15px;
}
.bg-purpleR {
    background: #5cb85c;
}
</style>
