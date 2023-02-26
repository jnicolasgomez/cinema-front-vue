<template>
  <div class="home">
    <FilmsList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import FilmsList from '../components/FilmsList.vue'
export default defineComponent({
  name: 'HomeView',
  components: {
    FilmsList
  },
  setup () {
  },
  async created() {
    const store = useStore();
    await store.dispatch('getBicycles');
  },
});
</script>
