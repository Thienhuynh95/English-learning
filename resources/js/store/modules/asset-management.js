import assetService from '../../api/service/asset-management.service'
import Vue from 'vue'

export const namespaced = true

const initialState = {
    list: [],
    item: {},
    paginator: {},
    queryParams: {
        page: 1,
        perPage: 10
    },
}

const state = {...initialState}

const getters = {
    list: state => state.list,
    item: state => state.item,
    paginator: state => state.paginator,
    getQueryParams: state => state.queryParams,
}

const mutations = {
    setQueryParams(state, queryParams) {
        state.queryParams = {...queryParams}
    }

}

const actions = {
    async getLists({commit}, params) {
        if (_.keys(params).length === 0) {
            params = {...state.queryParams}
        }

        if (params.perPage === 0) {
            params = {}
        }

        params = {...params}

        await assetService.getCategories(params).then(res => {
            const pagination = res.data.pagination
            const list = res.data.data
            commit('setList', {
                list: list,
                queryParams: params,
            })

            if (pagination) {
                commit('setPaginator', {
                    totalPages: pagination.totalPages || 0,
                    page: pagination.currentPage,
                    perPage: pagination.perPage
                })
            }
        })
    },
}

export default {
    namespaced,
    state,
    getters,
    mutations,
    actions,
}
