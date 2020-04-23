/**
 * Created by lk on 17/6/4.
 */
import axios from "../../utils/axios";

// 列表
export function getPageList(query) {
    return axios({
        url: "/weixin/fans/page",
        method: "get",
        params: query
    });
}

export function addFans(data) {
    return axios({
        url: "/weixin/fans",
        method: "post",
        data: data
    });
}

export function updateFans(data) {
    return axios({
        url: "/weixin/fans",
        method: "put",
        data: data
    });
}

export function deleteFans(id) {
    return axios({
        url: "/weixin/fans/" + id,
        method: "delete"
    });
}

export function syncFans(appid) {
    return axios({
        url: "/weixin/fans/sync/" + appid,
        method: "post"
    });
}
