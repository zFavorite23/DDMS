/**
 * Created by lk on 17/6/4.
 */
import axios from "../../utils/axios";

/**
 * 我的工时申请列表
 * @param query
 * @returns {AxiosPromise}
 */
export function getManhourPage(query) {
    return axios({
        url: "/apply/manhour/page",
        method: "get",
        params: query
    });
}

/**
 * 查询工时申请详情
 * @param manhourId
 * @returns {*}
 */
export function getManhourInfo(manhourId) {
    return axios({
        url: "/apply/manhour/info/" + manhourId,
        method: "get"
    });
}


/**
 * 添加工时申请
 * @param data
 * @returns {*}
 */
export function addObj(data) {
    return axios({
        url: "/apply/manhour/saveBatchManhour",
        method: "post",
        data: data
    });
}

/**
 * 修改工时申请
 * @param data
 * @returns {*}
 */
export function editObj(data) {
    return axios({
        url: "/apply/manhour",
        method: "put",
        data: data
    });
}

export function completeObj(data) {
    return axios({
        url: "/apply/manhour/complete",
        method: "put",
        data: data
    });
}

/**
 * 删除工时申请
 * @param manhourId
 * @returns {*}
 */
export function deleteObj(manhourId) {
    return axios({
        url: "/apply/manhour/" + manhourId,
        method: "delete"
    })
}


/**
 * 个人看板
 * 时间分配
 * 主分类
 * 饼图
 * @param query
 * @returns {AxiosPromise}
 */
export function getPieChartCainClassify(query) {
    return axios({
        url: "/apply/manhour/pie/mainClassify",
        method: "get",
        params: query
    });
}

/**
 * 个人看板
 * 时间分配
 * 项目
 * 饼图
 * @param query
 * @returns {AxiosPromise}
 */
export function getPieChartItem(query) {
    return axios({
        url: "/apply/manhour/pie/item",
        method: "get",
        params: query
    });
}

/**
 * 公司看板
 * 工作效率
 * 拒绝次数统计
 * @param query
 * @returns {AxiosPromise}
 */
export function getBarRefuse(query) {
    return axios({
        url: "/apply/manhour/bar/refuse",
        method: "get",
        params: query
    });
}

/**
 * 公司看板
 * 工作效率
 * 有、无人验收统计
 * @param query
 * @returns {AxiosPromise}
 */
export function getBarApproverids(query) {
    return axios({
        url: "/apply/manhour/bar/approverids",
        method: "get",
        params: query
    });
}


/**
 * 我的工时审批列表
 * @param query
 * @returns {AxiosPromise}
 */
export function getManhourApproverPage(query) {
    return axios({
        url: "/apply/manhour/approver/page",
        method: "get",
        params: query
    });
}



/**
 * 根据工时申请ID查询审批信息
 * @param manhourId
 * @returns {AxiosPromise}
 */
export function getManhourApproverList(manhourId) {
    return axios({
        url: "/apply/manhour/approver/list/" + manhourId,
        method: "get"
    });
}

/**
 * 审批工时申请
 * @param data
 * @returns {*}
 */
export function updateManhourApproverAll(data) {
    return axios({
        url: "/apply/manhour/approver/checkAllItem",
        method: "put",
        data: data
    });
}

export function updateManhourApprover(data) {
    return axios({
        url: "/apply/manhour/approver/checkItem",
        method: "put",
        data: data
    });
}


