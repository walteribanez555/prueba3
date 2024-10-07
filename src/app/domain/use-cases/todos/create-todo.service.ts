import { Injectable } from '@angular/core';
import { TodoEntity } from '../../entities/todo.entity';
import { TodoRepository } from '../../repositories/todo.repository';


export interface CreateTodoUseCase {
  execute( dto : CreateTodoUseCase) : Promise<TodoEntity>;
}

@Injectable({
  providedIn: 'root'
})
export class CreateTodoService implements CreateTodoUseCase {

  constructor(private repository :TodoRepository) { }
  async execute(dto: CreateTodoUseCase): Promise<TodoEntity> {
    const result = await this.repository.create(dto);

    if(!result.isSuccess)  throw Error(result.error);

    return result.value
  }

}
