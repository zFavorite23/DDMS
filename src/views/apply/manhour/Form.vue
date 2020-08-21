<template>
    <div>
        <el-row :gutter="24">
            <el-col :span="24">
                <fieldset>
                    <legend>未填报日期</legend>
                    <el-row :gutter="24">
                        <el-col v-if="dayOptions.length != 0" :xs="8" :sm="6" :md="4" :lg="3" :xl="3" v-for="(item, index) in dayOptions" :key="index">
                            <el-link type="danger" style="font-size: 1rem;">{{ item.day }}</el-link>
                        </el-col>
                        <el-col v-if="dayOptions.length == 0" :xs="8" :sm="6" :md="4" :lg="3" :xl="3">
                            <el-link type="danger" style="font-size: 1rem;">暂无更多数据</el-link>
                        </el-col>
                    </el-row>
                </fieldset>
            </el-col>
        </el-row>
        <el-row style="padding: 0 15px; margin-bottom: 30px;" v-if="day_1 != ''">
            <div class="top">
                <span style="font-size:1rem" class="hidden-xs-only hidden-sm-only">未填报日期 : {{ day_1.day }}</span>
                <span style="font-size:1rem" class="hidden-md-and-up">{{ day_1.day }}</span>
                <span class="HourFloat" v-if="dayHourInt_1 > 0">
                    <el-rate
                        class="hidden-xs-only hidden-sm-only"
                        disabled
                        show-score
                        text-color="#ff9900"
                        v-model="dayHourFloat_1"
                        :max="dayHourInt_1"
                        :icon-classes="['icon iconfont iconjitui', 'icon iconfont iconjitui', 'icon iconfont iconjitui']"
                        disabled-void-icon-class="icon iconfont iconjitui"
                        :colors="['#FF9900', '#FF9900', '#FF9900']"
                    ></el-rate>
                    <span style="font-size:1rem;color: #ff9900;" class="hidden-md-and-up">{{ dayHourFloat_1 }} 小时</span>
                </span>
                <span>
                    <el-select v-model="tableData_1[0].integral" :placeholder="String(tableData_1[0].integral)" size="mini" style="width: 80px;">
                        <el-option v-for="(item, index) in integralOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </span>
                <span style="font-size:1rem;margin-left: 20px;" class="hidden-xs-only hidden-sm-only">
                    当前已填工时：
                    <span style="color: #ff9900">{{ hourNum }}</span>
                </span>
            </div>

            <el-table :data="tableData_1" style="width: 100%">
                <el-table-column align="center" prop="category" label="工作类别" width="140">
                    <template slot-scope="scope">
                        <el-select
                            :disabled="tableData_1[0].integral == 0"
                            v-model="scope.row.category"
                            placeholder="请选择"
                            size="mini"
                            style="width: 120px;"
                            @change="selectcCategory($event, scope.$index)"
                        >
                            <el-option v-for="(item, index) in categoryOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="mainClassify" label="主分类" width="180">
                    <template slot-scope="scope">
                        <el-cascader
                            :disabled="tableData_1[0].integral == 0"
                            v-if="scope.$index == 0"
                            v-model="scope.row.mainClassify"
                            :options="mainClassifyOptions1"
                            :props="{ expandTrigger: 'hover' }"
                            :show-all-levels="false"
                            size="mini"
                            @change="selectcMainClassify($event, scope.$index)"
                        ></el-cascader>
                        <el-cascader
                            :disabled="tableData_1[0].integral == 0"
                            v-if="scope.$index == 1"
                            v-model="scope.row.mainClassify"
                            :options="mainClassifyOptions2"
                            :props="{ expandTrigger: 'hover' }"
                            :show-all-levels="false"
                            size="mini"
                            @change="selectcMainClassify($event, scope.$index)"
                        ></el-cascader>
                        <el-cascader
                            :disabled="tableData_1[0].integral == 0"
                            v-if="scope.$index == 2"
                            v-model="scope.row.mainClassify"
                            :options="mainClassifyOptions3"
                            :props="{ expandTrigger: 'hover' }"
                            :show-all-levels="false"
                            size="mini"
                            @change="selectcMainClassify($event, scope.$index)"
                        ></el-cascader>
                        <el-cascader
                            :disabled="tableData_1[0].integral == 0"
                            v-if="scope.$index == 3"
                            v-model="scope.row.mainClassify"
                            :options="mainClassifyOptions4"
                            :props="{ expandTrigger: 'hover' }"
                            :show-all-levels="false"
                            size="mini"
                            @change="selectcMainClassify($event, scope.$index)"
                        ></el-cascader>
                        <el-cascader
                            :disabled="tableData_1[0].integral == 0"
                            v-if="scope.$index == 4"
                            v-model="scope.row.mainClassify"
                            :options="mainClassifyOptions5"
                            :props="{ expandTrigger: 'hover' }"
                            :show-all-levels="false"
                            size="mini"
                            @change="selectcMainClassify($event, scope.$index)"
                        ></el-cascader>
                        <el-cascader
                            :disabled="tableData_1[0].integral == 0"
                            v-if="scope.$index == 5"
                            v-model="scope.row.mainClassify"
                            :options="mainClassifyOptions6"
                            :props="{ expandTrigger: 'hover' }"
                            :show-all-levels="false"
                            size="mini"
                            @change="selectcMainClassify($event, scope.$index)"
                        ></el-cascader>
                        <el-cascader
                            :disabled="tableData_1[0].integral == 0"
                            v-if="scope.$index == 6"
                            v-model="scope.row.mainClassify"
                            :options="mainClassifyOptions7"
                            :props="{ expandTrigger: 'hover' }"
                            :show-all-levels="false"
                            size="mini"
                            @change="selectcMainClassify($event, scope.$index)"
                        ></el-cascader>
                        <el-cascader
                            :disabled="tableData_1[0].integral == 0"
                            v-if="scope.$index == 7"
                            v-model="scope.row.mainClassify"
                            :options="mainClassifyOptions8"
                            :props="{ expandTrigger: 'hover' }"
                            :show-all-levels="false"
                            size="mini"
                            @change="selectcMainClassify($event, scope.$index)"
                        ></el-cascader>
                        <el-cascader
                            :disabled="tableData_1[0].integral == 0"
                            v-if="scope.$index == 8"
                            v-model="scope.row.mainClassify"
                            :options="mainClassifyOptions9"
                            :props="{ expandTrigger: 'hover' }"
                            :show-all-levels="false"
                            size="mini"
                            @change="selectcMainClassify($event, scope.$index)"
                        ></el-cascader>
                        <el-cascader
                            :disabled="tableData_1[0].integral == 0"
                            v-if="scope.$index == 9"
                            v-model="scope.row.mainClassify"
                            :options="mainClassifyOptions10"
                            :props="{ expandTrigger: 'hover' }"
                            :show-all-levels="false"
                            size="mini"
                            @change="selectcMainClassify($event, scope.$index)"
                        ></el-cascader>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="subClassify" label="子分类" width="180">
                    <template slot-scope="scope">
                        <el-select :disabled="tableData_1[0].integral == 0" v-model="scope.row.subClassify" placeholder="请选择" size="mini" style="width: 120px;">
                            <el-option v-if="scope.$index == 0" v-for="(item, index) in subClassifyOptions_1" :key="index" :label="item.label" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 1" v-for="(item, index) in subClassifyOptions_2" :key="index" :label="item.label" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 2" v-for="(item, index) in subClassifyOptions_3" :key="index" :label="item.label" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 3" v-for="(item, index) in subClassifyOptions_4" :key="index" :label="item.label" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 4" v-for="(item, index) in subClassifyOptions_5" :key="index" :label="item.label" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 5" v-for="(item, index) in subClassifyOptions_6" :key="index" :label="item.label" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 6" v-for="(item, index) in subClassifyOptions_7" :key="index" :label="item.label" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 7" v-for="(item, index) in subClassifyOptions_8" :key="index" :label="item.label" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 8" v-for="(item, index) in subClassifyOptions_9" :key="index" :label="item.label" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 9" v-for="(item, index) in subClassifyOptions_10" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="reason" label="工作内容" width="320">
                    <template slot-scope="scope">
                        <el-input
                            :disabled="tableData_1[0].integral == 0"
                            type="textarea"
                            resize="none"
                            size="mini"
                            v-model="scope.row.reason"
                            placeholder="请填写工作内容"
                            maxlength="50"
                            show-word-limit
                        ></el-input>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="approverids" label="验收人" width="140">
                    <template slot-scope="scope">
                        <el-select :disabled="tableData_1[0].integral == 0" v-model="scope.row.approverids" placeholder="请选择" size="mini">
                            <el-option v-if="scope.$index == 0" v-for="(item, index) in applyUserList" :label="item.label" :key="index" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 1" v-for="(item, index) in applyUserList1" :label="item.label" :key="index" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 2" v-for="(item, index) in applyUserList2" :label="item.label" :key="index" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 3" v-for="(item, index) in applyUserList3" :label="item.label" :key="index" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 4" v-for="(item, index) in applyUserList4" :label="item.label" :key="index" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 5" v-for="(item, index) in applyUserList5" :label="item.label" :key="index" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 6" v-for="(item, index) in applyUserList6" :label="item.label" :key="index" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 7" v-for="(item, index) in applyUserList7" :label="item.label" :key="index" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 8" v-for="(item, index) in applyUserList8" :label="item.label" :key="index" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 9" v-for="(item, index) in applyUserList9" :label="item.label" :key="index" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="complete" label="完成情况" width="140">
                    <template slot-scope="scope">
                        <el-select :disabled="tableData_1[0].integral == 0" v-model="scope.row.complete" placeholder="请选择" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in completeOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="completeTime" label="预计完成时间" width="220">
                    <template slot-scope="scope">
                        <el-date-picker
                            v-if="scope.row.complete != 100"
                            style="width: 180px;"
                            size="mini"
                            v-model="scope.row.completeTime"
                            :picker-options="pickerOptions"
                            type="date"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                        ></el-date-picker>
                        <el-date-picker v-else disabled style="width: 180px;" size="mini" placeholder="选择日期"></el-date-picker>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="useHour" label="工时" width="140">
                    <template slot-scope="scope">
                        <el-input-number
                            @change="selectHour_1"
                            :disabled="tableData_1[0].integral == 0"
                            v-model="scope.row.useHour"
                            size="small"
                            controls-position="right"
                            :precision="1"
                            step-strictly
                            :step="0.5"
                            :min="0.5"
                            :max="maxUseHour_1"
                        ></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="address" label="操作" width="140">
                    <template slot-scope="scope">
                        <el-button :disabled="tableData_1[0].integral == 0" type="danger" icon="el-icon-delete" circle @click="deleteRow_1(scope.$index)"></el-button>
                        <el-button :disabled="tableData_1[0].integral == 0" type="primary" icon="el-icon-plus" circle @click="addRow_1()"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="primary" style="margin-left: 45%;margin-top: 3%;" @click="submit_1()">提交</el-button>
        </el-row>

        <el-row style="padding: 0 15px; margin-bottom: 30px;" v-if="day_2 != ''">
            <div class="top">
                <span style="font-size:1rem" class="hidden-xs-only hidden-sm-only">未填报日期 : {{ day_2.day }}</span>
                <span style="font-size:1rem" class="hidden-md-and-up">{{ day_2.day }}</span>
                <span class="HourFloat" v-if="dayHourInt_2 > 0">
                    <el-rate
                        disabled
                        show-score
                        class="hidden-xs-only hidden-sm-only"
                        text-color="#ff9900"
                        v-model="dayHourFloat_2"
                        :max="dayHourInt_2"
                        :icon-classes="['icon iconfont iconjitui', 'icon iconfont iconjitui', 'icon iconfont iconjitui']"
                        disabled-void-icon-class="icon iconfont iconjitui"
                        :colors="['#FF9900', '#FF9900', '#FF9900']"
                    ></el-rate>
                    <span style="font-size:1rem;color: #ff9900;" class="hidden-md-and-up">{{ dayHourFloat_2 }} 小时</span>
                </span>
                <span>
                    <el-select v-model="tableData_2[0].integral" :placeholder="String(tableData_2[0].integral)" size="mini" style="width: 80px;">
                        <el-option v-for="(item, index) in integralOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </span>
                <span style="font-size:1rem;margin-left: 20px;" class="hidden-xs-only hidden-sm-only">
                    当前已填工时：
                    <span style="color: #ff9900">{{ hourNum2 }}</span>
                </span>
            </div>
            <el-table :data="tableData_2" style="width: 100%">
                <el-table-column align="center" prop="category" label="工作类别" width="140">
                    <template slot-scope="scope">
                        <el-select
                            :disabled="tableData_2[0].integral == 0"
                            v-model="scope.row.category"
                            placeholder="请选择"
                            size="mini"
                            style="width: 120px;"
                            @change="selectcCategory2($event, scope.$index)"
                        >
                            <el-option v-for="(item, index) in categoryOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="mainClassify" label="主分类" width="180">
                    <template slot-scope="scope">
                        <el-cascader
                            :disabled="tableData_2[0].integral == 0"
                            v-if="scope.$index == 0"
                            v-model="scope.row.mainClassify"
                            :options="mainClassifyOptions1"
                            :props="{ expandTrigger: 'hover' }"
                            :show-all-levels="false"
                            size="mini"
                            @change="selectcMainClassify2($event, scope.$index)"
                        ></el-cascader>
                        <el-cascader
                            :disabled="tableData_2[0].integral == 0"
                            v-if="scope.$index == 1"
                            v-model="scope.row.mainClassify"
                            :options="mainClassifyOptions2"
                            :props="{ expandTrigger: 'hover' }"
                            :show-all-levels="false"
                            size="mini"
                            @change="selectcMainClassify2($event, scope.$index)"
                        ></el-cascader>
                        <el-cascader
                            :disabled="tableData_2[0].integral == 0"
                            v-if="scope.$index == 2"
                            v-model="scope.row.mainClassify"
                            :options="mainClassifyOptions3"
                            :props="{ expandTrigger: 'hover' }"
                            :show-all-levels="false"
                            size="mini"
                            @change="selectcMainClassify2($event, scope.$index)"
                        ></el-cascader>
                        <el-cascader
                            :disabled="tableData_2[0].integral == 0"
                            v-if="scope.$index == 3"
                            v-model="scope.row.mainClassify"
                            :options="mainClassifyOptions4"
                            :props="{ expandTrigger: 'hover' }"
                            :show-all-levels="false"
                            size="mini"
                            @change="selectcMainClassify2($event, scope.$index)"
                        ></el-cascader>
                        <el-cascader
                            :disabled="tableData_2[0].integral == 0"
                            v-if="scope.$index == 4"
                            v-model="scope.row.mainClassify"
                            :options="mainClassifyOptions5"
                            :props="{ expandTrigger: 'hover' }"
                            :show-all-levels="false"
                            size="mini"
                            @change="selectcMainClassify2($event, scope.$index)"
                        ></el-cascader>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="subClassify" label="子分类" width="180">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.subClassify" placeholder="请选择" size="mini" style="width: 120px;" :disabled="tableData_2[0].integral == 0">
                            <el-option v-if="scope.$index == 0" v-for="(item, index) in subClassifyOptions_1" :key="index" :label="item.label" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 1" v-for="(item, index) in subClassifyOptions_2" :key="index" :label="item.label" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 2" v-for="(item, index) in subClassifyOptions_3" :key="index" :label="item.label" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 3" v-for="(item, index) in subClassifyOptions_4" :key="index" :label="item.label" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 4" v-for="(item, index) in subClassifyOptions_5" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="reason" label="工作内容" width="320">
                    <template slot-scope="scope">
                        <el-input
                            :disabled="tableData_2[0].integral == 0"
                            type="textarea"
                            resize="none"
                            size="mini"
                            v-model="scope.row.reason"
                            placeholder="请填写工作内容"
                            maxlength="50"
                            show-word-limit
                        ></el-input>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="approverids" label="验收人" width="140">
                    <template slot-scope="scope">
                        <el-select :disabled="tableData_2[0].integral == 0" v-model="scope.row.approverids" placeholder="请选择" size="mini">
                            <el-option v-if="scope.$index == 0" v-for="(item, index) in applyUserList" :label="item.label" :key="index" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 1" v-for="(item, index) in applyUserList1" :label="item.label" :key="index" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 2" v-for="(item, index) in applyUserList2" :label="item.label" :key="index" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 3" v-for="(item, index) in applyUserList3" :label="item.label" :key="index" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 4" v-for="(item, index) in applyUserList4" :label="item.label" :key="index" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="complete" label="完成情况" width="140">
                    <template slot-scope="scope">
                        <el-select :disabled="tableData_2[0].integral == 0" v-model="scope.row.complete" placeholder="请选择" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in completeOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="completeTime" label="预计完成时间" width="220">
                    <template slot-scope="scope">
                        <el-date-picker
                            v-if="scope.row.complete != 100"
                            style="width: 180px;"
                            size="mini"
                            v-model="scope.row.completeTime"
                            :picker-options="pickerOptions"
                            type="date"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                        ></el-date-picker>
                        <el-date-picker v-else disabled style="width: 180px;" size="mini" placeholder="选择日期"></el-date-picker>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="useHour" label="工时" width="140">
                    <template slot-scope="scope">
                        <el-input-number
                            @change="selectHour_2"
                            :disabled="tableData_2[0].integral == 0"
                            v-model="scope.row.useHour"
                            size="small"
                            controls-position="right"
                            :precision="1"
                            :step="0.5"
                            :min="0.5"
                            :max="maxUseHour_2"
                            step-strictly
                        ></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="address" label="操作" width="140">
                    <template slot-scope="scope">
                        <el-button :disabled="tableData_2[0].integral == 0" type="danger" icon="el-icon-delete" circle @click="deleteRow_2(scope.$index)"></el-button>
                        <el-button :disabled="tableData_2[0].integral == 0" type="primary" icon="el-icon-plus" circle @click="addRow_2()"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="primary" style="margin-left: 45%;margin-top: 3%;" @click="submit_2()">提交</el-button>
        </el-row>

        <el-row style="padding: 0 15px; margin-bottom: 30px;" v-if="day_3 != ''">
            <div class="top">
                <span style="font-size:1rem" class="hidden-xs-only hidden-sm-only">未填报日期 : {{ day_3.day }}</span>
                <span style="font-size:1rem" class="hidden-md-and-up">{{ day_3.day }}</span>
                <span class="HourFloat" v-if="dayHourInt_3 > 0">
                    <el-rate
                        class="hidden-xs-only hidden-sm-only"
                        disabled
                        show-score
                        text-color="#ff9900"
                        v-model="dayHourFloat_3"
                        :max="dayHourInt_3"
                        :icon-classes="['icon iconfont iconjitui', 'icon iconfont iconjitui', 'icon iconfont iconjitui']"
                        disabled-void-icon-class="icon iconfont iconjitui"
                        :colors="['#FF9900', '#FF9900', '#FF9900']"
                    ></el-rate>
                    <span style="font-size:1rem;color: #ff9900;" class="hidden-md-and-up">{{ dayHourFloat_3 }} 小时</span>
                </span>
                <span>
                    <el-select v-model="tableData_3[0].integral" :placeholder="String(tableData_3[0].integral)" size="mini" style="width: 80px;">
                        <el-option v-for="(item, index) in integralOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </span>
                <span style="font-size:1rem;margin-left: 20px;" class="hidden-xs-only hidden-sm-only">
                    当前已填工时：
                    <span style="color: #ff9900">{{ hourNum3 }}</span>
                </span>
            </div>
            <el-table :data="tableData_3" style="width: 100%">
                <el-table-column align="center" prop="category" label="工作类别" width="140">
                    <template slot-scope="scope">
                        <el-select
                            :disabled="tableData_3[0].integral == 0"
                            v-model="scope.row.category"
                            placeholder="请选择"
                            size="mini"
                            style="width: 120px;"
                            @change="selectcCategory3($event, scope.$index)"
                        >
                            <el-option v-for="(item, index) in categoryOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="mainClassify" label="主分类" width="180">
                    <template slot-scope="scope">
                        <el-cascader
                            :disabled="tableData_3[0].integral == 0"
                            
                            v-if="scope.$index == 0"
                            v-model="scope.row.mainClassify"
                            :options="mainClassifyOptions1"
                            :props="{ expandTrigger: 'hover' }"
                            :show-all-levels="false"
                            size="mini"
                            @change="selectcMainClassify3($event, scope.$index)"
                        ></el-cascader>
                        <el-cascader
                            :disabled="tableData_3[0].integral == 0"
                            
                            v-if="scope.$index == 1"
                            v-model="scope.row.mainClassify"
                            :options="mainClassifyOptions2"
                            :props="{ expandTrigger: 'hover' }"
                            :show-all-levels="false"
                            size="mini"
                            @change="selectcMainClassify3($event, scope.$index)"
                        ></el-cascader>
                        <el-cascader
                            :disabled="tableData_3[0].integral == 0"
                            
                            v-if="scope.$index == 2"
                            v-model="scope.row.mainClassify"
                            :options="mainClassifyOptions3"
                            :props="{ expandTrigger: 'hover' }"
                            :show-all-levels="false"
                            size="mini"
                            @change="selectcMainClassify3($event, scope.$index)"
                        ></el-cascader>
                        <el-cascader
                            :disabled="tableData_3[0].integral == 0"
                            
                            v-if="scope.$index == 3"
                            v-model="scope.row.mainClassify"
                            :options="mainClassifyOptions4"
                            :props="{ expandTrigger: 'hover' }"
                            :show-all-levels="false"
                            size="mini"
                            @change="selectcMainClassify3($event, scope.$index)"
                        ></el-cascader>
                        <el-cascader
                            :disabled="tableData_3[0].integral == 0"
                            
                            v-if="scope.$index == 4"
                            v-model="scope.row.mainClassify"
                            :options="mainClassifyOptions5"
                            :props="{ expandTrigger: 'hover' }"
                            :show-all-levels="false"
                            size="mini"
                            @change="selectcMainClassify3($event, scope.$index)"
                        ></el-cascader>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="subClassify" label="子分类" width="180">
                    <template slot-scope="scope">
                        <el-select :disabled="tableData_3[0].integral == 0" v-model="scope.row.subClassify" placeholder="请选择" size="mini" style="width: 120px;">
                            <el-option v-if="scope.$index == 0" v-for="(item, index) in subClassifyOptions_1" :key="index" :label="item.label" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 1" v-for="(item, index) in subClassifyOptions_2" :key="index" :label="item.label" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 2" v-for="(item, index) in subClassifyOptions_3" :key="index" :label="item.label" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 3" v-for="(item, index) in subClassifyOptions_4" :key="index" :label="item.label" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 4" v-for="(item, index) in subClassifyOptions_5" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="reason" label="工作内容" width="320">
                    <template slot-scope="scope">
                        <el-input
                            :disabled="tableData_3[0].integral == 0"
                            type="textarea"
                            resize="none"
                            size="mini"
                            v-model="scope.row.reason"
                            placeholder="请填写工作内容"
                            maxlength="50"
                            show-word-limit
                        ></el-input>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="approverids" label="验收人" width="140">
                    <template slot-scope="scope">
                        <el-select :disabled="tableData_3[0].integral == 0" v-model="scope.row.approverids" placeholder="请选择" size="mini">
                            <el-option v-if="scope.$index == 0" v-for="(item, index) in applyUserList" :label="item.label" :key="index" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 1" v-for="(item, index) in applyUserList1" :label="item.label" :key="index" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 2" v-for="(item, index) in applyUserList2" :label="item.label" :key="index" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 3" v-for="(item, index) in applyUserList3" :label="item.label" :key="index" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 4" v-for="(item, index) in applyUserList4" :label="item.label" :key="index" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="complete" label="完成情况" width="140">
                    <template slot-scope="scope">
                        <el-select :disabled="tableData_3[0].integral == 0" v-model="scope.row.complete" placeholder="请选择" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in completeOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="completeTime" label="预计完成时间" width="220">
                    <template slot-scope="scope">
                        <el-date-picker
                            v-if="scope.row.complete != 100"
                            style="width: 180px;"
                            size="mini"
                            v-model="scope.row.completeTime"
                            :picker-options="pickerOptions"
                            type="date"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                        ></el-date-picker>
                        <el-date-picker v-else disabled style="width: 180px;" size="mini" placeholder="选择日期"></el-date-picker>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="useHour" label="工时" width="140">
                    <template slot-scope="scope">
                        <el-input-number
                            @change="selectHour_3"
                            :disabled="tableData_3[0].integral == 0"
                            v-model="scope.row.useHour"
                            size="small"
                            controls-position="right"
                            :precision="1"
                            :step="0.5"
                            :min="0.5"
                            step-strictly
                            :max="maxUseHour_3"
                        ></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="address" label="操作" width="140">
                    <template slot-scope="scope">
                        <el-button :disabled="tableData_3[0].integral == 0" type="danger" icon="el-icon-delete" circle @click="deleteRow_3(scope.$index)"></el-button>
                        <el-button :disabled="tableData_3[0].integral == 0" type="primary" icon="el-icon-plus" circle @click="addRow_3()"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="primary" style="margin-left: 45%;margin-top: 3%;" @click="submit_3()">提交</el-button>
        </el-row>

        <el-row style="padding: 0 15px; margin-bottom: 30px;" v-if="day_4 != ''">
            <div class="top">
                <span style="font-size:1rem" class="hidden-xs-only hidden-sm-only">未填报日期 : {{ day_4.day }}</span>
                <span style="font-size:1rem" class="hidden-md-and-up">{{ day_4.day }}</span>
                <span class="HourFloat" v-if="dayHourInt_4 > 0">
                    <el-rate
                        class="hidden-xs-only hidden-sm-only"
                        disabled
                        show-score
                        text-color="#ff9900"
                        v-model="dayHourFloat_4"
                        :max="dayHourInt_4"
                        :icon-classes="['icon iconfont iconjitui', 'icon iconfont iconjitui', 'icon iconfont iconjitui']"
                        disabled-void-icon-class="icon iconfont iconjitui"
                        :colors="['#FF9900', '#FF9900', '#FF9900']"
                    ></el-rate>
                    <span style="font-size:1rem;color: #ff9900;" class="hidden-md-and-up">{{ dayHourFloat_4 }} 小时</span>
                </span>
                <span>
                    <el-select v-model="tableData_4[0].integral" :placeholder="String(tableData_4[0].integral)" size="mini" style="width: 80px;">
                        <el-option v-for="(item, index) in integralOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </span>
                <span style="font-size:1rem;margin-left: 20px;" class="hidden-xs-only hidden-sm-only">
                    当前已填工时：
                    <span style="color: #ff9900">{{ hourNum4 }}</span>
                </span>
            </div>
            <el-table :data="tableData_4" style="width: 100%">
                <el-table-column align="center" prop="category" label="工作类别" width="140">
                    <template slot-scope="scope">
                        <el-select
                            :disabled="tableData_4[0].integral == 0"
                            v-model="scope.row.category"
                            placeholder="请选择"
                            size="mini"
                            style="width: 120px;"
                            @change="selectcCategory4($event, scope.$index)"
                        >
                            <el-option v-for="(item, index) in categoryOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="mainClassify" label="主分类" width="180">
                    <template slot-scope="scope">
                        <el-cascader
                            :disabled="tableData_4[0].integral == 0"
                            
                            v-if="scope.$index == 0"
                            v-model="scope.row.mainClassify"
                            :options="mainClassifyOptions1"
                            :props="{ expandTrigger: 'hover' }"
                            :show-all-levels="false"
                            size="mini"
                            @change="selectcMainClassify4($event, scope.$index)"
                        ></el-cascader>
                        <el-cascader
                            :disabled="tableData_4[0].integral == 0"
                            
                            v-if="scope.$index == 1"
                            v-model="scope.row.mainClassify"
                            :options="mainClassifyOptions2"
                            :props="{ expandTrigger: 'hover' }"
                            :show-all-levels="false"
                            size="mini"
                            @change="selectcMainClassify4($event, scope.$index)"
                        ></el-cascader>
                        <el-cascader
                            :disabled="tableData_4[0].integral == 0"
                            
                            v-if="scope.$index == 2"
                            v-model="scope.row.mainClassify"
                            :options="mainClassifyOptions3"
                            :props="{ expandTrigger: 'hover' }"
                            :show-all-levels="false"
                            size="mini"
                            @change="selectcMainClassify4($event, scope.$index)"
                        ></el-cascader>
                        <el-cascader
                            :disabled="tableData_4[0].integral == 0"
                            
                            v-if="scope.$index == 3"
                            v-model="scope.row.mainClassify"
                            :options="mainClassifyOptions4"
                            :props="{ expandTrigger: 'hover' }"
                            :show-all-levels="false"
                            size="mini"
                            @change="selectcMainClassify4($event, scope.$index)"
                        ></el-cascader>
                        <el-cascader
                            :disabled="tableData_4[0].integral == 0"
                            
                            v-if="scope.$index == 4"
                            v-model="scope.row.mainClassify"
                            :options="mainClassifyOptions5"
                            :props="{ expandTrigger: 'hover' }"
                            :show-all-levels="false"
                            size="mini"
                            @change="selectcMainClassify4($event, scope.$index)"
                        ></el-cascader>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="subClassify" label="子分类" width="180">
                    <template slot-scope="scope">
                        <el-select :disabled="tableData_4[0].integral == 0" v-model="scope.row.subClassify" placeholder="请选择" size="mini" style="width: 120px;">
                            <el-option v-if="scope.$index == 0" v-for="(item, index) in subClassifyOptions_1" :key="index" :label="item.label" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 1" v-for="(item, index) in subClassifyOptions_2" :key="index" :label="item.label" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 2" v-for="(item, index) in subClassifyOptions_3" :key="index" :label="item.label" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 3" v-for="(item, index) in subClassifyOptions_4" :key="index" :label="item.label" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 4" v-for="(item, index) in subClassifyOptions_5" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="reason" label="工作内容" width="320">
                    <template slot-scope="scope">
                        <el-input
                            :disabled="tableData_4[0].integral == 0"
                            type="textarea"
                            resize="none"
                            size="mini"
                            v-model="scope.row.reason"
                            placeholder="请填写工作内容"
                            maxlength="50"
                            show-word-limit
                        ></el-input>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="approverids" label="验收人" width="140">
                    <template slot-scope="scope">
                        <el-select :disabled="tableData_4[0].integral == 0" v-model="scope.row.approverids" placeholder="请选择" size="mini">
                            <el-option v-if="scope.$index == 0" v-for="(item, index) in applyUserList" :label="item.label" :key="index" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 1" v-for="(item, index) in applyUserList1" :label="item.label" :key="index" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 2" v-for="(item, index) in applyUserList2" :label="item.label" :key="index" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 3" v-for="(item, index) in applyUserList3" :label="item.label" :key="index" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 4" v-for="(item, index) in applyUserList4" :label="item.label" :key="index" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="complete" label="完成情况" width="140">
                    <template slot-scope="scope">
                        <el-select :disabled="tableData_4[0].integral == 0" v-model="scope.row.complete" placeholder="请选择" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in completeOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="completeTime" label="预计完成时间" width="220">
                    <template slot-scope="scope">
                        <el-date-picker
                            v-if="scope.row.complete != 100"
                            style="width: 180px;"
                            size="mini"
                            v-model="scope.row.completeTime"
                            :picker-options="pickerOptions"
                            type="date"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                        ></el-date-picker>
                        <el-date-picker v-else disabled style="width: 180px;" size="mini" placeholder="选择日期"></el-date-picker>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="useHour" label="工时" width="140">
                    <template slot-scope="scope">
                        <el-input-number
                            @change="selectHour_4"
                            :disabled="tableData_4[0].integral == 0"
                            v-model="scope.row.useHour"
                            size="small"
                            controls-position="right"
                            :precision="1"
                            :step="0.5"
                            :min="0.5"
                            step-strictly
                            :max="maxUseHour_4"
                        ></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="address" label="操作" width="140">
                    <template slot-scope="scope">
                        <el-button :disabled="tableData_4[0].integral == 0" type="danger" icon="el-icon-delete" circle @click="deleteRow_4(scope.$index)"></el-button>
                        <el-button :disabled="tableData_4[0].integral == 0" type="primary" icon="el-icon-plus" circle @click="addRow_4()"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="primary" style="margin-left: 45%;margin-top: 3%;" @click="submit_4()">提交</el-button>
        </el-row>

        <el-row style="padding: 0 15px; margin-bottom: 30px;" v-if="day_5 != ''">
            <div class="top">
                <span style="font-size:1rem" class="hidden-xs-only hidden-sm-only">未填报日期 : {{ day_5.day }}</span>
                <span style="font-size:1rem" class="hidden-md-and-up">{{ day_5.day }}</span>
                <span class="HourFloat" v-if="dayHourInt_5 > 0">
                    <el-rate
                        disabled
                        show-score
                        text-color="#ff9900"
                        v-model="dayHourFloat_5"
                        :max="dayHourInt_5"
                        :icon-classes="['icon iconfont iconjitui', 'icon iconfont iconjitui', 'icon iconfont iconjitui']"
                        disabled-void-icon-class="icon iconfont iconjitui"
                        :colors="['#FF9900', '#FF9900', '#FF9900']"
                    ></el-rate>
                    <span style="font-size:1rem;color: #ff9900;" class="hidden-md-and-up">{{ dayHourFloat_5 }} 小时</span>
                </span>
                <span>
                    <el-select v-model="tableData_5[0].integral" :placeholder="String(tableData_5[0].integral)" size="mini" style="width: 80px;">
                        <el-option v-for="(item, index) in integralOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </span>
                <span style="font-size:1rem;margin-left: 20px;" class="hidden-xs-only hidden-sm-only">
                    当前已填工时：
                    <span style="color: #ff9900">{{ hourNum5 }}</span>
                </span>
            </div>
            <el-table :data="tableData_5" style="width: 100%">
                <el-table-column align="center" prop="category" label="工作类别" width="140">
                    <template slot-scope="scope">
                        <el-select
                            :disabled="tableData_5[0].integral == 0"
                            v-model="scope.row.category"
                            placeholder="请选择"
                            size="mini"
                            style="width: 120px;"
                            @change="selectcCategory5($event, scope.$index)"
                        >
                            <el-option v-for="(item, index) in categoryOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="mainClassify" label="主分类" width="180">
                    <template slot-scope="scope">
                        <el-cascader
                            :disabled="tableData_5[0].integral == 0"
                            
                            v-if="scope.$index == 0"
                            v-model="scope.row.mainClassify"
                            :options="mainClassifyOptions1"
                            :props="{ expandTrigger: 'hover' }"
                            :show-all-levels="false"
                            size="mini"
                            @change="selectcMainClassify5($event, scope.$index)"
                        ></el-cascader>
                        <el-cascader
                            :disabled="tableData_5[0].integral == 0"
                            
                            v-if="scope.$index == 1"
                            v-model="scope.row.mainClassify"
                            :options="mainClassifyOptions2"
                            :props="{ expandTrigger: 'hover' }"
                            :show-all-levels="false"
                            size="mini"
                            @change="selectcMainClassify5($event, scope.$index)"
                        ></el-cascader>
                        <el-cascader
                            :disabled="tableData_5[0].integral == 0"
                            
                            v-if="scope.$index == 2"
                            v-model="scope.row.mainClassify"
                            :options="mainClassifyOptions3"
                            :props="{ expandTrigger: 'hover' }"
                            :show-all-levels="false"
                            size="mini"
                            @change="selectcMainClassify5($event, scope.$index)"
                        ></el-cascader>
                        <el-cascader
                            :disabled="tableData_5[0].integral == 0"
                            
                            v-if="scope.$index == 3"
                            v-model="scope.row.mainClassify"
                            :options="mainClassifyOptions4"
                            :props="{ expandTrigger: 'hover' }"
                            :show-all-levels="false"
                            size="mini"
                            @change="selectcMainClassify5($event, scope.$index)"
                        ></el-cascader>
                        <el-cascader
                            :disabled="tableData_5[0].integral == 0"
                            
                            v-if="scope.$index == 4"
                            v-model="scope.row.mainClassify"
                            :options="mainClassifyOptions5"
                            :props="{ expandTrigger: 'hover' }"
                            :show-all-levels="false"
                            size="mini"
                            @change="selectcMainClassify5($event, scope.$index)"
                        ></el-cascader>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="subClassify" label="子分类" width="180">
                    <template slot-scope="scope">
                        <el-select :disabled="tableData_5[0].integral == 0" v-model="scope.row.subClassify" placeholder="请选择" size="mini" style="width: 120px;">
                            <el-option v-if="scope.$index == 0" v-for="(item, index) in subClassifyOptions_1" :key="index" :label="item.label" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 1" v-for="(item, index) in subClassifyOptions_2" :key="index" :label="item.label" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 2" v-for="(item, index) in subClassifyOptions_3" :key="index" :label="item.label" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 3" v-for="(item, index) in subClassifyOptions_4" :key="index" :label="item.label" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 4" v-for="(item, index) in subClassifyOptions_5" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="reason" label="工作内容" width="320">
                    <template slot-scope="scope">
                        <el-input
                            :disabled="tableData_5[0].integral == 0"
                            type="textarea"
                            resize="none"
                            size="mini"
                            v-model="scope.row.reason"
                            placeholder="请填写工作内容"
                            maxlength="50"
                            show-word-limit
                        ></el-input>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="approverids" label="验收人" width="140">
                    <template slot-scope="scope">
                        <el-select :disabled="tableData_5[0].integral == 0" v-model="scope.row.approverids" placeholder="请选择" size="mini">
                            <el-option v-if="scope.$index == 0" v-for="(item, index) in applyUserList" :label="item.label" :key="index" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 1" v-for="(item, index) in applyUserList1" :label="item.label" :key="index" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 2" v-for="(item, index) in applyUserList2" :label="item.label" :key="index" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 3" v-for="(item, index) in applyUserList3" :label="item.label" :key="index" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 4" v-for="(item, index) in applyUserList4" :label="item.label" :key="index" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="complete" label="完成情况" width="140">
                    <template slot-scope="scope">
                        <el-select :disabled="tableData_5[0].integral == 0" v-model="scope.row.complete" placeholder="请选择" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in completeOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="completeTime" label="预计完成时间" width="220">
                    <template slot-scope="scope">
                        <el-date-picker
                            v-if="scope.row.complete != 100"
                            style="width: 180px;"
                            size="mini"
                            v-model="scope.row.completeTime"
                            :picker-options="pickerOptions"
                            type="date"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                        ></el-date-picker>
                        <el-date-picker v-else disabled style="width: 180px;" size="mini" placeholder="选择日期"></el-date-picker>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="useHour" label="工时" width="140">
                    <template slot-scope="scope">
                        <el-input-number
                            @change="selectHour_5"
                            :disabled="tableData_5[0].integral == 0"
                            v-model="scope.row.useHour"
                            size="small"
                            controls-position="right"
                            :precision="1"
                            :step="0.5"
                            :min="0.5"
                            step-strictly
                            :max="maxUseHour_5"
                        ></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="address" label="操作" width="140">
                    <template slot-scope="scope">
                        <el-button :disabled="tableData_5[0].integral == 0" type="danger" icon="el-icon-delete" circle @click="deleteRow_5(scope.$index)"></el-button>
                        <el-button :disabled="tableData_5[0].integral == 0" type="primary" icon="el-icon-plus" circle @click="addRow_5()"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="primary" style="margin-left: 45%;margin-top: 3%;" @click="submit_5()">提交</el-button>
        </el-row>

        <el-row style="padding: 0 15px; margin-bottom: 30px;" v-if="day_6 != ''">
            <div class="top">
                <span style="font-size:1rem" class="hidden-xs-only hidden-sm-only">未填报日期 : {{ day_6.day }}</span>
                <span style="font-size:1rem" class="hidden-md-and-up">{{ day_6.day }}</span>
                <span class="HourFloat" v-if="dayHourInt_6 > 0">
                    <el-rate
                        disabled
                        show-score
                        class="hidden-xs-only hidden-sm-only"
                        text-color="#ff9900"
                        v-model="dayHourFloat_6"
                        :max="dayHourInt_6"
                        :icon-classes="['icon iconfont iconjitui', 'icon iconfont iconjitui', 'icon iconfont iconjitui']"
                        disabled-void-icon-class="icon iconfont iconjitui"
                        :colors="['#FF9900', '#FF9900', '#FF9900']"
                    ></el-rate>
                    <span style="font-size:1rem;color: #ff9900;" class="hidden-md-and-up">{{ dayHourFloat_6 }} 小时</span>
                </span>
                <span>
                    <el-select v-model="tableData_6[0].integral" :placeholder="String(tableData_6[0].integral)" size="mini" style="width: 80px;">
                        <el-option v-for="(item, index) in integralOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </span>
                <span style="font-size:1rem;margin-left: 20px;" class="hidden-xs-only hidden-sm-only">
                    当前已填工时：
                    <span style="color: #ff9900">{{ hourNum6 }}</span>
                </span>
            </div>
            <el-table :data="tableData_6" style="width: 100%">
                <el-table-column align="center" prop="category" label="工作类别" width="140">
                    <template slot-scope="scope">
                        <el-select
                            :disabled="tableData_6[0].integral == 0"
                            v-model="scope.row.category"
                            placeholder="请选择"
                            size="mini"
                            style="width: 120px;"
                            @change="selectcCategory6($event, scope.$index)"
                        >
                            <el-option v-for="(item, index) in categoryOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="mainClassify" label="主分类" width="180">
                    <template slot-scope="scope">
                        <el-cascader
                            :disabled="tableData_6[0].integral == 0"
                            
                            v-if="scope.$index == 0"
                            v-model="scope.row.mainClassify"
                            :options="mainClassifyOptions1"
                            :props="{ expandTrigger: 'hover' }"
                            :show-all-levels="false"
                            size="mini"
                            @change="selectcMainClassify6($event, scope.$index)"
                        ></el-cascader>
                        <el-cascader
                            :disabled="tableData_6[0].integral == 0"
                            
                            v-if="scope.$index == 1"
                            v-model="scope.row.mainClassify"
                            :options="mainClassifyOptions2"
                            :props="{ expandTrigger: 'hover' }"
                            :show-all-levels="false"
                            size="mini"
                            @change="selectcMainClassify6($event, scope.$index)"
                        ></el-cascader>
                        <el-cascader
                            :disabled="tableData_6[0].integral == 0"
                            
                            v-if="scope.$index == 2"
                            v-model="scope.row.mainClassify"
                            :options="mainClassifyOptions3"
                            :props="{ expandTrigger: 'hover' }"
                            :show-all-levels="false"
                            size="mini"
                            @change="selectcMainClassify6($event, scope.$index)"
                        ></el-cascader>
                        <el-cascader
                            :disabled="tableData_6[0].integral == 0"
                            
                            v-if="scope.$index == 3"
                            v-model="scope.row.mainClassify"
                            :options="mainClassifyOptions4"
                            :props="{ expandTrigger: 'hover' }"
                            :show-all-levels="false"
                            size="mini"
                            @change="selectcMainClassify6($event, scope.$index)"
                        ></el-cascader>
                        <el-cascader
                            :disabled="tableData_6[0].integral == 0"
                            
                            v-if="scope.$index == 4"
                            v-model="scope.row.mainClassify"
                            :options="mainClassifyOptions5"
                            :props="{ expandTrigger: 'hover' }"
                            :show-all-levels="false"
                            size="mini"
                            @change="selectcMainClassify6($event, scope.$index)"
                        ></el-cascader>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="subClassify" label="子分类" width="180">
                    <template slot-scope="scope">
                        <el-select :disabled="tableData_6[0].integral == 0" v-model="scope.row.subClassify" placeholder="请选择" size="mini" style="width: 120px;">
                            <el-option v-if="scope.$index == 0" v-for="(item, index) in subClassifyOptions_1" :key="index" :label="item.label" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 1" v-for="(item, index) in subClassifyOptions_2" :key="index" :label="item.label" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 2" v-for="(item, index) in subClassifyOptions_3" :key="index" :label="item.label" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 3" v-for="(item, index) in subClassifyOptions_4" :key="index" :label="item.label" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 4" v-for="(item, index) in subClassifyOptions_5" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="reason" label="工作内容" width="320">
                    <template slot-scope="scope">
                        <el-input
                            :disabled="tableData_6[0].integral == 0"
                            type="textarea"
                            resize="none"
                            size="mini"
                            v-model="scope.row.reason"
                            placeholder="请填写工作内容"
                            maxlength="50"
                            show-word-limit
                        ></el-input>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="approverids" label="验收人" width="140">
                    <template slot-scope="scope">
                        <el-select :disabled="tableData_6[0].integral == 0" v-model="scope.row.approverids" placeholder="请选择" size="mini">
                            <el-option v-if="scope.$index == 0" v-for="(item, index) in applyUserList" :label="item.label" :key="index" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 1" v-for="(item, index) in applyUserList1" :label="item.label" :key="index" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 2" v-for="(item, index) in applyUserList2" :label="item.label" :key="index" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 3" v-for="(item, index) in applyUserList3" :label="item.label" :key="index" :value="item.value"></el-option>
                            <el-option v-if="scope.$index == 4" v-for="(item, index) in applyUserList4" :label="item.label" :key="index" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="complete" label="完成情况" width="140">
                    <template slot-scope="scope">
                        <el-select :disabled="tableData_6[0].integral == 0" v-model="scope.row.complete" placeholder="请选择" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in completeOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="completeTime" label="预计完成时间" width="220">
                    <template slot-scope="scope">
                        <el-date-picker
                            v-if="scope.row.complete != 100"
                            style="width: 180px;"
                            size="mini"
                            v-model="scope.row.completeTime"
                            :picker-options="pickerOptions"
                            type="date"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                        ></el-date-picker>
                        <el-date-picker v-else disabled style="width: 180px;" size="mini" placeholder="选择日期"></el-date-picker>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="useHour" label="工时" width="140">
                    <template slot-scope="scope">
                        <el-input-number
                            @change="selectHour_6"
                            :disabled="tableData_6[0].integral == 0"
                            v-model="scope.row.useHour"
                            size="small"
                            controls-position="right"
                            :precision="1"
                            :step="0.5"
                            step-strictly
                            :min="0.5"
                            :max="maxUseHour_6"
                        ></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="address" label="操作" width="140">
                    <template slot-scope="scope">
                        <el-button :disabled="tableData_6[0].integral == 0" type="danger" icon="el-icon-delete" circle @click="deleteRow_6(scope.$index)"></el-button>
                        <el-button :disabled="tableData_6[0].integral == 0" type="primary" icon="el-icon-plus" circle @click="addRow_6()"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="primary" style="margin-left: 45%;margin-top: 3%;" @click="submit_6()">提交</el-button>
        </el-row>

        <el-button type="primary" class="invoiceRules" @click="open">工时规范</el-button>
    </div>
