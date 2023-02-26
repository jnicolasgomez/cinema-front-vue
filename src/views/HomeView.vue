<template>
  <div class="home">
    <h1>Cines</h1>
    <CinemaMap />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import CinemaMap from '../components/CinemaMap.vue'
export default defineComponent({
  name: 'HomeView',
  components: {
    CinemaMap,
  },
  setup () {
  },
  async created() {
    const store = useStore();
    await store.dispatch('getBicycles');
  },
});
</script>

<style scoped>
  h1 {
        max-width: 960px;
        margin: 20px auto;
    }
</style>
