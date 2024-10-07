import { createPropertySelectors, createSelector } from "@ngxs/store";
import { TodoState, TodoStateModel } from "./todo.state";

export class TodoSelectors{

  static getSlices= createPropertySelectors<TodoStateModel>(TodoState);


  static getTodos = createSelector(
    [TodoSelectors.getSlices.todos],
    (todos) => todos
  )

  static getTodoById = createSelector(
    [TodoSelectors.getSlices.todoById],
    (todo) => todo
  )

  static getStatus = createSelector(
    [TodoSelectors.getSlices.status],
    (status) => status
  )


}
