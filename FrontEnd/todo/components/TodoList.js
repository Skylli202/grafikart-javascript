import { createElement } from '../documentManagement/documentManagement.js'
import { TodoItem } from './Todo.js'

export class TodoList {

    /**
     * @type {HTMLElement}
     */
    #element
    #todos
    /**
     * @param {import('./Todo.js').Todo[]} todos 
     */
    constructor(todos) {
        this.#todos = todos

        const main = createElement('main')

        const ul = createElement('ul', {
            class: 'list-group'
        })

        this.#todos.forEach((todo) => {
            const todoElement = new TodoItem(todo)
            ul.append(todoElement.getElement())
        })
        
        main.append(this.#buildStateList([
            {innerText: 'Toutes', attributes: { class: 'active', 'data-filter': 'all' }},
            {innerText: 'A faire', attributes: { 'data-filter': 'todo'}},
            {innerText: 'Faites', attributes: { 'data-filter': 'done'}}
        ]))
        main.append(ul)
        this.#element = main
    }

    /** 
     * @typedef {Object} state
     * @property {string} innerText
     * @property {Object<string,string>} attributes
     * 
     * @param {state[]} states
     * @returns HTMLElement
     */
    #buildStateList(states) {
        const stateList = createElement('div', {
            class: 'btn-group mb-4',
            role: 'group'
        })


        states.forEach(state => {
            state.attributes.class = state.attributes.class ?? ''
            state.attributes.class = state.attributes.class.concat(' ', 'btn btn-outline-primary')
            stateList.append(this.#buildStateButton(state))
        })

        return stateList
    }

    /**
     * @param {state} state
     * @returns HTMLElement
     */
    #buildStateButton(state) {
        const stateButton = createElement('button', state.attributes)

        stateButton.innerText = state.innerText

        stateButton.addEventListener('click', e => {
            /**
             * @type {HTMLElement} parentElement
             */
            const parentElement = e.currentTarget.parentElement

            // Toogle active class on states buttons
            parentElement.querySelector('.active').classList.remove('active')
            e.currentTarget.classList.add('active')

            // 
            const filter = e.currentTarget.getAttribute('data-filter')
            const ul = this.#element.querySelector('ul')
            switch (filter) {
                case 'done': { 
                    ul.classList.add('hide-todo')
                    ul.classList.remove('hide-completed')
                    break
                }
                case 'todo': { 
                    ul.classList.add('hide-completed')
                    ul.classList.remove('hide-todo')
                    break
                }
                default: {
                    ul.classList.remove('hide-completed')
                    ul.classList.remove('hide-todo')
                    break
                }
            }
        })

        return stateButton
    }

    /**
     * @param {string} id 
     */
    getElement() {
        return this.#element
    }
}