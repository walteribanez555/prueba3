export class TodoDAO {
  constructor(
    public readonly id : number,
    public readonly todo : string,
    public readonly completed : boolean,
    public readonly userId : number
  ) {

  }


  static create( props : {[key:string] : any} ) {
    const  { id, todo, completed, userId} = props;

    if(!id) return ['Id is required' , undefined];
    if(!todo ) return ['Todo is required' , undefined];
    if(!completed ) return ['Completed is required' , undefined];
    if(!userId) return ['User Id is required' , undefined];


    return [undefined, new TodoDAO(id,todo,completed,userId)];
  }
}
