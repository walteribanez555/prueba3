import { Injectable } from '@angular/core';
import { TodoEntity } from '../../entities/todo.entity';
import { TodoRepository } from '../../repositories/todo.repository';

export interface GetTodosUseCase {
  execute(params: { [key: string]: any }): Promise<TodoEntity[]>;
}

@Injectable({
  providedIn: 'root',
})
export class GetTodosService implements GetTodosUseCase {
  constructor(private repository: TodoRepository) {}
  async execute(params: { [key: string]: any }): Promise<TodoEntity[]> {
    const result = await this.repository.getAll(params);

    if (!result.isSuccess) throw Error(result.error);

    return result.value;
  }
}
