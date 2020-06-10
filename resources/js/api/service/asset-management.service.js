import {ApiService} from '../api.service.js'

const resource = '/asset'

export default {
    getAsset(params = {}) {
        return ApiService.get(`${resource}`, {
            ...params,
        })
    },
    getAsset(assetId, params = {}) {
        return ApiService.get(`${resource}/${assetId}`, {
            ...params,
        })
    },
    postAsset(payload = {}) {
        return ApiService.post(`${resource}`, payload)
    },

    putAsset(assetId, params = {}) {
        return ApiService.put(`${resource}/${assetId}`, params)
    },

    deleteAsset(assetId) {
        return ApiService.delete(`${resource}/${assetId}`)
    },
}
