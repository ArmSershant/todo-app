/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTodoDetails } from 'src/todos/details/createTodo.detail';
import { EditTodoDetails } from 'src/todos/details/editTodo.detail';
import { TodosService } from 'src/todos/services/todos/todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  // Get todos
  @Get()
  getTodos() {
    return this.todosService.getTodos();
  }

  // Create a todo
  @Post('/add')
  createTodo(@Body() createTodoDetails: CreateTodoDetails) {
    return this.todosService.createTodo(createTodoDetails);
  }

  // Edit a todo
  @Put(':id')
  editTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() editTodoDetails: EditTodoDetails,
  ) {
    return this.todosService.editTodo(id, editTodoDetails);
  }

  @Put(':id')
  async updateTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: string,
  ) {
    const updatedTodo = await this.todosService.updateTodo(id, status);
    return updatedTodo;
  }

  // Delete a todo
  @Delete(':id')
  deleteTodo(@Param('id', ParseIntPipe) id: number) {
    return this.todosService.deleteTodo(id);
  }
}
