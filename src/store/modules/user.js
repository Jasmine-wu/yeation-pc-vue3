const state = {
    token: "1333"
};

const getters = {
    message(state) {
        return state.token + "message"
    }
};

const mutations = {
    updateToken(state, val) {
        state.token = val;
    },
};
const actions = {
    syncUpdateToken(context, val) {
        setTimeout(() => {
            context.commit("updateToken", val)
        }, 1000);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}