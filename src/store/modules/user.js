// state从选项变成函数
const state = () => {
    return {
        // 用户信息
        profile: {
            id: '',
            avatar: '',
            nickname: '',
            account: '',
            mobile: '',
            token: 'w'
        }
    }
}

const mutations = {
    setUser(state, playload) {
        state.profile = playload
    }
}
const actions = {

    login() {

    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}