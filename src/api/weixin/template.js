/**
 * Created by lk on 17/6/4.
 */
import axios from "../../utils/axios";

// 列表
export function getPageList(query) {
    return axios({
        url: "/weixin/template/page",
        method: "get",
        params: query
    });
}

export function syncTemplate(appid) {
    return axios({
        url: "/weixin/template/sync/" + appid,
        method: "post"
    });
}
