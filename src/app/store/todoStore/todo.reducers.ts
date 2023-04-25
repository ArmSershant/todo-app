import { createReducer, on } from '@ngrx/store';
import {
  editTodo,
  editTodoFailure,
  editTodoSuccess,
  loadTodosSuccess,
  updateTodo,
  updateTodoFailure,
  updateTodoSuccess,
} from './todo.actions';
import { TodoState } from '../state/todoState';

export const initialState: TodoState = {
  todos: [],
};

export const todoReducer = createReducer(
  initialState,
  on(loadTodosSuccess, (state, { todos }) => ({ ...state, todos })),
  on(updateTodo, (state, { todo }) => {
    const updatedTodos = state.todos.map((t) => (t.id === todo.id ? todo : t));
    return { ...state, todos: updatedTodos };
  }),
  on(updateTodoSuccess, (state, { todo }) => {
    const updatedTodos = state.todos.map((t) => (t.id === todo.id ? todo : t));
    return { ...state, todos: updatedTodos };
  }),
  on(updateTodoFailure, (state, { error }) => ({ ...state, error })),
  on(editTodo, (state, { todo }) => {
    const updatedTodos = state.todos.map((t) => (t.id === todo.id ? todo : t));
    return { ...state, todos: updatedTodos };
  }),
  on(editTodoSuccess, (state, { todo }) => {
    const updatedTodos = state.todos.map((t) => (t.id === todo.id ? todo : t));
    return { ...state, todos: updatedTodos };
  }),
  on(editTodoFailure, (state, { error }) => ({ ...state, error }))
);
