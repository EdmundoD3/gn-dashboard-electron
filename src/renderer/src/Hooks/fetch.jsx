const fetchApi = async ({ url = '', method = 'GET', query = {}, body = {} }) => {
  const queryParams = new URLSearchParams(query).toString()
  const fetchUrl = queryParams ? String(url) + `?${queryParams}` : String(url)
  const secondsParams = !Object.keys(body).length
    ? {
        method,
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
      }
    : {
        method,
        body: JSON.stringify(body),
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
      }
  console.log('second params:', secondsParams, Object.keys(body).length)
  const response = await fetch(fetchUrl, secondsParams)
  const json = await response.json()
  return json
}

export { fetchApi }
