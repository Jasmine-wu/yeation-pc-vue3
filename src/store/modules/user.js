// state从选项变成函数
const state = () => {
    return {
        // 用户信息
        profile: {
            id: '100',
            avatar: '',
            nickname: '',
            account: '',
            mobile: '',
            token: ''
        }
    }
};

const mutations = {
    setUser(state, playload) {
        state.profile = playload;
    },
    removeUser(state) {
        state.profile = {
            id: '',
            avatar: '',
            nickname: '',
            account: '',
            mobile: '',
            token: ''
        }
    }
};
const actions = {

    login() {

    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}