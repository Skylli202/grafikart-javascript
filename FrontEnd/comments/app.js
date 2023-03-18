import { InfinitePagination } from "./lib/infinite-pagination.js";
import { FetchForm } from "./lib/fetch-form.js";

document.querySelectorAll(".js-infinite-pagination").forEach((el) => {
  new InfinitePagination(el);
});

document.querySelectorAll(".js-form-fetch").forEach((el) => {
  new FetchForm(el);
});
