/**
 * Created by lk on 17/6/4.
 */
import axios from "../../utils/axios";

/**
 * 采购分类
 */
export function getPurchase(id, userId) {
    return axios({
        url: `/apply/purchasetype/getPurchase/${id}/${userId}`,
        method: "get",
    });
}

/**
 * 添加采购申请
 */
export function ApplyPurchase(data) {
    return axios({
        url: `/apply/purchase`,
        method: "POST",
        data
    });
}

/**
 * 修改采购申请
 */
export function editApplyPurchase(data) {
    return axios({
        url: `/apply/purchase`,
        method: "put",
        data
    });
}


/**
 * 采购申请列表
 */
export function getPurchasePage(query) {
    return axios({
        url: `/apply/purchase/page`,
        method: "get",
        params: query
    });
}

/**
 * 采购审批列表
 */
export function getPurchaseApprover(query) {
    return axios({
        url: `/apply/purchase/approver/page`,
        method: "get",
        params: query
    });
}


/**
 * 删除申请
 */
export function delPurchase(purchaseId) {
    return axios({
        url: `/apply/purchase/del/${purchaseId}`,
        method: "DELETE",
    });
}

/**
 * 采购详情
 */
export function getPurchaseInfo(purchaseId) {
    return axios({
        url: `/apply/purchase/getPurchaseOne/${purchaseId}`,
        method: "get",
    });
}

/**
 * 审批采购
 */
export function updatePurchaseApprover(data) {
    return axios({
        url: `/apply/purchase/approver`,
        method: "put",
        data
    });
}

/**
 * 采购审批人
 */
export function getApprover(data) {
    return axios({
        url: `/apply/purchase/approver/getApprover`,
        method: "post",
        data
    });
}

/**
 * 采购负责人
 */
export function getBusinessDept(query) {
    return axios({
        url: `/apply/purchase/approver/getBussinessDept`,
        method: "get",
        params: query
    });
}


/**
 * 采购负责人
 */
export function applyEditpurchaseEs(data) {
    return axios({
        url: `/apply/purchase/editpurchaseEs`,
        method: "put",
        data
    });
}
