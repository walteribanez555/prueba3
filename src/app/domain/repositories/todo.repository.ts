import { CreateTodoDto } from "../dtos/todos/create-todo.dto";
import { UpdateTodoDto } from "../dtos/todos/update-todo.dto";
import { TodoEntity } from "../entities/todo.entity";
import { Result } from "../types/Result.type";

export abstract class TodoRepository {
  abstract create( dto : CreateTodoDto) : Promise<Result<TodoEntity, string>>;
  abstract update( dto : UpdateTodoDto) : Promise<Result<TodoEntity, string>>;
  abstract get( id : number) : Promise<Result<TodoEntity, string>>;
  abstract getAll( params : {[key:string]  : any}) : Promise<Result<TodoEntity[],string>>;
  abstract delete(id : number) : Promise<Result<any,string>>;
}
