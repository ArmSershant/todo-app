import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IState } from '../state/state';
import { TodoState } from '../state/todoState';

export const selectTodos = (state: IState) => state.todos;
export const selectAllTodos = createSelector(
  selectTodos,
  (state: TodoState) => {
    return state.todos;
  }
);

export const selectTodosByStatus = createSelector(
  selectTodos,
  (state: TodoState, props: { status: string }) => {
    return state.todos.filter((todo) => todo.status === props.status);
  }
);
