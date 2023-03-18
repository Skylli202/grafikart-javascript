/**
 * @typedef {Object} Todo
 * @property {number} id
 * @property {number} userId
 * @property {boolean} completed
 * @property {string} title
 */

import { createElement } from "../documentManagement/documentManagement.js"

export class TodoItem {
    /**
     * @type {HTMLElement}
     */
    #element

    /**
     * @type {Todo}
     */
    #todo

    /**
     * @param {Todo} todo 
     */
    constructor (todo) {
        this.#todo = todo
        this.#element = this.#buildElement()
    }

    /**
     * Return the HTML Element who represent the who Todo.
     * 
     * @returns HTMLElement
     */
    #buildElement () {
        const element = createElement('li', {
            class: 'todo list-group-item d-flex align-items-center'
        })

        if (this.#todo.completed) element.classList.add('is-completed')

        element.append(this.#buildCheckbox())
        element.append(this.#buildContent())
        element.append(this.#buildTrash())

        return element
    }

    /**
     * Return the HTML Element who represent the todo completion.
     * 
     * @returns HTMLElement
     */
    #buildCheckbox () {
        /**
         * @type {HTMLInputElement} checkboxElement
         */
        const checkboxElement = createElement('input', {
            class: 'form-check-input',
            type: 'checkbox',
            id: `todo-${this.#todo.id}`
        })

        checkboxElement.checked = this.#todo.completed

        return checkboxElement
    }

    /**
     * Return the HTML Element who reprensent the todo content.
     * 
     * @returns HTMLElement
     */
    #buildContent () {
        const content = createElement('label', {
            class: 'ms-2 form-check-label'
        })
        content.innerText = this.#todo.title
        return content
    }

    /**
     * Return the HTML Element who represent the delete action.
     * 
     * @returns HTMLElement
     */
    #buildTrash () {
        const labelTrash = createElement('label', {
            class: 'ms-auto btn btn-danger btn-sm'
        })
        labelTrash.append(createElement('i', { class: 'bi-trash' }))

        labelTrash.addEventListener('click', e => {
            console.log(e);
            this.#element.remove()
        })

        return labelTrash
    }

    getElement () {
        return this.#element
    }
}