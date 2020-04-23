/**
 * Created by lk on 17/6/4.
 */
import axios from "../../utils/axios";

export function getPageList(query) {
    return axios({
        url: "/ability/grade/page",
        method: "get",
        params: query
    });
}

// 列表
export function getGradeAll(query) {
    return axios({
        url: "/ability/grade/all",
        method: "get",
        params: query
    });
}

