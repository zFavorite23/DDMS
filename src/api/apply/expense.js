/**
 * Created by lk on 17/6/4.
 */
import axios from "../../utils/axios";

/**
 * 我的支出申请列表
 * @param query
 * @returns {AxiosPromise}
 */
export function getExpenseList(query) {
    return axios({
        url: "/apply/expense/page",
        method: "get",
        params: query
    });
}

/**
 * 查询支出申请详情
 * @param gooutId
 * @returns {*}
 */
export function getExpenseInfo(expenseId) {
    return axios({
        url: "/apply/expense/info/" + expenseId,
        method: "get"
    });
}

/**
 * 添加支出申请
 * @param data
 * @returns {*}
 */
export function addObj(data) {
    return axios({
        url: "/apply/expense",
        method: "post",
        data: data
    });
}

/**
 * 修改支出申请
 * @param data
 * @returns {*}
 */
export function editObj(data) {
    return axios({
        url: "/apply/expense",
        method: "put",
        data: data
    });
}

/**
 * 修改支出采购状态
 * @param data
 * @returns {AxiosPromise}
 */
export function updateExpress(data) {
    return axios({
        url: "/apply/expense/express",
        method: "put",
        data: data
    });
}

/**
 * 发票确认
 * @param data
 * @returns {AxiosPromise}
 */
export function affirmExpense(data) {
    return axios({
        url: "/apply/expense/affirm",
        method: "put",
        data: data
    });
}

/**
 * 删除支出申请
 * @param expenseId
 * @returns {*}
 */
export function deleteObj(expenseId) {
    return axios({
        url: "/apply/expense/" + expenseId,
        method: "delete"
    });
}

/**
 * 我的支出审批列表
 * @param query
 * @returns {AxiosPromise}
 */
export function getExpenseApproverPage(query) {
    return axios({
        url: "/apply/expense/approver/page",
        method: "get",
        params: query
    });
}

/**
 *
 * 根据支出申请ID查询审批信息
 * @param gooutId
 * @returns {AxiosPromise}
 */
export function getExpenseApproverList(expenseId) {
    return axios({
        url: "/apply/expense/approver/list/" + expenseId,
        method: "get"
    });
}

/**
 * 审批支出申请
 * @param data
 * @returns {*}
 */
export function updateExpenseApprover(data) {
    return axios({
        url: "/apply/expense/approver",
        method: "put",
        data: data
    });
}

/**
 * 数据迁移
 * @returns {*}
 */
export function expenseMigration() {
    return axios({
        url: "/apply/expense/migration",
        method: "get"
    });
}

/**
 * 支出分类
 * @returns {*}
 */
export function getExpense(id,userId) {
    return axios({
        url: `/apply/exepensetype/getExpense/${id}/${userId}`,
        method: "get"
    });
}
