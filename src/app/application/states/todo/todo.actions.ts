import { Action } from "rxjs/internal/scheduler/Action";
import { CreateTodoDto } from "../../../domain/dtos/todos/create-todo.dto";
import { UpdateTodoDto } from "../../../domain/dtos/todos/update-todo.dto";
import { TodoEntity } from "../../../domain/entities/todo.entity";
import { ActionCallback } from "../../interfaces/ActionCallback.interface";

export namespace  TodoActions {

  export class Create {
    static readonly type = '[Todo] Create item';
    constructor(readonly dto : CreateTodoDto,readonly callback ? : ActionCallback<TodoEntity,string>){}
  }

  export class Update{
    static readonly type = '[Todo] Update item';
    constructor(readonly dto : UpdateTodoDto, readonly callback? : ActionCallback<TodoEntity,string>){}
  }

  export class Get{
    static readonly type = '[Todo] Get item';
    constructor(readonly id : number, readonly callback? : ActionCallback<TodoEntity, string>) {}
  }

  export class GetAll {
    static readonly type = '[Todo] Get All Items';
    constructor( readonly params : {[key:string] : any}, readonly callback? : ActionCallback<TodoEntity[], string>) {}
  }

  export class Delete {
    static readonly type ='[Todo] Delete item';
    constructor( readonly id : number, readonly callback? : ActionCallback<any, string>){}
  }

}
