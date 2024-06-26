import { request } from '@/utils/request'

export const getRes = () => {
    return request({
        method: 'get',
        url: '/res/get',
    })
}
