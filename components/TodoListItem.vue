<template>
  <li
    :class="{'shopping-list__item--checked': item.checked}"
    class="list-group-item shopping-list__item"
  >
    <span>{{ item.value }}</span>
    <div class="shopping-list__item-btns">
      <button aria-label="done" @click="toggleCheckItem">
        <i class="green bi bi-bag-check"></i>
      </button>
      <button aria-label="delete" @click="removeItem">
        <i class="red bi bi-x-circle"></i>
      </button>
    </div>
  </li>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: ['item'],
  methods: {
    async removeItem() {
      await this.$store.dispatch('todoList/removeItem', this.item._id)
    },
    async toggleCheckItem() {
      await this.$store.dispatch('todoList/toggleCheckItem', this.item)
    }
  }
})
</script>

<style>
</style>