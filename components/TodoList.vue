<template>
  <div>
    <ul v-if="list.length && !loading" className="list-group shopping-list">
      <todo-list-item v-for="item of list" :key="item._id" :item="item" />
    </ul>
    <loader v-else-if="loading" />
    <span v-else>Список покупок пуст</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Loader from './Loader.vue'
import TodoListItem from './TodoListItem.vue'
export default Vue.extend({
  components: {TodoListItem, Loader},

  computed: {
    list() {
      return this.$store.getters['todoList/list']
    },
    loading() {
      return this.$store.getters['loader/loading']
    }
  }
})
</script>