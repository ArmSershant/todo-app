/* eslint-disable prettier/prettier */
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/typeorm/entities/Todo';
import { CreateTodoParams, EditTodoParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  // Get todos
  async getTodos() {
    const todos = await this.todoRepository.find();
    return todos;
  }

  // Create todo
  async createTodo(createTodoDetails: CreateTodoParams) {
    const newTodo = this.todoRepository.create({
      ...createTodoDetails,
    });
    return this.todoRepository.save(newTodo);
  }

  // Edit todo
  async editTodo(id: number, editTodoDetails: EditTodoParams) {
    const todo = await this.todoRepository.findOneBy({ id: id });
    if (!todo)
      throw new HttpException(
        `Todo ${id} does not exist cannot edit`,
        HttpStatus.BAD_REQUEST,
      );
    const newTodo = await this.todoRepository.update(
      { id: id },
      { ...editTodoDetails },
    );
    return newTodo;
  }

  async updateTodo(id: number, status: string) {
    const todo = await this.todoRepository.findOneBy({ id: id });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    todo.status = status;
    await this.todoRepository.save(todo);
    return todo;
  }

  // Delete todo
  async deleteTodo(id: number) {
    const todo = await this.todoRepository.findOneBy({ id: id });
    if (!todo)
      throw new HttpException(
        `Todo ${id} does not exist cannot delete`,
        HttpStatus.BAD_REQUEST,
      );
    return this.todoRepository.delete({ id: id });
  }
}
