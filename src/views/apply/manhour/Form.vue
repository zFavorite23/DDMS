<template>
    <div>
        <el-row :gutter="24">
            <el-col :span="24">
                <fieldset>
                    <legend>未填报日期</legend>
                    <el-row :gutter="24">
                        <el-col :span="3" v-for="(item, index) in dayOptions" :key="index">
                            <el-link type="danger" style="font-size: 1rem;">{{ item.day }}</el-link>
                        </el-col>
                    </el-row>
                </fieldset>
            </el-col>
        </el-row>
        <el-row style="padding: 0 15px; margin-bottom: 30px;" v-if="day_1 != ''">
            <div class="top">
                <span>未填报日期 : {{ day_1.day }}</span>
                <span class="HourFloat" v-if="dayHourInt_1 > 0">
                    <el-rate
                        disabled
                        show-score
                        text-color="#ff9900"
                        v-model="dayHourFloat_1"
                        :max="dayHourInt_1"
                        :icon-classes="['icon iconfont iconjitui', 'icon iconfont iconjitui', 'icon iconfont iconjitui']"
                        disabled-void-icon-class="icon iconfont iconjitui"
                        :colors="['#FF9900', '#FF9900', '#FF9900']"
                    ></el-rate>
                </span>
                <span>
                    <el-select v-model="tableData_1[0].integral" :placeholder="String(tableData_1[0].integral)" size="mini" style="width: 80px;">
                        <el-option v-for="(item, index) in integralOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </span>
                <el-button type="info" style="margin-left: 3%" icon="el-icon-document-copy" circle @click="copyCode_1()"></el-button>
            </div>
           <!-- <el-table :data="oldList" v-if="oldList.length!=0" style="width: 100%">
                <el-table-column align="center" prop="category" label="工作类别" width="140">
                    <template slot-scope="scope">
                        <el-select disabled :value="scope.row.category" placeholder="请选择" size="mini" style="width: 120px;" @change="selectcCategory()">
                            <el-option v-for="(item, index) in categoryOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="mainClassify" label="主分类" width="180">
                    <template slot-scope="scope">
                        <el-select  disabled v-if="scope.row.category == '1'" v-model="scope.row.mainClassify" placeholder="请选择" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in mainClassifyOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select disabled  v-if="scope.row.category == '2'" v-model="scope.row.itemId" placeholder="请选择" @change="selectcItem" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in itemOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select disabled  v-if="scope.row.category == '3'" v-model="scope.row.itemId" placeholder="请选择" @change="selectcItem" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in productOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select  disabled v-if="scope.row.category == '4'" v-model="scope.row.itemId" disabled placeholder="无" size="mini" style="width: 120px;"></el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="subClassify" label="子分类" width="180">
                    <template slot-scope="scope">
                        <el-select
                            disabled
                            v-if="scope.row.category == '1' && scope.row.mainClassify == '1'"
                            v-model="scope.row.subClassify"
                            placeholder="请选择"
                            size="mini"
                            style="width: 120px;"
                        >
                            <el-option v-for="(item, index) in subClassifyOptions_1" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select
                        disabled
                            v-if="scope.row.category == '1' && scope.row.mainClassify == '2'"
                            v-model="scope.row.subClassify"
                            placeholder="请选择"
                            size="mini"
                            style="width: 120px;"
                        >
                            <el-option v-for="(item, index) in subClassifyOptions_2" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select
                            disabled
                            v-if="scope.row.category == '1' && scope.row.mainClassify == '3'"
                            v-model="scope.row.subClassify"
                            placeholder="请选择"
                            size="mini"
                            style="width: 120px;"
                        >
                            <el-option v-for="(item, index) in subClassifyOptions_3" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select
                            disabled
                            v-if="scope.row.category == '1' && scope.row.mainClassify == '4'"
                            v-model="scope.row.subClassify"
                            placeholder="请选择"
                            size="mini"
                            style="width: 120px;"
                        >
                            <el-option v-for="(item, index) in subClassifyOptions_4" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select
                            disabled
                            v-if="scope.row.category == '1' && scope.row.mainClassify == '5'"
                            v-model="scope.row.subClassify"
                            placeholder="请选择"
                            size="mini"
                            style="width: 120px;"
                        >
                            <el-option v-for="(item, index) in subClassifyOptions_5" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select disabled v-if="scope.row.category == '2'" v-model="scope.row.subClassify" placeholder="请选择" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in subClassifyOptions_6" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select disabled v-if="scope.row.category == '3'" v-model="scope.row.subClassify" placeholder="请选择" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in subClassifyOptions_7" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select disabled v-if="scope.row.category == '4'" v-model="scope.row.subClassify" placeholder="请选择" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in subClassifyOptions_8" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="reason" label="工作内容" width="320">
                    <template slot-scope="scope">
                        <el-input type="textarea" size="mini" disabled :value="scope.row.reason" placeholder="请填写工作内容" maxlength="50" show-word-limit></el-input>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="approverids" label="验收人" width="140">
                    <template slot-scope="scope">
                        <el-select :value="scope.row.approverids" disabled placeholder="请选择" size="mini">
                            <el-option v-for="(item, index) in applyUserList" :label="item.label" :key="index" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="complete" label="完成情况" width="140">
                    <template slot-scope="scope">
                        <el-select :value="scope.row.complete" disabled placeholder="请选择" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in completeOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="completeTime" label="预计完成时间" width="220">
                    <template slot-scope="scope">
                        <el-date-picker :value="scope.row.completeTime" disabled style="width: 180px;" size="mini" placeholder="选择日期"></el-date-picker>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="useHour" label="工时" width="140">
                    <template slot-scope="scope">
                        <el-input-number
                            disabled
                            :value="scope.row.useHour"
                            size="small"
                            controls-position="right"
                        ></el-input-number>
                    </template>
                </el-table-column>

            </el-table> -->
            <el-table :data="tableData_1" style="width: 100%">
                <el-table-column align="center" prop="category" label="工作类别" width="140">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.category" placeholder="请选择" size="mini" style="width: 120px;" @change="selectcCategory()">
                            <el-option v-for="(item, index) in categoryOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="mainClassify" label="主分类" width="180">
                    <template slot-scope="scope">
                        <el-select v-if="scope.row.category == '1'" v-model="scope.row.mainClassify" placeholder="请选择" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in mainClassifyOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-if="scope.row.category == '2'" filterable v-model="scope.row.itemId" placeholder="请选择" @change="selectcItem" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in itemOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-if="scope.row.category == '3'" filterable v-model="scope.row.itemId" placeholder="请选择" @change="selectcItem" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in productOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-if="scope.row.category == '4'" v-model="scope.row.itemId" disabled placeholder="无" size="mini" style="width: 120px;"></el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="subClassify" label="子分类" width="180">
                    <template slot-scope="scope">
                        <el-select
                            v-if="scope.row.category == '1' && scope.row.mainClassify == '1'"
                            v-model="scope.row.subClassify"
                            placeholder="请选择"
                            size="mini"
                            style="width: 120px;"
                        >
                            <el-option v-for="(item, index) in subClassifyOptions_1" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select
                            v-if="scope.row.category == '1' && scope.row.mainClassify == '2'"
                            v-model="scope.row.subClassify"
                            placeholder="请选择"
                            size="mini"
                            style="width: 120px;"
                        >
                            <el-option v-for="(item, index) in subClassifyOptions_2" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select
                            v-if="scope.row.category == '1' && scope.row.mainClassify == '3'"
                            v-model="scope.row.subClassify"
                            placeholder="请选择"
                            size="mini"
                            style="width: 120px;"
                        >
                            <el-option v-for="(item, index) in subClassifyOptions_3" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select
                            v-if="scope.row.category == '1' && scope.row.mainClassify == '4'"
                            v-model="scope.row.subClassify"
                            placeholder="请选择"
                            size="mini"
                            style="width: 120px;"
                        >
                            <el-option v-for="(item, index) in subClassifyOptions_4" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select
                            v-if="scope.row.category == '1' && scope.row.mainClassify == '5'"
                            v-model="scope.row.subClassify"
                            placeholder="请选择"
                            size="mini"
                            style="width: 120px;"
                        >
                            <el-option v-for="(item, index) in subClassifyOptions_5" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-if="scope.row.category == '2'" v-model="scope.row.subClassify" placeholder="请选择" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in subClassifyOptions_6" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-if="scope.row.category == '3'" v-model="scope.row.subClassify" placeholder="请选择" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in subClassifyOptions_7" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-if="scope.row.category == '4'" v-model="scope.row.subClassify" placeholder="请选择" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in subClassifyOptions_8" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="reason" label="工作内容" width="320">
                    <template slot-scope="scope">
                        <el-input type="textarea" size="mini" v-model="scope.row.reason" placeholder="请填写工作内容" maxlength="50" show-word-limit></el-input>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="approverids" label="验收人" width="140">
                    <template slot-scope="scope">
                        <el-select v-if="scope.row.category == '2'||scope.row.category == '3'" v-model="scope.row.approverids" placeholder="请选择" size="mini">
                            <el-option v-for="(item, index) in applyUserList" :label="item.label" :key="index" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-if="scope.row.category == '1'||scope.row.category == '4'" v-model="scope.row.approverids" placeholder="请选择" size="mini">
                            <el-option v-for="(item, index) in applyUserList2" :label="item.label" :key="index" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="complete" label="完成情况" width="140">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.complete" placeholder="请选择" size="mini" style="width: 120px;">
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
                            v-model="scope.row.useHour"
                            size="small"
                            controls-position="right"
                            :precision="1"
                            step-strictly
                            :step="0.5"
                            :min="0.0"
                            :max="maxUseHour_1"
                        ></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="address" label="操作" width="140">
                    <template slot-scope="scope">
                        <el-button type="danger" icon="el-icon-delete" circle @click="deleteRow_1(scope.$index)"></el-button>
                        <el-button type="primary" icon="el-icon-plus" circle @click="addRow_1()"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="primary" style="margin-left: 45%;margin-top: 3%;" @click="submit_1()">提交</el-button>
        </el-row>

        <el-row style="padding: 0 15px; margin-bottom: 30px;" v-if="day_2 != ''">
            <div class="top">
                <span>未填报日期 : {{ day_2.day }}</span>
                <span class="HourFloat" v-if="dayHourInt_2 > 0">
                    <el-rate
                        disabled
                        show-score
                        text-color="#ff9900"
                        v-model="dayHourFloat_2"
                        :max="dayHourInt_2"
                        :icon-classes="['icon iconfont iconjitui', 'icon iconfont iconjitui', 'icon iconfont iconjitui']"
                        disabled-void-icon-class="icon iconfont iconjitui"
                        :colors="['#FF9900', '#FF9900', '#FF9900']"
                    ></el-rate>
                </span>
                <span>
                    <el-select v-model="tableData_2[0].integral" :placeholder="String(tableData_2[0].integral)" size="mini" style="width: 80px;">
                        <el-option v-for="(item, index) in integralOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </span>
                <el-button type="info" icon="el-icon-document-copy" style="margin-left: 3%" circle @click="copyCode_2()"></el-button>
            </div>
            <el-table :data="tableData_2" style="width: 100%">
                <el-table-column align="center" prop="category" label="工作类别" width="140">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.category" placeholder="请选择" size="mini" style="width: 120px;" @change="selectcCategory">
                            <el-option v-for="(item, index) in categoryOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="mainClassify" label="主分类" width="180">
                    <template slot-scope="scope">
                        <el-select v-if="scope.row.category == 1" v-model="scope.row.mainClassify" placeholder="请选择" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in mainClassifyOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-if="scope.row.category == 2" filterable v-model="scope.row.itemId" placeholder="请选择" @change="selectcItem" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in itemOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-if="scope.row.category == 3" filterable v-model="scope.row.itemId" placeholder="请选择" @change="selectcItem" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in productOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-if="scope.row.category == 4" v-model="scope.row.itemId" disabled placeholder="无" size="mini" style="width: 120px;"></el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="subClassify" label="子分类" width="180">
                    <template slot-scope="scope">
                        <el-select
                            v-if="scope.row.category == 1 && scope.row.mainClassify == 1"
                            v-model="scope.row.subClassify"
                            placeholder="请选择"
                            size="mini"
                            style="width: 120px;"
                        >
                            <el-option v-for="(item, index) in subClassifyOptions_1" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select
                            v-if="scope.row.category == 1 && scope.row.mainClassify == 2"
                            v-model="scope.row.subClassify"
                            placeholder="请选择"
                            size="mini"
                            style="width: 120px;"
                        >
                            <el-option v-for="(item, index) in subClassifyOptions_2" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select
                            v-if="scope.row.category == 1 && scope.row.mainClassify == 3"
                            v-model="scope.row.subClassify"
                            placeholder="请选择"
                            size="mini"
                            style="width: 120px;"
                        >
                            <el-option v-for="(item, index) in subClassifyOptions_3" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select
                            v-if="scope.row.category == 1 && scope.row.mainClassify == 4"
                            v-model="scope.row.subClassify"
                            placeholder="请选择"
                            size="mini"
                            style="width: 120px;"
                        >
                            <el-option v-for="(item, index) in subClassifyOptions_4" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select
                            v-if="scope.row.category == 1 && scope.row.mainClassify == 5"
                            v-model="scope.row.subClassify"
                            placeholder="请选择"
                            size="mini"
                            style="width: 120px;"
                        >
                            <el-option v-for="(item, index) in subClassifyOptions_5" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-if="scope.row.category == 2" v-model="scope.row.subClassify" placeholder="请选择" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in subClassifyOptions_6" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-if="scope.row.category == 3" v-model="scope.row.subClassify" placeholder="请选择" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in subClassifyOptions_7" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-if="scope.row.category == 4" v-model="scope.row.subClassify" placeholder="请选择" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in subClassifyOptions_8" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="reason" label="工作内容" width="320">
                    <template slot-scope="scope">
                        <el-input type="textarea" size="mini" v-model="scope.row.reason" placeholder="请填写工作内容" maxlength="50" show-word-limit></el-input>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="approverids" label="验收人" width="140">
                    <template slot-scope="scope">
                        <el-select v-if="scope.row.category == '2'||scope.row.category == '3'" v-model="scope.row.approverids" placeholder="请选择" size="mini">
                            <el-option v-for="(item, index) in applyUserList" :label="item.label" :key="index" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-if="scope.row.category == '1'||scope.row.category == '4'" v-model="scope.row.approverids" placeholder="请选择" size="mini">
                            <el-option v-for="(item, index) in applyUserList2" :label="item.label" :key="index" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="complete" label="完成情况" width="140">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.complete" placeholder="请选择" size="mini" style="width: 120px;">
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
                            v-model="scope.row.useHour"
                            size="small"
                            controls-position="right"
                            :precision="1"
                            :step="0.5"
                            :min="0.0"
                            :max="maxUseHour_2"
                            step-strictly
                        ></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="address" label="操作" width="140">
                    <template slot-scope="scope">
                        <el-button type="danger" icon="el-icon-delete" circle @click="deleteRow_2(scope.$index)"></el-button>
                        <el-button type="primary" icon="el-icon-plus" circle @click="addRow_2()"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="primary" style="margin-left: 45%;margin-top: 3%;" @click="submit_2()">提交</el-button>
        </el-row>

        <el-row style="padding: 0 15px; margin-bottom: 30px;" v-if="day_3 != ''">
            <div class="top">
                <span>未填报日期 : {{ day_3.day }}</span>
                <span class="HourFloat" v-if="dayHourInt_3 > 0">
                    <el-rate
                        disabled
                        show-score
                        text-color="#ff9900"
                        v-model="dayHourFloat_3"
                        :max="dayHourInt_3"
                        :icon-classes="['icon iconfont iconjitui', 'icon iconfont iconjitui', 'icon iconfont iconjitui']"
                        disabled-void-icon-class="icon iconfont iconjitui"
                        :colors="['#FF9900', '#FF9900', '#FF9900']"
                    ></el-rate>
                </span>
                <span>
                    <el-select v-model="tableData_3[0].integral" :placeholder="String(tableData_3[0].integral)" size="mini" style="width: 80px;">
                        <el-option v-for="(item, index) in integralOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </span>
                <el-button type="info" icon="el-icon-document-copy" style="margin-left: 3%" circle @click="copyCode_3()"></el-button>
            </div>
            <el-table :data="tableData_3" style="width: 100%">
                <el-table-column align="center" prop="category" label="工作类别" width="140">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.category" placeholder="请选择" size="mini" style="width: 120px;" @change="selectcCategory">
                            <el-option v-for="(item, index) in categoryOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="mainClassify" label="主分类" width="180">
                    <template slot-scope="scope">
                        <el-select v-if="scope.row.category == 1" v-model="scope.row.mainClassify" placeholder="请选择" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in mainClassifyOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-if="scope.row.category == 2" filterable v-model="scope.row.itemId" placeholder="请选择" @change="selectcItem" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in itemOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-if="scope.row.category == 3" filterable v-model="scope.row.itemId" placeholder="请选择" @change="selectcItem" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in productOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-if="scope.row.category == 4" v-model="scope.row.itemId" disabled placeholder="无" size="mini" style="width: 120px;"></el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="subClassify" label="子分类" width="180">
                    <template slot-scope="scope">
                        <el-select
                            v-if="scope.row.category == 1 && scope.row.mainClassify == 1"
                            v-model="scope.row.subClassify"
                            placeholder="请选择"
                            size="mini"
                            style="width: 120px;"
                        >
                            <el-option v-for="(item, index) in subClassifyOptions_1" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select
                            v-if="scope.row.category == 1 && scope.row.mainClassify == 2"
                            v-model="scope.row.subClassify"
                            placeholder="请选择"
                            size="mini"
                            style="width: 120px;"
                        >
                            <el-option v-for="(item, index) in subClassifyOptions_2" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select
                            v-if="scope.row.category == 1 && scope.row.mainClassify == 3"
                            v-model="scope.row.subClassify"
                            placeholder="请选择"
                            size="mini"
                            style="width: 120px;"
                        >
                            <el-option v-for="(item, index) in subClassifyOptions_3" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select
                            v-if="scope.row.category == 1 && scope.row.mainClassify == 4"
                            v-model="scope.row.subClassify"
                            placeholder="请选择"
                            size="mini"
                            style="width: 120px;"
                        >
                            <el-option v-for="(item, index) in subClassifyOptions_4" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select
                            v-if="scope.row.category == 1 && scope.row.mainClassify == 5"
                            v-model="scope.row.subClassify"
                            placeholder="请选择"
                            size="mini"
                            style="width: 120px;"
                        >
                            <el-option v-for="(item, index) in subClassifyOptions_5" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-if="scope.row.category == 2" v-model="scope.row.subClassify" placeholder="请选择" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in subClassifyOptions_6" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-if="scope.row.category == 3" v-model="scope.row.subClassify" placeholder="请选择" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in subClassifyOptions_7" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-if="scope.row.category == 4" v-model="scope.row.subClassify" placeholder="请选择" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in subClassifyOptions_8" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="reason" label="工作内容" width="320">
                    <template slot-scope="scope">
                        <el-input type="textarea" size="mini" v-model="scope.row.reason" placeholder="请填写工作内容" maxlength="50" show-word-limit></el-input>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="approverids" label="验收人" width="140">
                    <template slot-scope="scope">
                        <el-select v-if="scope.row.category == '2'||scope.row.category == '3'" v-model="scope.row.approverids" placeholder="请选择" size="mini">
                            <el-option v-for="(item, index) in applyUserList" :label="item.label" :key="index" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-if="scope.row.category == '1'||scope.row.category == '4'" v-model="scope.row.approverids" placeholder="请选择" size="mini">
                            <el-option v-for="(item, index) in applyUserList2" :label="item.label" :key="index" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="complete" label="完成情况" width="140">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.complete" placeholder="请选择" size="mini" style="width: 120px;">
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
                            v-model="scope.row.useHour"
                            size="small"
                            controls-position="right"
                            :precision="1"
                            :step="0.5"
                            :min="0.0"
                            step-strictly
                            :max="maxUseHour_3"
                        ></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="address" label="操作" width="140">
                    <template slot-scope="scope">
                        <el-button type="danger" icon="el-icon-delete" circle @click="deleteRow_3(scope.$index)"></el-button>
                        <el-button type="primary" icon="el-icon-plus" circle @click="addRow_3()"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="primary" style="margin-left: 45%;margin-top: 3%;" @click="submit_3()">提交</el-button>
        </el-row>

        <el-row style="padding: 0 15px; margin-bottom: 30px;" v-if="day_4 != ''">
            <div class="top">
                <span>未填报日期 : {{ day_4.day }}</span>
                <span class="HourFloat" v-if="dayHourInt_4 > 0">
                    <el-rate
                        disabled
                        show-score
                        text-color="#ff9900"
                        v-model="dayHourFloat_4"
                        :max="dayHourInt_4"
                        :icon-classes="['icon iconfont iconjitui', 'icon iconfont iconjitui', 'icon iconfont iconjitui']"
                        disabled-void-icon-class="icon iconfont iconjitui"
                        :colors="['#FF9900', '#FF9900', '#FF9900']"
                    ></el-rate>
                </span>
                <span>
                    <el-select v-model="tableData_4[0].integral" :placeholder="String(tableData_4[0].integral)" size="mini" style="width: 80px;">
                        <el-option v-for="(item, index) in integralOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </span>
                <el-button type="info" icon="el-icon-document-copy" style="margin-left: 3%" circle @click="copyCode_4()"></el-button>
            </div>
            <el-table :data="tableData_4" style="width: 100%">
                <el-table-column align="center" prop="category" label="工作类别" width="140">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.category" placeholder="请选择" size="mini" style="width: 120px;" @change="selectcCategory">
                            <el-option v-for="(item, index) in categoryOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="mainClassify" label="主分类" width="180">
                    <template slot-scope="scope">
                        <el-select v-if="scope.row.category == 1" v-model="scope.row.mainClassify" placeholder="请选择" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in mainClassifyOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-if="scope.row.category == 2" filterable v-model="scope.row.itemId" placeholder="请选择" @change="selectcItem" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in itemOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-if="scope.row.category == 3" filterable v-model="scope.row.itemId" placeholder="请选择" @change="selectcItem" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in productOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-if="scope.row.category == 4" v-model="scope.row.itemId" disabled placeholder="无" size="mini" style="width: 120px;"></el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="subClassify" label="子分类" width="180">
                    <template slot-scope="scope">
                        <el-select
                            v-if="scope.row.category == 1 && scope.row.mainClassify == 1"
                            v-model="scope.row.subClassify"
                            placeholder="请选择"
                            size="mini"
                            style="width: 120px;"
                        >
                            <el-option v-for="(item, index) in subClassifyOptions_1" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select
                            v-if="scope.row.category == 1 && scope.row.mainClassify == 2"
                            v-model="scope.row.subClassify"
                            placeholder="请选择"
                            size="mini"
                            style="width: 120px;"
                        >
                            <el-option v-for="(item, index) in subClassifyOptions_2" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select
                            v-if="scope.row.category == 1 && scope.row.mainClassify == 3"
                            v-model="scope.row.subClassify"
                            placeholder="请选择"
                            size="mini"
                            style="width: 120px;"
                        >
                            <el-option v-for="(item, index) in subClassifyOptions_3" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select
                            v-if="scope.row.category == 1 && scope.row.mainClassify == 4"
                            v-model="scope.row.subClassify"
                            placeholder="请选择"
                            size="mini"
                            style="width: 120px;"
                        >
                            <el-option v-for="(item, index) in subClassifyOptions_4" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select
                            v-if="scope.row.category == 1 && scope.row.mainClassify == 5"
                            v-model="scope.row.subClassify"
                            placeholder="请选择"
                            size="mini"
                            style="width: 120px;"
                        >
                            <el-option v-for="(item, index) in subClassifyOptions_5" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-if="scope.row.category == 2" v-model="scope.row.subClassify" placeholder="请选择" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in subClassifyOptions_6" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-if="scope.row.category == 3" v-model="scope.row.subClassify" placeholder="请选择" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in subClassifyOptions_7" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-if="scope.row.category == 4" v-model="scope.row.subClassify" placeholder="请选择" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in subClassifyOptions_8" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="reason" label="工作内容" width="320">
                    <template slot-scope="scope">
                        <el-input type="textarea" size="mini" v-model="scope.row.reason" placeholder="请填写工作内容" maxlength="50" show-word-limit></el-input>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="approverids" label="验收人" width="140">
                    <template slot-scope="scope">
                       <el-select v-if="scope.row.category == '2'||scope.row.category == '3'" v-model="scope.row.approverids" placeholder="请选择" size="mini">
                           <el-option v-for="(item, index) in applyUserList" :label="item.label" :key="index" :value="item.value"></el-option>
                       </el-select>
                       <el-select v-if="scope.row.category == '1'||scope.row.category == '4'" v-model="scope.row.approverids" placeholder="请选择" size="mini">
                           <el-option v-for="(item, index) in applyUserList2" :label="item.label" :key="index" :value="item.value"></el-option>
                       </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="complete" label="完成情况" width="140">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.complete" placeholder="请选择" size="mini" style="width: 120px;">
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
                            v-model="scope.row.useHour"
                            size="small"
                            controls-position="right"
                            :precision="1"
                            :step="0.5"
                            :min="0.0"
                            step-strictly
                            :max="maxUseHour_4"
                        ></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="address" label="操作" width="140">
                    <template slot-scope="scope">
                        <el-button type="danger" icon="el-icon-delete" circle @click="deleteRow_4(scope.$index)"></el-button>
                        <el-button type="primary" icon="el-icon-plus" circle @click="addRow_4()"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="primary" style="margin-left: 45%;margin-top: 3%;" @click="submit_4()">提交</el-button>
        </el-row>

        <el-row style="padding: 0 15px; margin-bottom: 30px;" v-if="day_5 != ''">
            <div class="top">
                <span>未填报日期 : {{ day_5.day }}</span>
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
                </span>
                <span>
                    <el-select v-model="tableData_5[0].integral" :placeholder="String(tableData_5[0].integral)" size="mini" style="width: 80px;">
                        <el-option v-for="(item, index) in integralOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </span>
                <el-button type="info" icon="el-icon-document-copy" style="margin-left: 3%" circle @click="copyCode_5()"></el-button>
            </div>
            <el-table :data="tableData_5" style="width: 100%">
                <el-table-column align="center" prop="category" label="工作类别" width="140">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.category" placeholder="请选择" size="mini" style="width: 120px;" @change="selectcCategory">
                            <el-option v-for="(item, index) in categoryOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="mainClassify" label="主分类" width="180">
                    <template slot-scope="scope">
                        <el-select v-if="scope.row.category == 1" v-model="scope.row.mainClassify" placeholder="请选择" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in mainClassifyOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-if="scope.row.category == 2" filterable v-model="scope.row.itemId" placeholder="请选择" @change="selectcItem" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in itemOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-if="scope.row.category == 3" filterable v-model="scope.row.itemId" placeholder="请选择" @change="selectcItem" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in productOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-if="scope.row.category == 4" v-model="scope.row.itemId" disabled placeholder="无" size="mini" style="width: 120px;"></el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="subClassify" label="子分类" width="180">
                    <template slot-scope="scope">
                        <el-select
                            v-if="scope.row.category == 1 && scope.row.mainClassify == 1"
                            v-model="scope.row.subClassify"
                            placeholder="请选择"
                            size="mini"
                            style="width: 120px;"
                        >
                            <el-option v-for="(item, index) in subClassifyOptions_1" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select
                            v-if="scope.row.category == 1 && scope.row.mainClassify == 2"
                            v-model="scope.row.subClassify"
                            placeholder="请选择"
                            size="mini"
                            style="width: 120px;"
                        >
                            <el-option v-for="(item, index) in subClassifyOptions_2" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select
                            v-if="scope.row.category == 1 && scope.row.mainClassify == 3"
                            v-model="scope.row.subClassify"
                            placeholder="请选择"
                            size="mini"
                            style="width: 120px;"
                        >
                            <el-option v-for="(item, index) in subClassifyOptions_3" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select
                            v-if="scope.row.category == 1 && scope.row.mainClassify == 4"
                            v-model="scope.row.subClassify"
                            placeholder="请选择"
                            size="mini"
                            style="width: 120px;"
                        >
                            <el-option v-for="(item, index) in subClassifyOptions_4" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select
                            v-if="scope.row.category == 1 && scope.row.mainClassify == 5"
                            v-model="scope.row.subClassify"
                            placeholder="请选择"
                            size="mini"
                            style="width: 120px;"
                        >
                            <el-option v-for="(item, index) in subClassifyOptions_5" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-if="scope.row.category == 2" v-model="scope.row.subClassify" placeholder="请选择" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in subClassifyOptions_6" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-if="scope.row.category == 3" v-model="scope.row.subClassify" placeholder="请选择" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in subClassifyOptions_7" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-if="scope.row.category == 4" v-model="scope.row.subClassify" placeholder="请选择" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in subClassifyOptions_8" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="reason" label="工作内容" width="320">
                    <template slot-scope="scope">
                        <el-input type="textarea" size="mini" v-model="scope.row.reason" placeholder="请填写工作内容" maxlength="50" show-word-limit></el-input>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="approverids" label="验收人" width="140">
                    <template slot-scope="scope">
                        <el-select v-if="scope.row.category == '2'||scope.row.category == '3'" v-model="scope.row.approverids" placeholder="请选择" size="mini">
                            <el-option v-for="(item, index) in applyUserList" :label="item.label" :key="index" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-if="scope.row.category == '1'||scope.row.category == '4'" v-model="scope.row.approverids" placeholder="请选择" size="mini">
                            <el-option v-for="(item, index) in applyUserList2" :label="item.label" :key="index" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="complete" label="完成情况" width="140">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.complete" placeholder="请选择" size="mini" style="width: 120px;">
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
                            v-model="scope.row.useHour"
                            size="small"
                            controls-position="right"
                            :precision="1"
                            :step="0.5"
                            :min="0.0"
                            step-strictly
                            :max="maxUseHour_5"
                        ></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="address" label="操作" width="140">
                    <template slot-scope="scope">
                        <el-button type="danger" icon="el-icon-delete" circle @click="deleteRow_5(scope.$index)"></el-button>
                        <el-button type="primary" icon="el-icon-plus" circle @click="addRow_5()"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="primary" style="margin-left: 45%;margin-top: 3%;" @click="submit_5()">提交</el-button>
        </el-row>

        <el-row style="padding: 0 15px; margin-bottom: 30px;" v-if="day_6 != ''">
            <div class="top">
                <span>未填报日期 : {{ day_6.day }}</span>
                <span class="HourFloat" v-if="dayHourInt_6 > 0">
                    <el-rate
                        disabled
                        show-score
                        text-color="#ff9900"
                        v-model="dayHourFloat_6"
                        :max="dayHourInt_6"
                        :icon-classes="['icon iconfont iconjitui', 'icon iconfont iconjitui', 'icon iconfont iconjitui']"
                        disabled-void-icon-class="icon iconfont iconjitui"
                        :colors="['#FF9900', '#FF9900', '#FF9900']"
                    ></el-rate>
                </span>
                <span>
                    <el-select v-model="tableData_6[0].integral" :placeholder="String(tableData_6[0].integral)" size="mini" style="width: 80px;">
                        <el-option v-for="(item, index) in integralOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </span>
                <el-button type="info" icon="el-icon-document-copy" style="margin-left: 3%" circle @click="copyCode_6()"></el-button>
            </div>
            <el-table :data="tableData_6" style="width: 100%">
                <el-table-column align="center" prop="category" label="工作类别" width="140">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.category" placeholder="请选择" size="mini" style="width: 120px;" @change="selectcCategory">
                            <el-option v-for="(item, index) in categoryOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="mainClassify" label="主分类" width="180">
                    <template slot-scope="scope">
                        <el-select v-if="scope.row.category == 1" v-model="scope.row.mainClassify" placeholder="请选择" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in mainClassifyOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-if="scope.row.category == 2" filterable v-model="scope.row.itemId" placeholder="请选择" @change="selectcItem" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in itemOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-if="scope.row.category == 3" filterable v-model="scope.row.itemId" placeholder="请选择" @change="selectcItem" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in productOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-if="scope.row.category == 4" v-model="scope.row.itemId" disabled placeholder="无" size="mini" style="width: 120px;"></el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="subClassify" label="子分类" width="180">
                    <template slot-scope="scope">
                        <el-select
                            v-if="scope.row.category == 1 && scope.row.mainClassify == 1"
                            v-model="scope.row.subClassify"
                            placeholder="请选择"
                            size="mini"
                            style="width: 120px;"
                        >
                            <el-option v-for="(item, index) in subClassifyOptions_1" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select
                            v-if="scope.row.category == 1 && scope.row.mainClassify == 2"
                            v-model="scope.row.subClassify"
                            placeholder="请选择"
                            size="mini"
                            style="width: 120px;"
                        >
                            <el-option v-for="(item, index) in subClassifyOptions_2" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select
                            v-if="scope.row.category == 1 && scope.row.mainClassify == 3"
                            v-model="scope.row.subClassify"
                            placeholder="请选择"
                            size="mini"
                            style="width: 120px;"
                        >
                            <el-option v-for="(item, index) in subClassifyOptions_3" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select
                            v-if="scope.row.category == 1 && scope.row.mainClassify == 4"
                            v-model="scope.row.subClassify"
                            placeholder="请选择"
                            size="mini"
                            style="width: 120px;"
                        >
                            <el-option v-for="(item, index) in subClassifyOptions_4" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select
                            v-if="scope.row.category == 1 && scope.row.mainClassify == 5"
                            v-model="scope.row.subClassify"
                            placeholder="请选择"
                            size="mini"
                            style="width: 120px;"
                        >
                            <el-option v-for="(item, index) in subClassifyOptions_5" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-if="scope.row.category == 2" v-model="scope.row.subClassify" placeholder="请选择" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in subClassifyOptions_6" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-if="scope.row.category == 3" v-model="scope.row.subClassify" placeholder="请选择" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in subClassifyOptions_7" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-if="scope.row.category == 4" v-model="scope.row.subClassify" placeholder="请选择" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in subClassifyOptions_8" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="reason" label="工作内容" width="320">
                    <template slot-scope="scope">
                        <el-input type="textarea" size="mini" v-model="scope.row.reason" placeholder="请填写工作内容" maxlength="50" show-word-limit></el-input>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="approverids" label="验收人" width="140">
                    <template slot-scope="scope">
                        <el-select v-if="scope.row.category == '2'||scope.row.category == '3'" v-model="scope.row.approverids" placeholder="请选择" size="mini">
                            <el-option v-for="(item, index) in applyUserList" :label="item.label" :key="index" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-if="scope.row.category == '1'||scope.row.category == '4'" v-model="scope.row.approverids" placeholder="请选择" size="mini">
                            <el-option v-for="(item, index) in applyUserList2" :label="item.label" :key="index" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="complete" label="完成情况" width="140">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.complete" placeholder="请选择" size="mini" style="width: 120px;">
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
                            v-model="scope.row.useHour"
                            size="small"
                            controls-position="right"
                            :precision="1"
                            :step="0.5"
                            step-strictly
                            :min="0.0"
                            :max="maxUseHour_6"
                        ></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="address" label="操作" width="140">
                    <template slot-scope="scope">
                        <el-button type="danger" icon="el-icon-delete" circle @click="deleteRow_6(scope.$index)"></el-button>
                        <el-button type="primary" icon="el-icon-plus" circle @click="addRow_6()"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="primary" style="margin-left: 45%;margin-top: 3%;" @click="submit_6()">提交</el-button>
        </el-row>

        <el-row style="padding: 0 15px; margin-bottom: 30px;" v-if="day_7 != ''">
            <div class="top">
                <span>未填报日期 : {{ day_7.day }}</span>
                <span class="HourFloat" v-if="dayHourInt_7 > 0">
                    <el-rate
                        disabled
                        show-score
                        text-color="#ff9900"
                        v-model="dayHourFloat_7"
                        :max="dayHourInt_7"
                        :icon-classes="['icon iconfont iconjitui', 'icon iconfont iconjitui', 'icon iconfont iconjitui']"
                        disabled-void-icon-class="icon iconfont iconjitui"
                        :colors="['#FF9900', '#FF9900', '#FF9900']"
                    ></el-rate>
                </span>
                <span>
                    <el-select v-model="tableData_7[0].integral" :placeholder="String(tableData_7[0].integral)" size="mini" style="width: 80px;">
                        <el-option v-for="(item, index) in integralOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </span>
                <el-button type="info" icon="el-icon-document-copy" style="margin-left: 3%" circle @click="copyCode_7()"></el-button>
            </div>
            <el-table :data="tableData_7" style="width: 100%">
                <el-table-column align="center" prop="category" label="工作类别" width="140">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.category" placeholder="请选择" size="mini" style="width: 120px;" @change="selectcCategory">
                            <el-option v-for="(item, index) in categoryOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="mainClassify" label="主分类" width="180">
                    <template slot-scope="scope">
                        <el-select v-if="scope.row.category == 1" v-model="scope.row.mainClassify" placeholder="请选择" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in mainClassifyOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-if="scope.row.category == 2" filterable v-model="scope.row.itemId" placeholder="请选择" @change="selectcItem" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in itemOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-if="scope.row.category == 3" filterable v-model="scope.row.itemId" placeholder="请选择" @change="selectcItem" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in productOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-if="scope.row.category == 4" v-model="scope.row.itemId" disabled placeholder="无" size="mini" style="width: 120px;"></el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="subClassify" label="子分类" width="180">
                    <template slot-scope="scope">
                        <el-select
                            v-if="scope.row.category == 1 && scope.row.mainClassify == 1"
                            v-model="scope.row.subClassify"
                            placeholder="请选择"
                            size="mini"
                            style="width: 120px;"
                        >
                            <el-option v-for="(item, index) in subClassifyOptions_1" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select
                            v-if="scope.row.category == 1 && scope.row.mainClassify == 2"
                            v-model="scope.row.subClassify"
                            placeholder="请选择"
                            size="mini"
                            style="width: 120px;"
                        >
                            <el-option v-for="(item, index) in subClassifyOptions_2" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select
                            v-if="scope.row.category == 1 && scope.row.mainClassify == 3"
                            v-model="scope.row.subClassify"
                            placeholder="请选择"
                            size="mini"
                            style="width: 120px;"
                        >
                            <el-option v-for="(item, index) in subClassifyOptions_3" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select
                            v-if="scope.row.category == 1 && scope.row.mainClassify == 4"
                            v-model="scope.row.subClassify"
                            placeholder="请选择"
                            size="mini"
                            style="width: 120px;"
                        >
                            <el-option v-for="(item, index) in subClassifyOptions_4" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select
                            v-if="scope.row.category == 1 && scope.row.mainClassify == 5"
                            v-model="scope.row.subClassify"
                            placeholder="请选择"
                            size="mini"
                            style="width: 120px;"
                        >
                            <el-option v-for="(item, index) in subClassifyOptions_5" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-if="scope.row.category == 2" v-model="scope.row.subClassify" placeholder="请选择" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in subClassifyOptions_6" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-if="scope.row.category == 3" v-model="scope.row.subClassify" placeholder="请选择" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in subClassifyOptions_7" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-if="scope.row.category == 4" v-model="scope.row.subClassify" placeholder="请选择" size="mini" style="width: 120px;">
                            <el-option v-for="(item, index) in subClassifyOptions_8" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="reason" label="工作内容" width="320">
                    <template slot-scope="scope">
                        <el-input type="textarea" size="mini" v-model="scope.row.reason" placeholder="请填写工作内容" maxlength="50" show-word-limit></el-input>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="approverids" label="验收人" width="140">
                    <template slot-scope="scope">
                        <el-select v-if="scope.row.category == '2'||scope.row.category == '3'" v-model="scope.row.approverids" placeholder="请选择" size="mini">
                            <el-option v-for="(item, index) in applyUserList" :label="item.label" :key="index" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-if="scope.row.category == '1'||scope.row.category == '4'" v-model="scope.row.approverids" placeholder="请选择" size="mini">
                            <el-option v-for="(item, index) in applyUserList2" :label="item.label" :key="index" :value="item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="complete" label="完成情况" width="140">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.complete" placeholder="请选择" size="mini" style="width: 120px;">
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
                            v-model="scope.row.useHour"
                            size="small"
                            controls-position="right"
                            :precision="1"
                            :step="0.5"
                            :min="0.0"
                            step-strictly
                            :max="maxUseHour7"
                        ></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="address" label="操作" width="140">
                    <template slot-scope="scope">
                        <el-button type="danger" icon="el-icon-delete" circle @click="deleteRow_7(scope.$index)"></el-button>
                        <el-button type="primary" icon="el-icon-plus" circle @click="addRow_7()"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="primary" style="margin-left: 45%;margin-top: 3%;" @click="submit_7()">提交</el-button>
        </el-row>

        <el-button type="primary" class="invoiceRules" @click="open">工时规范</el-button>
    </div>
