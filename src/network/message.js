import {get, post} from '@/network/request'

export function getMessage() {
    return get({
        url: '/article/words'
    })
}

export function postMessage(form) {
    return post({
        url: '/article/addwords',
        data: {
            username: form.username,
            content: form.content  
        }
    })
}

export function postReview(form) {
    return post({
        url: '/article/addreview',
        data: {
            username: form.username,
            content: form.content  
        }
    })
}