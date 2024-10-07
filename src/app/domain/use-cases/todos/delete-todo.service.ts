import { Injectable } from '@angular/core';
import { TodoRepository } from '../../repositories/todo.repository';


export interface DeleteTodoUseCase {
  execute( id: number) : Promise<any>;
}

@Injectable({
  providedIn: 'root'
})
export class DeleteTodoService  implements DeleteTodoUseCase{

  constructor(private repository : TodoRepository) { }
  async execute(id: number): Promise<any> {
    const result = await this.repository.delete(id);

    if(!result.isSuccess) throw( result.error);

    return result.value;

  }

}
