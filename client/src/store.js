import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/database/server'
import swal from 'sweetalert'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id: '',
    isLogin: false,
    username: '',
    errorFirstName: '',
    errorLastName: '',
    errorEmail: '',
    errorUsername: '',
    errorPassword: '',
    errorLogin: ''
  },
  mutations: {
    setFirstNameError(state, payload) {
      state.errorFirstName = payload
    },
    setLastNameError(state, payload) {
      state.errorLastName = payload
    },
    setEmailError(state, payload) {
      state.errorEmail = payload
    },
    setUsernameError(state, payload) {
      state.errorUsername = payload
    },
    setPasswordError(state, payload) {
      state.errorPassword = payload
    },
    setId(state, payload) {
      state.id = payload
    },
    setIsLogin(state, payload) {
      state.isLogin = payload
    },
    setUsername(state, payload) {
      state.username = payload
    },
    setErrorLogin(state, payload) {
      state.errorLogin = payload
    }
  },
  actions: {
    verifyToken({ commit }, { isToken }) {
      axios
        .get('/verify', {
          headers: {
            token: isToken
          }
        })
        .then(({ data }) => {
          commit('setId', data.id)
          commit('setIsLogin', true)
          commit('setUsername', data.username)
        })
        .catch(({ response }) => {
          console.log(response)
          commit('setId', '')
          commit('setIsLogin', false)
          commit('setUsername', '')
        })
    },
    userRegistration({ commit }, { firstName, lastName, username, email, password }) {
      const data = {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password
      }

      axios
        .post('/register', data)
        .then(({ data }) => {
          console.log('data')
          router.push('/')
          swal("Register berhasil!!", "Harap LOGIN terlebih dahulu untuk melanjutkan!!", "success")
        })
        .catch(({ response }) => {
          if (response.data) {
            if (response.data.firstName != undefined) {
              commit('setFirstNameError', response.data.firstName.message)
            } else {
              commit('setFirstNameError', '')
            }

            if (response.data.lastName != undefined) {
              commit('setLastNameError', response.data.lastName.message)
            } else {
              commit('setLastNameError', '')
            }

            if (response.data.email != undefined) {
              commit('setEmailError', response.data.email.message)
            } else {
              commit('setEmailError', '')
            }

            if (response.data.username != undefined) {
              commit('setUsernameError', response.data.username.message)
            } else {
              commit('setUsernameError', '')
            }

            if (response.data.password != undefined) {
              commit('setPasswordError', response.data.password.message)
            } else {
              commit('setPasswordError', '')
            }
          }
        })
    },
    userLogin({ commit }, { username, password }) {
      const data = {
        username: username,
        password: password
      }
      axios
        .post('/login', data)
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          commit('setId', data.id)
          commit('setIsLogin', true)
          commit('setUsername', data.username)
          router.push('/')
          swal("Welcome", data.username, "success")
        })
        .catch(({ response }) => {
          if (response.data) {
            if (response.data.message != undefined) {
              commit('setErrorLogin', response.data.message)
            } else {
              commit('setErrorLogin', '')
            }
          }
        })
    },
    userLogout({ commit }) {
      localStorage.clear()
      commit('setId', '')
      commit('setIsLogin', false)
      commit('setUsername', '')
      router.push('/')
      swal("Good Bye", "success")
    }
    
  },
  getters: {
    errorFirstName(state) {
      return state.errorFirstName
    },
    errorLastName(state) {
      return state.errorLastName
    },
    errorEmail(state) {
      return state.errorEmail
    },
    errorUsername(state) {
      return state.errorUsername
    },
    errorPassword(state) {
      return state.errorPassword
    },
    errorLogin(state) {
      return state.errorLogin
    },
    isLogin(state) {
      return state.isLogin
    },
    isUsername(state) {
      return state.username
    }
  }
})
