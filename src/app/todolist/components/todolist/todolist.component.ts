import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  addTodo,
  deleteTodo,
  editTodo,
  loadTodos,
  updateTodo,
} from 'src/app/store/todoStore/todo.actions';
import { Todo } from '../../models/todo.model';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { NgForm } from '@angular/forms';
import { IState } from 'src/app/store/state/state';
import { selectAllTodos } from 'src/app/store/todoStore/todo.selectors';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css'],
})
export class TodolistComponent implements OnInit {
  showAddTodo: boolean = false;
  isEditEnabled: boolean = false;
  editingTodo!: Todo;
  todo: Todo = { id: 0, title: '', description: '', status: 'todo' };
  allTodos!: Observable<Todo[]>;
  todos: Todo[] = [];
  doingTodos: Todo[] = [];
  doneTodos: Todo[] = [];

  constructor(private store: Store<IState>) {
    this.allTodos = this.store.select(selectAllTodos);
    this.allTodos.subscribe((todos) => {
      this.todos = todos.filter((todo) => todo.status === 'todo');
      this.doingTodos = todos.filter((todo) => todo.status === 'doing');
      this.doneTodos = todos.filter((todo) => todo.status === 'done');
    });
  }

  ngOnInit() {
    this.store.dispatch(loadTodos());
  }

  addTodo(form: NgForm) {
    let todo = new Todo(
      this.todo.id,
      form.value.title,
      form.value.description,
      this.todo.status
    );
    this.store.dispatch(addTodo({ todo }));
  }

  editTodoItem(todo: Todo) {
    this.editingTodo = { ...todo };
    this.isEditEnabled = true;
  }

  editTodo() {
    this.isEditEnabled = false;
    let todo = this.editingTodo;
    this.store.dispatch(editTodo({ todo }));
  }

  deleteTodo(id: number) {
    this.store.dispatch(deleteTodo({ id }));
  }

  onTodoDrop(event: CdkDragDrop<Todo[]>) {
    const todoToUpdate = event.previousContainer.data[event.previousIndex];
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.store.dispatch(
      updateTodo({
        todo: {
          ...todoToUpdate,
          status: 'todo',
        },
      })
    );
  }

  onDoingDrop(event: CdkDragDrop<Todo[]>) {
    const todoToUpdate = event.previousContainer.data[event.previousIndex];
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.store.dispatch(
      updateTodo({
        todo: {
          ...todoToUpdate,
          status: 'doing',
        },
      })
    );
  }

  onDoneDrop(event: CdkDragDrop<Todo[]>) {
    const todoToUpdate = event.previousContainer.data[event.previousIndex];
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.store.dispatch(
        updateTodo({
          todo: {
            ...todoToUpdate,
            status: 'done',
          },
        })
      );
    }
  }
}
