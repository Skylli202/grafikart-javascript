import { fetchJSON } from "./api.js";
import { createAlert } from "./alerts.js";

export class FetchForm {
  /** @type {Object.<string,string>} #elements */
  #elements;
  /** @type {string} #endpoint*/
  #endpoint;
  /** @type {HTMLElement} #target */
  #target;
  /** @type {HTMLTemplateElement} #template */
  #template;

  /**
   * @param {HTMLElement} element
   */
  constructor(element) {
    this.#elements = JSON.parse(element.dataset.elements);
    this.#endpoint = element.dataset.endpoint;
    this.#target = document.querySelector(element.dataset.target);
    this.#template = document.querySelector(element.dataset.template);

    if (!this.#target) {
      throw new Error("Unable to locate target in document.");
    }

    if (!this.#template) {
      throw new Error("Unable to locate template in document.");
    }

    element.addEventListener("submit", async (e) => {
      e.preventDefault();
      await this.#submitForm(e.currentTarget);
    });
  }

  /**
   *
   * @param {HTMLFormElement}form
   * @returns {Promise<void>}
   */
  async #submitForm(form) {
    const submitButton = form.querySelector("button");
    submitButton.disabled = true;

    const formData = new FormData(form);
    try {
      const r = await fetchJSON(this.#endpoint, {
        method: "post",
        json: Object.fromEntries(formData),
      });

      const elementTemplate = this.#template.content.cloneNode(true);
      for (const [property, cssSelector] of Object.entries(this.#elements)) {
        elementTemplate.querySelector(cssSelector).innerHTML = r[property];
      }
      this.#target.prepend(elementTemplate);
      submitButton.disabled = false;
    } catch (e) {
      submitButton.disabled = true;
      console.error(e);
      const alertElement = createAlert("Unable to post your comment.");
      form.prepend(alertElement);
      alertElement.addEventListener("close", () => {
        submitButton.disabled = false;
      });
    }
  }
}
