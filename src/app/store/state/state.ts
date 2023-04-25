import { TodoState } from './todoState';

export interface IState {
  todos: TodoState;
  doingTodos: TodoState;
  doneTodos: TodoState;
}
