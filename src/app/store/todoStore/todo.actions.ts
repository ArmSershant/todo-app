import { createAction, props } from '@ngrx/store';
import { Todo } from 'src/app/todolist/models/todo.model';

export const loadTodos = createAction('[Todo] Load Todos');

// Add
export const addTodo = createAction(
  '[Todo List] Add Todo',
  props<{ todo: Todo }>()
);

export const addTodoSuccess = createAction(
  '[Todo] Add Todo Success',
  props<{ todo: Todo }>()
);

export const addTodoFailure = createAction(
  '[Todo] Add Todo Success',
  props<{ error: any }>()
);

// Load
export const loadTodosSuccess = createAction(
  '[Todo] Load Todos Success',
  props<{ todos: Todo[] }>()
);

export const loadTodosFailure = createAction(
  '[Todo] Load Todos Failure',
  props<{ error: any }>()
);

// Update
export const updateTodo = createAction(
  '[Todo] Update Todo',
  props<{ todo: Todo }>()
);
export const updateTodoSuccess = createAction(
  '[Todo] Update Todo Success',
  props<{ todo: Todo }>()
);
export const updateTodoFailure = createAction(
  '[Todo] Update Todo Failure',
  props<{ error: string }>()
);

// Edit
export const editTodo = createAction(
  '[Todo] Edit Todo',
  props<{ todo: Todo }>()
);
export const editTodoSuccess = createAction(
  '[Todo] Edit Todo Success',
  props<{ todo: Todo }>()
);
export const editTodoFailure = createAction(
  '[Todo] Edit Todo Failure',
  props<{ error: string }>()
);

// Delete
export const deleteTodo = createAction(
  '[Todo] Delete Todo',
  props<{ id: number }>()
);

export const deleteTodoSuccess = createAction(
  '[Todo] Delete Todo Success',
  props<{ todo: Todo }>()
);

export const deleteTodoFailure = createAction(
  '[Todo] Delete Todo Failure',
  props<{ error: string }>()
);
