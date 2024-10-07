import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TodoFacadeService } from '../../../application/facades/todo-facade.service';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl:'./todos.component.html'

})
export class TodosComponent {


  private todoFacadeService = inject(TodoFacadeService);

  private todos$ = this.todoFacadeService.todos;
  private todoById$ = this.todoFacadeService.todo;
  private status$ = this.todoFacadeService.status;






 }
