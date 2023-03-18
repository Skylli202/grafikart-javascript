import { fetchJSON } from "./api.js";
import { createAlert } from "./alerts.js";

export class InfinitePagination {
  /** @type {Object.<string,string>} #elements */
  #elements;
  /** @type {string} #endpoint*/
  #endpoint;
  /** @type {HTMLElement} #loader */
  #loader;
  /** @type {HTMLElement} #target */
  #target;
  /** @type {HTMLTemplateElement} #template */
  #template;
  /** @type {IntersectionObserver} #observer*/
  #observer;
  /** @type {boolean} #loading */
  #loading;
  /** @type {number} #page */
  #page;

  /**
   * @param {HTMLElement}element
   */
  constructor(element) {
    this.#elements = JSON.parse(element.dataset.elements);
    this.#endpoint = element.dataset.endpoint;
    this.#loader = element;
    this.#target = document.querySelector(element.dataset.target);
    this.#template = document.querySelector(element.dataset.template);
    this.#page = 1;

    this.#observer = new IntersectionObserver(async (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          await this.#loadContent();
          // observer.unobserve(entry.target);
        }
      }
    });

    this.#observer.observe(this.#loader);
  }

  async #loadContent() {
    if (this.#loading) {
      return;
    }

    this.#loading = true;

    try {
      let url = new URL(this.#endpoint);
      url.searchParams.append("_page", this.#page.toString());
      this.#page++;

      const content = await fetchJSON(url.href);

      if (!content || content.length === 0) {
        this.#observer.disconnect();
        this.#loader.remove();
        return;
      }

      for (const element of content) {
        const elementTemplate = this.#template.content.cloneNode(true);
        for (const [property, cssSelector] of Object.entries(this.#elements)) {
          elementTemplate.querySelector(cssSelector).innerHTML =
            element[property];
        }
        this.#target.append(elementTemplate);
      }

      this.#loading = false;
    } catch (e) {
      this.#loader.toggleAttribute("hidden");
      console.error(Object.getPrototypeOf(e));
      const alertElement = createAlert(
        "An error occurre: Unable to load comments."
      );
      this.#target.append(alertElement);
      alertElement.addEventListener("close", () => {
        this.#loading = false;
        this.#loader.removeAttribute("hidden");
      });
    }
  }
}
