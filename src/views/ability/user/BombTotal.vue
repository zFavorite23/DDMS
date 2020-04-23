<template>
    <div id="divID" style="width: 100%; color: #1f2d3d;">
        <el-table :data="list" stripe border v-loading="listLoading" style="width: 100%;">
            <el-table-column width="50" label="序号">
                <template scope="scope"
                ><span
                >{{
                            scope.$index + (query.current - 1) * query.size + 1
                        }}
                    </span></template
                >
            </el-table-column>
            <el-table-column min-width="100" label="类型">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content="scope.row.mainDesc" placement="top-start">
                        <span>{{scope.row.mainName}}</span>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column min-width="100" label="分类">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content="scope.row.subDesc" placement="top-start">
                        <span>{{scope.row.subName}}</span>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column prop="createTime" min-width="100" label="收到时间"></el-table-column>
        </el-table>
        <el-pagination
            class="right"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="query.current"
            :page-size="query.size"
            layout="total, prev, pager, next"
            :total="total"
        >
        </el-pagination>
    </div>
</template>

<script>
    import { getBombDropByToUserId } from "../../../api/ability/bomb.js";
    import { dateFormat } from "../../../utils/date.js";
    import { mapGetters } from "vuex";
    export default {
        data() {
            return {
                query: {
                    toUserId: null,
                    selectMonth: dateFormat(new Date()).substr(0, 7),
                    current: 1,
                    size: 6
                },
                total: 0,
                listLoading: false,
                list: [],

            }
        },
        computed: {
            ...mapGetters(["permissions", "userId"])
        },
        created() {
            this.query.toUserId = this.userId;
            this.getBombDropByToUserId();
        },
        mounted() {},
        methods: {
            getBombDropByToUserId() {
                this.listLoading = true;
                getBombDropByToUserId(this.query)
                    .then(response => {
                        this.listLoading = false;
                        this.total = response.data.data.total;
                        this.query.current = response.data.data.current;
                        this.query.size = response.data.data.size;
                        this.list = response.data.data.records;
                    })
            },
            handleSizeChange(val) {
                this.query.size = val;
                this.getBombDropByToUserId();
            },
            handleCurrentChange(val) {
                this.query.current = val;
                this.getBombDropByToUserId();
            },
        }
    }
</script>

<style type="text/scss" scoped lang="scss">

</style>
