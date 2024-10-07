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


    if(!id) return ['DAO : Id is required' , undefined];
    if(!todo ) return ['DAO : Todo is required' , undefined];
    if(completed  == null) return ['DAO : Completed is required' , undefined];
    if(!userId) return ['DAO : User Id is required' , undefined];


    return [undefined, new TodoDAO(id,todo,completed,userId)];
  }
}



export class TodoDaoResponse {
  constructor(
    public readonly todos : TodoDAO[],
    public readonly total : number,
    public readonly skip : number,
    public readonly limit : number,
  ){

  }

  public static create( props : {[key:string] :  any}){
    const {total, skip, limit, todos} = props;

    if(total == null || total ==undefined) return ['Total is required', undefined];

    if(skip == null || skip == undefined) return ['Skip is required' , undefined];

    if(limit == null || limit == undefined) return  ['Limit is required' , undefined];

    if(todos == null || todos == undefined) return ['Todos is required' , undefined];


    const todosMapped : TodoDAO[] = todos.map( (t : any)=> {
      const [err, todoDAO ] =TodoDAO.create(t);

      if(err) throw (err);

      return todoDAO;
    });



    return [undefined, new TodoDaoResponse(todosMapped,total,skip,limit)];

  }
}