</template>
<script>
import { getUserInfo } from '../../../api/admin/user.js'
import { addObj, editObj } from '../../../api/apply/manhour.js';
import { getApplyUserInfo } from '../../../api/admin/user.js';
import { getAbnormalSeven, getClockHourInfo } from '../../../api/checkwork/hour.js';
import { getItemVosWithUserId } from '../../../api/project/team.js';
import { getStandardApplyInfoById } from '../../../api/standard/apply.js';
import { mapGetters } from 'vuex';
export default {
    inject:['reload'],
    data() {
        return {
            value: '',
            day_1: '',
            day_2: '',
            day_3: '',
            day_4: '',
            day_5: '',
            day_6: '',
            day_7: '',
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
                    useMin: 0
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
                    useMin: 0
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
                    useMin: 0
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
                    useMin: 0
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
                    useMin: 0
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
                    useMin: 0
                }
            ],
            tableData_7: [
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
                    useMin: 0
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
            dayHourInt_7: 0.0,
            maxUseHour_1: 0.0,
            maxUseHour_2: 0.0,
            maxUseHour_3: 0.0,
            maxUseHour_4: 0.0,
            maxUseHour_5: 0.0,
            maxUseHour_6: 0.0,
            maxUseHour_7: 0.0,
            oldList:[],
            Hour_1:'',
            Hour_2:'',
            Hour_3:'',
            Hour_4:'',
            Hour_5:'',
            Hour_6:'',
            Hour_7:'',
            dayOptions: [],
            integralOptions: [
                { value: 0, label: '0分' },
                { value: 1, label: '1分' },
                { value: 2, label: '2分' },
                { value: 3, label: '3分' },
                { value: 4, label: '4分' },
                { value: 5, label: '5分' }
            ],
            categoryOptions: [{ value: '1', label: '管理' }, { value: '2', label: '项目' }, { value: '3', label: '产品' }, { value: '4', label: '长身体' }],
            mainClassifyOptions: [
                { value: '1', label: '公司管理' },
                { value: '2', label: '财务管理' },
                { value: '3', label: '人事管理' },
                { value: '4', label: '部门管理' },
                { value: '5', label: '工厂管理' }
            ],
            subClassifyOptions_1: [
                { value: '1', label: '公司战略规划' },
                { value: '2', label: '客户对接' },
                { value: '3', label: '项目对接' },
                { value: '4', label: '人员管理及招聘' },
                { value: '5', label: '其他事务' }
            ],
            subClassifyOptions_2: [
                { value: '1', label: '开票' },
                { value: '2', label: '支付' },
                { value: '3', label: '税筹' },
                { value: '4', label: '账务处理' },
                { value: '5', label: '预算' },
                { value: '6', label: '补贴申报' },
                { value: '7', label: '其他事务' }
            ],
            subClassifyOptions_3: [
                { value: '1', label: '薪酬福利管理' },
                { value: '2', label: '考勤管理' },
                { value: '3', label: '员工入职手续办理' },
                { value: '4', label: '招聘' },
                { value: '5', label: '培训' },
                { value: '6', label: '员工关系管理' },
                { value: '7', label: '其他事务' }
            ],
            subClassifyOptions_4: [
                { value: '1', label: '人员招聘' },
                { value: '2', label: '人员管理及培训' },
                { value: '3', label: '部门发展计划' },
                { value: '4', label: '工作流程' },
                { value: '5', label: '其他日常事务' }
            ],
            subClassifyOptions_5: [{ value: '1', label: '工厂备料' }, { value: '2', label: '环境卫生' }, { value: '3', label: '房租水电' }, { value: '4', label: '其他事务' }],
            subClassifyOptions_6: [
                { value: '1', label: '管理' },
                { value: '2', label: '销售' },
                { value: '3', label: '售前' },
                { value: '4', label: '交付' },
                { value: '5', label: '产品' }
            ],
            subClassifyOptions_7: [{ value: '1', label: '管理' }, { value: '2', label: '交付' }],
            subClassifyOptions_8: [{ value: '1', label: '学习' }, { value: '2', label: '吃饭' }, { value: '3', label: '长身体' }],
            itemOptions: [],
            productOptions: [],
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
            userList:[],
            applyUserList: [{ value: 0, label: '无人验收' }],
            applyUserList2: [{ value: 0, label: '无人验收' }],
            applyClockInfo: '',
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < new Date().getTime() - 3600 * 1000 * 24 * 1 || time.getTime() > new Date().getTime() + 3600 * 1000 * 24 * 20;
                }
            }
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
        this.tableData_7[0].userId = this.userId;
        this.query.userId = this.userId;
        this.getAbnormalSeven();
        this.getItemVosWithUserId();
        this.getUserInfo()
        // var lists = JSON.parse(localStorage.getItem('oldList'))
        // if(lists.length!=0){
        //     this.oldList = JSON.parse(localStorage.getItem('oldList'))
        // }else{
        //     this.oldList = []
        // }

    },
    computed: {
        ...mapGetters(['permissions', 'userId']),
    },
    methods: {
        // 获取个人信息
        getUserInfo(){
            getUserInfo(this.query.userId).then(res=>{
              console.log(res)
              this.userList = res.data.data
            })
        },
        // 删除行
        deleteRow_1(index) {
            this.tableData_1.splice(index, 1);
        },
        deleteRow_2(index) {
            this.tableData_2.splice(index, 1);
        },
        deleteRow_3(index) {
            this.tableData_3.splice(index, 1);
        },
        deleteRow_4(index) {
            this.tableData_4.splice(index, 1);
        },
        deleteRow_5(index) {
            this.tableData_5.splice(index, 1);
        },
        deleteRow_6(index) {
            this.tableData_6.splice(index, 1);
        },
        deleteRow_7(index) {
            this.tableData_7.splice(index, 1);
        },

        // 增加行
        addRow_1() {
            // this.applyUserList = [{ value: 0, label: '无人验收' }];
            var list = {
                // 自评分
                integral: this.tableData_1[0].integral,
                // 个人id
                userId: this.tableData_1[0].userId,
                // 工时id
                hourId: this.tableData_1[0].hourId,
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
                useMin: '',
                useHour: '',
                // 填报日期
                day: this.tableData_1[0].day
            };
            this.tableData_1.push(list);
            if (this.tableData_1.length > 5) {
                this.tableData_1.length = 5;
            }
        },
        addRow_2() {
            // this.applyUserList = [{ value: 0, label: '无人验收' }];
            var list = {
                // 自评分
                integral: this.tableData_2[0].integral,
                // 个人id
                userId: this.tableData_2[0].userId,
                // 工时id
                hourId: this.tableData_2[0].hourId,
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
                useHour: '',
                useMin: '',
                // 填报日期
                day: this.tableData_2[0].day
            };
            this.tableData_2.push(list);
            if (this.tableData_2.length > 5) {
                this.tableData_2.length = 5;
            }
        },
        addRow_3() {
            // this.applyUserList = [{ value: 0, label: '无人验收' }];
            var list = {
                // 自评分
                integral: this.tableData_3[0].integral,
                // 个人id
                userId: this.tableData_3[0].userId,
                // 工时id
                hourId: this.tableData_3[0].hourId,
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
                useHour: '',
                useMin: '',
                // 填报日期
                day: this.tableData_3[0].day
            };
            this.tableData_3.push(list);
            if (this.tableData_3.length > 5) {
                this.tableData_3.length = 5;
            }
        },
        addRow_4() {
            // this.applyUserList = [{ value: 0, label: '无人验收' }];
            var list = {
                // 自评分
                integral: this.tableData_4[0].integral,
                // 个人id
                userId: this.tableData_4[0].userId,
                // 工时id
                hourId: this.tableData_4[0].hourId,
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
                useHour: '',
                useMin: '',
                // 填报日期
                day: this.tableData_4[0].day
            };
            this.tableData_4.push(list);
            if (this.tableData_4.length > 5) {
                this.tableData_4.length = 5;
            }
        },
        addRow_5() {
            // this.applyUserList = [{ value: 0, label: '无人验收' }];
            var list = {
                // 自评分
                integral: this.tableData_5[0].integral,
                // 个人id
                userId: this.tableData_5[0].userId,
                // 工时id
                hourId: this.tableData_5[0].hourId,
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
                useHour: '',
                useMin: '',
                // 填报日期
                day: this.tableData_5[0].day
            };
            this.tableData_5.push(list);
            if (this.tableData_5.length > 5) {
                this.tableData_5.length = 5;
            }
        },
        addRow_6() {
            // this.applyUserList = [{ value: 0, label: '无人验收' }];
            var list = {
                // 自评分
                integral: this.tableData_6[0].integral,
                // 个人id
                userId: this.tableData_6[0].userId,
                // 工时id
                hourId: this.tableData_6[0].hourId,
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
                useHour: '',
                useMin: '',
                // 填报日期
                day: this.tableData_6[0].day
            };
            this.tableData_6.push(list);
            if (this.tableData_6.length > 5) {
                this.tableData_6.length = 5;
            }
        },
        addRow_7() {
            // this.applyUserList = [{ value: 0, label: '无人验收' }];
            var list = {
                // 自评分
                integral: this.tableData_7[0].integral,
                // 个人id
                userId: this.tableData_7[0].userId,
                // 工时id
                hourId: this.tableData_7[0].hourId,
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
                useHour: '',
                useMin: '',
                // 填报日期
                day: this.tableData_7[0].day
            };
            this.tableData_7.push(list);
            if (this.tableData_7.length > 5) {
                this.tableData_7.length = 5;
            }
        },

        // 提交
        submit_1() {

               // for (var i=0;i<this.tableData_1.length;i++){
               //     this.oldList.push(this.tableData_1[i])
               // }
               // localStorage.setItem('oldList',JSON.stringify(this.oldList))
            var num = 0;
            for (var i = 0; i < this.tableData_1.length; i++) {
                if (this.tableData_1[i].useHour > 0) {
                    this.tableData_1[i].useMin = this.tableData_1[i].useHour * 60;
                }
                num += this.tableData_1[i].useHour;
            }
            if (num > this.dayHourFloat_1) {
                this.$message({
                    message: '填报工时超过未填报工时数，请重新选择！',
                    type: 'warning'
                });
            } else {
                if(this.tableData_1[0].integral!=0){
                    console.log(this.tableData_1)
                    for(var i=0;i<this.tableData_1.length;i++){
                        if(this.tableData_1[i].reason==''||this.tableData_1[i].useHour==0){
                            this.$alert('请查看是否有未填写项！', '提示', {
                                confirmButtonText: '确定',
                                type: 'warning'
                            })
                            return
                        }
                    }
                    addObj(this.tableData_1)
                        .then(() => {
                            this.$nextTick(() => {
                                this.getAbnormalSeven();
                                this.selectWorkDay_1(this.day_1.hourId);
                            });
                           this.reload();
                        })
                }else {
                    this.$message({
                        message: '请选择评分！',
                        type: 'warning'
                    });
                }

            }
        },
        submit_2() {
            console.log(this.tableData_2);
            var num = 0;
            for (var i = 0; i < this.tableData_2.length; i++) {
                if (this.tableData_2[i].useHour > 0) {
                    this.tableData_2[i].useMin = this.tableData_2[i].useHour * 60;
                }
                num += this.tableData_2[i].useHour;
            }
            if (num > this.dayHourFloat_2) {
                this.$message({
                    message: '填报工时超过未填报工时数，请重新选择！',
                    type: 'warning'
                });
            } else {
                if(this.tableData_2[0].integral!=0){
                    for(var i=0;i<this.tableData_2.length;i++){
                        if(this.tableData_2[i].reason==''||this.tableData_2[i].useHour==0){
                            this.$alert('请查看是否有未填写项！', '提示', {
                                confirmButtonText: '确定',
                                type: 'warning'
                            })
                            return
                        }
                    }
                    addObj(this.tableData_2)
                        .then(() => {
                            this.$nextTick(() => {
                                this.getAbnormalSeven();
                                this.selectWorkDay_2(this.day_2.hourId);
                            });
                           this.reload();
                        })
                }else {
                    this.$message({
                        message: '请选择评分！',
                        type: 'warning'
                    });
                }
            }
        },
        submit_3() {
            console.log(this.tableData_3);
            var num = 0;
            for (var i = 0; i < this.tableData_3.length; i++) {
                if (this.tableData_3[i].useHour > 0) {
                    this.tableData_3[i].useMin = this.tableData_3[i].useHour * 60;
                }
                num += this.tableData_3[i].useHour;
            }
            if (num > this.dayHourFloat_3) {
                this.$message({
                    message: '填报工时超过未填报工时数，请重新选择！',
                    type: 'warning'
                });
            } else {
                if(this.tableData_3[0].integral!=0){
                    for(var i=0;i<this.tableData_3.length;i++){
                        if(this.tableData_3[i].reason==''||this.tableData_3[i].useHour==0){
                            this.$alert('请查看是否有未填写项！', '提示', {
                                confirmButtonText: '确定',
                                type: 'warning'
                            })
                            return
                        }
                    }
                    addObj(this.tableData_3)
                        .then(() => {
                            this.$nextTick(() => {
                                this.getAbnormalSeven();
                                this.selectWorkDay_3(this.day_3.hourId);
                            });
                           this.reload();
                        })
                }else {
                    this.$message({
                        message: '请选择评分！',
                        type: 'warning'
                    });
                }
            }
        },
        submit_4() {
            console.log(this.tableData_4);
            var num = 0;
            for (var i = 0; i < this.tableData_4.length; i++) {
                if (this.tableData_4[i].useHour > 0) {
                    this.tableData_4[i].useMin = this.tableData_4[i].useHour * 60;
                }
                num += this.tableData_4[i].useHour;
            }
            if (num > this.dayHourFloat_4) {
                this.$message({
                    message: '填报工时超过未填报工时数，请重新选择！',
                    type: 'warning'
                });
            } else {
                if(this.tableData_4[0].integral!=0){
                    for(var i=0;i<this.tableData_4.length;i++){
                        if(this.tableData_4[i].reason==''||this.tableData_4[i].useHour==0){
                            this.$alert('请查看是否有未填写项！', '提示', {
                                confirmButtonText: '确定',
                                type: 'warning'
                            })
                            return
                        }
                    }
                    addObj(this.tableData_4)
                        .then(() => {
                            this.$nextTick(() => {
                                this.getAbnormalSeven();
                                this.selectWorkDay_4(this.day_4.hourId);
                            });
                           this.reload();
                        })
                }else {
                    this.$message({
                        message: '请选择评分！',
                        type: 'warning'
                    });
                }
            }
        },
        submit_5() {
            console.log(this.tableData_5);
            var num = 0;
            for (var i = 0; i < this.tableData_5.length; i++) {
                if (this.tableData_5[i].useHour > 0) {
                    this.tableData_5[i].useMin = this.tableData_5[i].useHour * 60;
                }
                num += this.tableData_5[i].useHour;
            }
            if (num > this.dayHourFloat_5) {
                this.$message({
                    message: '填报工时超过未填报工时数，请重新选择！',
                    type: 'warning'
                });
            } else {
               if(this.tableData_5[0].integral!=0){
                   for(var i=0;i<this.tableData_5.length;i++){
                       if(this.tableData_5[i].reason==''||this.tableData_5[i].useHour==0){
                           this.$alert('请查看是否有未填写项！', '提示', {
                               confirmButtonText: '确定',
                               type: 'warning'
                           })
                           return
                       }
                   }
                   addObj(this.tableData_5)
                       .then(() => {
                           this.$nextTick(() => {
                               this.getAbnormalSeven();
                               this.selectWorkDay_5(this.day_5.hourId);
                           });
                          this.reload();
                       })
               }else {
                   this.$message({
                       message: '请选择评分！',
                       type: 'warning'
                   });
               }
            }
        },
        submit_6() {
            console.log(this.tableData_6);
            var num = 0;
            for (var i = 0; i < this.tableData_6.length; i++) {
                if (this.tableData_6[i].useHour > 0) {
                    this.tableData_6[i].useMin = this.tableData_6[i].useHour * 60;
                }
                num += this.tableData_6[i].useHour;
            }
            if (num > this.dayHourFloat_6) {
                this.$message({
                    message: '填报工时超过未填报工时数，请重新选择！',
                    type: 'warning'
                });
            } else {
                if(this.tableData_6[0].integral!=0){
                    for(var i=0;i<this.tableData_6.length;i++){
                        if(this.tableData_6[i].reason==''||this.tableData_6[i].useHour==0){
                            this.$alert('请查看是否有未填写项！', '提示', {
                                confirmButtonText: '确定',
                                type: 'warning'
                            })
                            return
                        }
                    }
                    addObj(this.tableData_6)
                        .then(() => {
                            this.$nextTick(() => {
                                this.getAbnormalSeven();
                                this.selectWorkDay_6(this.day_6.hourId);
                            });
                           this.reload();
                        })
                }else {
                    this.$message({
                        message: '请选择评分！',
                        type: 'warning'
                    });
                }
            }
        },
        submit_7() {
            console.log(this.tableData_7);
            var num = 0;
            for (var i = 0; i < this.tableData_7.length; i++) {
                if (this.tableData_7[i].useHour > 0) {
                    this.tableData_7[i].useMin = this.tableData_7[i].useHour * 60;
                }
                num += this.tableData_7[i].useHour;
            }
            if (num > this.dayHourFloat_7) {
                this.$message({
                    message: '填报工时超过未填报工时数，请重新选择！',
                    type: 'warning'
                });
            } else {
                if(this.tableData_7[0].integral!=0){
                    for(var i=0;i<this.tableData_7.length;i++){
                        if(this.tableData_7[i].reason==''||this.tableData_7[i].useHour==0){
                            this.$alert('请查看是否有未填写项！', '提示', {
                                confirmButtonText: '确定',
                                type: 'warning'
                            })
                            return
                        }
                    }
                    addObj(this.tableData_7)
                        .then(() => {
                            this.$nextTick(() => {
                                this.getAbnormalSeven();
                                this.selectWorkDay_7(this.day_7.hourId);
                            });
                           this.reload();
                        })
                }else {
                    this.$message({
                        message: '请选择评分！',
                        type: 'warning'
                    });
                }
            }
        },

        // 获取鸡腿数量 最大工时
        selectWorkDay_1(val) {
            getClockHourInfo(val).then(response => {
                const clockHourInfo = response.data.data;
                this.tableData_1[0].day = clockHourInfo.day;
                this.tableData_1[0].hourId = clockHourInfo.hourId;
                this.tableData_1[0].integral = clockHourInfo.integral;
                this.Hour_1 = clockHourInfo.hour
                this.dayHourInt_1 = Math.ceil(clockHourInfo.hour);
                var hour = parseFloat((parseFloat(clockHourInfo.hour) - parseFloat(clockHourInfo.useHour)).toString()).toFixed(1);
                var num2 = parseInt(hour)
                var num3 = (hour - num2).toFixed(1)
                    if (num3 < 0.5 && num3 != 0.0) {
                        num3 = 0.5
                        hour  = num2 + num3
                    } else if (num3 = 0.0) {
                        hour = num2
                    }
                    else {
                        hour = Math.round(hour)
                    }
                this.dayHourFloat_1 = parseFloat(hour);
                this.maxUseHour_1 = parseFloat(hour)
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
                this.Hour_2 = clockHourInfo.hour
                this.dayHourInt_2 = Math.ceil(clockHourInfo.hour);
                var hour = parseFloat((parseFloat(clockHourInfo.hour) - parseFloat(clockHourInfo.useHour)).toString()).toFixed(1);
                var num2 = parseInt(hour)
                var num3 = (hour - num2).toFixed(1)
                    if (num3 < 0.5 && num3 != 0.0) {
                        num3 = 0.5
                        hour  = num2 + num3
                    } else if (num3 = 0.0) {
                        hour = num2
                    }
                    else {
                        hour = Math.round(hour)
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
                this.Hour_3 = clockHourInfo.hour
                this.dayHourInt_3 = Math.ceil(clockHourInfo.hour);
                var hour = parseFloat((parseFloat(clockHourInfo.hour) - parseFloat(clockHourInfo.useHour)).toString()).toFixed(1);
                var num2 = parseInt(hour)
                var num3 = (hour - num2).toFixed(1)
                    if (num3 < 0.5 && num3 != 0.0) {
                        num3 = 0.5
                        hour  = num2 + num3
                    } else if (num3 = 0.0) {
                        hour = num2
                    }
                    else {
                        hour = Math.round(hour)
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
                this.Hour_4 = clockHourInfo.hour
                this.dayHourInt_4 = Math.ceil(clockHourInfo.hour);
                var hour = parseFloat((parseFloat(clockHourInfo.hour) - parseFloat(clockHourInfo.useHour)).toString()).toFixed(1);
                var num2 = parseInt(hour)
                var num3 = (hour - num2).toFixed(1)
                    if (num3 < 0.5 && num3 != 0.0) {
                        num3 = 0.5
                        hour  = num2 + num3
                    } else if (num3 = 0.0) {
                        hour = num2
                    }
                    else {
                        hour = Math.round(hour)
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
                this.Hour_5 = clockHourInfo.hour
                this.dayHourInt_5 = Math.ceil(clockHourInfo.hour);
                var hour = parseFloat((parseFloat(clockHourInfo.hour) - parseFloat(clockHourInfo.useHour)).toString()).toFixed(1);
                var num2 = parseInt(hour)
                var num3 = (hour - num2).toFixed(1)
                    if (num3 < 0.5 && num3 != 0.0) {
                        num3 = 0.5
                        hour  = num2 + num3
                    } else if (num3 = 0.0) {
                        hour = num2
                    }
                    else {
                        hour = Math.round(hour)
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
                this.Hour_6 = clockHourInfo.hour
                this.dayHourInt_6 = Math.ceil(clockHourInfo.hour);
                var hour = parseFloat((parseFloat(clockHourInfo.hour) - parseFloat(clockHourInfo.useHour)).toString()).toFixed(1);
                var num2 = parseInt(hour)
                var num3 = (hour - num2).toFixed(1)
                    if (num3 < 0.5 && num3 != 0.0) {
                        num3 = 0.5
                        hour  = num2 + num3
                    } else if (num3 = 0.0) {
                        hour = num2
                    }
                    else {
                        hour = Math.round(hour)
                    }
                this.dayHourFloat_6 = parseFloat(hour);
                this.maxUseHour_6 = parseFloat(hour);
            });
        },
        selectWorkDay_7(val) {
            getClockHourInfo(val).then(response => {
                const clockHourInfo = response.data.data;
                this.tableData_7[0].day = clockHourInfo.day;
                this.tableData_7[0].integral = clockHourInfo.integral;
                this.tableData_7[0].hourId = clockHourInfo.hourId;
                this.Hour_7 = clockHourInfo.hour
                this.dayHourInt_7 = Math.ceil(clockHourInfo.hour);
                var hour = parseFloat((parseFloat(clockHourInfo.hour) - parseFloat(clockHourInfo.useHour)).toString()).toFixed(1);

                this.dayHourFloat_7 = parseFloat(hour);
                this.maxUseHour_7 = parseFloat(hour);
            });
        },

        //  非项目产品时 验收人清空
        selectcCategory(val) {
            if (val == 2 || val == 3) {
                this.getApplyUser();
            } else {
                this.applyUserList2 = [{ value: 0, label: '无人验收' }];
            }
        },

        // 获取项目产品验收人
        selectcItem(val) {
            console.log(val)
            this.query.itemId = val;
            this.getApplyUser();
        },

        // 验收人
        getApplyUser() {
            this.applyUserList = [{ value: 0, label: '无人验收' }]
            getApplyUserInfo(this.query).then(response => {
                // console.log(response);
                response.data.data.forEach(element => {
                    this.applyUserList.push({
                        value: element.userId,
                        label: element.username
                    });
                });
                this.applyUserList = this.applyUserList.filter(item=>item.value!=this.query.userId)
                // 去重
                var newArr= []
                var obj = {}
                for (var i = 0; i < this.applyUserList.length; i++) {
                    if (!obj[this.applyUserList[i].value]) {
                       newArr.push(this.applyUserList[i]);
                       obj[this.applyUserList[i].value] = true;
                    }
                }
                this.applyUserList = newArr
            });
            // console.log(this.applyUserList);
        },

        // 未填报日期
        getAbnormalSeven() {
            getAbnormalSeven(this.query.userId).then(response => {
                this.dayOptions = response.data.data;
                this.dayOptions = this.dayOptions.filter(item => item.min > 0 && Number(item.hour) > Number(item.useHour));
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
                if (this.dayOptions[6] == undefined) {
                    this.day_7 = '';
                } else {
                    this.day_7 = this.dayOptions[6];
                    this.selectWorkDay_7(this.day_7.hourId);
                }
            });
        },

        // 项目产品列表
        getItemVosWithUserId() {
            getItemVosWithUserId(this.query.userId).then(response => {
                response.data.data.forEach(element => {
                    if (element.type == 1) {
                        this.itemOptions.push({
                            value: element.itemId,
                            label: element.alias
                        });
                    }
                    if (element.type == 2) {
                        this.productOptions.push({
                            value: element.itemId,
                            label: element.alias
                        });
                    }
                });
            });
        },

        getStandardApplyInfo() {
            getStandardApplyInfoById(1).then(response => {
                if (response.data.data) {
                    const data = response.data.data;
                    console.log(data)
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
        },

        // 拷贝内容
        copyCode_1() {
            this.$message({
                message: '已成功复制填报信息！',
                type: 'success'
            });
            // 验收人
            var name_1 = ''
            var name_2 = ''
            var name_3 = ''
            var name_4 = ''
            var name_5 = ''
            // 项目产品
            var itemName_1=''
            var itemName_2=''
            var itemName_3=''
            var itemName_4=''
            var itemName_5=''
            if(this.tableData_1.length == 1){
                // 验收人
                for(var i=0;i<this.applyUserList.length;i++){
                    if(this.applyUserList[i].value==this.tableData_1[0].i){
                        name_1 = this.applyUserList[i].label
                    }
                }
                // 项目
                for(var j=0;j<this.itemOptions.length;j++){
                    if(this.itemOptions[j].value == this.tableData_1[0].itemId){
                        itemName_1 = this.itemOptions[j].label
                    }
                }
                // 产品
                for (var k=0 ;k<this.productOptions.length; k++){
                    if(this.productOptions[k].value == this.tableData_1[0].itemId){
                        itemName_1 = this.productOptions[k].label
                    }
                }
              this.$copyText(
                `${this.day_1.day}-${this.userList.deptName}--${this.userList.username}--${this.tableData_1[0].integral}
${itemName_1}-${this.tableData_1[0].reason}-${this.tableData_1[0].complete==100?'已完成':'未完成'}-${this.tableData_1[0].complete!=100?`预计 ${this.tableData_1[0].completeTime} 完成`:''}-${this.tableData_1[0].approverids == 0?'无人验收':`${name_1}验收`}-${this.Hour_1}/${this.tableData_1[0].useHour}`
              ).then(res => {
                console.log(res);
                // this.$toast("已成功复制，可直接去粘贴");
              });
            }
            if(this.tableData_1.length == 2){
                for(var i=0;i<this.applyUserList.length;i++){
                    if(this.applyUserList[i].value==this.tableData_1[0].approverids){
                        name_1 = this.applyUserList[i].label
                    }
                    if(this.applyUserList[i].value==this.tableData_1[1].approverids){
                        name_2 = this.applyUserList[i].label
                    }
                }
                // 项目
                for(var j=0;j<this.itemOptions.length;j++){
                    if(this.itemOptions[j].value == this.tableData_1[0].itemId){
                        itemName_1 = this.itemOptions[j].label
                    }
                    if(this.itemOptions[j].value == this.tableData_1[1].itemId){
                        itemName_2 = this.itemOptions[j].label
                    }
                }
                // 产品
                for (var k=0 ;k<this.productOptions.length; k++){
                    if(this.productOptions[k].value == this.tableData_1[0].itemId){
                        itemName_1 = this.productOptions[k].label
                    }
                    if(this.productOptions[k].value == this.tableData_1[1].itemId){
                        itemName_2 = this.productOptions[k].label
                    }
                }
                this.$copyText(
                  `${this.day_1.day}-${this.userList.deptName}--${this.userList.username}--${this.tableData_1[0].integral}
${itemName_1}-${this.tableData_1[0].reason}-${this.tableData_1[0].complete==100?'已完成':'未完成'}-${this.tableData_1[0].complete!=100?`预计 ${this.tableData_1[0].completeTime} 完成`:''}-${this.tableData_1[0].approverids == 0?'无人验收':`${name_1}验收`}-${this.Hour_1}/${this.tableData_1[0].useHour}
${itemName_2}-${this.tableData_1[1].reason}-${this.tableData_1[1].complete==100?'已完成':'未完成'}-${this.tableData_1[1].complete!=100?`预计 ${this.tableData_1[1].completeTime} 完成`:''}-${this.tableData_1[1].approverids == 0?'无人验收':`${name_2}验收`}-${this.Hour_1}/${this.tableData_1[1].useHour}`
                ).then(res => {
                  console.log(res);
                  // this.$toast("已成功复制，可直接去粘贴");
                });
            }
            if(this.tableData_1.length == 3){
                for(var i=0;i<this.applyUserList.length;i++){
                    if(this.applyUserList[i].value==this.tableData_1[0].approverids){
                        name_1 = this.applyUserList[i].label
                    }
                    if(this.applyUserList[i].value==this.tableData_1[1].approverids){
                        name_2 = this.applyUserList[i].label
                    }
                    if(this.applyUserList[i].value==this.tableData_1[2].approverids){
                        name_3 = this.applyUserList[i].label
                    }
                }
                // 项目
                for(var j=0;j<this.itemOptions.length;j++){
                    if(this.itemOptions[j].value == this.tableData_1[0].itemId){
                        itemName_1 = this.itemOptions[j].label
                    }
                    if(this.itemOptions[j].value == this.tableData_1[1].itemId){
                        itemName_2 = this.itemOptions[j].label
                    }
                    if(this.itemOptions[j].value == this.tableData_1[2].itemId){
                        itemName_3 = this.itemOptions[j].label
                    }
                }
                // 产品
                for (var k=0 ;k<this.productOptions.length; k++){
                    if(this.productOptions[k].value == this.tableData_1[0].itemId){
                        itemName_1 = this.productOptions[k].label
                    }
                    if(this.productOptions[k].value == this.tableData_1[1].itemId){
                        itemName_2 = this.productOptions[k].label
                    }
                    if(this.productOptions[k].value == this.tableData_1[2].itemId){
                        itemName_3 = this.productOptions[k].label
                    }
                }
                this.$copyText(
                  `${this.day_1.day}-${this.userList.deptName}--${this.userList.username}--${this.tableData_1[0].integral}
${itemName_1}-${this.tableData_1[0].reason}-${this.tableData_1[0].complete==100?'已完成':'未完成'}-${this.tableData_1[0].complete!=100?`预计 ${this.tableData_1[0].completeTime} 完成`:''}-${this.tableData_1[0].approverids == 0?'无人验收':`${name_1}验收`}-${this.Hour_1}/${this.tableData_1[0].useHour}
${itemName_2}-${this.tableData_1[1].reason}-${this.tableData_1[1].complete==100?'已完成':'未完成'}-${this.tableData_1[1].complete!=100?`预计 ${this.tableData_1[1].completeTime} 完成`:''}-${this.tableData_1[1].approverids == 0?'无人验收':`${name_2}验收`}-${this.Hour_1}/${this.tableData_1[1].useHour}
${itemName_3}-${this.tableData_1[2].reason}-${this.tableData_1[2].complete==100?'已完成':'未完成'}-${this.tableData_1[1].complete!=100?`预计 ${this.tableData_1[2].completeTime} 完成`:''}-${this.tableData_1[2].approverids == 0?'无人验收':`${name_3}验收`}-${this.Hour_1}/${this.tableData_1[2].useHour}`
                ).then(res => {
                  console.log(res);
                  // this.$toast("已成功复制，可直接去粘贴");
                });
            }
            if(this.tableData_1.length == 4){
                for(var i=0;i<this.applyUserList.length;i++){
                    if(this.applyUserList[i].value==this.tableData_1[0].approverids){
                        name_1 = this.applyUserList[i].label
                    }
                    if(this.applyUserList[i].value==this.tableData_1[1].approverids){
                        name_2 = this.applyUserList[i].label
                    }
                    if(this.applyUserList[i].value==this.tableData_1[2].approverids){
                        name_3 = this.applyUserList[i].label
                    }
                    if(this.applyUserList[i].value==this.tableData_1[3].approverids){
                        name_4 = this.applyUserList[i].label
                    }
                }
                // 项目
                for(var j=0;j<this.itemOptions.length;j++){
                    if(this.itemOptions[j].value == this.tableData_1[0].itemId){
                        itemName_1 = this.itemOptions[j].label
                    }
                    if(this.itemOptions[j].value == this.tableData_1[1].itemId){
                        itemName_2 = this.itemOptions[j].label
                    }
                    if(this.itemOptions[j].value == this.tableData_1[2].itemId){
                        itemName_3 = this.itemOptions[j].label
                    }
                    if(this.itemOptions[j].value == this.tableData_1[3].itemId){
                        itemName_4 = this.itemOptions[j].label
                    }
                }
                // 产品
                for (var k=0 ;k<this.productOptions.length; k++){
                    if(this.productOptions[k].value == this.tableData_1[0].itemId){
                        itemName_1 = this.productOptions[k].label
                    }
                    if(this.productOptions[k].value == this.tableData_1[1].itemId){
                        itemName_2 = this.productOptions[k].label
                    }
                    if(this.productOptions[k].value == this.tableData_1[2].itemId){
                        itemName_3 = this.productOptions[k].label
                    }
                    if(this.productOptions[k].value == this.tableData_1[3].itemId){
                        itemName_4 = this.productOptions[k].label
                    }
                }
                this.$copyText(
                  `${this.day_1.day}-${this.userList.deptName}--${this.userList.username}--${this.tableData_1[0].integral}
${itemName_1}-${this.tableData_1[0].reason}-${this.tableData_1[0].complete==100?'已完成':'未完成'}-${this.tableData_1[0].complete!=100?`预计 ${this.tableData_1[0].completeTime} 完成`:''}-${this.tableData_1[0].approverids == 0?'无人验收':`${name_1}验收`}-${this.Hour_1}/${this.tableData_1[0].useHour}
${itemName_2}-${this.tableData_1[1].reason}-${this.tableData_1[1].complete==100?'已完成':'未完成'}-${this.tableData_1[1].complete!=100?`预计 ${this.tableData_1[1].completeTime} 完成`:''}-${this.tableData_1[1].approverids == 0?'无人验收':`${name_2}验收`}-${this.Hour_1}/${this.tableData_1[1].useHour}
${itemName_3}-${this.tableData_1[2].reason}-${this.tableData_1[2].complete==100?'已完成':'未完成'}-${this.tableData_1[2].complete!=100?`预计 ${this.tableData_1[2].completeTime} 完成`:''}-${this.tableData_1[2].approverids == 0?'无人验收':`${name_3}验收`}-${this.Hour_1}/${this.tableData_1[2].useHour}
${itemName_4}-${this.tableData_1[3].reason}-${this.tableData_1[3].complete==100?'已完成':'未完成'}-${this.tableData_1[3].complete!=100?`预计 ${this.tableData_1[3].completeTime} 完成`:''}-${this.tableData_1[3].approverids == 0?'无人验收':`${name_4}验收`}-${this.Hour_1}/${this.tableData_1[3].useHour}`
                ).then(res => {
                  console.log(res);
                  // this.$toast("已成功复制，可直接去粘贴");
                });
            }
            if(this.tableData_1.length == 5){
                for(var i=0;i<this.applyUserList.length;i++){
                    if(this.applyUserList[i].value==this.tableData_1[0].approverids){
                        name_1 = this.applyUserList[i].label
                    }
                    if(this.applyUserList[i].value==this.tableData_1[1].approverids){
                        name_2 = this.applyUserList[i].label
                    }
                    if(this.applyUserList[i].value==this.tableData_1[2].approverids){
                        name_3 = this.applyUserList[i].label
                    }
                    if(this.applyUserList[i].value==this.tableData_1[3].approverids){
                        name_4 = this.applyUserList[i].label
                    }
                    if(this.applyUserList[i].value==this.tableData_1[4].approverids){
                        name_5 = this.applyUserList[i].label
                    }
                }
                // 项目
                for(var j=0;j<this.itemOptions.length;j++){
                    if(this.itemOptions[j].value == this.tableData_1[0].itemId){
                        itemName_1 = this.itemOptions[j].label
                    }
                    if(this.itemOptions[j].value == this.tableData_1[1].itemId){
                        itemName_2 = this.itemOptions[j].label
                    }
                    if(this.itemOptions[j].value == this.tableData_1[2].itemId){
                        itemName_3 = this.itemOptions[j].label
                    }
                    if(this.itemOptions[j].value == this.tableData_1[3].itemId){
                        itemName_4 = this.itemOptions[j].label
                    }
                    if(this.itemOptions[j].value == this.tableData_1[4].itemId){
                        itemName_5 = this.itemOptions[j].label
                    }
                }
                // 产品
                for (var k=0 ;k<this.productOptions.length; k++){
                    if(this.productOptions[k].value == this.tableData_1[0].itemId){
                        itemName_1 = this.productOptions[k].label
                    }
                    if(this.productOptions[k].value == this.tableData_1[1].itemId){
                        itemName_2 = this.productOptions[k].label
                    }
                    if(this.productOptions[k].value == this.tableData_1[2].itemId){
                        itemName_3 = this.productOptions[k].label
                    }
                    if(this.productOptions[k].value == this.tableData_1[3].itemId){
                        itemName_4 = this.productOptions[k].label
                    }
                    if(this.productOptions[k].value == this.tableData_1[4].itemId){
                        itemName_5 = this.productOptions[k].label
                    }
                }
                this.$copyText(
                  `${this.day_1.day}-${this.userList.deptName}--${this.userList.username}--${this.tableData_1[0].integral}
${itemName_1}-${this.tableData_1[0].reason}-${this.tableData_1[0].complete==100?'已完成':'未完成'}-${this.tableData_1[0].complete!=100?`预计 ${this.tableData_1[0].completeTime} 完成`:''}-${this.tableData_1[0].approverids == 0?'无人验收':`${name_1}验收`}-${this.Hour_1}/${this.tableData_1[0].useHour}
${itemName_2}-${this.tableData_1[1].reason}-${this.tableData_1[1].complete==100?'已完成':'未完成'}-${this.tableData_1[1].complete!=100?`预计 ${this.tableData_1[1].completeTime} 完成`:''}-${this.tableData_1[1].approverids == 0?'无人验收':`${name_2}验收`}-${this.Hour_1}/${this.tableData_1[1].useHour}
${itemName_3}-${this.tableData_1[2].reason}-${this.tableData_1[2].complete==100?'已完成':'未完成'}-${this.tableData_1[2].complete!=100?`预计 ${this.tableData_1[2].completeTime} 完成`:''}-${this.tableData_1[2].approverids == 0?'无人验收':`${name_3}验收`}-${this.Hour_1}/${this.tableData_1[2].useHour}
${itemName_4}-${this.tableData_1[3].reason}-${this.tableData_1[3].complete==100?'已完成':'未完成'}-${this.tableData_1[3].complete!=100?`预计 ${this.tableData_1[3].completeTime} 完成`:''}-${this.tableData_1[3].approverids == 0?'无人验收':`${name_4}验收`}-${this.Hour_1}/${this.tableData_1[3].useHour}
${itemName_5}-${this.tableData_1[4].reason}-${this.tableData_1[4].complete==100?'已完成':'未完成'}-${this.tableData_1[4].complete!=100?`预计 ${this.tableData_1[4].completeTime} 完成`:''}-${this.tableData_1[4].approverids == 0?'无人验收':`${name_5}验收`}-${this.Hour_1}/${this.tableData_1[4].useHour}`
                ).then(res => {
                  console.log(res);
                  // this.$toast("已成功复制，可直接去粘贴");
                });
            }

        },
        copyCode_2() {
            this.$message({
                message: '已成功复制填报信息！',
                type: 'success'
            });
            // 验收人
            var name_1 = ''
            var name_2 = ''
            var name_3 = ''
            var name_4 = ''
            var name_5 = ''
            // 项目产品
            var itemName_1=''
            var itemName_2=''
            var itemName_3=''
            var itemName_4=''
            var itemName_5=''
           if(this.tableData_2.length == 1){
               // 验收人
               for(var i=0;i<this.applyUserList.length;i++){
                   if(this.applyUserList[i].value==this.tableData_2[0].i){
                       name_1 = this.applyUserList[i].label
                   }
               }
               // 项目
               for(var j=0;j<this.itemOptions.length;j++){
                   if(this.itemOptions[j].value == this.tableData_2[0].itemId){
                       itemName_1 = this.itemOptions[j].label
                   }
               }
               // 产品
               for (var k=0 ;k<this.productOptions.length; k++){
                   if(this.productOptions[k].value == this.tableData_2[0].itemId){
                       itemName_1 = this.productOptions[k].label
                   }
               }
             this.$copyText(
               `${this.day_2.day}-${this.userList.deptName}--${this.userList.username}--${this.tableData_2[0].integral}
${itemName_1}-${this.tableData_2[0].reason}-${this.tableData_2[0].complete==100?'已完成':'未完成'}-${this.tableData_2[0].complete!=100?`预计 ${this.tableData_2[0].completeTime} 完成`:''}-${this.tableData_2[0].approverids == 0?'无人验收':`${name_1}验收`}-${this.Hour_1}/${this.tableData_2[0].useHour}`
             ).then(res => {
               console.log(res);
               // this.$toast("已成功复制，可直接去粘贴");
             });
           }
           if(this.tableData_2.length == 2){
               for(var i=0;i<this.applyUserList.length;i++){
                   if(this.applyUserList[i].value==this.tableData_2[0].approverids){
                       name_1 = this.applyUserList[i].label
                   }
                   if(this.applyUserList[i].value==this.tableData_2[1].approverids){
                       name_2 = this.applyUserList[i].label
                   }
               }
               // 项目
               for(var j=0;j<this.itemOptions.length;j++){
                   if(this.itemOptions[j].value == this.tableData_2[0].itemId){
                       itemName_1 = this.itemOptions[j].label
                   }
                   if(this.itemOptions[j].value == this.tableData_2[1].itemId){
                       itemName_2 = this.itemOptions[j].label
                   }
               }
               // 产品
               for (var k=0 ;k<this.productOptions.length; k++){
                   if(this.productOptions[k].value == this.tableData_2[0].itemId){
                       itemName_1 = this.productOptions[k].label
                   }
                   if(this.productOptions[k].value == this.tableData_2[1].itemId){
                       itemName_2 = this.productOptions[k].label
                   }
               }
               this.$copyText(
                 `${this.day_2.day}-${this.userList.deptName}--${this.userList.username}--${this.tableData_2[0].integral}
${itemName_1}-${this.tableData_2[0].reason}-${this.tableData_2[0].complete==100?'已完成':'未完成'}-${this.tableData_2[0].complete!=100?`预计 ${this.tableData_2[0].completeTime} 完成`:''}-${this.tableData_2[0].approverids == 0?'无人验收':`${name_1}验收`}-${this.Hour_1}/${this.tableData_2[0].useHour}
${itemName_2}-${this.tableData_2[1].reason}-${this.tableData_2[1].complete==100?'已完成':'未完成'}-${this.tableData_2[1].complete!=100?`预计 ${this.tableData_2[1].completeTime} 完成`:''}-${this.tableData_2[1].approverids == 0?'无人验收':`${name_2}验收`}-${this.Hour_1}/${this.tableData_2[1].useHour}`
               ).then(res => {
                 console.log(res);
                 // this.$toast("已成功复制，可直接去粘贴");
               });
           }
           if(this.tableData_2.length == 3){
               for(var i=0;i<this.applyUserList.length;i++){
                   if(this.applyUserList[i].value==this.tableData_2[0].approverids){
                       name_1 = this.applyUserList[i].label
                   }
                   if(this.applyUserList[i].value==this.tableData_2[1].approverids){
                       name_2 = this.applyUserList[i].label
                   }
                   if(this.applyUserList[i].value==this.tableData_2[2].approverids){
                       name_3 = this.applyUserList[i].label
                   }
               }
               // 项目
               for(var j=0;j<this.itemOptions.length;j++){
                   if(this.itemOptions[j].value == this.tableData_2[0].itemId){
                       itemName_1 = this.itemOptions[j].label
                   }
                   if(this.itemOptions[j].value == this.tableData_2[1].itemId){
                       itemName_2 = this.itemOptions[j].label
                   }
                   if(this.itemOptions[j].value == this.tableData_2[2].itemId){
                       itemName_3 = this.itemOptions[j].label
                   }
               }
               // 产品
               for (var k=0 ;k<this.productOptions.length; k++){
                   if(this.productOptions[k].value == this.tableData_2[0].itemId){
                       itemName_1 = this.productOptions[k].label
                   }
                   if(this.productOptions[k].value == this.tableData_2[1].itemId){
                       itemName_2 = this.productOptions[k].label
                   }
                   if(this.productOptions[k].value == this.tableData_2[2].itemId){
                       itemName_3 = this.productOptions[k].label
                   }
               }
               this.$copyText(
                 `${this.day_2.day}-${this.userList.deptName}--${this.userList.username}--${this.tableData_2[0].integral}
${itemName_1}-${this.tableData_2[0].reason}-${this.tableData_2[0].complete==100?'已完成':'未完成'}-${this.tableData_2[0].complete!=100?`预计 ${this.tableData_2[0].completeTime} 完成`:''}-${this.tableData_2[0].approverids == 0?'无人验收':`${name_1}验收`}-${this.Hour_1}/${this.tableData_2[0].useHour}
${itemName_2}-${this.tableData_2[1].reason}-${this.tableData_2[1].complete==100?'已完成':'未完成'}-${this.tableData_2[1].complete!=100?`预计 ${this.tableData_2[1].completeTime} 完成`:''}-${this.tableData_2[1].approverids == 0?'无人验收':`${name_2}验收`}-${this.Hour_1}/${this.tableData_2[1].useHour}
${itemName_3}-${this.tableData_2[2].reason}-${this.tableData_2[2].complete==100?'已完成':'未完成'}-${this.tableData_2[1].complete!=100?`预计 ${this.tableData_2[2].completeTime} 完成`:''}-${this.tableData_2[2].approverids == 0?'无人验收':`${name_3}验收`}-${this.Hour_1}/${this.tableData_2[2].useHour}`
               ).then(res => {
                 console.log(res);
                 // this.$toast("已成功复制，可直接去粘贴");
               });
           }
           if(this.tableData_2.length == 4){
               for(var i=0;i<this.applyUserList.length;i++){
                   if(this.applyUserList[i].value==this.tableData_2[0].approverids){
                       name_1 = this.applyUserList[i].label
                   }
                   if(this.applyUserList[i].value==this.tableData_2[1].approverids){
                       name_2 = this.applyUserList[i].label
                   }
                   if(this.applyUserList[i].value==this.tableData_2[2].approverids){
                       name_3 = this.applyUserList[i].label
                   }
                   if(this.applyUserList[i].value==this.tableData_2[3].approverids){
                       name_4 = this.applyUserList[i].label
                   }
               }
               // 项目
               for(var j=0;j<this.itemOptions.length;j++){
                   if(this.itemOptions[j].value == this.tableData_2[0].itemId){
                       itemName_1 = this.itemOptions[j].label
                   }
                   if(this.itemOptions[j].value == this.tableData_2[1].itemId){
                       itemName_2 = this.itemOptions[j].label
                   }
                   if(this.itemOptions[j].value == this.tableData_2[2].itemId){
                       itemName_3 = this.itemOptions[j].label
                   }
                   if(this.itemOptions[j].value == this.tableData_2[3].itemId){
                       itemName_4 = this.itemOptions[j].label
                   }
               }
               // 产品
               for (var k=0 ;k<this.productOptions.length; k++){
                   if(this.productOptions[k].value == this.tableData_2[0].itemId){
                       itemName_1 = this.productOptions[k].label
                   }
                   if(this.productOptions[k].value == this.tableData_2[1].itemId){
                       itemName_2 = this.productOptions[k].label
                   }
                   if(this.productOptions[k].value == this.tableData_2[2].itemId){
                       itemName_3 = this.productOptions[k].label
                   }
                   if(this.productOptions[k].value == this.tableData_2[3].itemId){
                       itemName_4 = this.productOptions[k].label
                   }
               }
               this.$copyText(
                 `${this.day_2.day}-${this.userList.deptName}--${this.userList.username}--${this.tableData_2[0].integral}
${itemName_1}-${this.tableData_2[0].reason}-${this.tableData_2[0].complete==100?'已完成':'未完成'}-${this.tableData_2[0].complete!=100?`预计 ${this.tableData_2[0].completeTime} 完成`:''}-${this.tableData_2[0].approverids == 0?'无人验收':`${name_1}验收`}-${this.Hour_1}/${this.tableData_2[0].useHour}
${itemName_2}-${this.tableData_2[1].reason}-${this.tableData_2[1].complete==100?'已完成':'未完成'}-${this.tableData_2[1].complete!=100?`预计 ${this.tableData_2[1].completeTime} 完成`:''}-${this.tableData_2[1].approverids == 0?'无人验收':`${name_2}验收`}-${this.Hour_1}/${this.tableData_2[1].useHour}
${itemName_3}-${this.tableData_2[2].reason}-${this.tableData_2[2].complete==100?'已完成':'未完成'}-${this.tableData_2[2].complete!=100?`预计 ${this.tableData_2[2].completeTime} 完成`:''}-${this.tableData_2[2].approverids == 0?'无人验收':`${name_3}验收`}-${this.Hour_1}/${this.tableData_2[2].useHour}
${itemName_4}-${this.tableData_2[3].reason}-${this.tableData_2[3].complete==100?'已完成':'未完成'}-${this.tableData_2[3].complete!=100?`预计 ${this.tableData_2[3].completeTime} 完成`:''}-${this.tableData_2[3].approverids == 0?'无人验收':`${name_4}验收`}-${this.Hour_1}/${this.tableData_2[3].useHour}`
               ).then(res => {
                 console.log(res);
                 // this.$toast("已成功复制，可直接去粘贴");
               });
           }
           if(this.tableData_2.length == 5){
              for(var i=0;i<this.applyUserList.length;i++){
                  if(this.applyUserList[i].value==this.tableData_2[0].approverids){
                      name_1 = this.applyUserList[i].label
                  }
                  if(this.applyUserList[i].value==this.tableData_2[1].approverids){
                      name_2 = this.applyUserList[i].label
                  }
                  if(this.applyUserList[i].value==this.tableData_2[2].approverids){
                      name_3 = this.applyUserList[i].label
                  }
                  if(this.applyUserList[i].value==this.tableData_2[3].approverids){
                      name_4 = this.applyUserList[i].label
                  }
                  if(this.applyUserList[i].value==this.tableData_2[4].approverids){
                      name_5 = this.applyUserList[i].label
                  }
              }
              // 项目
              for(var j=0;j<this.itemOptions.length;j++){
                  if(this.itemOptions[j].value == this.tableData_2[0].itemId){
                      itemName_1 = this.itemOptions[j].label
                  }
                  if(this.itemOptions[j].value == this.tableData_2[1].itemId){
                      itemName_2 = this.itemOptions[j].label
                  }
                  if(this.itemOptions[j].value == this.tableData_2[2].itemId){
                      itemName_3 = this.itemOptions[j].label
                  }
                  if(this.itemOptions[j].value == this.tableData_2[3].itemId){
                      itemName_4 = this.itemOptions[j].label
                  }
                  if(this.itemOptions[j].value == this.tableData_2[4].itemId){
                      itemName_5 = this.itemOptions[j].label
                  }
              }
              // 产品
              for (var k=0 ;k<this.productOptions.length; k++){
                  if(this.productOptions[k].value == this.tableData_2[0].itemId){
                      itemName_1 = this.productOptions[k].label
                  }
                  if(this.productOptions[k].value == this.tableData_2[1].itemId){
                      itemName_2 = this.productOptions[k].label
                  }
                  if(this.productOptions[k].value == this.tableData_2[2].itemId){
                      itemName_3 = this.productOptions[k].label
                  }
                  if(this.productOptions[k].value == this.tableData_2[3].itemId){
                      itemName_4 = this.productOptions[k].label
                  }
                  if(this.productOptions[k].value == this.tableData_2[4].itemId){
                      itemName_5 = this.productOptions[k].label
                  }
              }
              this.$copyText(
                `${this.day_2.day}-${this.userList.deptName}--${this.userList.username}--${this.tableData_2[0].integral}
${itemName_1}-${this.tableData_2[0].reason}-${this.tableData_2[0].complete==100?'已完成':'未完成'}-${this.tableData_2[0].complete!=100?`预计 ${this.tableData_2[0].completeTime} 完成`:''}-${this.tableData_2[0].approverids == 0?'无人验收':`${name_1}验收`}-${this.Hour_1}/${this.tableData_2[0].useHour}
${itemName_2}-${this.tableData_2[1].reason}-${this.tableData_2[1].complete==100?'已完成':'未完成'}-${this.tableData_2[1].complete!=100?`预计 ${this.tableData_2[1].completeTime} 完成`:''}-${this.tableData_2[1].approverids == 0?'无人验收':`${name_2}验收`}-${this.Hour_1}/${this.tableData_2[1].useHour}
${itemName_3}-${this.tableData_2[2].reason}-${this.tableData_2[2].complete==100?'已完成':'未完成'}-${this.tableData_2[2].complete!=100?`预计 ${this.tableData_2[2].completeTime} 完成`:''}-${this.tableData_2[2].approverids == 0?'无人验收':`${name_3}验收`}-${this.Hour_1}/${this.tableData_2[2].useHour}
${itemName_4}-${this.tableData_2[3].reason}-${this.tableData_2[3].complete==100?'已完成':'未完成'}-${this.tableData_2[3].complete!=100?`预计 ${this.tableData_2[3].completeTime} 完成`:''}-${this.tableData_2[3].approverids == 0?'无人验收':`${name_4}验收`}-${this.Hour_1}/${this.tableData_2[3].useHour}
${itemName_5}-${this.tableData_2[4].reason}-${this.tableData_2[4].complete==100?'已完成':'未完成'}-${this.tableData_2[4].complete!=100?`预计 ${this.tableData_2[4].completeTime} 完成`:''}-${this.tableData_2[4].approverids == 0?'无人验收':`${name_5}验收`}-${this.Hour_1}/${this.tableData_2[4].useHour}`
              ).then(res => {
                console.log(res);
                // this.$toast("已成功复制，可直接去粘贴");
              });
          }
        },
        copyCode_3() {
            this.$message({
                message: '已成功复制填报信息！',
                type: 'success'
            });
           // 验收人
           var name_1 = ''
           var name_2 = ''
           var name_3 = ''
           var name_4 = ''
           var name_5 = ''
           // 项目产品
           var itemName_1=''
           var itemName_2=''
           var itemName_3=''
           var itemName_4=''
           var itemName_5=''
           if(this.tableData_3.length == 1){
               // 验收人
               for(var i=0;i<this.applyUserList.length;i++){
                   if(this.applyUserList[i].value==this.tableData_3[0].i){
                       name_1 = this.applyUserList[i].label
                   }
               }
               // 项目
               for(var j=0;j<this.itemOptions.length;j++){
                   if(this.itemOptions[j].value == this.tableData_3[0].itemId){
                       itemName_1 = this.itemOptions[j].label
                   }
               }
               // 产品
               for (var k=0 ;k<this.productOptions.length; k++){
                   if(this.productOptions[k].value == this.tableData_3[0].itemId){
                       itemName_1 = this.productOptions[k].label
                   }
               }
             this.$copyText(
               `${this.day_3.day}-${this.userList.deptName}--${this.userList.username}--${this.tableData_3[0].integral}
${itemName_1}-${this.tableData_3[0].reason}-${this.tableData_3[0].complete==100?'已完成':'未完成'}-${this.tableData_3[0].complete!=100?`预计 ${this.tableData_3[0].completeTime} 完成`:''}-${this.tableData_3[0].approverids == 0?'无人验收':`${name_1}验收`}-${this.Hour_1}/${this.tableData_3[0].useHour}`
             ).then(res => {
               console.log(res);
               // this.$toast("已成功复制，可直接去粘贴");
             });
           }
           if(this.tableData_3.length == 2){
               for(var i=0;i<this.applyUserList.length;i++){
                   if(this.applyUserList[i].value==this.tableData_3[0].approverids){
                       name_1 = this.applyUserList[i].label
                   }
                   if(this.applyUserList[i].value==this.tableData_3[1].approverids){
                       name_2 = this.applyUserList[i].label
                   }
               }
               // 项目
               for(var j=0;j<this.itemOptions.length;j++){
                   if(this.itemOptions[j].value == this.tableData_3[0].itemId){
                       itemName_1 = this.itemOptions[j].label
                   }
                   if(this.itemOptions[j].value == this.tableData_3[1].itemId){
                       itemName_2 = this.itemOptions[j].label
                   }
               }
               // 产品
               for (var k=0 ;k<this.productOptions.length; k++){
                   if(this.productOptions[k].value == this.tableData_3[0].itemId){
                       itemName_1 = this.productOptions[k].label
                   }
                   if(this.productOptions[k].value == this.tableData_3[1].itemId){
                       itemName_2 = this.productOptions[k].label
                   }
               }
               this.$copyText(
                 `${this.day_3.day}-${this.userList.deptName}--${this.userList.username}--${this.tableData_3[0].integral}
${itemName_1}-${this.tableData_3[0].reason}-${this.tableData_3[0].complete==100?'已完成':'未完成'}-${this.tableData_3[0].complete!=100?`预计 ${this.tableData_3[0].completeTime} 完成`:''}-${this.tableData_3[0].approverids == 0?'无人验收':`${name_1}验收`}-${this.Hour_1}/${this.tableData_3[0].useHour}
${itemName_2}-${this.tableData_3[1].reason}-${this.tableData_3[1].complete==100?'已完成':'未完成'}-${this.tableData_3[1].complete!=100?`预计 ${this.tableData_3[1].completeTime} 完成`:''}-${this.tableData_3[1].approverids == 0?'无人验收':`${name_2}验收`}-${this.Hour_1}/${this.tableData_3[1].useHour}`
               ).then(res => {
                 console.log(res);
                 // this.$toast("已成功复制，可直接去粘贴");
               });
           }
           if(this.tableData_3.length == 3){
                for(var i=0;i<this.applyUserList.length;i++){
                    if(this.applyUserList[i].value==this.tableData_3[0].approverids){
                        name_1 = this.applyUserList[i].label
                    }
                    if(this.applyUserList[i].value==this.tableData_3[1].approverids){
                        name_2 = this.applyUserList[i].label
                    }
                    if(this.applyUserList[i].value==this.tableData_3[2].approverids){
                        name_3 = this.applyUserList[i].label
                    }
                }
                // 项目
                for(var j=0;j<this.itemOptions.length;j++){
                    if(this.itemOptions[j].value == this.tableData_3[0].itemId){
                        itemName_1 = this.itemOptions[j].label
                    }
                    if(this.itemOptions[j].value == this.tableData_3[1].itemId){
                        itemName_2 = this.itemOptions[j].label
                    }
                    if(this.itemOptions[j].value == this.tableData_3[2].itemId){
                        itemName_3 = this.itemOptions[j].label
                    }
                }
                // 产品
                for (var k=0 ;k<this.productOptions.length; k++){
                    if(this.productOptions[k].value == this.tableData_3[0].itemId){
                        itemName_1 = this.productOptions[k].label
                    }
                    if(this.productOptions[k].value == this.tableData_3[1].itemId){
                        itemName_2 = this.productOptions[k].label
                    }
                    if(this.productOptions[k].value == this.tableData_3[2].itemId){
                        itemName_3 = this.productOptions[k].label
                    }
                }
                this.$copyText(
                  `${this.day_3.day}-${this.userList.deptName}--${this.userList.username}--${this.tableData_3[0].integral}
${itemName_1}-${this.tableData_3[0].reason}-${this.tableData_3[0].complete==100?'已完成':'未完成'}-${this.tableData_3[0].complete!=100?`预计 ${this.tableData_3[0].completeTime} 完成`:''}-${this.tableData_3[0].approverids == 0?'无人验收':`${name_1}验收`}-${this.Hour_1}/${this.tableData_3[0].useHour}
${itemName_2}-${this.tableData_3[1].reason}-${this.tableData_3[1].complete==100?'已完成':'未完成'}-${this.tableData_3[1].complete!=100?`预计 ${this.tableData_3[1].completeTime} 完成`:''}-${this.tableData_3[1].approverids == 0?'无人验收':`${name_2}验收`}-${this.Hour_1}/${this.tableData_3[1].useHour}
${itemName_3}-${this.tableData_3[2].reason}-${this.tableData_3[2].complete==100?'已完成':'未完成'}-${this.tableData_3[1].complete!=100?`预计 ${this.tableData_3[2].completeTime} 完成`:''}-${this.tableData_3[2].approverids == 0?'无人验收':`${name_3}验收`}-${this.Hour_1}/${this.tableData_3[2].useHour}`
                ).then(res => {
                  console.log(res);
                  // this.$toast("已成功复制，可直接去粘贴");
                });
            }
           if(this.tableData_3.length == 4){
                for(var i=0;i<this.applyUserList.length;i++){
                    if(this.applyUserList[i].value==this.tableData_3[0].approverids){
                        name_1 = this.applyUserList[i].label
                    }
                    if(this.applyUserList[i].value==this.tableData_3[1].approverids){
                        name_2 = this.applyUserList[i].label
                    }
                    if(this.applyUserList[i].value==this.tableData_3[2].approverids){
                        name_3 = this.applyUserList[i].label
                    }
                    if(this.applyUserList[i].value==this.tableData_3[3].approverids){
                        name_4 = this.applyUserList[i].label
                    }
                }
                // 项目
                for(var j=0;j<this.itemOptions.length;j++){
                    if(this.itemOptions[j].value == this.tableData_3[0].itemId){
                        itemName_1 = this.itemOptions[j].label
                    }
                    if(this.itemOptions[j].value == this.tableData_3[1].itemId){
                        itemName_2 = this.itemOptions[j].label
                    }
                    if(this.itemOptions[j].value == this.tableData_3[2].itemId){
                        itemName_3 = this.itemOptions[j].label
                    }
                    if(this.itemOptions[j].value == this.tableData_3[3].itemId){
                        itemName_4 = this.itemOptions[j].label
                    }
                }
                // 产品
                for (var k=0 ;k<this.productOptions.length; k++){
                    if(this.productOptions[k].value == this.tableData_3[0].itemId){
                        itemName_1 = this.productOptions[k].label
                    }
                    if(this.productOptions[k].value == this.tableData_3[1].itemId){
                        itemName_2 = this.productOptions[k].label
                    }
                    if(this.productOptions[k].value == this.tableData_3[2].itemId){
                        itemName_3 = this.productOptions[k].label
                    }
                    if(this.productOptions[k].value == this.tableData_3[3].itemId){
                        itemName_4 = this.productOptions[k].label
                    }
                }
                this.$copyText(
                  `${this.day_3.day}-${this.userList.deptName}--${this.userList.username}--${this.tableData_3[0].integral}
${itemName_1}-${this.tableData_3[0].reason}-${this.tableData_3[0].complete==100?'已完成':'未完成'}-${this.tableData_3[0].complete!=100?`预计 ${this.tableData_3[0].completeTime} 完成`:''}-${this.tableData_3[0].approverids == 0?'无人验收':`${name_1}验收`}-${this.Hour_1}/${this.tableData_3[0].useHour}
${itemName_2}-${this.tableData_3[1].reason}-${this.tableData_3[1].complete==100?'已完成':'未完成'}-${this.tableData_3[1].complete!=100?`预计 ${this.tableData_3[1].completeTime} 完成`:''}-${this.tableData_3[1].approverids == 0?'无人验收':`${name_2}验收`}-${this.Hour_1}/${this.tableData_3[1].useHour}
${itemName_3}-${this.tableData_3[2].reason}-${this.tableData_3[2].complete==100?'已完成':'未完成'}-${this.tableData_3[2].complete!=100?`预计 ${this.tableData_3[2].completeTime} 完成`:''}-${this.tableData_3[2].approverids == 0?'无人验收':`${name_3}验收`}-${this.Hour_1}/${this.tableData_3[2].useHour}
${itemName_4}-${this.tableData_3[3].reason}-${this.tableData_3[3].complete==100?'已完成':'未完成'}-${this.tableData_3[3].complete!=100?`预计 ${this.tableData_3[3].completeTime} 完成`:''}-${this.tableData_3[3].approverids == 0?'无人验收':`${name_4}验收`}-${this.Hour_1}/${this.tableData_3[3].useHour}`
                ).then(res => {
                  console.log(res);
                  // this.$toast("已成功复制，可直接去粘贴");
                });
            }
           if(this.tableData_3.length == 5){
               for(var i=0;i<this.applyUserList.length;i++){
                   if(this.applyUserList[i].value==this.tableData_3[0].approverids){
                       name_1 = this.applyUserList[i].label
                   }
                   if(this.applyUserList[i].value==this.tableData_3[1].approverids){
                       name_2 = this.applyUserList[i].label
                   }
                   if(this.applyUserList[i].value==this.tableData_3[2].approverids){
                       name_3 = this.applyUserList[i].label
                   }
                   if(this.applyUserList[i].value==this.tableData_3[3].approverids){
                       name_4 = this.applyUserList[i].label
                   }
                   if(this.applyUserList[i].value==this.tableData_3[4].approverids){
                       name_5 = this.applyUserList[i].label
                   }
               }
               // 项目
               for(var j=0;j<this.itemOptions.length;j++){
                   if(this.itemOptions[j].value == this.tableData_3[0].itemId){
                       itemName_1 = this.itemOptions[j].label
                   }
                   if(this.itemOptions[j].value == this.tableData_3[1].itemId){
                       itemName_2 = this.itemOptions[j].label
                   }
                   if(this.itemOptions[j].value == this.tableData_3[2].itemId){
                       itemName_3 = this.itemOptions[j].label
                   }
                   if(this.itemOptions[j].value == this.tableData_3[3].itemId){
                       itemName_4 = this.itemOptions[j].label
                   }
                   if(this.itemOptions[j].value == this.tableData_3[4].itemId){
                       itemName_5 = this.itemOptions[j].label
                   }
               }
               // 产品
               for (var k=0 ;k<this.productOptions.length; k++){
                   if(this.productOptions[k].value == this.tableData_3[0].itemId){
                       itemName_1 = this.productOptions[k].label
                   }
                   if(this.productOptions[k].value == this.tableData_3[1].itemId){
                       itemName_2 = this.productOptions[k].label
                   }
                   if(this.productOptions[k].value == this.tableData_3[2].itemId){
                       itemName_3 = this.productOptions[k].label
                   }
                   if(this.productOptions[k].value == this.tableData_3[3].itemId){
                       itemName_4 = this.productOptions[k].label
                   }
                   if(this.productOptions[k].value == this.tableData_3[4].itemId){
                       itemName_5 = this.productOptions[k].label
                   }
               }
               this.$copyText(
                 `${this.day_3.day}-${this.userList.deptName}--${this.userList.username}--${this.tableData_3[0].integral}
${itemName_1}-${this.tableData_3[0].reason}-${this.tableData_3[0].complete==100?'已完成':'未完成'}-${this.tableData_3[0].complete!=100?`预计 ${this.tableData_3[0].completeTime} 完成`:''}-${this.tableData_3[0].approverids == 0?'无人验收':`${name_1}验收`}-${this.Hour_1}/${this.tableData_3[0].useHour}
${itemName_2}-${this.tableData_3[1].reason}-${this.tableData_3[1].complete==100?'已完成':'未完成'}-${this.tableData_3[1].complete!=100?`预计 ${this.tableData_3[1].completeTime} 完成`:''}-${this.tableData_3[1].approverids == 0?'无人验收':`${name_2}验收`}-${this.Hour_1}/${this.tableData_3[1].useHour}
${itemName_3}-${this.tableData_3[2].reason}-${this.tableData_3[2].complete==100?'已完成':'未完成'}-${this.tableData_3[2].complete!=100?`预计 ${this.tableData_3[2].completeTime} 完成`:''}-${this.tableData_3[2].approverids == 0?'无人验收':`${name_3}验收`}-${this.Hour_1}/${this.tableData_3[2].useHour}
${itemName_4}-${this.tableData_3[3].reason}-${this.tableData_3[3].complete==100?'已完成':'未完成'}-${this.tableData_3[3].complete!=100?`预计 ${this.tableData_3[3].completeTime} 完成`:''}-${this.tableData_3[3].approverids == 0?'无人验收':`${name_4}验收`}-${this.Hour_1}/${this.tableData_3[3].useHour}
${itemName_5}-${this.tableData_3[4].reason}-${this.tableData_3[4].complete==100?'已完成':'未完成'}-${this.tableData_3[4].complete!=100?`预计 ${this.tableData_3[4].completeTime} 完成`:''}-${this.tableData_3[4].approverids == 0?'无人验收':`${name_5}验收`}-${this.Hour_1}/${this.tableData_3[4].useHour}`
               ).then(res => {
                 console.log(res);
                 // this.$toast("已成功复制，可直接去粘贴");
               });
           }
        },
        copyCode_4() {
            this.$message({
                message: '已成功复制填报信息！',
                type: 'success'
            });
            // 验收人
            var name_1 = ''
            var name_2 = ''
            var name_3 = ''
            var name_4 = ''
            var name_5 = ''
            // 项目产品
            var itemName_1=''
            var itemName_2=''
            var itemName_3=''
            var itemName_4=''
            var itemName_5=''
            if(this.tableData_4.length == 1){
                // 验收人
                for(var i=0;i<this.applyUserList.length;i++){
                    if(this.applyUserList[i].value==this.tableData_4[0].i){
                        name_1 = this.applyUserList[i].label
                    }
                }
                // 项目
                for(var j=0;j<this.itemOptions.length;j++){
                    if(this.itemOptions[j].value == this.tableData_4[0].itemId){
                        itemName_1 = this.itemOptions[j].label
                    }
                }
                // 产品
                for (var k=0 ;k<this.productOptions.length; k++){
                    if(this.productOptions[k].value == this.tableData_4[0].itemId){
                        itemName_1 = this.productOptions[k].label
                    }
                }
              this.$copyText(
                `${this.day_4.day}-${this.userList.deptName}--${this.userList.username}--${this.tableData_4[0].integral}
${itemName_1}-${this.tableData_4[0].reason}-${this.tableData_4[0].complete==100?'已完成':'未完成'}-${this.tableData_4[0].complete!=100?`预计 ${this.tableData_4[0].completeTime} 完成`:''}-${this.tableData_4[0].approverids == 0?'无人验收':`${name_1}验收`}-${this.Hour_1}/${this.tableData_4[0].useHour}`
              ).then(res => {
                console.log(res);
                // this.$toast("已成功复制，可直接去粘贴");
              });
            }
            if(this.tableData_4.length == 2){
                for(var i=0;i<this.applyUserList.length;i++){
                    if(this.applyUserList[i].value==this.tableData_4[0].approverids){
                        name_1 = this.applyUserList[i].label
                    }
                    if(this.applyUserList[i].value==this.tableData_4[1].approverids){
                        name_2 = this.applyUserList[i].label
                    }
                }
                // 项目
                for(var j=0;j<this.itemOptions.length;j++){
                    if(this.itemOptions[j].value == this.tableData_4[0].itemId){
                        itemName_1 = this.itemOptions[j].label
                    }
                    if(this.itemOptions[j].value == this.tableData_4[1].itemId){
                        itemName_2 = this.itemOptions[j].label
                    }
                }
                // 产品
                for (var k=0 ;k<this.productOptions.length; k++){
                    if(this.productOptions[k].value == this.tableData_4[0].itemId){
                        itemName_1 = this.productOptions[k].label
                    }
                    if(this.productOptions[k].value == this.tableData_4[1].itemId){
                        itemName_2 = this.productOptions[k].label
                    }
                }
                this.$copyText(
                  `${this.day_4.day}-${this.userList.deptName}--${this.userList.username}--${this.tableData_4[0].integral}
${itemName_1}-${this.tableData_4[0].reason}-${this.tableData_4[0].complete==100?'已完成':'未完成'}-${this.tableData_4[0].complete!=100?`预计 ${this.tableData_4[0].completeTime} 完成`:''}-${this.tableData_4[0].approverids == 0?'无人验收':`${name_1}验收`}-${this.Hour_1}/${this.tableData_4[0].useHour}
${itemName_2}-${this.tableData_4[1].reason}-${this.tableData_4[1].complete==100?'已完成':'未完成'}-${this.tableData_4[1].complete!=100?`预计 ${this.tableData_4[1].completeTime} 完成`:''}-${this.tableData_4[1].approverids == 0?'无人验收':`${name_2}验收`}-${this.Hour_1}/${this.tableData_4[1].useHour}`
                ).then(res => {
                  console.log(res);
                  // this.$toast("已成功复制，可直接去粘贴");
                });
            }
            if(this.tableData_4.length == 3){
                 for(var i=0;i<this.applyUserList.length;i++){
                     if(this.applyUserList[i].value==this.tableData_4[0].approverids){
                         name_1 = this.applyUserList[i].label
                     }
                     if(this.applyUserList[i].value==this.tableData_4[1].approverids){
                         name_2 = this.applyUserList[i].label
                     }
                     if(this.applyUserList[i].value==this.tableData_4[2].approverids){
                         name_3 = this.applyUserList[i].label
                     }
                 }
                 // 项目
                 for(var j=0;j<this.itemOptions.length;j++){
                     if(this.itemOptions[j].value == this.tableData_4[0].itemId){
                         itemName_1 = this.itemOptions[j].label
                     }
                     if(this.itemOptions[j].value == this.tableData_4[1].itemId){
                         itemName_2 = this.itemOptions[j].label
                     }
                     if(this.itemOptions[j].value == this.tableData_4[2].itemId){
                         itemName_3 = this.itemOptions[j].label
                     }
                 }
                 // 产品
                 for (var k=0 ;k<this.productOptions.length; k++){
                     if(this.productOptions[k].value == this.tableData_4[0].itemId){
                         itemName_1 = this.productOptions[k].label
                     }
                     if(this.productOptions[k].value == this.tableData_4[1].itemId){
                         itemName_2 = this.productOptions[k].label
                     }
                     if(this.productOptions[k].value == this.tableData_4[2].itemId){
                         itemName_3 = this.productOptions[k].label
                     }
                 }
                 this.$copyText(
                   `${this.day_4.day}-${this.userList.deptName}--${this.userList.username}--${this.tableData_4[0].integral}
${itemName_1}-${this.tableData_4[0].reason}-${this.tableData_4[0].complete==100?'已完成':'未完成'}-${this.tableData_4[0].complete!=100?`预计 ${this.tableData_4[0].completeTime} 完成`:''}-${this.tableData_4[0].approverids == 0?'无人验收':`${name_1}验收`}-${this.Hour_1}/${this.tableData_4[0].useHour}
${itemName_2}-${this.tableData_4[1].reason}-${this.tableData_4[1].complete==100?'已完成':'未完成'}-${this.tableData_4[1].complete!=100?`预计 ${this.tableData_4[1].completeTime} 完成`:''}-${this.tableData_4[1].approverids == 0?'无人验收':`${name_2}验收`}-${this.Hour_1}/${this.tableData_4[1].useHour}
${itemName_3}-${this.tableData_4[2].reason}-${this.tableData_4[2].complete==100?'已完成':'未完成'}-${this.tableData_4[1].complete!=100?`预计 ${this.tableData_4[2].completeTime} 完成`:''}-${this.tableData_4[2].approverids == 0?'无人验收':`${name_3}验收`}-${this.Hour_1}/${this.tableData_4[2].useHour}`
                 ).then(res => {
                   console.log(res);
                   // this.$toast("已成功复制，可直接去粘贴");
                 });
            }
            if(this.tableData_4.length == 4){
                  for(var i=0;i<this.applyUserList.length;i++){
                      if(this.applyUserList[i].value==this.tableData_4[0].approverids){
                          name_1 = this.applyUserList[i].label
                      }
                      if(this.applyUserList[i].value==this.tableData_4[1].approverids){
                          name_2 = this.applyUserList[i].label
                      }
                      if(this.applyUserList[i].value==this.tableData_4[2].approverids){
                          name_3 = this.applyUserList[i].label
                      }
                      if(this.applyUserList[i].value==this.tableData_4[3].approverids){
                          name_4 = this.applyUserList[i].label
                      }
                  }
                  // 项目
                  for(var j=0;j<this.itemOptions.length;j++){
                      if(this.itemOptions[j].value == this.tableData_4[0].itemId){
                          itemName_1 = this.itemOptions[j].label
                      }
                      if(this.itemOptions[j].value == this.tableData_4[1].itemId){
                          itemName_2 = this.itemOptions[j].label
                      }
                      if(this.itemOptions[j].value == this.tableData_4[2].itemId){
                          itemName_3 = this.itemOptions[j].label
                      }
                      if(this.itemOptions[j].value == this.tableData_4[3].itemId){
                          itemName_4 = this.itemOptions[j].label
                      }
                  }
                  // 产品
                  for (var k=0 ;k<this.productOptions.length; k++){
                      if(this.productOptions[k].value == this.tableData_4[0].itemId){
                          itemName_1 = this.productOptions[k].label
                      }
                      if(this.productOptions[k].value == this.tableData_4[1].itemId){
                          itemName_2 = this.productOptions[k].label
                      }
                      if(this.productOptions[k].value == this.tableData_4[2].itemId){
                          itemName_3 = this.productOptions[k].label
                      }
                      if(this.productOptions[k].value == this.tableData_4[3].itemId){
                          itemName_4 = this.productOptions[k].label
                      }
                  }
                  this.$copyText(
                    `${this.day_4.day}-${this.userList.deptName}--${this.userList.username}--${this.tableData_4[0].integral}
${itemName_1}-${this.tableData_4[0].reason}-${this.tableData_4[0].complete==100?'已完成':'未完成'}-${this.tableData_4[0].complete!=100?`预计 ${this.tableData_4[0].completeTime} 完成`:''}-${this.tableData_4[0].approverids == 0?'无人验收':`${name_1}验收`}-${this.Hour_1}/${this.tableData_4[0].useHour}
${itemName_2}-${this.tableData_4[1].reason}-${this.tableData_4[1].complete==100?'已完成':'未完成'}-${this.tableData_4[1].complete!=100?`预计 ${this.tableData_4[1].completeTime} 完成`:''}-${this.tableData_4[1].approverids == 0?'无人验收':`${name_2}验收`}-${this.Hour_1}/${this.tableData_4[1].useHour}
${itemName_3}-${this.tableData_4[2].reason}-${this.tableData_4[2].complete==100?'已完成':'未完成'}-${this.tableData_4[2].complete!=100?`预计 ${this.tableData_4[2].completeTime} 完成`:''}-${this.tableData_4[2].approverids == 0?'无人验收':`${name_3}验收`}-${this.Hour_1}/${this.tableData_4[2].useHour}
${itemName_4}-${this.tableData_4[3].reason}-${this.tableData_4[3].complete==100?'已完成':'未完成'}-${this.tableData_4[3].complete!=100?`预计 ${this.tableData_4[3].completeTime} 完成`:''}-${this.tableData_4[3].approverids == 0?'无人验收':`${name_4}验收`}-${this.Hour_1}/${this.tableData_4[3].useHour}`
                  ).then(res => {
                    console.log(res);
                    // this.$toast("已成功复制，可直接去粘贴");
                  });
            }
            if(this.tableData_4.length == 5){
                for(var i=0;i<this.applyUserList.length;i++){
                    if(this.applyUserList[i].value==this.tableData_4[0].approverids){
                        name_1 = this.applyUserList[i].label
                    }
                    if(this.applyUserList[i].value==this.tableData_4[1].approverids){
                        name_2 = this.applyUserList[i].label
                    }
                    if(this.applyUserList[i].value==this.tableData_4[2].approverids){
                        name_3 = this.applyUserList[i].label
                    }
                    if(this.applyUserList[i].value==this.tableData_4[3].approverids){
                        name_4 = this.applyUserList[i].label
                    }
                    if(this.applyUserList[i].value==this.tableData_4[4].approverids){
                        name_5 = this.applyUserList[i].label
                    }
                }
                // 项目
                for(var j=0;j<this.itemOptions.length;j++){
                    if(this.itemOptions[j].value == this.tableData_4[0].itemId){
                        itemName_1 = this.itemOptions[j].label
                    }
                    if(this.itemOptions[j].value == this.tableData_4[1].itemId){
                        itemName_2 = this.itemOptions[j].label
                    }
                    if(this.itemOptions[j].value == this.tableData_4[2].itemId){
                        itemName_3 = this.itemOptions[j].label
                    }
                    if(this.itemOptions[j].value == this.tableData_4[3].itemId){
                        itemName_4 = this.itemOptions[j].label
                    }
                    if(this.itemOptions[j].value == this.tableData_4[4].itemId){
                        itemName_5 = this.itemOptions[j].label
                    }
                }
                // 产品
                for (var k=0 ;k<this.productOptions.length; k++){
                    if(this.productOptions[k].value == this.tableData_4[0].itemId){
                        itemName_1 = this.productOptions[k].label
                    }
                    if(this.productOptions[k].value == this.tableData_4[1].itemId){
                        itemName_2 = this.productOptions[k].label
                    }
                    if(this.productOptions[k].value == this.tableData_4[2].itemId){
                        itemName_3 = this.productOptions[k].label
                    }
                    if(this.productOptions[k].value == this.tableData_4[3].itemId){
                        itemName_4 = this.productOptions[k].label
                    }
                    if(this.productOptions[k].value == this.tableData_4[4].itemId){
                        itemName_5 = this.productOptions[k].label
                    }
                }
                this.$copyText(
                  `${this.day_4.day}-${this.userList.deptName}--${this.userList.username}--${this.tableData_4[0].integral}
${itemName_1}-${this.tableData_4[0].reason}-${this.tableData_4[0].complete==100?'已完成':'未完成'}-${this.tableData_4[0].complete!=100?`预计 ${this.tableData_4[0].completeTime} 完成`:''}-${this.tableData_4[0].approverids == 0?'无人验收':`${name_1}验收`}-${this.Hour_1}/${this.tableData_4[0].useHour}
${itemName_2}-${this.tableData_4[1].reason}-${this.tableData_4[1].complete==100?'已完成':'未完成'}-${this.tableData_4[1].complete!=100?`预计 ${this.tableData_4[1].completeTime} 完成`:''}-${this.tableData_4[1].approverids == 0?'无人验收':`${name_2}验收`}-${this.Hour_1}/${this.tableData_4[1].useHour}
${itemName_3}-${this.tableData_4[2].reason}-${this.tableData_4[2].complete==100?'已完成':'未完成'}-${this.tableData_4[2].complete!=100?`预计 ${this.tableData_4[2].completeTime} 完成`:''}-${this.tableData_4[2].approverids == 0?'无人验收':`${name_3}验收`}-${this.Hour_1}/${this.tableData_4[2].useHour}
${itemName_4}-${this.tableData_4[3].reason}-${this.tableData_4[3].complete==100?'已完成':'未完成'}-${this.tableData_4[3].complete!=100?`预计 ${this.tableData_4[3].completeTime} 完成`:''}-${this.tableData_4[3].approverids == 0?'无人验收':`${name_4}验收`}-${this.Hour_1}/${this.tableData_4[3].useHour}
${itemName_5}-${this.tableData_4[4].reason}-${this.tableData_4[4].complete==100?'已完成':'未完成'}-${this.tableData_4[4].complete!=100?`预计 ${this.tableData_4[4].completeTime} 完成`:''}-${this.tableData_4[4].approverids == 0?'无人验收':`${name_5}验收`}-${this.Hour_1}/${this.tableData_4[4].useHour}`
                ).then(res => {
                  console.log(res);
                  // this.$toast("已成功复制，可直接去粘贴");
                });
            }

        },
        copyCode_5() {
            this.$message({
                message: '已成功复制填报信息！',
                type: 'success'
            });
            // 验收人
            var name_1 = ''
            var name_2 = ''
            var name_3 = ''
            var name_4 = ''
            var name_5 = ''
            // 项目产品
            var itemName_1=''
            var itemName_2=''
            var itemName_3=''
            var itemName_4=''
            var itemName_5=''
            if(this.tableData_5.length == 1){
                // 验收人
                for(var i=0;i<this.applyUserList.length;i++){
                    if(this.applyUserList[i].value==this.tableData_5[0].i){
                        name_1 = this.applyUserList[i].label
                    }
                }
                // 项目
                for(var j=0;j<this.itemOptions.length;j++){
                    if(this.itemOptions[j].value == this.tableData_5[0].itemId){
                        itemName_1 = this.itemOptions[j].label
                    }
                }
                // 产品
                for (var k=0 ;k<this.productOptions.length; k++){
                    if(this.productOptions[k].value == this.tableData_5[0].itemId){
                        itemName_1 = this.productOptions[k].label
                    }
                }
              this.$copyText(
                `${this.day_5.day}-${this.userList.deptName}--${this.userList.username}--${this.tableData_5[0].integral}
${itemName_1}-${this.tableData_5[0].reason}-${this.tableData_5[0].complete==100?'已完成':'未完成'}-${this.tableData_5[0].complete!=100?`预计 ${this.tableData_5[0].completeTime} 完成`:''}-${this.tableData_5[0].approverids == 0?'无人验收':`${name_1}验收`}-${this.Hour_1}/${this.tableData_5[0].useHour}`
              ).then(res => {
                console.log(res);
                // this.$toast("已成功复制，可直接去粘贴");
              });
            }
            if(this.tableData_5.length == 2){
                for(var i=0;i<this.applyUserList.length;i++){
                    if(this.applyUserList[i].value==this.tableData_5[0].approverids){
                        name_1 = this.applyUserList[i].label
                    }
                    if(this.applyUserList[i].value==this.tableData_5[1].approverids){
                        name_2 = this.applyUserList[i].label
                    }
                }
                // 项目
                for(var j=0;j<this.itemOptions.length;j++){
                    if(this.itemOptions[j].value == this.tableData_5[0].itemId){
                        itemName_1 = this.itemOptions[j].label
                    }
                    if(this.itemOptions[j].value == this.tableData_5[1].itemId){
                        itemName_2 = this.itemOptions[j].label
                    }
                }
                // 产品
                for (var k=0 ;k<this.productOptions.length; k++){
                    if(this.productOptions[k].value == this.tableData_5[0].itemId){
                        itemName_1 = this.productOptions[k].label
                    }
                    if(this.productOptions[k].value == this.tableData_5[1].itemId){
                        itemName_2 = this.productOptions[k].label
                    }
                }
                this.$copyText(
                  `${this.day_5.day}-${this.userList.deptName}--${this.userList.username}--${this.tableData_5[0].integral}
${itemName_1}-${this.tableData_5[0].reason}-${this.tableData_5[0].complete==100?'已完成':'未完成'}-${this.tableData_5[0].complete!=100?`预计 ${this.tableData_5[0].completeTime} 完成`:''}-${this.tableData_5[0].approverids == 0?'无人验收':`${name_1}验收`}-${this.Hour_1}/${this.tableData_5[0].useHour}
${itemName_2}-${this.tableData_5[1].reason}-${this.tableData_5[1].complete==100?'已完成':'未完成'}-${this.tableData_5[1].complete!=100?`预计 ${this.tableData_5[1].completeTime} 完成`:''}-${this.tableData_5[1].approverids == 0?'无人验收':`${name_2}验收`}-${this.Hour_1}/${this.tableData_5[1].useHour}`
                ).then(res => {
                  console.log(res);
                  // this.$toast("已成功复制，可直接去粘贴");
                });
            }
            if(this.tableData_5.length == 3){
                 for(var i=0;i<this.applyUserList.length;i++){
                     if(this.applyUserList[i].value==this.tableData_5[0].approverids){
                         name_1 = this.applyUserList[i].label
                     }
                     if(this.applyUserList[i].value==this.tableData_5[1].approverids){
                         name_2 = this.applyUserList[i].label
                     }
                     if(this.applyUserList[i].value==this.tableData_5[2].approverids){
                         name_3 = this.applyUserList[i].label
                     }
                 }
                 // 项目
                 for(var j=0;j<this.itemOptions.length;j++){
                     if(this.itemOptions[j].value == this.tableData_5[0].itemId){
                         itemName_1 = this.itemOptions[j].label
                     }
                     if(this.itemOptions[j].value == this.tableData_5[1].itemId){
                         itemName_2 = this.itemOptions[j].label
                     }
                     if(this.itemOptions[j].value == this.tableData_5[2].itemId){
                         itemName_3 = this.itemOptions[j].label
                     }
                 }
                 // 产品
                 for (var k=0 ;k<this.productOptions.length; k++){
                     if(this.productOptions[k].value == this.tableData_5[0].itemId){
                         itemName_1 = this.productOptions[k].label
                     }
                     if(this.productOptions[k].value == this.tableData_5[1].itemId){
                         itemName_2 = this.productOptions[k].label
                     }
                     if(this.productOptions[k].value == this.tableData_5[2].itemId){
                         itemName_3 = this.productOptions[k].label
                     }
                 }
                 this.$copyText(
                   `${this.day_5.day}-${this.userList.deptName}--${this.userList.username}--${this.tableData_5[0].integral}
${itemName_1}-${this.tableData_5[0].reason}-${this.tableData_5[0].complete==100?'已完成':'未完成'}-${this.tableData_5[0].complete!=100?`预计 ${this.tableData_5[0].completeTime} 完成`:''}-${this.tableData_5[0].approverids == 0?'无人验收':`${name_1}验收`}-${this.Hour_1}/${this.tableData_5[0].useHour}
${itemName_2}-${this.tableData_5[1].reason}-${this.tableData_5[1].complete==100?'已完成':'未完成'}-${this.tableData_5[1].complete!=100?`预计 ${this.tableData_5[1].completeTime} 完成`:''}-${this.tableData_5[1].approverids == 0?'无人验收':`${name_2}验收`}-${this.Hour_1}/${this.tableData_5[1].useHour}
${itemName_3}-${this.tableData_5[2].reason}-${this.tableData_5[2].complete==100?'已完成':'未完成'}-${this.tableData_5[1].complete!=100?`预计 ${this.tableData_5[2].completeTime} 完成`:''}-${this.tableData_5[2].approverids == 0?'无人验收':`${name_3}验收`}-${this.Hour_1}/${this.tableData_5[2].useHour}`
                 ).then(res => {
                   console.log(res);
                   // this.$toast("已成功复制，可直接去粘贴");
                 });
            }
            if(this.tableData_5.length == 4){
                  for(var i=0;i<this.applyUserList.length;i++){
                      if(this.applyUserList[i].value==this.tableData_5[0].approverids){
                          name_1 = this.applyUserList[i].label
                      }
                      if(this.applyUserList[i].value==this.tableData_5[1].approverids){
                          name_2 = this.applyUserList[i].label
                      }
                      if(this.applyUserList[i].value==this.tableData_5[2].approverids){
                          name_3 = this.applyUserList[i].label
                      }
                      if(this.applyUserList[i].value==this.tableData_5[3].approverids){
                          name_4 = this.applyUserList[i].label
                      }
                  }
                  // 项目
                  for(var j=0;j<this.itemOptions.length;j++){
                      if(this.itemOptions[j].value == this.tableData_5[0].itemId){
                          itemName_1 = this.itemOptions[j].label
                      }
                      if(this.itemOptions[j].value == this.tableData_5[1].itemId){
                          itemName_2 = this.itemOptions[j].label
                      }
                      if(this.itemOptions[j].value == this.tableData_5[2].itemId){
                          itemName_3 = this.itemOptions[j].label
                      }
                      if(this.itemOptions[j].value == this.tableData_5[3].itemId){
                          itemName_4 = this.itemOptions[j].label
                      }
                  }
                  // 产品
                  for (var k=0 ;k<this.productOptions.length; k++){
                      if(this.productOptions[k].value == this.tableData_5[0].itemId){
                          itemName_1 = this.productOptions[k].label
                      }
                      if(this.productOptions[k].value == this.tableData_5[1].itemId){
                          itemName_2 = this.productOptions[k].label
                      }
                      if(this.productOptions[k].value == this.tableData_5[2].itemId){
                          itemName_3 = this.productOptions[k].label
                      }
                      if(this.productOptions[k].value == this.tableData_5[3].itemId){
                          itemName_4 = this.productOptions[k].label
                      }
                  }
                  this.$copyText(
                    `${this.day_5.day}-${this.userList.deptName}--${this.userList.username}--${this.tableData_5[0].integral}
${itemName_1}-${this.tableData_5[0].reason}-${this.tableData_5[0].complete==100?'已完成':'未完成'}-${this.tableData_5[0].complete!=100?`预计 ${this.tableData_5[0].completeTime} 完成`:''}-${this.tableData_5[0].approverids == 0?'无人验收':`${name_1}验收`}-${this.Hour_1}/${this.tableData_5[0].useHour}
${itemName_2}-${this.tableData_5[1].reason}-${this.tableData_5[1].complete==100?'已完成':'未完成'}-${this.tableData_5[1].complete!=100?`预计 ${this.tableData_5[1].completeTime} 完成`:''}-${this.tableData_5[1].approverids == 0?'无人验收':`${name_2}验收`}-${this.Hour_1}/${this.tableData_5[1].useHour}
${itemName_3}-${this.tableData_5[2].reason}-${this.tableData_5[2].complete==100?'已完成':'未完成'}-${this.tableData_5[2].complete!=100?`预计 ${this.tableData_5[2].completeTime} 完成`:''}-${this.tableData_5[2].approverids == 0?'无人验收':`${name_3}验收`}-${this.Hour_1}/${this.tableData_5[2].useHour}
${itemName_4}-${this.tableData_5[3].reason}-${this.tableData_5[3].complete==100?'已完成':'未完成'}-${this.tableData_5[3].complete!=100?`预计 ${this.tableData_5[3].completeTime} 完成`:''}-${this.tableData_5[3].approverids == 0?'无人验收':`${name_4}验收`}-${this.Hour_1}/${this.tableData_5[3].useHour}`
                  ).then(res => {
                    console.log(res);
                    // this.$toast("已成功复制，可直接去粘贴");
                  });
            }
            if(this.tableData_5.length == 5){
                for(var i=0;i<this.applyUserList.length;i++){
                    if(this.applyUserList[i].value==this.tableData_5[0].approverids){
                        name_1 = this.applyUserList[i].label
                    }
                    if(this.applyUserList[i].value==this.tableData_5[1].approverids){
                        name_2 = this.applyUserList[i].label
                    }
                    if(this.applyUserList[i].value==this.tableData_5[2].approverids){
                        name_3 = this.applyUserList[i].label
                    }
                    if(this.applyUserList[i].value==this.tableData_5[3].approverids){
                        name_4 = this.applyUserList[i].label
                    }
                    if(this.applyUserList[i].value==this.tableData_5[4].approverids){
                        name_5 = this.applyUserList[i].label
                    }
                }
                // 项目
                for(var j=0;j<this.itemOptions.length;j++){
                    if(this.itemOptions[j].value == this.tableData_5[0].itemId){
                        itemName_1 = this.itemOptions[j].label
                    }
                    if(this.itemOptions[j].value == this.tableData_5[1].itemId){
                        itemName_2 = this.itemOptions[j].label
                    }
                    if(this.itemOptions[j].value == this.tableData_5[2].itemId){
                        itemName_3 = this.itemOptions[j].label
                    }
                    if(this.itemOptions[j].value == this.tableData_5[3].itemId){
                        itemName_4 = this.itemOptions[j].label
                    }
                    if(this.itemOptions[j].value == this.tableData_5[4].itemId){
                        itemName_5 = this.itemOptions[j].label
                    }
                }
                // 产品
                for (var k=0 ;k<this.productOptions.length; k++){
                    if(this.productOptions[k].value == this.tableData_5[0].itemId){
                        itemName_1 = this.productOptions[k].label
                    }
                    if(this.productOptions[k].value == this.tableData_5[1].itemId){
                        itemName_2 = this.productOptions[k].label
                    }
                    if(this.productOptions[k].value == this.tableData_5[2].itemId){
                        itemName_3 = this.productOptions[k].label
                    }
                    if(this.productOptions[k].value == this.tableData_5[3].itemId){
                        itemName_4 = this.productOptions[k].label
                    }
                    if(this.productOptions[k].value == this.tableData_5[4].itemId){
                        itemName_5 = this.productOptions[k].label
                    }
                }
                this.$copyText(
                  `${this.day_5.day}-${this.userList.deptName}--${this.userList.username}--${this.tableData_5[0].integral}
${itemName_1}-${this.tableData_5[0].reason}-${this.tableData_5[0].complete==100?'已完成':'未完成'}-${this.tableData_5[0].complete!=100?`预计 ${this.tableData_5[0].completeTime} 完成`:''}-${this.tableData_5[0].approverids == 0?'无人验收':`${name_1}验收`}-${this.Hour_1}/${this.tableData_5[0].useHour}
${itemName_2}-${this.tableData_5[1].reason}-${this.tableData_5[1].complete==100?'已完成':'未完成'}-${this.tableData_5[1].complete!=100?`预计 ${this.tableData_5[1].completeTime} 完成`:''}-${this.tableData_5[1].approverids == 0?'无人验收':`${name_2}验收`}-${this.Hour_1}/${this.tableData_5[1].useHour}
${itemName_3}-${this.tableData_5[2].reason}-${this.tableData_5[2].complete==100?'已完成':'未完成'}-${this.tableData_5[2].complete!=100?`预计 ${this.tableData_5[2].completeTime} 完成`:''}-${this.tableData_5[2].approverids == 0?'无人验收':`${name_3}验收`}-${this.Hour_1}/${this.tableData_5[2].useHour}
${itemName_4}-${this.tableData_5[3].reason}-${this.tableData_5[3].complete==100?'已完成':'未完成'}-${this.tableData_5[3].complete!=100?`预计 ${this.tableData_5[3].completeTime} 完成`:''}-${this.tableData_5[3].approverids == 0?'无人验收':`${name_4}验收`}-${this.Hour_1}/${this.tableData_5[3].useHour}
${itemName_5}-${this.tableData_5[4].reason}-${this.tableData_5[4].complete==100?'已完成':'未完成'}-${this.tableData_5[4].complete!=100?`预计 ${this.tableData_5[4].completeTime} 完成`:''}-${this.tableData_5[4].approverids == 0?'无人验收':`${name_5}验收`}-${this.Hour_1}/${this.tableData_5[4].useHour}`
                ).then(res => {
                  console.log(res);
                  // this.$toast("已成功复制，可直接去粘贴");
                });
            }


        },
        copyCode_6() {
            this.$message({
                message: '已成功复制填报信息！',
                type: 'success'
            });
            // 验收人
            var name_1 = ''
            var name_2 = ''
            var name_3 = ''
            var name_4 = ''
            var name_5 = ''
            // 项目产品
            var itemName_1=''
            var itemName_2=''
            var itemName_3=''
            var itemName_4=''
            var itemName_5=''
            if(this.tableData_6.length == 1){
                // 验收人
                for(var i=0;i<this.applyUserList.length;i++){
                    if(this.applyUserList[i].value==this.tableData_6[0].i){
                        name_1 = this.applyUserList[i].label
                    }
                }
                // 项目
                for(var j=0;j<this.itemOptions.length;j++){
                    if(this.itemOptions[j].value == this.tableData_6[0].itemId){
                        itemName_1 = this.itemOptions[j].label
                    }
                }
                // 产品
                for (var k=0 ;k<this.productOptions.length; k++){
                    if(this.productOptions[k].value == this.tableData_6[0].itemId){
                        itemName_1 = this.productOptions[k].label
                    }
                }
              this.$copyText(
                `${this.day_6.day}-${this.userList.deptName}--${this.userList.username}--${this.tableData_6[0].integral}
${itemName_1}-${this.tableData_6[0].reason}-${this.tableData_6[0].complete==100?'已完成':'未完成'}-${this.tableData_6[0].complete!=100?`预计 ${this.tableData_6[0].completeTime} 完成`:''}-${this.tableData_6[0].approverids == 0?'无人验收':`${name_1}验收`}-${this.Hour_1}/${this.tableData_6[0].useHour}`
              ).then(res => {
                console.log(res);
                // this.$toast("已成功复制，可直接去粘贴");
              });
            }
            if(this.tableData_6.length == 2){
                for(var i=0;i<this.applyUserList.length;i++){
                    if(this.applyUserList[i].value==this.tableData_6[0].approverids){
                        name_1 = this.applyUserList[i].label
                    }
                    if(this.applyUserList[i].value==this.tableData_6[1].approverids){
                        name_2 = this.applyUserList[i].label
                    }
                }
                // 项目
                for(var j=0;j<this.itemOptions.length;j++){
                    if(this.itemOptions[j].value == this.tableData_6[0].itemId){
                        itemName_1 = this.itemOptions[j].label
                    }
                    if(this.itemOptions[j].value == this.tableData_6[1].itemId){
                        itemName_2 = this.itemOptions[j].label
                    }
                }
                // 产品
                for (var k=0 ;k<this.productOptions.length; k++){
                    if(this.productOptions[k].value == this.tableData_6[0].itemId){
                        itemName_1 = this.productOptions[k].label
                    }
                    if(this.productOptions[k].value == this.tableData_6[1].itemId){
                        itemName_2 = this.productOptions[k].label
                    }
                }
                this.$copyText(
                  `${this.day_6.day}-${this.userList.deptName}--${this.userList.username}--${this.tableData_6[0].integral}
${itemName_1}-${this.tableData_6[0].reason}-${this.tableData_6[0].complete==100?'已完成':'未完成'}-${this.tableData_6[0].complete!=100?`预计 ${this.tableData_6[0].completeTime} 完成`:''}-${this.tableData_6[0].approverids == 0?'无人验收':`${name_1}验收`}-${this.Hour_1}/${this.tableData_6[0].useHour}
${itemName_2}-${this.tableData_6[1].reason}-${this.tableData_6[1].complete==100?'已完成':'未完成'}-${this.tableData_6[1].complete!=100?`预计 ${this.tableData_6[1].completeTime} 完成`:''}-${this.tableData_6[1].approverids == 0?'无人验收':`${name_2}验收`}-${this.Hour_1}/${this.tableData_6[1].useHour}`
                ).then(res => {
                  console.log(res);
                  // this.$toast("已成功复制，可直接去粘贴");
                });
            }
            if(this.tableData_6.length == 3){
                 for(var i=0;i<this.applyUserList.length;i++){
                     if(this.applyUserList[i].value==this.tableData_6[0].approverids){
                         name_1 = this.applyUserList[i].label
                     }
                     if(this.applyUserList[i].value==this.tableData_6[1].approverids){
                         name_2 = this.applyUserList[i].label
                     }
                     if(this.applyUserList[i].value==this.tableData_6[2].approverids){
                         name_3 = this.applyUserList[i].label
                     }
                 }
                 // 项目
                 for(var j=0;j<this.itemOptions.length;j++){
                     if(this.itemOptions[j].value == this.tableData_6[0].itemId){
                         itemName_1 = this.itemOptions[j].label
                     }
                     if(this.itemOptions[j].value == this.tableData_6[1].itemId){
                         itemName_2 = this.itemOptions[j].label
                     }
                     if(this.itemOptions[j].value == this.tableData_6[2].itemId){
                         itemName_3 = this.itemOptions[j].label
                     }
                 }
                 // 产品
                 for (var k=0 ;k<this.productOptions.length; k++){
                     if(this.productOptions[k].value == this.tableData_6[0].itemId){
                         itemName_1 = this.productOptions[k].label
                     }
                     if(this.productOptions[k].value == this.tableData_6[1].itemId){
                         itemName_2 = this.productOptions[k].label
                     }
                     if(this.productOptions[k].value == this.tableData_6[2].itemId){
                         itemName_3 = this.productOptions[k].label
                     }
                 }
                 this.$copyText(
                   `${this.day_6.day}-${this.userList.deptName}--${this.userList.username}--${this.tableData_6[0].integral}
${itemName_1}-${this.tableData_6[0].reason}-${this.tableData_6[0].complete==100?'已完成':'未完成'}-${this.tableData_6[0].complete!=100?`预计 ${this.tableData_6[0].completeTime} 完成`:''}-${this.tableData_6[0].approverids == 0?'无人验收':`${name_1}验收`}-${this.Hour_1}/${this.tableData_6[0].useHour}
${itemName_2}-${this.tableData_6[1].reason}-${this.tableData_6[1].complete==100?'已完成':'未完成'}-${this.tableData_6[1].complete!=100?`预计 ${this.tableData_6[1].completeTime} 完成`:''}-${this.tableData_6[1].approverids == 0?'无人验收':`${name_2}验收`}-${this.Hour_1}/${this.tableData_6[1].useHour}
${itemName_3}-${this.tableData_6[2].reason}-${this.tableData_6[2].complete==100?'已完成':'未完成'}-${this.tableData_6[1].complete!=100?`预计 ${this.tableData_6[2].completeTime} 完成`:''}-${this.tableData_6[2].approverids == 0?'无人验收':`${name_3}验收`}-${this.Hour_1}/${this.tableData_6[2].useHour}`
                 ).then(res => {
                   console.log(res);
                   // this.$toast("已成功复制，可直接去粘贴");
                 });
            }
            if(this.tableData_6.length == 4){
                  for(var i=0;i<this.applyUserList.length;i++){
                      if(this.applyUserList[i].value==this.tableData_6[0].approverids){
                          name_1 = this.applyUserList[i].label
                      }
                      if(this.applyUserList[i].value==this.tableData_6[1].approverids){
                          name_2 = this.applyUserList[i].label
                      }
                      if(this.applyUserList[i].value==this.tableData_6[2].approverids){
                          name_3 = this.applyUserList[i].label
                      }
                      if(this.applyUserList[i].value==this.tableData_6[3].approverids){
                          name_4 = this.applyUserList[i].label
                      }
                  }
                  // 项目
                  for(var j=0;j<this.itemOptions.length;j++){
                      if(this.itemOptions[j].value == this.tableData_6[0].itemId){
                          itemName_1 = this.itemOptions[j].label
                      }
                      if(this.itemOptions[j].value == this.tableData_6[1].itemId){
                          itemName_2 = this.itemOptions[j].label
                      }
                      if(this.itemOptions[j].value == this.tableData_6[2].itemId){
                          itemName_3 = this.itemOptions[j].label
                      }
                      if(this.itemOptions[j].value == this.tableData_6[3].itemId){
                          itemName_4 = this.itemOptions[j].label
                      }
                  }
                  // 产品
                  for (var k=0 ;k<this.productOptions.length; k++){
                      if(this.productOptions[k].value == this.tableData_6[0].itemId){
                          itemName_1 = this.productOptions[k].label
                      }
                      if(this.productOptions[k].value == this.tableData_6[1].itemId){
                          itemName_2 = this.productOptions[k].label
                      }
                      if(this.productOptions[k].value == this.tableData_6[2].itemId){
                          itemName_3 = this.productOptions[k].label
                      }
                      if(this.productOptions[k].value == this.tableData_6[3].itemId){
                          itemName_4 = this.productOptions[k].label
                      }
                  }
                  this.$copyText(
                    `$${this.day_6.day}-{this.userList.deptName}--${this.userList.username}--${this.tableData_6[0].integral}
${itemName_1}-${this.tableData_6[0].reason}-${this.tableData_6[0].complete==100?'已完成':'未完成'}-${this.tableData_6[0].complete!=100?`预计 ${this.tableData_6[0].completeTime} 完成`:''}-${this.tableData_6[0].approverids == 0?'无人验收':`${name_1}验收`}-${this.Hour_1}/${this.tableData_6[0].useHour}
${itemName_2}-${this.tableData_6[1].reason}-${this.tableData_6[1].complete==100?'已完成':'未完成'}-${this.tableData_6[1].complete!=100?`预计 ${this.tableData_6[1].completeTime} 完成`:''}-${this.tableData_6[1].approverids == 0?'无人验收':`${name_2}验收`}-${this.Hour_1}/${this.tableData_6[1].useHour}
${itemName_3}-${this.tableData_6[2].reason}-${this.tableData_6[2].complete==100?'已完成':'未完成'}-${this.tableData_6[2].complete!=100?`预计 ${this.tableData_6[2].completeTime} 完成`:''}-${this.tableData_6[2].approverids == 0?'无人验收':`${name_3}验收`}-${this.Hour_1}/${this.tableData_6[2].useHour}
${itemName_4}-${this.tableData_6[3].reason}-${this.tableData_6[3].complete==100?'已完成':'未完成'}-${this.tableData_6[3].complete!=100?`预计 ${this.tableData_6[3].completeTime} 完成`:''}-${this.tableData_6[3].approverids == 0?'无人验收':`${name_4}验收`}-${this.Hour_1}/${this.tableData_6[3].useHour}`
                  ).then(res => {
                    console.log(res);
                    // this.$toast("已成功复制，可直接去粘贴");
                  });
            }
            if(this.tableData_6.length == 5){
                for(var i=0;i<this.applyUserList.length;i++){
                    if(this.applyUserList[i].value==this.tableData_6[0].approverids){
                        name_1 = this.applyUserList[i].label
                    }
                    if(this.applyUserList[i].value==this.tableData_6[1].approverids){
                        name_2 = this.applyUserList[i].label
                    }
                    if(this.applyUserList[i].value==this.tableData_6[2].approverids){
                        name_3 = this.applyUserList[i].label
                    }
                    if(this.applyUserList[i].value==this.tableData_6[3].approverids){
                        name_4 = this.applyUserList[i].label
                    }
                    if(this.applyUserList[i].value==this.tableData_6[4].approverids){
                        name_5 = this.applyUserList[i].label
                    }
                }
                // 项目
                for(var j=0;j<this.itemOptions.length;j++){
                    if(this.itemOptions[j].value == this.tableData_6[0].itemId){
                        itemName_1 = this.itemOptions[j].label
                    }
                    if(this.itemOptions[j].value == this.tableData_6[1].itemId){
                        itemName_2 = this.itemOptions[j].label
                    }
                    if(this.itemOptions[j].value == this.tableData_6[2].itemId){
                        itemName_3 = this.itemOptions[j].label
                    }
                    if(this.itemOptions[j].value == this.tableData_6[3].itemId){
                        itemName_4 = this.itemOptions[j].label
                    }
                    if(this.itemOptions[j].value == this.tableData_6[4].itemId){
                        itemName_5 = this.itemOptions[j].label
                    }
                }
                // 产品
                for (var k=0 ;k<this.productOptions.length; k++){
                    if(this.productOptions[k].value == this.tableData_6[0].itemId){
                        itemName_1 = this.productOptions[k].label
                    }
                    if(this.productOptions[k].value == this.tableData_6[1].itemId){
                        itemName_2 = this.productOptions[k].label
                    }
                    if(this.productOptions[k].value == this.tableData_6[2].itemId){
                        itemName_3 = this.productOptions[k].label
                    }
                    if(this.productOptions[k].value == this.tableData_6[3].itemId){
                        itemName_4 = this.productOptions[k].label
                    }
                    if(this.productOptions[k].value == this.tableData_6[4].itemId){
                        itemName_5 = this.productOptions[k].label
                    }
                }
                this.$copyText(
                  `${this.day_6.day}-${this.userList.deptName}--${this.userList.username}--${this.tableData_6[0].integral}
${itemName_1}-${this.tableData_6[0].reason}-${this.tableData_6[0].complete==100?'已完成':'未完成'}-${this.tableData_6[0].complete!=100?`预计 ${this.tableData_6[0].completeTime} 完成`:''}-${this.tableData_6[0].approverids == 0?'无人验收':`${name_1}验收`}-${this.Hour_1}/${this.tableData_6[0].useHour}
${itemName_2}-${this.tableData_6[1].reason}-${this.tableData_6[1].complete==100?'已完成':'未完成'}-${this.tableData_6[1].complete!=100?`预计 ${this.tableData_6[1].completeTime} 完成`:''}-${this.tableData_6[1].approverids == 0?'无人验收':`${name_2}验收`}-${this.Hour_1}/${this.tableData_6[1].useHour}
${itemName_3}-${this.tableData_6[2].reason}-${this.tableData_6[2].complete==100?'已完成':'未完成'}-${this.tableData_6[2].complete!=100?`预计 ${this.tableData_6[2].completeTime} 完成`:''}-${this.tableData_6[2].approverids == 0?'无人验收':`${name_3}验收`}-${this.Hour_1}/${this.tableData_6[2].useHour}
${itemName_4}-${this.tableData_6[3].reason}-${this.tableData_6[3].complete==100?'已完成':'未完成'}-${this.tableData_6[3].complete!=100?`预计 ${this.tableData_6[3].completeTime} 完成`:''}-${this.tableData_6[3].approverids == 0?'无人验收':`${name_4}验收`}-${this.Hour_1}/${this.tableData_6[3].useHour}
${itemName_5}-${this.tableData_6[4].reason}-${this.tableData_6[4].complete==100?'已完成':'未完成'}-${this.tableData_6[4].complete!=100?`预计 ${this.tableData_6[4].completeTime} 完成`:''}-${this.tableData_6[4].approverids == 0?'无人验收':`${name_5}验收`}-${this.Hour_1}/${this.tableData_6[4].useHour}`
                ).then(res => {
                  console.log(res);
                  // this.$toast("已成功复制，可直接去粘贴");
                });
            }

        },
        copyCode_7() {
            this.$message({
                message: '已成功复制填报信息！',
                type: 'success'
            });
            // 验收人
            var name_1 = ''
            var name_2 = ''
            var name_3 = ''
            var name_4 = ''
            var name_5 = ''
            // 项目产品
            var itemName_1=''
            var itemName_2=''
            var itemName_3=''
            var itemName_4=''
            var itemName_5=''
            if(this.tableData_7.length == 1){
                // 验收人
                for(var i=0;i<this.applyUserList.length;i++){
                    if(this.applyUserList[i].value==this.tableData_7[0].i){
                        name_1 = this.applyUserList[i].label
                    }
                }
                // 项目
                for(var j=0;j<this.itemOptions.length;j++){
                    if(this.itemOptions[j].value == this.tableData_7[0].itemId){
                        itemName_1 = this.itemOptions[j].label
                    }
                }
                // 产品
                for (var k=0 ;k<this.productOptions.length; k++){
                    if(this.productOptions[k].value == this.tableData_7[0].itemId){
                        itemName_1 = this.productOptions[k].label
                    }
                }
              this.$copyText(
                `${this.day_7.day}-${this.userList.deptName}--${this.userList.username}--${this.tableData_7[0].integral}
${itemName_1}-${this.tableData_7[0].reason}-${this.tableData_7[0].complete==100?'已完成':'未完成'}-${this.tableData_7[0].complete!=100?`预计 ${this.tableData_7[0].completeTime} 完成`:''}-${this.tableData_7[0].approverids == 0?'无人验收':`${name_1}验收`}-${this.Hour_1}/${this.tableData_7[0].useHour}`
              ).then(res => {
                console.log(res);
                // this.$toast("已成功复制，可直接去粘贴");
              });
            }
            if(this.tableData_7.length == 2){
                for(var i=0;i<this.applyUserList.length;i++){
                    if(this.applyUserList[i].value==this.tableData_7[0].approverids){
                        name_1 = this.applyUserList[i].label
                    }
                    if(this.applyUserList[i].value==this.tableData_7[1].approverids){
                        name_2 = this.applyUserList[i].label
                    }
                }
                // 项目
                for(var j=0;j<this.itemOptions.length;j++){
                    if(this.itemOptions[j].value == this.tableData_7[0].itemId){
                        itemName_1 = this.itemOptions[j].label
                    }
                    if(this.itemOptions[j].value == this.tableData_7[1].itemId){
                        itemName_2 = this.itemOptions[j].label
                    }
                }
                // 产品
                for (var k=0 ;k<this.productOptions.length; k++){
                    if(this.productOptions[k].value == this.tableData_7[0].itemId){
                        itemName_1 = this.productOptions[k].label
                    }
                    if(this.productOptions[k].value == this.tableData_7[1].itemId){
                        itemName_2 = this.productOptions[k].label
                    }
                }
                this.$copyText(
                  `${this.day_7.day}-${this.userList.deptName}--${this.userList.username}--${this.tableData_7[0].integral}
${itemName_1}-${this.tableData_7[0].reason}-${this.tableData_7[0].complete==100?'已完成':'未完成'}-${this.tableData_7[0].complete!=100?`预计 ${this.tableData_7[0].completeTime} 完成`:''}-${this.tableData_7[0].approverids == 0?'无人验收':`${name_1}验收`}-${this.Hour_1}/${this.tableData_7[0].useHour}
${itemName_2}-${this.tableData_7[1].reason}-${this.tableData_7[1].complete==100?'已完成':'未完成'}-${this.tableData_7[1].complete!=100?`预计 ${this.tableData_7[1].completeTime} 完成`:''}-${this.tableData_7[1].approverids == 0?'无人验收':`${name_2}验收`}-${this.Hour_1}/${this.tableData_7[1].useHour}`
                ).then(res => {
                  console.log(res);
                  // this.$toast("已成功复制，可直接去粘贴");
                });
            }
            if(this.tableData_7.length == 3){
                 for(var i=0;i<this.applyUserList.length;i++){
                     if(this.applyUserList[i].value==this.tableData_7[0].approverids){
                         name_1 = this.applyUserList[i].label
                     }
                     if(this.applyUserList[i].value==this.tableData_7[1].approverids){
                         name_2 = this.applyUserList[i].label
                     }
                     if(this.applyUserList[i].value==this.tableData_7[2].approverids){
                         name_3 = this.applyUserList[i].label
                     }
                 }
                 // 项目
                 for(var j=0;j<this.itemOptions.length;j++){
                     if(this.itemOptions[j].value == this.tableData_7[0].itemId){
                         itemName_1 = this.itemOptions[j].label
                     }
                     if(this.itemOptions[j].value == this.tableData_7[1].itemId){
                         itemName_2 = this.itemOptions[j].label
                     }
                     if(this.itemOptions[j].value == this.tableData_7[2].itemId){
                         itemName_3 = this.itemOptions[j].label
                     }
                 }
                 // 产品
                 for (var k=0 ;k<this.productOptions.length; k++){
                     if(this.productOptions[k].value == this.tableData_7[0].itemId){
                         itemName_1 = this.productOptions[k].label
                     }
                     if(this.productOptions[k].value == this.tableData_7[1].itemId){
                         itemName_2 = this.productOptions[k].label
                     }
                     if(this.productOptions[k].value == this.tableData_7[2].itemId){
                         itemName_3 = this.productOptions[k].label
                     }
                 }
                 this.$copyText(
                   `${this.day_7.day}-${this.userList.deptName}--${this.userList.username}--${this.tableData_7[0].integral}
${itemName_1}-${this.tableData_7[0].reason}-${this.tableData_7[0].complete==100?'已完成':'未完成'}-${this.tableData_7[0].complete!=100?`预计 ${this.tableData_7[0].completeTime} 完成`:''}-${this.tableData_7[0].approverids == 0?'无人验收':`${name_1}验收`}-${this.Hour_1}/${this.tableData_7[0].useHour}
${itemName_2}-${this.tableData_7[1].reason}-${this.tableData_7[1].complete==100?'已完成':'未完成'}-${this.tableData_7[1].complete!=100?`预计 ${this.tableData_7[1].completeTime} 完成`:''}-${this.tableData_7[1].approverids == 0?'无人验收':`${name_2}验收`}-${this.Hour_1}/${this.tableData_7[1].useHour}
${itemName_3}-${this.tableData_7[2].reason}-${this.tableData_7[2].complete==100?'已完成':'未完成'}-${this.tableData_7[1].complete!=100?`预计 ${this.tableData_7[2].completeTime} 完成`:''}-${this.tableData_7[2].approverids == 0?'无人验收':`${name_3}验收`}-${this.Hour_1}/${this.tableData_7[2].useHour}`
                 ).then(res => {
                   console.log(res);
                   // this.$toast("已成功复制，可直接去粘贴");
                 });
            }
            if(this.tableData_7.length == 4){
                  for(var i=0;i<this.applyUserList.length;i++){
                      if(this.applyUserList[i].value==this.tableData_7[0].approverids){
                          name_1 = this.applyUserList[i].label
                      }
                      if(this.applyUserList[i].value==this.tableData_7[1].approverids){
                          name_2 = this.applyUserList[i].label
                      }
                      if(this.applyUserList[i].value==this.tableData_7[2].approverids){
                          name_3 = this.applyUserList[i].label
                      }
                      if(this.applyUserList[i].value==this.tableData_7[3].approverids){
                          name_4 = this.applyUserList[i].label
                      }
                  }
                  // 项目
                  for(var j=0;j<this.itemOptions.length;j++){
                      if(this.itemOptions[j].value == this.tableData_7[0].itemId){
                          itemName_1 = this.itemOptions[j].label
                      }
                      if(this.itemOptions[j].value == this.tableData_7[1].itemId){
                          itemName_2 = this.itemOptions[j].label
                      }
                      if(this.itemOptions[j].value == this.tableData_7[2].itemId){
                          itemName_3 = this.itemOptions[j].label
                      }
                      if(this.itemOptions[j].value == this.tableData_7[3].itemId){
                          itemName_4 = this.itemOptions[j].label
                      }
                  }
                  // 产品
                  for (var k=0 ;k<this.productOptions.length; k++){
                      if(this.productOptions[k].value == this.tableData_7[0].itemId){
                          itemName_1 = this.productOptions[k].label
                      }
                      if(this.productOptions[k].value == this.tableData_7[1].itemId){
                          itemName_2 = this.productOptions[k].label
                      }
                      if(this.productOptions[k].value == this.tableData_7[2].itemId){
                          itemName_3 = this.productOptions[k].label
                      }
                      if(this.productOptions[k].value == this.tableData_7[3].itemId){
                          itemName_4 = this.productOptions[k].label
                      }
                  }
                  this.$copyText(
                    `${this.day_7.day}-${this.userList.deptName}--${this.userList.username}--${this.tableData_7[0].integral}
${itemName_1}-${this.tableData_7[0].reason}-${this.tableData_7[0].complete==100?'已完成':'未完成'}-${this.tableData_7[0].complete!=100?`预计 ${this.tableData_7[0].completeTime} 完成`:''}-${this.tableData_7[0].approverids == 0?'无人验收':`${name_1}验收`}-${this.Hour_1}/${this.tableData_7[0].useHour}
${itemName_2}-${this.tableData_7[1].reason}-${this.tableData_7[1].complete==100?'已完成':'未完成'}-${this.tableData_7[1].complete!=100?`预计 ${this.tableData_7[1].completeTime} 完成`:''}-${this.tableData_7[1].approverids == 0?'无人验收':`${name_2}验收`}-${this.Hour_1}/${this.tableData_7[1].useHour}
${itemName_3}-${this.tableData_7[2].reason}-${this.tableData_7[2].complete==100?'已完成':'未完成'}-${this.tableData_7[2].complete!=100?`预计 ${this.tableData_7[2].completeTime} 完成`:''}-${this.tableData_7[2].approverids == 0?'无人验收':`${name_3}验收`}-${this.Hour_1}/${this.tableData_7[2].useHour}
${itemName_4}-${this.tableData_7[3].reason}-${this.tableData_7[3].complete==100?'已完成':'未完成'}-${this.tableData_7[3].complete!=100?`预计 ${this.tableData_7[3].completeTime} 完成`:''}-${this.tableData_7[3].approverids == 0?'无人验收':`${name_4}验收`}-${this.Hour_1}/${this.tableData_7[3].useHour}`
                  ).then(res => {
                    console.log(res);
                    // this.$toast("已成功复制，可直接去粘贴");
                  });
            }
            if(this.tableData_7.length == 5){
                for(var i=0;i<this.applyUserList.length;i++){
                    if(this.applyUserList[i].value==this.tableData_7[0].approverids){
                        name_1 = this.applyUserList[i].label
                    }
                    if(this.applyUserList[i].value==this.tableData_7[1].approverids){
                        name_2 = this.applyUserList[i].label
                    }
                    if(this.applyUserList[i].value==this.tableData_7[2].approverids){
                        name_3 = this.applyUserList[i].label
                    }
                    if(this.applyUserList[i].value==this.tableData_7[3].approverids){
                        name_4 = this.applyUserList[i].label
                    }
                    if(this.applyUserList[i].value==this.tableData_7[4].approverids){
                        name_5 = this.applyUserList[i].label
                    }
                }
                // 项目
                for(var j=0;j<this.itemOptions.length;j++){
                    if(this.itemOptions[j].value == this.tableData_7[0].itemId){
                        itemName_1 = this.itemOptions[j].label
                    }
                    if(this.itemOptions[j].value == this.tableData_7[1].itemId){
                        itemName_2 = this.itemOptions[j].label
                    }
                    if(this.itemOptions[j].value == this.tableData_7[2].itemId){
                        itemName_3 = this.itemOptions[j].label
                    }
                    if(this.itemOptions[j].value == this.tableData_7[3].itemId){
                        itemName_4 = this.itemOptions[j].label
                    }
                    if(this.itemOptions[j].value == this.tableData_7[4].itemId){
                        itemName_5 = this.itemOptions[j].label
                    }
                }
                // 产品
                for (var k=0 ;k<this.productOptions.length; k++){
                    if(this.productOptions[k].value == this.tableData_7[0].itemId){
                        itemName_1 = this.productOptions[k].label
                    }
                    if(this.productOptions[k].value == this.tableData_7[1].itemId){
                        itemName_2 = this.productOptions[k].label
                    }
                    if(this.productOptions[k].value == this.tableData_7[2].itemId){
                        itemName_3 = this.productOptions[k].label
                    }
                    if(this.productOptions[k].value == this.tableData_7[3].itemId){
                        itemName_4 = this.productOptions[k].label
                    }
                    if(this.productOptions[k].value == this.tableData_7[4].itemId){
                        itemName_5 = this.productOptions[k].label
                    }
                }
                this.$copyText(
                  `${this.day_7.day}-${this.userList.deptName}--${this.userList.username}--${this.tableData_7[0].integral}
${itemName_1}-${this.tableData_7[0].reason}-${this.tableData_7[0].complete==100?'已完成':'未完成'}-${this.tableData_7[0].complete!=100?`预计 ${this.tableData_7[0].completeTime} 完成`:''}-${this.tableData_7[0].approverids == 0?'无人验收':`${name_1}验收`}-${this.Hour_1}/${this.tableData_7[0].useHour}
${itemName_2}-${this.tableData_7[1].reason}-${this.tableData_7[1].complete==100?'已完成':'未完成'}-${this.tableData_7[1].complete!=100?`预计 ${this.tableData_7[1].completeTime} 完成`:''}-${this.tableData_7[1].approverids == 0?'无人验收':`${name_2}验收`}-${this.Hour_1}/${this.tableData_7[1].useHour}
${itemName_3}-${this.tableData_7[2].reason}-${this.tableData_7[2].complete==100?'已完成':'未完成'}-${this.tableData_7[2].complete!=100?`预计 ${this.tableData_7[2].completeTime} 完成`:''}-${this.tableData_7[2].approverids == 0?'无人验收':`${name_3}验收`}-${this.Hour_1}/${this.tableData_7[2].useHour}
${itemName_4}-${this.tableData_7[3].reason}-${this.tableData_7[3].complete==100?'已完成':'未完成'}-${this.tableData_7[3].complete!=100?`预计 ${this.tableData_7[3].completeTime} 完成`:''}-${this.tableData_7[3].approverids == 0?'无人验收':`${name_4}验收`}-${this.Hour_1}/${this.tableData_7[3].useHour}
${itemName_5}-${this.tableData_7[4].reason}-${this.tableData_7[4].complete==100?'已完成':'未完成'}-${this.tableData_7[4].complete!=100?`预计 ${this.tableData_7[4].completeTime} 完成`:''}-${this.tableData_7[4].approverids == 0?'无人验收':`${name_5}验收`}-${this.Hour_1}/${this.tableData_7[4].useHour}`
                ).then(res => {
                  console.log(res);
                  // this.$toast("已成功复制，可直接去粘贴");
                });
            }

        },

    },
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
.el-col .el-col-24{
    margin-top: 5px!important;
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
    margin-top: 30px;
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
