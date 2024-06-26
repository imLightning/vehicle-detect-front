import { request } from '@/utils/request.js'

export function login(user) {
    let e = {
        method: "POST",
        url: "/login",
        data: user
    }
    return request(e)
}

export function isLogin(token) {
    if (token !== undefined) {
        let e = {
            method: "GET",
            url: `/is_login/${token}`,
            data: token
        }
        return request(e)
    }
}