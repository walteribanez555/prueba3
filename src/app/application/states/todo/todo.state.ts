import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { TodoActions } from './todo.actions';
import { TodoEntity } from '../../../domain/entities/todo.entity';
import { StatusAction } from '../../enums/StatusAction.enum';

export interface TodoStateModel {
  todos: TodoEntity[];
  todoById: TodoEntity | null;
  status: StatusAction;
}

@State<TodoStateModel>({
  name: 'todo',
  defaults: {
    todos: [],
    todoById: null,
    status: StatusAction.Loading,
  },
})
@Injectable()
export class TodoState {
  @Action(TodoActions.Create)
  create(ctx: StateContext<TodoStateModel>, action: TodoActions.Create) {}

  @Action(TodoActions.Update)
  update(ctx: StateContext<TodoStateModel>, action: TodoActions.Update) {}
  @Action(TodoActions.Delete)
  delete(ctx: StateContext<TodoStateModel>, action: TodoActions.Delete) {}

  @Action(TodoActions.Get)
  get(ctx: StateContext<TodoStateModel>, action: TodoActions.Get) {}

  @Action(TodoActions.GetAll)
  getAll(ctx: StateContext<TodoStateModel>, action: TodoActions.GetAll) {}
}
