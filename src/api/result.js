import { request } from '@/utils/request'

export const getRes = () => {
    return request({
        method: 'get',
        url: '/res/get',
    })
}

export const delRes = (data) => {
    return request({
        method: 'post',
        url: '/res/delete',
        data,
    })
}