// import axios from 'axios'

const getSuspender = (promise) => {
  let status = 'pending'
  let response

  const suspender = promise.then(
    (res) => {
      status = 'success'
      response = res
    },
    (err) => {
      status = 'error'
      response = err
    }
  )

  const read = () => {
    switch (status) {
      case 'pending':
        throw suspender
      case 'error':
        throw response
      default:
        return response
    }
  }

  return { read }
}

export function fetchData(URL = '/api/v1/') {
  return {
    get: ({ url = '', params = {} }) => {
      const queryParams = new URLSearchParams(params).toString()

      const fetchUrl = URL + url + `?${queryParams}`
      const promise = fetch(fetchUrl, {
        method: 'GET',
        headers: { 'Content-type': 'application/json;charset=utf-8' }
      })
        .then((response) => response.json())
        .then((json) => json)
      return getSuspender(promise)
    },
    post: ({ url = '', params = {} }) => {
      // const fetchUrl = (url = URL + url)
      // const promise = fetch(fetchUrl, {
      //   method: 'POST',
      //   body: JSON.stringify(params)
      // })
      //   .then((response) => response.json())
      //   .then((json) => json)
      // return getSuspender(promise)
    },
    put: ({ url = '', params = {} }) => {
      // const fetchUrl = (url = URL + url)
      // const promise = fetch(fetchUrl, {
      //   method: 'PUT',
      //   body: JSON.stringify(params)
      // })
      //   .then((response) => response.json())
      //   .then((json) => json)
      // return getSuspender(promise)
    },
    delete: ({ url = '', params = {} }) => {
      // const fetchUrl = (url = URL + url)
      // const promise = fetch(fetchUrl, {
      //   method: 'DELETE',
      //   body: JSON.stringify(params)
      // })
      //   .then((response) => response.json())
      //   .then((json) => json)
      // return getSuspender(promise)
    }
  }
}

// function getDataFromServer() {
//   axios
//     .get(urlWithProxy)
//     .then((res) => setData(res.data))
//     .catch((err) => {
//       console.error(err);
//     });
// }
