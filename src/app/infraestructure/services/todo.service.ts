import { inject, Injectable } from '@angular/core';
import { TodoRepository } from '../../domain/repositories/todo.repository';
import { CreateTodoDto } from '../../domain/dtos/todos/create-todo.dto';
import { UpdateTodoDto } from '../../domain/dtos/todos/update-todo.dto';
import { TodoEntity } from '../../domain/entities/todo.entity';
import { Result } from '../../domain/types/Result.type';
import { firstValueFrom, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TodoDAO, TodoDaoResponse } from '../daos/todo.dao';

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
    return firstValueFrom(
      this.http.post(`${this.url}/add`, dto).pipe(
        map( response => {
          let result :Result<TodoEntity, string>;

          const [err , dao] = TodoDAO.create(response);
          if(err) {
            result = {
              isSuccess : false,
              error : err as string
            }
            return result;
          }

          const [ errEntity, entity ] = TodoEntity.fromDAO(dao as TodoDAO);

          if(errEntity) {
            result = {
              isSuccess : false,
              error : errEntity as unknown as string
            }
            return result;
          }


          result = {
            isSuccess : true,
            value : entity as TodoEntity
          }

          return result;

        })
      )
    )
  }

  override update(dto: UpdateTodoDto): Promise<Result<TodoEntity, string>> {
    return firstValueFrom(
      this.http.put(`${this.url}/${dto.id}`,{completed: dto.completed}).pipe(
        map( response => {
          let result :Result<TodoEntity, string>;

          const [err , dao] = TodoDAO.create(response);
          if(err) {
            result = {
              isSuccess : false,
              error : err as string
            }
            return result;
          }

          const [ errEntity, entity ] = TodoEntity.fromDAO(dao as TodoDAO);

          if(errEntity) {
            result = {
              isSuccess : false,
              error : errEntity as unknown as string
            }
            return result;
          }


          result = {
            isSuccess : true,
            value : entity as TodoEntity
          }

          return result;

        })
      )
    )

  }



  override get(id: number): Promise<Result<TodoEntity, string>> {
    return firstValueFrom(
      this.http.get(`${this.url}/${id}`).pipe(
        map( response => {
          let result :Result<TodoEntity, string>;

          const [err , dao] = TodoDAO.create(response);
          if(err) {
            result = {
              isSuccess : false,
              error : err as string
            }
            return result;
          }

          const [ errEntity, entity ] = TodoEntity.fromDAO(dao as TodoDAO);

          if(errEntity) {
            result = {
              isSuccess : false,
              error : errEntity as unknown as string
            }
            return result;
          }


          result = {
            isSuccess : true,
            value : entity as TodoEntity
          }

          return result;
        })
      )
    )
  }
  override getAll(params: {
    [key: string]: any;
  }): Promise<Result<TodoEntity[], string>> {
    return firstValueFrom(
      this.http.get(this.url, {params}).pipe(
        map((response: any) => {
          let result: Result<TodoEntity[], string>;

          const [errResponse, daoResponse] = TodoDaoResponse.create(response);


          if (errResponse) {
            result = {
              isSuccess: false,
              error: errResponse as string,
            };
            return result;
          }

          try {
            const entites: TodoEntity[] = [];
            (daoResponse as TodoDaoResponse).todos.forEach((t) => {
              const [err, entity] = TodoEntity.fromDAO(t);

              if (err) {
                throw new Error(err as unknown as string);
              }

              entites.push(entity as TodoEntity);
            });
            result = {
              isSuccess: true,
              value: entites,
            };
          } catch (err) {
            result = {
              isSuccess: false,
              error: err as string,
            };
          }

          return result;
        })
      )
    );
  }
  override delete(id: number): Promise<Result<any, string>> {
    return firstValueFrom(
      this.http.delete(`${this.url}/${id}`).pipe(
        map( response => {
          let result :Result<TodoEntity, string>;

          const [err , dao] = TodoDAO.create(response);
          if(err) {
            result = {
              isSuccess : false,
              error : err as string
            }
            return result;
          }

          const [ errEntity, entity ] = TodoEntity.fromDAO(dao as TodoDAO);

          if(errEntity) {
            result = {
              isSuccess : false,
              error : errEntity as unknown as string
            }
            return result;
          }


          result = {
            isSuccess : true,
            value : entity as TodoEntity
          }

          return result;
        })
      )
    )
  }
}
