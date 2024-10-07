import { inject, Injectable } from '@angular/core';
import { TodoRepository } from '../../domain/repositories/todo.repository';
import { CreateTodoDto } from '../../domain/dtos/todos/create-todo.dto';
import { UpdateTodoDto } from '../../domain/dtos/todos/update-todo.dto';
import { TodoEntity } from '../../domain/entities/todo.entity';
import { Result } from '../../domain/types/Result.type';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService extends TodoRepository {
  constructor() {
    super();
  }


  private http = inject(HttpClient);
  private url = environment.url;





  override create(dto: CreateTodoDto): Promise<Result<TodoEntity, string>> {
    throw new Error('Method not implemented.');
  }

  override update(dto: UpdateTodoDto): Promise<Result<TodoEntity, string>> {
    throw new Error('Method not implemented.');
  }
  override get(id: number): Promise<Result<TodoEntity, string>> {
    throw new Error('Method not implemented.');
  }
  override getAll(params: {
    [key: string]: any;
  }): Promise<Result<TodoEntity[], string>> {
    throw new Error('Method not implemented.');
  }
  override delete(id: number): Promise<Result<any, string>> {
    throw new Error('Method not implemented.');
  }


}
