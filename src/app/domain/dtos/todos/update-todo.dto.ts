export class UpdateTodoDto {
   constructor(
    public readonly id : number,
    public readonly completed : boolean,
   ) {

   }

   public static create( props : {[key: string] : any }) {
    const { id , completed} = props

    if(!id) return ['Id is required', undefined];
    if(!completed) return ['Completed is required', undefined];

    return [undefined, new UpdateTodoDto(id, completed)];
   }


}
