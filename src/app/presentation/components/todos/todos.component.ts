import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TodoFacadeService } from '../../../application/facades/todo-facade.service';
import { TodoComponent } from '../todo/todo.component';
import { UpdateTodoDto } from '../../../domain/dtos/todos/update-todo.dto';
import { CreateTodoComponent } from "../create-todo/create-todo.component";
import { CreateTodoDto } from '../../../domain/dtos/todos/create-todo.dto';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [CommonModule, TodoComponent, CreateTodoComponent],
  templateUrl: './todos.component.html',
})
export class TodosComponent {
  private todoFacadeService = inject(TodoFacadeService);

  todos$ = this.todoFacadeService.todos;
  todoById$ = this.todoFacadeService.todo;
  status$ = this.todoFacadeService.status;



  onDeleteItem( item : any){
    const { id } = item;

    if(!id) throw Error('Id required');

    this.todoFacadeService.delete(id, {
      onComplete : () => {
        console.log("Completado");
      },
      onResult : ( e ) => {
        console.log(e);

      },
      onError : (err) => {
        console.log(err);

      },
      onLoading : () => {
        console.log("Loading");
      }
    });

  }

  onStatusChangeItem( item : any) {

    const [err , dto] = UpdateTodoDto.create(item);

    if(err) throw (err as string);

    this.todoFacadeService.update(dto as UpdateTodoDto, {
      onComplete : () => {
        console.log("Completado");
      },
      onResult : ( e ) => {
        console.log(e);

      },
      onError : (err) => {
        console.log(err);

      },
      onLoading : () => {
        console.log("Loading");
      }
    })
  }


  onCreateTodo( value : any) {

    const [err , dto ] = CreateTodoDto.create(value);

    if(err) throw (err);

    this.todoFacadeService.create(dto as CreateTodoDto , {
      onComplete : () => {
        console.log("Completado");
      },
      onResult : ( e ) => {
        console.log(e);

      },
      onError : (err) => {
        console.log(err);

      },
      onLoading : () => {
        console.log("Loading");
      }
    })

  }

}
