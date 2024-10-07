import { inject, Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { TodoActions } from './todo.actions';
import { TodoEntity } from '../../../domain/entities/todo.entity';
import { StatusAction } from '../../enums/StatusAction.enum';
import { CreateTodoService } from '../../../domain/use-cases/todos/create-todo.service';
import { UpdateTodoService } from '../../../domain/use-cases/todos/update-todo.service';
import { GetTodoService } from '../../../domain/use-cases/todos/get-todo.service';
import { GetTodosService } from '../../../domain/use-cases/todos/get-todos.service';
import { DeleteTodoService } from '../../../domain/use-cases/todos/delete-todo.service';

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

  private createTodoUseCase = inject(CreateTodoService);
  private upadteTodoUseCase = inject(UpdateTodoService);
  private getTodoUseCase  = inject(GetTodoService);
  private getTodosUseCase = inject(GetTodosService);
  private deleteTodoUseCase = inject(DeleteTodoService);


  @Action(TodoActions.Create)
  create(ctx: StateContext<TodoStateModel>, action: TodoActions.Create) {}

  @Action(TodoActions.Update)
  update(ctx: StateContext<TodoStateModel>, action: TodoActions.Update) {}
  @Action(TodoActions.Delete)
  delete(ctx: StateContext<TodoStateModel>, action: TodoActions.Delete) {}

  @Action(TodoActions.Get)
  get(ctx: StateContext<TodoStateModel>, action: TodoActions.Get) {}

  @Action(TodoActions.GetAll)
  async getAll(ctx: StateContext<TodoStateModel>, action: TodoActions.GetAll) {

    ctx.patchState({
      status : StatusAction.Loading,
    }),

    action.callback?.onLoading ? action.callback.onLoading() : null;

    try {
      const todos = await this.getTodosUseCase.execute(action.params);

      ctx.patchState({
        todos,
        status : StatusAction.Inital
      }),

      action.callback?.onResult ? action.callback.onResult(todos) : null;

    }catch( err ) {
      action.callback?.onError ? action.callback.onError(err as string) : null;
    }
  }
}
