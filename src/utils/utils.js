import * as CryptoJS from "crypto-js";

// 表单序列化
export const serialize = data => {
    const list = [];
    Object.keys(data).forEach(ele => {
        list.push(`${ele}=${data[ele]}`);
    });
    return list.join("&");
};

/**
 * 生成随机len位数字
 */
export const randomLenNum = (len, date) => {
    let random = "";
    random = Math.ceil(Math.random() * 100000000000000)
        .toString()
        .substr(0, len || 4);
    if (date) random = random + Date.now();
    return random;
};

/**
 *加密处理
 */
export const encryption = params => {
    let { data, type, param, key } = params;
    const result = JSON.parse(JSON.stringify(data));
    if (type === "Base64") {
        param.forEach(ele => {
            result[ele] = btoa(result[ele]);
        });
    } else {
        param.forEach(ele => {
            var data = result[ele];
            key = CryptoJS.enc.Latin1.parse(key);
            var iv = key;
            // 加密
            var encrypted = CryptoJS.AES.encrypt(data, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.ZeroPadding
            });
            result[ele] = encrypted.toString();
        });
    }
    return result;
};

export function print(content, w = null, h = null) {
    // Fixes dual-screen position                         Most browsers      Firefox
    const dualScreenLeft =
        window.screenLeft !== undefined ? window.screenLeft : screen.left;
    const dualScreenTop =
        window.screenTop !== undefined ? window.screenTop : screen.top;

    const width = window.innerWidth
        ? window.innerWidth
        : document.documentElement.clientWidth
        ? document.documentElement.clientWidth
        : screen.width;
    const height = window.innerHeight
        ? window.innerHeight
        : document.documentElement.clientHeight
        ? document.documentElement.clientHeight
        : screen.height;
    w = +w === 0 ? width : w;
    h = +h === 0 ? height : h;
    const left = width / 2 - w / 2 + dualScreenLeft;
    const top = height / 2 - h / 2 + dualScreenTop;
    var myWindow = window.open(
        "",
        "打印",
        "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=" +
            w +
            ", height=" +
            h +
            ", top=" +
            top +
            ", left=" +
            left
    );
    var style =
        "<style type='text/css'>" +
        "table.gridtable {font-family: verdana,arial,sans-serif;font-size:11px;color:#333333;border-width: 1px;border-color: #666666;}" +
        "table.gridtable th {border-width: 1px;padding: 1px;border-style: solid;border-color: #666666;background-color: #666666;}" +
        "table.gridtable td {border-width: 1px;padding: 1px;border-style: solid;border-color: #666666;background-color: #ffffff;}" +
        "</style>";
    myWindow.document.write(content + style);
    myWindow.focus();
    myWindow.document.close(); //关闭document的输出流, 显示选定的数据
    myWindow.print(); //打印当前窗口
    return myWindow;
}
