

//Referencias en el HTML

import { todoList } from "..";
import { Todo } from "../classes";

//Elemento padre en dónde lo tengo que insertar
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');



export const crearTodoHTML = (todo) => {

    const htmlTodo =
        `<li class="${(todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);

    return div.firstChild;


}

//Eventos

txtInput.addEventListener('keyup', (event) => {

    if (event.key === 'Enter' && txtInput.value.trim().length > 0) {
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHTML(nuevoTodo);
        txtInput.value = ''
    }

});

divTodoList.addEventListener('click', (event) => {

    //Parte clave para identificar en dónde se hizo click, para localizar el checkbox 

    const nombreElemento = event.target.localName; //input, label, botón
    // Para detectar a qué <li> pertenece y extraer el data-id
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');

    // Verificamos que le dimos click al checkbox
    if (nombreElemento.includes('input')) {
        todoList.marcarCompletado(todoId);
        // Hacer el toggle de la clase completed del elemento input
        todoElemento.classList.toggle('completed');

    } else

        if (nombreElemento.includes('button')) {
            todoList.eliminarTodo(todoId);

            divTodoList.removeChild(todoElemento);

            //También se podría ocupar
            // todoElemento.innerHTML='';

        }



});

btnBorrar.addEventListener('click', () => {

    todoList.eliminarCompleatados();

    // Repintar html, empezamos con los últimos elementos, para no modificar el órden de los índices
    // Barremos el "arreglo" de children del div que tiene los elementos de atrás para adelante
    for (let i = divTodoList.children.length - 1; i >= 0; i -= 1){
        const child = divTodoList.children[i];
        // console.log(child);
        if(child.classList.contains('completed')){
            divTodoList.removeChild(child);
        }
    }





});

ulFiltros.addEventListener('click', (event) => {

    const filtro = event.target.text;
    if(!filtro){ return; };

    anchorFiltros.forEach( elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for(const elemento of  divTodoList.children) {

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch(filtro){

            case 'Pendientes':
                if( completado ){
                    elemento.classList.add('hidden');
                }
            break;
            case 'Completados':
                if( !completado ){
                    elemento.classList.add('hidden');
                }
            break;
        }
        
    };


})