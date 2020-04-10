// import request from '@/network/request'
// //文章请求
// export function getHomeData(board) {
//     return request({
//         url: '/article/index',
//         params: {
//             board
//         }
//     })
// }
// //获取banner
// export function getBanner() {
//     return request({
//         url: '/article/banner'
//     })
// }
import {get, post} from '@/network/request'

export function getHomeData(board) {
    return get({
        url: '/article/index',
        params: {
            board
        }
    })
}

export function getBanner() {
    return get({
        url: '/article/banner'
    })
}