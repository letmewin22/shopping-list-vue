export interface IListItem {
  _id?: string
  checked: boolean
  value: string
}

export interface IListItemState {
  list: IListItem[]
}

interface IGetItems {
  state: IListItemState
  commit: any
}

interface IAddItem {
  state: IListItemState
  commit: any
  dispatch: any
}

const URL = 'https://mysterious-caverns-45772.herokuapp.com'

export const state = () => ({
  list: []
})

export const mutations = {
  setList(state: any, list: any) {
    state.list = list
  }
}

export const actions = {
  async getItems({state, commit}: IGetItems) {
    let list: IListItem[]
    if (state.list.length === 0) {
      list = await this.$axios.$get(`${URL}/api/list/`)
    } else {
      list = state.list
    }
    commit('setList', list)
  },

  async addItem({commit, dispatch, state}: IAddItem, el: IListItem) {
    if (el.value.trim().length > 0) {
      try {
        const res = await this.$axios.$post(`${URL}/api/list/`, el)

        commit('setList', [...state.list, res.body])
        dispatch('getItems')
      } catch (e) {
        console.log(e.message)
      }
    }
  },

  async removeItem({commit, dispatch, state}, id: string) {
    try {
      await this.$axios.$delete(`${URL}/api/list/${id}`)
      const updatedList = state.list.filter(item => item._id !== id)
      commit('setList', updatedList)
      dispatch('getItems')
    } catch (e) {
      console.log(e.message)
    }
  },

  async toggleCheckItem({commit, dispatch, state}, el: IListItem) {
    try {
      const res = await this.$axios.put(`${URL}/api/list/${el._id}`, {
        checked: !el.checked
      })

      const updatedList = state.list.map(item => {
        if (item._id === res.data._id) {
          return (item = res.data)
        }
        return item
      })

      commit('setList', updatedList)
      dispatch('getItems')
    } catch (e) {
      console.log(e.message)
    }
  }
}

export const getters = {
  list: (s: any) => s.list
}
