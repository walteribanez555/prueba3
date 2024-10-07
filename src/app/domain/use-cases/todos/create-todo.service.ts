import { Injectable } from '@angular/core';
import { TodoEntity } from '../../entities/todo.entity';
import { TodoRepository } from '../../repositories/todo.repository';
import { CreateTodoDto } from '../../dtos/todos/create-todo.dto';


export interface CreateTodoUseCase {
  execute( dto : CreateTodoDto) : Promise<TodoEntity>;
}

@Injectable({
  providedIn: 'root'
})
export class CreateTodoService implements CreateTodoUseCase {

  constructor(private repository :TodoRepository) { }
  async execute(dto: CreateTodoDto): Promise<TodoEntity> {
    const result = await this.repository.create(dto);

    if(!result.isSuccess)  throw Error(result.error);

    return result.value
  }

}
