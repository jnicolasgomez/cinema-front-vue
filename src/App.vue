<template>
  <div class="app">
    <FilmsHeader/>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import FilmsHeader from './components/FilmsHeader.vue'


export default defineComponent({
  name: 'App',
  components: {FilmsHeader},
  setup() {
    const store = useStore()

    onBeforeMount(() => {
      store.dispatch('fetchUser')
    })
  },
  methods: {
  }
})
</script>

<style>
body {
  padding: 0;
  margin: 0;
}
</style>
