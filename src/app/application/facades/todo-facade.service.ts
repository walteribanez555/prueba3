import { inject, Injectable, Signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { TodoActions } from '../states/todo/todo.actions';
import { TodoEntity } from '../../domain/entities/todo.entity';
import { TodoSelectors } from '../states/todo/todo.selectors';
import { StatusAction } from '../enums/StatusAction.enum';
import { CreateTodoDto } from '../../domain/dtos/todos/create-todo.dto';
import { ActionCallback } from '../interfaces/ActionCallback.interface';
import { UpdateTodoDto } from '../../domain/dtos/todos/update-todo.dto';
import { Action } from 'rxjs/internal/scheduler/Action';

@Injectable({
  providedIn: 'root'
})
export class TodoFacadeService {

  private _store = inject(Store);

  todos  : Signal<TodoEntity[]> = this._store.selectSignal(TodoSelectors.getTodos);
  todo  : Signal<TodoEntity | null> = this._store.selectSignal(TodoSelectors.getTodoById);
  status : Signal<StatusAction> = this._store.selectSignal(TodoSelectors.getStatus);

  constructor() {
    this._store.dispatch(new TodoActions.GetAll({}, {
       onLoading : () => {
        console.log("Cargando");
       },
       onError : ( error) => {
        console.log(error);
       },
       onResult : (items) => {
        console.log(items);
       },
       onComplete : () => {
        console.log("Finalizado");
       }
    }));
  }


  create( dto : CreateTodoDto, callback? : ActionCallback<TodoEntity, string>) {
    this._store.dispatch(new TodoActions.Create(dto, callback));
  }

  update( dto : UpdateTodoDto, callback? : ActionCallback<TodoEntity, string> ) {
    this._store.dispatch(new TodoActions.Update(dto, callback));
  }

  get( id : number, callback? :  ActionCallback<TodoEntity, string>) {
    this._store.dispatch(new TodoActions.Get(id, callback));
  }

  getAll(params : {[key :string] : any} , callback? : ActionCallback<TodoEntity[], string>) {
    this._store.dispatch(new TodoActions.GetAll(params, callback));
  }

  delete( id : number, callback? : ActionCallback<any, string>) {
    this._store.dispatch(new TodoActions.Delete(id, callback));
  }

}
