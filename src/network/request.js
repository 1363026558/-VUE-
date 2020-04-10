import axios from 'axios'
import qs from 'qs'


//axios默认配置
axios.defaults.baseURL = 'http://39.105.138.173:666/admin';
axios.defaults.timeout = 5000;

// 2.axios请求拦截
axios.interceptors.request.use(config => {
    //序列化请求数据
    config.data = qs.stringify(config.data);
    
    //请求头设置，config信息不符合要求
    config.headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    //请求数据时，显示等待信息
    //某些请求时需要携带信息，（token）
    return config;
}, err => {
    console.log(err);
})

//3.axios响应拦截
axios.interceptors.response.use(res => {
    return res.data;
}, err => {
    console.log(err);
})


export function get(config) {
    const get = axios.get(config.url, {
       params: config.params
    })
    return get;
}

export function post(config) {
    
    const post = axios.post(config.url, config.data)
    return post;
}