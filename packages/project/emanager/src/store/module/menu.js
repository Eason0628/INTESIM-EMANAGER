export default {
    namespaced: true,
    state: {
        selectedKeys: [],
        openKeys: []
    },
    mutations: {
        SET_SELECTED_KEYS(state, val) {
            state.selectedKeys = val
        },
        SET_OPEN_KEYS(state, val) {
            state.openKeys = val
        }
    }, actions: {
        updateSelectedKeys({ commit }, keys) {
            commit('SET_SELECTED_KEYS', keys)
        },
        updateOpendKeys({ commit }, keys) {
            commit('SET_OPEN_KEYS', keys)
        }
    }, getters: {
        getSelecteKeys(state) {
            return state.selectedKeys
        },
        getOpenKeys(state) {
            return state.openKeys
        }
    }
}