/**
 * Created by lk on 17/6/4.
 */
import axios from "../../utils/axios";

// 列表
export function getPageList(query) {
    return axios({
        url: "/weixin/account/page",
        method: "get",
        params: query
    });
}

export function getAccountList() {
    return axios({
        url: "/weixin/account/list",
        method: "get"
    });
}

export function addAccount(data) {
    return axios({
        url: "/weixin/account",
        method: "post",
        data: data
    });
}

export function updateAccount(data) {
    return axios({
        url: "/weixin/account",
        method: "put",
        data: data
    });
}

export function deleteAccount(id) {
    return axios({
        url: "/weixin/account/" + id,
        method: "delete"
    });
}