</template>
<script>
import 'element-ui/lib/theme-chalk/display.css';
import { getUserInfo, getDeptUserList } from '../../../api/admin/user.js';
import { addObj, editObj, selectCategory } from '../../../api/apply/manhour.js';
import { getApplyUserInfo } from '../../../api/admin/user.js';
import { getAbnormalSeven, getClockHourInfo } from '../../../api/checkwork/hour.js';
import { getItemVosWithUserId } from '../../../api/project/team.js';
import { getStandardApplyInfoById } from '../../../api/standard/apply.js';
import { mapGetters } from 'vuex';
import { Message } from 'element-ui';
export default {
    inject: ['reload'],
    data() {
        return {
            value: '',
            day_1: '',
            day_2: '',
            day_3: '',
            day_4: '',
            day_5: '',
            day_6: '',
            tableData_1: [
                {
                    hourId: '',
                    userId: null,
                    // 自评分
                    integral: '',
                    // 类别
                    category: '1',
                    // 主分类
                    mainClassify: '',
                    // 子分类
                    subClassify: '',
                    // 项目产品
                    itemId: null,
                    // 完成情况
                    complete: '100',
                    // 预计完成时间
                    completeTime: '',
                    // 验收人
                    approverids: 0,
                    // 工作内容
                    reason: '',
                    // 日期
                    day: '',
                    useHour: '',
                    useMin: 0,
                    aliasNext: '',
                    itemNextId: null
                }
            ],
            tableData_2: [
                {
                    userId: null,
                    // 自评分
                    integral: '',
                    // 类别
                    category: '1',
                    // 主分类
                    mainClassify: '',
                    // 子分类
                    subClassify: '',
                    // 项目产品
                    itemId: null,
                    // 完成情况
                    complete: '100',
                    // 预计完成时间
                    completeTime: '',
                    // 验收人
                    approverids: 0,
                    // 工作内容
                    reason: '',
                    // 工时
                    useHour: '',
                    // 日期
                    day: '',
                    useMin: 0,
                    aliasNext: '',
                    itemNextId: null
                }
            ],
            tableData_3: [
                {
                    userId: null,
                    // 自评分
                    integral: '',
                    // 类别
                    category: '1',
                    // 主分类
                    mainClassify: '',
                    // 子分类
                    subClassify: '',
                    // 项目产品
                    itemId: null,
                    // 完成情况
                    complete: '100',
                    // 预计完成时间
                    completeTime: '',
                    // 验收人
                    approverids: 0,
                    // 工作内容
                    reason: '',
                    // 工时
                    useHour: '',
                    // 日期
                    day: '',
                    useMin: 0,
                    aliasNext: '',
                    itemNextId: null
                }
            ],
            tableData_4: [
                {
                    userId: null,
                    // 自评分
                    integral: '',
                    // 类别
                    category: '1',
                    // 主分类
                    mainClassify: '',
                    // 子分类
                    subClassify: '',
                    // 项目产品
                    itemId: null,
                    // 完成情况
                    complete: '100',
                    // 预计完成时间
                    completeTime: '',
                    // 验收人
                    approverids: 0,
                    // 工作内容
                    reason: '',
                    // 工时
                    useHour: '',
                    // 日期
                    day: '',
                    useMin: 0,
                    aliasNext: '',
                    itemNextId: null
                }
            ],
            tableData_5: [
                {
                    userId: null,
                    // 自评分
                    integral: '',
                    // 类别
                    category: '1',
                    // 主分类
                    mainClassify: '',
                    // 子分类
                    subClassify: '',
                    // 项目产品
                    itemId: null,
                    // 完成情况
                    complete: '100',
                    // 预计完成时间
                    completeTime: '',
                    // 验收人
                    approverids: 0,
                    // 工作内容
                    reason: '',
                    // 工时
                    useHour: '',
                    // 日期
                    day: '',
                    useMin: 0,
                    aliasNext: '',
                    itemNextId: null
                }
            ],
            tableData_6: [
                {
                    userId: null,
                    // 自评分
                    integral: '',
                    // 类别
                    category: '1',
                    // 主分类
                    mainClassify: '',
                    // 子分类
                    subClassify: '',
                    // 项目产品
                    itemId: null,
                    // 完成情况
                    complete: '100',
                    // 预计完成时间
                    completeTime: '',
                    // 验收人
                    approverids: 0,
                    // 工作内容
                    reason: '',
                    // 工时
                    useHour: '',
                    // 日期
                    day: '',
                    useMin: 0,
                    aliasNext: '',
                    itemNextId: null
                }
            ],
            query: {
                itemId: null,
                userId: null,
                deptId: null,
                type: 1
            },
            dayHourInt_1: 0.0,
            dayHourInt_2: 0.0,
            dayHourInt_3: 0.0,
            dayHourInt_4: 0.0,
            dayHourInt_5: 0.0,
            dayHourInt_6: 0.0,
            maxUseHour_1: 0.0,
            maxUseHour_2: 0.0,
            maxUseHour_3: 0.0,
            maxUseHour_4: 0.0,
            maxUseHour_5: 0.0,
            maxUseHour_6: 0.0,
            Hour_1: '',
            Hour_2: '',
            Hour_3: '',
            Hour_4: '',
            Hour_5: '',
            Hour_6: '',
            dayOptions: [],
            integralOptions: [
                { value: 0, label: '0分' },
                { value: 1, label: '1分' },
                { value: 2, label: '2分' },
                { value: 3, label: '3分' },
                { value: 4, label: '4分' },
                { value: 5, label: '5分' }
            ],
            categoryOptions: [],
            mainClassifyOptions1: [],
            mainClassifyOptions2: [],
            mainClassifyOptions3: [],
            mainClassifyOptions4: [],
            mainClassifyOptions5: [],
            mainClassifyOptions6: [],
            mainClassifyOptions7: [],
            mainClassifyOptions8: [],
            mainClassifyOptions9: [],
            mainClassifyOptions10: [],
            subClassifyOptions_1: [],
            subClassifyOptions_2: [],
            subClassifyOptions_3: [],
            subClassifyOptions_4: [],
            subClassifyOptions_5: [],
            subClassifyOptions_6: [],
            subClassifyOptions_7: [],
            subClassifyOptions_8: [],
            subClassifyOptions_9: [],
            subClassifyOptions_10: [],
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
            userList: '',
            applyUserList: [],
            applyUserList1: [],
            applyUserList2: [],
            applyUserList3: [],
            applyUserList4: [],
            applyUserList5: [],
            applyUserList6: [],
            applyUserList7: [],
            applyUserList8: [],
            applyUserList9: [],
            applyClockInfo: '',
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < new Date().getTime() - 3600 * 1000 * 24 * 1;
                }
            },
            hourNum: 0.5,
            hourNum2: 0.5,
            hourNum3: 0.5,
            hourNum4: 0.5,
            hourNum5: 0.5,
            hourNum6: 0.5
        };
    },
    created() {
        this.getStandardApplyInfo();
        this.tableData_1[0].userId = this.userId;
        this.tableData_2[0].userId = this.userId;
        this.tableData_3[0].userId = this.userId;
        this.tableData_4[0].userId = this.userId;
        this.tableData_5[0].userId = this.userId;
        this.tableData_6[0].userId = this.userId;
        this.query.userId = this.userId;
        this.getUserInfo();
        this.getAbnormalSeven();
        this.selectCategory('-1', this.userId);
        // this.getItemVosWithUserId();
        this.tableData_1[0].category = undefined;
        this.tableData_2[0].category = undefined;
        this.tableData_3[0].category = undefined;
        this.tableData_4[0].category = undefined;
        this.tableData_5[0].category = undefined;
        this.tableData_6[0].category = undefined;
    },
    computed: {
        ...mapGetters(['permissions', 'userId'])
    },
    methods: {
        // 获取个人信息
        getUserInfo() {
            getUserInfo(this.query.userId).then(res => {
                this.userList = res.data.data;
            });
        },

        // 获取部门类型
        selectCategory(id, userId) {
            selectCategory(id, userId).then(res => {
                res.data.data.ddRegions.forEach(item => {
                    this.categoryOptions.push({
                        value: item.id,
                        label: item.name
                    });
                });
            });
        },

        // 删除行
        deleteRow_1(index) {
            if (this.tableData_1.length > 1) {
                this.tableData_1.splice(index, 1);
                this.hourNum = this.hourNum - 0.5;
            }
        },
        deleteRow_2(index) {
            if (this.tableData_2.length > 1) {
                this.tableData_2.splice(index, 1);
                this.hourNum2 = this.hourNum2 - 0.5;
            }
        },
        deleteRow_3(index) {
            if (this.tableData_3.length > 1) {
                this.tableData_3.splice(index, 1);
                this.hourNum3 = this.hourNum3 - 0.5;
            }
        },
        deleteRow_4(index) {
            if (this.tableData_4.length > 1) {
                this.tableData_4.splice(index, 1);
                this.hourNum4 = this.hourNum4 - 0.5;
            }
        },
        deleteRow_5(index) {
            if (this.tableData_5.length > 1) {
                this.tableData_5.splice(index, 1);
                this.hourNum5 = this.hourNum5 - 0.5;
            }
        },
        deleteRow_6(index) {
            if (this.tableData_6.length > 1) {
                this.tableData_6.splice(index, 1);
                this.hourNum6 = this.hourNum6 - 0.5;
            }
        },

        // 增加行
        addRow_1() {
            var maxHour = 0;
            this.tableData_1.forEach(item => {
                maxHour += Number(item.useHour);
            });
            if (maxHour >= this.dayHourFloat_1) {
                this.$message({
                    message: '工时不够用啦！',
                    type: 'warning'
                });
                return;
            }
            this.hourNum = this.hourNum + 0.5;
            var list = {
                // 自评分
                integral: this.tableData_1[0].integral,
                // 个人id
                userId: this.tableData_1[0].userId,
                // 工时id
                hourId: this.tableData_1[0].hourId,
                // 类别
                category: '',
                // 主分类
                mainClassify: '',
                // 子分类
                subClassify: '',
                // 项目产品
                itemId: '',
                // 完成情况
                complete: '100',
                // 预计完成时间
                completeTime: '',
                // 验收人
                approverids: 0,
                // 工作内容
                reason: '',
                // 工时
                useMin: '',
                useHour: 0.5,
                aliasNext: '',
                itemNextId: null,
                // 填报日期
                day: this.tableData_1[0].day
            };
            this.tableData_1.push(list);
            if (this.tableData_1.length > 10) {
                this.tableData_1.length = 10;
            }
        },
        addRow_2() {
            var maxHour = 0;
            this.tableData_2.forEach(item => {
                maxHour += Number(item.useHour);
            });
            if (maxHour >= this.dayHourFloat_2) {
                this.$message({
                    message: '工时不够用啦！',
                    type: 'warning'
                });
                return;
            }
            this.hourNum2 = this.hourNum2 + 0.5;
            var list = {
                // 自评分
                integral: this.tableData_2[0].integral,
                // 个人id
                userId: this.tableData_2[0].userId,
                // 工时id
                hourId: this.tableData_2[0].hourId,
                // 类别
                category: '',
                // 主分类
                mainClassify: '',
                // 子分类
                subClassify: '',
                // 项目产品
                itemId: '',
                // 完成情况
                complete: '100',
                // 预计完成时间
                completeTime: '',
                // 验收人
                approverids: 0,
                // 工作内容
                reason: '',
                // 工时
                useMin: '',
                useHour: 0.5,
                aliasNext: '',
                itemNextId: null,
                // 填报日期
                day: this.tableData_2[0].day
            };
            this.tableData_2.push(list);
            if (this.tableData_2.length > 5) {
                this.tableData_2.length = 5;
            }
        },
        addRow_3() {
            var maxHour = 0;
            this.tableData_3.forEach(item => {
                maxHour += Number(item.useHour);
            });
            if (maxHour >= this.dayHourFloat_3) {
                this.$message({
                    message: '工时不够用啦！',
                    type: 'warning'
                });
                return;
            }
            this.hourNum3 = this.hourNum3 + 0.5;
            var list = {
                // 自评分
                integral: this.tableData_3[0].integral,
                // 个人id
                userId: this.tableData_3[this.tableData_3.length - 1].userId,
                // 工时id
                hourId: this.tableData_3[0].hourId,
                // 类别
                category: '',
                // 主分类
                mainClassify: '',
                // 子分类
                subClassify: '',
                // 项目产品
                itemId: '',
                // 完成情况
                complete: '100',
                // 预计完成时间
                completeTime: '',
                // 验收人
                approverids: 0,
                // 工作内容
                reason: '',
                // 工时
                useMin: '',
                useHour: 0.5,
                aliasNext: '',
                itemNextId: null,
                // 填报日期
                day: this.tableData_3[0].day
            };
            this.tableData_3.push(list);
            if (this.tableData_3.length > 5) {
                this.tableData_3.length = 5;
            }
        },
        addRow_4() {
            var maxHour = 0;
            this.tableData_4.forEach(item => {
                maxHour += Number(item.useHour);
            });
            if (maxHour >= this.dayHourFloat_4) {
                this.$message({
                    message: '工时不够用啦！',
                    type: 'warning'
                });
                return;
            }
            this.hourNum4 = this.hourNum4 + 0.5;
            var list = {
                // 自评分
                integral: this.tableData_4[0].integral,
                // 个人id
                userId: this.tableData_4[this.tableData_4.length - 1].userId,
                // 工时id
                hourId: this.tableData_4[0].hourId,
                // 类别
                category: '',
                // 主分类
                mainClassify: '',
                // 子分类
                subClassify: '',
                // 项目产品
                itemId: '',
                // 完成情况
                complete: '100',
                // 预计完成时间
                completeTime: '',
                // 验收人
                approverids: 0,
                // 工作内容
                reason: '',
                // 工时
                useMin: '',
                useHour: 0.5,
                aliasNext: '',
                itemNextId: null,
                // 填报日期
                day: this.tableData_4[0].day
            };
            this.tableData_4.push(list);
            if (this.tableData_4.length > 5) {
                this.tableData_4.length = 5;
            }
        },
        addRow_5() {
            var maxHour = 0;
            this.tableData_5.forEach(item => {
                maxHour += Number(item.useHour);
            });
            if (maxHour >= this.dayHourFloat_5) {
                this.$message({
                    message: '工时不够用啦！',
                    type: 'warning'
                });
                return;
            }
            this.hourNum5 = this.hourNum5 + 0.5;
            var list = {
                // 自评分
                integral: this.tableData_5[0].integral,
                // 个人id
                userId: this.tableData_5[this.tableData_5.length - 1].userId,
                // 工时id
                hourId: this.tableData_5[0].hourId,
                // 类别
                category: '',
                // 主分类
                mainClassify: '',
                // 子分类
                subClassify: '',
                // 项目产品
                itemId: '',
                // 完成情况
                complete: '100',
                // 预计完成时间
                completeTime: '',
                // 验收人
                approverids: 0,
                // 工作内容
                reason: '',
                // 工时
                useMin: '',
                useHour: 0.5,
                aliasNext: '',
                itemNextId: null,
                // 填报日期
                day: this.tableData_5[0].day
            };
            this.tableData_5.push(list);
            if (this.tableData_5.length > 5) {
                this.tableData_5.length = 5;
            }
        },
        addRow_6() {
            var maxHour = 0;
            this.tableData_6.forEach(item => {
                maxHour += Number(item.useHour);
            });
            if (maxHour >= this.dayHourFloat_6) {
                this.$message({
                    message: '工时不够用啦！',
                    type: 'warning'
                });
                return;
            }
            this.hourNum6 = this.hourNum6 + 0.5;
            var list = {
                // 自评分
                integral: this.tableData_6[0].integral,
                // 个人id
                userId: this.tableData_6[this.tableData_6.length - 1].userId,
                // 工时id
                hourId: this.tableData_6[0].hourId,
                // 类别
                category: '',
                // 主分类
                mainClassify: '',
                // 子分类
                subClassify: '',
                // 项目产品
                itemId: '',
                // 完成情况
                complete: '100',
                // 预计完成时间
                completeTime: '',
                // 验收人
                approverids: 0,
                // 工作内容
                reason: '',
                // 工时
                useMin: '',
                useHour: 0.5,
                aliasNext: '',
                itemNextId: null,
                // 填报日期
                day: this.tableData_6[0].day
            };
            this.tableData_6.push(list);
            if (this.tableData_6.length > 5) {
                this.tableData_6.length = 5;
            }
        },

        // 提交
        submit_1() {
            if (this.tableData_1.length == 1) {
                this.tableData_1[0].mainClassify = this.tableData_1[0].mainClassify[0];
            }
            if (this.tableData_1.length == 2) {
                this.tableData_1[0].mainClassify = this.tableData_1[0].mainClassify[0];
                this.tableData_1[1].mainClassify = this.tableData_1[1].mainClassify[0];
            }
            if (this.tableData_1.length == 3) {
                this.tableData_1[0].mainClassify = this.tableData_1[0].mainClassify[0];
                this.tableData_1[1].mainClassify = this.tableData_1[1].mainClassify[0];
                this.tableData_1[2].mainClassify = this.tableData_1[2].mainClassify[0];
            }
            if (this.tableData_1.length == 4) {
                this.tableData_1[0].mainClassify = this.tableData_1[0].mainClassify[0];
                this.tableData_1[1].mainClassify = this.tableData_1[1].mainClassify[0];
                this.tableData_1[2].mainClassify = this.tableData_1[2].mainClassify[0];
                this.tableData_1[3].mainClassify = this.tableData_1[3].mainClassify[0];
            }
            if (this.tableData_1.length == 5) {
                this.tableData_1[0].mainClassify = this.tableData_1[0].mainClassify[0];
                this.tableData_1[1].mainClassify = this.tableData_1[1].mainClassify[0];
                this.tableData_1[2].mainClassify = this.tableData_1[2].mainClassify[0];
                this.tableData_1[3].mainClassify = this.tableData_1[3].mainClassify[0];
                this.tableData_1[4].mainClassify = this.tableData_1[4].mainClassify[0];
            }
            if (this.tableData_1.length == 6) {
                this.tableData_1[0].mainClassify = this.tableData_1[0].mainClassify[0];
                this.tableData_1[1].mainClassify = this.tableData_1[1].mainClassify[0];
                this.tableData_1[2].mainClassify = this.tableData_1[2].mainClassify[0];
                this.tableData_1[3].mainClassify = this.tableData_1[3].mainClassify[0];
                this.tableData_1[4].mainClassify = this.tableData_1[4].mainClassify[0];
                this.tableData_1[5].mainClassify = this.tableData_1[5].mainClassify[0];
            }
            if (this.tableData_1.length == 7) {
                this.tableData_1[0].mainClassify = this.tableData_1[0].mainClassify[0];
                this.tableData_1[1].mainClassify = this.tableData_1[1].mainClassify[0];
                this.tableData_1[2].mainClassify = this.tableData_1[2].mainClassify[0];
                this.tableData_1[3].mainClassify = this.tableData_1[3].mainClassify[0];
                this.tableData_1[4].mainClassify = this.tableData_1[4].mainClassify[0];
                this.tableData_1[5].mainClassify = this.tableData_1[5].mainClassify[0];
                this.tableData_1[6].mainClassify = this.tableData_1[6].mainClassify[0];
            }
            if (this.tableData_1.length == 8) {
                this.tableData_1[0].mainClassify = this.tableData_1[0].mainClassify[0];
                this.tableData_1[1].mainClassify = this.tableData_1[1].mainClassify[0];
                this.tableData_1[2].mainClassify = this.tableData_1[2].mainClassify[0];
                this.tableData_1[3].mainClassify = this.tableData_1[3].mainClassify[0];
                this.tableData_1[4].mainClassify = this.tableData_1[4].mainClassify[0];
                this.tableData_1[5].mainClassify = this.tableData_1[5].mainClassify[0];
                this.tableData_1[6].mainClassify = this.tableData_1[6].mainClassify[0];
                this.tableData_1[7].mainClassify = this.tableData_1[7].mainClassify[0];
            }
            if (this.tableData_1.length == 9) {
                this.tableData_1[0].mainClassify = this.tableData_1[0].mainClassify[0];
                this.tableData_1[1].mainClassify = this.tableData_1[1].mainClassify[0];
                this.tableData_1[2].mainClassify = this.tableData_1[2].mainClassify[0];
                this.tableData_1[3].mainClassify = this.tableData_1[3].mainClassify[0];
                this.tableData_1[4].mainClassify = this.tableData_1[4].mainClassify[0];
                this.tableData_1[5].mainClassify = this.tableData_1[5].mainClassify[0];
                this.tableData_1[6].mainClassify = this.tableData_1[6].mainClassify[0];
                this.tableData_1[7].mainClassify = this.tableData_1[7].mainClassify[0];
                this.tableData_1[8].mainClassify = this.tableData_1[8].mainClassify[0];
            }
            if (this.tableData_1.length == 10) {
                this.tableData_1[0].mainClassify = this.tableData_1[0].mainClassify[0];
                this.tableData_1[1].mainClassify = this.tableData_1[1].mainClassify[0];
                this.tableData_1[2].mainClassify = this.tableData_1[2].mainClassify[0];
                this.tableData_1[3].mainClassify = this.tableData_1[3].mainClassify[0];
                this.tableData_1[4].mainClassify = this.tableData_1[4].mainClassify[0];
                this.tableData_1[5].mainClassify = this.tableData_1[5].mainClassify[0];
                this.tableData_1[6].mainClassify = this.tableData_1[6].mainClassify[0];
                this.tableData_1[7].mainClassify = this.tableData_1[7].mainClassify[0];
                this.tableData_1[8].mainClassify = this.tableData_1[8].mainClassify[0];
                this.tableData_1[9].mainClassify = this.tableData_1[9].mainClassify[0];
            }

            for (var i = 0; i < this.tableData_1.length; i++) {
                if (this.tableData_1[i].useHour > 0) {
                    this.tableData_1[i].useMin = this.tableData_1[i].useHour * 60;
                }
            }
            console.log(this.tableData_1);
            for (var i = 0; i < this.tableData_1.length; i++) {
                if (this.tableData_1[i].subClassify == '') {
                    this.$alert('请选择子分类！', '提示', {
                        confirmButtonText: '确定',
                        type: 'warning'
                    });
                    return;
                }
                if (this.tableData_1[i].reason == '') {
                    this.$alert('请填写工作内容！', '提示', {
                        confirmButtonText: '确定',
                        type: 'warning'
                    });
                    return;
                }
                if (this.tableData_1[i].complete != 100 && this.tableData_1[i].completeTime == '') {
                    this.$alert('请选择预计完成时间！', '提示', {
                        confirmButtonText: '确定',
                        type: 'warning'
                    });
                    return;
                }
            }
            addObj(this.tableData_1).then(() => {
                this.$nextTick(() => {
                    this.getAbnormalSeven();
                    this.selectWorkDay_1(this.day_1.hourId);
                });
                this.reload();
                this.$router.push({
                    path: `/apply/manhour`,
                    query: {
                        activeName: 'info',
                        status: ''
                    }
                });
            });
        },
        submit_2() {
            if (this.tableData_2.length == 1) {
                this.tableData_2[0].mainClassify = this.tableData_2[0].mainClassify[0];
            }
            if (this.tableData_2.length == 2) {
                this.tableData_2[0].mainClassify = this.tableData_2[0].mainClassify[0];
                this.tableData_2[1].mainClassify = this.tableData_2[1].mainClassify[0];
            }
            if (this.tableData_2.length == 3) {
                this.tableData_2[0].mainClassify = this.tableData_2[0].mainClassify[0];
                this.tableData_2[1].mainClassify = this.tableData_2[1].mainClassify[0];
                this.tableData_2[2].mainClassify = this.tableData_2[2].mainClassify[0];
            }
            if (this.tableData_2.length == 4) {
                this.tableData_2[0].mainClassify = this.tableData_2[0].mainClassify[0];
                this.tableData_2[1].mainClassify = this.tableData_2[1].mainClassify[0];
                this.tableData_2[2].mainClassify = this.tableData_2[2].mainClassify[0];
                this.tableData_2[3].mainClassify = this.tableData_2[3].mainClassify[0];
            }
            if (this.tableData_2.length == 5) {
                this.tableData_2[0].mainClassify = this.tableData_2[0].mainClassify[0];
                this.tableData_2[1].mainClassify = this.tableData_2[1].mainClassify[0];
                this.tableData_2[2].mainClassify = this.tableData_2[2].mainClassify[0];
                this.tableData_2[3].mainClassify = this.tableData_2[3].mainClassify[0];
                this.tableData_2[4].mainClassify = this.tableData_2[4].mainClassify[0];
            }
            console.log(this.tableData_2);
            for (var i = 0; i < this.tableData_2.length; i++) {
                if (this.tableData_2[i].useHour > 0) {
                    this.tableData_2[i].useMin = this.tableData_2[i].useHour * 60;
                }
            }
            for (var i = 0; i < this.tableData_2.length; i++) {
                if (this.tableData_2[i].subClassify == '') {
                    this.$alert('请选择子分类！', '提示', {
                        confirmButtonText: '确定',
                        type: 'warning'
                    });
                    return;
                }
                if (this.tableData_2[i].reason == '') {
                    this.$alert('请填写工作内容！', '提示', {
                        confirmButtonText: '确定',
                        type: 'warning'
                    });
                    return;
                }
                if (this.tableData_2[i].complete != 100 && this.tableData_2[i].completeTime == '') {
                    this.$alert('请选择预计完成时间！', '提示', {
                        confirmButtonText: '确定',
                        type: 'warning'
                    });
                    return;
                }
            }
            addObj(this.tableData_2).then(() => {
                this.$nextTick(() => {
                    this.getAbnormalSeven();
                    this.selectWorkDay_2(this.day_2.hourId);
                });
                this.reload();
                this.$router.push({
                    path: `/apply/manhour`,
                    query: {
                        activeName: 'info',
                        status: ''
                    }
                });
            });
        },
        submit_3() {
            if (this.tableData_3.length == 1) {
                this.tableData_3[0].mainClassify = this.tableData_3[0].mainClassify[0];
            }
            if (this.tableData_3.length == 2) {
                this.tableData_3[0].mainClassify = this.tableData_3[0].mainClassify[0];
                this.tableData_3[1].mainClassify = this.tableData_3[1].mainClassify[0];
            }
            if (this.tableData_3.length == 3) {
                this.tableData_3[0].mainClassify = this.tableData_3[0].mainClassify[0];
                this.tableData_3[1].mainClassify = this.tableData_3[1].mainClassify[0];
                this.tableData_3[2].mainClassify = this.tableData_3[2].mainClassify[0];
            }
            if (this.tableData_3.length == 4) {
                this.tableData_3[0].mainClassify = this.tableData_3[0].mainClassify[0];
                this.tableData_3[1].mainClassify = this.tableData_3[1].mainClassify[0];
                this.tableData_3[2].mainClassify = this.tableData_3[2].mainClassify[0];
                this.tableData_3[3].mainClassify = this.tableData_3[3].mainClassify[0];
            }
            if (this.tableData_3.length == 5) {
                this.tableData_3[0].mainClassify = this.tableData_3[0].mainClassify[0];
                this.tableData_3[1].mainClassify = this.tableData_3[1].mainClassify[0];
                this.tableData_3[2].mainClassify = this.tableData_3[2].mainClassify[0];
                this.tableData_3[3].mainClassify = this.tableData_3[3].mainClassify[0];
                this.tableData_3[4].mainClassify = this.tableData_3[4].mainClassify[0];
            }
            console.log(this.tableData_3);
            for (var i = 0; i < this.tableData_3.length; i++) {
                if (this.tableData_3[i].useHour > 0) {
                    this.tableData_3[i].useMin = this.tableData_3[i].useHour * 60;
                }
            }
            for (var i = 0; i < this.tableData_3.length; i++) {
                if (this.tableData_3[i].subClassify == '') {
                    this.$alert('请选择子分类！', '提示', {
                        confirmButtonText: '确定',
                        type: 'warning'
                    });
                    return;
                }
                if (this.tableData_3[i].reason == '') {
                    this.$alert('请填写工作内容！', '提示', {
                        confirmButtonText: '确定',
                        type: 'warning'
                    });
                    return;
                }
                if (this.tableData_3[i].complete != 100 && this.tableData_3[i].completeTime == '') {
                    this.$alert('请选择预计完成时间！', '提示', {
                        confirmButtonText: '确定',
                        type: 'warning'
                    });
                    return;
                }
            }
            addObj(this.tableData_3).then(() => {
                this.$nextTick(() => {
                    this.getAbnormalSeven();
                    this.selectWorkDay_3(this.day_3.hourId);
                });
                this.reload();
                this.$router.push({
                    path: `/apply/manhour`,
                    query: {
                        activeName: 'info',
                        status: ''
                    }
                });
            });
        },
        submit_4() {
            if (this.tableData_4.length == 1) {
                this.tableData_4[0].mainClassify = this.tableData_4[0].mainClassify[0];
            }
            if (this.tableData_4.length == 2) {
                this.tableData_4[0].mainClassify = this.tableData_4[0].mainClassify[0];
                this.tableData_4[1].mainClassify = this.tableData_4[1].mainClassify[0];
            }
            if (this.tableData_4.length == 3) {
                this.tableData_4[0].mainClassify = this.tableData_4[0].mainClassify[0];
                this.tableData_4[1].mainClassify = this.tableData_4[1].mainClassify[0];
                this.tableData_4[2].mainClassify = this.tableData_4[2].mainClassify[0];
            }
            if (this.tableData_4.length == 4) {
                this.tableData_4[0].mainClassify = this.tableData_4[0].mainClassify[0];
                this.tableData_4[1].mainClassify = this.tableData_4[1].mainClassify[0];
                this.tableData_4[2].mainClassify = this.tableData_4[2].mainClassify[0];
                this.tableData_4[3].mainClassify = this.tableData_4[3].mainClassify[0];
            }
            if (this.tableData_4.length == 5) {
                this.tableData_4[0].mainClassify = this.tableData_4[0].mainClassify[0];
                this.tableData_4[1].mainClassify = this.tableData_4[1].mainClassify[0];
                this.tableData_4[2].mainClassify = this.tableData_4[2].mainClassify[0];
                this.tableData_4[3].mainClassify = this.tableData_4[3].mainClassify[0];
                this.tableData_4[4].mainClassify = this.tableData_4[4].mainClassify[0];
            }
            console.log(this.tableData_4);
            for (var i = 0; i < this.tableData_4.length; i++) {
                if (this.tableData_4[i].useHour > 0) {
                    this.tableData_4[i].useMin = this.tableData_4[i].useHour * 60;
                }
            }
            for (var i = 0; i < this.tableData_4.length; i++) {
                if (this.tableData_4[i].subClassify == '') {
                    this.$alert('请选择子分类！', '提示', {
                        confirmButtonText: '确定',
                        type: 'warning'
                    });
                    return;
                }
                if (this.tableData_4[i].reason == '') {
                    this.$alert('请填写工作内容！', '提示', {
                        confirmButtonText: '确定',
                        type: 'warning'
                    });
                    return;
                }
                if (this.tableData_4[i].complete != 100 && this.tableData_4[i].completeTime == '') {
                    this.$alert('请选择预计完成时间！', '提示', {
                        confirmButtonText: '确定',
                        type: 'warning'
                    });
                    return;
                }
            }
            addObj(this.tableData_4).then(() => {
                this.$nextTick(() => {
                    this.getAbnormalSeven();
                    this.selectWorkDay_4(this.day_4.hourId);
                });
                this.reload();
                this.$router.push({
                    path: `/apply/manhour`,
                    query: {
                        activeName: 'info',
                        status: ''
                    }
                });
            });
        },
        submit_5() {
            if (this.tableData_5.length == 1) {
                this.tableData_5[0].mainClassify = this.tableData_5[0].mainClassify[0];
            }
            if (this.tableData_5.length == 2) {
                this.tableData_5[0].mainClassify = this.tableData_5[0].mainClassify[0];
                this.tableData_5[1].mainClassify = this.tableData_5[1].mainClassify[0];
            }
            if (this.tableData_5.length == 3) {
                this.tableData_5[0].mainClassify = this.tableData_5[0].mainClassify[0];
                this.tableData_5[1].mainClassify = this.tableData_5[1].mainClassify[0];
                this.tableData_5[2].mainClassify = this.tableData_5[2].mainClassify[0];
            }
            if (this.tableData_5.length == 4) {
                this.tableData_5[0].mainClassify = this.tableData_5[0].mainClassify[0];
                this.tableData_5[1].mainClassify = this.tableData_5[1].mainClassify[0];
                this.tableData_5[2].mainClassify = this.tableData_5[2].mainClassify[0];
                this.tableData_5[3].mainClassify = this.tableData_5[3].mainClassify[0];
            }
            if (this.tableData_5.length == 5) {
                this.tableData_5[0].mainClassify = this.tableData_5[0].mainClassify[0];
                this.tableData_5[1].mainClassify = this.tableData_5[1].mainClassify[0];
                this.tableData_5[2].mainClassify = this.tableData_5[2].mainClassify[0];
                this.tableData_5[3].mainClassify = this.tableData_5[3].mainClassify[0];
                this.tableData_5[4].mainClassify = this.tableData_5[4].mainClassify[0];
            }
            console.log(this.tableData_5);
            for (var i = 0; i < this.tableData_5.length; i++) {
                if (this.tableData_5[i].useHour > 0) {
                    this.tableData_5[i].useMin = this.tableData_5[i].useHour * 60;
                }
            }
            for (var i = 0; i < this.tableData_5.length; i++) {
                if (this.tableData_5[i].subClassify == '') {
                    this.$alert('请选择子分类！', '提示', {
                        confirmButtonText: '确定',
                        type: 'warning'
                    });
                    return;
                }
                if (this.tableData_5[i].reason == '') {
                    this.$alert('请填写工作内容！', '提示', {
                        confirmButtonText: '确定',
                        type: 'warning'
                    });
                    return;
                }
                if (this.tableData_5[i].complete != 100 && this.tableData_5[i].completeTime == '') {
                    this.$alert('请选择预计完成时间！', '提示', {
                        confirmButtonText: '确定',
                        type: 'warning'
                    });
                    return;
                }
            }
            addObj(this.tableData_5).then(() => {
                this.$nextTick(() => {
                    this.getAbnormalSeven();
                    this.selectWorkDay_5(this.day_5.hourId);
                });
                this.reload();
                this.$router.push({
                    path: `/apply/manhour`,
                    query: {
                        activeName: 'info',
                        status: ''
                    }
                });
            });
        },
        submit_6() {
            if (this.tableData_6.length == 1) {
                this.tableData_6[0].mainClassify = this.tableData_6[0].mainClassify[0];
            }
            if (this.tableData_6.length == 2) {
                this.tableData_6[0].mainClassify = this.tableData_6[0].mainClassify[0];
                this.tableData_6[1].mainClassify = this.tableData_6[1].mainClassify[0];
            }
            if (this.tableData_6.length == 3) {
                this.tableData_6[0].mainClassify = this.tableData_6[0].mainClassify[0];
                this.tableData_6[1].mainClassify = this.tableData_6[1].mainClassify[0];
                this.tableData_6[2].mainClassify = this.tableData_6[2].mainClassify[0];
            }
            if (this.tableData_6.length == 4) {
                this.tableData_6[0].mainClassify = this.tableData_6[0].mainClassify[0];
                this.tableData_6[1].mainClassify = this.tableData_6[1].mainClassify[0];
                this.tableData_6[2].mainClassify = this.tableData_6[2].mainClassify[0];
                this.tableData_6[3].mainClassify = this.tableData_6[3].mainClassify[0];
            }
            if (this.tableData_6.length == 5) {
                this.tableData_6[0].mainClassify = this.tableData_6[0].mainClassify[0];
                this.tableData_6[1].mainClassify = this.tableData_6[1].mainClassify[0];
                this.tableData_6[2].mainClassify = this.tableData_6[2].mainClassify[0];
                this.tableData_6[3].mainClassify = this.tableData_6[3].mainClassify[0];
                this.tableData_6[4].mainClassify = this.tableData_6[4].mainClassify[0];
            }
            console.log(this.tableData_6);
            for (var i = 0; i < this.tableData_6.length; i++) {
                if (this.tableData_6[i].useHour > 0) {
                    this.tableData_6[i].useMin = this.tableData_6[i].useHour * 60;
                }
            }
            for (var i = 0; i < this.tableData_6.length; i++) {
                if (this.tableData_6[i].subClassify == '') {
                    this.$alert('请选择子分类！', '提示', {
                        confirmButtonText: '确定',
                        type: 'warning'
                    });
                    return;
                }
                if (this.tableData_6[i].reason == '') {
                    this.$alert('请填写工作内容！', '提示', {
                        confirmButtonText: '确定',
                        type: 'warning'
                    });
                    return;
                }
                if (this.tableData_6[i].complete != 100 && this.tableData_6[i].completeTime == '') {
                    this.$alert('请选择预计完成时间！', '提示', {
                        confirmButtonText: '确定',
                        type: 'warning'
                    });
                    return;
                }
            }
            addObj(this.tableData_6).then(() => {
                this.$nextTick(() => {
                    this.getAbnormalSeven();
                    this.selectWorkDay_6(this.day_6.hourId);
                });
                this.reload();
                this.$router.push({
                    path: `/apply/manhour`,
                    query: {
                        activeName: 'info',
                        status: ''
                    }
                });
            });
        },

        selectHour_1(val) {
            let hour = 0;
            for (var i = 0; i < this.tableData_1.length; i++) {
                hour += this.tableData_1[i].useHour;
            }

            this.hourNum = hour;

            if (this.maxUseHour_1 < hour) {
                // this.useHourDisabled_1 = true;
                Message({
                    message: '请注意你的工时分配是否正确',
                    type: 'error'
                });
            }
        },
        selectHour_2(val) {
            let hour = 0;
            for (var i = 0; i < this.tableData_2.length; i++) {
                hour += this.tableData_2[i].useHour;
            }
            this.hourNum2 = hour;
            if (this.maxUseHour_2 < hour) {
                // this.useHourDisabled_1 = true;
                Message({
                    message: '请注意你的工时分配是否正确',
                    type: 'error'
                });
            }
        },
        selectHour_3(val) {
            let hour = 0;
            for (var i = 0; i < this.tableData_3.length; i++) {
                hour += this.tableData_3[i].useHour;
            }
            this.hourNum3 = hour;
            if (this.maxUseHour_3 < hour) {
                // this.useHourDisabled_1 = true;
                Message({
                    message: '请注意你的工时分配是否正确',
                    type: 'error'
                });
            }
        },
        selectHour_4(val) {
            let hour = 0;
            for (var i = 0; i < this.tableData_4.length; i++) {
                hour += this.tableData_4[i].useHour;
            }
            this.hourNum4 = hour;
            if (this.maxUseHour_4 < hour) {
                // this.useHourDisabled_1 = true;
                Message({
                    message: '请注意你的工时分配是否正确',
                    type: 'error'
                });
            }
        },
        selectHour_5(val) {
            let hour = 0;
            for (var i = 0; i < this.tableData_5.length; i++) {
                hour += this.tableData_5[i].useHour;
            }
            this.hourNum5 = hour;
            if (this.maxUseHour_5 < hour) {
                // this.useHourDisabled_1 = true;
                Message({
                    message: '请注意你的工时分配是否正确',
                    type: 'error'
                });
            }
        },
        selectHour_6(val) {
            let hour = 0;
            for (var i = 0; i < this.tableData_6.length; i++) {
                hour += this.tableData_6[i].useHour;
            }
            this.hourNum6 = hour;
            if (this.maxUseHour_6 < hour) {
                // this.useHourDisabled_1 = true;
                Message({
                    message: '请注意你的工时分配是否正确',
                    type: 'error'
                });
            }
        },

        // 获取鸡腿数量 最大工时
        selectWorkDay_1(val) {
            getClockHourInfo(val).then(response => {
                const clockHourInfo = response.data.data;
                this.tableData_1[0].day = clockHourInfo.day;
                this.tableData_1[0].hourId = clockHourInfo.hourId;
                this.tableData_1[0].integral = clockHourInfo.integral;
                var hour1 = parseInt(clockHourInfo.hour);
                var hour2 = (clockHourInfo.hour - hour1).toFixed(1);
                if (hour2 < 0.5 && hour2 != 0.0) {
                    hour2 = 0.5;
                    this.Hour_1 = hour1 + hour2;
                } else if (hour2 == 0.0) {
                    this.Hour_1 = hour1;
                } else if (hour2 == 0.5) {
                    hour2 = 0.5;
                    this.Hour_1 = hour1 + hour2;
                } else {
                    this.Hour_1 = Math.round(clockHourInfo.hour);
                }
                this.dayHourInt_1 = Math.ceil(clockHourInfo.hour);
                var hour = parseFloat((parseFloat(clockHourInfo.hour) - parseFloat(clockHourInfo.useHour)).toString()).toFixed(1);
                var num2 = parseInt(hour);
                var num3 = (hour - num2).toFixed(1);
                if (num3 < 0.5 && num3 != 0.0) {
                    num3 = 0.5;
                    hour = num2 + num3;
                } else if (num3 == 0.0) {
                    hour = num2;
                } else if (num3 == 0.5) {
                    num3 = 0.5;
                    hour = num2 + num3;
                } else {
                    hour = Math.round(hour);
                }
                this.dayHourFloat_1 = parseFloat(hour);
                this.maxUseHour_1 = parseFloat(hour);
                // if(this.dayHourFloat_1<=0){
                //     this.oldList=[]
                //     localStorage.removeItem('oldList')
                //     this.reload();
                // }
            });
        },
        selectWorkDay_2(val) {
            getClockHourInfo(val).then(response => {
                const clockHourInfo = response.data.data;
                this.tableData_2[0].day = clockHourInfo.day;
                this.tableData_2[0].integral = clockHourInfo.integral;
                this.tableData_2[0].hourId = clockHourInfo.hourId;
                var hour1 = parseInt(clockHourInfo.hour);
                var hour2 = (clockHourInfo.hour - hour1).toFixed(1);
                if (hour2 < 0.5 && hour2 != 0.0) {
                    hour2 = 0.5;
                    this.Hour_2 = hour1 + hour2;
                } else if (hour2 == 0.0) {
                    this.Hour_2 = hour1;
                } else if (hour2 == 0.5) {
                    hour2 = 0.5;
                    this.Hour_2 = hour1 + hour2;
                } else {
                    this.Hour_2 = Math.round(clockHourInfo.hour);
                }
                this.dayHourInt_2 = Math.ceil(clockHourInfo.hour);
                var hour = parseFloat((parseFloat(clockHourInfo.hour) - parseFloat(clockHourInfo.useHour)).toString()).toFixed(1);
                var num2 = parseInt(hour);
                var num3 = (hour - num2).toFixed(1);
                if (num3 < 0.5 && num3 != 0.0) {
                    num3 = 0.5;
                    hour = num2 + num3;
                } else if (num3 == 0.0) {
                    hour = num2;
                } else if (num3 == 0.5) {
                    num3 = 0.5;
                    hour = num2 + num3;
                } else {
                    hour = Math.round(hour);
                }
                this.dayHourFloat_2 = parseFloat(hour);
                this.maxUseHour_2 = parseFloat(hour);
            });
        },
        selectWorkDay_3(val) {
            getClockHourInfo(val).then(response => {
                const clockHourInfo = response.data.data;
                this.tableData_3[0].day = clockHourInfo.day;
                this.tableData_3[0].integral = clockHourInfo.integral;
                this.tableData_3[0].hourId = clockHourInfo.hourId;
                var hour1 = parseInt(clockHourInfo.hour);
                var hour2 = (clockHourInfo.hour - hour1).toFixed(1);
                if (hour2 < 0.5 && hour2 != 0.0) {
                    hour2 = 0.5;
                    this.Hour_3 = hour1 + hour2;
                } else if (hour2 == 0.0) {
                    this.Hour_3 = hour1;
                } else if (hour2 == 0.5) {
                    hour2 = 0.5;
                    this.Hour_3 = hour1 + hour2;
                } else {
                    this.Hour_3 = Math.round(clockHourInfo.hour);
                }
                this.dayHourInt_3 = Math.ceil(clockHourInfo.hour);
                var hour = parseFloat((parseFloat(clockHourInfo.hour) - parseFloat(clockHourInfo.useHour)).toString()).toFixed(1);
                var num2 = parseInt(hour);
                var num3 = (hour - num2).toFixed(1);
                if (num3 < 0.5 && num3 != 0.0) {
                    num3 = 0.5;
                    hour = num2 + num3;
                } else if (num3 == 0.0) {
                    hour = num2;
                } else if (num3 == 0.5) {
                    num3 = 0.5;
                    hour = num2 + num3;
                } else {
                    hour = Math.round(hour);
                }
                this.dayHourFloat_3 = parseFloat(hour);
                this.maxUseHour_3 = parseFloat(hour);
            });
        },
        selectWorkDay_4(val) {
            getClockHourInfo(val).then(response => {
                const clockHourInfo = response.data.data;
                this.tableData_4[0].day = clockHourInfo.day;
                this.tableData_4[0].integral = clockHourInfo.integral;
                this.tableData_4[0].hourId = clockHourInfo.hourId;
                var hour1 = parseInt(clockHourInfo.hour);
                var hour2 = (clockHourInfo.hour - hour1).toFixed(1);
                if (hour2 < 0.5 && hour2 != 0.0) {
                    hour2 = 0.5;
                    this.Hour_4 = hour1 + hour2;
                } else if (hour2 == 0.0) {
                    this.Hour_4 = hour1;
                } else if (hour2 == 0.5) {
                    hour2 = 0.5;
                    this.Hour_4 = hour1 + hour2;
                } else {
                    this.Hour_4 = Math.round(clockHourInfo.hour);
                }
                this.dayHourInt_4 = Math.ceil(clockHourInfo.hour);
                var hour = parseFloat((parseFloat(clockHourInfo.hour) - parseFloat(clockHourInfo.useHour)).toString()).toFixed(1);
                var num2 = parseInt(hour);
                var num3 = (hour - num2).toFixed(1);
                if (num3 < 0.5 && num3 != 0.0) {
                    num3 = 0.5;
                    hour = num2 + num3;
                } else if (num3 == 0.0) {
                    hour = num2;
                } else if (num3 == 0.5) {
                    num3 = 0.5;
                    hour = num2 + num3;
                } else {
                    hour = Math.round(hour);
                }
                this.dayHourFloat_4 = parseFloat(hour);
                this.maxUseHour_4 = parseFloat(hour);
            });
        },
        selectWorkDay_5(val) {
            getClockHourInfo(val).then(response => {
                const clockHourInfo = response.data.data;
                this.tableData_5[0].day = clockHourInfo.day;
                this.tableData_5[0].integral = clockHourInfo.integral;
                this.tableData_5[0].hourId = clockHourInfo.hourId;
                var hour1 = parseInt(clockHourInfo.hour);
                var hour2 = (clockHourInfo.hour - hour1).toFixed(1);
                if (hour2 < 0.5 && hour2 != 0.0) {
                    hour2 = 0.5;
                    this.Hour_5 = hour1 + hour2;
                } else if (hour2 == 0.0) {
                    this.Hour_5 = hour1;
                } else if (hour2 == 0.5) {
                    hour2 = 0.5;
                    this.Hour_5 = hour1 + hour2;
                } else {
                    this.Hour_5 = Math.round(clockHourInfo.hour);
                }
                this.dayHourInt_5 = Math.ceil(clockHourInfo.hour);
                var hour = parseFloat((parseFloat(clockHourInfo.hour) - parseFloat(clockHourInfo.useHour)).toString()).toFixed(1);
                var num2 = parseInt(hour);
                var num3 = (hour - num2).toFixed(1);
                if (num3 < 0.5 && num3 != 0.0) {
                    num3 = 0.5;
                    hour = num2 + num3;
                } else if (num3 == 0.0) {
                    hour = num2;
                } else if (num3 == 0.5) {
                    num3 = 0.5;
                    hour = num2 + num3;
                } else {
                    hour = Math.round(hour);
                }
                this.dayHourFloat_5 = parseFloat(hour);
                this.maxUseHour_5 = parseFloat(hour);
            });
        },
        selectWorkDay_6(val) {
            getClockHourInfo(val).then(response => {
                const clockHourInfo = response.data.data;
                this.tableData_6[0].day = clockHourInfo.day;
                this.tableData_6[0].integral = clockHourInfo.integral;
                this.tableData_6[0].hourId = clockHourInfo.hourId;
                var hour1 = parseInt(clockHourInfo.hour);
                var hour2 = (clockHourInfo.hour - hour1).toFixed(1);
                if (hour2 < 0.5 && hour2 != 0.0) {
                    hour2 = 0.5;
                    this.Hour_6 = hour1 + hour2;
                } else if (hour2 == 0.0) {
                    this.Hour_6 = hour1;
                } else if (hour2 == 0.5) {
                    hour2 = 0.5;
                    this.Hour_6 = hour1 + hour2;
                } else {
                    this.Hour_6 = Math.round(clockHourInfo.hour);
                }
                this.dayHourInt_6 = Math.ceil(clockHourInfo.hour);
                var hour = parseFloat((parseFloat(clockHourInfo.hour) - parseFloat(clockHourInfo.useHour)).toString()).toFixed(1);
                var num2 = parseInt(hour);
                var num3 = (hour - num2).toFixed(1);
                if (num3 < 0.5 && num3 != 0.0) {
                    num3 = 0.5;
                    hour = num2 + num3;
                } else if (num3 == 0.0) {
                    hour = num2;
                } else if (num3 == 0.5) {
                    num3 = 0.5;
                    hour = num2 + num3;
                } else {
                    hour = Math.round(hour);
                }
                this.dayHourFloat_6 = parseFloat(hour);
                this.maxUseHour_6 = parseFloat(hour);
            });
        },

        //  获取主分类
        selectcCategory(val, index) {
            console.log(val, index);
            // 清空数据
            this.tableData_1[index].mainClassify = '';
            this.tableData_1[index].subClassify = '';
            // 获取主分类
            if (index == 0) {
                selectCategory(val, this.userId).then(res => {
                    this.mainClassifyOptions1 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.mainClassifyOptions1.push({
                            value: item.id,
                            label: item.name,
                            children: item.children
                        });
                    });
                });
            }
            if (index == 1) {
                selectCategory(val, this.userId).then(res => {
                    this.mainClassifyOptions2 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.mainClassifyOptions2.push({
                            value: item.id,
                            label: item.name,
                            children: item.children
                        });
                    });
                });
            }
            if (index == 2) {
                selectCategory(val, this.userId).then(res => {
                    this.mainClassifyOptions3 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.mainClassifyOptions3.push({
                            value: item.id,
                            label: item.name,
                            children: item.children
                        });
                    });
                });
            }
            if (index == 3) {
                selectCategory(val, this.userId).then(res => {
                    this.mainClassifyOptions4 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.mainClassifyOptions4.push({
                            value: item.id,
                            label: item.name,
                            children: item.children
                        });
                    });
                });
            }
            if (index == 4) {
                selectCategory(val, this.userId).then(res => {
                    this.mainClassifyOptions5 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.mainClassifyOptions5.push({
                            value: item.id,
                            label: item.name,
                            children: item.children
                        });
                    });
                });
            }
            if (index == 5) {
                selectCategory(val, this.userId).then(res => {
                    this.mainClassifyOptions6 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.mainClassifyOptions6.push({
                            value: item.id,
                            label: item.name,
                            children: item.children
                        });
                    });
                });
            }
            if (index == 6) {
                selectCategory(val, this.userId).then(res => {
                    this.mainClassifyOptions7 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.mainClassifyOptions7.push({
                            value: item.id,
                            label: item.name,
                            children: item.children
                        });
                    });
                });
            }
            if (index == 7) {
                selectCategory(val, this.userId).then(res => {
                    this.mainClassifyOptions8 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.mainClassifyOptions8.push({
                            value: item.id,
                            label: item.name,
                            children: item.children
                        });
                    });
                });
            }
            if (index == 8) {
                selectCategory(val, this.userId).then(res => {
                    this.mainClassifyOptions9 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.mainClassifyOptions9.push({
                            value: item.id,
                            label: item.name,
                            children: item.children
                        });
                    });
                });
            }
            if (index == 9) {
                selectCategory(val, this.userId).then(res => {
                    this.mainClassifyOptions10 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.mainClassifyOptions10.push({
                            value: item.id,
                            label: item.name,
                            children: item.children
                        });
                    });
                });
            }
        },
        //  获取主分类
        selectcCategory2(val, index) {
            console.log(val, index);
            // 清空数据
            this.tableData_2[index].mainClassify = '';
            this.tableData_2[index].subClassify = '';
            // 获取主分类
            if (index == 0) {
                selectCategory(val, this.userId).then(res => {
                    this.mainClassifyOptions1 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.mainClassifyOptions1.push({
                            value: item.id,
                            label: item.name,
                            children: item.children
                        });
                    });
                });
            }
            if (index == 1) {
                selectCategory(val, this.userId).then(res => {
                    this.mainClassifyOptions2 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.mainClassifyOptions2.push({
                            value: item.id,
                            label: item.name,
                            children: item.children
                        });
                    });
                });
            }
            if (index == 2) {
                selectCategory(val, this.userId).then(res => {
                    this.mainClassifyOptions3 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.mainClassifyOptions3.push({
                            value: item.id,
                            label: item.name,
                            children: item.children
                        });
                    });
                });
            }
            if (index == 3) {
                selectCategory(val, this.userId).then(res => {
                    this.mainClassifyOptions4 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.mainClassifyOptions4.push({
                            value: item.id,
                            label: item.name,
                            children: item.children
                        });
                    });
                });
            }
            if (index == 4) {
                selectCategory(val, this.userId).then(res => {
                    this.mainClassifyOptions5 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.mainClassifyOptions5.push({
                            value: item.id,
                            label: item.name,
                            children: item.children
                        });
                    });
                });
            }
        },
        //  获取主分类
        selectcCategory3(val, index) {
            console.log(val, index);
            // 清空数据
            this.tableData_3[index].mainClassify = '';
            this.tableData_3[index].subClassify = '';
            // 获取主分类
            if (index == 0) {
                selectCategory(val, this.userId).then(res => {
                    this.mainClassifyOptions1 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.mainClassifyOptions1.push({
                            value: item.id,
                            label: item.name,
                            children: item.children
                        });
                    });
                });
            }
            if (index == 1) {
                selectCategory(val, this.userId).then(res => {
                    this.mainClassifyOptions2 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.mainClassifyOptions2.push({
                            value: item.id,
                            label: item.name,
                            children: item.children
                        });
                    });
                });
            }
            if (index == 2) {
                selectCategory(val, this.userId).then(res => {
                    this.mainClassifyOptions3 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.mainClassifyOptions3.push({
                            value: item.id,
                            label: item.name,
                            children: item.children
                        });
                    });
                });
            }
            if (index == 3) {
                selectCategory(val, this.userId).then(res => {
                    this.mainClassifyOptions4 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.mainClassifyOptions4.push({
                            value: item.id,
                            label: item.name,
                            children: item.children
                        });
                    });
                });
            }
            if (index == 4) {
                selectCategory(val, this.userId).then(res => {
                    this.mainClassifyOptions5 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.mainClassifyOptions5.push({
                            value: item.id,
                            label: item.name,
                            children: item.children
                        });
                    });
                });
            }
        },
        //  获取主分类
        selectcCategory4(val, index) {
            console.log(val, index);
            // 清空数据
            this.tableData_4[index].mainClassify = '';
            this.tableData_4[index].subClassify = '';
            // 获取主分类
            if (index == 0) {
                selectCategory(val, this.userId).then(res => {
                    this.mainClassifyOptions1 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.mainClassifyOptions1.push({
                            value: item.id,
                            label: item.name,
                            children: item.children
                        });
                    });
                });
            }
            if (index == 1) {
                selectCategory(val, this.userId).then(res => {
                    this.mainClassifyOptions2 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.mainClassifyOptions2.push({
                            value: item.id,
                            label: item.name,
                            children: item.children
                        });
                    });
                });
            }
            if (index == 2) {
                selectCategory(val, this.userId).then(res => {
                    this.mainClassifyOptions3 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.mainClassifyOptions3.push({
                            value: item.id,
                            label: item.name,
                            children: item.children
                        });
                    });
                });
            }
            if (index == 3) {
                selectCategory(val, this.userId).then(res => {
                    this.mainClassifyOptions4 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.mainClassifyOptions4.push({
                            value: item.id,
                            label: item.name,
                            children: item.children
                        });
                    });
                });
            }
            if (index == 4) {
                selectCategory(val, this.userId).then(res => {
                    this.mainClassifyOptions5 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.mainClassifyOptions5.push({
                            value: item.id,
                            label: item.name,
                            children: item.children
                        });
                    });
                });
            }
        },
        //  获取主分类
        selectcCategory5(val, index) {
            console.log(val, index);
            // 清空数据
            this.tableData_5[index].mainClassify = '';
            this.tableData_5[index].subClassify = '';
            // 获取主分类
            if (index == 0) {
                selectCategory(val, this.userId).then(res => {
                    this.mainClassifyOptions1 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.mainClassifyOptions1.push({
                            value: item.id,
                            label: item.name,
                            children: item.children
                        });
                    });
                });
            }
            if (index == 1) {
                selectCategory(val, this.userId).then(res => {
                    this.mainClassifyOptions2 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.mainClassifyOptions2.push({
                            value: item.id,
                            label: item.name,
                            children: item.children
                        });
                    });
                });
            }
            if (index == 2) {
                selectCategory(val, this.userId).then(res => {
                    this.mainClassifyOptions3 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.mainClassifyOptions3.push({
                            value: item.id,
                            label: item.name,
                            children: item.children
                        });
                    });
                });
            }
            if (index == 3) {
                selectCategory(val, this.userId).then(res => {
                    this.mainClassifyOptions4 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.mainClassifyOptions4.push({
                            value: item.id,
                            label: item.name,
                            children: item.children
                        });
                    });
                });
            }
            if (index == 4) {
                selectCategory(val, this.userId).then(res => {
                    this.mainClassifyOptions5 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.mainClassifyOptions5.push({
                            value: item.id,
                            label: item.name,
                            children: item.children
                        });
                    });
                });
            }
        },
        //  获取主分类
        selectcCategory6(val, index) {
            console.log(val, index);
            // 清空数据
            this.tableData_6[index].mainClassify = '';
            this.tableData_6[index].subClassify = '';
            // 获取主分类
            if (index == 0) {
                selectCategory(val, this.userId).then(res => {
                    this.mainClassifyOptions1 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.mainClassifyOptions1.push({
                            value: item.id,
                            label: item.name,
                            children: item.children
                        });
                    });
                });
            }
            if (index == 1) {
                selectCategory(val, this.userId).then(res => {
                    this.mainClassifyOptions2 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.mainClassifyOptions2.push({
                            value: item.id,
                            label: item.name,
                            children: item.children
                        });
                    });
                });
            }
            if (index == 2) {
                selectCategory(val, this.userId).then(res => {
                    this.mainClassifyOptions3 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.mainClassifyOptions3.push({
                            value: item.id,
                            label: item.name,
                            children: item.children
                        });
                    });
                });
            }
            if (index == 3) {
                selectCategory(val, this.userId).then(res => {
                    this.mainClassifyOptions4 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.mainClassifyOptions4.push({
                            value: item.id,
                            label: item.name,
                            children: item.children
                        });
                    });
                });
            }
            if (index == 4) {
                selectCategory(val, this.userId).then(res => {
                    this.mainClassifyOptions5 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.mainClassifyOptions5.push({
                            value: item.id,
                            label: item.name,
                            children: item.children
                        });
                    });
                });
            }
        },

        //  工作子分类
        selectcMainClassify(val, index) {
            this.tableData_1[index].subClassify = '';
            this.tableData_1[index].itemId = null;
            this.tableData_1[index].itemNextId = null;

            // 获取子类
            if (index == 0) {
                selectCategory(val[0], this.userId).then(res => {
                    // 清空数据
                    this.subClassifyOptions_1 = [];
                    console.log(res);
                    res.data.data.ddRegions.forEach(item => {
                        this.subClassifyOptions_1.push({
                            value: item.id,
                            label: item.name
                        });
                    });
                });
            }
            if (index == 1) {
                selectCategory(val[0], this.userId).then(res => {
                    // 清空数据
                    this.subClassifyOptions_2 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.subClassifyOptions_2.push({
                            value: item.id,
                            label: item.name
                        });
                    });
                });
            }
            if (index == 2) {
                selectCategory(val[0], this.userId).then(res => {
                    // 清空数据
                    this.subClassifyOptions_3 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.subClassifyOptions_3.push({
                            value: item.id,
                            label: item.name
                        });
                    });
                });
            }
            if (index == 3) {
                selectCategory(val[0], this.userId).then(res => {
                    // 清空数据
                    this.subClassifyOptions_4 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.subClassifyOptions_4.push({
                            value: item.id,
                            label: item.name
                        });
                    });
                });
            }
            if (index == 4) {
                selectCategory(val[0], this.userId).then(res => {
                    // 清空数据
                    this.subClassifyOptions_5 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.subClassifyOptions_5.push({
                            value: item.id,
                            label: item.name
                        });
                    });
                });
            }
            if (index == 5) {
                selectCategory(val[0], this.userId).then(res => {
                    // 清空数据
                    this.subClassifyOptions_6 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.subClassifyOptions_6.push({
                            value: item.id,
                            label: item.name
                        });
                    });
                });
            }
            if (index == 6) {
                selectCategory(val[0], this.userId).then(res => {
                    // 清空数据
                    this.subClassifyOptions_7 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.subClassifyOptions_7.push({
                            value: item.id,
                            label: item.name
                        });
                    });
                });
            }
            if (index == 7) {
                selectCategory(val[0], this.userId).then(res => {
                    // 清空数据
                    this.subClassifyOptions_8 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.subClassifyOptions_8.push({
                            value: item.id,
                            label: item.name
                        });
                    });
                });
            }
            if (index == 8) {
                selectCategory(val[0], this.userId).then(res => {
                    // 清空数据
                    this.subClassifyOptions_9 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.subClassifyOptions_9.push({
                            value: item.id,
                            label: item.name
                        });
                    });
                });
            }
            if (index == 9) {
                selectCategory(val[0], this.userId).then(res => {
                    // 清空数据
                    this.subClassifyOptions_10 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.subClassifyOptions_10.push({
                            value: item.id,
                            label: item.name
                        });
                    });
                });
            }

            // 判断长度 获取项目id
            if (val.length > 1 && val.length < 3) {
                this.tableData_1[index].itemId = val[1];
                this.query.itemId = val[1];
                console.log(this.query);
            } else if (val.length == 3) {
                this.tableData_1[index].itemId = val[2];
                this.tableData_1[index].itemNextId = val[1];
                this.query.itemId = val[2];
                console.log(this.query);
            } else {
                this.tableData_1[index].itemId = null;
                this.tableData_1[index].itemNextId = null;
            }
            // 获取验收人
            if (val.length > 1 && index == 0) {
                getApplyUserInfo(this.query).then(res => {
                    this.applyUserList = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList = this.applyUserList.filter(item => item.value != this.query.userId);
                    // 去重
                    var newArr = [];
                    var obj = {};
                    for (var i = 0; i < this.applyUserList.length; i++) {
                        if (!obj[this.applyUserList[i].value]) {
                            newArr.push(this.applyUserList[i]);
                            obj[this.applyUserList[i].value] = true;
                        }
                    }
                    this.applyUserList = newArr;
                });
            } else if (val.length == 1 && index == 0) {
                getDeptUserList(this.userList.deptId).then(res => {
                    this.applyUserList = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList = this.applyUserList.filter(item => item.value != this.query.userId);
                });
            }
            if (val.length > 1 && index == 1) {
                getApplyUserInfo(this.query).then(res => {
                    this.applyUserList1 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList1.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList1 = this.applyUserList1.filter(item => item.value != this.query.userId);
                    // 去重
                    var newArr1 = [];
                    var obj1 = {};
                    for (var i = 0; i < this.applyUserList1.length; i++) {
                        if (!obj1[this.applyUserList1[i].value]) {
                            newArr1.push(this.applyUserList1[i]);
                            obj1[this.applyUserList1[i].value] = true;
                        }
                    }
                    this.applyUserList1 = newArr1;
                });
            } else if (val.length == 1 && index == 1) {
                getDeptUserList(this.userList.deptId).then(res => {
                    this.applyUserList1 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList1.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList1 = this.applyUserList1.filter(item => item.value != this.query.userId);
                });
            }
            if (val.length > 1 && index == 2) {
                getApplyUserInfo(this.query).then(res => {
                    this.applyUserList2 = [{ value: 0, label: '无人验收' }];
                    console.log(res);
                    res.data.data.forEach(element => {
                        this.applyUserList2.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList2 = this.applyUserList2.filter(item => item.value != this.query.userId);
                    // 去重
                    var newArr2 = [];
                    var obj2 = {};
                    for (var i = 0; i < this.applyUserList2.length; i++) {
                        if (!obj2[this.applyUserList2[i].value]) {
                            newArr2.push(this.applyUserList2[i]);
                            obj2[this.applyUserList2[i].value] = true;
                        }
                    }
                    this.applyUserList2 = newArr2;
                });
            } else if (val.length == 1 && index == 2) {
                getDeptUserList(this.userList.deptId).then(res => {
                    this.applyUserList2 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList2.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList2 = this.applyUserList2.filter(item => item.value != this.query.userId);
                });
            }
            if (val.length > 1 && index == 3) {
                getApplyUserInfo(this.query).then(res => {
                    this.applyUserList3 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList3.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList3 = this.applyUserList3.filter(item => item.value != this.query.userId);
                    // 去重
                    var newArr3 = [];
                    var obj3 = {};
                    for (var i = 0; i < this.applyUserList3.length; i++) {
                        if (!obj3[this.applyUserList3[i].value]) {
                            newArr3.push(this.applyUserList3[i]);
                            obj3[this.applyUserList3[i].value] = true;
                        }
                    }
                    this.applyUserList3 = newArr3;
                });
            } else if (val.length == 1 && index == 3) {
                getDeptUserList(this.userList.deptId).then(res => {
                    this.applyUserList3 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList3.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList3 = this.applyUserList3.filter(item => item.value != this.query.userId);
                });
            }
            if (val.length > 1 && index == 4) {
                getApplyUserInfo(this.query).then(res => {
                    this.applyUserList4 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList4.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList4 = this.applyUserList4.filter(item => item.value != this.query.userId);
                    // 去重
                    var newArr4 = [];
                    var obj4 = {};
                    for (var i = 0; i < this.applyUserList4.length; i++) {
                        if (!obj4[this.applyUserList4[i].value]) {
                            newArr4.push(this.applyUserList4[i]);
                            obj4[this.applyUserList4[i].value] = true;
                        }
                    }
                    this.applyUserList4 = newArr4;
                });
            } else if (val.length == 1 && index == 4) {
                getDeptUserList(this.userList.deptId).then(res => {
                    this.applyUserList4 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList4.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList4 = this.applyUserList4.filter(item => item.value != this.query.userId);
                });
            }
            if (val.length > 1 && index == 5) {
                getApplyUserInfo(this.query).then(res => {
                    this.applyUserList5 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList5.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList5 = this.applyUserList5.filter(item => item.value != this.query.userId);
                    // 去重
                    var newArr5 = [];
                    var obj5 = {};
                    for (var i = 0; i < this.applyUserList5.length; i++) {
                        if (!obj5[this.applyUserList5[i].value]) {
                            newArr5.push(this.applyUserList5[i]);
                            obj5[this.applyUserList5[i].value] = true;
                        }
                    }
                    this.applyUserList5 = newArr5;
                });
            } else if (val.length == 1 && index == 5) {
                getDeptUserList(this.userList.deptId).then(res => {
                    this.applyUserList5 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList5.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList5 = this.applyUserList5.filter(item => item.value != this.query.userId);
                });
            }
            if (val.length > 1 && index == 6) {
                getApplyUserInfo(this.query).then(res => {
                    this.applyUserList6 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList6.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList6 = this.applyUserList6.filter(item => item.value != this.query.userId);
                    // 去重
                    var newArr6 = [];
                    var obj6 = {};
                    for (var i = 0; i < this.applyUserList6.length; i++) {
                        if (!obj6[this.applyUserList6[i].value]) {
                            newArr6.push(this.applyUserList6[i]);
                            obj6[this.applyUserList6[i].value] = true;
                        }
                    }
                    this.applyUserList6 = newArr6;
                });
            } else if (val.length == 1 && index == 6) {
                getDeptUserList(this.userList.deptId).then(res => {
                    this.applyUserList6 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList6.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList6 = this.applyUserList6.filter(item => item.value != this.query.userId);
                });
            }
            if (val.length > 1 && index == 7) {
                getApplyUserInfo(this.query).then(res => {
                    this.applyUserList7 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList7.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList7 = this.applyUserList7.filter(item => item.value != this.query.userId);
                    // 去重
                    var newArr7 = [];
                    var obj7 = {};
                    for (var i = 0; i < this.applyUserList7.length; i++) {
                        if (!obj7[this.applyUserList7[i].value]) {
                            newArr7.push(this.applyUserList7[i]);
                            obj7[this.applyUserList7[i].value] = true;
                        }
                    }
                    this.applyUserList7 = newArr7;
                });
            } else if (val.length == 1 && index == 7) {
                getDeptUserList(this.userList.deptId).then(res => {
                    this.applyUserList7 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList7.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList7 = this.applyUserList7.filter(item => item.value != this.query.userId);
                });
            }
            if (val.length > 1 && index == 8) {
                getApplyUserInfo(this.query).then(res => {
                    this.applyUserList8 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList8.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList8 = this.applyUserList8.filter(item => item.value != this.query.userId);
                    // 去重
                    var newArr8 = [];
                    var obj8 = {};
                    for (var i = 0; i < this.applyUserList8.length; i++) {
                        if (!obj8[this.applyUserList8[i].value]) {
                            newArr8.push(this.applyUserList8[i]);
                            obj8[this.applyUserList8[i].value] = true;
                        }
                    }
                    this.applyUserList8 = newArr8;
                });
            } else if (val.length == 1 && index == 8) {
                getDeptUserList(this.userList.deptId).then(res => {
                    this.applyUserList8 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList8.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList8 = this.applyUserList8.filter(item => item.value != this.query.userId);
                });
            }
            if (val.length > 1 && index == 9) {
                getApplyUserInfo(this.query).then(res => {
                    this.applyUserList9 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList9.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList9 = this.applyUserList9.filter(item => item.value != this.query.userId);
                    // 去重
                    var newArr9 = [];
                    var obj9 = {};
                    for (var i = 0; i < this.applyUserList9.length; i++) {
                        if (!obj9[this.applyUserList9[i].value]) {
                            newArr9.push(this.applyUserList9[i]);
                            obj9[this.applyUserList9[i].value] = true;
                        }
                    }
                    this.applyUserList9 = newArr9;
                });
            } else if (val.length == 1 && index == 9) {
                getDeptUserList(this.userList.deptId).then(res => {
                    this.applyUserList9 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList9.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList9 = this.applyUserList9.filter(item => item.value != this.query.userId);
                });
            }
        },
        //  工作子分类
        selectcMainClassify2(val, index) {
            this.tableData_2[index].subClassify = '';
            this.tableData_2[index].itemId = null;
            this.tableData_2[index].itemNextId = null;

            // 获取子类
            if (index == 0) {
                selectCategory(val[0], this.userId).then(res => {
                    // 清空数据
                    this.subClassifyOptions_1 = [];
                    console.log(res);
                    res.data.data.ddRegions.forEach(item => {
                        this.subClassifyOptions_1.push({
                            value: item.id,
                            label: item.name
                        });
                    });
                });
            }
            if (index == 1) {
                selectCategory(val[0], this.userId).then(res => {
                    // 清空数据
                    this.subClassifyOptions_2 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.subClassifyOptions_2.push({
                            value: item.id,
                            label: item.name
                        });
                    });
                });
            }
            if (index == 2) {
                selectCategory(val[0], this.userId).then(res => {
                    // 清空数据
                    this.subClassifyOptions_3 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.subClassifyOptions_3.push({
                            value: item.id,
                            label: item.name
                        });
                    });
                });
            }
            if (index == 3) {
                selectCategory(val[0], this.userId).then(res => {
                    // 清空数据
                    this.subClassifyOptions_4 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.subClassifyOptions_4.push({
                            value: item.id,
                            label: item.name
                        });
                    });
                });
            }
            if (index == 4) {
                selectCategory(val[0], this.userId).then(res => {
                    // 清空数据
                    this.subClassifyOptions_5 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.subClassifyOptions_5.push({
                            value: item.id,
                            label: item.name
                        });
                    });
                });
            }

            // 判断长度 获取项目id
            if (val.length > 1 && val.length < 3) {
                this.tableData_2[index].itemId = val[1];
                this.query.itemId = val[1];
                console.log(this.query);
            } else if (val.length == 3) {
                this.tableData_2[index].itemId = val[2];
                this.tableData_2[index].itemNextId = val[1];
                this.query.itemId = val[2];
                console.log(this.query);
            } else {
                this.tableData_2[index].itemId = null;
                this.tableData_2[index].itemNextId = null;
            }
            // 获取验收人
            if (val.length > 1 && index == 0) {
                getApplyUserInfo(this.query).then(res => {
                    this.applyUserList = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList = this.applyUserList.filter(item => item.value != this.query.userId);
                    // 去重
                    var newArr = [];
                    var obj = {};
                    for (var i = 0; i < this.applyUserList.length; i++) {
                        if (!obj[this.applyUserList[i].value]) {
                            newArr.push(this.applyUserList[i]);
                            obj[this.applyUserList[i].value] = true;
                        }
                    }
                    this.applyUserList = newArr;
                });
            } else if (val.length == 1 && index == 0) {
                getDeptUserList(this.userList.deptId).then(res => {
                    this.applyUserList = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList = this.applyUserList.filter(item => item.value != this.query.userId);
                });
            }
            if (val.length > 1 && index == 1) {
                getApplyUserInfo(this.query).then(res => {
                    this.applyUserList1 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList1.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList1 = this.applyUserList1.filter(item => item.value != this.query.userId);
                    // 去重
                    var newArr1 = [];
                    var obj1 = {};
                    for (var i = 0; i < this.applyUserList1.length; i++) {
                        if (!obj1[this.applyUserList1[i].value]) {
                            newArr1.push(this.applyUserList1[i]);
                            obj1[this.applyUserList1[i].value] = true;
                        }
                    }
                    this.applyUserList1 = newArr1;
                });
            } else if (val.length == 1 && index == 1) {
                getDeptUserList(this.userList.deptId).then(res => {
                    this.applyUserList1 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList1.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList1 = this.applyUserList1.filter(item => item.value != this.query.userId);
                });
            }
            if (val.length > 1 && index == 2) {
                getApplyUserInfo(this.query).then(res => {
                    this.applyUserList2 = [{ value: 0, label: '无人验收' }];
                    console.log(res);
                    res.data.data.forEach(element => {
                        this.applyUserList2.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList2 = this.applyUserList2.filter(item => item.value != this.query.userId);
                    // 去重
                    var newArr2 = [];
                    var obj2 = {};
                    for (var i = 0; i < this.applyUserList2.length; i++) {
                        if (!obj2[this.applyUserList2[i].value]) {
                            newArr2.push(this.applyUserList2[i]);
                            obj2[this.applyUserList2[i].value] = true;
                        }
                    }
                    this.applyUserList2 = newArr2;
                });
            } else if (val.length == 1 && index == 2) {
                getDeptUserList(this.userList.deptId).then(res => {
                    this.applyUserList2 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList2.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList2 = this.applyUserList2.filter(item => item.value != this.query.userId);
                });
            }
            if (val.length > 1 && index == 3) {
                getApplyUserInfo(this.query).then(res => {
                    this.applyUserList3 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList3.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList3 = this.applyUserList3.filter(item => item.value != this.query.userId);
                    // 去重
                    var newArr3 = [];
                    var obj3 = {};
                    for (var i = 0; i < this.applyUserList3.length; i++) {
                        if (!obj3[this.applyUserList3[i].value]) {
                            newArr3.push(this.applyUserList3[i]);
                            obj3[this.applyUserList3[i].value] = true;
                        }
                    }
                    this.applyUserList3 = newArr3;
                });
            } else if (val.length == 1 && index == 3) {
                getDeptUserList(this.userList.deptId).then(res => {
                    this.applyUserList3 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList3.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList3 = this.applyUserList3.filter(item => item.value != this.query.userId);
                });
            }
            if (val.length > 1 && index == 4) {
                getApplyUserInfo(this.query).then(res => {
                    this.applyUserList4 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList4.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList4 = this.applyUserList4.filter(item => item.value != this.query.userId);
                    // 去重
                    var newArr4 = [];
                    var obj4 = {};
                    for (var i = 0; i < this.applyUserList4.length; i++) {
                        if (!obj4[this.applyUserList4[i].value]) {
                            newArr4.push(this.applyUserList4[i]);
                            obj4[this.applyUserList4[i].value] = true;
                        }
                    }
                    this.applyUserList4 = newArr4;
                });
            } else if (val.length == 1 && index == 4) {
                getDeptUserList(this.userList.deptId).then(res => {
                    this.applyUserList4 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList4.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList4 = this.applyUserList4.filter(item => item.value != this.query.userId);
                });
            }
        },
        //  工作子分类
        selectcMainClassify3(val, index) {
            this.tableData_3[index].subClassify = '';
            this.tableData_3[index].itemId = null;
            this.tableData_3[index].itemNextId = null;

            // 获取子类
            if (index == 0) {
                selectCategory(val[0], this.userId).then(res => {
                    // 清空数据
                    this.subClassifyOptions_1 = [];
                    console.log(res);
                    res.data.data.ddRegions.forEach(item => {
                        this.subClassifyOptions_1.push({
                            value: item.id,
                            label: item.name
                        });
                    });
                });
            }
            if (index == 1) {
                selectCategory(val[0], this.userId).then(res => {
                    // 清空数据
                    this.subClassifyOptions_2 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.subClassifyOptions_2.push({
                            value: item.id,
                            label: item.name
                        });
                    });
                });
            }
            if (index == 2) {
                selectCategory(val[0], this.userId).then(res => {
                    // 清空数据
                    this.subClassifyOptions_3 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.subClassifyOptions_3.push({
                            value: item.id,
                            label: item.name
                        });
                    });
                });
            }
            if (index == 3) {
                selectCategory(val[0], this.userId).then(res => {
                    // 清空数据
                    this.subClassifyOptions_4 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.subClassifyOptions_4.push({
                            value: item.id,
                            label: item.name
                        });
                    });
                });
            }
            if (index == 4) {
                selectCategory(val[0], this.userId).then(res => {
                    // 清空数据
                    this.subClassifyOptions_5 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.subClassifyOptions_5.push({
                            value: item.id,
                            label: item.name
                        });
                    });
                });
            }

            // 判断长度 获取项目id
            if (val.length > 1 && val.length < 3) {
                this.tableData_3[index].itemId = val[1];
                this.query.itemId = val[1];
                console.log(this.query);
            } else if (val.length == 3) {
                this.tableData_3[index].itemId = val[2];
                this.tableData_3[index].itemNextId = val[1];
                this.query.itemId = val[2];
                console.log(this.query);
            } else {
                this.tableData_3[index].itemId = null;
                this.tableData_3[index].itemNextId = null;
            }
            // 获取验收人
            if (val.length > 1 && index == 0) {
                getApplyUserInfo(this.query).then(res => {
                    this.applyUserList = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList = this.applyUserList.filter(item => item.value != this.query.userId);
                    // 去重
                    var newArr = [];
                    var obj = {};
                    for (var i = 0; i < this.applyUserList.length; i++) {
                        if (!obj[this.applyUserList[i].value]) {
                            newArr.push(this.applyUserList[i]);
                            obj[this.applyUserList[i].value] = true;
                        }
                    }
                    this.applyUserList = newArr;
                });
            } else if (val.length == 1 && index == 0) {
                getDeptUserList(this.userList.deptId).then(res => {
                    this.applyUserList = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList = this.applyUserList.filter(item => item.value != this.query.userId);
                });
            }
            if (val.length > 1 && index == 1) {
                getApplyUserInfo(this.query).then(res => {
                    this.applyUserList1 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList1.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList1 = this.applyUserList1.filter(item => item.value != this.query.userId);
                    // 去重
                    var newArr1 = [];
                    var obj1 = {};
                    for (var i = 0; i < this.applyUserList1.length; i++) {
                        if (!obj1[this.applyUserList1[i].value]) {
                            newArr1.push(this.applyUserList1[i]);
                            obj1[this.applyUserList1[i].value] = true;
                        }
                    }
                    this.applyUserList1 = newArr1;
                });
            } else if (val.length == 1 && index == 1) {
                getDeptUserList(this.userList.deptId).then(res => {
                    this.applyUserList1 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList1.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList1 = this.applyUserList1.filter(item => item.value != this.query.userId);
                });
            }
            if (val.length > 1 && index == 2) {
                getApplyUserInfo(this.query).then(res => {
                    this.applyUserList2 = [{ value: 0, label: '无人验收' }];
                    console.log(res);
                    res.data.data.forEach(element => {
                        this.applyUserList2.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList2 = this.applyUserList2.filter(item => item.value != this.query.userId);
                    // 去重
                    var newArr2 = [];
                    var obj2 = {};
                    for (var i = 0; i < this.applyUserList2.length; i++) {
                        if (!obj2[this.applyUserList2[i].value]) {
                            newArr2.push(this.applyUserList2[i]);
                            obj2[this.applyUserList2[i].value] = true;
                        }
                    }
                    this.applyUserList2 = newArr2;
                });
            } else if (val.length == 1 && index == 2) {
                getDeptUserList(this.userList.deptId).then(res => {
                    this.applyUserList2 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList2.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList2 = this.applyUserList2.filter(item => item.value != this.query.userId);
                });
            }
            if (val.length > 1 && index == 3) {
                getApplyUserInfo(this.query).then(res => {
                    this.applyUserList3 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList3.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList3 = this.applyUserList3.filter(item => item.value != this.query.userId);
                    // 去重
                    var newArr3 = [];
                    var obj3 = {};
                    for (var i = 0; i < this.applyUserList3.length; i++) {
                        if (!obj3[this.applyUserList3[i].value]) {
                            newArr3.push(this.applyUserList3[i]);
                            obj3[this.applyUserList3[i].value] = true;
                        }
                    }
                    this.applyUserList3 = newArr3;
                });
            } else if (val.length == 1 && index == 3) {
                getDeptUserList(this.userList.deptId).then(res => {
                    this.applyUserList3 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList3.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList3 = this.applyUserList3.filter(item => item.value != this.query.userId);
                });
            }
            if (val.length > 1 && index == 4) {
                getApplyUserInfo(this.query).then(res => {
                    this.applyUserList4 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList4.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList4 = this.applyUserList4.filter(item => item.value != this.query.userId);
                    // 去重
                    var newArr4 = [];
                    var obj4 = {};
                    for (var i = 0; i < this.applyUserList4.length; i++) {
                        if (!obj4[this.applyUserList4[i].value]) {
                            newArr4.push(this.applyUserList4[i]);
                            obj4[this.applyUserList4[i].value] = true;
                        }
                    }
                    this.applyUserList4 = newArr4;
                });
            } else if (val.length == 1 && index == 4) {
                getDeptUserList(this.userList.deptId).then(res => {
                    this.applyUserList4 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList4.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList4 = this.applyUserList4.filter(item => item.value != this.query.userId);
                });
            }
        },
        //  工作子分类
        selectcMainClassify4(val, index) {
            this.tableData_4[index].subClassify = '';
            this.tableData_4[index].itemId = null;
            this.tableData_4[index].itemNextId = null;

            // 获取子类
            if (index == 0) {
                selectCategory(val[0], this.userId).then(res => {
                    // 清空数据
                    this.subClassifyOptions_1 = [];
                    console.log(res);
                    res.data.data.ddRegions.forEach(item => {
                        this.subClassifyOptions_1.push({
                            value: item.id,
                            label: item.name
                        });
                    });
                });
            }
            if (index == 1) {
                selectCategory(val[0], this.userId).then(res => {
                    // 清空数据
                    this.subClassifyOptions_2 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.subClassifyOptions_2.push({
                            value: item.id,
                            label: item.name
                        });
                    });
                });
            }
            if (index == 2) {
                selectCategory(val[0], this.userId).then(res => {
                    // 清空数据
                    this.subClassifyOptions_3 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.subClassifyOptions_3.push({
                            value: item.id,
                            label: item.name
                        });
                    });
                });
            }
            if (index == 3) {
                selectCategory(val[0], this.userId).then(res => {
                    // 清空数据
                    this.subClassifyOptions_4 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.subClassifyOptions_4.push({
                            value: item.id,
                            label: item.name
                        });
                    });
                });
            }
            if (index == 4) {
                selectCategory(val[0], this.userId).then(res => {
                    // 清空数据
                    this.subClassifyOptions_5 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.subClassifyOptions_5.push({
                            value: item.id,
                            label: item.name
                        });
                    });
                });
            }

            // 判断长度 获取项目id
            if (val.length > 1 && val.length < 3) {
                this.tableData_4[index].itemId = val[1];
                this.query.itemId = val[1];
                console.log(this.query);
            } else if (val.length == 3) {
                this.tableData_4[index].itemId = val[2];
                this.tableData_4[index].itemNextId = val[1];
                this.query.itemId = val[2];
                console.log(this.query);
            } else {
                this.tableData_4[index].itemId = null;
                this.tableData_4[index].itemNextId = null;
            }
            // 获取验收人
            if (val.length > 1 && index == 0) {
                getApplyUserInfo(this.query).then(res => {
                    this.applyUserList = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList = this.applyUserList.filter(item => item.value != this.query.userId);
                    // 去重
                    var newArr = [];
                    var obj = {};
                    for (var i = 0; i < this.applyUserList.length; i++) {
                        if (!obj[this.applyUserList[i].value]) {
                            newArr.push(this.applyUserList[i]);
                            obj[this.applyUserList[i].value] = true;
                        }
                    }
                    this.applyUserList = newArr;
                });
            } else if (val.length == 1 && index == 0) {
                getDeptUserList(this.userList.deptId).then(res => {
                    this.applyUserList = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList = this.applyUserList.filter(item => item.value != this.query.userId);
                });
            }
            if (val.length > 1 && index == 1) {
                getApplyUserInfo(this.query).then(res => {
                    this.applyUserList1 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList1.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList1 = this.applyUserList1.filter(item => item.value != this.query.userId);
                    // 去重
                    var newArr1 = [];
                    var obj1 = {};
                    for (var i = 0; i < this.applyUserList1.length; i++) {
                        if (!obj1[this.applyUserList1[i].value]) {
                            newArr1.push(this.applyUserList1[i]);
                            obj1[this.applyUserList1[i].value] = true;
                        }
                    }
                    this.applyUserList1 = newArr1;
                });
            } else if (val.length == 1 && index == 1) {
                getDeptUserList(this.userList.deptId).then(res => {
                    this.applyUserList1 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList1.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList1 = this.applyUserList1.filter(item => item.value != this.query.userId);
                });
            }
            if (val.length > 1 && index == 2) {
                getApplyUserInfo(this.query).then(res => {
                    this.applyUserList2 = [{ value: 0, label: '无人验收' }];
                    console.log(res);
                    res.data.data.forEach(element => {
                        this.applyUserList2.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList2 = this.applyUserList2.filter(item => item.value != this.query.userId);
                    // 去重
                    var newArr2 = [];
                    var obj2 = {};
                    for (var i = 0; i < this.applyUserList2.length; i++) {
                        if (!obj2[this.applyUserList2[i].value]) {
                            newArr2.push(this.applyUserList2[i]);
                            obj2[this.applyUserList2[i].value] = true;
                        }
                    }
                    this.applyUserList2 = newArr2;
                });
            } else if (val.length == 1 && index == 2) {
                getDeptUserList(this.userList.deptId).then(res => {
                    this.applyUserList2 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList2.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList2 = this.applyUserList2.filter(item => item.value != this.query.userId);
                });
            }
            if (val.length > 1 && index == 3) {
                getApplyUserInfo(this.query).then(res => {
                    this.applyUserList3 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList3.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList3 = this.applyUserList3.filter(item => item.value != this.query.userId);
                    // 去重
                    var newArr3 = [];
                    var obj3 = {};
                    for (var i = 0; i < this.applyUserList3.length; i++) {
                        if (!obj3[this.applyUserList3[i].value]) {
                            newArr3.push(this.applyUserList3[i]);
                            obj3[this.applyUserList3[i].value] = true;
                        }
                    }
                    this.applyUserList3 = newArr3;
                });
            } else if (val.length == 1 && index == 3) {
                getDeptUserList(this.userList.deptId).then(res => {
                    this.applyUserList3 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList3.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList3 = this.applyUserList3.filter(item => item.value != this.query.userId);
                });
            }
            if (val.length > 1 && index == 4) {
                getApplyUserInfo(this.query).then(res => {
                    this.applyUserList4 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList4.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList4 = this.applyUserList4.filter(item => item.value != this.query.userId);
                    // 去重
                    var newArr4 = [];
                    var obj4 = {};
                    for (var i = 0; i < this.applyUserList4.length; i++) {
                        if (!obj4[this.applyUserList4[i].value]) {
                            newArr4.push(this.applyUserList4[i]);
                            obj4[this.applyUserList4[i].value] = true;
                        }
                    }
                    this.applyUserList4 = newArr4;
                });
            } else if (val.length == 1 && index == 4) {
                getDeptUserList(this.userList.deptId).then(res => {
                    this.applyUserList4 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList4.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList4 = this.applyUserList4.filter(item => item.value != this.query.userId);
                });
            }
        },
        //  工作子分类
        selectcMainClassify5(val, index) {
            this.tableData_5[index].subClassify = '';
            this.tableData_5[index].itemId = null;
            this.tableData_5[index].itemNextId = null;

            // 获取子类
            if (index == 0) {
                selectCategory(val[0], this.userId).then(res => {
                    // 清空数据
                    this.subClassifyOptions_1 = [];
                    console.log(res);
                    res.data.data.ddRegions.forEach(item => {
                        this.subClassifyOptions_1.push({
                            value: item.id,
                            label: item.name
                        });
                    });
                });
            }
            if (index == 1) {
                selectCategory(val[0], this.userId).then(res => {
                    // 清空数据
                    this.subClassifyOptions_2 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.subClassifyOptions_2.push({
                            value: item.id,
                            label: item.name
                        });
                    });
                });
            }
            if (index == 2) {
                selectCategory(val[0], this.userId).then(res => {
                    // 清空数据
                    this.subClassifyOptions_3 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.subClassifyOptions_3.push({
                            value: item.id,
                            label: item.name
                        });
                    });
                });
            }
            if (index == 3) {
                selectCategory(val[0], this.userId).then(res => {
                    // 清空数据
                    this.subClassifyOptions_4 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.subClassifyOptions_4.push({
                            value: item.id,
                            label: item.name
                        });
                    });
                });
            }
            if (index == 4) {
                selectCategory(val[0], this.userId).then(res => {
                    // 清空数据
                    this.subClassifyOptions_5 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.subClassifyOptions_5.push({
                            value: item.id,
                            label: item.name
                        });
                    });
                });
            }

            // 判断长度 获取项目id
            if (val.length > 1 && val.length < 3) {
                this.tableData_5[index].itemId = val[1];
                this.query.itemId = val[1];
                console.log(this.query);
            } else if (val.length == 3) {
                this.tableData_5[index].itemId = val[2];
                this.tableData_5[index].itemNextId = val[1];
                this.query.itemId = val[2];
                console.log(this.query);
            } else {
                this.tableData_5[index].itemNextId = null;
                this.tableData_5[index].itemId = null;
            }
            // 获取验收人
            if (val.length > 1 && index == 0) {
                getApplyUserInfo(this.query).then(res => {
                    this.applyUserList = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList = this.applyUserList.filter(item => item.value != this.query.userId);
                    // 去重
                    var newArr = [];
                    var obj = {};
                    for (var i = 0; i < this.applyUserList.length; i++) {
                        if (!obj[this.applyUserList[i].value]) {
                            newArr.push(this.applyUserList[i]);
                            obj[this.applyUserList[i].value] = true;
                        }
                    }
                    this.applyUserList = newArr;
                });
            } else if (val.length == 1 && index == 0) {
                getDeptUserList(this.userList.deptId).then(res => {
                    this.applyUserList = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList = this.applyUserList.filter(item => item.value != this.query.userId);
                });
            }
            if (val.length > 1 && index == 1) {
                getApplyUserInfo(this.query).then(res => {
                    this.applyUserList1 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList1.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList1 = this.applyUserList1.filter(item => item.value != this.query.userId);
                    // 去重
                    var newArr1 = [];
                    var obj1 = {};
                    for (var i = 0; i < this.applyUserList1.length; i++) {
                        if (!obj1[this.applyUserList1[i].value]) {
                            newArr1.push(this.applyUserList1[i]);
                            obj1[this.applyUserList1[i].value] = true;
                        }
                    }
                    this.applyUserList1 = newArr1;
                });
            } else if (val.length == 1 && index == 1) {
                getDeptUserList(this.userList.deptId).then(res => {
                    this.applyUserList1 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList1.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList1 = this.applyUserList1.filter(item => item.value != this.query.userId);
                });
            }
            if (val.length > 1 && index == 2) {
                getApplyUserInfo(this.query).then(res => {
                    this.applyUserList2 = [{ value: 0, label: '无人验收' }];
                    console.log(res);
                    res.data.data.forEach(element => {
                        this.applyUserList2.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList2 = this.applyUserList2.filter(item => item.value != this.query.userId);
                    // 去重
                    var newArr2 = [];
                    var obj2 = {};
                    for (var i = 0; i < this.applyUserList2.length; i++) {
                        if (!obj2[this.applyUserList2[i].value]) {
                            newArr2.push(this.applyUserList2[i]);
                            obj2[this.applyUserList2[i].value] = true;
                        }
                    }
                    this.applyUserList2 = newArr2;
                });
            } else if (val.length == 1 && index == 2) {
                getDeptUserList(this.userList.deptId).then(res => {
                    this.applyUserList2 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList2.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList2 = this.applyUserList2.filter(item => item.value != this.query.userId);
                });
            }
            if (val.length > 1 && index == 3) {
                getApplyUserInfo(this.query).then(res => {
                    this.applyUserList3 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList3.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList3 = this.applyUserList3.filter(item => item.value != this.query.userId);
                    // 去重
                    var newArr3 = [];
                    var obj3 = {};
                    for (var i = 0; i < this.applyUserList3.length; i++) {
                        if (!obj3[this.applyUserList3[i].value]) {
                            newArr3.push(this.applyUserList3[i]);
                            obj3[this.applyUserList3[i].value] = true;
                        }
                    }
                    this.applyUserList3 = newArr3;
                });
            } else if (val.length == 1 && index == 3) {
                getDeptUserList(this.userList.deptId).then(res => {
                    this.applyUserList3 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList3.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList3 = this.applyUserList3.filter(item => item.value != this.query.userId);
                });
            }
            if (val.length > 1 && index == 4) {
                getApplyUserInfo(this.query).then(res => {
                    this.applyUserList4 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList4.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList4 = this.applyUserList4.filter(item => item.value != this.query.userId);
                    // 去重
                    var newArr4 = [];
                    var obj4 = {};
                    for (var i = 0; i < this.applyUserList4.length; i++) {
                        if (!obj4[this.applyUserList4[i].value]) {
                            newArr4.push(this.applyUserList4[i]);
                            obj4[this.applyUserList4[i].value] = true;
                        }
                    }
                    this.applyUserList4 = newArr4;
                });
            } else if (val.length == 1 && index == 4) {
                getDeptUserList(this.userList.deptId).then(res => {
                    this.applyUserList4 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList4.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList4 = this.applyUserList4.filter(item => item.value != this.query.userId);
                });
            }
        },
        //  工作子分类
        selectcMainClassify6(val, index) {
            this.tableData_6[index].subClassify = '';
            this.tableData_6[index].itemId = null;
            this.tableData_6[index].itemNextId = null;

            // 获取子类
            if (index == 0) {
                selectCategory(val[0], this.userId).then(res => {
                    // 清空数据
                    this.subClassifyOptions_1 = [];
                    console.log(res);
                    res.data.data.ddRegions.forEach(item => {
                        this.subClassifyOptions_1.push({
                            value: item.id,
                            label: item.name
                        });
                    });
                });
            }
            if (index == 1) {
                selectCategory(val[0], this.userId).then(res => {
                    // 清空数据
                    this.subClassifyOptions_2 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.subClassifyOptions_2.push({
                            value: item.id,
                            label: item.name
                        });
                    });
                });
            }
            if (index == 2) {
                selectCategory(val[0], this.userId).then(res => {
                    // 清空数据
                    this.subClassifyOptions_3 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.subClassifyOptions_3.push({
                            value: item.id,
                            label: item.name
                        });
                    });
                });
            }
            if (index == 3) {
                selectCategory(val[0], this.userId).then(res => {
                    // 清空数据
                    this.subClassifyOptions_4 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.subClassifyOptions_4.push({
                            value: item.id,
                            label: item.name
                        });
                    });
                });
            }
            if (index == 4) {
                selectCategory(val[0], this.userId).then(res => {
                    // 清空数据
                    this.subClassifyOptions_5 = [];
                    res.data.data.ddRegions.forEach(item => {
                        this.subClassifyOptions_5.push({
                            value: item.id,
                            label: item.name
                        });
                    });
                });
            }

            // 判断长度 获取项目id
            if (val.length > 1 && val.length < 3) {
                this.tableData_6[index].itemId = val[1];
                this.query.itemId = val[1];
                console.log(this.query);
            } else if (val.length == 3) {
                this.tableData_6[index].itemId = val[2];
                this.tableData_6[index].ititemNextIdemId = val[1];
                this.query.itemId = val[2];
                console.log(this.query);
            } else {
                this.tableData_6[index].itemId = null;
                this.tableData_6[index].itemNextId = null;
            }
            // 获取验收人
            if (val.length > 1 && index == 0) {
                getApplyUserInfo(this.query).then(res => {
                    this.applyUserList = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList = this.applyUserList.filter(item => item.value != this.query.userId);
                    // 去重
                    var newArr = [];
                    var obj = {};
                    for (var i = 0; i < this.applyUserList.length; i++) {
                        if (!obj[this.applyUserList[i].value]) {
                            newArr.push(this.applyUserList[i]);
                            obj[this.applyUserList[i].value] = true;
                        }
                    }
                    this.applyUserList = newArr;
                });
            } else if (val.length == 1 && index == 0) {
                getDeptUserList(this.userList.deptId).then(res => {
                    this.applyUserList = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList = this.applyUserList.filter(item => item.value != this.query.userId);
                });
            }
            if (val.length > 1 && index == 1) {
                getApplyUserInfo(this.query).then(res => {
                    this.applyUserList1 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList1.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList1 = this.applyUserList1.filter(item => item.value != this.query.userId);
                    // 去重
                    var newArr1 = [];
                    var obj1 = {};
                    for (var i = 0; i < this.applyUserList1.length; i++) {
                        if (!obj1[this.applyUserList1[i].value]) {
                            newArr1.push(this.applyUserList1[i]);
                            obj1[this.applyUserList1[i].value] = true;
                        }
                    }
                    this.applyUserList1 = newArr1;
                });
            } else if (val.length == 1 && index == 1) {
                getDeptUserList(this.userList.deptId).then(res => {
                    this.applyUserList1 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList1.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList1 = this.applyUserList1.filter(item => item.value != this.query.userId);
                });
            }
            if (val.length > 1 && index == 2) {
                getApplyUserInfo(this.query).then(res => {
                    this.applyUserList2 = [{ value: 0, label: '无人验收' }];
                    console.log(res);
                    res.data.data.forEach(element => {
                        this.applyUserList2.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList2 = this.applyUserList2.filter(item => item.value != this.query.userId);
                    // 去重
                    var newArr2 = [];
                    var obj2 = {};
                    for (var i = 0; i < this.applyUserList2.length; i++) {
                        if (!obj2[this.applyUserList2[i].value]) {
                            newArr2.push(this.applyUserList2[i]);
                            obj2[this.applyUserList2[i].value] = true;
                        }
                    }
                    this.applyUserList2 = newArr2;
                });
            } else if (val.length == 1 && index == 2) {
                getDeptUserList(this.userList.deptId).then(res => {
                    this.applyUserList2 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList2.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList2 = this.applyUserList2.filter(item => item.value != this.query.userId);
                });
            }
            if (val.length > 1 && index == 3) {
                getApplyUserInfo(this.query).then(res => {
                    this.applyUserList3 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList3.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList3 = this.applyUserList3.filter(item => item.value != this.query.userId);
                    // 去重
                    var newArr3 = [];
                    var obj3 = {};
                    for (var i = 0; i < this.applyUserList3.length; i++) {
                        if (!obj3[this.applyUserList3[i].value]) {
                            newArr3.push(this.applyUserList3[i]);
                            obj3[this.applyUserList3[i].value] = true;
                        }
                    }
                    this.applyUserList3 = newArr3;
                });
            } else if (val.length == 1 && index == 3) {
                getDeptUserList(this.userList.deptId).then(res => {
                    this.applyUserList3 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList3.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList3 = this.applyUserList3.filter(item => item.value != this.query.userId);
                });
            }
            if (val.length > 1 && index == 4) {
                getApplyUserInfo(this.query).then(res => {
                    this.applyUserList4 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList4.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList4 = this.applyUserList4.filter(item => item.value != this.query.userId);
                    // 去重
                    var newArr4 = [];
                    var obj4 = {};
                    for (var i = 0; i < this.applyUserList4.length; i++) {
                        if (!obj4[this.applyUserList4[i].value]) {
                            newArr4.push(this.applyUserList4[i]);
                            obj4[this.applyUserList4[i].value] = true;
                        }
                    }
                    this.applyUserList4 = newArr4;
                });
            } else if (val.length == 1 && index == 4) {
                getDeptUserList(this.userList.deptId).then(res => {
                    this.applyUserList4 = [{ value: 0, label: '无人验收' }];
                    res.data.data.forEach(element => {
                        this.applyUserList4.push({
                            value: element.userId,
                            label: element.username
                        });
                    });
                    // 去除自己
                    this.applyUserList4 = this.applyUserList4.filter(item => item.value != this.query.userId);
                });
            }
        },

        // 未填报日期
        getAbnormalSeven() {
            getAbnormalSeven(this.query.userId).then(response => {
                this.dayOptions = response.data.data;
                this.dayOptions = this.dayOptions.filter(item => item.min > 0 && Number(item.hour) > Number(item.useHour));
                // console.log(this.dayOptions);
                if (this.dayOptions[0] == undefined) {
                    this.day_1 = '';
                } else {
                    this.day_1 = this.dayOptions[0];
                    this.selectWorkDay_1(this.day_1.hourId);
                }
                if (this.dayOptions[1] == undefined) {
                    this.day_2 = '';
                } else {
                    this.day_2 = this.dayOptions[1];
                    this.selectWorkDay_2(this.day_2.hourId);
                }
                if (this.dayOptions[2] == undefined) {
                    this.day_3 = '';
                } else {
                    this.day_3 = this.dayOptions[2];
                    this.selectWorkDay_3(this.day_3.hourId);
                }
                if (this.dayOptions[3] == undefined) {
                    this.day_4 = '';
                } else {
                    this.day_4 = this.dayOptions[3];
                    this.selectWorkDay_4(this.day_4.hourId);
                }
                if (this.dayOptions[4] == undefined) {
                    this.day_5 = '';
                } else {
                    this.day_5 = this.dayOptions[4];
                    this.selectWorkDay_5(this.day_5.hourId);
                }
                if (this.dayOptions[5] == undefined) {
                    this.day_6 = '';
                } else {
                    this.day_6 = this.dayOptions[5];
                    this.selectWorkDay_6(this.day_6.hourId);
                }
            });
        },

        getStandardApplyInfo() {
            getStandardApplyInfoById(1).then(response => {
                if (response.data.data) {
                    const data = response.data.data;
                    console.log(data);
                    this.content = data.content;
                    const workStandardApply = JSON.parse(window.localStorage.getItem('workStandardApply'));
                    if (workStandardApply) {
                        if (workStandardApply.version < data.version) {
                            this.open();
                        }
                    } else {
                        this.open();
                    }
                    window.localStorage.setItem('workStandardApply', JSON.stringify(data));
                }
            });
        },
        // 工时规范
        open() {
            let content = this.content.split('\n');
            let newDatas = [];
            const h = this.$createElement;
            for (let i in content) {
                newDatas.push(h('p', null, content[i]));
            }
            this.$alert(h('div', null, newDatas), '工时规范');
        }
    }
};
</script>
<style type="text/scss" scoped lang="scss">
.el-input .el-input__count .el-input__count-inner {
    height: 50%;
}
.el-image img {
    border-radius: 50%;
}
.el-rate__icon {
    font-size: 2rem !important;
}
.invoiceRules {
    top: 0;
}
.top {
    display: flex;
    margin-top: 20px;
    padding-bottom: 5px;
    margin-bottom: 20px;
    border-bottom: 5px solid #969696;
    color: #199ed8;
    font-size: 20px;
    font-weight: 700;
}
.HourFloat {
    margin: 0 30px;
    margin-top: -5px;
}

fieldset {
    padding: 20px;
    margin-top: 35px;
    font-size: 1rem;
    color: #2d8cf0;
    /* border:#06c dashed 1px; */
}
legend {
    width: 6rem;
    margin-left: 10px;
    padding-left: 7px;
}
</style>
