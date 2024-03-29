import axios from 'axios'

export function request(config) {
    const instance = axios.create({
        // baseURL: 'http://123.207.32.32:8000',
        baseURL: "http://152.136.185.210:7878/api/m5",
        timeout: 5000
    })

    // axios的拦截器
    //2.1 请求拦截的作用
    instance.interceptors.request.use(config => {
            // console.log(config);
            //1.比如config中有一些信息不符合服务器的要求
            //2.比如每次发送网络请求时，都希望在界面中显示一个请求的图标
            //3.某些网络请求(比如登录(token)),必须携带一些特殊的信息
            //拦截之后还要将对应的结果进行返回
            return config
        }, err => {
            // console.log(err);
        })
        //2.2响应拦截
    instance.interceptors.response.use(res => {
        // console.log(res);
        return res.data
    }, err => {
        // console.log(err);
    })

    //发送真正的网络请求
    //instance(config) 返回的就是一个Promise
    return instance(config)
}