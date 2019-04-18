import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()

      return new Promise((resolve, reject) => {

        // login(username, userInfo.password).then(response => {
        //   const data = response.data;
        //   setToken(data.token)
        //   commit('SET_TOKEN', data.token);
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })
        let response = {"message":"获取token成功","code":1,"data":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTUzNzU0NTQxLCJleHAiOjE1NTM4NDA5NDF9.jLSe13_LH3TP3vVRW_G2Dqx03EK8VW9hP0AVIflzEis"}}
        const data = response.data;
        setToken(data.token)
        commit('SET_TOKEN', data.token);
        resolve()
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        // getInfo(state.token).then(response => {
        //   const data = response.data
        //   if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
        //     commit('SET_ROLES', data.roles)
        //   } else {
        //     reject('getInfo: roles must be a non-null array !')
        //   }
        //   commit('SET_NAME', data.name)
        //   commit('SET_AVATAR', data.avatar)
        //   resolve(response)
        // }).catch(error => {
        //   reject(error)
        // })
          let response = {"code":1,"data":{"avatar":"https://avatars0.githubusercontent.com/u/7777031?s=40&v=4","name":"admin","roles":["admin"]}}
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
              commit('SET_ROLES', data.roles)
          } else {
              reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        // logout(state.token).then(() => {
        //   commit('SET_TOKEN', '')
        //   commit('SET_ROLES', [])
        //   removeToken()
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
      })
    }
  }
}

export default user
