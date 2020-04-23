/**
 * Created by lk on 17/6/4.
 */
import axios from "../../utils/axios";

// 谁最懂我相关

// 列表
export function getPageList(query) {
    return axios({
        url: "/checkwork/clock/page",
        method: "get",
        params: query
    });
}

// 列表
export function getClockInfo(clockId) {
    return axios({
        url: "/checkwork/clock/" + clockId,
        method: "get"
    });
}

export function getAbnormalSeven(userId) {
    return axios({
        url: "/checkwork/clock/abnormal/seven/" + userId,
        method: "get"
    });
}

export function getStatistics(query) {
    return axios({
        url: "/checkwork/clock/statistics",
        method: "get",
        params: query
    });
}

export function getStatisticsUserId(query) {
    return axios({
        url: "/checkwork/clock/statistics/user",
        method: "get",
        params: query
    });
}

/**
 * 考勤数据迁移
 * @returns {*}
 */
export function clockMigration() {
    return axios({
        url: "/checkwork/clock/migration",
        method: "get"
    });
}


/**
 * 迟到早退统计图
 * @param query
 * @returns {*}
 */
export function getStatisticsAbnormal(query) {
    return axios({
        url: "/checkwork/clock/statistics/abnormal",
        method: "get",
        params: query
    });
}
