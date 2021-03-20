export type TaskItem = {
  id: number,
  title: string,
  description: string,
  createdBy: string,
  assignedTo: string,
  completed: boolean
  editing: boolean
}

export type State = {
  loading: boolean,
  tasks: TaskItem[],
  showCreateModal: boolean,
  showEditModal: boolean,
  editModalTaskId: number | undefined,
  showTaskModal: boolean,
  showTaskId: number | undefined
}

export const state: State = {
  loading: false,
  tasks: [],
  showCreateModal: false,
  showEditModal: false,
  editModalTaskId: undefined,
  showTaskModal: false,
  showTaskId: undefined
}