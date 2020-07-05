/**
 * Created by lk on 17/6/4.
 */
import axios from "../../utils/axios";

export function getProcessPage(query) {
    return axios({
        url: "/act/process",
        method: "get",
        params: query
    });
}


export function delProcess(id) {
    return axios({
        url: "/act/process/" + id,
        method: "delete"
    });
}
