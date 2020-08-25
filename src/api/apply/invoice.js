/**
 * Created by lk on 17/6/4.
 */
import axios from "../../utils/axios";

/**
 * 我的报销申请列表
 * @param query
 * @returns {AxiosPromise}
 */
export function getInvoicePage(query) {
    return axios({
        url: "/apply/invoice/page",
        method: "get",
        params: query
    });
}

/**
 * 报销分类
 */
export function getInvoices(id,userId) {
    return axios({
        url: `/apply/invoicestype/getInvoices/${id}/${userId}`,
        method: "get",
    });
}

/**
 * 查询报销申请详情
 * @param invoiceId
 * @returns {*}
 */
export function getInvoiceInfo(invoiceId) {
    return axios({
        url: "/apply/invoice/info/" + invoiceId,
        method: "get"
    });
}

/**
 * 添加报销申请
 * @param data
 * @returns {*}
 */
export function addObj(data) {
    return axios({
        url: "/apply/invoice",
        method: "post",
        data: data
    });
}

/**
 * 修改报销申请
 * @param data
 * @returns {*}
 */
export function editObj(data) {
    return axios({
        url: "/apply/invoice",
        method: "put",
        data: data
    });
}

/**
 * 发票确认
 * @param data
 * @returns {AxiosPromise}
 */
export function affirmInvoice(data) {
    return axios({
        url: "/apply/invoice/affirm",
        method: "put",
        data: data
    });
}

/**
 * 删除报销申请
 * @param invoiceId
 * @returns {*}
 */
export function deleteObj(invoiceId) {
    return axios({
        url: "/apply/invoice/" + invoiceId,
        method: "delete"
    });
}

/**
 * 我的报销审批列表
 * @param query
 * @returns {AxiosPromise}
 */
export function getInvoiceApproverPage(query) {
    return axios({
        url: "/apply/invoice/approver/page",
        method: "get",
        params: query
    });
}

/**
 * 根据报销申请ID查询审批信息
 * @param invoiceId
 * @returns {AxiosPromise}
 */
export function getInvoiceApproverList(invoiceId) {
    return axios({
        url: "/apply/invoice/approver/list/" + invoiceId,
        method: "get"
    });
}

/**
 * 根据报销申请ID查询拒绝历史信息
 * @param invoiceId
 * @returns {AxiosPromise}
 */
export function getInvoiceRefuse(invoiceId) {
    return axios({
        url: `/apply/invoice/approver/list/refuse/${invoiceId}`,
        method: "get"
    });
}


/**
 * 审批报销申请
 * @param data
 * @returns {*}
 */
export function updateInvoiceApprover(data) {
    return axios({
        url: "/apply/invoice/approver",
        method: "put",
        data: data
    });
}

/**
 * 数据迁移
 * @returns {*}
 */
export function invoiceMigration() {
    return axios({
        url: "/apply/invoice/migration",
        method: "get"
    });
}

/**
 * 财务管理
 * 项目汇总
 * @returns {*}
 */
export function getFinanceItem(query) {
    return axios({
        url: "/apply/invoice/financeItem",
        method: "get",
        params: query
    });
}

/**
 * 财务管理
 * 人员汇总
 * @returns {*}
 */
export function getFinanceUser(query) {
    return axios({
        url: "/apply/invoice/financeUser",
        method: "get",
        params: query
    });
}


/**
 * 报销统计
 * 
 * @returns {*}
 */
export function getStatisticsPage(query) {
    return axios({
        url: "/apply/invoice/getStatisticsPage",
        method: "get",
        params: query
    });
}
