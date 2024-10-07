import { Injectable } from '@angular/core';
import { TodoEntity } from '../../entities/todo.entity';
import { TodoRepository } from '../../repositories/todo.repository';



export interface GetTodoUseCase {
  execute(id : number) : Promise<TodoEntity>
}

@Injectable({
  providedIn: 'root'
})
export class GetTodoService implements GetTodoUseCase {

  constructor(
    private repository : TodoRepository,
  ) { }
  async execute(id: number): Promise<TodoEntity> {
    const result = await this.repository.get(id);

    if(!result.isSuccess) throw Error(result.error);

    return result.value;
  }

}
