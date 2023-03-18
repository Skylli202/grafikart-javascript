/**
 * 
 * @typedef {Object.<string,any> & {headers: Object.<string,string>}} fetchJSONParams
 * 
 * @param {string} url 
 * @param {fetchJSONParams} params
 */
export const fetchJSON = async (url, params = { headers: {} }) => {
    const headers = new Headers()
    headers.append('Accept', 'application/json')

    for (const [key, value] of Object.entries(params.headers)) {
        if (!headers.has(key)) headers.append(key, value)
    }

    const response = await fetch(url, {...params, headers})
    return response.json()
}