import { MutationTree } from 'vuex'

import { State, TaskItem } from './state'

export enum MutationType {
  CreateTask = 'CREATE_TASK',
  SetTasks = 'SET_TASKS',
  CompleteTask = 'COMPLETE_TASK',
  RemoveTask = 'REMOVE_TASK',
  EditTask = 'EDIT_TASK',
  UpdateTask = `UPDATE_TASK`,
  SetLoading = 'SET_LOADING',
  SetCreateModal = 'SET_CREATE_MODAL',
  SetEditModal = 'SET_EDIT_MODAL',
  SetTaskModal = 'SET_TASK_MODAL'
}

export type Mutations = {
  [MutationType.CreateTask](state: State, task: TaskItem): void
  [MutationType.SetTasks](state: State, tasks: TaskItem[]): void
  [MutationType.CompleteTask](state: State, task: Partial<TaskItem> & {
    id: number
  }): void
  [MutationType.RemoveTask](state: State, task: Partial<TaskItem> & {
    id: number
  }): void
  [MutationType.EditTask](state: State, task: Partial<TaskItem> & {
    id: number
  }): void
  [MutationType.UpdateTask](state: State, task: Partial<TaskItem> & {
    id: number
  }): void
  [MutationType.SetLoading](state: State, value: boolean): void
  [MutationType.SetCreateModal](state: State, value: boolean): void
  [MutationType.SetEditModal](state: State, value: {
    showModal: boolean,
    taskId: number | undefined
  }): void
  [MutationType.SetTaskModal](state: State, value: {
    showModal: boolean,
    taskId: number | undefined
  }): void
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.CreateTask](state: State, task: TaskItem) {
    state.tasks.push(task);
  },
  [MutationType.SetTasks](state: State, tasks: TaskItem[]) {
    state.tasks = tasks;
  },
  [MutationType.CompleteTask](state: State, task: Partial<TaskItem> & {
    id: number
  }) {
    const taskIndex = state.tasks.findIndex(ele => ele.id === task.id)
    if (taskIndex > -1) {
      state.tasks[taskIndex] = {
        ...state.tasks[taskIndex],
        ...task
      }
    }
  },
  [MutationType.RemoveTask](state: State, task: Partial<TaskItem> & {
    id: number
  }) {
    const taskIndex = state.tasks.findIndex(ele => ele.id === task.id)
    if (taskIndex > -1) {
      state.tasks.splice(taskIndex, 1)
    }
  },
  [MutationType.EditTask](state: State, task: Partial<TaskItem> & {
    id: number
  }) {
    const taskIndex = state.tasks.findIndex(ele => ele.id === task.id)
    if (taskIndex > -1) {
      state.tasks[taskIndex] = {
        ...state.tasks[taskIndex],
        editing: !state.tasks[taskIndex].editing
      }
      console.log("tasking editing", state.tasks[taskIndex])
    }
  },
  [MutationType.UpdateTask](state: State, task: Partial<TaskItem> & {
    id: number
  }) {
    const taskIndex = state.tasks.findIndex(ele => ele.id === task.id)
    if (taskIndex > -1) {
      state.tasks[taskIndex] = {
        ...state.tasks[taskIndex],
        ...task
      }
    }
  },
  [MutationType.SetLoading](state: State, value: boolean) {
    state.loading = value
  },
  [MutationType.SetCreateModal](state: State, value: boolean) {
    state.showCreateModal = value
  },
  [MutationType.SetEditModal](state: State, value: {
    showModal: boolean,
    taskId: number | undefined
  }) {
    state.showEditModal = value.showModal
    state.editModalTaskId = value.taskId
  },
  [MutationType.SetTaskModal](state: State, value: {
    showModal: boolean,
    taskId: number | undefined
  }) {
    state.showTaskModal = value.showModal
    state.showTaskId = value.taskId
  },
}