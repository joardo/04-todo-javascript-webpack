import { Todo } from "./todo.class";

export class TodoList {

    constructor(){
        // this.todos = [];
        this.recuperarLocalStorage();
    }


    nuevoTodo( todo) {
        this.todos.push(todo);
        this.guardarLocalStorage();
    }

    eliminarTodo( id ){
        //nos va a regresar un arreglo de tal manera que todos son diferentes al id que quiero borrar
      this.todos = this.todos.filter( todo => todo.id != id);
      this.guardarLocalStorage();
    }

    marcarCompletado( id ){

        let BreakException = {}

        try {
            this.todos.forEach(todo => {
    
                console.log(todo.id, id);
                if(todo.id == id){
                    todo.completado = !todo.completado;
                    this.guardarLocalStorage();
                    throw BreakException;
                }
                
            } ) ;            
        } catch (e) {
            if(e !== BreakException) throw e;
            
        } 
    }


    eliminarCompleatados(){
        
        this.todos = this.todos.filter( todo => !todo.completado);
        this.guardarLocalStorage();

    }

    guardarLocalStorage(){
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    recuperarLocalStorage(){

        // if( localStorage.getItem('todos')){
        //     this.todos = JSON.parse(localStorage.getItem('todos'));
        //     this.todos.forEach(element => {              
        //         crearTodoHTML(element);                
        //     });


        // } else {
        //     this.todos = [];
        // }
        const todos = localStorage.getItem('todos');
        this.todos = todos ? JSON.parse(todos) : [];

        this.todos = this.todos.map(Todo.fromJson); 

      
        
        


    }

    

}