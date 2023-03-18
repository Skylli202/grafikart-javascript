export function createAlert(message, type = "danger", selector = "#alert") {
  /** @type {HTMLElement} alertTemplate */
  const alertTemplate =
    document.querySelector(selector).content.firstElementChild;
  if (!alertTemplate) {
    throw Error(
      "Unable to find the HTMLTemplateElement" +
        ` for alerts. Selector=${selector}`
    );
  }
  const alertElement = alertTemplate.cloneNode(true);

  alertElement.classList.add(`alert-${type}`);
  const contentAlertElement = alertElement.querySelector(".js-text");
  if (contentAlertElement) {
    contentAlertElement.innerHTML = message;
  }

  const buttonAlertElement = alertElement.querySelector("button");
  if (buttonAlertElement) {
    buttonAlertElement.addEventListener("click", () => {
      alertElement.remove();
      alertElement.dispatchEvent(new Event("close"));
    });
  }

  return alertElement;
}
