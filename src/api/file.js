import { request } from '@/utils/request'

export const recordUpload = (data) => {
    return request({
        method: 'post',
        url: '/recordUpload',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    })
}