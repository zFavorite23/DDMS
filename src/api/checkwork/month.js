/**
 * Created by lk on 17/6/4.
 */
import axios from "../../utils/axios";

/**
 * 分页列表
 * @param query
 * @returns {AxiosPromise}
 */
export function fetchList(query) {
    return axios({
        url: "/checkwork/month/page",
        method: "get",
        params: query
    });
}

/**
 * 初始化
 * @param data
 * @returns {AxiosPromise}
 */
export function initNum(data) {
    return axios({
        url: "/checkwork/month/init",
        method: "post",
        data: data
    });
}

export function putObj(data) {
    return axios({
        url: "/checkwork/month",
        method: "put",
        data: data
    });
}

// 列表
export function getClockNum(query) {
    return axios({
        url: "/checkwork/month/num",
        method: "get",
        params: query
    });
}
