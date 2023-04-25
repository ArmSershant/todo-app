import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodolistRoutingModule } from './todolist-routing.module';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [CommonModule, FormsModule, TodolistRoutingModule, DragDropModule],
})
export class TodolistModule {}
