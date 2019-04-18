const protodoc = {
    state: {
        data: {},
        list: []
    },

    mutations: {
        SET_PROTODOC_DATA: (state, data) => {
            state.data = data
        },
        SET_PROTODOC_LIST: (state, list) => {
            state.list = list
        }
    },

    actions: {
        SetData({ commit }, data) {
            commit('SET_PROTODOC_DATA', data);
        },
        SetList({ commit, data }) {
            commit('SET_PROTODOC_LIST', data);
        }
    }
}

export default protodoc
