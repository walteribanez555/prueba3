export interface ActionCallback<T,E> {
   onResult? : (item : T) => void;
   onLoading? : () => void;
   onError? : (error : E) => void;
}
