import { request } from '@/utils/request'

export const getViolation = () => {
    return request({
        method: 'get',
        url: '/violation/get',
    })
}

export const delViolation = (data) => {
    return request({
        method: 'post',
        url: '/violation/del',
        data
    })
}

export const updateViolation = (data) => {
    return request({
        method: 'post',
        url: '/violation/update',
        data,
    })
}

