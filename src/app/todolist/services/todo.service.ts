import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiUrl}/todos`);
  }

  createTodo(todo: Todo) {
    return this.http.post(`${this.apiUrl}/todos/add`, todo);
  }

  updateTodoStatus(
    id: number,
    status: 'todo' | 'doing' | 'done'
  ): Observable<Todo> {
    const url = `${this.apiUrl}/todos/${id}`;
    const body = { status };
    return this.http.put<Todo>(url, body);
  }

  editTodo(todo: Todo) {
    const url = `${this.apiUrl}/todos/${todo.id}`;
    return this.http.put<Todo>(url, todo);
  }

  removeTodo(id: number) {
    return this.http.delete(`${this.apiUrl}/todos/${id}`);
  }
}
