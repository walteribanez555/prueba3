import { Injectable } from '@angular/core';
import { UpdateTodoDto } from '../../dtos/todos/update-todo.dto';
import { TodoEntity } from '../../entities/todo.entity';
import { TodoRepository } from '../../repositories/todo.repository';

export interface UpdateTodoUseCase {
  execute(dto: UpdateTodoDto): Promise<TodoEntity>;
}

@Injectable({
  providedIn: 'root',
})
export class UpdateTodoService implements UpdateTodoUseCase {
  constructor(private repository: TodoRepository) {}

  async execute(dto: UpdateTodoDto): Promise<TodoEntity> {
    const result = await this.repository.update(dto);

    if (!result.isSuccess) throw new Error(result.error);

    return result.value;
  }
}
