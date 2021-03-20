<template>
  <tr>
    <th>{{ id }}</th>
    <td>
      <input
        type="checkbox"
        :checked="completed"
        @change="toggleCompletion()"
      />
    </td>
    <td>{{ title }} <strong>(C)</strong></td>
    <td>{{ createdBy }}</td>
    <td>{{ assignedTo }}</td>
    <td>
      <span @click="viewTask()"> View </span>
      <span @click="editTask()"> Edit </span>
      <span @click="removeTask()"> Remove </span>
    </td>
  </tr>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '../store';
import { MutationType } from '../store/mutations';

export default defineComponent({
  props: {
    id: { type: Number, required: true },
    title: { type: String, required: true },
    createdBy: { type: String, required: true },
    assignedTo: { type: String, required: true },
    completed: { type: Boolean, required: true },
  },
  setup(props) {
    const store = useStore();

    const toggleCompletion = () => {
      store.commit(MutationType.CompleteTask, {
        id: props.id,
        completed: !props.completed,
      });
    };

    const viewTask = () => {
      store.commit(MutationType.SetTaskModal, {
        taskId: props.id,
        showModal: true,
      });
    };

    const removeTask = () => {
      store.commit(MutationType.RemoveTask, {
        id: props.id,
      });
    };

    const editTask = () => {
      store.commit(MutationType.SetEditModal, {
        taskId: props.id,
        showModal: true,
      });
    };

    return {
      toggleCompletion,
      viewTask,
      removeTask,
      editTask,
    };
  },
});
</script>
