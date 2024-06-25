import { request } from '@/utils/request'

export const getSetting = () => {
    return request({
        method: 'get',
        url: '/setting/get',
    })
}

export const updateSetting = (data) => {
    return request({
        method: 'post',
        url: '/setting/update',
        data,
    })
}