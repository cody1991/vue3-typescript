<template>
  <table class="table">
    <thead>
      <tr>
        <th><abbr title="Position">Task Id</abbr></th>
        <th>Completed</th>
        <th>Task</th>
        <th><abbr title="Won">Created By</abbr></th>
        <th><abbr title="Drawn">Assigned To</abbr></th>
        <th><abbr title="Lost">Actions</abbr></th>
      </tr>
    </thead>
    <tbody v-if="tasks">
      <template v-for="task in tasks" :key="task.id">
        <TaskListItem v-bind="task" />
      </template>
    </tbody>
    <tfoot>
      <CreateModal v-show="showCreateModal"></CreateModal>
      <button class="button is-link" @click="setModal">Create Task</button>
    </tfoot>
  </table>
  <EditModal v-if="showEditModal" :id="editTaskId"></EditModal>
  <TaskItem v-if="showTaskModal" :id="showTaskId"></TaskItem>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '../store';
import { MutationType } from '@/store/mutations';
import TaskListItem from './TaskListItem.vue';
import TaskItem from './TaskItem.vue';
import CreateModal from './CreateModal.vue';
import EditModal from './EditModal.vue';
export default defineComponent({
  components: {
    TaskListItem,
    TaskItem,
    CreateModal,
    EditModal,
  },
  setup() {
    const store = useStore();
    const setModal = () => store.commit(MutationType.SetCreateModal, true);
    const tasks = computed(() => store.state.tasks);
    const showCreateModal = computed(() => store.state.showCreateModal);

    const showEditModal = computed(() => store.state.showEditModal);
    const editTaskId = computed(() => store.state.editModalTaskId);

    const showTaskModal = computed(() => store.state.showTaskModal);
    const showTaskId = computed(() => store.state.showTaskId);

    return {
      showCreateModal,
      setModal,
      tasks,
      showEditModal,
      showTaskModal,
      editTaskId,
      showTaskId,
    };
  },
});
</script>

<style>
table {
  width: 100%;
}
</style>
