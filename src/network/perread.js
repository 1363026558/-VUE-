import {get, post} from '@/network/request'

export function good(form) {
    return post({
        url: '/article/goods',
        data: {
            id: form.id,
            add: form.add  
        }
    })
}

export function postReview(form) {
    return post({
        url: '/article/addreview',
        data: {
            articleId: form.articleId,
            username: form.username,
            content: form.content  
        }
    })
}

export function review(id) {
    return post({
        url: '/article/reviews',
        data: {
            id
        }
    })
}

//查询文章
export function per(id) {
    return get({
        url: '/article/index',
        params: {
            id
        }
    })
}
