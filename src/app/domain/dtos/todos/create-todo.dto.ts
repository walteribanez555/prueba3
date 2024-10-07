export class CreateTodoDto {
   constructor(
    public readonly todo : string,
    public readonly completed: boolean,
    public readonly userId : number,
   ) {

   }


   public static create( props : {[key :string] : any} ) {

    const { todo, completed, userId} = props;

    if(!todo) return ['Todo is required' , undefined];
    if(!completed) return ['Completed is required', undefined];
    if(!userId) return ['User id is required', undefined];

    return [undefined, new CreateTodoDto(todo, completed, userId)];

   }
}
