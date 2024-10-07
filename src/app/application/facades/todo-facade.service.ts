import { inject, Injectable, Signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { TodoActions } from '../states/todo/todo.actions';
import { TodoEntity } from '../../domain/entities/todo.entity';
import { TodoSelectors } from '../states/todo/todo.selectors';
import { StatusAction } from '../enums/StatusAction.enum';

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
       }
    }));
  }

}
