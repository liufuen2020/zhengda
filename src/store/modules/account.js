import local from '@/utils/localstorage'

export default {
  namespaced: true,
  state: {
    token: local.get('USER_TOKEN'),
    expireTime: local.get('EXPIRE_TIME'),
    user: local.get('USER'),
    permissions: local.get('PERMISSIONS'),
    roles: local.get('ROLES')
  },
  mutations: {
    setToken(state, val) {
      local.set('USER_TOKEN', val)
      state.token = val
    },
    setExpireTime(state, val) {
      local.set('EXPIRE_TIME', val)
      state.expireTime = val
    },
    setUser(state, val) {
      local.set('USER', val)
      state.user = val
    },
    setPermissions(state, val) {
      local.set('PERMISSIONS', val)
      state.permissions = val
    },
    setRoles(state, val) {
      local.set('ROLES', val)
      state.roles = val
    },
    setYx(state, val) {
      local.set('isYxRole', val)
      state.isYxRole = val
    }
  }
}
