<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="card">
        <div class="card-content">
          <form @submit.prevent="updateTask">
            <h1>Edit Modal</h1>
            <div class="field">
              <label class="label">Task Title</label>
              <div class="control">
                <input
                  v-model="title"
                  class="input"
                  type="text"
                  placeholder="Enter task"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Description</label>
              <div class="control">
                <textarea
                  v-model="description"
                  class="textarea"
                  placeholder="Textarea"
                ></textarea>
              </div>
            </div>
            <div class="field">
              <label class="label">Assigned By</label>
              <div class="control">
                <input
                  v-model="createdBy"
                  class="input"
                  type="text"
                  placeholder="Enter Assigner's name"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Assigned To</label>
              <div class="control">
                <input
                  v-model="assignedTo"
                  class="input"
                  type="text"
                  placeholder="Enter task creator's name"
                />
              </div>
            </div>
            <div class="field is-grouped">
              <div class="control">
                <button type="submit" class="button is-link">Submit</button>
              </div>
              <div class="control" @click="closeModal">
                <button class="button is-link is-light">Cancel</button>
              </div>
            </div>
          </form>
        </div>
        <button
          class="modal-close is-large"
          @click="closeModal"
          aria-label="close"
        ></button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { useStore } from '@/store';
import { MutationType } from '@/store/mutations';
import { defineComponent, onMounted, reactive, toRefs } from 'vue';

export default defineComponent({
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const state = reactive({
      title: '',
      description: '',
      createdBy: '',
      assignedTo: '',
    });

    const setFields = () => {
      const task = store.getters.getTaskById(Number(props.id));
      if (task) {
        const { title, description, createdBy, assignedTo } = task;
        state.title = title;
        state.description = description;
        state.createdBy = createdBy;
        state.assignedTo = assignedTo;
      }
    };

    const closeModal = () => {
      store.commit(MutationType.SetEditModal, {
        showModal: false,
        taskId: undefined,
      });
    };

    onMounted(() => setFields());

    const updateTask = () => {
      if (
        !state.title ||
        !state.description ||
        !state.createdBy ||
        !state.assignedTo
      )
        return;

      const task = {
        id: props.id,
        title: state.title,
        description: state.description,
        createdBy: state.createdBy,
        assignedTo: state.assignedTo,
        completed: false,
        editing: false,
      };

      store.commit(MutationType.UpdateTask, task);

      state.title = '';
      state.createdBy = '';
      state.assignedTo = '';
      state.description = '';

      closeModal();
    };

    return {
      ...toRefs(state),
      closeModal,
      updateTask,
    };
  },
});
</script>
