import { fetchJSON } from './api/api.js'
import { TodoList } from './components/TodoList.js'
import { TodoItem } from './components/Todo.js'

const SOURCE_URL = 'https://jsonplaceholder.typicode.com/todos?_limit=5'
const todos = await fetchJSON(SOURCE_URL)

// Create TodoList
const todoList = new TodoList(todos)

// Inject TodoList into the DOM
document.querySelector('#todolist').append(todoList.getElement())

/**
 * @type {HTMLFormElement} createTodoForm
 */
const createTodoForm = document.querySelector('section > form')
createTodoForm.addEventListener('submit', e => {
    e.preventDefault()
    const formData = new FormData(createTodoForm)
    const todoItem = new TodoItem({
        completed: false,
        title: formData.get('title'),
        id: new Date().getMilliseconds(),
        userId: undefined
    })
    document.querySelector('main > ul').prepend(todoItem.getElement())
    createTodoForm.reset()
})

/**
 * Allow to add 
 * @param {Date} today 
 * @param {number} days 
 */
function addDays(today, days) {
    let result = new Date(today.toJSON())
    result.setDate(today.getDate() + days)
    return result
}

const today = new Date('2023-12-31');
const tomorrow = addDays(today, 1);

console.log(today);
console.log(tomorrow);
