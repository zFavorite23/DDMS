/**
 * Created by lk on 17/6/4.
 */
import axios from "../../utils/axios";

// 列表
export function getPageList(query) {
    return axios({
        url: "/checkwork/clockHour/page",
        method: "get",
        params: query
    });
}

export function getClockHourInfo(hourId) {
    return axios({
        url: "/checkwork/clockHour/" + hourId,
        method: "get"
    });
}

export function loadClockDay(userId, day) {
    return axios({
        url: "/checkwork/clockHour/load",
        method: "get",
        params: {
            userId: userId,
            day: day
        }
    });
}

/**
 * 历史七天可填报工时
 * @param userId
 * @returns {*}
 */
export function getAbnormalSeven(userId) {
    return axios({
        url: "/checkwork/clockHour/abnormal/seven/" + userId,
        method: "get"
    });
}

/**
 * 个人系数
 * @param query
 * @returns {AxiosPromise}
 */
export function getHourRadixUser(query) {
    return axios({
        url: "/checkwork/clockHour/user",
        method: "get",
        params: query
    });
}
export function getHourRadixUserBySum(query) {
    return axios({
        url: "/checkwork/clockHour/user/sum",
        method: "get",
        params: query
    });
}

export function getHourRadixUserYesterday(){
    return axios({
        url:'checkwork/clockHour/user/yesterday',
        method:'get'
    })
}

/**
 * 部门系数
 * @param query
 * @returns {AxiosPromise}
 */
export function getHourRadixDept(query) {
    return axios({
        url: "/checkwork/clockHour/dept",
        method: "get",
        params: query
    });
}
export function getHourRadixDeptBySum(query) {
    return axios({
        url: "/checkwork/clockHour/dept/sum",
        method: "get",
        params: query
    });
}

export function getDecline(query) {
    return axios({
        url: "/checkwork/clockHour/decline",
        method: "get",
        params: query
    });
}

/**
 * 中心系数
 */

export function getHourRadixDeptCentre(query) {
    return axios({
        url: "/checkwork/clockHour/dept/centre",
        method: "get",
        params: query
    });
}
export function getHourRadixDeptCentreuser(query) {
    return axios({
        url: "/checkwork/clockHour/centre/user",
        method: "get",
        params: query
    });
}

