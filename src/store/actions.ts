import {
  ActionContext,
  ActionTree
} from 'vuex'

import { Mutations, MutationType } from './mutations'
import { State } from './state'

export enum ActionTypes {
  GetTaskItems = 'GET_Task_ITEMS',
  SetCreateModal = 'SET_CREATE_MODAL',
  SetEditModal = 'SET_EDIT_MODAL'
}

type ActionArguments = Omit<ActionContext<State, State>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>
}

export type Actions = {
  [ActionTypes.GetTaskItems](context: ActionArguments): void
  [ActionTypes.SetCreateModal](context: ActionArguments): void
  [ActionTypes.SetEditModal](context: ActionArguments): void
}

const sleep = (ms: number) => new Promise(res => setTimeout(() => res(true), ms))

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.GetTaskItems]({ commit }) {
    commit(MutationType.SetLoading, true)
    await sleep(1000)
    commit(MutationType.SetLoading, false)

    commit(MutationType.SetTasks, [{
      id: 1,
      title: 'learn Vue3 + TypeScript + Vuex4',
      description: 'good good study, day day up',
      createdBy: 'codytang',
      assignedTo: 'codytang',
      completed: false,
      editing: false,
    }, {
      id: 2,
      title: 'miaomiaomiao',
      description: '喵咪～～～',
      createdBy: '🐱',
      assignedTo: '🐱',
      completed: false,
      editing: false,
    }])
  },
  [ActionTypes.SetCreateModal]({ commit }) {
    commit(MutationType.SetCreateModal, true)
  },
  [ActionTypes.SetEditModal]({ commit }) {
    commit(MutationType.SetEditModal, {
      showModal: true,
      taskId: 1,
    })
  }
}