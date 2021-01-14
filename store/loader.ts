export const state = () => ({
  loading: true
})

export const mutations = {
  setLoader(state: any, loading: any) {
    state.loading = loading
  }
}

export const actions = {
  changeLoader({commit}: {commit: any}, value: boolean) {
    commit('setLoader', value)
  }
}

export const getters = {
  loading: (s: any) => s.loading
}
