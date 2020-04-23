/**
 * Created by lk on 17/6/4.
 */
import axios from "../../utils/axios";

/**
 * @param query
 * @returns {*}
 */
export function getApplyStatistics(userId) {
    return axios({
        url: "/apply/statistics/apply/count/" + userId,
        method: "get"
    });
}

export function getCheckStatistics(userId) {
    return axios({
        url: "/apply/statistics/check/count/" + userId,
        method: "get"
    });
}
