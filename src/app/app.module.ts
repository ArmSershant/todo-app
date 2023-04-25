import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppComponent } from './app.component';
import { TodoEffects } from './store/todoStore/todo.effects';
import { todoReducer } from './store/todoStore/todo.reducers';
import { FormsModule } from '@angular/forms';
import { TodoService } from './todolist/services/todo.service';
import { TodolistComponent } from './todolist/components/todolist/todolist.component';

@NgModule({
  declarations: [AppComponent, TodolistComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    DragDropModule,
    StoreModule.forRoot({ todos: todoReducer }),
    EffectsModule.forRoot([TodoEffects]),
  ],
  providers: [TodoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
