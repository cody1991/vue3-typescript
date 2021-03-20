<template>
  <div class="container mx-auto mt-4">
    <h1 class="is-size-3 has-text-centered p-2 has-text-weight-bold">
      任务管理应用
    </h1>
    <div v-if="loading">
      <h3 class="has-text-centered mt-4">Loading...</h3>
    </div>
    <div v-else>
      <p class="has-text-centered mt-2">
        {{ completedCount }} of {{ totalTaskCount }} completed.
      </p>
      <TaskList />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import { useStore } from './store';
import { ActionTypes } from './store/actions';
import TaskList from './components/TaskList.vue';

export default defineComponent({
  name: 'App',
  components: {
    TaskList,
  },
  setup() {
    const store = useStore();
    const loading = computed(() => store.state.loading);
    const completedCount = computed(() => store.getters.completedTaskCount);
    const totalTaskCount = computed(() => store.getters.totalTaskCount);

    onMounted(() => store.dispatch(ActionTypes.GetTaskItems));

    return {
      loading,
      completedCount,
      totalTaskCount,
    };
  },
});
</script>

<style>
@import '~bulma/css/bulma.css';
</style>
