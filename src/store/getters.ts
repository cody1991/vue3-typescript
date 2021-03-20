import { GetterTree } from 'vuex';
import { State, TaskItem } from './state'

export type Getters = {
  completedTaskCount(state: State): number
  totalTaskCount(state: State): number
  getTaskById(state: State): (id: number) => TaskItem | undefined
}

export const getters: GetterTree<State, State> & Getters = {
  completedTaskCount(state: State) {
    return state.tasks.filter(item => item.completed).length
  },
  totalTaskCount(state: State) {
    return state.tasks.length
  },
  getTaskById: (state: State) => (id: number) => {
    return state.tasks.find(task => task.id === id)
  }
}