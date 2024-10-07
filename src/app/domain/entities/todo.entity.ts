import { TodoDAO } from '../../infraestructure/daos/todo.dao';

export class TodoEntity {
  constructor(
    public readonly id: number,
    public readonly todo: string,
    public readonly completed: boolean,
    public readonly userId: number
  ) {}

  public static fromObject(promps: { [key: string]: any }) {
    const { id, todo, completed, userId } = promps;

    if (!id) return ['Entity : Id  is required', undefined];
    if (!todo) return ['Entity : Todo is required', undefined];
    if (!completed == null) return ['Entity : Completed is required', undefined];
    if (!userId) return ['Entity : User Id is required', undefined];

    return [undefined, new TodoEntity(id, todo, completed, userId)];
  }

  public static fromDAO(todoDAO: TodoDAO) {
    return [
      undefined,
      new TodoEntity(
        todoDAO.id,
        todoDAO.todo,
        todoDAO.completed,
        todoDAO.userId
      ),
    ];
  }
}
