import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, of, tap } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  loadTodos,
  loadTodosSuccess,
  loadTodosFailure,
  addTodo,
  addTodoFailure,
  addTodoSuccess,
  updateTodo,
  updateTodoFailure,
  updateTodoSuccess,
  editTodo,
  editTodoSuccess,
  editTodoFailure,
  deleteTodo,
  deleteTodoSuccess,
  deleteTodoFailure,
} from './todo.actions';
import { TodoService } from 'src/app/todolist/services/todo.service';
import { Todo } from 'src/app/todolist/models/todo.model';

@Injectable()
export class TodoEffects {
  constructor(private actions$: Actions, private todoService: TodoService) {}

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodos),
      switchMap(() =>
        this.todoService.getTodos().pipe(
          map((todos) => loadTodosSuccess({ todos })),
          catchError((error) => of(loadTodosFailure({ error })))
        )
      )
    )
  );

  createTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTodo),
      mergeMap((action) =>
        this.todoService.createTodo(action.todo).pipe(
          map((response) => addTodoSuccess({ todo: response as Todo })),
          catchError((error) => of(addTodoFailure({ error })))
        )
      ),
      map(() => loadTodos())
    )
  );

  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTodo),
      switchMap((action) =>
        this.todoService
          .updateTodoStatus(action.todo.id, action.todo.status)
          .pipe(
            map((todo) => updateTodoSuccess({ todo })),
            catchError((error) => of(updateTodoFailure({ error })))
          )
      )
    )
  );

  editTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editTodo),
      switchMap((action) =>
        this.todoService.editTodo(action.todo).pipe(
          map((todo) => editTodoSuccess({ todo })),
          catchError((error) => of(editTodoFailure({ error })))
        )
      ),
      map(() => loadTodos())
    )
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTodo),
      switchMap((action) =>
        this.todoService.removeTodo(action.id).pipe(
          map((todo: any) => deleteTodoSuccess({ todo })),
          catchError((error) => of(deleteTodoFailure({ error })))
        )
      ),
      map(() => loadTodos())
    )
  );
}
