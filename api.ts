import { todo } from "node:test";
import { ITask } from "./types/tasks";

const baseUrl = 'http://localhost:3001';


// here we have created the function to fetch all tasks created so far.
export const getAllTodos = async (): Promise<ITask[]> => { //asynchronous function returns a promise.
    const res = await fetch(`${baseUrl}/tasks`, { cache: 'no-store' }); //dynamic data fetching.
    const todos = await res.json();
    return todos;
}


// now here we have to create the function that will add the new todo to the api.
export const addTodo = async (todo: ITask): Promise<ITask> => {
    const res = await fetch(`${baseUrl}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    })
    const newTodo = await res.json();
    return newTodo;
}

// function to edit todo.
export const editTodo = async (todo: ITask): Promise<ITask> => {
    const res = await fetch(`${baseUrl}/tasks/${todo.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    })
    const updatedTodo = await res.json();
    return updatedTodo;
}

// function to delete todo.
export const deleteTodo = async (id: string): Promise<void> => {
    await fetch(`${baseUrl}/tasks/${id}`, {
        method: 'DELETE',
    })
}