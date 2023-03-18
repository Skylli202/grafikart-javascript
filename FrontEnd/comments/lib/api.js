/**
 * Interact with a JSON API
 * @param {string} url
 * @param {RequestInit & {json?: object}} options
 * @throws {Error} Will throw an error when the API request is not ok.
 */
export async function fetchJSON(url, options = {}) {
  const headers = { Accept: "application/json", ...options.headers };
  if (options.json) {
    options.body = JSON.stringify(options.json);
    headers["Content-Type"] = "application/json";
  }
  const r = await fetch(url, { ...options, headers });
  if (!r.ok) {
    throw new Error("Server error", { cause: r });
  }
  return await r.json();
}
