/* 
    弹出层：状态栏，消息，加载...
*/
import { ElLoading, ElMessage } from 'element-plus'

// 全局变量
let loaded = null;
let count_request = 0;

// 开启加载
const openLoad = (data = {}) => {
    loaded = ElLoading.service({
        lock: true,
        text: data.text || "Loading...",
        background: 'rgba(0, 0, 0, 0.7)',
        target: data.target || "body"
    })
}

const closeLoad = () => {
    loaded.close()
    loaded = null
}

// 关闭
// const closeLoad = debounce(() => {
//     loaded.close()
//     loaded = null
// }, 300, false)


/**
 * @desc  函数防抖---“立即执行版本” 和 “非立即执行版本” 的组合版本
 * @param  func 需要执行的函数
 * @param  wait 延迟执行时间（毫秒）
 * @param  immediate---true 表立即执行，false 表非立即执行
 **/
// function debounce(func, wait, immediate) {
//     let timer;

//     return function () {
//         let context = this;
//         let args = arguments;

//         if (timer) clearTimeout(timer);
//         if (immediate) {
//             var callNow = !timer;
//             timer = setTimeout(() => {
//                 timer = null;
//             }, wait)
//             if (callNow) func.apply(context, args)
//         } else {
//             timer = setTimeout(function () {
//                 func.apply(context, args)
//             }, wait);
//         }
//     }
// }

// 处理多次请求
export const showLoading = (data) => {
    if (count_request == 0 && !loaded) {
        openLoad(data)
    }
    count_request++;
}

export const hideLoading = () => {
    if (count_request <= 0) return
    count_request--;
    count_request = Math.max(count_request, 0);
    if (count_request === 0) {
        closeLoad()
    }
}

export const errorLoading = () => {
    ElMessage({
        message: "请稍后重试",
        type: "error",
    });
}

export const successLoading = () => {
    ElMessage({
        message: "SUCCESS",
        type: "success",
    });
}