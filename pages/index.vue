<template>
  <div id="app">
    <div class="container">
      <h1>Список покупок</h1>
      <div class="add-item-input">
        <input
          v-model="inputValue"
          class="form-control list-input"
          type="text"
          placeholder="Введи что нужно купить"
          aria-label="input"
          @keypress.enter.prevent="createNewItem"
        />
        <button
          type="button"
          class="btn btn-primary add-btn"
          @click="createNewItem"
        >
          <i class="bi bi-plus"></i>
        </button>
      </div>
      <todo-list />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TodoList from '~/components/TodoList.vue'
import {IListItem} from '~/store/todoList'

export default Vue.extend({
  components: {TodoList},
  async fetch({store}) {
    if (store.getters['todoList/list'].length === 0) {
      await store.dispatch('todoList/getItems')
      store.dispatch('loader/changeLoader', false)
    }
  },

  data: () => ({
    inputValue: ''
  }),

  methods: {
    onChange(e) {
      this.inputValue = e.target.value
    },
    async createNewItem() {
      const newItem: IListItem = {
        checked: false,
        value: this.inputValue
      }

      await this.$store.dispatch('todoList/addItem', newItem)
      this.inputValue = ''
    }
  }
})
</script>

<style>
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css');
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css');

:root {
  --bg: #eceaea;
}

body {
  margin: 0;
  height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--bg);
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

#root {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

li {
  list-style: none;
}

ul {
  margin: 0;
  padding: 0;
  margin-top: 40px;
}

button {
  background-color: transparent;
  border: none;
  outline: none;
}

#app {
  margin: auto;
  max-width: 600px;
  width: 600px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
}

.add-item-input {
  margin-top: 24px;
  display: grid;
  grid-template-columns: 1fr 0.1fr;
  grid-gap: 10px;
}
.add-item-input i {
  display: block;
  line-height: 1em;
}

.list-input {
  background-color: var(--bg);
}

.shopping-list__item {
  display: flex;
  justify-content: space-between;
  background-color: var(--bg);
}

.shopping-list__item--checked {
  opacity: 0.5;
}

.shopping-list__item--checked span {
  text-decoration: line-through;
}

.shopping-list__item button {
  transition: transform 0.2s ease;
}

.shopping-list__item button:hover {
  transform: scale(1.05);
}

.shopping-list__item i.red {
  color: red;
}

.shopping-list__item i.green {
  color: green;
}

@media screen and (max-width: 700px) {
  #app {
    width: calc(100% - 40px);
  }

  .add-item-input {
    margin-top: 12px;
  }
}
</style>
