/**
 * Created by lk on 17/6/4.
 */
import axios from "../../utils/axios";

// 列表
export function getApplyPage(query) {
    return axios({
        url: "/admin/msg/page/apply",
        method: "get",
        params: query
    });
}

// 列表
export function getApproverPage(query) {
    return axios({
        url: "/admin/msg/page/approver",
        method: "get",
        params: query
    });
}
