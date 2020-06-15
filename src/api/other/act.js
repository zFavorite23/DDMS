/**
 * Created by lk on 17/6/4.
 */
import axios from "../../utils/axios";

export function getModelPage(query) {
    return axios({
        url: "/act/model",
        method: "get",
        params: query
    });
}

export function insertModel(obj) {
    return axios({
        url: "/act/model/insert",
        method: "post",
        data: obj
    });
}

export function deployModel(id) {
    return axios({
        url: "/act/model/deploy/" + id,
        method: "post"
    });
}



export function delModel(id) {
    return axios({
        url: "/act/model/" + id,
        method: "delete"
    });
}
