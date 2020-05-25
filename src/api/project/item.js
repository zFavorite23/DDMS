/**
 * Created by lk on 17/6/4.
 */
import axios from "../../utils/axios";

// 列表
export function getPageList(query) {
    return axios({
        url: "/project/item/page",
        method: "get",
        params: query
    });
}

export function getItemAll() {
    return axios({
        url: "/project/item/all",
        method: "get"
    });
}

export function addItem(data) {
    return axios({
        url: "/project/item",
        method: "post",
        data: data
    });
}

export function editItem(data) {
    return axios({
        url: "/project/item",
        method: "put",
        data: data
    });
}

export function deleteItem(itemId) {
    return axios({
        url: "/project/item/" + itemId,
        method: "delete"
    });
}

// 项目开票信息
export function getReceipt(itemId) {
    return axios({
        url: `/project/item/receipt/${itemId}`,
        method: 'get',
    })
}

// 项目报销
export function getItemPay(query){
	return axios({
		url:'/project/item/payBack',
        method:'get',
        params:query
	})
}

// 支出管理
export function getExpend(query){
    return axios({
        url:'/project/item/expend',
        method:'get',
        params:query
    })
}

/**
 * 项目数据迁移
 * @returns {*}
 */
export function itemMigration() {
    return axios({
        url: "/project/item/migration",
        method: "get"
    });
}
