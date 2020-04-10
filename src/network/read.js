import {get, post} from '@/network/request'

//请求文章
export function getArticle(category) {
    return get({
        url: '/article/index',
        params: {
            category
        }
    })
}

//查询文章
export function searchArticle(title) {
    return get({
        url: '/article/index',
        params: {
            title
        }
    })
}

