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
  private getTodoUseCase = inject(GetTodoService);
  private getTodosUseCase = inject(GetTodosService);
  private deleteTodoUseCase = inject(DeleteTodoService);

  @Action(TodoActions.Create)
  async create(ctx: StateContext<TodoStateModel>, action: TodoActions.Create) {

    ctx.patchState({
      status: StatusAction.Loading
    });

    action.callback?.onLoading ? action.callback.onLoading() : null;

    try {

      const entity = await this.createTodoUseCase.execute(action.dto);

      ctx.patchState({
        todos : [ ...ctx.getState().todos, entity]
      })

      action.callback?.onResult ? action.callback.onResult(entity) : null;

    }catch( err ) {
      action.callback?.onError ? action.callback.onError(err  as string) : null;
    }

    action.callback?.onComplete ? action.callback.onComplete() : null;
    ctx.patchState({
      status: StatusAction.Inital
    });


  }

  @Action(TodoActions.Update)
  async update(ctx: StateContext<TodoStateModel>, action: TodoActions.Update) {

    ctx.patchState({
      status: StatusAction.Loading
    });

    action.callback?.onLoading ? action.callback.onLoading() : null;

    try {

      const updatedEntity = await this.upadteTodoUseCase.execute(action.dto);

      const beforeEntity  = ctx.getState().todos.find(t => t.id == action.dto.id);

      let updatedTodos : TodoEntity[] = [];

      beforeEntity
        ? updatedTodos = ctx.getState().todos.map( todo => todo.id == action.dto.id ? updatedEntity : todo)
        : updatedTodos = [...ctx.getState().todos , updatedEntity];

      ctx.patchState({
        todos : updatedTodos
      });


      action.callback?.onResult ? action.callback.onResult(updatedEntity) : null;


    }catch( err ) {
      action.callback?.onError ? action.callback.onError(err  as string) : null;
    }

    action.callback?.onComplete ? action.callback.onComplete() : null;
    ctx.patchState({
      status: StatusAction.Inital
    });

  }

  @Action(TodoActions.Delete)
  async delete(ctx: StateContext<TodoStateModel>, action: TodoActions.Delete) {
    ctx.patchState({
      status: StatusAction.Loading
    })

    action.callback?.onLoading ? action.callback.onLoading() : null;

    try {
      await this.deleteTodoUseCase.execute(action.id);

      ctx.patchState({
        todos : ctx.getState().todos.filter( t => t.id !== action.id)
      })

    }catch(err) {
      action.callback?.onError ? action.callback.onError(err as string) : null;
    }

    ctx.patchState({
      status: StatusAction.Inital
    })
    action.callback?.onComplete ? action.callback.onComplete() : null;

  }

  @Action(TodoActions.Get)
  async get(ctx: StateContext<TodoStateModel>, action: TodoActions.Get) {
    ctx.patchState({
      status: StatusAction.Loading,
    });

    action.callback?.onLoading ? action.callback.onLoading() : null;
    try {
      const entity = await this.getTodoUseCase.execute(action.id);

      ctx.patchState({
        todoById: entity,
      });

      action.callback?.onComplete ? action.callback.onComplete() : null;
    } catch (err) {
      action.callback?.onError ? action.callback.onError(err as string) : null;
    }

    ctx.patchState({
      status: StatusAction.Inital,
    });

    action.callback?.onComplete ? action.callback.onComplete() : null;
  }

  @Action(TodoActions.GetAll)
  async getAll(ctx: StateContext<TodoStateModel>, action: TodoActions.GetAll) {
    ctx.patchState({
      status: StatusAction.Loading,
    }),
      action.callback?.onLoading ? action.callback.onLoading() : null;

    try {
      const todos = await this.getTodosUseCase.execute(action.params);

      ctx.patchState({
        todos,
      }),
        action.callback?.onResult ? action.callback.onResult(todos) : null;
    } catch (err) {
      action.callback?.onError ? action.callback.onError(err as string) : null;
    }

    ctx.patchState({
      status: StatusAction.Inital,
    });
    action.callback?.onComplete ? action.callback.onComplete() : null;
  }
}
