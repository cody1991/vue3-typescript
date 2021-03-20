<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4">标题: {{ task.title }}</p>
            </div>
          </div>
          <div class="content">
            <p class="subtitle is-6"><b>分配给:</b> {{ task.assignedTo }}</p>
            <p class="subtitle is-6"><b>创建人:</b> {{ task.createdBy }}</p>
            <p class="subtitle is-6">描述: {{ task.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <button
      class="modal-close is-large"
      @click="closeModal"
      aria-label="close"
    ></button>
  </div>
</template>
<script lang="ts">
import { MutationType } from '@/store/mutations';
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    console.log(1);
    const store = useStore();
    const task = computed(() => store.getters.getTaskById(Number(props.id)));

    const closeModal = () => {
      store.commit(MutationType.SetTaskModal, {
        showModal: false,
        taskId: undefined,
      });
    };

    return {
      task,
      closeModal,
    };
  },
});
</script>
