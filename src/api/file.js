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

export const getfile = () => {
    return request({
        method: 'get',
        url: '/file/get',
    })
}

export const detectFile = (data) => {
    return request({
        method: 'POST',
        url: '/file/detect',
        data
    })
}