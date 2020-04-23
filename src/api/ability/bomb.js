/**
 * Created by lk on 17/6/4.
 */
import axios from "../../utils/axios";


/**
 * 我收到的
 * @param query
 * @returns {AxiosPromise}
 */
export function getBombDropByToUserId(query) {
    return axios({
        url: "/ability/bomb/drop/toUser/page",
        method: "get",
        params: query
    });
}

/**
 * 我的能力成长雷达图
 * @param query
 * @returns {AxiosPromise}
 */
export function getBombDropCircleByToUserId(query) {
    return axios({
        url: "/ability/bomb/drop/circle",
        method: "get",
        params: query
    });
}

export function getBombDropStatistics(query) {
    return axios({
        url: "/ability/bomb/drop/statistics",
        method: "get",
        params: query
    });
}


